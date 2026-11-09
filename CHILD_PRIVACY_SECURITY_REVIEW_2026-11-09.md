# Great Minds AI — Child Privacy and Guardian Consent Security Review

Review date: 9 November 2026
Status: technical source/database review; not legal approval or a launch clearance.

## Verified in the connected Supabase project

- Row Level Security is enabled on `guardian_relationships`, `classroom_members`, `teacher_profiles`, `student_learning_progress`, `homework_assignments`, `homework_submissions`, and the private guardian-consent token table.
- Direct client table privileges on `private.guardian_consent_codes` are not granted to `anon` or `authenticated`. The consent-code functions are executable by authenticated accounts only; anonymous and PUBLIC execution is denied.
- Consent codes are 64 hexadecimal characters, expire after 24 hours, and are marked used after redemption. A new code invalidates earlier unused codes for that student.
- On 9 November 2026, newly generated consent-code hashes were upgraded from MD5 to SHA-256 using the installed pgcrypto extension. Redemption accepts legacy MD5 hashes during compatibility, as well as SHA-256 hashes. There were no outstanding valid codes at the time of the change.
- A SHA-256 known-answer check passed against the standard SHA-256 digest for the input `abc`.
- Redemption requires an authenticated account, a verified account email, and an explicit affirmative guardian declaration. Self-consent is rejected.
- Classroom approval remains separate: a teacher can approve a student's membership only when the guardian-consent status is approved.
- Guardian revocation changes the linked child's classroom membership and consent status to rejected.
- Relevant database functions use SECURITY DEFINER with an empty search_path and explicitly qualified object references. Function grants were checked: authenticated only; anon and PUBLIC cannot execute.

## Important limitation — not proof of legal guardianship

The current workflow verifies an email address and records an affirmative declaration. It does **not** independently verify that the account holder is the child's parent or legally authorized guardian. A one-time code proves access to the student's account-generated code, not a family relationship. Do not describe this as legally verified parental consent.

Before enabling real child accounts or classroom participation in a launch country, the publisher must choose and implement a consent/guardian-verification process that meets the laws applicable to that country and age group, and obtain qualified legal/privacy review.

## Still required before launch

1. Test the entire consent journey using separate adult-controlled student and guardian accounts on real devices. Confirm code generation, expiry, one-time use, email verification, consent recording, teacher approval gating, and revocation.
2. Confirm the legal guardian-verification method and parent notice for every launch territory.
3. Inventory actual data collected and every processor/vendor, including authentication, hosting, database, AI, speech, analytics and diagnostics.
4. Define retention, deletion, correction, export, consent withdrawal, account closure, backup deletion and support processes; verify them end-to-end.
5. Keep child-to-child messaging and open international chat disabled until moderation, reporting, blocking, adult escalation and realtime authorization are reviewed and tested.
6. Enable Supabase Leaked Password Protection if supported by the project's plan. Security Advisor still reports this warning.
7. Run real separate-account and cross-device tests for student, guardian, approved teacher and unapproved teacher roles.

## Security Advisor findings at review time

- Informational `RLS Enabled No Policy` notices remain for `private.ai_teacher_daily_usage` and `private.classroom_join_attempts`. These are private tables intentionally inaccessible directly to client roles; access is mediated by narrowly granted functions.
- Warning `Leaked Password Protection Disabled` remains open. See [Supabase Auth password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

This review is an engineering status note only. It is not a statement that Great Minds AI is legally compliant, fully secure, or ready for public launch.
