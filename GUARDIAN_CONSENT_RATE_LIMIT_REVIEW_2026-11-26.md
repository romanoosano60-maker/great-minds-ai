# Great Minds AI — Guardian Consent Code Rate-Limit Review

Date: 26 November 2026  
Project: `ryuchmmnyjyldwouidyy`  
Status: reviewed from source and live read-only inspection; **not applied to production**.

## 1. Current production state

A read-only Supabase audit confirmed:

- The project is `ACTIVE_HEALTHY`, PostgreSQL 17.11.
- Applied migration history still ends with the 10 November 2026 entries.
- `private.guardian_consent_code_issuance` does not exist.
- The live `private.create_guardian_consent_code()` function is `SECURITY DEFINER`, owned by `postgres`, uses an empty search path, and is executable by `authenticated` (not `anon`).
- The live function creates a 64-character random code, stores a SHA-256 hash, expires it after 24 hours, and invalidates previous unused codes for the same student. It currently has no per-hour issuance counter.
- Existing indexes on `private.guardian_consent_codes` are the primary key, unique code-hash index and student-id index. The proposed expiry and used-at indexes do not currently exist.
- No database schema, function, policy, secret, account, consent relationship or learner record was changed during this review.

## 2. Proposed migration

Repository file: `supabase/migrations/20261120_rate_limit_guardian_consent_codes.sql`

The migration:
1. Creates a private per-student issuance counter table with one row per student.
2. Enables RLS and revokes direct access from public, anon, authenticated and service_role.
3. Adds indexes for consent-code expiry and used-at cleanup.
4. Replaces the existing security-definer function while preserving the 64-character code, SHA-256 hash, 24-hour expiry and invalidation of older unused codes.
5. Enforces no more than three successful code issuances per student account in a fixed one-hour window.
6. Deletes only codes that have been expired or used for more than 30 days, opportunistically when a new code is successfully issued.
7. Grants function execution to authenticated users only.

The fourth and later attempts in the same hour raise an error. Because the exception aborts the statement, the counter remains at three and the account remains blocked until the one-hour window resets. The rate limit is per authenticated student account; it is not an IP-wide limit.

## 3. Review findings

- The counter table is private and has no client policies or direct client privileges.
- The security-definer function uses schema-qualified private tables and `extensions.digest`, with an empty search path.
- The counter update uses an atomic upsert, so concurrent requests for the same student serialize on the primary-key row.
- The cleanup is opportunistic, not a scheduled job. The table retains one counter row per student until account deletion cascades.
- The migration does not change guardian relationships, classroom memberships, student progress or teacher approval.
- Existing public wrapper `public.create_guardian_consent_code()` continues to call the private function; it does not need broader privileges.
- No expiry/used-at index exists today, so the two new indexes are genuine additions and may be safely removed in the rollback only if this exact migration created them.

## 4. Required owner approval and controlled apply procedure

**Do not apply this migration to the live project until the owner explicitly approves the production database change.**

After approval:
1. Confirm the project ID and migration history immediately before applying.
2. Apply the existing versioned migration through the Supabase migration workflow, not by pasting DDL into an ad-hoc SQL editor.
3. Confirm the migration history records `20261120_rate_limit_guardian_consent_codes`.
4. Verify the private counter table exists, RLS is enabled, no client policies exist, and anon/authenticated/service_role have no direct table privileges.
5. Verify the function owner, `SECURITY DEFINER`, empty search path and authenticated-only execute grant.
6. Verify both new indexes exist.
7. Use a dedicated test student account: generate three codes successfully; confirm the fourth and fifth attempts are rejected; confirm an unauthenticated request is rejected; confirm a guardian can redeem only the latest valid code and expired/used codes remain rejected.
8. Confirm existing guardian relationships and classroom membership rows are unchanged.
9. Record the migration ID, test evidence and rollback readiness in this document.

Do not use a real child's account or expose consent codes in screenshots, logs or chat.

## 5. Rollback plan

If the migration causes an issue immediately after application and before it is relied on operationally:

- Restore the exact pre-migration definition of `private.create_guardian_consent_code()` from the live definition captured before application. That version creates the same 64-character code, hashes it with SHA-256, sets a 24-hour expiry, and invalidates previous unused codes, but has no rate counter.
- Drop `private.guardian_consent_code_issuance`.
- Drop `private.guardian_consent_codes_expires_at_idx` and `private.guardian_consent_codes_used_at_idx` only after confirming they were created by this migration and not subsequently adopted by another migration.
- Re-run the function ACL and RLS checks. Do not delete consent-code rows, guardian relationships or classroom memberships as part of rollback.
- Reconcile the Supabase migration history through the supported migration workflow; do not manually edit the migration-history table.

A reviewed SQL template is stored at [supabase/rollbacks/20261120_rate_limit_guardian_consent_codes.rollback.sql](supabase/rollbacks/20261120_rate_limit_guardian_consent_codes.rollback.sql). It restores the exact pre-migration function definition captured on 26 November and drops only the new table and indexes. Review the file against the live schema immediately before any use. Rollback removes the rate-limit counter history. It must not be used casually after the rate limit has been relied on as an active safeguard.

## 6. Decision still required

The source migration has been reviewed and is ready for a controlled application, but the production database has not been changed. Owner approval is the remaining gate.
