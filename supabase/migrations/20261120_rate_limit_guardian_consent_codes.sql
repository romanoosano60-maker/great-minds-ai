-- Great Minds AI: rate-limit guardian consent-code issuance and bound stale-code retention.
-- Review and apply through the Supabase migration workflow only after owner approval.
-- This migration does not independently verify legal adulthood or guardianship.

begin;

create table if not exists private.guardian_consent_code_issuance (
  student_id uuid primary key references auth.users(id) on delete cascade,
  window_started_at timestamptz not null,
  issue_count integer not null check (issue_count between 1 and 3),
  last_issued_at timestamptz not null
);

alter table private.guardian_consent_code_issuance enable row level security;
revoke all on table private.guardian_consent_code_issuance from public, anon, authenticated, service_role;

create index if not exists guardian_consent_codes_expires_at_idx
  on private.guardian_consent_codes (expires_at);
create index if not exists guardian_consent_codes_used_at_idx
  on private.guardian_consent_codes (used_at)
  where used_at is not null;

create or replace function private.create_guardian_consent_code()
returns text
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_user uuid := auth.uid();
  v_code text := replace(gen_random_uuid()::text, '-', '') ||
                 replace(gen_random_uuid()::text, '-', '');
  v_issue_count integer;
begin
  if v_user is null then
    raise exception 'Sign in to the student account first';
  end if;

  -- Atomic per-student fixed-window counter: no more than 3 issued codes per hour.
  insert into private.guardian_consent_code_issuance (
    student_id, window_started_at, issue_count, last_issued_at
  )
  values (v_user, now(), 1, now())
  on conflict (student_id) do update
  set window_started_at = case
        when private.guardian_consent_code_issuance.window_started_at <= now() - interval '1 hour'
          then now()
        else private.guardian_consent_code_issuance.window_started_at
      end,
      issue_count = case
        when private.guardian_consent_code_issuance.window_started_at <= now() - interval '1 hour'
          then 1
        else private.guardian_consent_code_issuance.issue_count + 1
      end,
      last_issued_at = now()
  returning issue_count into v_issue_count;

  if v_issue_count > 3 then
    raise exception 'Too many consent codes requested. Please wait before generating another code.';
  end if;

  -- Opportunistic cleanup: retain used/expired hashes for at most 30 days.
  -- This runs when a student successfully requests a new code; it is not a scheduled job.
  delete from private.guardian_consent_codes
  where expires_at < now() - interval '30 days'
     or used_at < now() - interval '30 days';

  update private.guardian_consent_codes
  set used_at = now()
  where student_id = v_user and used_at is null;

  insert into private.guardian_consent_codes(student_id, code_hash, expires_at)
  values (
    v_user,
    encode(extensions.digest(v_code, 'sha256'), 'hex'),
    now() + interval '24 hours'
  );

  return v_code;
end;
$function$;

revoke all on function private.create_guardian_consent_code() from public, anon;
grant execute on function private.create_guardian_consent_code() to authenticated;

commit;
