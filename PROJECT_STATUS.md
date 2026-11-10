# Great Minds AI — Project Status and Product Decisions

Last updated: 2026-11-10
Repository: https://github.com/romanoosano60-maker/great-minds-ai
Default branch: main

## Product direction — preserve these decisions
- Keep the existing colourful rocket home screen with children and teacher as the permanent main entry point.
- Add learning features behind the existing home screen and navigation; do not replace it with separate apps.
- Build for children with age-appropriate language, clear navigation, privacy, safety and adult oversight.
- Do not mark a feature complete until its code is reviewed and the relevant behaviour is tested.

## Agreed learning experience

### English — more than question and answer
English should combine listening, speaking, reading, writing and play:
- Child-friendly dictionary: simple meanings, pronunciation/audio, example sentences, related words and vocabulary practice.
- Vocabulary and spelling: learn words, listen, read, write, spell and use each word in a sentence.
- Short illustrated stories with optional narration and read-along highlighting where feasible.
- Reading comprehension: questions about characters, events, sequence, meaning and the child's own ideas.
- Writing: sentence building, missing words, punctuation, short paragraphs and creative story writing.
- Word games: matching, spelling challenges, word hunts and vocabulary quizzes.
- Gentle optional background music for reading, games and study. Provide pause, volume and off controls; avoid distracting audio and respect device mute settings.

### Knowledge and discovery tools
- World Atlas integrated with Social Studies/Geography: continents, countries, maps, flags, landmarks and age-appropriate facts.
- Child-friendly Encyclopedia: browsable explanations about science, nature, animals, history, technology and world knowledge.
- Guided Research Centre: safe topic exploration, simple summaries, guided questions, vocabulary, activities and age-appropriate trusted references. Avoid unrestricted open web access for children.

## Other core modules to preserve and complete
- Existing subjects and their navigation: English, Mathematics, Science, Social Studies/History/Geography and additional subjects.
- Student profiles: nickname/level, homework, quiz results, points/stars, certificates and progress history.
- Games and rewards.
- Parent and teacher dashboards, teacher-set work and student responses.
- Parent/teacher/student connection and international classrooms.
- AI Teacher: natural two-way voice interaction, subject help and age-appropriate responses.
- Existing dashboards, certificates, homework, group learning and 3D gallery should be reviewed, not replaced without evidence.

## Audio and accessibility
- Music is optional, gentle and independently controllable.
- Provide narration and pronunciation controls; do not autoplay loud audio.
- Include captions or visible text with spoken content where practical.
- Use readable text, simple instructions, keyboard/touch-friendly controls and responsive layouts.

## Safety, privacy and quality requirements
- Minimise children's personal data; do not expose credentials or secret keys in frontend files.
- Parent/teacher oversight and appropriate consent for classroom participation.
- Use Supabase Row Level Security and test both authorised and unauthorised access.
- Research content must be age-appropriate and curated; do not provide unrestricted browsing.
- Test on Android and other target devices, check navigation and broken links, verify audio controls, and test data flows before calling the app launch-ready.

## Confirmed repository work as of 2026-11-04
- Repository: `romanoosano60-maker/great-minds-ai`, default branch `main`.
- The repository tree was retrieved; it contains existing subject pages, dashboards, games, homework, group-learning, classroom, AI Teacher, profile, vocabulary, reading/writing and Supabase-related files.
- `index.html` had a malformed nested button around the Science link. It was repaired and committed in commit `74d6f84c823dd9010bd14e1be03640fab881b5f0`; the corrected Science button was re-fetched and verified.
- A prior identical-blob scan reported no byte-for-byte duplicate files. Similar names alone are not evidence of duplication.
- No repository files have been deleted.


## Completed development increment — 2026-11-04
- Added `english-story-studio.html`: a sample story with browser read-aloud, four vocabulary words with pronunciation, spelling practice, four comprehension questions with scoring, and a short writing activity saved locally on the device.
- Added optional gentle generated tones with explicit start/stop and volume controls; audio does not autoplay.
- Added the Story Studio link to the existing home screen without replacing the rocket design.
- Commits: Story Studio `dda78f08d831c0fc13cd46ecd1642f26476e7020`; home link `0a9b36348fb014f2862fb0d45b4d2442a09e257b`.
- Both files were re-fetched from GitHub and the new page and home-screen link were confirmed present. GitHub Pages live rendering, Android audio, accessibility and child usability remain untested; this is a development completion, not launch readiness.

## Open work — not yet verified complete
1. Inspect all existing pages and their navigation; identify broken links, overlapping pages and genuinely unused files before any cleanup.
2. Review existing English, vocabulary and reading/writing pages; design/integrate the agreed story, comprehension, spelling, writing and music experience without duplicating working features.
3. Browser-test the committed Dictionary, World Atlas, Encyclopedia and Guided Research Centre on Android; then inspect and improve existing learning modules.
4. Check 3D gallery image paths/assets and restore missing images if confirmed.
5. Verify GitHub Pages deployment and test every main navigation path on Android.
6. Verify Supabase frontend configuration and real teacher sign-in/classroom creation. Never put a service-role or secret key in browser code.
7. Finish international classroom privacy, consent, RLS and cross-device tests.
8. Resume Cloudflare Worker /ask and AI Teacher voice integration when the required code/screenshots and safe backend configuration are available.
9. Complete functional, security, age-suitability, accessibility and publishing-readiness checks before launch.

## Supabase checkpoint from the user's prior testing (historical; re-verify before relying on it)
- User reported `public.classrooms` created with columns: `id`, `created_at`, `classroom_name`, `Subject`, `Country`, `classroom_code`, `teacher_id`.
- User reported Realtime and RLS enabled, teacher INSERT and SELECT policies added, and an unauthorised test returning zero visible classrooms.
- Real GitHub Pages-to-Supabase teacher login and live international classroom operation have not been independently verified.

## Progress reporting rule
Report separate statuses for frontend development, backend integration, testing and launch readiness. A prior 94% figure was an estimate only and must not be presented as a verified completion percentage. Increase completion only after evidence and tests. Keep unfinished tasks visible and carry this file forward at each meaningful checkpoint.


## Completed development increment — Little Learners Dictionary — 2026-11-04
- Created `dictionary.html` with a searchable starter set of 14 child-friendly entries, simple definitions, pronunciation guides, example sentences, browser text-to-speech buttons, topic filters, word of the day and sentence practice saved locally on the device.
- Added a Little Learners Dictionary tile to the existing home screen.
- Commits: dictionary page `16edac3a85fb538387b2967e331f5ee3e1a37d1b`; home-screen link `7e0b36058f14b126e955af736b2a12daa6169b3e`.
- Code is committed. Live GitHub Pages rendering, Android speech voices, search behaviour, and local saving still need browser/device testing. Do not mark this module tested or launch-ready yet.


## Completed development increment — Interactive World Atlas — 2026-11-04
- Expanded the existing `geography.html` page in place, preserving the existing home-screen destination.
- Added seven clickable continent discovery cards, 12 country/flag/capital entries, oceans and landmark facts, and a five-question scored quiz with feedback and restart.
- Added responsive styling, keyboard-accessible continent cards and live feedback announcements. No external services, child accounts or personal data are required by this static module.
- Commit: `6aab758828cff9b490a814ac6934ae09d2a75b74`.
- The committed file was re-fetched from GitHub and verified to contain the Atlas, seven continent cards, 18 fact/country cards and the quiz. This verifies repository content only; GitHub Pages rendering, Android interaction and accessibility still require device testing.


## Completed development increment — Little Learners Encyclopedia — 2026-11-04
- Created `encyclopedia.html` with 16 child-friendly topic cards across space, nature, animals, science, human body, history, world and technology.
- Added live text search, category filters, responsive cards and short 'Did you know?' facts. Content is curated in the page; there is no unrestricted external browsing and no child personal data collection.
- Added a Little Learners Encyclopedia tile to the existing home screen.
- Commits: encyclopedia page `4fab162ec78fcbd5e7a73b3de39dbe746b1be5fc`; home-screen link `0b11ae093ecba64306512cc6e9d05afca488d2e1`.
- Repository commits are complete; live GitHub Pages rendering, Android search/filter behaviour, factual review and accessibility still require testing.


## Completed development increment — Guided Research Centre — 2026-11-04
- Created `guided-research.html` with four curated child-friendly inquiry topics (rain, bees, planets and trees), short explanations and investigation questions.
- Added a research-plan helper for a child's own question, local-device-only notes saving, and clear privacy guidance. It does not perform unrestricted web searches or collect personal data.
- Added the Guided Research Centre to the existing home screen.
- Commits: page `f281957d73dadee05fc643800439d3b1271a16d9`; home-screen link `2355a2dade3df9d4ad1abcb57a8a9bcebbe2f1cd`.
- Code is committed; live Pages rendering, Android note saving and interaction, accessibility and adult review of content remain pending.


## Repository navigation and gallery inspection — 2026-11-04
- Re-fetched the updated home page and checked 18 locally linked `.html` destinations against the repository root: no missing destination was found in this static link scan.
- Inspected `gm-3d-graphics-gallery-1.html`: it contains 16 image elements, including embedded WebP data images rather than external image file paths. This means missing external asset paths are not evident from the source; whether the large gallery renders correctly on Android still needs a live device check.
- This is a source-level inspection only, not a browser test. Do not treat it as proof that every navigation control or gallery image works at runtime.


## AI Teacher interface improvement — 2026-11-04
- Updated `ai-teacher.html` with a microphone button using the browser SpeechRecognition API when available, editable speech-to-text transcription, Enter-to-submit, read-aloud answer, stop-voice controls and accessible status announcements.
- Kept the offline demonstration disclosure explicit: prepared sample answers remain the only answer source; speech recognition is not a live AI connection and browser support/permission varies. No microphone audio is sent to an AI backend by this page.
- Commit: `5dffc9590f36ed7badc2d4d2adf7419cc7d0efb5`.
- Re-fetched the committed file and checked the inline JavaScript syntax successfully. Actual Android microphone permissions, speech recognition, voice quality and device compatibility remain untested. Cloudflare Worker `/ask` and secure AI backend integration remain pending.


## Social Studies learning module improvement — 2026-11-04
- Expanded `social-studies.html` from three introductory text cards into six age-appropriate learning topics: communities, community helpers, rights/responsibilities, culture/traditions, environment and maps.
- Added a five-question scored quiz with answer feedback, progress and restart, plus a discussion prompt.
- Commit: `4d03e96354789af6b33d30f80f7cd968fc9e30e4`.
- Re-fetched the committed page and checked its inline JavaScript syntax. Android rendering, interaction and age/content review remain pending.


## History learning module improvement — 2026-11-04
- Expanded `history.html` with a child-friendly timeline from prehistory to modern times, an introduction to historical evidence (photographs, letters, objects/buildings and oral histories), and a guided thinking activity.
- Added a five-question scored History Detective quiz with feedback and restart.
- Commit: `8851ef9ad43e02f8ed4e57eb9f515de83abdaae9`.
- Re-fetched the committed page and checked inline JavaScript syntax. Device testing and historical-content review remain pending.


## Mathematics learning module improvement — 2026-11-04
- Rebuilt `math.html` with eight lesson areas: addition, subtraction, multiplication, division, fractions, shapes, time and measurement.
- Expanded the interactive challenge to ten questions, with feedback, scoring, restart and encouragement based on the result.
- Commit: `44c6cc31fc6ba5ec935a140b08e2399c6bd76c2a`.
- Re-fetched the committed page, verified all eight lesson headings and ten quiz questions, and checked inline JavaScript syntax successfully. Android device testing remains pending.

## Science learning module improvement — 2026-11-04
- Rebuilt `science.html` with eight learning areas: living things, water cycle, space, forces and magnets, energy, states of matter, human body and Earth science.
- Expanded the interactive quiz to ten questions, with feedback, scoring, restart and safe-science guidance for children.
- Commit: `b1f0706c8e2726063a963707a6d3590a9f2887f6`.
- Re-fetched the committed page, verified all eight topic headings and ten quiz questions, and checked inline JavaScript syntax successfully. Android device testing remains pending.


