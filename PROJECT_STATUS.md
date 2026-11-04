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
3. Build and integrate the child-friendly Dictionary, Atlas, Encyclopedia and Guided Research Centre.
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
