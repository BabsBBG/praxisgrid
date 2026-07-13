# TESTING_STRATEGY.md

## Current testing goal

The current priority is build stability and acceptance checks.

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

Add scripts:

- validate-harness.mjs
- validate-question-bank.mjs
- check-routes.mjs

## Future E2E checks

Test flows:

- Start quiz.
- Complete quiz.
- Finish Now.
- Review answers.
- Save attempt.
- Retake same seed.
- Start mock exam.
- Open Job Readiness.
- Start interview session.
- Complete interview session.
