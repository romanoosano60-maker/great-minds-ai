-- Great Minds AI: guardian consent token hashing hardening
-- Applied and verified on 2026-11-09.
-- New consent tokens are stored as SHA-256 hashes. Existing MD5-hashed,
-- unexpired tokens remain redeemable during the compatibility window.
-- The token itself is a 64-character high-entropy value and is shown once.

create or replace function private.create_guardian_consent_code()
returns text
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
  v_code text := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
begin
  if v_user is null then
    raise exception 'Sign in to the student account first';
  end if;

  update private.guardian_consent_codes
  set used_at = now()
  where student_id = v_user and used_at is null;

  insert into private.guardian_consent_codes(student_id, code_hash, expires_at)
  values (v_user, encode(extensions.digest(v_code, 'sha256'), 'hex'), now() + interval '24 hours');

  return v_code;
end;
$function$;

create or replace function private.redeem_guardian_consent_code(p_code text, p_guardian_affirms boolean)
returns text
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_guardian uuid := auth.uid();
  v_student uuid;
  v_confirmed timestamptz;
  v_rows integer;
  v_hash text;
  v_legacy_hash text;
begin
  if v_guardian is null then raise exception 'Sign in to the parent or guardian account first'; end if;
  if p_guardian_affirms is distinct from true then raise exception 'The parent or guardian must explicitly confirm consent'; end if;
  select u.email_confirmed_at into v_confirmed from auth.users u where u.id=v_guardian;
  if v_confirmed is null then raise exception 'Verify the guardian account email before giving consent'; end if;
  if p_code is null or length(trim(p_code)) <> 64 or trim(p_code) !~ '^[0-9a-fA-F]{64}$' then
    raise exception 'Enter the full 64-character consent code';
  end if;

  v_hash := encode(extensions.digest(trim(p_code), 'sha256'), 'hex');
  v_legacy_hash := md5(trim(p_code));

  select c.student_id into v_student
  from private.guardian_consent_codes c
  where c.code_hash in (v_hash, v_legacy_hash)
    and c.used_at is null and c.expires_at > now()
  for update;

  if v_student is null then raise exception 'Consent code is invalid, expired, or already used'; end if;
  if v_student=v_guardian then raise exception 'A student account cannot approve its own guardian consent'; end if;

  insert into public.guardian_relationships(student_id,guardian_id,relationship_status,consented_at,revoked_at)
  values(v_student,v_guardian,'active',now(),null)
  on conflict(student_id) do update set guardian_id=excluded.guardian_id,
    relationship_status='active',consented_at=now(),revoked_at=null
  where public.guardian_relationships.relationship_status='revoked';

  get diagnostics v_rows = row_count;
  if v_rows=0 then
    raise exception 'A guardian is already linked to this student; revoke or contact support before changing it';
  end if;

  update private.guardian_consent_codes
  set used_at=now()
  where code_hash in (v_hash, v_legacy_hash);

  update public.classroom_members
  set parent_consent_status='approved',
    membership_status=case when membership_status='rejected' then 'pending' else membership_status end
  where user_id=v_student and membership_status in ('pending','rejected');

  return 'Guardian consent recorded. Classroom membership still requires teacher approval.';
end;
$function$;

revoke all on function private.create_guardian_consent_code() from public, anon;
grant execute on function private.create_guardian_consent_code() to authenticated;
revoke all on function private.redeem_guardian_consent_code(text,boolean) from public, anon;
grant execute on function private.redeem_guardian_consent_code(text,boolean) to authenticated;
