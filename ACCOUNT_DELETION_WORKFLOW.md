# Great Minds AI — Account deletion workflow

## Current status
A **request-only** Edge Function is deployed as `account-deletion-request` with JWT verification enabled. It verifies the signed-in user and records a request. It NEVER deletes an Auth user or app data. The request table is live with RLS enabled, no direct anon/authenticated access, and service-role-only access. It currently contains zero requests.

## Four safeguards
1. **Authenticated request:** require a valid Supabase user session and explicit confirmation. The server verifies the bearer token; clients cannot insert request rows directly. Duplicate open requests are prevented.
2. **Child/guardian protection:** do not delete a child account solely from a child's session. A verified guardian must initiate and affirm the request; support must review the guardian relationship and applicable legal requirements. Email verification and a checkbox alone do not prove legal guardianship.
3. **Teacher/classroom protection:** the live database has a validated RESTRICT foreign key from `classrooms.teacher_id` to `auth.users.id`. Before deleting a teacher, transfer classroom ownership to another approved teacher or formally close the classroom after resolving memberships and preserving records. Never silently cascade-delete student work.
4. **Controlled processing and verification:** an authorized operator must review the request, re-authenticate the requester, check ownership and child/guardian dependencies, and process any approved deletion server-side using Supabase Admin API. Revoke sessions and verify cascades/retained records. The Admin API credential must exist only as a server-side Edge Function secret; never put it in GitHub Pages, HTML, JavaScript, or a phone screenshot.

## Live components
- `public.account_deletion_requests`: live, RLS enabled; no anon/authenticated table privileges; service_role can insert.
- `account-deletion-request`: deployed, JWT verification on, request-only.
- Source: `supabase/functions/account-deletion-request/index.ts`.
- SQL source: `supabase/account-deletion-requests.sql`.

## Not yet implemented or verified
- No Auth user deletion.
- No user-facing request form in the app.
- No classroom transfer/closure interface.
- No deletion of child learning progress, homework, consent records, or security logs.
- No automatic purge of expired/revoked records.
- No fixed retention period: the product owner must approve a territory-specific retention schedule after legal/privacy review.
- No claim of legal guardian verification from email verification alone.
- No authenticated end-to-end function test yet; deployment is confirmed, and the request table security/grants are verified.

## Required pre-launch tests
Use disposable test accounts and synthetic data only:
- Student cannot submit a guardian deletion request.
- Guardian request is authenticated and recorded once; duplicate requests do not create duplicates.
- A teacher owning a classroom is blocked from deletion until transfer/closure is completed.
- Transfer preserves classroom and student work.
- A test deletion removes only eligible user-linked records; required audit records remain.
- Existing JWT/session behaviour is checked after deletion; signing out/revoking sessions is part of the procedure.
- Cross-device test with separate teacher and guardian accounts.

## Retention schedule decision
Do not invent durations. Before launch, approve retention periods and legal basis for account identity, guardian consent evidence, classroom records, learning progress, homework, support records, and security/rate-limit logs. Document backup expiry and processor deletion too.
