# PRODUCT_SPEC.md - PraxisGrid

## Product summary

PraxisGrid is a public, free-to-use certification practice and career-readiness platform for technical learners.

Tagline: Learn it. Practise it. Prove it.

It helps users:

1. Practise SC-300 and SC-500-style questions, while preserving AZ-500 as a retiring historical path.
2. Track certification progress.
3. Review past attempts.
4. Convert GitHub security projects into interview-ready stories.
5. Practise IAM, cloud security, SOC, cloud SOC, Azure security, detection engineering, and AI security interviews.
6. Create an individual account for identity/profile state while local demo practice remains available.

## Product positioning

PraxisGrid is not an exam dump site.

It is a source-grounded learning and interview-preparation platform.

The product is an independent learning platform and is not affiliated with, endorsed by, or sponsored by Microsoft, Amazon Web Services, Google Cloud, or other certification providers.

## Certification practice engine

The certification practice engine should support:

- Domain quizzes.
- Certification runs.
- Timers.
- Finish Now.
- Hidden answers until completion.
- Review mode after completion.
- Domain breakdown.
- Domain heatmap.
- Past attempt history.
- Retake same seed.
- New randomized attempt.
- Question flagging.
- Demo/seed label until source-grounded questions exist.

## Accounts

- Supabase Auth email/password sign up.
- Supabase Auth email/password sign in.
- Sign out.
- Account/Profile page.
- Logged-out local demo practice remains available.
- Local-first sync for quiz attempts, interview sessions, question flags, and imported projects when Supabase is configured and the user is signed in.

## Career Lab engine

The Career Lab engine should support:

- Track selector.
- Project selector.
- Project-to-interview mapper.
- 30-second pitch.
- 2-minute walkthrough.
- STAR story.
- Architecture walkthrough.
- Resume bullets.
- Follow-up traps.
- Mistakes to avoid.
- Mock interview sessions.
- Self-score rubric.
- Interview history.
- Public GitHub project import for README/language-based draft stories.
- Draft review/approval state for imported project stories.

Tracks:

- IAM
- Cloud Security
- SOC
- Cloud SOC
- Azure Security
- Detection Engineering
- AI Security

## Non-goals for v1

- No payments.
- No native mobile app.
- No live proctored exam simulation.
- No community-submitted questions.
- No voice/audio grading.
- No claim of certification-provider affiliation.
- No exam dumps.

## Visual and icon system

PraxisGrid uses a professional Azure-blue visual direction with deep navy, white, light blue-tinted surfaces, blue-grey borders, and neutral grey text.

Typography uses a developer/security monospace stack led by JetBrains Mono / Cascadia Code / Fira Code fallbacks.

The icon system is `lucide-react`, a verified open-source React icon package with ISC license metadata in the installed package.
