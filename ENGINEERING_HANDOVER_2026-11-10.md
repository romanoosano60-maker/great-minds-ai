# Great Minds AI — consolidated engineering handover
**Audit date:** 10 November 2026  
**Repository:** `romanoosano60-maker/great-minds-ai`  
**Supabase project:** `ryuchmmnyjyldwouidyy`

## 1. Purpose and audit boundary

This is the consolidated engineering handover for the current source/backend review. It separates code inspection and backend configuration evidence from public deployment, real-device execution, and owner acceptance tests.

The GitHub repository tree contains **202 tracked files**. The source review covered the app entry page, core subject/audio pages, AI Teacher, International Classrooms, supervised classroom calling, student/teacher/parent dashboards, homework, account-request workflow, shared Supabase configuration, relevant backend functions, database policy scripts, and project records. An earlier repository-wide duplicate-blob comparison found no exact duplicate files; no files were deleted.

This pass did not create real child records, expose secrets, alter production accounts, broaden RLS, or remove database policies/indexes.

## 2. Source repairs completed

### Password-field and sign-out hygiene
Password fields are now cleared on all the reviewed sign-in attempts, including authentication failures, network exceptions, and early exits:

- `international-classrooms.html` — test account creation and sign-in.
- `connected-dashboards.html` — teacher account check.
- `connected-parent.html` — parent sign-in.
- `connected-student.html` — student sign-in; also clears the field when signing out.
- `connected-teacher.html` — teacher sign-in; also clears the field when signing out.
- `supabase-connect.html` — legacy teacher connection test; clear-session attempts a Supabase Auth logout before reporting its result.

Each changed file was re-fetched after its commit and the relevant cleanup code was confirmed. These are source-level checks; the Android/browser runtime still needs testing.

### Audio lifecycle
- `vocabulary.html`: Stop increments the speech request generation so pending voice-load callbacks cannot restart speech after the learner stops or leaves.
- `english.html`: lesson audio is stopped when the page becomes hidden or is closed; timers and AudioContext are cleaned up.
- `ai-teacher.html`: microphone recognition is aborted and speech playback stopped when the page is hidden or closed. The privacy notice explains that browser/device speech recognition may be processed by the device/browser speech provider; only the recognised text is sent to the AI endpoint after the learner taps Ask Teacher.

### Classroom call privacy
- The call page starts with microphone and camera OFF.
- Guardian observer controls cannot publish media.
- The teacher is the only role permitted to start/end a supervised call.
- Student/guardian joining is restricted by server-issued token checks and teacher presence.
- Page exit disconnects the local LiveKit room; loss of the teacher ends the supervised session for the other participants.
- Actual LiveKit secret presence, network quality, and separate-device audio/video behavior still require owner testing.

## 3. Live Supabase evidence

The current project lists these Edge Functions as ACTIVE with JWT verification enabled:

| Function | Version | Purpose / boundary |
|---|---:|---|
| `ai-teacher` | 6 | Authenticated AI text-answer endpoint; eligible approved teacher or student/guardian-linked account; quota enforced before paid AI request |
| `classroom-call-token` | 7 | Server-authorised LiveKit token issuance and supervised classroom call roles |
| `account-deletion-request` | 5 | Adult account-deletion request intake for manual review only; does not delete accounts or learning data |

### AI Teacher
The current implementation is a secure text-answer endpoint. The web page can transcribe speech using browser/device speech recognition and read answers using browser speech synthesis. It is **not** continuous natural voice-to-voice AI conversation. The endpoint checks authenticated account eligibility and consumes database-enforced daily quotas (10 per account/day and 100 shared/day in the inspected implementation). A successful approved-account request and a rejected unrelated-account request still need live owner testing.

### Guardian consent and classroom membership
The reviewed database functions require a signed-in account, verified guardian email, explicit consent affirmation and a one-time 64-character code with a 24-hour expiry. Teacher approval remains separate. This is account-based consent; it does **not** independently verify legal identity or prove a family relationship. Revocation is implemented and should be tested by revoking consent and confirming access is blocked.