## English learning module improvement — 2026-11-04
- Rebuilt `english.html` with interactive alphabet pronunciation, six vocabulary words with child-friendly definitions and examples, a new three-question reading-comprehension activity, spelling practice, grammar identification, spoken sentence practice and a five-question English challenge.
- Added visible speech/browser limitation guidance and accessible live feedback. Speech uses browser text-to-speech; no audio is uploaded to an AI service.
- Commit: `4ceb219de301738a9b9e4385e50c00c8826ffa9b`.
- Re-fetched the committed page and checked inline JavaScript syntax successfully. Android voice quality, touch interaction, layout and learning usability still need device testing.


## Home navigation audit and repair — 2026-11-04
- Audited the home page's internal anchor links and JavaScript subject routes against the repository root. All discovered internal links and mapped destinations exist.
- Corrected the Social Studies route to open the updated `social-studies.html` learning module (rather than the older `social.html` page). Added explicit route aliases for Geography/World Atlas, History, Encyclopedia and Guided Research.
- Commit: `6bc8212fa9bfe074893b3ecc54f2f00c54c6aca7`.
- Re-fetched `index.html`, verified all 15 mapped route targets exist in the repository and checked inline JavaScript syntax. This is a source-level navigation check; published GitHub Pages taps still need Android verification.
- Also re-audited the current `geography.html`, `encyclopedia.html` and `guided-research.html`; their inline JavaScript parses successfully. World Atlas already contains continent/country information and an interactive quiz; encyclopedia search/filter and guided research activities are present. Their live behaviour still requires device testing.


## Supabase and classroom integration audit — 2026-11-04
- Inspected `supabase-config.js`: it contains the project's Supabase URL and a publishable client key, not a service-role/secret key. The client is exposed as `window.greatMindsDB`. A publishable key is intended for frontend use only when database Row Level Security and policies are correctly enforced; this source inspection does not verify those policies.
- Inspected `connected-student.html`, `connected-teacher.html`, `connected-parent.html`, `group-learning.html` and `safe-international-classroom-v3.html`. These pages currently use browser `localStorage` demo data and do not call Supabase or subscribe to realtime changes. Their own on-page notices correctly describe the demo limitations.
- The role selection and simulated parent approval in the V3 classroom are browser-side demonstrations, not verified identities or permissions. The connected dashboards share demo records only in the same browser/device and are not secure accounts.
- The separate `supabase-connect.html` test page is the only previously inspected frontend page that attempts Supabase Auth and a classrooms REST query. A successful query alone does not establish teacher approval or secure class membership.
- No production integration changes made during this audit: connecting children, parent consent, teacher authorization, realtime messaging and cross-device/international access require verified database policies and end-to-end testing before enabling.
- Source audit only; no credentials were entered or disclosed, and no live account/database test was performed.


## GitHub Pages deployment verification — 2026-11-04
- Queried the GitHub Actions run for commit `30e33714fb4056ba1e902b0691ceda80d9201c34`.
- Build, deploy-to-GitHub-Pages, and build-status reporting jobs all completed with `success`.
- This confirms GitHub's build and deployment workflow completed for that commit. It does not verify every page in a live browser, Android rendering, audio, Supabase login, or classroom data flows.
- Live site fetch was not independently confirmed in this audit; retain Android browser verification as an open item.


## Unified connection and adult-entry improvement — 2026-11-04
- The shared Supabase configuration now exposes only the existing project URL and publishable key to the browser client; no service-role or secret key was added.
- The Supabase connection test now loads the same shared configuration as the app instead of requiring the project URL and publishable key to be re-entered. The fields are read-only, and teacher test credentials remain session-only.
- The Parents & Teachers Center now links directly to the shared Supabase connection and teacher-access check.
- The main home screen now presents one combined Parents & Teachers Center entry instead of separate parent and teacher entry tiles, preserving the existing rocket home screen.
- GitHub source updates committed and re-fetched for verification. This is an integration/navigation improvement only: live teacher role verification, profile/classroom data synchronization, RLS testing with separate accounts, parent consent, Realtime membership filters and cross-device operation remain unverified. Do not treat this increment as production completion.


## Unified learning hub — 2026-11-04
- Rebuilt `connected-dashboards.html` as the central navigation hub for student learning, parents/teachers, international classroom demos and the AI Teacher prototype.
- Added a live Supabase Auth endpoint reachability check using the existing shared public project configuration. The display explicitly distinguishes endpoint reachability from successful teacher authentication, role authorization and student-data synchronization.
- Added the unified hub as a single entry in the permanent rocket home screen.
- Source files committed and verified. Browser runtime, actual teacher login, real classroom queries, cross-device synchronization and child-safety controls still require live tests; they are not marked complete.


## Shared Student Profile practice summary integration — 2026-11-04
- Student Profile V2 now publishes a summary of its nickname, homework completions, quiz counts, stars, points and practice certificates into the shared same-browser demo record (`greatMindsConnectedDemoV1`).
- Connected student, teacher and parent demo views now read that shared Student Profile summary and include its completed homework records in their views.
- Unified hub routes its teacher and parent tiles to those shared-record views. Student, teacher and parent pages link back to the unified hub.
- Source checks: all inline JavaScript in the seven touched pages parses successfully; GitHub files were re-fetched after commits.
- Important limit: this joins local browser storage only. It does not sync between devices, authenticate a parent/teacher/student, or replace Supabase RLS. The existing secure-data warning remains in place. Live account, cross-device and child-safety tests are still required.


## Unified hub teacher sign-in test — 2026-11-04
- Embedded the teacher sign-in and classroom visibility check directly in `connected-dashboards.html`, removing the need to leave the central hub for the basic test.
- The form uses the shared project URL and publishable key, clears the password after submission, keeps the access token in page memory only, and provides a clear-session action.
- The result distinguishes successful authentication and RLS-filtered classroom query from proof of teacher approval. No claim of verified teacher role is made.
- Re-fetched seven related pages after commits; all inline JavaScript parses successfully.
- Still pending: real approved/unapproved teacher account tests, parent/student role and guardian consent model, RLS policies for all child data tables, classroom membership restrictions, realtime filtering, and cross-device tests. The current student/parent/teacher practice bridge remains same-browser local storage, not production cloud sync.


## Single source of truth — 2026-11-04
- Created `GREAT_MINDS_MASTER_GUIDE.md` to consolidate the integration notes, known Supabase schema, safe read-only inspection queries, child-safety gates, AI backend requirements and end-to-end acceptance tests.
- Linked the Supabase preparation and international classroom preparation pages to the master guide and unified hub. README now points to the master guide as the authoritative project reference.
- The guide explicitly distinguishes source-code completion from live-service verification and does not label the app 100% complete.


## Unified parent/teacher entry consolidation — 2026-11-04
- Updated `connected-dashboards.html` so the Parents & Teachers section links directly to the connected Teacher and Parent demo dashboards rather than sending users to a second, legacy dashboard implementation.
- Replaced the older `parents-teachers.html` duplicate local-data dashboard with a simple compatibility landing page that directs users to the Unified Learning Hub. Existing links to that filename remain valid.
- Commits: hub `81dea505cc7765ac0a03054007076ed030569144`; compatibility page `7837531b80cf4bbfa0efd4e14a5f23660124b129`.
- Both changed files were re-fetched from GitHub; the landing-page destination was verified in source. This is navigation/source verification only. The connected role dashboards still use same-browser local demo storage, not authenticated cloud records.


## Unified hub navigation cleanup — 2026-11-04
- Added the connected student dashboard to the Student Learning section so all three role dashboards are reachable from the central hub.
- Removed duplicate teacher and parent dashboard tiles; each role now has one clear entry.
- Commit: `da0c3599ed84b37bffce17085baa0398baa99ec2`.
- Re-fetched the updated hub and verified one teacher link, one parent link and the student demo link. This is a source/navigation check, not a live account or cross-device test.


## Student progress calculation correction — 2026-11-04
- Corrected the Student Profile V2 summary so legacy practice stars are not counted twice in its own display.
- Included legacy practice points in the shared progress summary, keeping the student, parent and teacher demo views aligned.
- Commit: `7aba80559b53f36800999129ca9e97d85b44c501`.
- Re-fetched the updated profile and verified both calculation changes. Runtime/browser and multi-device tests remain outstanding.


## Teacher classroom access check hardening — 2026-11-04
- The unified hub now reads the authenticated Supabase user ID after teacher sign-in and scopes the classroom list query to `teacher_id=eq.<authenticated-user-id>`.
- The result message distinguishes authentication and an ownership-filtered query from verified teacher approval. Server-side RLS remains mandatory.
- Commits: `198d79386b491cca13c9891d4583a3ca8104ee7e` and clarification `cceb469a184b6e4d9827a657e2e248790359fa60`.
- Re-fetched the hub and verified the user-ID filter and security limitation text. No real teacher credentials were used; live Supabase login and RLS behaviour remain untested.


## Student profile data-scope clarification — 2026-11-04
- Updated the Student Profile notice to accurately describe the shared same-browser summary now consumed by the connected Student, Teacher and Parent demo dashboards.
- Explicitly states that records do not sync across devices, older standalone learning pages do not automatically send records to this profile, and the demo is not a secure account system.
- Commit: `75892dabcd1500094394665177df13a370d5702c`.
- Re-fetched the profile and verified the notice text. This is documentation/UI accuracy, not a live cloud integration or runtime test.


## Homework Manager to role-dashboard demo sync — 2026-11-04
- Homework Manager now mirrors its assignment list and submission/marking summary into the shared `greatMindsConnectedDemoV1` browser record.
- The mirror tags its records as `homework-manager` and replaces only its own mirrored entries, preserving other shared demo homework records.
- The Homework Manager refreshes its local view when its own storage key changes in another tab.
- Commit: `7cff9de92c7f72d29d1645f52f91460ed164b7eb`.
- Re-fetched the file and verified the sync function and source tag. This is same-browser localStorage integration only; it is not Supabase/cloud sync and has not been runtime-tested on Android or across devices.


## Games and Rewards to role-dashboard demo sync — 2026-11-04
- Games now mirrors stars, completed game wins, best streak, earned badge labels and update time into `greatMindsConnectedDemoV1.games`.
- Existing shared demo fields are preserved; the dedicated `great-minds-games-v1` store remains the game's own source of truth.
- Commit: `451c78d97dcb85b15be065358be0d30596135fbb`.
- Re-fetched the updated file and verified the mirror function and reward fields. Same-browser localStorage integration only; no cloud sync or Android runtime test has been performed.


## Mathematics lesson result sharing — 2026-11-04
- On completion of the 10-question Mathematics challenge, the lesson now appends a subject-tagged result (score percentage, correct count, question count and timestamp) to the shared `greatMindsConnectedDemoV1.quizzes` record.
- The shared list is capped at the latest 100 entries. The lesson's quiz scoring and restart flow remain unchanged.
- Commit: `c4381af235e0a6682af46f5e5d70994afa496c08`.
- Re-fetched the file and verified the result-sharing helper and completion hook. Same-browser demo storage only; no cloud sync or Android runtime test has been performed.


## Science and English quiz result sharing — 2026-11-04
- Science completion now mirrors score percentage, correct count, question count, subject and timestamp to `greatMindsConnectedDemoV1.quizzes`.
- English Challenge completion mirrors the same fields; its five-question score is converted to a percentage.
- Both append to the latest-100 shared quiz history and preserve other dashboard data.
- Science commit: `42c9be3d74e19ef51c902bf88efd027ad1527ce0`. English commit: `08a82880eaf03f11cad769443a78bdeed49db675`.
- Both files were re-fetched and the helper/completion hooks verified. Same-browser demo storage only; no live cloud sync or Android runtime test.


## Social Studies, History and Geography result sharing — 2026-11-04
- Social Studies and History quiz completion now append subject-tagged scores, correct-answer counts, question counts and timestamps to `greatMindsConnectedDemoV1.quizzes`.
- Geography World Explorer quiz completion mirrors the same result fields.
- Each shared quiz list retains the latest 100 records; unrelated profile/dashboard fields are preserved.
- Commits: Social Studies `f92fd943c422d7f205eec33069a6f0e94a722d3f`; History `0db5b761bcdf410cfb7101b8bcee2b21bb472cb3`; Geography `85b1922ce54efa59b432e5686e699874afdcf111`.
- Each page was re-fetched and its result-sharing helper and completion hook verified. This is same-browser demo storage, not cloud sync; no Android runtime test has been performed.


