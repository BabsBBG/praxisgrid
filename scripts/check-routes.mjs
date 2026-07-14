import { existsSync, readFileSync } from "node:fs";

const app = readFileSync("src/App.tsx", "utf8");
const layout = readFileSync("src/components/Layout.tsx", "utf8");

const requiredRoutes = [
  "/",
  "/quiz",
  "/exams",
  "/account",
  "/cert/:cert/knowledge",
  "/cert/:cert/readiness",
  "/cert/:cert/job",
  "/arena",
  "/history",
  "/settings"
];

const routeFiles = [
  "src/pages/PathHome.tsx",
  "src/pages/KnowledgeCheck.tsx",
  "src/pages/Readiness.tsx",
  "src/pages/JobReadiness.tsx",
  "src/pages/PracticeArena.tsx",
  "src/pages/PastExams.tsx",
  "src/pages/Settings.tsx",
  "src/pages/Account.tsx"
];

const missingRoutes = requiredRoutes.filter((route) => !app.includes(`path="${route}"`));
const missingFiles = routeFiles.filter((file) => !existsSync(file));
const requiredNavLabels = ["Home", "Quiz", "Exams", "Job Prep", "History", "Settings", "Account"];
const missingNavLabels = requiredNavLabels.filter((label) => !layout.includes(`label: "${label}"`));
const staleNavLabels = ["Learn", "Docs", "Videos"].filter((label) => layout.includes(`label: "${label}"`));

if (missingRoutes.length) {
  console.error(`Missing routes in App.tsx: ${missingRoutes.join(", ")}`);
  process.exit(1);
}

if (missingFiles.length) {
  console.error(`Missing route files: ${missingFiles.join(", ")}`);
  process.exit(1);
}

if (missingNavLabels.length) {
  console.error(`Missing active nav labels in Layout.tsx: ${missingNavLabels.join(", ")}`);
  process.exit(1);
}

if (staleNavLabels.length) {
  console.error(`Stale nav labels still active in Layout.tsx: ${staleNavLabels.join(", ")}`);
  process.exit(1);
}

console.log(`Route/import check passed: ${requiredRoutes.join(", ")}`);
