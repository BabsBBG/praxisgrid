import { describe, expect, it } from "vitest";
import { duplicateFingerprints, duplicateValues, normalizeQuestionText, questionFingerprint } from "./questionQuality";
import type { Question } from "../types";

const baseQuestion: Question = {
  id: "q1",
  cert: "SC-300",
  domain: "Identity",
  difficulty: "easy",
  scenarioOrg: "PraxisGrid",
  stem: "Which control should you use for risky sign-ins?",
  diagram: null,
  options: [
    { id: "A", text: "Conditional Access" },
    { id: "B", text: "Storage firewall" },
    { id: "C", text: "Billing alert" },
    { id: "D", text: "DNS zone" }
  ],
  answer: "A",
  explanation: "Conditional Access evaluates sign-in risk.",
  whyWrong: {
    B: "Storage firewalls do not evaluate sign-in risk.",
    C: "Billing alerts do not evaluate sign-in risk.",
    D: "DNS zones do not evaluate sign-in risk."
  },
  tags: ["conditional-access"]
};

describe("question quality helpers", () => {
  it("normalizes question text for duplicate fingerprints", () => {
    expect(normalizeQuestionText("The risky sign-in, with MFA!")).toBe("risky sign mfa");
  });

  it("creates stable fingerprints independent of option order", () => {
    const reordered = { ...baseQuestion, id: "q2", options: [...baseQuestion.options].reverse() };

    expect(questionFingerprint(reordered)).toBe(questionFingerprint(baseQuestion));
  });

  it("finds duplicate fingerprints", () => {
    const duplicate = { ...baseQuestion, id: "q2", stem: "Which control should you use for risky sign ins?" };

    expect(duplicateFingerprints([baseQuestion, duplicate])).toHaveLength(1);
  });

  it("finds duplicate values globally", () => {
    expect(duplicateValues([{ id: "a", key: "Same Key" }, { id: "b", key: "same-key" }], (item) => item.key)).toHaveLength(1);
  });
});
