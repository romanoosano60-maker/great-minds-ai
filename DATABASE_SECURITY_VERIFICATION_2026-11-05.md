# Database migration and security verification update
Checked: 5 November 2026

## Applied to Supabase production project
- Migration `20261105081455_fix_guardian_consent_revocation_result` applied successfully.
- Migration `20261105081504_enforce_homework_submission_score_max` applied successfully.
- The guardian revocation function now determines success from rows actually revoked, rather than searching for any recently revoked row.
- The score guard trigger rejects scores greater than the linked assignment's `max_points`.
- Function permissions checked: authenticated users can call the public revocation wrapper; anon cannot. The private helper functions cannot be directly executed by anon or authenticated users.

## Tests
- A rollback-only test exercised guardian revocation using the active guardian test relationship. The transaction was rolled back; no production relationship was changed.
- A rollback-only homework test inserted temporary test assignment/submission records, accepted a score equal to the maximum, and rejected a score above the maximum. The transaction was rolled back; no test records were retained.
- All seven main public learning tables remain RLS-enabled.
- Classroom approval policy still requires an approved teacher and guardian consent before membership can be approved.
- Teacher membership updates remain limited to the membership-status column; teachers cannot set guardian-consent status.

## Remaining owner/device actions
- Supabase Security Advisor still reports leaked-password protection disabled. Enable it in the Auth dashboard if the current plan supports it.
- Separate real teacher, student and guardian sessions still need an owner-controlled test on different devices.
- Cross-device realtime and consent revocation must be tested end-to-end through the UI.
- Cloudflare/AI Teacher backend deployment and secret configuration remain owner actions.
- Android graphics, audio and full navigation tests remain owner/device actions.

## Remaining database advisor findings
- Two multiple-permissive-SELECT-policy performance warnings remain for homework assignments and student learning progress. These are role-specific access paths; do not merge or remove them without a full authorization-equivalence test.
- Five unused-index informational warnings remain. Keep the indexes until real usage is measured; the project currently has very little test data.
- No data rows were intentionally changed by the verification tests.