### Account deletion and retention
The endpoint accepts an eligible verified-adult request and records it for manual review. It does not automatically:
- delete the Supabase Auth user;
- revoke all active sessions on every device;
- delete or anonymise the learner's progress, homework, or other child data.

Classroom ownership must be transferred or formally closed before an approved teacher's account can be considered for deletion. The retention schedule, deletion execution procedure, child-data disposition, and confirmation process must be formally decided and tested before real requests are processed.

## 4. Supabase advisor snapshot — 10 November 2026

- **Health:** no advisor findings.
- **Security:** three informational RLS-enabled/no-policy notices on restricted operational tables (`private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`). These tables intentionally do not grant direct client access; do not add broad policies to silence the notices.
- **Security:** leaked-password protection is disabled and remains a hardening item, subject to the project's available plan/settings.
- **Performance:** five unused-index notices and two multiple-permissive-SELECT-policy notices. These are not a reason to drop indexes or merge policies without query evidence and policy-equivalence review.

No live RLS policy, schema, index, secret, or user record was modified during this audit.

## 5. Honest feature boundaries

- The older `safe-international-classroom-v3.html` is explicitly a local demonstration, not secure live chat or real parent verification.
- The connected role dashboards retain local-demo areas; their secure cloud overview sections are separate and depend on Supabase RLS. Local demo data must not be represented as cross-device live records.
- `homework.html` and `student-cloud-homework.js` exist. The secure section is separate from the older local teacher/student/parent tabs. The secure flow still requires a complete teacher-publish → consented student-submit → teacher-mark → linked-parent-view test on separate accounts/devices.
- The current database snapshot previously showed no homework submissions and no classroom-member rows. This snapshot does not disprove the owner's earlier successful login/classroom test; it means the exact end-to-end acceptance path needs a fresh controlled run and persisted evidence.
- The owner has reported that the Picture Library sections work and that the 3D graphics repair is complete. Those owner-confirmed items should be rechecked only in the consolidated Android acceptance pass, not repeatedly counted as engineering failures.
- The main subject pages contain additional practice banks and selected cloud-progress save paths. Not every local score, writing activity, reward, certificate, or practice record is fully synchronised to the cloud.

## 6. Deployment and Android readiness

- The GitHub repository is public and its default branch is `main`.
- The repository tree contains no Android project, Capacitor configuration, package manifest, web-app manifest, or service-worker file. Android packaging has not started.
- A public GitHub Pages deployment and its final published URL have not been independently confirmed in this audit.
- The latest source commits have no reported GitHub workflow runs or status checks. There is no CI result to treat as a successful build/deployment.
- Do not call the project launch-ready or Android-app complete until the public site, supported Android route, privacy/consent process, and runtime tests have passed.

## 7. Consolidated owner acceptance sequence

Run these once, in order, after the engineering handover is accepted:

1. Open the confirmed published site on Android and verify the main home screen and all primary navigation links.
2. Verify Supabase Auth password rules and available leaked-password protection settings; test sign-in, sign-out, and the eventual password-reset/change journey.
3. Use separate adult-controlled test accounts for teacher, student, and guardian. Confirm approval boundaries and ensure an account cannot see another classroom.
4. Join a classroom using the one-time code; confirm guardian consent, teacher approval, and then revoke consent. Verify revoked access is blocked.
5. Complete one secure homework cycle: teacher publishes, consented student submits, teacher marks, linked parent sees the result on another device.
6. Test AI Teacher with an approved account and an unrelated account; verify quota/error behavior and text answer quality.
7. Test English/vocabulary audio on Android: play, stop, navigate away, lock screen, return, and confirm speech does not restart unexpectedly.
8. Test supervised audio and video calls on separate devices. Confirm camera/microphone start OFF, guardian is observer-only, teacher departure ends the session, and call controls recover from network interruption.
9. Submit a test adult account-deletion request only; do not delete production data. Verify the manual-review and retention procedure before any real request.
10. Check child privacy notices, consent language, data access, session sign-out, and account/device behavior.
11. Complete the final Android layout, sound, performance, offline/network interruption, and cross-device acceptance pass.