## International classroom safety and sign-out review — 2026-11-04
- Reviewed `safe-international-classroom-v3.html`: it clearly labels itself as a local-only demonstration; parent approval is simulated, role selection is browser-side, and demo messages are stored in localStorage. It must not be presented as verified parent consent, secure role authorization, or live international messaging.
- Reviewed `group-learning.html`: classroom challenges and best scores are local to the current browser; no accounts or online chat are active.
- Reviewed Supabase preparation checklists 06 and 07: they are planning checklists, not evidence that the listed security and consent tests have passed.
- Improved the teacher test sign-out in `connected-dashboards.html`: it now calls Supabase Auth sign-out when an in-memory access token exists, clears that token and the password field, and distinguishes confirmed sign-out from an unconfirmed server response.
- Sign-out code commit: `9dcde94d50f311a8e20c74da20e8b476f9d87baa`; re-fetched the page and verified the updated handler.
- Remaining live verification is deliberately scheduled for the next session: create a real adult-controlled teacher test account, sign in, verify the classroom query under RLS, and test sign-out. Do not use example credentials or real children's data.


## Graphics gallery repair and navigation audit — 2026-11-04
- Replaced the legacy gm-3d-graphics-gallery.html page with a lightweight redirect and manual fallback to gm-3d-graphics-gallery-1.html, which contains 15 embedded WebP artwork images and does not rely on separate missing image files.
- Added a direct 3D Graphics Gallery link to connected-dashboards.html.
- Commits: legacy gallery redirect 1988e5159badd7bdb721d894f92d9211252685b2; dashboard gallery link d3196ed5b32c97962777f645dbad32281d6545b1.
- Re-fetched both pages and verified the redirect, fallback link, dashboard link and 15 embedded image sources.
- Audited 18 local navigation targets on index.html and 22 on connected-dashboards.html; all 40 targets exist in the repository.
- Audited navigation and inline JavaScript syntax in Student Profile, Parents & Teachers, Homework, Games, Group Learning, Safe International Classroom and AI Teacher. Found and fixed one stale Student Profile link from parent-dashboard.html to connected-parent.html; commit 7f4202113055d65d3e72f4b9b308010937e6b266.
- Re-fetched Student Profile and verified the corrected link. Static JavaScript syntax checks passed for the seven reviewed pages.
- Limitations: these are repository/static checks, not a live Android browser test. The gallery actual image rendering, all navigation taps, Supabase login and cross-device behaviour still require device/account verification.


## Further continuation and dashboard navigation fixes — 2026-11-04
- Audited the four continuation pages, four setup checklists, Parent Dashboard and Teacher Dashboard for local navigation targets and inline JavaScript syntax.
- Found two outdated local links: gm-continuation-navigation.html referenced the old safe-international-classroom.html name; teacher-dashboard.html referenced the old parent-dashboard.html name.
- Corrected the links to safe-international-classroom-v3.html and connected-parent.html respectively.
- Commits: continuation navigation 0ba4fbde78fe27cba33834c075005b8cf9a6fe46; teacher dashboard 0a79b7a236051023d536b750efd911ccf1b87f8c.
- Re-fetched both pages and verified the new destinations and removal of the old hrefs. Inline JavaScript syntax checks passed on the reviewed pages.
- These remain repository-level checks. Live browser navigation and user-device rendering are still pending.


## Full HTML navigation and script audit — 2026-11-04
- Retrieved and reviewed all 49 HTML pages currently listed in the main branch repository tree.
- Checked quoted local href/src references against the repository file list: no missing local HTML destinations were found in the reviewed pages. The two stale destinations found in the previous pass were already corrected.
- Extracted and syntax-checked inline JavaScript blocks on all 49 pages: no syntax errors were detected. This is a static syntax check, not a full browser interaction test.
- Rechecked the 3D gallery: 15 distinct embedded image payloads are present; all 15 have the expected WebP RIFF base64 signature and descriptive alt text. A lightbox/dialog is present in the page source.
- Remaining verification: open the gallery on Android to confirm images decode and display, and tap through the actual app routes and interactive controls. Static checks cannot certify browser rendering, accessibility, authentication, or cross-device behaviour.


## Extra-subject lesson accessibility improvement — 2026-11-04
- Added a browser-based “Hear this question” read-aloud control to each of the five lessons in English Extra, Maths Extra, Science Extra, Computer Extra and Social Studies Extra.
- Uses the device/browser SpeechSynthesis voice only; this is not the conversational AI Teacher voice service.
- Re-fetched all five updated pages and syntax-checked their inline scripts. All five passed; each page contains five lesson sections and the read-aloud button creation logic.
- Android speech playback and voice availability still need device testing.


## Reading and Writing interactive lesson — 2026-11-04
- Rebuilt reading-writing.html as an interactive beginner learning page: short story, device/browser read-aloud and stop controls, two comprehension questions with feedback and retry/score, and a short writing exercise.
- Writing can be saved locally on the current device; the page clearly states this is device-only and asks learners not to enter private information.
- Committed as 7f397be03d3e90301b056a346d0c5fe640bdf133.
- Re-fetched the committed file and verified story, speech controls, both quiz questions, writing area and local save logic. Inline JavaScript syntax check passed.
- Android display, speech playback, quiz interaction and local save still require a real-device test. This is not cloud-synced student progress.


## Unified hub integration increment — 2026-11-05
- Audited the current repository root and confirmed that `general-knowledge.html`, `computer.html`, `reading-writing.html` and `vocabulary.html` exist, while the expected `home-science.html` filename does not. No broken home-science link was added.
- Added the four existing learning modules to the existing Unified Learning & Classroom Hub, preserving the permanent rocket home screen and current navigation.
- Commit: `4dd1b709b676b0eccf4bd6567f97a6cb107fe6ab`. The updated hub was re-fetched and all four new links were confirmed present.
- Still not verified: GitHub Pages deployment/rendering, Android tap-through tests, home-science module availability, and live Supabase cross-device classroom data. The local demo storage is not cloud sync.


## Home Science module — 2026-11-05
- Created `home-science.html` with six child-friendly topics: food and nutrition, personal hygiene, home safety, clothing care, home environment, and family teamwork.
- Added browser speech read-aloud controls, a five-question quiz, and a same-browser demo progress record using the existing shared demo key. This is not a Supabase cloud write or cross-device sync.
- Added Home Science to the Unified Learning & Classroom Hub. The module file and hub link were re-fetched after commits and confirmed present.
- Module commit: `ff5b7fe037d08c2ac4e80e99a4127ff66a359a7e`; hub commit: `7b2bdc4d88420e33c6fd356eee40e2e46b0d7639`.
- Still needs Android tap-through/audio/quiz testing and live Supabase integration verification.


## Android confirmation — Home Science — 5 November 2026
- The project owner reported that the Home Science page is good after opening/testing it on Android.
- Record this as user-confirmed page/device acceptance. It does not independently verify every audio voice, quiz score edge case, Supabase write, or cross-device synchronization.
- Home Science source, hub link and Master Guide updates remain committed; live cloud progress synchronization remains pending.


## Supabase student progress foundation — 5 November 2026
- Connected to the active Supabase project `ryuchmmnyjyldwouidyy` using the Supabase integration; database reports healthy status.
- Independently inspected the live public schema, migration history, RLS policies, function grants and security advisors. Confirmed RLS is enabled on classrooms, teacher_profiles, classroom_members and guardian_relationships. Existing classroom policies require approved teachers; classroom membership approval requires parent consent; guardian consent codes have no direct client access. No Edge Functions are currently deployed.
- Added `public.student_learning_progress` directly to the live database. It stores student-owned quiz/activity results with score constraints and timestamps. RLS enabled; authenticated users receive SELECT and INSERT only (no UPDATE/DELETE). Student inserts require the signed-in student's own ID and an active guardian link. Reads are limited to the student, active linked guardian, or approved teacher where classroom membership and parent consent are both approved.
- Verified the live table columns, all four policies, RLS enabled, and grants: anon has no SELECT/INSERT; authenticated has SELECT/INSERT and no UPDATE/DELETE.
- Security advisor still reports one warning: leaked-password protection is disabled. This setting was not changed.
- SQL reference committed at `supabase/student-learning-progress.sql`, commit `e5569dadb3d99ef62ddc323648451f8f6ecb67aa`; re-fetched and verified.
- Not yet done: authenticated student account/session flow, active guardian-link test account, actual progress INSERT/SELECT under user JWTs, dashboard reading from this table, and cross-device verification. Existing lesson quiz pages still save to same-browser demo storage; they do not yet write to this cloud table. Do not describe cloud progress sync as live until those tests pass.


## Business & Publishing preparation — 5 November 2026
- Added `PUBLISHING_READINESS.md` with the release sequence, Google Play and Apple App Store requirements, child-safety/privacy gates, owner decisions and technical blockers.
- Added `STORE_LISTING_DRAFT.md` with draft listing copy and the required store assets/owner inputs.
- Added `PRIVACY_POLICY_WORKING_DRAFT.md` as an internal starting point only. It is explicitly NOT a final or published privacy policy; actual data flows, publisher identity, processors, retention/deletion and legal review must be confirmed first.
- Reviewed current official Google Play and Apple developer guidance on app review, Families/Kids requirements, privacy disclosures, age ratings, store metadata and submission.
- This repository is currently a GitHub Pages web app. No signed Android App Bundle or iOS archive has been produced, no store submission has been made, and no legal/business details or subscription price have been invented.
- Business & Publishing preparation documents are committed. Store readiness remains blocked on real account/data-flow testing, child-safety gates, native packaging, owner decisions, app assets, privacy/legal review and release testing.


## Student cloud progress integration increment — 5 November 2026
- Re-audited the live Supabase project `ryuchmmnyjyldwouidyy`: the five core classroom/progress tables have RLS enabled. Existing policies remain in place for student self-insert/read, active guardian read, approved teacher read of consented classroom members, approved teacher classroom creation, and teacher membership approval.
- Tightened table grants: removed `anon` and `PUBLIC` table privileges from the five tables; retained only the required `authenticated` privileges (classrooms SELECT/INSERT; teacher_profiles SELECT; classroom_members SELECT/UPDATE; guardian_relationships SELECT; student_learning_progress SELECT/INSERT). Verified anonymous SELECT/INSERT are false on all five tables and RLS remains enabled.
- Added `supabase/least-privilege-grants.sql` to document the applied grants. Security advisor now reports leaked-password protection disabled (WARN); enable it in Supabase Auth settings before real family accounts. Performance advisor reports a non-blocking multiple-permissive-SELECT-policy warning on student_learning_progress.
- Added `student-cloud-progress.js`, an authenticated client helper that validates quiz records, uses the current Supabase user identity, and relies on database RLS/active guardian consent to authorize inserts. It also provides an RLS-filtered read of the signed-in student's records.
- Connected Mathematics, Science, Social Studies, Geography and Home Science quiz completion to attempt cloud inserts while retaining their existing local demo history. Cloud save failure is reported without losing the local result.
- Added a Cloud Learning Progress section to `student-profile.html` so the signed-in student can refresh and view their own server records. Source files were committed; live browser execution, real account/guardian test, and cross-device verification have NOT yet been completed.
- Homework remains local demo storage. There is not yet a verified server-side homework assignment/submission schema and workflow; do not claim homework cloud sync is implemented. Parent/teacher dashboards also still need cloud reads.
- No real student records were created and no passwords, access tokens or secret keys were requested or exposed.


## Secure cloud homework increment — 5 November 2026
- Created live Supabase tables `public.homework_assignments` and `public.homework_submissions`. Both have RLS enabled and no anonymous/public table privileges. Authenticated grants are limited: teachers can manage their own approved-classroom assignments; students can insert one submission per assignment; teachers can update only marking fields.
- Applied classroom policies: approved teacher ownership is required to publish/manage assignments; student assignment visibility and submission require approved classroom membership, parent-consent status and an active guardian relationship. Guardians can read linked-child assignments/submissions only while their relationship is active. Teachers can read/mark submissions only for approved, consented students in their own classroom. Database policy checks also prevent marks above the assignment maximum.
- Added indexes for classroom, teacher, student, assignment and marking foreign-key lookups. Supabase security advisor shows only the existing leaked-password-protection-disabled warning; performance advisor still notes multiple permissive SELECT policies and unused indexes (informational on an empty test dataset).
- Added `student-cloud-homework.js` for teacher assignment creation, student submission, guardian/teacher reading, and teacher marking via authenticated Supabase sessions.
- Added a secure classroom homework section to `homework.html`; the older Teacher/Student/Parent tabs remain local demo data and are clearly labelled as such.
- Connected Parent Dashboard to show cloud progress and consent-filtered cloud homework/submissions under RLS.
- Connected Teacher Dashboard to show cloud progress and submissions permitted for an approved teacher account, and linked to the secure Homework Manager.
- Verified source files were committed and re-fetched. Live browser execution and real teacher/student/guardian tests remain pending; the new homework tables currently contain 0 assignments and 0 submissions. No child records were fabricated.
- Leaked-password protection remains disabled and must be enabled before real family accounts. Cross-device testing and actual parent/teacher account linking remain pending.


