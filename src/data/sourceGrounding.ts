import type { GenerationRun, SourceChunk, SourceDoc, SourceGroundedQuestion } from "../types";

export const sourceDocs: SourceDoc[] = [
  {
    id: "mslearn-sc300-study-guide",
    cert: "SC-300",
    title: "Study guide for Exam SC-300: Microsoft Identity and Access Administrator",
    sourceUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300",
    contentHash: "sc300-study-guide-2026-04",
    ingestedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "mslearn-az500-study-guide",
    cert: "AZ-500",
    title: "Study guide for Exam AZ-500: Microsoft Azure Security Technologies",
    sourceUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-500",
    contentHash: "az500-study-guide-2025-12",
    ingestedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "mslearn-sc500-study-guide",
    cert: "SC-500",
    title: "Study guide for Exam SC-500: Implementing End-to-End Security by Using Microsoft 365 Defender and Microsoft Sentinel",
    sourceUrl: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-500",
    contentHash: "sc500-study-guide-2026-05",
    ingestedAt: "2026-07-14T00:00:00.000Z"
  }
];

export const sourceChunks: SourceChunk[] = [
  {
    id: "chunk-sc300-auth-access",
    docId: "mslearn-sc300-study-guide",
    cert: "SC-300",
    domain: "Implement authentication and access management",
    sourceUrl: sourceDocs[0].sourceUrl,
    contentHash: "chunk-sc300-auth-access-v1",
    embeddingHash: "embed-sc300-auth-access-v1",
    summary: "SC-300 preparation includes authentication and access management capabilities such as conditional access, MFA, and access controls."
  },
  {
    id: "chunk-az500-defender-sentinel",
    docId: "mslearn-az500-study-guide",
    cert: "AZ-500",
    domain: "Secure Azure using Microsoft Defender for Cloud and Microsoft Sentinel",
    sourceUrl: sourceDocs[1].sourceUrl,
    contentHash: "chunk-az500-defender-sentinel-v1",
    embeddingHash: "embed-az500-defender-sentinel-v1",
    summary: "AZ-500 preparation includes securing Azure with Microsoft Defender for Cloud and Microsoft Sentinel."
  },
  {
    id: "chunk-sc500-end-to-end",
    docId: "mslearn-sc500-study-guide",
    cert: "SC-500",
    domain: "Implement end-to-end Microsoft security",
    sourceUrl: sourceDocs[2].sourceUrl,
    contentHash: "chunk-sc500-end-to-end-v1",
    embeddingHash: "embed-sc500-end-to-end-v1",
    summary: "SC-500 preparation expects practical administration experience across Azure, hybrid environments, identity, Microsoft 365, and security operations."
  }
];

export const generationRuns: GenerationRun[] = [
  {
    id: "run-2026-07-14-source-sample",
    status: "completed",
    budgetCapCents: 0,
    spentEstimateCents: 0,
    killSwitchEnabled: false,
    batchQuestionLimit: 12,
    maxSourceChunks: 3,
    adminOnly: true,
    sourceHash: "m5-source-sample-v1",
    failureLog: [],
    createdAt: "2026-07-14T00:00:00.000Z",
    completedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "run-2026-07-21-kill-switch-example",
    status: "blocked",
    budgetCapCents: 500,
    spentEstimateCents: 0,
    killSwitchEnabled: true,
    batchQuestionLimit: 0,
    maxSourceChunks: 0,
    adminOnly: true,
    sourceHash: "m5-source-blocked-example-v1",
    failureLog: ["Generation disabled by admin kill switch."],
    createdAt: "2026-07-21T00:00:00.000Z"
  }
];

