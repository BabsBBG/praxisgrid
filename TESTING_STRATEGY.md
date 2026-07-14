# TESTING_STRATEGY.md

## Current testing goal

The current priority is M1.6 build stability, auth rendering, route integrity, question-bank honesty, and CI quality gates.

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
- check-routes.mjs

Current Vitest coverage:

- score calculation
- unanswered questions count wrong
- demo/seed warning and Microsoft disclaimer render
- auth/account UI renders in logged-out unconfigured mode

Current CI:

- npm install --legacy-peer-deps
- npm run lint
- npm test
- node scripts/validate-harness.mjs
- node scripts/validate-question-bank.mjs
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
