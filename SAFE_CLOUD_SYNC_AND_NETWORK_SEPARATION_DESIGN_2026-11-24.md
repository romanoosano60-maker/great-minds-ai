# Great Minds AI — Safe Cloud Sync and Network Separation Design

Date: 24 November 2026  
Status: engineering design prepared; **no database migration or data backfill is applied by this document**.

This document closes the design work that can be completed safely from source inspection. It deliberately does not claim that the proposed systems are deployed or tested.

## 1. Current progress-storage behaviour found in source

The shared helper `student-cloud-progress.js`:
- Validates subject/activity names, score ranges, optional correct/question counts, level values and optional UUID operation IDs.
- Writes score metadata to the browser key `gm_independent_pending_progress` as a device-local copy.
- Attempts an immediate authenticated insert into `public.student_learning_progress` when a Supabase client and signed-in user are available.
- Uses the supplied operation UUID as the database row ID when present and checks a duplicate row before treating a repeated insert as idempotently saved.
- Returns separate `saved` and `localSaved` flags so a local copy is not described as a cloud save.

The helper does **not** currently provide an automatic deferred queue-drain/synchronisation process. Existing device-local records are not reliably bound to the authenticated account that created them. Therefore, silently uploading old local records later could attach one person's activity to another person's account on a shared device.

## 2. Safe future cloud-sync design

Do not auto-upload legacy anonymous local records. A safe implementation should:

1. Create new queue entries only while an authenticated session is present and the current account is verified as the intended learner.
2. Store a stable UUID operation ID, authenticated owner ID, schema version, created timestamp and only the minimum score metadata required.
3. Require the existing approved guardian relationship/consent gate for any child cloud write; do not infer consent from local storage or a selected role.
4. On retry, confirm the current session user ID exactly matches the queue owner ID. If not, leave the entry local and ask the correct account holder to sign in.
5. Submit through the existing RLS-protected data path with the stable operation ID. A duplicate ID with matching immutable values is success; a duplicate ID with different values is a conflict requiring review, not overwrite.
6. Remove a local queue item only after the server confirms the exact operation ID and record owner. Keep a visible distinction between device-only, waiting-to-retry, and cloud-confirmed progress.
7. Apply bounded retry/backoff and a queue size/age limit. Never store child free-form writing, voice recordings, contact details or precise location in the progress queue.
8. Provide an adult-controlled way to clear device-local demo data without deleting cloud records.

### Required tests before enabling deferred sync

- No signed-in account: local-only entry is not uploaded.
- Account A creates an entry; Account B signs in on the same device: A's entry is not uploaded as B.
- Guardian consent absent/revoked: upload is denied and the local copy remains clearly device-only.
- Same operation UUID + same immutable record: one cloud row only.
- Same operation UUID + changed score/activity/owner: conflict is reported; no overwrite.
- Network failure then retry: exactly one cloud row after eventual success.
- Sign-out during a retry: queue processing stops and no next account inherits the item.
- Parent/teacher reads: RLS exposes only records permitted by the existing relationship and classroom policies.

## 3. Family, Local School and International Network model

The current `secure-network.html` correctly explains three intended user experiences but also states that Local and International are not yet separate database network types and country boundaries are not yet enforced.

The three concepts should not be represented as three interchangeable classroom labels:

- **Family Network** is a guardian-to-child relationship and consent/access model. It should remain anchored in `guardian_relationships`, not be implemented as a classroom.
- **Local School Network** is a teacher-owned classroom whose school/teacher country and classroom country are normalized and verified.
- **International Network** is a cross-border collaboration between separately approved classrooms. It should require explicit approval by both classroom owners and applicable guardian consent before any learner is exposed to the partner classroom.

### Proposed schema direction (not applied)

- Add a constrained `network_type` to classrooms with values `local_school` and `international`; Family remains a separate relationship model.
- Add a normalized country code field only after existing free-text `Country` values have been reviewed and mapped. Do not guess country codes from ambiguous legacy text.
- Add a separate classroom-collaboration table with source classroom, partner classroom, each owner approval, status, timestamps, and revocation metadata.
- Keep cross-border collaboration closed by default. A classroom is not international merely because a user types another country in a text field.
- Enforce same-country local membership and approved cross-border pairing in database RLS/RPC logic, not only in browser code.
- Do not enable direct child-to-child messaging as part of the first network migration. Keep it disabled until moderation, reporting, blocking, adult escalation, retention and deletion are implemented and tested.

### Migration and test order

1. Inventory actual classroom rows and the source/meaning of every country value.
2. Confirm the country-code standard and the operator responsible for validating school/teacher country.
3. Add nullable columns and constraints in a reviewed migration; do not add a permissive default that classifies all historical rows as international.
4. Backfill only rows whose country/network classification is supported by evidence; leave uncertain rows unclassified and inaccessible to cross-border matching.
5. Add collaboration records and security-definer approval/revocation functions with narrow grants.
6. Write RLS tests for owner, approved teacher, student, guardian, unrelated user, local same-country, cross-border approved and cross-border unapproved cases.
7. Apply to a test project first; inspect policies and privilege grants; test positive and negative access with separate accounts.
8. Only then schedule production migration with a rollback plan and data backup.

## 4. Other source/configuration boundaries

- AI Teacher v9 is reported ACTIVE with JWT verification, but the provider secret's presence and a successful authenticated generated answer are not independently confirmed.
- Classroom Call Token v9 is reported ACTIVE with JWT verification, but LiveKit server secret configuration and separate-device call behaviour remain unconfirmed.
- Account deletion v7 is a request intake workflow, not automatic deletion of accounts and child records.
- Leaked Password Protection remains a Supabase Auth setting requiring owner action if supported by the plan.
- Native Android packaging is not present in the repository inventory; it should follow successful web acceptance, not be improvised before the owner confirms the release route.

## 5. Current engineering disposition

**Completed in this design pass:** source behaviour documented, unsafe legacy auto-sync explicitly ruled out, future identity-bound idempotent sync contract specified, network semantics separated, migration sequence and positive/negative security tests specified.

**Not claimed complete:** deferred sync implementation, network schema migration, country data verification, RLS changes, production database deployment, authenticated AI response, LiveKit call tests, legal/privacy approval, or Android acceptance.

No secret values, service-role credentials, or child personal data belong in GitHub Pages source or this document.
