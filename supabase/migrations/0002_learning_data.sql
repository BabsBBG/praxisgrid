create table if not exists public.quiz_attempts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  cert text not null,
  mode text not null,
  kind text not null,
  title text not null,
  completed_at timestamptz not null,
  score integer not null,
  total integer not null,
  percentage integer not null,
  payload jsonb not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interview_sessions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  cert text not null,
  track text not null,
  session_title text not null,
  completed_at timestamptz not null,
  score integer not null,
  total integer not null,
  percentage integer not null,
  payload jsonb not null,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_flags (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  cert text not null,
  question_id text not null,
  reason text not null,
  note text,
  resolved boolean not null default false,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;
alter table public.interview_sessions enable row level security;
alter table public.question_flags enable row level security;

create policy "Quiz attempts are readable by owner"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Quiz attempts are insertable by owner"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

create policy "Quiz attempts are updatable by owner"
  on public.quiz_attempts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Interview sessions are readable by owner"
  on public.interview_sessions for select
  using (auth.uid() = user_id);

create policy "Interview sessions are insertable by owner"
  on public.interview_sessions for insert
  with check (auth.uid() = user_id);

create policy "Interview sessions are updatable by owner"
  on public.interview_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Question flags are readable by owner"
  on public.question_flags for select
  using (auth.uid() = user_id);

create policy "Question flags are insertable by owner"
  on public.question_flags for insert
  with check (auth.uid() = user_id);

create policy "Question flags are updatable by owner"
  on public.question_flags for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
