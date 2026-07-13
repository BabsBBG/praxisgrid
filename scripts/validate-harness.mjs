import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "AGENTS.md",
  "PRODUCT_SPEC.md",
  "ARCHITECTURE.md",
  "SECURITY.md",
  "ACCEPTANCE_CRITERIA.md",
  "CURRENT_STATE.md",
  "KNOWN_BLOCKERS.md",
  "KNOWN_FAILURES.md",
  "IMPLEMENTATION_PLAN.md",
  "TESTING_STRATEGY.md",
  "VERCEL_DEPLOYMENT.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "vercel.json",
  ".npmrc",
  ".nvmrc"
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length) {
  console.error(`Missing harness files: ${missing.join(", ")}`);
  process.exit(1);
}

const npmrc = readFileSync(".npmrc", "utf8");
const nvmrc = readFileSync(".nvmrc", "utf8").trim();

for (const line of ["legacy-peer-deps=true", "audit=false", "fund=false", "registry=https://registry.npmjs.org/"]) {
  if (!npmrc.includes(line)) {
    console.error(`.npmrc is missing ${line}`);
    process.exit(1);
  }
}

if (nvmrc !== "20") {
  console.error(".nvmrc must be 20");
  process.exit(1);
}

console.log("Harness files are present.");
