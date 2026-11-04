-- Great Minds AI: international classroom membership
-- Applied to the connected project on 2026-11-04 and verified.
-- The legacy classroom column is named "classroom code" (with a space).
-- Preserve it while adding classroom_code for the frontend/API.

alter table public.classrooms add column if not exists classroom_code text;
update public.classrooms
set classroom_code = "classroom code"
where classroom_code is null and nullif(trim("classroom code"), '') is not null;

-- Existing project was checked for duplicate normalized codes before this index.
create unique index if not exists classrooms_classroom_code_unique
on public.classrooms (lower(trim(classroom_code)))
where nullif(trim(classroom_code), '') is not null;

create table if not exists public.classroom_members (
  id uuid primary key default gen_random_uuid(),
  classroom_id bigint not null references public.classrooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  membership_status text not null default 'pending'
    check (membership_status in ('pending','approved','rejected')),
  parent_consent_status text not null default 'pending'
    check (parent_consent_status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  unique (classroom_id, user_id)
);

alter table public.classroom_members enable row level security;
revoke all on public.classroom_members from anon, authenticated;
grant select on public.classroom_members to authenticated;
grant update (membership_status) on public.classroom_members to authenticated;
create index if not exists classroom_members_user_id_idx
on public.classroom_members(user_id);

drop policy if exists "Members and classroom teachers read memberships" on public.classroom_members;
drop policy if exists "Members and approved classroom teachers read memberships" on public.classroom_members;
create policy "Members and approved classroom teachers read memberships"
on public.classroom_members for select to authenticated
using (
  user_id = (select auth.uid())
  or exists (
    select 1 from public.classrooms c
    join public.teacher_profiles tp on tp.user_id = c.teacher_id
    where c.id = classroom_id
      and c.teacher_id = (select auth.uid())
      and tp.approved = true
  )
);

drop policy if exists "Classroom teachers update membership status" on public.classroom_members;
drop policy if exists "Approved classroom teachers update membership status" on public.classroom_members;
create policy "Approved classroom teachers update membership status"
on public.classroom_members for update to authenticated
using (
  exists (
    select 1 from public.classrooms c
    join public.teacher_profiles tp on tp.user_id = c.teacher_id
    where c.id = classroom_id
      and c.teacher_id = (select auth.uid())
      and tp.approved = true
  )
)
with check (
  exists (
    select 1 from public.classrooms c
    join public.teacher_profiles tp on tp.user_id = c.teacher_id
    where c.id = classroom_id
      and c.teacher_id = (select auth.uid())
      and tp.approved = true
  )
);

-- Privileged join-code lookup is kept in a non-exposed schema.
-- It authenticates the caller and can only create a pending request.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.join_classroom_by_code(p_code text)
returns table (classroom_id bigint, classroom_name text, request_status text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_class_id bigint;
  v_name text;
  v_matches integer;
begin
  if v_user is null then
    raise exception 'Please sign in before joining a classroom';
  end if;
  if p_code is null or length(trim(p_code)) < 6 or length(trim(p_code)) > 32 then
    raise exception 'Enter a valid classroom code';
  end if;

  select count(*) into v_matches
  from public.classrooms c
  where lower(trim(c.classroom_code)) = lower(trim(p_code));

  if v_matches <> 1 then
    raise exception 'Classroom code not found or unavailable';
  end if;

  select c.id, c.classroom_name into v_class_id, v_name
  from public.classrooms c
  where lower(trim(c.classroom_code)) = lower(trim(p_code))
  limit 1;

  insert into public.classroom_members
    (classroom_id, user_id, membership_status, parent_consent_status)
  values (v_class_id, v_user, 'pending', 'pending')
  on conflict (classroom_id, user_id) do nothing;

  return query
  select v_class_id, v_name, m.membership_status
  from public.classroom_members m
  where m.classroom_id = v_class_id and m.user_id = v_user;
end;
$$;

revoke all on function private.join_classroom_by_code(text) from public, anon;
grant execute on function private.join_classroom_by_code(text) to authenticated;

create or replace function public.join_classroom_by_code(p_code text)
returns table (classroom_id bigint, classroom_name text, request_status text)
language sql
security invoker
set search_path = ''
as $$
  select * from private.join_classroom_by_code(p_code);
$$;

revoke all on function public.join_classroom_by_code(text) from public, anon;
grant execute on function public.join_classroom_by_code(text) to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'classroom_members'
     ) then
    alter publication supabase_realtime add table public.classroom_members;
  end if;
end $$;
