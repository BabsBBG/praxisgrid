import { describe, expect, it } from "vitest";
import {
  approvedSourceGroundedQuestions,
  approvedSourceGroundingDuplicateIssues,
  generationRuns,
  sourceChunks,
  sourceDocs,
  sourceGroundingSummary,
  sourceQuestionCandidates,
  validateSourceGroundedQuestion
} from "./sourceGrounding";

describe("source-grounded question pipeline", () => {
  it("serves only approved questions with source chunks", () => {
    const chunks = new Set(sourceChunks.map((chunk) => chunk.id));
    const approved = approvedSourceGroundedQuestions();

    expect(sourceDocs.length).toBeGreaterThan(0);
    expect(approved.length).toBeGreaterThan(0);
    expect(approved.every((question) => question.reviewStatus === "approved")).toBe(true);
    expect(approved.every((question) => chunks.has(question.sourceChunkId))).toBe(true);
    expect(approved.every((question) => question.sourceUrl.startsWith("https://learn.microsoft.com/"))).toBe(true);
    expect(approved.every((question) => Boolean(question.approvedAt))).toBe(true);
    expect(approved.every((question) => validateSourceGroundedQuestion(question).ok)).toBe(true);
    expect(sourceChunks.every((chunk) => chunk.embeddingHash.length > 0)).toBe(true);
    expect(sourceQuestionCandidates.every((question) => question.criticNotes.length > 0)).toBe(true);
  });

  it("keeps duplicate keys unique before approval", () => {
    const approvedKeys = approvedSourceGroundedQuestions().map((question) => question.duplicateKey);
    expect(new Set(approvedKeys).size).toBe(approvedKeys.length);
    expect(approvedSourceGroundingDuplicateIssues().duplicateKeys).toHaveLength(0);
    expect(approvedSourceGroundingDuplicateIssues().fingerprints).toHaveLength(0);
  });

  it("blocks draft candidates from the served pool", () => {
    const servedIds = new Set(approvedSourceGroundedQuestions().map((question) => question.id));
    const draftIds = sourceQuestionCandidates.filter((question) => question.reviewStatus !== "approved").map((question) => question.id);
    for (const id of draftIds) expect(servedIds.has(id)).toBe(false);
  });

  it("tracks batch generation controls", () => {
    expect(generationRuns.length).toBeGreaterThan(0);
    expect(generationRuns.every((run) => run.budgetCapCents >= run.spentEstimateCents)).toBe(true);
    expect(generationRuns.every((run) => Array.isArray(run.failureLog))).toBe(true);
    expect(generationRuns.every((run) => run.adminOnly)).toBe(true);
    expect(generationRuns.every((run) => run.batchQuestionLimit >= 0)).toBe(true);
    expect(generationRuns.some((run) => run.killSwitchEnabled && run.status === "blocked")).toBe(true);
  });

  it("requires why-wrong coverage for every approved distractor", () => {
    for (const question of approvedSourceGroundedQuestions()) {
      for (const option of question.options) {
        if (option.id !== question.answer) {
          expect(question.whyWrong[option.id]?.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("summarizes pipeline readiness without counting drafts as approved", () => {
    const summary = sourceGroundingSummary();

    expect(summary.docs).toBe(sourceDocs.length);
    expect(summary.chunks).toBe(sourceChunks.length);
    expect(summary.approved).toBe(approvedSourceGroundedQuestions().length);
    expect(summary.drafts).toBeGreaterThan(0);
    expect(summary.blockedRuns).toBeGreaterThan(0);
  });

  it("rejects approved records that are missing trust-contract fields", () => {
    const valid = approvedSourceGroundedQuestions()[0];

    expect(validateSourceGroundedQuestion({ ...valid, duplicateKey: "" }).errors).toContain("missing-duplicate-key");
    expect(validateSourceGroundedQuestion({ ...valid, criticNotes: [] }).errors).toContain("missing-critic-notes");
    expect(validateSourceGroundedQuestion({ ...valid, sourceUrl: "https://learn.microsoft.com/bad-mismatch" }).errors).toContain("source-url-chunk-mismatch");
  });

  it("refuses to serve duplicate approved records", () => {
    const valid = approvedSourceGroundedQuestions()[0];
    const duplicate = { ...valid, id: "duplicate-approved-record" };

    expect(approvedSourceGroundingDuplicateIssues([valid, duplicate]).fingerprints).toHaveLength(1);
    expect(approvedSourceGroundingDuplicateIssues([valid, duplicate]).duplicateKeys).toHaveLength(1);
  });
});
