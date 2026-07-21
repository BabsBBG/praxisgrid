create type public.praxisgrid_user_role as enum (
  'MAIN_ADMIN',
  'CONTENT_REVIEWER',
  'SUPPORT_ADMIN',
  'USER'
);

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.praxisgrid_user_role not null default 'USER',
  assigned_by uuid references auth.users(id),
  assigned_at timestamptz not null default now(),
  reason text not null default 'default_user_role'
);

create table if not exists public.role_change_events (
  id uuid primary key default gen_random_uuid(),
  target_user_id uuid not null references auth.users(id) on delete cascade,
  previous_role public.praxisgrid_user_role,
  new_role public.praxisgrid_user_role not null,
  changed_by uuid references auth.users(id),
  reason text not null,
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;
alter table public.role_change_events enable row level security;

create or replace function public.current_user_role()
returns public.praxisgrid_user_role
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select role from public.user_roles where user_id = auth.uid()),
    'USER'::public.praxisgrid_user_role
  );
$$;

create or replace function public.is_main_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_user_role() = 'MAIN_ADMIN'::public.praxisgrid_user_role;
$$;

create policy "Users can read their own role"
  on public.user_roles for select
  using (auth.uid() = user_id or public.is_main_admin());

create policy "Only main admins can assign roles"
  on public.user_roles for insert
  with check (public.is_main_admin());

create policy "Only main admins can update roles"
  on public.user_roles for update
  using (public.is_main_admin())
  with check (public.is_main_admin());

create policy "Main admins can read role change events"
  on public.role_change_events for select
  using (public.is_main_admin());

create policy "Main admins can insert role change events"
  on public.role_change_events for insert
  with check (public.is_main_admin());

create or replace function public.audit_user_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.role_change_events (
      target_user_id,
      previous_role,
      new_role,
      changed_by,
      reason
    )
    values (
      new.user_id,
      null,
      new.role,
      new.assigned_by,
      new.reason
    );
    return new;
  end if;

  if old.role is distinct from new.role then
    insert into public.role_change_events (
      target_user_id,
      previous_role,
      new_role,
      changed_by,
      reason
    )
    values (
      new.user_id,
      old.role,
      new.role,
      new.assigned_by,
      new.reason
    );
  end if;

  return new;
end;
$$;

drop trigger if exists audit_user_role_change on public.user_roles;
create trigger audit_user_role_change
  after insert or update of role on public.user_roles
  for each row execute function public.audit_user_role_change();

create or replace function public.ensure_default_user_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role, reason)
  values (new.id, 'USER', 'default_user_role')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_default_role on auth.users;
create trigger on_auth_user_created_default_role
  after insert on auth.users
  for each row execute function public.ensure_default_user_role();

-- Main Admin bootstrap must be controlled outside the frontend.
-- Apply one assignment manually or from a protected server environment after verifying the account.
-- The audit trigger above records the insert/update:
-- insert into public.user_roles (user_id, role, assigned_by, reason)
-- values ('00000000-0000-0000-0000-000000000000', 'MAIN_ADMIN', null, 'server_controlled_bootstrap')
-- on conflict (user_id) do update set role = excluded.role, assigned_by = excluded.assigned_by, assigned_at = now(), reason = excluded.reason;