Use fictional test data only. Do not paste passwords, service-role keys, OpenAI keys, or LiveKit secrets into chat or browser code.

## 8. Status rule

This handover records **source/backend audit work**, not a final product-completion percentage. Keep four measures separate:
- engineering source work;
- deployed/live backend and website verification;
- owner Android/device acceptance testing;
- legal/privacy and launch readiness.

The project is not marked 100% complete until each required item is genuinely implemented, deployed where applicable, and tested. Marketing, pricing, publishing, and advertising remain out of scope until the owner confirms the app has reached genuine completion.


## Final homepage route check — 10 November 2026

The current main-branch tree contains **202 tracked files** after adding this handover. All 30 local script/page references parsed from the main `index.html` navigation were matched to tracked files; no missing homepage navigation target was found. This is a static repository-path check, not a live GitHub Pages click-through test.


## Additional privacy/UI corrections — second audit pass

- Found and repaired a parent-dashboard sign-out privacy gap: before the repair, the parent cloud progress panel was cleared but the separate cloud homework panel could remain visible after sign-out. The sign-out handler now clears the password field, resets the signed-in user state, clears both progress and homework displays immediately, removes the Realtime channel, and attempts Supabase Auth sign-out. The updated file was re-fetched and the handler was source-verified.
- Clarified the Student Profile's local-history clear control. It now states that it clears only that page's V2 homework/quiz history on the current device; it does not delete the nickname, other local demo data, or Supabase cloud records. This prevents the button from implying a complete account/data deletion.
- Reconciled older master-guide entries that described the AI endpoint as pending or the secure cloud homework tables as absent. The historical checkpoints are now labelled as historical, and current implementation status is linked to the authoritative 10 November section.
- Rendering-safety spot check: the reviewed connected parent/student cloud records escape dynamic text before HTML insertion; teacher cloud records use text nodes/textContent. The dictionary's HTML template uses its fixed bundled word list, not learner search text. The local role-play dashboards remain explicitly labelled demonstrations and must not be used with real child details.


## Sign-out privacy hardening across role pages — 10 November 2026

A broader pass found the same asynchronous sign-out/display issue could affect other role pages if Realtime channel cleanup failed before the auth sign-out call. The sign-out sequence has now been standardised in:
- Parent Dashboard: clears progress and homework/feedback panels.
- Student Dashboard: clears cloud learning-history panel.
- Teacher Dashboard: clears student progress and homework submission panels.
- International Classrooms: clears classroom/request details, consent code and consent checkbox.

All four pages now clear visible private data and the local signed-in page state immediately, attempt Supabase Auth sign-out independently, and attempt Realtime channel removal separately so a channel-cleanup failure does not prevent the sign-out request. Password fields are cleared as part of sign-out. All four updated files were re-fetched and the relevant handlers source-verified. Actual session invalidation under offline/network-failure conditions still needs owner testing.


## Automated static checks added — 10 November 2026

- Added scripts/static-audit.mjs to check local href/src references across HTML pages and parse standalone JavaScript files with Node.js.
- Added .github/workflows/static-audit.yml to run these checks on pushes and pull requests to main.
- The workflow and script were re-fetched from GitHub after commit. GitHub currently reports no workflow run or status result for the latest commits, so the automated check is installed in source but has not yet produced a passing CI result. Do not report it as a successful build until a run completes.


## Secure Homework Manager sign-out — 10 November 2026

- The secure cloud homework panel previously had no sign-out control of its own, even though it could display assignments, student answers and teacher feedback from the signed-in Supabase session.
- Added a dedicated cloud sign-out button. It clears the secure homework results immediately, attempts Supabase Auth sign-out, then removes the Realtime channel independently. The notice explicitly states that signing out does not delete homework or learning records.
- The updated Homework Manager was re-fetched and the button, scope notice and handler were source-verified. Live Android/session testing remains outstanding.
