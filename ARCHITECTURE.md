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

Current backend/account foundation:

- Supabase Auth client for email/password accounts.
- Auth configuration is read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Supabase is used for best-effort local-first sync of profiles, quiz attempts, interview sessions, question flags, and imported projects when configured.
- Logged-out/local mode remains supported.
- Vercel serverless functions are used for public GitHub repository import and draft story creation.

## Hosting

Frontend hosting target:

- Vercel

Build output:

- dist

## Future backend architecture

Backend roadmap:

- Supabase Auth and RLS migrations are started.
- Supabase Storage if needed.
- Production-scale server-side functions for LLM-backed story and question generation remain future work.

## Future question pipeline

Production-grade question flow:

1. Ingest official Microsoft Learn / MicrosoftDocs content.
2. Store source documents.
3. Chunk source documents.
4. Cache embedding hashes for chunks.
5. Generate scenario-style candidates in batch/admin runs.
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
