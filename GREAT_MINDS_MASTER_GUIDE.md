# Great Minds AI — Master Integration & Completion Guide

Last updated: 4 November 2026

This is the single working reference for the app's integration, verification and launch. The permanent colourful rocket home screen remains the app entry point; the Unified Learning & Classroom Hub is the central module directory.

## 1. What is already built in the repository

- Permanent home screen and subject navigation.
- English, Mathematics, Science, Home Science, Social Studies, History, Geography, General Knowledge, Computer Studies, Reading & Writing and Vocabulary learning pages.
- Student Profile V2 with nickname, homework and quiz history, points, stars and practice badges.
- Games, homework, certificates and progress prototypes.
- Parent, teacher and student dashboard demonstrations.
- International classroom and group-learning demonstrations.
- Shared public Supabase project configuration and a teacher connection test.
- Unified Learning & Classroom Hub with endpoint reachability and session-only teacher sign-in test.

These are repository/source-code facts. A working page or a successful syntax check does not prove a live service is working.

## 2. Current integration boundary — read before entering real child data

The Student Profile and connected student/parent/teacher demo dashboards currently exchange a summary through the same browser's localStorage. This is a same-device demonstration only. It does not synchronize across phones or computers, authenticate a role, or protect data on a server.

The international classroom and group-learning pages are also local demonstrations. Do not use real children's names, contact details, photos, school identifiers or private information in these demos.

The browser may contain only the Supabase project URL and publishable key. Never place a service_role key, secret key, AI provider key, password or other privileged credential in HTML or JavaScript.

## 3. Supabase project — known repository configuration

The repository contains a Supabase project URL and a publishable key in `supabase-config.js`. The shared connection page loads these values. The project URL/key are public client configuration, not proof that data is secure. Row Level Security (RLS) and correct policies are the security boundary.

The existing classroom table was previously reported by the project owner with these columns:

- `id` bigint
- `created_at` timestamptz
- `classroom_name` text
- `Subject` text
- `Country` text
- `classroom_code` text
- `teacher_id` uuid

The exact live schema and current policies must be confirmed in the Supabase SQL Editor before applying migrations. In particular, the capitalized column names `Subject` and `Country` are case-sensitive when quoted in SQL.

### Read-only verification queries

Run these in Supabase SQL Editor to inspect the real table definition and policies before changing anything:

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'classrooms'
order by ordinal_position;

select schemaname, tablename, policyname, permissive,
       roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'classrooms'
order by policyname;

select c.relname as table_name,
       c.relrowsecurity as rls_enabled,
       c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'classrooms';
