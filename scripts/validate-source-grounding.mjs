import { readFileSync } from "node:fs";

const source = readFileSync("src/data/sourceGrounding.ts", "utf8");
const candidateBlocks = source
  .split(/\n  \{\n    id: "/)
  .slice(1)
  .map((part) => `id: "${part.split(/\n  \}/)[0]}`);
const approvedBlocks = candidateBlocks.filter((block) => /reviewStatus:\s*"approved"/.test(block));
const approvedMatches = approvedBlocks
  .map((block) => block.match(/duplicateKey:\s*"([^"]+)"/))
  .filter(Boolean);
const chunkRefs = candidateBlocks
  .map((block) => block.match(/sourceChunkId:\s*"([^"]+)"/))
  .filter(Boolean)
  .map((match) => match[1]);
const chunkIds = new Set([...source.matchAll(/id:\s*"(chunk-[^"]+)"/g)].map((match) => match[1]));
const duplicateKeys = approvedMatches.map((match) => match[1]);

if (!source.includes("https://learn.microsoft.com/")) {
  console.error("Source-grounding registry must reference official Microsoft Learn URLs.");
  process.exit(1);
}

if (!source.includes("approvedSourceGroundedQuestions")) {
  console.error("Approved-only serving helper is missing.");
  process.exit(1);
}

if (approvedMatches.length === 0) {
  console.error("No approved source-grounded questions found.");
  process.exit(1);
}

if (approvedMatches.length !== approvedBlocks.length) {
  console.error("Every approved source-grounded question must include a duplicateKey.");
  process.exit(1);
}

for (const chunkId of chunkRefs) {
  if (!chunkIds.has(chunkId)) {
    console.error(`Question references missing source chunk: ${chunkId}`);
    process.exit(1);
  }
}

if (new Set(duplicateKeys).size !== duplicateKeys.length) {
  console.error("Approved source-grounded questions contain duplicate duplicateKey values.");
  process.exit(1);
}

if (!source.includes('reviewStatus: "draft"')) {
  console.error("Pipeline fixture should include a draft candidate to validate approved-only serving.");
  process.exit(1);
}

if (!source.includes("embeddingHash")) {
  console.error("Source chunks must include cached embedding hashes.");
  process.exit(1);
}

if (!source.includes("generationRuns")) {
  console.error("Batch generation run controls are missing.");
  process.exit(1);
}

if (!source.includes("budgetCapCents") || !source.includes("killSwitchEnabled") || !source.includes("failureLog")) {
  console.error("Generation runs must track budget caps, kill switch state, and failure logs.");
  process.exit(1);
}

if (!source.includes("batchQuestionLimit") || !source.includes("maxSourceChunks") || !source.includes("adminOnly")) {
  console.error("Generation runs must track batch limits, source chunk limits, and admin-only execution.");
  process.exit(1);
}

if (!source.includes('status: "blocked"') || !source.includes('killSwitchEnabled: true')) {
  console.error("Pipeline fixture must include a kill-switch-blocked run.");
  process.exit(1);
}

if (!source.includes("criticNotes")) {
  console.error("Automated critic notes are missing from question candidates.");
  process.exit(1);
}

if (!source.includes("validateSourceGroundedQuestion")) {
  console.error("Structured source-grounded question validator is missing.");
  process.exit(1);
}

console.log(`Source-grounding registry valid: ${approvedMatches.length} approved questions, ${chunkIds.size} source chunks.`);
