import { readFileSync } from "node:fs";

const questions = JSON.parse(readFileSync("src/data/questions.json", "utf8"));

if (!Array.isArray(questions) || questions.length === 0) {
  console.error("Question bank is empty or invalid.");
  process.exit(1);
}

const stems = new Set();
const duplicates = [];

function normalizeStem(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

for (const question of questions) {
  const stem = normalizeStem(question.stem);
  if (!stem) {
    console.error("Question found without a stem.");
    process.exit(1);
  }
  if (stems.has(stem)) duplicates.push(question.id ?? stem.slice(0, 60));
  stems.add(stem);
}

if (duplicates.length) {
  console.warn(`Duplicate question stems detected: ${duplicates.slice(0, 10).join(", ")}`);
}

console.log(`Question bank loaded: ${questions.length} seed/demo questions.`);
