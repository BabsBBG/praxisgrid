# ACCEPTANCE_CRITERIA.md

## Global completion rule

A milestone is not complete unless:

- Required commands pass.
- CURRENT_STATE.md is updated.
- KNOWN_FAILURES.md is updated.
- Known blockers are documented.
- No future milestone work is mixed into the current milestone without approval.

## M0 - Vercel migration + harness reset

M0 is complete only if:

- AGENTS.md exists.
- PRODUCT_SPEC.md exists.
- ARCHITECTURE.md exists.
- SECURITY.md exists.
- ACCEPTANCE_CRITERIA.md exists.
- CURRENT_STATE.md exists.
- KNOWN_BLOCKERS.md exists.
- KNOWN_FAILURES.md exists.
- IMPLEMENTATION_PLAN.md exists.
- TESTING_STRATEGY.md exists.
- VERCEL_DEPLOYMENT.md exists.
- vercel.json exists.
- .npmrc is clean.
- .nvmrc uses Node 20.
- npm install --legacy-peer-deps passes.
- npm run build passes.
- dist is generated.
- SPA refresh routes do not 404.
- The current question bank is visibly labelled as demo/seed content.
- Microsoft non-affiliation disclaimer is visible on relevant pages.

## M0/M1 blocking question-bank criterion

The app must visibly label current quizzes/exams as demo/seed practice content until the approved source-grounded question pipeline exists.

The label must appear:

- Before starting a quiz.
- Before starting a mock exam.
- On practice/exam landing screens.
- Near the general disclaimer.

Completion is blocked if the current static question bank appears to users as official, complete, source-grounded, or production-grade.

Required copy or equivalent:

"Demo practice bank: These questions are seed content for testing the platform. They are not official Microsoft questions and are not yet source-grounded or fully reviewed."

## M1 - Exam engine hardening

M1 is complete only if:

- Learn/Docs/Videos are removed from active navigation.
- Main navigation uses Exams, Exam Readiness, Job Readiness, History, Settings.
- Answers are hidden until quiz/exam completion.
- Timer counts down.
- Finish Now works.
- Unanswered questions count as incorrect.
- Attempt history saves.
- History separates quizzes and exams.
- Retake same seed works.
- New randomized attempt works.
- Domain heatmap updates after completion.
- Static duplicate-check script exists.
- Question flag/report UI placeholder exists.
- Demo/seed question-bank warning remains visible.

## M2 - Job readiness engine

M2 is complete only if:

- Track selector exists.
- Project selector exists.
- 30-minute mock interview session can be started.
- Supported tracks include IAM, Cloud Security, SOC, Cloud SOC, Azure Security, Detection Engineering, AI Security.
- Session shows realistic interview questions.
- User can answer textually.
- After answer, app shows what the question tests, strong answer structure, what to say, follow-up traps, mistakes to avoid, and project reference where applicable.
- Self-score rubric appears.
- Interview session can be completed.
- Interview history is saved locally or documented as pending backend.

## M3 - Supabase foundation

M3 is complete only if Supabase auth, profiles, quiz attempts, interview sessions, question flags, and RLS are implemented while preserving local fallback.

## M4 - GitHub project import

M4 is complete only if GitHub import uses minimal permissions, no write scopes, manual repo selection, README/language import, rate limits, content-hash caching, server-side story generation, and draft review/approval.

## M5 - Source-grounded question pipeline

M5 is complete only if Microsoft Learn / MicrosoftDocs ingestion, source docs, source chunks, cached embeddings, batch generation, automated critic, admin review, duplicate detection, and approved-only serving exist.

## M4/M5 cost-control blocking criterion

GitHub import, project story generation, Microsoft Learn ingestion, embeddings, and question generation are blocked unless rate limits, content-hash caching, and server-side-only LLM execution are implemented.

No LLM-backed feature may be considered complete without:

- rate limiting
- caching
- server-side secret handling
- budget cap or kill switch
- failure logging
