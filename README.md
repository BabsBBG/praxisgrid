# PraxisGrid PWA

PraxisGrid is a public, free-to-use PWA for source-grounded technical capability, certification practice, and career readiness.

Learn it. Practise it. Prove it.

PraxisGrid is an independent learning platform and is not affiliated with, endorsed by, or sponsored by Microsoft, Amazon Web Services, Google Cloud, or other certification providers.

The current question bank is demo/seed content only. It is not official certification-provider content and is not yet fully source-grounded or reviewed.

## Current highlights

- 600 demo/seed scenario-style questions: 200 per certification.
- SC-300 and SC-500 remain activatable certification paths.
- AZ-500 is preserved as a retiring historical path and recommends SC-500 for new activation.
- Domain Quizzes: 10 questions, 12 minutes, focused topic practice.
- Certification Runs: 50 questions, 100 minutes, simulated assessment structure.
- Career Lab with project storytelling and mock interview guidance.
- Local attempt history, progress scoring, and retake seeds.
- Supabase email/password account foundation for identity/profile state plus role-foundation migration.
- Azure-blue visual system with a developer/security monospace font stack.
- `lucide-react` open-source icon system.

## Run locally

```powershell
npm install --legacy-peer-deps
npm run dev
```

## Build

```powershell
npm run build
```

## Test and validation

```powershell
npm run lint
npm test
node scripts/validate-harness.mjs
node scripts/validate-question-bank.mjs
node scripts/check-routes.mjs
```

## Auth setup

Copy `.env.example` to `.env.local` and set:

```powershell
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

See `AUTH_SETUP.md`.

## Deployment

Vercel is the primary deployment target. Netlify is not the primary path.