## Number 3 continuation — lesson cloud progress and live dashboard refresh (5 November 2026)
- Connected English and History quizzes to the authenticated `student_learning_progress` insert helper.
- Connected Social Studies and Computer Studies quiz completion to the same helper.
- Math, Science, Geography and Home Science already call the helper. Each lesson attempts to save only when a signed-in account is present; the database still enforces active guardian relationship checks. A blocked cloud save is reported honestly in the lesson feedback while local quiz results remain local.
- Student dashboard now displays the signed-in student's own cloud progress history and refreshes it on demand; the previous dashboard snapshot button remains a separate summary mechanism.
- Parent and Teacher dashboards now subscribe to Supabase Realtime changes on student progress and homework submissions and refresh their RLS-filtered records. Student dashboard subscribes to its own progress changes.
- Added `homework_assignments`, `homework_submissions`, and `student_learning_progress` to the Supabase Realtime publication. Verified publication membership alongside existing classroom tables.
- Current live DB still has no homework assignments or submissions and no classroom membership rows; existing one classroom and one active guardian relationship remain as previously audited. No fabricated student/parent data was added.
- Supabase security advisor still reports leaked-password protection disabled. This is an outstanding dashboard setting and must be enabled before real child/family accounts are used. Performance advisor reports multiple permissive SELECT policies (performance warning only) and unused indexes on empty new tables; no unsafe policy relaxation was made.
- Real teacher/student/guardian sign-in, membership/consent, lesson insert, homework publish/submit/mark, parent visibility, and cross-device Realtime checks are still not verified. These require user-controlled test accounts and manual browser testing; do not describe Number 3 as finished until all pass.


## Number 3 autonomous continuation — additional lessons and dashboard script repair (5 November 2026)
- Repaired duplicate JavaScript lexical declarations introduced in the dashboard Realtime wiring. The Parent, Teacher and Student dashboard scripts now pass JavaScript syntax parsing; each has one set of state declarations and its Realtime subscription functions.
- Added authenticated cloud progress saving to Mathematics Extra, Science Extra, Computer Studies Extra, English Extra, General Knowledge and Social Studies Extra quizzes, plus the English alphabet/reading quiz. These follow the same RLS-governed `student_learning_progress` insert helper; no browser-supplied student IDs are trusted.
- Rechecked JavaScript syntax for the Parent, Teacher and Student dashboards, Homework Manager, International Classroom page, all eight primary subject lesson pages, the added extra-lesson pages, and the shared Supabase helper/config files. All inline/external source files parsed without syntax errors in the static syntax check.
- Confirmed all eight main subject pages load Supabase JS v2, the shared publishable-key config, and the cloud progress helper. Extra quiz pages listed above now do likewise.
- Confirmed the homework date input matches the database `due_at` date type, and the cloud progress timestamp has a database default.
- Static parsing is not a live browser execution test. GitHub Pages URLs were not retrievable from the automated browsing environment in this session, and the actual Auth/consent/teacher/student/parent workflow remains pending a user-controlled test session.


## Main home screen and graphics gallery navigation (5 November 2026)
- Added a direct “3D Learning Graphics Gallery” tile to the permanent Great Minds AI home screen, preserving the existing rocket home screen and its subject/dashboard navigation.
- The gallery artwork is embedded in `gm-3d-graphics-gallery-1.html` rather than relying on separate image files; the gallery page contains 15 embedded artwork images and a larger-image viewer.
- Verified the new home-screen gallery link points to an existing repository file. Rechecked internal references on the home screen, unified hub, parent/teacher centre, student profile, homework manager and graphics gallery; no missing internal file references were found in those checked pages.
- This is a repository/link check, not a live Android browser visual test; the user should still open the gallery on their device when convenient.


## Connected home-screen navigation improvement (5 November 2026)
- Added direct main-home-screen entry points for English Lessons, AI Teacher — Voice Demo, and Group Learning Demo, alongside the previously added 3D Graphics Gallery tile. Existing rocket home screen and current subject/dashboard links remain intact.
- Added a subject-aware “Continue learning” link to the AI Teacher prototype. The link routes Mathematics, English, Science, Computer Studies and General Knowledge to their corresponding full lesson pages.
- Rechecked JavaScript syntax on the home screen, AI Teacher, Unified Hub and Group Learning pages. All inline scripts parsed without syntax errors. Checked all local href/src references on these four pages against the repository tree; no missing internal targets were found.
- AI Teacher remains clearly labelled as an offline voice prototype in its safety notice and Unified Hub; the live AI endpoint is not yet connected. Group Learning remains a local demo, not a live multi-country classroom. Do not describe either as live online service.

- Group Learning now also offers a subject-aware link to the matching full Mathematics, English or Science lesson. The page's JavaScript syntax and internal file references were rechecked after the change; no errors or missing targets were found.


## Unified hub navigation and dashboard syntax audit (5 November 2026)
- Added direct Student Learning Hub tiles for Connected Practice, Progress Overview and Certificates & Achievements, making the existing three connected demo pages easier to reach from the unified hub.
- Rechecked the unified hub after the change: its JavaScript parses without syntax errors, all checked local href/src references resolve to files in the repository, and all three new tiles point to existing pages.
- Re-ran static JavaScript syntax and duplicate HTML-ID checks on the home screen, unified hub, student/parent/teacher dashboards, international classroom page, homework page, AI Teacher page, Group Learning page and student profile. No syntax errors or duplicate IDs were found in those inspected pages.
- These are source-level checks, not live Android/browser, account, cross-device or end-to-end classroom tests.


## Practice and certificate page robustness (5 November 2026)
- Improved the Connected Practice and Certificates pages to use explicit DOM element lookups rather than relying on browser-created global variables from element IDs.
- Re-fetched both updated pages and the Progress page; all inline scripts passed JavaScript syntax parsing. The practice page no longer uses an implicit global `result` reference, and the certificate page explicitly resolves its display and selector elements.
- These pages remain local-browser demonstration tools, as their on-page privacy notices state. They do not represent verified cloud-synchronised academic records or accredited certificates.


## Cloud dashboard authentication verification improvement (5 November 2026)
- Updated Student, Parent and Teacher cloud dashboard startup checks to call Supabase Auth `getUser()` rather than relying on the locally stored session returned by `getSession()` as the initial account identity check.
- Re-fetched all three updated pages and ran JavaScript syntax parsing. All three passed; each now uses `auth.getUser()` and no longer uses `auth.getSession()` for the startup check.
- Re-ran Supabase advisors. Security warning remains: leaked-password protection is disabled and must be enabled in Auth settings before real family accounts. Performance notices remain for unused indexes (not removed because low usage during a demo is not evidence they are unnecessary) and multiple permissive SELECT policies (kept separate to preserve role-specific access rules).
- This is a source and database-advisor verification, not a live account sign-in or cross-device test.


## AI Teacher subject coverage expansion (5 November 2026)
- Added Social Studies, History, Geography and Home Science to the AI Teacher's subject selector.
- Added one age-appropriate prepared example question and answer for each new subject and mapped each to its existing full lesson page.
- Re-fetched the updated AI Teacher page, verified all nine subject options have corresponding prepared-answer entries, checked its local links against the repository tree, and parsed its JavaScript without syntax errors.
- AI Teacher remains an offline demonstration; the new examples do not imply the live AI backend is connected.


## Completion work — AI Teacher, international classrooms, student progress and homework — 2026-11-05

- AI Teacher subject selection now requires an explicit choice before Ask Teacher or practice is enabled. The selected subject is retained for the current browser tab session, and the lesson link updates to the chosen subject.
- The AI Teacher still uses prepared offline examples. No live AI request is made because the Cloudflare Worker endpoint and its secret configuration are not available through the connected GitHub/Supabase tools. Do not describe AI Teacher as live until the secured endpoint is deployed and tested.
- Re-audited Supabase: all seven classroom/guardian/progress/homework tables have RLS enabled. The active Realtime publication includes classrooms, classroom_members, homework_assignments, homework_submissions and student_learning_progress.
- Re-audited classroom policies: only approved teachers create/manage their classrooms; students join through a server-side code function as pending members; teachers can approve only after guardian consent; active guardians can read linked student memberships. Parent-consent code redemption requires a verified guardian email and explicit confirmation.
- Student quiz pages load the cloud progress helper for Mathematics, English, Science, Social Studies, History, Geography, Home Science, Computer Studies and General Knowledge. Cloud inserts require a signed-in student with an active guardian relationship. A new secure cloud section in connected-progress.html displays only rows allowed by Supabase RLS.
- The homework page has a separate Supabase-backed workflow for approved teachers to publish, students with approved membership and guardian consent to submit, teachers to mark, and linked guardians to read permitted submissions. Older role tabs remain local-device demonstrations.
- Current database counts: 1 classroom; 0 classroom memberships; 1 active guardian relationship; 0 student progress rows; 0 homework assignments; 0 homework submissions. This means live student/parent/teacher workflows are not yet end-to-end verified.
- Security advisor still reports leaked-password protection disabled. This Auth setting requires dashboard access; it has not been changed. Performance advisor reports two multiple-permissive-policy warnings (homework assignment SELECT and student progress SELECT) and five unused-index notices; no policy was weakened to silence these warnings.
- Real account signup/sign-in, guardian consent, student join, teacher approval, homework submission/marking, cross-device progress visibility, Android UI tests and the live AI backend remain for supervised verification.


## AI Teacher backend preparation and cloud progress follow-up — 2026-11-05

- Added a Cloudflare Worker source template at cloudflare/worker.js and setup notes at cloudflare/README.md. The template implements POST /ask, Supabase access-token verification, active guardian-link checks, subject allowlisting, per-user rate-limit binding, child-focused tutoring instructions and OpenAI Responses API calls with store=false.
- Wired ai-teacher.html to use a configurable endpoint from ai-teacher-config.js when one is supplied. It retrieves the signed-in Supabase access token, sends the selected subject and recent text conversation, and displays the returned answer. If the endpoint URL is empty, the page safely remains in offline demonstration mode.
- The Cloudflare Worker has NOT been installed or deployed. It requires the user's Cloudflare Worker settings: OPENAI_API_KEY secret, Supabase URL and publishable key variables, and AI_RATE_LIMITER binding. The deployed Worker URL must then be entered in ai-teacher-config.js. A consented real-account request is still required to verify it.
- Fixed the AI Teacher Social Studies lesson link to open social-studies.html.
- Added a secure cloud-progress viewer to connected-progress.html and enabled the small Connected Practice quiz to submit permitted results through the existing cloud progress helper. The helper now allows student, guardian and approved-teacher accounts to view only the rows permitted by RLS.
- The cloud homework workflow remains separated from local demo tabs. It supports secure assignment publishing, student submission and teacher marking when account, membership and consent policies permit.


## Language coverage and repository-wide page audit — 5 November 2026

