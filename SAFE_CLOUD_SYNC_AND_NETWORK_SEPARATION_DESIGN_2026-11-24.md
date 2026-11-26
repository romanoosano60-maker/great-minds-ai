# Great Minds AI — Safe Cloud Sync and Network Separation Design

Date: 24 November 2026  
Status: identity-bound progress retry is implemented in source and deployed; **no network schema migration or data backfill is applied by this document**.

This document closes the design work that can be completed safely from source inspection. It deliberately does not claim that the proposed systems are deployed or tested.

## 1. Current progress-storage behaviour

The shared helper `student-cloud-progress.js` now:
- Validates subject/activity names, score ranges, optional correct/question counts and UUID operation IDs. It generates a UUID when a caller omits one.
- Writes a device-local history copy to `gm_independent_pending_progress`.
- Attempts an immediate insert into `public.student_learning_progress` only after checking the signed-in account.
- Uses the operation UUID as the cloud row ID and treats an exact duplicate as idempotent success; a duplicate with different immutable values is a conflict.
- Returns separate `saved`, `localSaved` and `queued` state so a device copy or queued record is not described as cloud-confirmed.
- Stores new retry items in `gm_authenticated_progress_sync_queue`, bound to the owner account UUID. It queues only newly created progress records tied to a verified account, or a cached session awaiting later server verification.
- Never auto-uploads legacy anonymous local history. Cached-session items are not uploaded until a later `getUser()` call confirms the same account.
- Retries on initial authenticated session, sign-in, token refresh, network reconnection and explicit calls to `gmSyncPendingStudentProgress()`.
- Caps the queue at 100 entries and expires entries after 30 days. Queue payloads contain only score/activity metadata, not learner nicknames, free-form writing, audio, contact details or precise location.

The helper uses the existing RLS-protected insert path. The database remains the authority for guardian consent and row ownership; the browser queue does not bypass RLS.

## 2. Implemented retry design and remaining acceptance tests

The source implementation is merged into `main` and deployed to GitHub Pages. Seventeen automated tests pass in GitHub Actions. They cover validation, local-only saves, signed-in ownership, no-session behaviour, guardian-consent/RLS denial, same-account retry, cached-session verification, account switching, legacy-history non-upload, generated operation IDs, duplicate conflicts, queue limits/expiry, sign-in/reconnect triggers and bounded reads.

### Required owner/device tests before treating cloud sync as accepted

- No signed-in account: local-only entry is not uploaded.
- Account A creates an offline entry; Account B signs in on the same device: A's entry is not uploaded as B.
- Account A signs back in: only A's queued entry may sync.
- Guardian consent absent/revoked: upload is denied and the local copy remains queued; after consent is restored, the same account can retry.
- Network failure then reconnect: exactly one cloud row after eventual success.
- Sign-out during a retry: no next account inherits the item.
- Parent/teacher reads: RLS exposes only records permitted by the existing relationship and classroom policies.
- Browser storage disabled/full: the page reports that local/queue storage could not be confirmed; it must not claim cloud save unless the server confirms it.

A caller that omits an operation ID receives a generated ID for that invocation and its internal queue retry. A separate later call without the original ID is a new operation; older pages with user-triggered retry should retain their own per-attempt ID.

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

**Completed:** identity-bound deferred progress retry is implemented in source, merged and deployed; 17 automated tests pass; legacy anonymous history is explicitly excluded from auto-upload; network semantics and the migration/test sequence are documented.

**Not claimed complete:** real Android/offline account acceptance, separate-account Supabase RLS tests, network schema migration, verified country data, cross-border collaboration controls, production guardian-code rate limiting, authenticated AI response, LiveKit call tests, legal/privacy approval, or native Android packaging.

No secret values, service-role credentials, or child personal data belong in GitHub Pages source or this document.


## Live-schema validation — 26 November 2026

The live database confirms that the proposed country boundary cannot yet be enforced safely:

- `classrooms.Country` is free text. The table has no network type or normalized country code.
- `teacher_profiles` has only an approval flag and no country or country-verification field.
- There is no trusted country field on student or guardian records.
- Classroom membership is created through `private.join_classroom_by_code(text)`. It is authenticated, rate-limited to 20 code attempts per user/day, and creates a pending membership. It does not inspect country or network type.
- Membership approval remains constrained by teacher approval and the existing parent-consent status RLS check.
- An active guardian relationship currently causes a new classroom join request to receive `parent_consent_status='approved'`. Confirm whether this global guardian consent is intended to cover all future classrooms or whether consent must be classroom-specific before extending the model.

**Do not treat a free-text country or a UI label as a security boundary.** First choose and verify the authoritative country source. Then design an explicit approved school-to-school partnership for international collaboration, including both approved teacher/school owners and guardian approval for each participating learner. Existing classrooms should remain unclassified until their country and ownership are reviewed.

No production schema, RLS policy or classroom membership was changed during this inspection.
