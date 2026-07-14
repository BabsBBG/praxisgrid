import { describe, expect, it } from "vitest";
import { approvedSourceGroundedQuestions, generationRuns, sourceChunks, sourceDocs, sourceQuestionCandidates } from "./sourceGrounding";

describe("source-grounded question pipeline", () => {
  it("serves only approved questions with source chunks", () => {
    const chunks = new Set(sourceChunks.map((chunk) => chunk.id));
    const approved = approvedSourceGroundedQuestions();

    expect(sourceDocs.length).toBeGreaterThan(0);
    expect(approved.length).toBeGreaterThan(0);
    expect(approved.every((question) => question.reviewStatus === "approved")).toBe(true);
    expect(approved.every((question) => chunks.has(question.sourceChunkId))).toBe(true);
    expect(approved.every((question) => question.sourceUrl.startsWith("https://learn.microsoft.com/"))).toBe(true);
    expect(sourceChunks.every((chunk) => chunk.embeddingHash.length > 0)).toBe(true);
    expect(sourceQuestionCandidates.every((question) => question.criticNotes.length > 0)).toBe(true);
  });

  it("keeps duplicate keys unique before approval", () => {
    const approvedKeys = approvedSourceGroundedQuestions().map((question) => question.duplicateKey);
    expect(new Set(approvedKeys).size).toBe(approvedKeys.length);
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
  });
});
