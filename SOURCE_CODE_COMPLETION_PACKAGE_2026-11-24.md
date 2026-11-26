# Great Minds AI — Source-Code Completion Package
**Prepared:** 24 November 2026  
**Repository:** `romanoosano60-maker/great-minds-ai`  
**Branch:** `main`  
**Purpose:** one source-code map and engineering work package for all learning subjects and shared app systems.

> This is a coordinated source inventory and audit handoff, not a single concatenated HTML file. The app is intentionally modular: each subject page, shared JavaScript helper, Supabase migration and Edge Function should remain separate so fixes can be reviewed and rolled back safely.

## 1. Product baseline — do not disturb
- Preserve the colourful rocket home screen, its compact page navigation and existing subject destinations.
- Preserve existing student, parent and teacher areas and the distinction between local demonstrations and secure cloud records.
- Do not delete pages based only on similar filenames.
- Do not weaken Supabase RLS, consent checks, classroom authorization, JWT verification or microphone/camera opt-in.
- Never put service-role credentials, AI provider keys, LiveKit secrets or passwords in browser files.
- Use fictional test data until privacy and consent approvals are complete.

## 2. Learning-subject source map

| Learning area | Main source page(s) | Shared requirements / review focus |
|---|---|---|
| Mathematics | `math.html`, `math-extra.html` | Lesson explanations, practice, quiz scoring, level challenges, read-aloud, cloud progress |
| English | `english.html`, `english-extra.html` | Alphabet/phonics, vowels, spelling, sentence practice, quiz, speech stop/cleanup |
| Vocabulary and dictionary | `vocabulary.html`, `dictionary.html` | Word meanings, pronunciation, examples, search/filter, language selection |
| Reading and writing | `reading-writing.html`, `english-story-studio.html` | Stories, comprehension, narration, writing drafts and local-storage disclosure |
| Science | `science.html`, `science-extra.html` | Topic lessons, read-aloud, quiz, score/progress reporting |
| Social Studies | `social-studies.html`, `social-extra.html` | Civic/community learning, quiz, language/audio and progress |
| History | `history.html` | Evidence/source learning, quiz and progress |
| Geography / World Atlas | `geography.html` | Continents, countries, flags, capitals, oceans, landmarks, quiz |
| Home Science | `home-science.html` | Safe everyday-life lessons, adult guidance for practical activities, speech and progress |\n| Life Skills & Wellbeing | `life-skills.html` | Feelings, communication, healthy habits, personal/digital safety, responsibility, teamwork and problem-solving |
| Computer Studies | `computer.html`, `computer-extra.html` | Computer basics, typing/coding/robotics, internet safety, quiz and progress |
| General Knowledge | `general-knowledge.html` | Curated age-appropriate facts, quiz and progress |
| Encyclopedia | `encyclopedia.html` | Curated topic search and category filters; no unrestricted child web browsing |
| Guided Research | `guided-research.html` | Curated inquiry topics, safe research prompts, local notes and source checking |
| Additional practice | Subject-specific `*-extra.html` pages and `assets/js/level-challenges.js` | Avoid duplicate lesson routes; consistent score, restart, audio and save behaviour |

The list is a navigation/source map. The presence of a page is not proof that its content, voice, images, score persistence or mobile behaviour has passed owner acceptance.

## 3. Shared frontend and learner systems
- `index.html`: permanent home screen and subject entry points.
- `gm-language.js` and related language assets: shared language selection and translated read-aloud support. Translation coverage is partial; do not imply every lesson or generated answer is translated.
- `student-cloud-progress.js`: validates progress records, uses the signed-in Supabase account and relies on RLS for cloud authorization. Device-local history and cloud progress must remain visibly distinct.
- `assets/js/level-challenges.js`: shared Beginner / Pro / Advanced challenge component.
- `student-profile.html` and connected student/parent/teacher pages: distinguish local demonstration state from authenticated cloud data.
- Homework, certificates, games/rewards, picture library and 3D gallery: preserve existing implementations and verify through the acceptance checklist rather than rebuilding without a demonstrated defect.
- Audio: no autoplay; stop speech/audio when the page is hidden or exited; expose clear Listen/Stop/status controls and keep text available alongside speech.

## 4. Role, classroom and backend source
- `connected-dashboards.html`, `connected-student.html`, `connected-parent.html`, `connected-teacher.html`: role-specific navigation and cloud views. The UI is not the authorization boundary; Supabase RLS is.
- `international-classrooms.html`, `classroom-call.html`, `homework.html`, `secure-network.html`: authenticated classroom workflow, consent, homework and supervised calls.
- `safe-international-classroom-v3.html` and `group-learning.html`: local demonstrations only; never present them as live secure classrooms.
- `student-cloud-homework.js`: authenticated homework operations with database policy enforcement.
- `supabase/functions/ai-teacher/index.ts`: server-side AI Teacher endpoint.
- `supabase/functions/classroom-call-token/index.ts`: authorization-checked LiveKit token issuance.
- `supabase/functions/account-deletion-request/index.ts`: adult request intake for manual review, not automatic account/data deletion.
- `supabase/international-classrooms.sql` and other SQL migrations: database schema, grants, RLS and RPC definitions. Review current live schema before proposing migrations.

