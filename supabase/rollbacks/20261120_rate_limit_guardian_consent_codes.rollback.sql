-- Great Minds AI rollback for 20261120_rate_limit_guardian_consent_codes.sql
-- REVIEW ONLY: do not run unless the production migration has been applied,
-- the owner approves rollback, and no later migration depends on this table/indexes.
-- This restores the exact pre-migration function body captured by read-only audit
-- on 2026-11-26, then removes only objects introduced by the rate-limit migration.
-- Dropping the counter table discards rate-limit history; consent-code rows and
-- guardian relationships are intentionally not deleted.

begin;

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
begin
  if v_user is null then
    raise exception 'Sign in to the student account first';
  end if;

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

drop index if exists private.guardian_consent_codes_expires_at_idx;
drop index if exists private.guardian_consent_codes_used_at_idx;
drop table if exists private.guardian_consent_code_issuance;

commit;
