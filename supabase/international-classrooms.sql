-- Great Minds AI: international classroom membership
-- Safe for the existing project schema. Preserves the legacy "classroom code"
-- column while adding the canonical classroom_code column used by the frontend.

alter table public.classrooms add column if not exists classroom_code text;
update public.classrooms
set classroom_code = "classroom code"
where classroom_code is null and nullif(trim("classroom code"), '') is not null;

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

drop policy if exists "Members and classroom teachers read memberships" on public.classroom_members;
create policy "Members and classroom teachers read memberships"
on public.classroom_members for select to authenticated
using (
  user_id = (select auth.uid())
  or exists (
    select 1 from public.classrooms c
    where c.id = classroom_id and c.teacher_id = (select auth.uid())
  )
);

drop policy if exists "Classroom teachers update membership status" on public.classroom_members;
create policy "Classroom teachers update membership status"
on public.classroom_members for update to authenticated
using (
  exists (
    select 1 from public.classrooms c
    where c.id = classroom_id and c.teacher_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.classrooms c
    where c.id = classroom_id and c.teacher_id = (select auth.uid())
  )
);

revoke all on public.classroom_members from anon, authenticated;
grant select on public.classroom_members to authenticated;
grant update (membership_status) on public.classroom_members to authenticated;
create index if not exists classroom_members_user_id_idx on public.classroom_members(user_id);

-- SECURITY DEFINER is intentional here: a signed-in student must look up a
-- classroom by secret join code even though classroom SELECT is teacher-only.
-- The function validates auth.uid(), limits the code, returns no student data,
-- and only inserts a pending request with pending guardian consent.
create or replace function public.join_classroom_by_code(p_code text)
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
