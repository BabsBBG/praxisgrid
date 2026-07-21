import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const strict = process.argv.includes("--strict");
const outfile = join(tmpdir(), `praxisgrid-duplicate-report-${Date.now()}.mjs`);

const entry = `
  import questions from "./src/data/questions.json";
  import {
    approvedSourceGroundedQuestions,
    approvedSourceGroundingDuplicateIssues,
    sourceQuestionCandidates,
    validateSourceGroundedQuestion
  } from "./src/data/sourceGrounding.ts";
  import { duplicateFingerprints } from "./src/utils/questionQuality.ts";

  const approvedSource = sourceQuestionCandidates.filter(
    (question) => validateSourceGroundedQuestion(question).ok && question.reviewStatus === "approved"
  );
  const sourceIssues = approvedSourceGroundingDuplicateIssues(approvedSource);
  approvedSourceGroundedQuestions();

  export const report = {
    seedCount: questions.length,
    approvedCount: approvedSource.length,
    seedDuplicates: duplicateFingerprints(questions),
    approvedStemDuplicates: sourceIssues.fingerprints,
    approvedDuplicateKeyDuplicates: sourceIssues.duplicateKeys
  };
`;

await build({
  stdin: {
    contents: entry,
    resolveDir: process.cwd(),
    sourcefile: "validate-duplicates-entry.ts",
    loader: "ts"
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent"
});

try {
  const { report } = await import(pathToFileURL(outfile).href);
  const {
    seedCount,
    approvedCount,
    seedDuplicates,
    approvedStemDuplicates,
    approvedDuplicateKeyDuplicates
  } = report;

  if (seedDuplicates.length) {
    console.warn(`Seed/demo duplicate fingerprints detected: ${formatDuplicateIds(seedDuplicates).slice(0, 10).join(", ")}`);
  }

  if (approvedStemDuplicates.length) {
    console.error(`Approved source-grounded duplicate fingerprints detected: ${formatDuplicateIds(approvedStemDuplicates).join(", ")}`);
    process.exit(1);
  }

  if (approvedDuplicateKeyDuplicates.length) {
    console.error(`Approved source-grounded duplicate keys detected: ${formatDuplicateIds(approvedDuplicateKeyDuplicates).join(", ")}`);
    process.exit(1);
  }

  if (strict && seedDuplicates.length) {
    console.error("Strict duplicate validation failed because seed/demo duplicate fingerprints exist.");
    process.exit(1);
  }

  console.log(`Duplicate validation passed: ${seedCount} seed/demo questions checked, ${approvedCount} approved source-grounded records checked.`);
} finally {
  rmSync(outfile, { force: true });
}

function formatDuplicateIds(duplicates) {
  return duplicates.map((item) => `${item.first.id}/${item.second.id}`);
}
