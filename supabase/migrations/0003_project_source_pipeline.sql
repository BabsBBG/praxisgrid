create table if not exists public.imported_projects (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  owner text not null,
  repo text not null,
  source_url text not null,
  content_hash text not null,
  status text not null check (status in ('draft', 'reviewed', 'approved')),
  imported_at timestamptz not null,
  payload jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.source_docs (
  id text primary key,
  cert text not null,
  title text not null,
  source_url text not null,
  content_hash text not null,
  ingested_at timestamptz not null,
  payload jsonb not null,
  created_at timestamptz default now()
);

create table if not exists public.source_chunks (
  id text primary key,
  doc_id text not null references public.source_docs(id) on delete cascade,
  cert text not null,
  domain text not null,
  source_url text not null,
  content_hash text not null,
  embedding_hash text,
  payload jsonb not null,
  created_at timestamptz default now()
);

create table if not exists public.generation_runs (
  id text primary key,
  status text not null check (status in ('draft', 'running', 'completed', 'failed', 'blocked')),
  budget_cap_cents integer not null default 0,
  spent_estimate_cents integer not null default 0,
  kill_switch_enabled boolean not null default false,
  source_hash text not null,
  failure_log jsonb not null default '[]'::jsonb,
  payload jsonb not null,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists public.question_candidates (
  id text primary key,
  run_id text references public.generation_runs(id) on delete set null,
  cert text not null,
  domain text not null,
  source_chunk_id text not null references public.source_chunks(id) on delete cascade,
  duplicate_key text not null,
  review_status text not null check (review_status in ('draft', 'critic-approved', 'approved', 'rejected')),
  critic_notes jsonb not null default '[]'::jsonb,
  payload jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.approved_questions (
  id text primary key,
  candidate_id text references public.question_candidates(id) on delete set null,
  cert text not null,
  domain text not null,
  source_chunk_id text not null references public.source_chunks(id) on delete cascade,
  source_url text not null,
  duplicate_key text not null unique,
  review_status text not null default 'approved' check (review_status = 'approved'),
  approved_at timestamptz not null,
  payload jsonb not null,
  created_at timestamptz default now()
);

alter table public.imported_projects enable row level security;
alter table public.source_docs enable row level security;
alter table public.source_chunks enable row level security;
alter table public.generation_runs enable row level security;
alter table public.question_candidates enable row level security;
alter table public.approved_questions enable row level security;

create policy "Imported projects are readable by owner"
  on public.imported_projects for select
  using (auth.uid() = user_id);

create policy "Imported projects are insertable by owner"
  on public.imported_projects for insert
  with check (auth.uid() = user_id);

create policy "Imported projects are updatable by owner"
  on public.imported_projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Approved questions are publicly readable"
  on public.approved_questions for select
  using (review_status = 'approved');