- Expanded the shared language dictionaries for Hindi, Bengali, Tamil, Telugu and Marathi with additional navigation, quiz, English-learning instructions, mathematics and science explanations, Home Science safety content and Social Studies text.
- Continued the translation pass for international classroom sign-in and consent controls, game instructions and rewards, Computer Studies, History, Geography and discovery facts. English target-language examples such as alphabet lyrics and spelling words are intentionally kept in English where that is the lesson objective.
- Added Indian-language translations for the AI Teacher interface, including subject selection, question entry, voice controls, practice and safety/status labels.
- Added matching Indian-language choices, greeting practice and AI request language mapping to the AI Teacher frontend; added the same five languages to the Cloudflare Worker allowlist.
- Updated the Cloudflare setup notes to correct the Supabase project URL and document all twelve supported AI teaching languages.
- Audited all 52 root HTML pages. All 51 non-home pages load gm-language.js; index.html uses its own inline 11-language translation system. All 52 pages include a mobile viewport declaration.
- Re-fetched the shared language script and AI Teacher files and passed JavaScript syntax checks. This is source verification only; lesson completeness, live rendering, Android audio and all language layouts still need device testing.
- Updated OWNER_ACTIONS.md and PRODUCTION_READINESS.md to reflect the database verification report: guardian-consent revocation and homework maximum-score migrations were applied and rollback-tested. The remaining real-account and cross-device workflows are still pending.
- The AI Teacher Worker remains a source template and is not deployed. Its endpoint URL is intentionally blank until Cloudflare deployment and configuration are completed.
- Fixed shared language matching so emoji-prefixed page labels can match either their complete translation key or the text-only fallback; this prevents some icon-prefixed headings and buttons from being skipped.


## Vocabulary Adventure upgrade — 6 November 2026
- Expanded the existing `vocabulary.html` in place, preserving its home-screen destination and links to Dictionary, Story Studio and Reading & Writing.
- Added five topic sets (Everyday, Animals, Nature, Feelings and School), 25 child-friendly words with meanings and example sentences, browser read-aloud controls, a five-question scored meaning quiz, and sentence-building practice.
- Added optional saved-word collection on the current device. Sentence text and voice are not uploaded; the page attempts to save only the quiz score through the existing authenticated `student_learning_progress` helper, subject to Supabase RLS and guardian consent.
- Commit: `6dc3f315592e56034a8a7e1bc7756ee585c8adcb`. Re-fetched the committed page and verified the expected sections, speech code, quiz, cloud-progress helper and home link are present.
- GitHub Pages live rendering, Android touch/audio behaviour, quiz interaction and authenticated cloud-save flow remain untested. Do not mark the module device-tested or cloud-synced until those tests pass.


## English Story Studio reliability and progress increment — 6 November 2026
- Updated `english-story-studio.html` to load the existing Supabase client configuration and authenticated student-progress helper.
- The four-question comprehension quiz now attempts one secure English progress save when completed, using the existing RLS/guardian-consent-gated helper. Writing remains device-only and is not uploaded.
- Fixed a quiz restart race: restarting increments a run token so a delayed answer timer from the previous attempt cannot overwrite the new quiz.
- Clarified the optional audio feature: it is a soft steady focus tone generated on-device, not instrumental music or a recorded track.
- Commit: `054099aef2cfe588a8e353f0a33efcb8f21db55c`. Re-fetched the committed page and verified the Supabase scripts, quiz completion save call, English progress fields, device-only writing, restart guard and honest audio description are present.
- Not yet verified: live browser JavaScript execution, Android voice/audio, quiz interaction, signed-in student progress INSERT under real RLS/guardian consent, or cross-device dashboard visibility. These remain pending; no cloud sync or device test is claimed as complete.


## Whole-subject source audit — 6 November 2026
Inspected the main subject pages and their companion pages in GitHub. This is a source-code review only; live Android interaction and real student-account cloud writes have not yet been independently tested.

| Area | Present in source | Gaps / next improvements |
|---|---|---|
| Mathematics (`math.html`) | 10-question quiz, scoring, local demo record, call to protected student-progress helper | No lesson read-aloud control; verify restart/result UI and live cloud save |
| Science (`science.html`) | 10-question quiz, scoring, local demo record, call to protected student-progress helper | No lesson read-aloud control; add safe, guided activity/explanation prompts; verify live cloud save |
| Social Studies (`social-studies.html`) | 5-question quiz, explanations, local demo record, call to protected student-progress helper | No read-aloud control; expand topic coverage and examples from different regions |
| History (`history.html`) | 5-question evidence/source quiz, local demo record, call to protected student-progress helper | No read-aloud control; add timeline/source exploration and age-appropriate regional coverage |
| Geography (`geography.html`) | Continent fact cards, keyboard activation, 5-question quiz, local demo record, call to protected student-progress helper | No read-aloud control; add map-based exploration and more countries/capitals/physical geography |
| Home Science (`home-science.html`) | Topic content, speech helper, 5-question quiz, local demo record, call to protected student-progress helper | Verify read-aloud controls are exposed and cloud-save outcome is visible; add safe practical activities with adult guidance |
| Computer Studies (`computer.html`) | Speech helper, computer-part explanations, typing activity, simple robot-step activity, 5-question quiz, cloud progress call | Quiz currently has no clear restart/result summary flow; several actions use inline handlers; add accessible completion/retry and check progress display |
| Little Learners Encyclopedia (`encyclopedia.html`) | Search, category filters, 16 topic cards, fact snippets | No speech, quiz or student progress tracking; improve child-friendly topic navigation and comprehension checks |
| Guided Research Centre (`guided-research.html`) | 4 guided topics, research questions, locally saved notes, basic research-plan builder | No read-aloud or progress tracking; add source-checking and safe research guidance, and avoid presenting unverified AI-generated facts as sourced evidence |
| Companion `*-extra.html` pages | Mathematics, Science, Social Studies and Computer companion pages include speech and quiz features | Need check which links are actually used; avoid duplicate/conflicting learning routes and standardise quiz/progress behaviour |
| Advanced Learning Studio (`advanced-learning.html`) | Large integrated learning page with quiz, speech and progress references | Needs a separate deeper feature and navigation audit before changing it |

### Review priorities
1. Add consistent, optional read-aloud support to Mathematics, Science, Social Studies, History and Geography.
2. Improve Encyclopedia with read-aloud and short knowledge checks; connect scores only through the existing consent- and RLS-gated student progress helper.
3. Improve Guided Research with safe source evaluation and age-appropriate research steps.
4. Fix Computer Studies quiz completion/retry consistency and review all companion-page links.
5. Test every subject on Android and verify real authenticated Supabase writes before marking any feature fully complete.

No subject page was declared fully device-tested or cloud-synced by this source audit.


## Cross-subject improvement delivered — 6 November 2026
Added optional lesson read-aloud and stop-voice controls to the main Mathematics, Science, Social Studies, History and Geography pages. Each control reads the lesson sections before the quiz, uses the browser's built-in speech synthesis, cancels existing speech before starting, reports status accessibly, and gives a clear fallback when speech synthesis is unavailable. Existing quizzes, student-progress helper calls, home-screen links and Unified Hub links were retained.

Commits:
- Mathematics: `e8a7701596f2f65d48d9e20d68c12c08550abc76`
- Science: `c825d39806596ff0dd3d3bf1e9c63926d02ad6b9`
- Social Studies: `8ff262e832f388350bb5c754170e87683842eb73`
- History: `221f865ce2a852350ba47abacea8aa0498aa13dc`
- Geography: `1d18ab72e513574d026714f306d21a8816c95737`

Verification: re-fetched all five committed pages and confirmed read/stop controls, speech synthesis, unsupported-browser fallback, quiz presence, progress helper reference, home and hub navigation, and accessible status region. These are source checks only; actual Android playback, page rendering and authenticated Supabase writes still require device/account testing.


## More learning pages improved — 6 November 2026
Added optional read-aloud and stop-voice controls to the Little Learners Encyclopedia and Guided Research Centre. The Encyclopedia reads the currently visible topic cards (so category/search filters are respected); the Research Centre reads the currently selected guide. Both include unsupported-browser handling and accessible status text. Existing search/filter, research topic selection, local-only notes and navigation were preserved.

Commits:
- Encyclopedia: `f06577b551b586810589ed62446898cdb35c0f0b`
- Guided Research: `c9be63c32989d2d29217ce377d4d987c9efeecfc`

Re-fetched both pages and checked that controls, speech code, dynamic content targets, navigation and core existing content remain present. Android playback and live account tests remain pending.


## Computer Studies and Home Science quiz reliability — 6 November 2026
Improved the Computer Studies quiz with a clear finish state, disabled answer choices after a selection, a visible retry control, score reset on a fresh attempt, and a handled cloud-save failure message. The existing five questions, lesson activities, navigation and consent/RLS-gated progress helper arguments were retained.

- Computer Studies commit: `5e7cf6b5faeb99edff1eba11d04719fc5cd28e37`

Also made Home Science cloud-progress feedback resilient to a rejected save request, so a network or helper error no longer interrupts the displayed quiz result. Existing lesson audio, safety guidance, five-question quiz, local demo record and progress helper arguments were retained.

- Home Science commit: `359fd6471267a5704673776c205d0dc94f3c5f1f`

Verification: Computer Studies was re-fetched and checked for retry, finish-state protection, answer locking and cloud-save error handling. Home Science was re-fetched and checked for its existing read-aloud controls, five-question quiz, local progress record, cloud progress helper and rejection handling. These are source checks only. Actual Android interaction/audio and authenticated Supabase writes still need to be tested on the user's device/account.


## Encyclopedia knowledge check — 6 November 2026
Added a five-question knowledge check based on existing Encyclopedia topics (Solar System, plants, dolphins, water cycle and algorithms). It gives immediate explanations, score feedback, requires an answer before advancing, and supports a fresh retry. The score stays in the page and is not sent to a server; no child personal information is collected. Existing topic search, category filters, read-aloud, home navigation and Unified Hub navigation were preserved.

- Encyclopedia commit: `ab7127025870b4fb8511a9b67f2b04aeee473186`

Verification: source was re-fetched and checked for the knowledge-check section, all five questions, feedback, scoring, retry, and preservation of the existing search/filter and read-aloud features. Android rendering, audio and hands-on quiz behaviour remain to be tested on device.


## Companion practice pages consistency pass — 6 November 2026
Reviewed the extra Mathematics, Science, Computer Studies, Social Studies and English practice pages, plus General Knowledge. Standardised answer handling on the six quiz pages: after a child answers a question, its choices are disabled to prevent accidental multiple changes; the existing Try Again control resets feedback and unlocks all choices. Cloud progress feedback now handles rejected save calls without silently losing the visible score.

Commits:
- Mathematics extra: `4fe26e2f811a391921a03b48212edde8b6918406`
- Science extra: `21819b6ec7e94bc34406075e3101dc4d4bcf6467`
- Computer Studies extra: `47cf3f9f0a421eb6d0df8bea92b3abf59fa3f0be`
- Social Studies extra: `e3d6e7a5b06da7c7d8ffe789e63324cff54ef99c`
- English extra: `b5431762d07926a25a1561c409b1ed4e6ea29300`
- General Knowledge: `17ab63db4504aced7d00b22d7db62737495d4bf3`

General Knowledge also gained optional browser read-aloud for each question and its answer choices, with a clear unsupported-browser message. The original home links, lessons, questions, local-only writing/data choices and consent/RLS-gated cloud progress helper use were preserved. Source checks are not a substitute for Android interaction/audio and real student-account Supabase tests.


## Advanced Learning Studio reliability pass — 6 November 2026
- Reviewed `advanced-learning.html`: five-question subject check-in for Mathematics, English and Science; adaptive daily plan; multilingual phrase practice (English, French, Bangla and Hindi); browser speech recognition/read-aloud; and real-world problem challenges.
- Removed a duplicate challenge-check click handler so each submission produces one feedback result using the selected interface language.
- Improved Stop Voice so microphone recognition callbacks are cleared before aborting; an abort event can no longer replace the user's stopped confirmation with a microphone error.
- Preserved the existing local-device learning record, consent/RLS-gated `gmSaveStudentProgress` call, language selector, AI Teacher link, Learning Hub link and main home link.
- Commit: `a8da25983d9834fad856c931697503c621947002`. Re-fetched the page and verified the single challenge handler, safe microphone stop, speech recognition, cloud helper, quiz/plan controls, language selector and navigation links.
- This is source verification only. Live Android layout, microphone permission, speech playback, language voice availability, quiz/challenge interaction and real authenticated cloud saving still require device/account testing.