## 5. Verified source/backend findings carried into this package
- Supabase functions were last verified as: `ai-teacher` v9 ACTIVE, `classroom-call-token` v9 ACTIVE, `account-deletion-request` v7 ACTIVE; JWT verification enabled.
- AI Teacher v9 includes parsing for Responses API text in both `output_text` and `output[].content[]`, plus a 25-second upstream timeout. A successful authenticated live answer and required secret presence remain unverified.
- Classroom call source keeps camera/microphone off until deliberate opt-in and checks the signed-in role and classroom/guardian eligibility. LiveKit secret presence and separate-device call tests remain unverified.
- Guardian consent uses a one-time high-entropy code, hash storage, expiry, verified guardian email and explicit declaration; individual-child revocation is supported. This is not independent proof of legal guardianship.
- Dashboard snapshot display now distinguishes points totals from quiz scores.
- Progress helper validates score bounds and optional UUID operation IDs. When an operation ID is supplied, duplicate retries are checked against the existing record. Some subject/activity integrations still omit a stable per-attempt operation ID; those attempts are not guaranteed idempotent.
- The source-level audit and package do not change learner records, database policies, schema or secrets.

## 6. Major source engineering gaps — do not conceal
1. **Network separation:** `secure-network.html` explicitly states that Family, Local School and International Network are not yet separate database network types and country-based access boundaries are not implemented/tested in Supabase. This is a real engineering gap. Do not claim cross-country isolation is implemented. A safe solution requires schema design, verified country provenance, RLS policy design, migration review, negative/positive access tests and rollback planning before deployment.
2. **Stable progress IDs:** the shared helper now generates a UUID when a caller omits one and preserves that ID in its authenticated retry queue. Page integrations should still create one UUID per activity attempt and retain it through any user-triggered retry. A new call without the original ID represents a new operation, so repeated completion submissions from older pages are not guaranteed to be idempotent.
3. **Pending local progress:** a bounded identity-bound retry queue is implemented in `student-cloud-progress.js` and deployed to GitHub Pages. It queues only new records tied to a verified account or a cached session awaiting later server verification; it never auto-uploads legacy anonymous history. Retries occur on sign-in, token refresh, network reconnection and explicit sync. The queue is capped at 100 records with a 30-day expiry and stores only score/activity metadata. Seventeen automated tests pass. Real Android, separate-account and live Supabase RLS acceptance tests remain outstanding.
4. **AI runtime:** confirm the server-side provider and publishable-key secret configuration privately in Supabase; test a real authenticated answer and an unauthorized request. Never ask the owner to paste secrets into chat.
5. **Live classroom:** confirm LiveKit configuration and test teacher, student and guardian on separate devices, including observer-only guardian permissions and media cleanup.
6. **Launch safeguards:** leaked-password protection is reported disabled; privacy notice, guardian consent/legal review, data inventory, retention, deletion/export, backup retention, Android acceptance and native Android packaging remain open.

## 7. Subject-by-subject source completion checklist
For each learning page and companion page:
- [ ] Correct subject name and age-appropriate lesson text.
- [ ] Images match the word/concept being taught; no misleading or mismatched picture.
- [ ] All buttons have real actions; keyboard and touch access work.
- [ ] Quiz prevents double-answering, reports score correctly and offers restart.
- [ ] Audio has Listen and Stop, does not autoplay, uses the selected language where available, and stops on page hide/exit.
- [ ] Progress labels distinguish score, points and local-only history.
- [ ] Cloud save reports saved / local-only / failed clearly.
- [ ] Each completed attempt gets one stable UUID reused for retries.
- [ ] Internal links resolve to existing files.
- [ ] Layout works at narrow Android widths and respects reduced-motion settings.
- [ ] Content, translations, accessibility and factual accuracy receive adult review.

## 8. One-pass integration and acceptance order
1. Static source inventory and local-link/JavaScript checks across the repository.
2. Shared helpers first: language/audio, progress, level challenges, homework.
3. Core subjects: Mathematics, English, Science.
4. Remaining subjects: Social Studies, History, Geography, Home Science, Computer Studies, General Knowledge.
5. Literacy/discovery: Vocabulary, Dictionary, Reading & Writing, Story Studio, Encyclopedia, Guided Research.
6. Student profile, rewards/certificates, parent and teacher cloud dashboards.
7. Classroom, guardian consent, homework, network separation and supervised calls.
8. AI Teacher and server configuration.
9. Android navigation/audio/media/data-flow acceptance.
10. Privacy/legal and publication approval.

## 9. Definition of done
A source item is complete only when the changed file is committed, fetched back from GitHub, and the relevant static checks pass. A live feature is complete only after the relevant authenticated browser/device test passes. A release is complete only after owner acceptance, privacy/legal review and publishing checks. Keep these statuses separate in all progress reports.

