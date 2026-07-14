# TESTING_STRATEGY.md

## Current testing goal

The current priority is M5 continuation stability: auth/data sync fallback, job readiness workflows, public GitHub import helpers, source-grounded approval gates, route integrity, question-bank honesty, and CI quality gates.

## M0 checks

Required commands:

```bash
npm install --legacy-peer-deps
npm run build
```

Manual checks:

- App loads.
- Main routes load.
- SPA refresh does not 404.
- Demo/seed question warning is visible before quizzes/exams.
- Microsoft disclaimer is visible.
- Dark/light toggle visible.
- No broken imports.
- No console-breaking runtime errors on main pages.

## Future automated checks

Current scripts:

- validate-harness.mjs
- validate-question-bank.mjs
- validate-source-grounding.mjs
- check-routes.mjs

Current Vitest coverage:

- score calculation
- unanswered questions count wrong
- demo/seed warning and Microsoft disclaimer render
- auth/account UI renders in logged-out unconfigured mode
- M2 job readiness tracks and interview answer workflow
- M3 cloud sync fallback when Supabase is unconfigured
- M4 GitHub URL parsing and local public import cap
- M5 approved-only source-grounded question serving

Current CI:

- npm install --legacy-peer-deps
- npm run lint
- npm test
- node scripts/validate-harness.mjs
- node scripts/validate-question-bank.mjs
- node scripts/validate-source-grounding.mjs
- node scripts/check-routes.mjs
- npm run build

## Future E2E checks

Test flows:

- Start quiz.
- Complete quiz.
- Finish Now.
- Review answers.
- Save attempt.
- Retake same seed.
- Start mock exam.
- Open Job Prep.
- Start interview session.
- Complete interview session.

Future E2E should also cover real Supabase sign up/sign in/sign out against a test project.