## Guided Research Centre upgrade — 6 November 2026
- Expanded the child-friendly topic library from four to six guides by adding food journeys/community roles and electricity generation/safety.
- Added a structured source-evaluation checklist covering creator, publication/update date, evidence and confirmation from a second trusted source. It gives cautious feedback when information is incomplete and explicitly advises children to pause and ask an adult when sources disagree.
- The checklist is a thinking aid, not a guarantee that a source is true. It does not browse the internet or certify sources.
- Preserved the existing locally saved research notes, question-to-plan builder, optional read-aloud, language script, and home/Unified Hub navigation. Checklist answers and free-text notes are not uploaded.
- Commit: `87cd77e5114ac76c8f3088bdffdea6f9ef3513ca`. Re-fetched the page and verified the new topic entries, source-check fields/feedback, local-only notes, read-aloud and navigation.
- This remains source verification only. Android layout, voice playback, topic interactions, local storage behaviour and real authenticated student workflows still need device testing.


## Audio, language and AI Teacher audit — 6 November 2026
- Reviewed the shared `gm-language.js`, home-screen language selector, AI Teacher page/configuration, authenticated student-progress helper, and the main subject/learning pages.
- The shared page-language selector currently offers English plus ten translated interface languages (Hindi, Bengali, Tamil, Telugu, Marathi, Mandarin Chinese, German, Spanish, French and Arabic). The shared translation dictionaries cover those ten languages, but the script itself explicitly notes that lesson text is not fully translated. Urdu and Swahili are available as AI Teacher greeting/voice choices, not as complete app-wide interface translations.
- The AI Teacher currently has 12 greeting-language choices and two prepared greeting phrases per language. Its configured endpoint remains blank, so questions use a limited set of offline prepared examples; this is not a live conversational AI teacher and its prepared answers are not translated into every selected language.
- Improved AI Teacher speech playback to select an installed voice matching the selected language, wait briefly for browser voice availability, and clearly report when that language voice is unavailable rather than silently substituting another language. Both greeting playback and answer playback now use the same helper.
- Improved Stop Voice to clear microphone recognition callbacks before aborting and re-enable the microphone button, preventing a late abort event from replacing the stopped status.
- Commit: `2bb2be6311ca85c87fc45163af237b46fc3afcd9`. Re-fetched the page and source-checked locale selection, both speech call sites, missing-voice feedback, stop cleanup and all 12 language options.
- The main subject pages and several learning pages contain read-aloud support through their own controls and/or the shared language script. This source audit does not prove that every page's content is translated, every browser voice is installed, or every audio control works on Android.
- Remaining blockers for a complete audit/launch sign-off: deploy and test the secure AI Teacher Worker endpoint; verify AI responses, error handling and language output with real signed-in accounts; test Android microphone permission and speech playback in each intended language; complete app-wide lesson translations (including Urdu and Swahili if they remain launch languages); test all home-screen routes and page interactions; and verify real Supabase progress writes and cross-device classroom workflows.
- No claim of 100% completion or device-tested audio is made. Prototype estimate remains 94%.


## Cross-page source audit and home accessibility repair — 2026-11-06
- Re-fetched the current home page, core subject pages, practice pages, learning tools, student profile, parent/teacher centre, homework, connected dashboards and connected student/teacher/parent pages from the default branch.
- Checked the home-screen destinations and the locally linked HTML routes exposed by the inspected pages. The previously suspected `english-extra.html` and `computer-extra.html` practice destinations both exist; the linked connected-dashboard, classroom, homework, subject and profile pages inspected also exist. This is a source-level route check, not a live GitHub Pages click-through. No route was changed based on a false missing-file assumption.
- Repaired the home-page audio controls: the Listen control now reads only the introductory heading and hero text (rather than the entire page/navigation), a separate Stop control cancels speech, and an accessible live status reports playback, missing-language-voice and stop states. It retains the rule not to silently substitute English when the selected voice is unavailable.
- Updated the Start Learning scroll action to respect the device's reduced-motion preference.
- Home page update committed as `2a2e8e7e02a1cae94d3d11b23494d1cc37411763`; re-fetched and verified the new controls, intro-only speech target, reduced-motion condition and closing HTML structure.
- Remaining source audit work: continue reviewing every linked page's quiz logic, response quality, cloud-save paths, language application, speech lifecycle, mobile layout and privacy. Real Android microphone/audio/language voice tests, live Supabase role/consent/RLS tests, and cross-device classroom tests remain unverified. Cloudflare/backend deployment remains outside this audit as requested.


## Speech stop-control consistency repair — 2026-11-06
- The source audit found several pages with read-aloud functions but no visible way for a child to stop speech. Added an accessible `⏹ Stop voice` control to `computer.html`, `general-knowledge.html`, `math-extra.html`, `science-extra.html`, `social-extra.html`, `english-extra.html`, `computer-extra.html`, `english.html`, `vocabulary.html`, `dictionary.html` and `home-science.html`.
- Each control cancels browser speech synthesis and gives visible stopped-state feedback. Existing quiz answers, score handling, reset/retry functions and cloud-save helper calls were left unchanged.
- All 11 updated pages were re-fetched after commit; the stop control and speech-cancel handler were confirmed in each. This remains source verification only; actual playback and cancellation must still be tested on Android.
- The connected classroom, homework, profile, parent/teacher and student dashboard pages inspected had no missing `getElementById` targets in the static scan. No frontend service-role or obvious secret key was found in the inspected Supabase configuration/helper files. This does not replace a full secret scan, Supabase security review or live RLS testing.


## Shared language-toolbar speech control — 2026-11-06
- Updated `gm-language.js` so the shared language toolbar also provides a visible `⏹ Stop voice` control for page narration. It cancels browser speech synthesis and reports that voice playback stopped.
- The shared toolbar avoids adding its stop button when a page already exposes the dedicated `gm-stop-voice` control, preventing unnecessary duplicates on the recently repaired pages.
- Commit: `7c8fc87717cf01bbcc9cca0c7aed85a47fd035bb`; re-fetched and verified the toolbar stop button, cancellation handler and duplicate guard.
- The shared script is used by the non-home learning pages; the home page has its own independent Stop control. This is source verification, not proof of Android voice availability or playback behaviour.

- Follow-up responsive-layout repair: the homepage language/audio controls and shared language toolbar now wrap onto additional lines on narrow screens; the homepage audio status spans the full toolbar width. Both updated files were re-fetched and the responsive CSS changes were verified. Commits: homepage `ff791e0caeea1e33724cdddfad5981b294cfe81e`; shared toolbar `e1586dd13e874f9ca1c3e67772abf718e956014d`. This is CSS source verification, not Android screen testing.


## A–Z lesson accuracy and narration refinement — 2026-11-06
- Refined the A–Z explorer's displayed phonics cue so it is presented as a clear letter-sound label with a familiar example, rather than putting spoken approximations inside phoneme slashes.
- Updated read-aloud narration to say the letter, its sound cue, and all three example words in a child-friendly sequence.
- Added explicit vowel-sound distinctions for A (short/long A examples), I (short/long I), O (different vowel sounds in orange/owl), and U (short U versus the /yoo/ sound in uniform/unicorn).
- Verified all 26 alphabet data entries remain present after the edits.
- Commits: 3895a38e25d85a4f08972695f770478d5f5119f9 and c8fa5fd6255c2d02e8f04dc126a0f8c1bc440128.
- This is source-level verification only. GitHub Pages live rendering, browser speech playback, Android screen-reader/accessibility, and child usability still need device testing. The emoji illustrations remain temporary symbols, not custom 3D artwork.


## 3D graphics gallery asset inventory — 2026-11-06
- Inspected both gallery entry files. The short gallery entry redirects to gm-3d-graphics-gallery-1.html.
- The consolidated gallery contains 15 artwork previews embedded as data:image/webp base64 data, rather than external image paths. The repository tree currently contains no separate PNG, JPEG, WebP, SVG or GIF asset files.
- Gallery preview subjects include Home Banner, English, Math, Science, Geography, Games, Homework, AI Teacher, Groups, School, Library, Space, Navigation Icons, Rewards & Badges, and Points & Progress.
- The gallery already includes load/error counting and a tap-to-enlarge dialog. Source inspection confirms those checks exist; actual browser image decoding and Android display have not been tested in this session.
- These are gallery previews only. Their presence does not prove that lesson pages use custom 3D objects, nor that the requested app-wide 3D object collection has been integrated.


## First A–Z 3D-style object assets integrated — 2026-11-06
- Added nine original SVG learning-object illustrations under `assets/3d-style/`: apple, ant, airplane, ball, bird, bus, cat, car, and cup. The artwork uses dimensional shading, highlights, gradients and ground shadows to give a consistent polished 3D-style appearance while remaining lightweight and scalable on mobile.
- Connected these nine assets to the A–Z Object Explorer in `vocabulary.html`. Matching words now display the SVG illustration with descriptive alt text and lazy loading; other vocabulary words retain their existing emoji fallback until their own art is ready.
- Source changes committed as `9c5fa7fc7c2951f898743c418d934846f620a848` (asset files) and `a809d065b4a7df81fb2dd7538939b7961114c5c3` (A–Z integration).
- Verified that all nine asset files can be fetched from the repository and that the A–Z renderer references the new asset map. Live GitHub Pages rendering and Android visual testing are still required.
- These are original 2D SVG illustrations with dimensional/3D-style shading, not animated 3D models. No animation is claimed. The remaining 17 letters' objects and app-wide subject imagery still need equivalent artwork.


## A–F illustration collection expanded — 2026-11-06
- Added nine more original SVG illustrations: dog, duck, drum, elephant, egg, engine, fish, flower and fan.
- Connected all nine to the existing A–Z Object Explorer asset map. The A–F lesson cards now use 18 original 3D-style shaded SVG assets across their three examples per letter; the other letters continue to use their emoji fallback.
- Commits: `0db20a34025065a19b429fed63ea27f55ba271c2` (new assets) and `890597db8d26f897855cb1c532098f020765b492` (A–Z asset map update).
- The SVG files are lightweight vector illustrations with gradients, highlights and shadows, not animated 3D models. Live GitHub Pages and Android image rendering remain untested.


## G–I illustration collection added — 2026-11-06
- Added nine original SVG illustrations: goat, grapes, globe, horse, house, hat, insect, igloo and ice cream.
- Connected the nine assets to the A–Z explorer. Letters A through I now have all three example objects represented by custom SVG art (27 assets total across those nine letters).
- Commits: `ff1b45fef6eeaed6cbaa728e50b177527210d1e5` (assets) and `b9a5091ef131e9b74e89e83ab6abb117d50114cd` (lesson integration).
- Artwork remains static 2D SVG with dimensional shading, not animated 3D models. The remaining J–Z objects and the rest of the app's subjects still need art. Live page and Android tests remain pending.


## J–Z illustration collection completed — 2026-11-06
- Added 51 SVG learning-object illustrations for J through Z (three objects per letter), covering Jug, Jeep, Jellyfish; Kite, Key, Kangaroo; Lion, Leaf, Lamp; Moon, Monkey, Mango; Nest, Nose, Notebook; Octopus, Orange, Owl; Penguin, Pencil, Plane; Queen, Quilt, Quail; Rabbit, Rocket, Rainbow; Sun, Ship, Snake; Tiger, Train, Tree; Umbrella, Uniform, Unicorn; Van, Violin, Volcano; Whale, Watch, Watermelon; X-ray, Xylophone, Fox; Yak, Yo-yo, Yacht; Zebra, Zip and Zoo.
- Connected all 51 new assets to the existing A–Z Object Explorer asset map. Together with A–I, all 26 letters now have three matching SVG illustration assets (78 total).
- Artwork uses a consistent dimensional card, gradients, highlights and shadows with a clear object symbol and label. These are static 2D SVG illustrations with 3D-style presentation, not animated 3D models.
- Asset commit: 1cd18aa44d79018a927970846f070bf9f8474dec. Vocabulary integration commit: 6afc380a0572cafe25c11ac6949b7055fdc8acb8.
- GitHub source verification follows. GitHub Pages rendering, Android visual display, accessibility and speech behaviour still require hands-on device testing.
- Overall prototype estimate remains 94%; no launch-readiness or device-testing claim is made.


