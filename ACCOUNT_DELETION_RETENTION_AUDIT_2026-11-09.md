# Great Minds AI — Account Deletion and Data Retention Audit

Review date: 9 November 2026
Status: database review and one referential-integrity safeguard applied. No user or learning data was deleted.

## Live project snapshot

- 4 Auth accounts exist.
- 2 classrooms exist; both have a non-null teacher ID that matches an existing Auth account.
- 1 active guardian relationship exists.
- 2 guardian consent-code rows exist; both are already used or expired. There are 0 valid unused consent codes.
- Current database row counts observed: 3 student learning-progress rows, 1 homework assignment, 0 homework submissions, 0 classroom membership rows, 1 teacher profile.
- Supabase Storage currently reports 0 buckets.
- No DELETE RLS policies were found on the reviewed public/private application tables. This prevents direct client-side row deletion; it is not an account-deletion workflow.

## Account deletion dependencies

The following user-owned records have foreign keys to `auth.users` configured with `ON DELETE CASCADE`:
- Teacher profiles
- Student learning progress
- Classroom membership requests
- Guardian relationships (whether active or revoked)
- Guardian consent-code records
- Classroom join-attempt counters
- Homework assignments (teacher-owned)
- Homework submissions (student-owned)

The homework submission `marked_by` field uses `ON DELETE SET NULL`, preserving the submission if the marker account is removed.

Supabase Auth identities, sessions and related authentication records also cascade as configured by Supabase.

## Important issue found and corrected

Before this review, `public.classrooms.teacher_id` had no foreign key to `auth.users`. Deleting a teacher account could therefore leave classroom records with an orphaned owner ID.

A validated foreign key was added:
```sql
foreign key (teacher_id) references auth.users(id) on delete restrict
```
This intentionally prevents deletion of a teacher account while that teacher still owns classrooms. The owner must first arrange an explicit classroom transfer or deletion. This is safer than silently leaving ownerless classrooms or automatically deleting student work. The constraint was validated successfully; the two current classrooms both reference existing accounts.

SQL source: [account deletion safety constraint](https://github.com/romanoosano60-maker/great-minds-ai/blob/main/supabase/account-deletion-safety.sql)

## Retention findings

- Expired/used guardian codes are retained in the database; two rows were present at audit time.
- There is no agreed retention schedule for expired consent codes, revoked guardian relationships, homework, learning progress, or security records.
- No automatic purge job was found/confirmed.
- Do not add automatic deletion until the publisher chooses retention periods and legal requirements for launch countries. Consent evidence may need a carefully limited audit record even after access is revoked.

## Storage findings

Supabase currently reports zero Storage buckets. If future versions upload profile images, voice clips, homework attachments, or other files, account deletion must include a server-side Storage cleanup plan. Supabase documents that Auth user deletion can fail when that user owns Storage objects. [Supabase user management](https://supabase.com/docs/guides/auth/managing-user-data).

## Account deletion workflow — not yet implemented

The application has no user-facing delete-account flow in the reviewed student profile, parent dashboard, or connected-parent pages. Do not expose a browser-side delete function using a secret/service-role key.

Before launch, implement a trusted server-side process that:
1. Requires a signed-in account and re-authentication or equivalent confirmation.
2. Requires guardian-led handling for child accounts, consistent with applicable law and policy.
3. Exports or provides access to eligible personal data before deletion when required.
4. Checks whether the user owns classrooms; offers ownership transfer or an explicit reviewed deletion path.
5. Removes user-owned Storage objects if any exist in future.
6. Deletes the Auth user through the server-side Admin API; never place a service-role/secret key in GitHub Pages or browser JavaScript.
7. Verifies cascaded rows, handles any records that must be retained with minimized/pseudonymized identifiers, and signs the client out locally.
8. Explains expected backup retention and third-party processor deletion timing.

Supabase warns that deleting an Auth user does not retroactively invalidate an already-issued access JWT until it expires. Sensitive operations should account for that window. [Supabase user management](https://supabase.com/docs/guides/auth/managing-user-data).

## Still required

- Decide retention periods and data categories with appropriate legal/privacy advice for each launch territory.
- Implement and test a secure account deletion request flow on the server.
- Implement classroom ownership transfer / close process for departing teachers.
- Confirm backup retention and user-data export/correction process.
- Test with disposable accounts in staging, including guardian and teacher roles. Do not test by deleting the four existing project accounts.
- Complete parent/guardian identity verification, separate from email verification and self-declaration.

This is an engineering audit, not legal advice, a compliance certification, or public-launch approval.