export const sourceQuestionCandidates: SourceGroundedQuestion[] = [
  {
    id: "sg-sc300-conditional-access-001",
    runId: "run-2026-07-14-source-sample",
    cert: "SC-300",
    domain: "Implement authentication and access management",
    difficulty: "medium",
    stem: "A tenant needs to reduce risky sign-ins without blocking all external collaboration. Which control should be evaluated first?",
    options: [
      { id: "A", text: "A Conditional Access policy targeted at sign-in risk and protected apps" },
      { id: "B", text: "A global password expiration policy for every user" },
      { id: "C", text: "A storage account firewall rule" },
      { id: "D", text: "A Microsoft Sentinel analytic rule only" }
    ],
    answer: "A",
    explanation: "Conditional Access is the identity control that can evaluate sign-in risk, user/app scope, and grant controls without disabling collaboration entirely.",
    whyWrong: {
      B: "Password expiration does not evaluate risk context and can create user friction.",
      C: "Storage firewalling does not control Entra sign-in behavior.",
      D: "Sentinel can detect and respond, but it is not the primary access control for sign-in risk."
    },
    tags: ["conditional-access", "mfa", "risk"],
    sourceChunkId: "chunk-sc300-auth-access",
    sourceUrl: sourceDocs[0].sourceUrl,
    duplicateKey: "conditional-access-risk-external-collaboration",
    reviewStatus: "approved",
    criticNotes: ["Source chunk present.", "Single best answer is defensible.", "Distractors map to distinct misconceptions."],
    approvedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "sg-az500-defender-sentinel-001",
    runId: "run-2026-07-14-source-sample",
    cert: "AZ-500",
    domain: "Secure Azure using Microsoft Defender for Cloud and Microsoft Sentinel",
    difficulty: "medium",
    stem: "A security engineer wants posture recommendations and workload protection signals before building Sentinel detections. Which service should they review first?",
    options: [
      { id: "A", text: "Microsoft Defender for Cloud" },
      { id: "B", text: "Azure Cost Management" },
      { id: "C", text: "Azure Blueprints" },
      { id: "D", text: "Microsoft Purview eDiscovery" }
    ],
    answer: "A",
    explanation: "Defender for Cloud provides posture management and workload protection context that can inform detection priorities.",
    whyWrong: {
      B: "Cost Management focuses on billing and spend, not posture or workload protection signals.",
      C: "Blueprints can help governance patterns, but it is not the posture and workload protection service.",
      D: "Purview eDiscovery is for discovery workflows, not Azure workload posture."
    },
    tags: ["defender-for-cloud", "sentinel", "posture"],
    sourceChunkId: "chunk-az500-defender-sentinel",
    sourceUrl: sourceDocs[1].sourceUrl,
    duplicateKey: "defender-cloud-posture-before-sentinel",
    reviewStatus: "approved",
    criticNotes: ["Source chunk present.", "Question maps to AZ-500 Defender for Cloud and Sentinel scope.", "No official-question wording claimed."],
    approvedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "sg-sc500-end-to-end-001",
    runId: "run-2026-07-14-source-sample",
    cert: "SC-500",
    domain: "Implement end-to-end Microsoft security",
    difficulty: "hard",
    stem: "A candidate is preparing for end-to-end security work across Azure, Microsoft 365, identity, and security operations. What experience best matches the preparation expectation?",
    options: [
      { id: "A", text: "Hands-on administration across Azure and hybrid environments with identity and Microsoft 365 familiarity" },
      { id: "B", text: "Only memorizing Microsoft product names without using administration portals" },
      { id: "C", text: "Only building frontend UI components" },
      { id: "D", text: "Only managing billing alerts" }
    ],
    answer: "A",
    explanation: "The SC-500 path expects practical administration across Azure and hybrid environments, plus familiarity with identity, Microsoft 365, and security operations.",
    whyWrong: {
      B: "The preparation expectation is practical experience, not product-name memorization.",
      C: "Frontend UI work alone does not cover the security administration scope.",
      D: "Billing alerts alone do not cover identity, Microsoft 365, or security operations."
    },
    tags: ["sc-500", "hybrid", "security-operations"],
    sourceChunkId: "chunk-sc500-end-to-end",
    sourceUrl: sourceDocs[2].sourceUrl,
    duplicateKey: "sc500-practical-admin-azure-hybrid-m365",
    reviewStatus: "approved",
    criticNotes: ["Source chunk present.", "Question tests preparation expectation, not memorization.", "Distractors are intentionally non-domain alternatives."],
    approvedAt: "2026-07-14T00:00:00.000Z"
  },
  {
    id: "sg-draft-example-blocked-001",
    runId: "run-2026-07-21-kill-switch-example",
    cert: "SC-300",
    domain: "Plan and implement workload identities",
    difficulty: "medium",
    stem: "Draft candidate kept for pipeline validation only.",
    options: [
      { id: "A", text: "Draft" },
      { id: "B", text: "Draft" },
      { id: "C", text: "Draft" },
      { id: "D", text: "Draft" }
    ],
    answer: "A",
    explanation: "Draft candidates must not be served.",
    whyWrong: {},
    tags: ["draft"],
    sourceChunkId: "chunk-sc300-auth-access",
    sourceUrl: sourceDocs[0].sourceUrl,
    duplicateKey: "draft-example-blocked",
    reviewStatus: "draft",
    criticNotes: ["Draft candidate intentionally blocked from approved serving."]
  }
];

export function approvedSourceGroundedQuestions() {
  return sourceQuestionCandidates.filter((question) => validateSourceGroundedQuestion(question).ok && question.reviewStatus === "approved");
}

export function validateSourceGroundedQuestion(question: SourceGroundedQuestion) {
  const chunk = sourceChunks.find((item) => item.id === question.sourceChunkId);
  const run = question.runId ? generationRuns.find((item) => item.id === question.runId) : undefined;
  const errors: string[] = [];
  const optionIds = new Set(question.options.map((option) => option.id));

  if (!chunk) errors.push("missing-source-chunk");
  if (chunk && chunk.cert !== question.cert) errors.push("source-chunk-cert-mismatch");
  if (chunk && chunk.sourceUrl !== question.sourceUrl) errors.push("source-url-chunk-mismatch");
  if (!question.sourceUrl.startsWith("https://learn.microsoft.com/")) errors.push("source-url-not-microsoft-learn");
  if (!question.duplicateKey.trim()) errors.push("missing-duplicate-key");
  if (!question.criticNotes.length || question.criticNotes.some((note) => !note.trim())) errors.push("missing-critic-notes");
  if (question.options.length !== 4) errors.push("requires-four-options");
  if (!optionIds.has(question.answer)) errors.push("answer-option-missing");
  if (!question.explanation.trim()) errors.push("missing-explanation");

  for (const option of question.options) {
    if (option.id !== question.answer && !question.whyWrong[option.id]?.trim()) {
      errors.push(`missing-why-wrong-${option.id}`);
    }
  }

  if (question.reviewStatus === "approved" && !question.approvedAt) errors.push("approved-at-required");
  if (question.reviewStatus === "approved" && run?.killSwitchEnabled) errors.push("approved-from-kill-switch-run");
  if (run && run.spentEstimateCents > run.budgetCapCents) errors.push("run-budget-exceeded");

  return { ok: errors.length === 0, errors };
}

export function sourceGroundingSummary() {
  const approved = approvedSourceGroundedQuestions();
  const drafts = sourceQuestionCandidates.filter((question) => question.reviewStatus !== "approved");
  return {
    docs: sourceDocs.length,
    chunks: sourceChunks.length,
    approved: approved.length,
    drafts: drafts.length,
    blockedRuns: generationRuns.filter((run) => run.status === "blocked" || run.killSwitchEnabled).length
  };
}
