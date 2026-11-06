# Great Minds AI — Project Status and Product Decisions

Last updated: 2026-11-04
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
