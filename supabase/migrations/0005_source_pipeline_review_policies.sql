create table if not exists public.question_review_events (
  id uuid primary key default gen_random_uuid(),
  candidate_id text references public.question_candidates(id) on delete cascade,
  approved_question_id text references public.approved_questions(id) on delete set null,
  reviewer_id uuid references auth.users(id) on delete set null,
  reviewer_role public.praxisgrid_user_role not null,
  from_status text,
  to_status text not null check (to_status in ('draft', 'critic-approved', 'approved', 'rejected')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

alter table public.question_candidates
  add column if not exists approved_at timestamptz;

alter table public.generation_runs
  add column if not exists batch_question_limit integer not null default 0,
  add column if not exists max_source_chunks integer not null default 0,
  add column if not exists admin_only boolean not null default true;

alter table public.question_review_events enable row level security;

create or replace function public.can_review_content()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() in (
    'MAIN_ADMIN'::public.praxisgrid_user_role,
    'CONTENT_REVIEWER'::public.praxisgrid_user_role
  );
$$;

create policy "Reviewers can read source docs"
  on public.source_docs for select
  using (public.can_review_content());

create policy "Reviewers can insert source docs"
  on public.source_docs for insert
  with check (public.can_review_content());

create policy "Reviewers can read source chunks"
  on public.source_chunks for select
  using (public.can_review_content());

create policy "Reviewers can insert source chunks"
  on public.source_chunks for insert
  with check (public.can_review_content());

create policy "Reviewers can read generation runs"
  on public.generation_runs for select
  using (public.can_review_content());

create policy "Only main admins can create generation runs"
  on public.generation_runs for insert
  with check (
    public.is_main_admin()
    and admin_only = true
    and kill_switch_enabled = false
    and spent_estimate_cents <= budget_cap_cents
    and batch_question_limit >= 0
    and max_source_chunks >= 0
  );

create policy "Only main admins can update generation runs"
  on public.generation_runs for update
  using (public.is_main_admin())
  with check (
    public.is_main_admin()
    and admin_only = true
    and spent_estimate_cents <= budget_cap_cents
    and batch_question_limit >= 0
    and max_source_chunks >= 0
  );

create policy "Reviewers can read question candidates"
  on public.question_candidates for select
  using (public.can_review_content());

create policy "Reviewers can insert draft question candidates"
  on public.question_candidates for insert
  with check (public.can_review_content() and review_status in ('draft', 'critic-approved'));

create policy "Reviewers can update candidate review status"
  on public.question_candidates for update
  using (public.can_review_content())
  with check (public.can_review_content());

create or replace function public.approved_question_candidate_is_valid(
  p_candidate_id text,
  p_source_chunk_id text,
  p_source_url text,
  p_duplicate_key text,
  p_approved_at timestamptz
)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.question_candidates qc
    join public.source_chunks sc on sc.id = qc.source_chunk_id
    left join public.generation_runs gr on gr.id = qc.run_id
    where qc.id = p_candidate_id
      and qc.review_status = 'approved'
      and qc.source_chunk_id = p_source_chunk_id
      and qc.duplicate_key = p_duplicate_key
      and sc.source_url = p_source_url
      and sc.cert = qc.cert
      and length(trim(qc.duplicate_key)) > 0
      and jsonb_array_length(qc.critic_notes) > 0
      and p_approved_at is not null
      and (gr.id is null or (
        gr.kill_switch_enabled = false
        and gr.spent_estimate_cents <= gr.budget_cap_cents
        and gr.admin_only = true
      ))
  );
$$;

create policy "Reviewers can insert approved questions"
  on public.approved_questions for insert
  with check (
    public.can_review_content()
    and review_status = 'approved'
    and approved_at is not null
    and public.approved_question_candidate_is_valid(candidate_id, source_chunk_id, source_url, duplicate_key, approved_at)
  );

create policy "Reviewers can read review events"
  on public.question_review_events for select
  using (public.can_review_content());

create policy "Reviewers can insert review events"
  on public.question_review_events for insert
  with check (public.can_review_content() and reviewer_id = auth.uid());

create or replace function public.audit_question_candidate_review()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.review_status is distinct from new.review_status then
    insert into public.question_review_events (
      candidate_id,
      reviewer_id,
      reviewer_role,
      from_status,
      to_status,
      notes
    )
    values (
      new.id,
      auth.uid(),
      public.current_user_role(),
      old.review_status,
      new.review_status,
      'candidate review status changed'
    );
  end if;

  return new;
end;
$$;

drop trigger if exists audit_question_candidate_review on public.question_candidates;
create trigger audit_question_candidate_review
  after update of review_status on public.question_candidates
  for each row execute function public.audit_question_candidate_review();

create or replace function public.guard_question_candidate_review_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_main_admin() then
    return new;
  end if;

  if old.run_id is distinct from new.run_id
    or old.cert is distinct from new.cert
    or old.domain is distinct from new.domain
    or old.source_chunk_id is distinct from new.source_chunk_id
    or old.duplicate_key is distinct from new.duplicate_key
    or old.payload is distinct from new.payload then
    raise exception 'Only MAIN_ADMIN can change candidate source, duplicate, or payload fields';
  end if;

  return new;
end;
$$;

drop trigger if exists guard_question_candidate_review_update on public.question_candidates;
create trigger guard_question_candidate_review_update
  before update on public.question_candidates
  for each row execute function public.guard_question_candidate_review_update();

create or replace function public.audit_approved_question_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.question_review_events (
    candidate_id,
    approved_question_id,
    reviewer_id,
    reviewer_role,
    from_status,
    to_status,
    notes
  )
  values (
    new.candidate_id,
    new.id,
    auth.uid(),
    public.current_user_role(),
    null,
    'approved',
    'approved question inserted into served pool'
  );

  return new;
end;
$$;

drop trigger if exists audit_approved_question_insert on public.approved_questions;
create trigger audit_approved_question_insert
  after insert on public.approved_questions
  for each row execute function public.audit_approved_question_insert();
