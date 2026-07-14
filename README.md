# Azure Quest PWA

Azure Quest is a public, free-to-use PWA for SC-300, AZ-500, and SC-500 certification practice plus cloud-security job preparation.

This product is not affiliated with or endorsed by Microsoft.

The current question bank is demo/seed content only. It is not official Microsoft content and is not yet source-grounded or fully reviewed.

## Current highlights

- 600 demo/seed scenario-style questions: 200 per certification.
- SC-300, AZ-500, and SC-500 are all playable in the arena.
- Quiz Sprints: 10 questions, 12 minutes, focused topic drills.
- Mock Exams: 50 questions, 100 minutes, Microsoft-style randomized structure.
- Job Prep with project storytelling and mock interview guidance.
- Local attempt history, readiness, and retake seeds.
- Supabase email/password account foundation for identity/profile state.
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
