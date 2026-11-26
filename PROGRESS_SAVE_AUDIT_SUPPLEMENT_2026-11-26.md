# Great Minds AI — Progress-Save Audit Supplement
**Date:** 26 November 2026  
**Repository:** `romanoosano60-maker/great-minds-ai`

## New source-level correction

A focused review of the expanded Vocabulary challenge found a legacy save call that submitted a score without a stable per-attempt operation ID and did not provide a retry control. The primary Vocabulary challenge already had a retryable save path.

Updated `vocabulary.html` so the expanded 12-question challenge now:
- creates one operation UUID for each completed attempt;
- reuses the same UUID and score payload when the learner retries;
- displays a visible **Retry cloud save** control when the cloud save is unavailable or unconfirmed;
- reports success only after the shared helper confirms the cloud write;
- prevents restarting while a cloud save is in flight; and
- resets the operation ID only when starting a genuinely new attempt.

No free-form sentence writing or other child-generated content is sent to the progress table by this change. The change affects only the quiz score metadata.

## Verification evidence

- Source commit: `1a5380db2af7613ac3769490e7c0b8a057e50e35`.
- Static repository checks for that commit: **passed** (workflow run `45797138602`).
- GitHub Pages deployment for that commit: check the live workflow status before treating the change as deployed.
- Prior source commit `9162077aaf04466b4f6f3f614644fee1d9a027dd`: static checks and Pages deployment both passed (runs `45796447882` and `45796446880`).

## Scope and limitations

This was a focused review of the Vocabulary expanded challenge and selected learning/progress pages. It is not a claim that every historical progress write in all 63+ HTML pages has been individually runtime-tested.

Source checks cannot prove that a real learner's authenticated Supabase insert succeeds, that RLS/guardian consent behaves correctly for separate accounts, or that a parent sees the right records on another device. Those remain acceptance tests using adult-controlled test accounts.

The local Independent Student profile/history remains a same-device feature, not a secure cross-device cloud dashboard. Device-only history must not be described as cloud-confirmed progress.

## Still owner-gated

- Android phone acceptance and accessibility/navigation checks.
- Student A / Student B offline account-switch isolation and linked Parent A visibility.
- Separate teacher/student/guardian classroom consent and revocation tests.
- Authenticated AI Teacher request/response test.
- LiveKit classroom call test on separate devices.
- Privacy, retention, deletion/export, guardian verification and launch-country review.

No production RLS policies, database schema, secrets, or pending guardian-consent migrations were changed in this audit.
