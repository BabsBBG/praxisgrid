# ARCHITECTURE.md

## Current architecture

The current app is a frontend-first PWA.

Stack:

- React
- TypeScript
- Vite
- Tailwind
- Zustand
- localForage
- Static JSON data
- PWA support

Current storage:

- localForage for local attempts/progress.
- Static questions from src/data/questions.json.
- Static job readiness data from src/data/jobReadiness.ts.

Current M1.6 backend/account foundation:

- Supabase Auth client for email/password accounts.
- Auth configuration is read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Supabase is not yet used for quiz attempt sync or interview session sync.
- Logged-out/local mode remains supported.

## Hosting

Frontend hosting target:

- Vercel

Build output:

- dist

## Future backend architecture

Backend roadmap:

- Supabase Auth is started in M1.6.
- Supabase Postgres profile table migration is provided as a minimal optional foundation.
- Supabase Row Level Security
- Supabase Storage if needed
- Server-side functions for GitHub import and LLM calls

## Future question pipeline

Production-grade question flow:

1. Ingest official Microsoft Learn / MicrosoftDocs content.
2. Store source documents.
3. Chunk source documents.
4. Embed chunks.
5. Generate scenario-style questions from chunks.
6. Run automated critic.
7. Send to admin review.
8. Approve questions.
9. Serve only approved questions.

No live LLM question generation should happen during user quiz/exam attempts.

## Future GitHub project flow

1. User signs in.
2. User selects public GitHub repo.
3. System imports README and language data.
4. Server-side LLM drafts project story.
5. User reviews/edits.
6. User approves.
7. Approved story feeds interview simulator.

## Local fallback rule

Until Supabase is fully implemented, localForage/Zustand must remain working.

Do not break offline/local attempt history while migrating.
