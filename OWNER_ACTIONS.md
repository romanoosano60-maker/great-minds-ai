# Great Minds AI — Owner Actions and Final Test Checklist

Last checked: 5 November 2026

This file lists only actions that still need the project owner or a real-device test. Source code and database configuration can be prepared from the connected tools, but a static code review cannot sign in as a real family, deploy a Cloudflare Worker, hear Android audio, or submit an app to an app store.

## 1. AI Teacher — deploy and verify the secure endpoint

**Prepared in GitHub**
- `cloudflare/worker.js` contains the POST `/ask` endpoint and GET `/health`.
- The Worker verifies the Supabase access token, checks an active guardian relationship, limits requests per user, accepts only the nine approved subjects, and calls the OpenAI Responses API with `store:false`.
- `ai-teacher.html` can call the endpoint when configured.
- `ai-teacher-config.js` is intentionally blank until the real Worker URL is known.

**Owner actions**
1. Open the existing Cloudflare Worker `great-minds-ai-backend`.
2. Deploy the current source from `cloudflare/worker.js`.
3. Add the secret `OPENAI_API_KEY` in Cloudflare Secrets. Never put it in GitHub or browser code.
4. Add variables `SUPABASE_URL=https://ryuchmmnyjyldwouidyy.supabase.co`, `SUPABASE_PUBLISHABLE_KEY` (public publishable key only), and `OPENAI_MODEL=gpt-5.4-mini`.
5. Add the `AI_RATE_LIMITER` binding required by the Worker source.
6. Test `GET /health`, then configure the actual deployed Worker URL ending in `/ask` in `ai-teacher-config.js`.
7. Test with an adult-controlled student test account that has an active guardian relationship. Confirm the chosen subject is included in the answer, unauthorised accounts are rejected, and rate limiting works.

**Not complete until:** Worker deployment, health check, configured frontend URL, and a successful consented test request are all verified.

## 2. International classrooms — real account and consent test

**Database state checked**
- Seven public tables exist and all seven have Row Level Security enabled: classrooms, teacher_profiles, classroom_members, guardian_relationships, student_learning_progress, homework_assignments, homework_submissions.
- Realtime publication includes classrooms, classroom_members, homework_assignments, homework_submissions and student_learning_progress.
- Current row counts: 1 classroom, 1 teacher profile, 1 active guardian relationship, 0 classroom memberships.
- No real student progress, homework assignments or homework submissions exist yet.

**Database correction prepared in GitHub (not yet applied)**
- Review `supabase/migrations/20261105_fix_guardian_consent_revocation.sql`. It corrects the revocation function so it reports success only when an active guardian link was actually revoked, and blocks the linked student's pending/approved classroom memberships.
- The connected database migration tool blocked the automatic DDL change, so the live function remains unchanged until this migration is applied through the Supabase SQL Editor or migration workflow.

**Owner actions**
1. In Supabase Auth, create/use adult-controlled test accounts for one approved teacher, one student, and one parent/guardian. Do not use a real child's personal details during testing.
2. Verify the guardian account's email and complete the explicit guardian-consent process on the International Classroom page.
3. Sign in as the student, request to join the existing test classroom using its code, and confirm the request remains pending until approval.
4. Sign in as the approved teacher and approve the consented membership.
5. Open the same classroom from the student account and verify it appears.
6. Revoke guardian consent in the guardian account and verify that the student can no longer submit new classroom work or use consent-gated features.

**Security setting still outstanding**
- Supabase Security Advisor currently reports **Leaked Password Protection Disabled**. Enable it in Auth password/security settings if the current Supabase plan supports it. Supabase documents this feature as available on Pro plan and above. If the project plan does not include it, record that limitation and do not assume it is enabled.

**Not complete until:** teacher, student and guardian flows pass with real authenticated sessions and the revoke path is tested.

**Additional database migration prepared (not yet applied)**
- Review `supabase/migrations/20261105_enforce_homework_score_max.sql`. It adds a database trigger that rejects marks above an assignment's `max_points`. The browser helper also checks the assignment maximum before sending a mark.
- The browser helper change is committed; the database trigger remains pending until the migration is applied and verified in Supabase.

## 3. Student progress and homework — cross-device test

**Prepared in GitHub and Supabase**
- Subject quiz pages use the shared authenticated progress helper where integrated.
- The Student Profile has a cloud progress viewer.
- Secure homework tables, client helper and separate cloud workflow are present.
- Older local-demo tabs remain local-device demonstrations and must not be mistaken for cloud records.

**Owner actions**
1. With the consented student test account, complete one quiz on a subject page and confirm the page reports that the cloud save succeeded.
2. Open the Student Profile / Connected Progress page and confirm that same result appears from Supabase.
3. Sign in as the linked guardian on a different browser/device and confirm the permitted progress is visible.
4. As the approved teacher, publish a test assignment to the classroom.
5. As the student, submit a short fictional answer.
6. As the teacher, mark the submission and add feedback.
7. As the guardian, confirm the assignment, answer, mark and feedback are visible.
8. Repeat a read on a second device to verify Realtime updates, not just local browser storage.

**Not complete until:** progress insert/read and homework publish/submit/mark/guardian-read all succeed under separate authenticated accounts on separate devices.

## 4. Graphics, audio and full app test

- Open the 3D Learning Graphics Gallery on the Android phone and confirm all embedded images display.
- Test English ABC, Twinkle Twinkle and Counting Song. Confirm both the beat and spoken words are audible. The current voice uses the phone/browser's speech voice; it is not a recorded singer.
- Tap every main home-screen tile and every dashboard link. Report any blank page, 404, missing image or button that does nothing.
- Test the app on a second screen size if available.

## 5. Business, privacy and publishing

- Confirm publisher/legal name, support contact, target age range and countries of operation.
- Confirm the actual data collected, third-party processors, retention, deletion and parent-consent procedures; then obtain appropriate privacy/legal review. The repository privacy document is a working draft, not a final policy.
- Decide whether subscriptions will exist and, if so, set prices and cancellation/refund terms.
- Prepare app icon, screenshots, store descriptions, age/content ratings and support website.
- Choose and complete a native Android/iOS packaging route. GitHub Pages alone is not a Play Store or Apple App Store submission.
- Complete Google Play Families / Apple Kids and privacy declarations accurately before submission.

## Current safety boundary

Do not enable child-to-child messaging or open international chat until account verification, guardian consent, membership approval, moderation/reporting, adult escalation, retention and deletion processes have been reviewed and tested.