## Subject learning illustration rollout — 2026-11-06
- Added 21 matching subject illustration SVGs under `assets/3d-style/`: Mathematics (abacus, shapes, measurement); Science (plant life, water cycle, solar system); Geography (globe, mountains, compass); History (ancient vase, pyramid, historic ship); Social Studies (community, community helper, teamwork); Computer Studies (computer, robot, code); Home Science (healthy food, handwashing, home safety).
- Integrated a responsive three-image strip near the top of each corresponding lesson page: `math.html`, `science.html`, `geography.html`, `history.html`, `social-studies.html`, `computer.html` and `home-science.html`. Images include descriptive alt text, lazy loading and fixed aspect ratio. Existing lesson and quiz content was not replaced.
- Re-fetched all seven pages and confirmed one illustration strip, three image references and three descriptive alt texts on each page. This is source verification; live GitHub Pages image loading and Android layout still require device testing.
- Artwork is static 2D SVG with dimensional/3D-style gradients and shading, not animated 3D models.
- New subject-art commit: 98a547835bad9967b3e19f45f218a3130e8bc5d6. Page integration commits: Mathematics 41b2184e452b08711945119a9850a1ca406d430b; Science d20520a70ae578dc895608be2c202d38173b9d6d; Geography f1430bf2dd033ce0c31a8eb9031aca697bc4017a; History e108f2e71cfe80a9f35f25b785cb8e5855712477; Social Studies a1a01b2eae9d65c31d7aaab349b94bb5ca85ad14; Computer Studies 6a1bc65b8ac56a960fbbcf3c4a176493858e4673; Home Science a600adb49ea2363bb878718f50f49ca3a973d410.
- Overall prototype estimate remains 94%; no live/device test or launch-readiness claim is made.


## Supabase frontend configuration correction — 7 November 2026
- Verified the active Supabase project ID and API URL directly against the connected Supabase project.
- Found that the shared frontend configuration used a mistyped project URL (one missing final `y`). Corrected `supabase-config.js` and verified the updated file from GitHub.
- Confirmed the configured `sb_publishable_...` key matches the active project's enabled publishable key; no service-role or secret key is present in the frontend config.
- Rechecked the live public schema: all seven core tables have RLS enabled; Realtime includes classrooms, classroom_members, homework_assignments, homework_submissions and student_learning_progress.
- The existing security advisor still reports Leaked Password Protection Disabled. Real teacher/student/guardian sessions and GitHub Pages end-to-end behaviour remain unverified; do not call international classrooms or launch readiness complete.


## Supabase and frontend follow-up audit — 7 November 2026
- Rechecked the current International Classrooms page: it loads the shared `supabase-config.js`, uses Supabase Auth, creates classrooms through the approved-teacher RLS policy, submits student join requests through `join_classroom_by_code`, and includes one-time guardian consent/revocation flows. Its classroom-members Realtime subscription is present. These are source-level findings; real separate-account and cross-device tests are still required.
- Inspected the guardian-consent and classroom-join RPC wrappers and private implementations. The private functions use `SECURITY DEFINER` with an empty search path; guardian redemption requires a signed-in account, verified guardian email, explicit confirmation, an unexpired one-time code, and does not itself approve classroom membership. Teacher approval remains a separate step.
- Confirmed the Student Profile loads the shared Supabase helper, but its general homework/quiz history and summary remain device-local. The cloud helper saves supported quiz progress only for the signed-in student when database consent/RLS rules allow it. The parent/teacher demo dashboards and much of Homework Manager still contain local-device demo data alongside separate cloud features; do not describe all records as cross-device synchronized.
- Rechecked Supabase advisors: one security warning remains — Leaked Password Protection is disabled. The performance advisor reports two multiple-permissive-SELECT-policy notices (homework assignments and student progress) and five currently unused indexes; these are review items, not proof of a data exposure. Health advisor returned no findings.
- No database policies or schema were loosened or changed in this audit. The shared home screen and navigation were not changed.
- Remaining work: enable leaked-password protection in Supabase Auth settings; test real student, guardian and approved-teacher accounts; verify join, consent, teacher approval, homework, progress and Realtime across separate devices; distinguish every local demo record from cloud-saved records in the UI; and keep the AI Teacher live endpoint pending until its secure Worker is deployed and tested.
- This is source/database configuration review, not live user-session verification. International classroom connection, AI Teacher conversation and launch readiness remain incomplete.


## 3D graphics gallery visual enhancement — 9 November 2026
- Preserved the existing single-file gallery and all 15 embedded WebP artworks; no external image dependencies were added.
- Improved gallery cards with layered CSS perspective, depth transforms, dimensional shadows and hover motion on pointer devices. Added reduced-motion support and updated the user-facing description.
- Source update commit: cb5f899693550ab7a430698e9fd6ec957edf7386.
- Verified the updated GitHub source contains all 15 embedded artworks, the perspective styling and reduced-motion fallback. This is source verification only; Android visual rendering still needs the user's confirmation.
- No paid assets, subscriptions, or external 3D model dependencies were introduced. The artwork remains static images with 3D-style presentation; this update does not add animated 3D models.


## Live Supabase advisor and access review — 10 November 2026
- Queried the active project `ryuchmmnyjyldwouidyy` directly. Project status is ACTIVE_HEALTHY.
- Current security advisor: Leaked Password Protection remains disabled (WARN). Three RLS-enabled/no-policy findings were reviewed: `private.ai_teacher_daily_usage`, `private.classroom_join_attempts`, and `public.account_deletion_requests`.
- Read-only grants/schema inspection found the private schema is not USAGE-accessible to `anon`; the two private tables have no grants to `anon` or `authenticated` (only database owner/service-role privileges). `public.account_deletion_requests` likewise has no client-role table grants (only owner/service-role). No broad client access was found, so no permissive policies were added. These no-policy findings are intentionally left closed pending function/workflow review.
- Current performance advisor: two multiple-permissive-SELECT-policy notices on `homework_assignments` and `student_learning_progress`, plus five unused-index notices. These are optimization/review items, not evidence of data exposure. Health advisor returned no findings.
- No database schema, grants or RLS policies were changed in this review.
- Remaining action: enable Leaked Password Protection in Supabase Authentication settings (dashboard action; not changed through SQL), then re-run the security advisor. Continue real Android teacher sign-in and classroom checks at `supabase-connect.html`; separate-account parent/student consent, approval, Realtime and cross-device tests remain pending.
- Source-level status and live advisor findings are not equivalent to end-to-end verification. Do not mark international classroom integration or launch readiness complete.


## Subject audio and supervised classroom calling audit — 10 November 2026
- Rechecked the shared Supabase frontend configuration used by the supervised call page. `supabase-config.js` exposes only the project URL and publishable key; the call page uses the signed-in Supabase session to request a short-lived token from `classroom-call-token`.
- Rechecked the active calling Edge Function and its authorization path: JWT verification remains enabled; only the approved owner-teacher can start/end a call; approved students require guardian consent; linked guardians receive observer-only permissions; the teacher must start the room before others can join; room tokens expire after 10 minutes; no recording is configured in the app code.
- Found and fixed a LiveKit server URL mismatch before credentials are added: browser clients need the project's `wss://` URL, while LiveKit `RoomServiceClient` requires an `https://` host. The Edge Function now derives the HTTPS host server-side and keeps the WSS URL for browser connections. Deployed and re-fetched version 3; status ACTIVE and `verify_jwt=true`.
- Static source audit found browser speech-synthesis code in the sampled English, Mathematics, Science, History, Geography, Home Science, Vocabulary, Reading & Writing, Social Studies, English extension and story pages. This does not prove Android voice playback; each subject still needs a real device test with the chosen Android text-to-speech engine.
- Found that `creative-arts.html` did not load the shared `gm-language.js` script, so it missed the shared language controls and supervised-classroom link. Added the script and re-fetched the file to verify the change. Commit: 05d9b8ebbc98fc8fdf319e0d21d4d20c5baf069d.
- The call page, Supabase configuration and international-classroom links were rechecked at source level. The correct GitHub repository is `romanoosano60-maker/great-minds-ai` (not the older backend repo name).
- Still pending: create/configure the LiveKit project and add `LIVEKIT_URL`, `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` as Supabase Edge Function secrets; then test a teacher, consented student and linked guardian on separate devices, including teacher end-call. Do not paste the API secret into GitHub or chat.
- This is source/configuration verification only. No real audio/video call or Android subject-audio playback has been completed; neither calling nor overall launch readiness is marked complete.
- Follow-up audio-control scan of the home-linked subject pages found Creative Arts had no Stop control for its spoken rhythm prompt. Added a visible Stop audio button wired to cancel speech synthesis; re-fetched the file and verified the new control and handler. Commit: 29076801ced07b84f0e8545d1baa7adba3a17dbd.


## Follow-up source, calling and database hardening audit — 10 November 2026
- Rechecked 20 core subject/extension pages in the repository: English, Mathematics, Science, History, Geography, Home Science, Vocabulary, Reading & Writing, Social Studies, Computer Studies, General Knowledge, Creative Arts, English extensions/story studio, Advanced Learning, Computer extension, Science extension, Social extension and Mathematics extension. All 20 contain browser text-to-speech code, a Stop/cancel control and the shared `gm-language.js` classroom panel. This verifies source only; Android playback and voice quality still require device testing.
- Rechecked all local HTML/JavaScript/CSS references found in the home screen: every referenced local file exists in the repository; no missing home-screen destination was found. The repository tree currently contains 56 HTML pages. This is a static source check, not a live GitHub Pages or Android navigation test.
- Rechecked `ai-teacher-config.js`, `ai-teacher.html` and the active Supabase `ai-teacher` Edge Function. The frontend is configured to call `https://ryuchmmnyjyldwouidyy.supabase.co/functions/v1/ai-teacher`; the function is ACTIVE at version 4 with JWT verification enabled. The page sends text questions and recent text history; browser speech recognition transcribes microphone input and browser speech synthesis reads answers. A successful request using a real approved/consented account has not been tested, and natural low-latency voice-to-voice streaming is not implemented. Older notes saying the Supabase AI endpoint had not been deployed are superseded by this check; Cloudflare `/ask` remains a separate template and is not required by the current frontend configuration.
- Added the deployed `ai-teacher` Edge Function version 4 source to `supabase/functions/ai-teacher/index.ts` in GitHub so the active backend implementation is now tracked alongside the classroom-call function. Commit: `88ca0eb9dac7dc275dd44158e54cd19ce03ee7c0`.

- Rechecked the LiveKit classroom call page and found a privacy issue in its error path: a media permission failure after connection could leave the room connected. Fixed the catch path to disconnect and disable controls immediately. Also changed the teacher's Leave call action to end the supervised room and disconnect participants. Commit: `96904c1a657f1ca761d7032fd4aaee1ffdf5d187`. Re-fetched the file and verified both safeguards are present. This remains source-level verification, not a real call test.
- Strengthened supervised-call presence checks: `classroom-call-token` is now ACTIVE at version 4 with JWT verification still enabled. Student/guardian join requests are rejected unless the approved classroom teacher is currently present in the LiveKit room; the response supplies the teacher identity so student/guardian clients leave automatically when the teacher disconnect event arrives. Added the deployed function source to `supabase/functions/classroom-call-token/index.ts` in GitHub. Deployment and source were re-fetched and verified. The frontend now loads the LiveKit browser SDK only for start/join, so the teacher's end-call action does not depend on the media CDN being available. Relevant commits: function source `fafbb77b8ab2d46df99a1f0451c20d99682099fb`; supervised client disconnect `6db3e431e4fab5b7f2c2483f3e25f4ac4563581f`; CDN-independent end-call `f1a5466e12e885fd03fb4b7ebdb403e2e3b07b0c`. Follow-up: awaited local media shutdown on teacher disconnect in `12e97d3ad32fb58a4948f5add9c776dd39588e15`.

