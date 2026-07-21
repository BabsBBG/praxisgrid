# Question Pipeline

The M5 source-grounded question pipeline is a scaffold until production-scale ingestion and human review are ready.

Production questions must trace to official Microsoft Learn / MicrosoftDocs source chunks and include review and approval status before serving to users.

## Serving Rule

Learner-facing helpers may serve only records that pass the structured source-grounding validator and have `reviewStatus: "approved"`.

Approved records require:

- `sourceChunkId`
- Microsoft Learn source URL
- matching cert/source chunk
- four answer options
- answer option present in the option set
- explanation
- why-wrong explanation for every distractor
- duplicate key
- critic notes
- approval timestamp

## Generation Controls

Batch generation is admin-triggered only and must track:

- budget cap
- estimated spend
- kill switch state
- batch question limit
- max source chunks
- failure log
- source content hash

No live generation may run inside quiz or certification-run attempts.

## Review Controls

Supabase review policies are role-gated through MAIN_ADMIN and CONTENT_REVIEWER. Review status changes are recorded in `question_review_events`.

The current frontend shows a pipeline preview only. It is not a full M6 admin review UI.