**Current decision:** this package consolidates the source architecture and records the known gaps. It is not a claim that all subject code has been rewritten or that the application is launch-ready. Continue safe, isolated source fixes in small commits; do not perform speculative broad rewrites or security migrations.


## Update — 24 November 2026: Discovery & Creativity Centre

Added `discovery-creativity.html` and linked it from the home dashboard's Complete Educational Subjects page. The centre contains eight child-friendly stations: Young Inventors Lab, Space Explorer, Animal Kingdom, Creative Art Studio, Young Entrepreneurs, World Explorer, Science Experiment Centre, and Puzzle & Logic Centre. Interactive browser activities include idea prompts, factual questions, a pretend-coin arithmetic challenge, a pattern puzzle, and a supervised shadow-observation guide. The page does not request or submit personal information and does not claim cloud progress tracking. Source-level checks confirmed eight station cards, unique activity element IDs, the home-page link, and the expected interaction functions. **Still required:** open the GitHub Pages deployment on an Android device and test the link, layout, buttons, and activity feedback. This addition does not close the separate security, cloud-sync, AI Teacher, classroom-call, privacy/legal, or release-readiness items listed above.


## Update — 24 November 2026: Life Skills & Wellbeing

Added `life-skills.html` and linked it from the home dashboard immediately after Discovery & Creativity Centre. The new subject covers eight areas: Understanding Feelings, Kind Communication, Healthy Daily Habits, Personal Safety, Digital Safety, Responsibility & Routines, Teamwork & Friendship, and Calm Problem-Solving. It includes an eight-question interactive quiz and adult-guidance prompts. It does not request personal information or claim cloud progress tracking. GitHub accepted the page commit `3c35ec0bc7aa5bf1499ca43ff84768f188c87d5d` and the home-page link commit `6fa94d9d7fc751b89922f0a91603f083c3a6539c`. **Not yet independently re-fetched or tested in GitHub Pages/Android during this pass.** The source map should include Life Skills alongside Home Science. Remaining acceptance checks are the link, responsive layout, quiz feedback/restart and child-safe wording on an Android device.


## Automated repository audit and deployment — 24 November 2026

**Verified latest main commit:** `0783b5226c7d9a8040d1a5cfc0a268aacaecbdc9`.

GitHub Actions run results for that exact commit:
- Static repository checks run [45393641709](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45393641709): completed successfully.
- Static audit log: scanned **63 HTML files** and **10 standalone JavaScript files**, checked **619 local `href`/`src` references**, and reported PASS with no missing local references and no JavaScript syntax failures.
- GitHub Pages build/deployment run [45393642325](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45393642325): build, artifact upload and deploy jobs all completed successfully.

**What this establishes:** the latest repository revision passed the repository's configured local-reference and standalone-JavaScript syntax checks, and the GitHub Pages deployment workflow completed successfully for that revision.

**What this does not establish:** every interactive control works in a browser, every HTML inline script has been runtime-tested, Supabase policies pass positive/negative account tests, AI Teacher returns an authenticated answer, LiveKit calls work on separate devices, Android microphone/camera/audio work, or legal/privacy approval has been obtained. The audit script does not perform HTML validation, accessibility testing, external image/CDN checks, SQL migration execution, or browser end-to-end tests.

The new Discovery & Creativity and Life Skills pages are included in the repository revision covered by this automated audit. Their source links and local references passed the audit; their interactive behaviour still needs Android acceptance.


## Extended inline-script audit and source corrections — 24 November 2026

The static audit was extended to parse executable inline JavaScript in HTML pages as well as standalone `.js` files. On commit `6dbe648b3d10b035c8b120942e8c8d98fb0716c2`, GitHub Actions run [45394883512](https://github.com/romanoosano60-maker/great-minds-ai/actions/runs/45394883512) passed:
- 63 HTML files scanned.
- 10 standalone JavaScript files parsed.
- 132 executable inline script blocks parsed.
- 619 local `href`/`src` references checked.
- No missing local references or JavaScript syntax failures.

The stricter pass exposed and source corrections were committed for:
- `connected-parent.html`: replaced the parent progress-list HTML-string rendering with DOM nodes and `textContent`, avoiding HTML interpretation of record values.
- `connected-practice.html`: corrected a missing statement separator after the answer-handler assignment.
- `english.html`: closed the English additional-practice initialization IIFE.

These are source corrections. They do not replace browser/device interaction tests or Supabase authorization tests.

## Safe architecture design prepared — 24 November 2026

Added [SAFE_CLOUD_SYNC_AND_NETWORK_SEPARATION_DESIGN_2026-11-24.md](SAFE_CLOUD_SYNC_AND_NETWORK_SEPARATION_DESIGN_2026-11-24.md). It records the current device-local versus immediate cloud-save behaviour, explains why anonymous legacy local progress must not be automatically uploaded, specifies identity-bound idempotent deferred-sync acceptance tests, separates Family relationships from Local/International classroom types, and lays out a reviewed migration/RLS test sequence. **No network schema migration or automatic upload process was deployed.**
