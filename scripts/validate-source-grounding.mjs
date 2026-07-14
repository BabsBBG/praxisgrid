import { readFileSync } from "node:fs";

const source = readFileSync("src/data/sourceGrounding.ts", "utf8");
const approvedMatches = [...source.matchAll(/reviewStatus:\s*"approved"[\s\S]*?duplicateKey:\s*"([^"]+)"/g)];
const chunkRefs = [...source.matchAll(/sourceChunkId:\s*"([^"]+)"/g)].map((match) => match[1]);
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

if (!source.includes("criticNotes")) {
  console.error("Automated critic notes are missing from question candidates.");
  process.exit(1);
}

console.log(`Source-grounding registry valid: ${approvedMatches.length} approved questions, ${chunkIds.size} source chunks.`);
