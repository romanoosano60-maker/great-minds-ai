# Great Minds AI — Account deletion workflow

## Current status
A **request-only** Edge Function is deployed as `account-deletion-request` (version 4, JWT verification enabled). It verifies the signed-in user and email, rejects accounts marked as student, checks for an approved teacher profile or guardian account/active guardian link, checks classroom ownership, and records a request. It NEVER deletes an Auth user or app data.

The adult request form is now included on the International Classrooms page. It requires sign-in and an explicit confirmation. The request table is live with RLS enabled, no direct anon/authenticated access, and service-role-only access. It currently contains zero requests.

## Four safeguards
1. **Authenticated request:** require a valid Supabase user session and explicit confirmation. The server verifies the bearer token; clients cannot insert request rows directly. Duplicate open requests are prevented.
2. **Child/guardian protection:** accounts marked as student are rejected by the request endpoint. Adult guardian requests require a verified email and an adult guardian role/active guardian relationship; approved teachers are also allowed to request deletion of their own accounts. This role/relationship check is a useful account-level safeguard, not independent legal proof of guardianship. A guardian request to delete a child's account still requires a separate human review and legal-authority check.
3. **Teacher/classroom protection:** the live database has a validated RESTRICT foreign key from `classrooms.teacher_id` to `auth.users.id`. If the requester owns a classroom, the request is marked `needs_classroom_transfer`. Before deleting a teacher, transfer ownership to another approved teacher or formally close the classroom after resolving memberships and preserving records. No automatic transfer is implemented.
4. **Controlled processing and verification:** an authorized operator must review the request, re-authenticate the requester, check ownership and child/guardian dependencies, and process any approved deletion server-side using Supabase Admin API. Revoke sessions and verify cascades/retained records. The Admin API credential must exist only as a server-side Edge Function secret; never put it in GitHub Pages, HTML, JavaScript, or a phone screenshot.

## Live components
- `public.account_deletion_requests`: live, RLS enabled; no anon/authenticated table privileges; service_role can insert.
- `account-deletion-request`: deployed version 3, JWT verification on, request-only.
- Adult request form: `international-classrooms.html`.
- Source: `supabase/functions/account-deletion-request/index.ts`.
- SQL source: `supabase/account-deletion-requests.sql`.

## Not yet implemented or verified
- No Auth user deletion.
- No classroom transfer/closure interface or RPC.
- No deletion of child learning progress, homework, consent records, or security logs.
- No automatic purge of expired/revoked records.
- No fixed retention period: approve a territory-specific retention schedule after legal/privacy review.
- No claim of legal guardian verification from email verification alone.
- Database transaction simulation passed: a request row was created inside a transaction, duplicate open request was rejected by the unique index, and the transaction was rolled back; persistent request rows remain zero. This does not replace a live authenticated Edge Function test. The live form still needs an Android test with disposable adult/student test accounts.

## Required pre-launch tests
Use disposable test accounts and synthetic data only:
- Student account is rejected by the request endpoint.
- Verified adult guardian and approved teacher can submit; duplicate requests do not create duplicates.
- A teacher owning a classroom receives `needs_classroom_transfer` and cannot be deleted until transfer/closure is completed.
- Transfer preserves classroom and student work.
- A test deletion removes only eligible user-linked records; required audit records remain.
- Existing JWT/session behaviour is checked after deletion; signing out/revoking sessions is part of the procedure.
- Cross-device test with separate teacher and guardian accounts.

## Retention schedule decision
Do not invent durations. Before launch, approve retention periods and legal basis for account identity, guardian consent evidence, classroom records, learning progress, homework, support records, and security/rate-limit logs. Document backup expiry and processor deletion too.


## 2026-11-10 live deployment recheck

- Re-fetched the deployed `account-deletion-request` function. It is ACTIVE at version 4 with JWT verification enabled.
- Confirmed the current handler still records an adult request for manual review only. It does not delete Auth users, child accounts, classroom records, learning progress, homework, or consent evidence.
- The earlier version 3 references in this document have been corrected to version 4.
