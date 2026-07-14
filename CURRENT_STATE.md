# CURRENT_STATE.md

## Current status

The app currently exists as a frontend-first PWA pulled from BabsBBG/azure-quest-pwa.

It has:

- React/Vite/TypeScript frontend.
- Tailwind UI.
- Zustand store.
- localForage local persistence.
- Static question bank.
- Static job readiness content.
- Practice/exam flow.
- Readiness concepts.
- History concepts.
- PWA setup.
- Supabase Auth account foundation.

## What currently works

- `npm install --legacy-peer-deps` passes.
- `npm run build` passes and generates `dist`.
- `npm run lint` passes after adding an ESLint 9 flat config.
- Harness validation passes with `node scripts/validate-harness.mjs`.
- Question bank validation loads 600 seed/demo questions with `node scripts/validate-question-bank.mjs`.
- Route smoke list script runs with `node scripts/check-routes.mjs`.
- Vercel deployment config exists with Vite framework, `dist` output, and SPA rewrite to `index.html`.
- Exam landing screens visibly label the question bank as demo/seed content before quiz and mock exam start buttons.
- The practice arena and answer review show the demo/seed warning or Microsoft non-affiliation disclaimer.
- Global layout footer shows the Microsoft non-affiliation disclaimer.
- Local browser verification passed on `http://localhost:5174/` for the home route, `cert/sc-300/knowledge`, and a small `SC-300` arena smoke route.
- Browser verification found no Vite error overlay and no current-page console errors on the verified `localhost:5174` routes.
- Production Vercel deployment is live at `https://azure-quest-pwa.vercel.app`.
- Production deployment ID: `dpl_6cwQJjDeE8QUW9rXyC5KPSqfS6He`.
- M1.6 primary navigation now uses Home, Quiz, Exams, Job Prep, History, Settings, and Account.
- Practice runs persist question flags locally and best-effort sync them to Supabase when signed in.
- Practice runs preserve focus domain, focus tags, quiz ID, exam ID, and seed for retakes.
- History separates Exam attempts, Quiz attempts, and Labs/practice attempts.
- Browser verification passed on production for exam landing, arena flag/Finish Now, and History separation.
- Final production redeploy is READY at `https://azure-quest-pwa.vercel.app`.
- Latest production deployment URL: `https://azure-quest-2or1anssh-tonybabalola-1114s-projects.vercel.app`.
- Subagent harness added with UI/UX Revamp Lead, Senior Software Engineer, and QA and Product Lead roles.
- Initial subagent audit completed and captured in `docs/reports/subagent-audit.md`.
- Mobile navigation labels now match the approved terms exactly.
- Cert landing pages now show the demo/seed question-bank warning.
- Legacy dashboard no longer sends users to stale `/learn`.
- Attempt persistence now awaits local save and surfaces retryable save errors on the results screen instead of failing silently.
- M1.5 professional Azure-blue visual polish now covers shared UI primitives, layout, path selection, cert overview, exam landing, practice arena, readiness, history, study mode, job readiness, legacy dashboard, settings, case files, KQL Gym, scenarios, docs, videos, learn tracker, learning content, and flashcards.
- The M1.5 follow-up audit corrected overly timid visuals with softer Azure borders, system typography, calmer page backgrounds, sharper cards, improved selected states, and low-bandwidth-safe styling.
- The secondary-route follow-up removed old violet/gradient/game-style treatments and brought remaining route surfaces onto `aq-*` cards, metrics, panels, inputs, and Azure badges.
- Playful labels such as Daily Boss, Swipe Cards, Cozy cyber cave, Explain Like I'm 5, and Next bite have been replaced with professional wording.
- Three M1.5 follow-up subagents reviewed UI/UX, senior engineering risk, and QA/product quality; their release-blocking findings were fixed before deployment.
- M1.5 production verification passed on the fresh deployment URL for Job Prep-era job surfaces and Study Mode; the production alias serves the new asset, but an already-open PWA tab may need refresh because of service worker caching.
- M1.6 adds Supabase email/password account foundation using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Account/Profile UI supports logged-out state, sign up, sign in, sign out, profile name update, loading states, and auth errors.
- Logged-out users can still use local demo practice and local attempt history.
- Attempts, readiness, flashcards, and interview practice still write locally first through localForage/Zustand.
- M2 Job Readiness adds all seven tracks, a 30-minute interview simulator, typed answers, coaching reveal, self-score rubric, and interview history.
- M3 Supabase foundation adds `profiles`, `quiz_attempts`, `interview_sessions`, `question_flags`, and owner-only RLS migrations while preserving logged-out fallback.
- M4 public GitHub import adds a Job Prep import panel, public-read-only repo URL validation, README/language import through a Vercel server endpoint, local/server import caps, content-hash caching, draft story generation, review risks, and imported project persistence.
- M5 source-grounding scaffold adds Microsoft Learn source docs, source chunks, approved sample questions, approved-only serving helper, source-grounding validation, and an exam-center preview of approved source-grounded records.
- The app uses a JetBrains Mono / Cascadia Code / Fira Code style monospace font stack.
- The app uses `lucide-react` as the verified open-source icon system.

## What is demo/static

The following remain demo/static until the approved source-grounded pool is broad enough to replace them:

- Question bank.
- Domain coverage.
- Explanations.
- Readiness calculations.

## Question bank status

The current question bank is static demo/seed content.

It is useful for testing:

- quiz flow
- timers
- history
- readiness calculations
- answer review
- UI behavior

It is not yet trusted as a production exam-prep bank because:

- questions are not traceable to Microsoft Learn source chunks
- duplicate/repetitive stems may exist
- explanations may be templated
- domain coverage is not yet verified against active exam blueprints

The UI must visibly label this content as demo/seed practice content until the source-grounded pipeline is implemented.

Required UI copy or equivalent:

"Demo practice bank: These questions are seed content for testing the platform. They are not official Microsoft questions and are not yet source-grounded or fully reviewed."

## What is not yet built

- GitHub OAuth.
- GitHub write access.
- Private repository import.
- Live LLM calls.
- Production-scale Microsoft Learn ingestion.
- Cached embedding generation.
- Full admin review UI.
- Full replacement of the demo/seed question bank with approved source-grounded questions.
- Route-level code splitting for bundle-size reduction.

## Current approved milestone

M5 continuation - M2 through M5 approved by the user on 2026-07-14.

## Current blockers

- The current 600-question bank remains blocked from production trust until a full source-grounded Microsoft Learn pipeline, duplicate checks, and admin review approve enough replacement content.
- The M5 scaffold proves approved-only serving, but production-scale ingestion, embeddings, batch generation, automated critic, and admin review UI still need a backend/admin implementation before launch.
- GitHub import is public-read-only. GitHub OAuth, write scopes, and private repo access remain blocked.
- LLM-backed project stories, embeddings, source ingestion, and generated questions remain blocked until server-side execution, rate limits, content-hash caching, budget caps or kill switches, and failure logging are fully implemented for the live backend path.
- Bundle size warning remains: Vite reports the main JS chunk is larger than 500 kB after minification. This is not a build failure, but future M6 work should consider route-level code splitting.
- First dev-server verification attempt on `127.0.0.1:5173` did not respond and was restarted on `localhost:5174`, where checks passed.
- Automated M1 E2E tests are still missing.
- Duplicate validation remains soft by default and does not fail on duplicates yet.
