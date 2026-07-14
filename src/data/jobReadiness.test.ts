import { describe, expect, it } from "vitest";
import { interviewQuestions, interviewSessions, jobTracks, projectStories } from "./jobReadiness";
import type { JobTrack } from "../types";

const requiredTracks: JobTrack[] = ["IAM", "Cloud Security", "SOC", "Cloud SOC", "Azure Security", "Detection Engineering", "AI Security"];

describe("job readiness data", () => {
  it("exposes every M2 interview track", () => {
    expect(jobTracks.map((track) => track.id)).toEqual(requiredTracks);
  });

  it("keeps every interview session and question resolvable", () => {
    const questionIds = new Set(interviewQuestions.map((question) => question.id));
    const projectIds = new Set(projectStories.map((project) => project.id));

    for (const session of interviewSessions) {
      expect(requiredTracks).toContain(session.track);
      expect(session.minutes).toBeGreaterThanOrEqual(30);
      expect(session.questionIds.length).toBeGreaterThan(0);
      for (const id of session.questionIds) expect(questionIds.has(id)).toBe(true);
    }

    for (const question of interviewQuestions) {
      expect(question.testing).toBeTruthy();
      expect(question.answerStructure.length).toBeGreaterThan(0);
      expect(question.sayThis).toBeTruthy();
      expect(question.followUps.length).toBeGreaterThan(0);
      expect(question.avoid.length).toBeGreaterThan(0);
      expect(question.scoreRubric.length).toBeGreaterThan(0);
      for (const id of question.bestProjects) expect(projectIds.has(id)).toBe(true);
    }
  });
});