- Rechecked database access for all 11 public/private tables: RLS is enabled on every listed table; `anon` has no SELECT or INSERT table privileges; private schema USAGE is denied to `anon`; and `public.account_deletion_requests` has no direct client table grants. The no-policy advisor notices on the private usage/attempt tables and account-deletion requests remain intentionally closed; no permissive policies were added.
- Tightened one unused private quota helper: revoked `EXECUTE` from `PUBLIC` and `anon` on `private.consume_ai_teacher_quota_for_eligible_user()`. A follow-up privilege query verified `anon_can_execute=false`, `authenticated_can_execute=true`, and `anon_can_use_private_schema=false`. The function still performs its own authenticated-user and eligibility checks.
- Confirmed Supabase Realtime publication currently includes `classroom_members`, `classrooms`, `homework_assignments`, `homework_submissions` and `student_learning_progress`.
- Current advisors after this review: security still reports Leaked Password Protection disabled and the three RLS-enabled/no-policy informational findings; performance still reports two multiple-permissive SELECT policy notices and five unused-index notices; health has no findings. The performance notices were not changed because merging policies or dropping indexes without usage/context testing could alter behaviour or hurt future query performance.
- Remaining owner/device actions: add the three LiveKit secrets in Supabase Edge Function Secrets (`LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`); confirm the OpenAI key is present in Supabase Function Secrets; enable Leaked Password Protection in Supabase Auth settings if the project plan supports it; then test real teacher/student/guardian accounts on separate devices, actual audio/video, subject TTS playback, AI Teacher request and read-aloud, and account/consent flows. Secrets must never be sent in chat or committed to GitHub.
- Schema note for later review: `public.classrooms` currently contains both `classroom_code` and a legacy-looking `classroom code` column. The frontend uses `classroom_code`; the extra column was not dropped because that would be a destructive schema change requiring a dependency/data check.
- Completion boundary: this audit confirms source, deployed function status, database grants/RLS and Realtime configuration only. It does not prove real Android playback, live calls, cross-device classroom operation, AI responses, or launch readiness. Keep the previous overall percentage as an estimate only until the full end-to-end test pass is complete.


## Follow-up autonomous hardening and live-state verification — 10 November 2026

- Rechecked the active Supabase migration history. The expected classroom, consent, homework, join-rate-limit, account-deletion and AI-quota security migrations are present through the 10 November quota-access hardening migrations.
- Rechecked the live schema. All listed public/private app tables have RLS enabled. Current row counts: 2 classrooms, 1 teacher profile, 1 active guardian relationship, 0 classroom memberships, 3 student progress rows, 1 homework assignment, 0 homework submissions, 2 guardian-consent-code rows, 0 AI usage rows, 0 classroom join-attempt rows and 0 account-deletion requests. Row counts alone do not prove a complete authenticated workflow; the source/origin of test rows should be confirmed during the owner-led test.
- Rechecked the Security Advisor: three informational RLS-enabled/no-policy notices remain on the private AI usage table, private classroom join-attempt table and account-deletion request table. These remain intentionally closed to direct client access; no broad policies were added. The Leaked Password Protection warning remains and is plan-gated.
- Rechecked the Performance Advisor: five unused-index notices and two multiple-permissive SELECT-policy notices remain. No indexes or policies were removed or merged because doing so without workload and role-semantics testing could reduce performance or change access behaviour. Health Advisor has no findings.
- Updated the classroom call-token function to require `wss://` for the LiveKit browser endpoint and removed its insecure `ws://` fallback. The change is committed in GitHub and deployed to Supabase as `classroom-call-token` version 5, ACTIVE, with JWT verification enabled. Both the repository source and deployed function were re-fetched to verify the guard.
- Rechecked `account-deletion-request`: ACTIVE version 4, JWT verification enabled. It remains request-only and never automatically deletes Auth users or child data. The workflow document now reflects version 4.
- Rechecked `ai-teacher`: ACTIVE version 4 with JWT verification enabled. Live AI answer, secret presence and Android speech tests still require the owner.
- No classroom/student/guardian data, RLS policies, grants or indexes were changed during this follow-up. The only live deployment change was the WSS-only classroom-call endpoint hardening.

Remaining owner/device actions are unchanged: confirm LiveKit and OpenAI secrets in Supabase Function Secrets without sharing them; run separate-account classroom, consent, progress and homework tests across devices; test AI Teacher with an authenticated account and a rejected unauthorised account; test Android audio/video and text-to-speech; and obtain territory-specific privacy/legal review before launch.


## Classroom media privacy default — 10 November 2026

- Updated `classroom-call.html` so joining an audio/video room does not automatically activate the participant's microphone or camera. Both start OFF; the user must deliberately tap the corresponding control to publish media.
- Updated the initial button labels and on-page explanation to make the opt-in behaviour clear. Guardian observer mode remains unable to publish media.
- Re-fetched the committed page and verified the automatic `setMicrophoneEnabled(true)` and `setCameraEnabled(true)` calls are absent while the explicit user-triggered toggle handlers remain.
- This is source-level verification only. The owner still needs to test microphone/camera prompts and the opt-in controls on Android with adult-controlled accounts.


## Autonomous repository, application and security audit — 10 November 2026

### Repository-wide findings
- Audited the complete default-branch Git tree: 195 tracked files (56 HTML, 99 SVG, 7 JavaScript, 12 SQL, 3 TypeScript and 18 Markdown).
- Compared every tracked Git blob SHA: no exact duplicate files exist. No files were deleted. Several similarly named pages are intentionally different (local-only demos versus Supabase-connected pages, or legacy redirect wrappers); deleting them would break their stated purpose or old links.
- Checked local `href` and `src` file references across all 56 HTML pages against the complete repository tree: zero missing local targets found.
- Reviewed the main home, classroom, AI Teacher, dashboard, progress and subject-page routes. No hardcoded Supabase service-role key or OpenAI secret value was found in browser source. The public publishable key remains in the shared browser configuration as intended; server secrets are referenced only through server-side environment variables.
- Reviewed dynamic HTML insertion in connected dashboards and the legacy classroom demonstration. User-provided dashboard fields are escaped before HTML insertion; the legacy demo also escapes stored message text. The legacy classroom page remains explicitly labelled as local-only and not a real moderated classroom.

### Repairs made
- Fixed the AI Teacher frontend request to include the Supabase publishable `apikey` header alongside the signed-in user's bearer token. The function endpoint remains the deployed Supabase `ai-teacher` function, ACTIVE version 4 with JWT verification. This corrects a missing gateway request header; a successful authenticated AI answer still needs a real-account test.
- Found and reviewed a guardian-consent enforcement gap. The teacher UPDATE policy requires `parent_consent_status='approved'` before membership can be approved. Authenticated clients have UPDATE privilege on `membership_status` only—not `parent_consent_status`; the guardian-consent SECURITY DEFINER RPC sets the consent column only after validating the one-time code and active relationship. A direct RLS subquery against `guardian_relationships` was not retained because that table intentionally hides link rows from teachers; it would block legitimate teacher approvals.
- Added an independent server-side check in `classroom-call-token`: a student must have both approved classroom membership and a currently active guardian relationship before a call token can be issued.
- Deployed `classroom-call-token` as ACTIVE version 6 with JWT verification enabled. It also retains WSS-only LiveKit endpoint validation and the guardian observer's no-publish permissions.
- The classroom browser page continues to start microphone and camera OFF; participants must deliberately opt in.

### Verification
- Supabase confirms the updated classroom-membership UPDATE policy includes the active guardian relationship check.
- Supabase confirms all 11 listed public/private application tables have RLS enabled. No direct anon table privileges were found. Private usage, join-attempt and account-deletion records have no direct authenticated table privileges.
- Security Advisor: three informational RLS-enabled/no-policy notices remain on intentionally closed tables; Leaked Password Protection remains disabled and plan-gated. No database access was opened to silence these notices.
- The latest GitHub Pages workflow for commit `4bca9d69c03090727974d5a9538e385a2c9d17e7` completed successfully.
- No student, guardian, classroom, progress, homework or account-deletion records were modified. The only database change in this audit was the targeted RLS policy hardening migration `20261110_require_active_guardian_for_classroom_approval`.

### Still requires owner/device testing
- Real teacher/student/guardian accounts: join request, guardian consent, teacher approval and consent revocation.
- Cross-device progress and complete homework assignment, submission, marking and guardian view.
- Authenticated AI Teacher response and unauthorised-account rejection.
- LiveKit secret configuration and supervised audio/video tests, including Android permissions and unexpected teacher disconnect.
- Android speech recognition, selected-language speech playback, Stop Voice and offline/slow-network behaviour.
- Territory-specific child-privacy/legal review, actual publisher/support details, retention schedule and approved deletion process.

This audit does not certify the application as 100% complete or launch-ready. Source, policy and deployment checks are not substitutes for the remaining real-account and device tests.


## Full inline JavaScript syntax sweep and repairs — 10 November 2026

- Extracted and syntax-checked inline JavaScript from all 56 HTML pages using the JavaScript parser. Four previously unnoticed syntax defects were found and repaired:
  1. `advanced-learning.html`: literal backslash-n sequences between Urdu, Bengali and Hindi phrase-table entries were invalid JavaScript. Replaced them with real line breaks. The page's inline scripts now parse.
  2. `gm-3d-learning-world.html`: apostrophes in the Moon/planet description terminated a single-quoted JavaScript string. Changed the description to a correctly quoted double-quoted string. The page's inline script now parses.
  3. `international-classrooms.html`: removed a stray literal `\n` before the refresh event handler. The page's inline scripts now parse.
  4. `vocabulary.html`: removed two stray literal `\n` sequences before the alphabet table and ABC renderer. The page's inline scripts now parse.
- Re-ran the syntax check on each repaired page; all inline scripts passed. The complete 56-page sweep now has no inline JavaScript syntax errors.
- Checked the seven standalone JavaScript files. Six parsed directly; the Cloudflare Worker parsed after accounting for its expected ES-module `export default` declaration. The three deployed Supabase TypeScript Edge Functions are ACTIVE; the current classroom function was redeployed successfully as version 6.
- These checks establish source syntax only, not runtime behaviour in Android browsers or external CDN availability.


## Duplicate-index cleanup — 10 November 2026

- Database index audit found two equivalent partial unique indexes on `public.classrooms`: both enforced case-insensitive, whitespace-trimmed uniqueness of nonblank `classroom_code` values. Neither backed a table constraint, and both had zero observed scans.
- Retained `classrooms_classroom_code_unique` and removed the redundant `classrooms_classroom_code_normalized_uidx` through migration `20261110_drop_duplicate_classroom_code_index`.
- Updated `supabase/international-classrooms.sql` so the setup script no longer recreates the redundant index.
- Re-ran a structural duplicate-index query across valid public indexes: no duplicate index definitions remain.
- No classroom records or classroom codes were modified. The retained unique index continues enforcing normalized classroom-code uniqueness.


## Teacher dashboard RLS visibility repair — 10 November 2026

- Further review found teacher-side homework-submission and student-progress policies joining `guardian_relationships`. That table intentionally allows direct SELECT only to the linked student and guardian, so an unrelated approved teacher would not see those link rows inside a policy subquery.
- Updated teacher-only branches of homework submission SELECT/UPDATE and student progress SELECT to rely on the student's approved classroom membership and protected `parent_consent_status='approved'`, together with approved teacher profile and classroom ownership.
- Preserved direct guardian-link checks for student/guardian operations (student progress inserts, homework submissions and guardian reads). Teacher branches no longer need to read private guardian identities.
- Verified authenticated users can update `classroom_members.membership_status` but cannot update `parent_consent_status`, `user_id` or other identity fields. Consent status is controlled by the guardian-consent SECURITY DEFINER RPC; the call-token function also independently verifies an active guardian link before issuing student tokens.
- Migration `20261110_fix_teacher_rls_guardian_visibility` applied successfully. Updated `supabase/classroom-homework.sql` to match the final teacher policies. The student-progress setup script already uses the protected consent status for its teacher read policy.
- No classroom, guardian, homework or progress rows were changed. Real teacher/student/guardian tests remain necessary to confirm the complete workflow.

## Android subject read-aloud hardening — 10 November 2026

- Updated the shared read-aloud controls embedded in `math.html`, `science.html`, `history.html`, `geography.html` and `social-studies.html`.
- Read-aloud now waits for Android/browser speech voices to become available before speaking, prefers the page language and then an available English voice, resumes the speech engine, and reports a clear timeout/error message when no voice is available.
- Stop Voice now invalidates the pending speech request and clears its watchdog so a delayed voice event cannot restart playback after the user has stopped it.
- This is a source-level improvement only. The owner still needs to verify actual sound and language selection on the Android device with installed voice data.
- Latest source commits: d091810594f27096bf551a1d2718a58748c91160, c6e33e17cdf048f540d10e7eec45f14931d4bd1a, 74a7007f19e3541f6def95f9b6888353decc8d7c, 4b0cbab5ad4b7139be24e5e5ba0ea9a1a5bd35c1, 6e730bc3954e6506224eab3e6414212a03f8a1f1.