```

Do not blindly add duplicate policies. Compare the results with the intended rules below and update existing policies only after confirming the exact schema.

### Minimum classroom access rules

- Only authenticated, approved teachers may create classrooms.
- A teacher may read/update/delete only classrooms they own or are explicitly assigned to.
- Students may read only classrooms for which their authenticated account has an approved enrollment.
- Parents may see only their linked child's permitted classroom and progress information.
- A classroom code is an invitation mechanism, not proof of identity or authorization.
- All membership and role checks must be enforced server-side with RLS or trusted backend functions. Hiding a button in the browser is not security.
- Test with separate accounts: approved teacher, unapproved teacher, parent, enrolled student and unrelated student. Confirm forbidden reads and writes return no data or an authorization error.

## 4. Data model to finish before real student records

Do not invent or assume these tables already exist. Confirm and design them with least-privilege relationships before implementing:

- Adult profiles and approved roles.
- Student profiles using minimal data and nicknames where possible.
- Verified parent/guardian-to-child links and consent records.
- Classroom membership/enrollment records.
- Homework assignments and submissions.
- Quiz attempts and learning progress.
- Rewards/certificates.
- Safety reports, moderation decisions and audit events with limited retention.

Every child-data table exposed through the Supabase Data API must have RLS enabled and tested. Policies must verify authenticated identity, guardian relationship, classroom membership and role at the database/backend layer.

## 5. International classroom safety gates

Do not enable child-to-child live messaging until all gates pass:

1. Parent/guardian consent is collected and verified in an auditable, age-appropriate process.
2. Teacher identity and approval are verified.
3. Students join only through approved enrollment; no public student directory.
4. Classroom messages are limited to the verified room and authorized participants.
5. Reporting, blocking, moderation, adult escalation and session exit are implemented and tested.
6. Personal contact details and precise location are never displayed to other students.
7. Retention, deletion, access logs and incident response are documented.
8. Realtime subscriptions are scoped to authorized classroom membership and tested with unrelated accounts.

## 6. Unified hub and role pages

The home screen links to the Unified Learning & Classroom Hub. The hub provides student learning, parent/teacher, international classroom and AI Teacher entry points plus a Supabase connection check.

The embedded teacher test:
- Uses the shared project URL and publishable key.
- Accepts a test teacher login only in the current page session.
- Clears the password field after submission.
- Keeps the access token in page memory and offers a clear-session action.
- Checks the existing `classrooms` table through the authenticated Data API.

A successful login and classroom SELECT do not by themselves prove that the teacher is approved. Approval must be enforced by trusted role data and RLS.

## 7. AI Teacher backend

The AI Teacher voice interface is a prototype until the backend endpoint is implemented and tested end to end. The Cloudflare Worker root response previously indicated the backend was running, but the `/ask` route was not found in the inspected version.

Before enabling real AI responses:
- Implement and test an authenticated server-side endpoint.
- Keep provider API keys only in server-side secrets.
- Enforce age-appropriate prompts, output safeguards, rate limits and abuse handling.
- Avoid collecting unnecessary child data; do not log sensitive conversations unnecessarily.
- Test microphone permission, speech recognition, spoken responses, interruptions and error states on Android.
- Do not represent browser text-to-speech as a live conversational AI teacher.

## 8. End-to-end acceptance tests

A feature is complete only after the relevant checks pass:

- Home screen opens and every module link loads on Android.
- Student profile saves and reloads expected data.
- Student, teacher and parent views show only information authorized for that account.
- A teacher can create/read only their permitted classroom.
- An unapproved teacher cannot create or access restricted classrooms.
- A parent can access only their linked child's permitted information.
- An unrelated student cannot discover or read another classroom.
- Realtime updates reach authorized participants only.
- Two separate devices show the expected server-synchronized data.
- Network loss, expired sessions, logout and account deletion behave safely.
- Child-safety reporting and parent/teacher escalation work.
- AI Teacher works through the secured backend with child-safe responses.
- Publishing policies, privacy notice, consent, support and deletion processes are reviewed for target countries and app stores.

## 9. Current truthful completion status

### Source-code work
The core learning pages, navigation, student profile prototype, dashboard demonstrations, classroom demonstration, shared Supabase configuration and unified hub exist in the repository. Several recent edits passed inline JavaScript syntax checks and were re-fetched from GitHub.

### Live verification still required
- Real teacher sign-in and approved/unapproved role tests on the deployed site.
- Confirmed live RLS policies and data model for every child-data table.
- Parent/guardian consent and child-to-parent linking.
- Secure student enrollment and teacher classroom membership.
- Real server-backed profile, homework, quiz and reward synchronization.
- Realtime classroom authorization and moderation.
- Cross-device and cross-country testing.
- Secured AI Teacher backend endpoint and Android voice tests.
- App-store and child-privacy launch review.

Do not mark the app 100% complete or launch-ready until all relevant acceptance tests pass. Record each verified result here rather than treating a code commit, checklist tick or endpoint response as a completed feature.

## 10. One place to start

Open the deployed app's permanent home screen, then choose **Unified Learning & Classroom Hub**. Use the embedded teacher sign-in test with a test account. Never send passwords, access tokens or secret keys in chat. Use the read-only SQL checks above before changing database policies.


## 11. Latest role-dashboard refresh improvement — 4 November 2026
- Connected student, teacher and parent demo pages now listen for changes to the shared browser demo record and refresh their displayed values when another tab in the same browser saves changes.
- This improves same-browser multi-tab visibility only. It is not realtime database synchronization, does not work across separate devices, and does not provide account authorization.
- Re-test by opening the student profile and the connected parent/teacher/student pages in separate tabs of the same browser, adding a fictional practice activity, and confirming the other open tabs refresh. Use fictional data only.


## 12. Unified navigation rollout — 4 November 2026
- Added a return path to the Unified Learning & Classroom Hub across Homework, Games, English, Mathematics, Science, Social Studies, History, World Atlas, Dictionary, Encyclopedia, Guided Research, AI Teacher, Group Learning and the International Classroom demo.
- Re-fetched all 14 pages after updates. Each page contains the hub link and its inline JavaScript passed syntax parsing.
- These navigation checks verify source structure only. Android layout, button behavior, browser runtime and the underlying live services still require device testing.


## 13. Home Science and expanded hub modules — 5 November 2026
- Added Home Science with six age-appropriate topic cards, browser speech read-aloud, a five-question quiz, and a same-browser demo quiz record.
- Added Home Science, General Knowledge, Computer Studies, Reading & Writing and Vocabulary Practice to the Unified Learning & Classroom Hub.
- Source changes are committed and re-fetched from GitHub. The Home Science quiz record remains local demo storage; it is not yet a Supabase write or cross-device progress sync.
- Android testing is still required for responsive layout, speech playback, quiz scoring and hub navigation.


## 14. Student cloud progress — first integration increment (5 November 2026)
- Live table `public.student_learning_progress` is RLS-protected and append-only for authenticated client writes. Students may insert their own rows only when an active guardian link exists. Students can read their own rows; active guardians and approved teachers can read rows only through their relationship/classroom policies.
- `student-cloud-progress.js` validates record shape and gets the current authenticated user via Supabase Auth; it never accepts a student ID from page form data. The database RLS policy remains authoritative.
- Mathematics, Science, Social Studies, Geography and Home Science now attempt cloud saves at quiz completion. Existing local demo history remains in place as a fallback. Student Profile includes a cloud progress refresh/read panel.
- `supabase/least-privilege-grants.sql` documents tightened grants: no anonymous/public privileges on the five core tables; authenticated permissions are limited by table and RLS. Verified all five tables still have RLS enabled and anonymous SELECT/INSERT are false.
- This is source integration only until tested in a real signed-in browser session with a test student account and an active guardian link. A successful code commit is not proof that REST inserts/reads work.
- Homework assignment/submission storage and parent/teacher dashboard cloud views are not implemented yet. Child-to-child messaging remains disabled. Leaked-password protection is still reported disabled by the Supabase security advisor and must be enabled before real family accounts.


## 15. Secure cloud homework — first increment (5 November 2026)
- Live Supabase tables: `homework_assignments` and `homework_submissions`. Both have RLS and no anon/public grants.
- Teacher assignment writes require an approved teacher profile and ownership of the target classroom. Student assignment visibility/submission requires approved membership, approved parent-consent status and an active guardian relationship. A student can submit once per assignment.
- Guardian read access requires an active guardian link. Teacher read/mark access requires the teacher to own the assignment's classroom, have an approved teacher profile, and the student's membership/consent/active guardian checks to remain valid. Marking is limited to score, feedback, marker and timestamp fields; score cannot exceed the assignment maximum.
- `student-cloud-homework.js` exposes authenticated methods for assignment creation, listing, submission, reading and marking. The Homework Manager has a separate secure Supabase section; its older local demo tabs are not cloud synced.
- Parent dashboard now loads cloud progress and guardian-visible homework/submissions. Teacher dashboard now loads teacher-visible progress/submissions. RLS, not dashboard code, is the authority.
- Source and policies are committed. Real authenticated end-to-end tests remain mandatory. Tables currently contain no assignments/submissions. Do not describe homework sync as verified until a test teacher publishes, a consented student submits, the teacher marks, and the linked parent sees the result on a separate device.


## 16. Number 3 — expanded lesson progress coverage and code validation (5 November 2026)
- Cloud quiz progress helper is loaded by Mathematics, Science, English, History, Social Studies, Computer Studies, Geography and Home Science.
- Additional cloud progress saving is installed for Mathematics Extra, Science Extra, Computer Studies Extra, English Extra, General Knowledge, Social Studies Extra and the English alphabet/reading quiz.
- The Parent, Teacher and Student dashboard Realtime script declarations were corrected after a static syntax check found duplicate declarations. All inspected dashboard, classroom, homework and lesson scripts now pass JavaScript syntax parsing.
- Static syntax validation does not prove that GitHub Pages, CDN loading, Supabase Auth, RLS, Realtime delivery or real cross-device workflows function in a live browser. Those tests remain required.


## 17. Home-screen and AI Teacher navigation — 5 November 2026
- Main rocket home screen now links directly to English Lessons, AI Teacher voice demo, Group Learning demo and the 3D Learning Graphics Gallery.
- AI Teacher practice page now provides a “Continue learning” link that changes with the selected subject and opens its full lesson page.
- Static checks confirm no missing internal links and no JavaScript syntax errors on the home screen, AI Teacher, Unified Hub and Group Learning pages.
- AI Teacher is still an offline prepared-answer prototype with browser speech features; Group Learning is still local-only. The secure live AI backend and supervised international classroom must not be represented as active until tested.


## 18. Unified hub — practice, progress and certificates (5 November 2026)
- The Unified Learning Hub now links directly to Connected Practice, Progress Overview and Certificates & Achievements in the Student Learning section.
- Static validation after the change found no broken local links or JavaScript syntax errors on the hub. Ten key app pages also passed static JavaScript syntax and duplicate-ID checks.
- Live visual testing and real account workflows remain to be performed with the user.


## 19. Cloud dashboard account verification (5 November 2026)
- Student, Parent and Teacher cloud dashboards now verify the current user with Supabase Auth `getUser()` during initialisation before loading cloud records.
- JavaScript syntax validation passed for all three pages after the update.
- Supabase security advisor still flags leaked-password protection as disabled; enable it in Auth settings before real family accounts. Performance-only notices for unused indexes and separate role-based SELECT policies remain under review and have not been changed.
