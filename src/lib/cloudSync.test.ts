import { describe, expect, it } from "vitest";
import { fetchCloudLearningData } from "./cloudSync";

describe("cloudSync", () => {
  it("falls back to empty cloud data when Supabase is not configured", async () => {
    await expect(fetchCloudLearningData()).resolves.toEqual({
      attempts: [],
      interviewSessions: [],
      questionFlags: [],
      importedProjects: []
    });
  });
});
