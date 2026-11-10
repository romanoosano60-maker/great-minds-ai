-- Great Minds AI: database-enforced AI Teacher daily request limits.
-- Applied to Supabase project ryuchmmnyjyldwouidyy on 2026-11-08.
-- Limits: 10 requests per authenticated account per UTC day; 100 total per UTC day.
-- The Edge Function must call public.consume_ai_teacher_quota() before OpenAI.

create table if not exists private.ai_teacher_daily_usage (
  usage_key text primary key,
  usage_date date not null,
  request_count integer not null default 0 check (request_count >= 0)
);
revoke all on table private.ai_teacher_daily_usage from public, anon, authenticated;

create or replace function private.consume_ai_teacher_quota()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
  v_user_count integer := 0;
  v_global_count integer := 0;
  v_today date := (now() at time zone 'utc')::date;
begin
  if v_user is null then
    raise exception 'Sign in before using AI Teacher';
  end if;

  perform pg_advisory_xact_lock(7123001, 1);

  select u.request_count into v_user_count
  from private.ai_teacher_daily_usage u
  where u.usage_key = 'user:' || v_user::text and u.usage_date = v_today;

  select u.request_count into v_global_count
  from private.ai_teacher_daily_usage u
  where u.usage_key = 'global' and u.usage_date = v_today;

  if coalesce(v_user_count, 0) >= 10 then
    return jsonb_build_object('allowed', false, 'reason', 'daily_user_limit');
  end if;
  if coalesce(v_global_count, 0) >= 100 then
    return jsonb_build_object('allowed', false, 'reason', 'daily_service_limit');
  end if;

  insert into private.ai_teacher_daily_usage(usage_key, usage_date, request_count)
  values ('user:' || v_user::text, v_today, 1)
  on conflict (usage_key) do update
    set usage_date = excluded.usage_date,
        request_count = case
          when private.ai_teacher_daily_usage.usage_date = excluded.usage_date
          then private.ai_teacher_daily_usage.request_count + 1 else 1 end;

  insert into private.ai_teacher_daily_usage(usage_key, usage_date, request_count)
  values ('global', v_today, 1)
  on conflict (usage_key) do update
    set usage_date = excluded.usage_date,
        request_count = case
          when private.ai_teacher_daily_usage.usage_date = excluded.usage_date
          then private.ai_teacher_daily_usage.request_count + 1 else 1 end;

  return jsonb_build_object(
    'allowed', true,
    'user_remaining', 9 - coalesce(v_user_count, 0),
    'service_remaining', 99 - coalesce(v_global_count, 0)
  );
end;
$function$;

-- The low-level counter function is never callable by client roles.
revoke all on function private.consume_ai_teacher_quota() from public, anon, authenticated;
grant usage on schema private to authenticated;

-- Only approved teachers and accounts with an active guardian relationship
-- may consume quota. The role check runs inside this SECURITY DEFINER wrapper
-- so a caller cannot skip the eligibility gate by invoking the counter.
create or replace function private.consume_ai_teacher_quota_for_eligible_user()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    return jsonb_build_object('allowed', false, 'reason', 'not_authenticated');
  end if;

  if not exists (
    select 1 from public.teacher_profiles t
    where t.user_id = v_user and t.approved = true
  )
  and not exists (
    select 1 from public.guardian_relationships gr
    where (gr.student_id = v_user or gr.guardian_id = v_user)
      and gr.relationship_status = 'active'
  ) then
    return jsonb_build_object('allowed', false, 'reason', 'not_eligible');
  end if;

  return private.consume_ai_teacher_quota();
end;
$function$;

revoke all on function private.consume_ai_teacher_quota_for_eligible_user()
  from public, anon, authenticated;
grant execute on function private.consume_ai_teacher_quota_for_eligible_user()
  to authenticated;

create or replace function public.consume_ai_teacher_quota()
returns jsonb
language sql
security invoker
set search_path = ''
as $function$
  select private.consume_ai_teacher_quota_for_eligible_user();
$function$;
revoke all on function public.consume_ai_teacher_quota() from public, anon;
grant execute on function public.consume_ai_teacher_quota() to authenticated;
