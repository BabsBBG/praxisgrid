# CHANGELOG.md

## Unreleased

- Approved and started M1 exam engine hardening.
- Migrated the app to the connected Vercel account and deployed production at `https://azure-quest-pwa.vercel.app`.
- Updated primary navigation to Exams, Exam Readiness, Job Readiness, History, and Settings.
- Added question flag/report placeholder to the practice arena.
- Preserved focus domain, focus tags, quiz ID, exam ID, and seed in attempt records and retake links.
- Updated History to separate Exam attempts, Quiz attempts, and Labs/practice attempts.
- Added package scripts for harness, question-bank, and route checks.
- Added M0 harness documentation.
- Added Vercel deployment configuration.
- Added demo/seed question-bank warning requirement to product docs.
- Added future cost and abuse control rules.
- Added visible demo/seed question-bank warning to exam landing, quiz/mock start lists, running practice arena, and answer review.
- Added Microsoft non-affiliation disclaimer to practice surfaces and global footer.
- Added ESLint 9 flat config so `npm run lint` works.
- Added harness, question-bank, and route smoke scripts.
- Verified `npm install --legacy-peer-deps`, `npm run build`, and `npm run lint`.
