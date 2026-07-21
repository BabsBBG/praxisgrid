# Question Bank Audit

The current question bank is seed/demo content only.

Known risks:

- Not source-grounded to Microsoft Learn chunks.
- Not reviewed through an admin approval queue.
- May contain repeated stems, repeated patterns, or weak explanations.

Do not present it as official, complete, source-grounded, or production-grade.

## Duplicate Detection

M5.2 adds `npm run validate:duplicates`.

- Seed/demo fingerprints are checked and may warn.
- Approved source-grounded fingerprints fail validation on duplicates.
- Approved source-grounded duplicate keys fail validation on duplicates.

Passing duplicate validation does not make the seed/demo bank production-trusted.
