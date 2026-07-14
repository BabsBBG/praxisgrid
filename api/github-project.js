import { createHash } from "node:crypto";

const dailyLimit = Number(process.env.GITHUB_IMPORT_DAILY_LIMIT ?? 8);
const cache = new Map();
const rateBuckets = new Map();

function parseRepoUrl(value) {
  const url = new URL(value);
  if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
    throw new Error("Only public github.com repository URLs are supported.");
  }
  const [owner, repoName] = url.pathname.split("/").filter(Boolean);
  if (!owner || !repoName) throw new Error("Enter a GitHub repository URL with an owner and repo name.");
  const repo = repoName.replace(/\.git$/, "");
  return { owner, repo, url: `https://github.com/${owner}/${repo}` };
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function clientKey(req) {
  return String(req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "local").split(",")[0].trim();
}

function checkRateLimit(req) {
  const day = new Date().toISOString().slice(0, 10);
  const key = `${clientKey(req)}:${day}`;
  const count = rateBuckets.get(key) ?? 0;
  if (count >= dailyLimit) {
    const error = new Error(`Daily public repo import limit reached (${dailyLimit}).`);
    error.statusCode = 429;
    throw error;
  }
  rateBuckets.set(key, count + 1);
}

async function githubJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "azure-quest-public-import"
    }
  });
  if (!response.ok) {
    const error = new Error(`GitHub returned ${response.status} for ${url}.`);
    error.statusCode = response.status;
    throw error;
  }
  return response.json();
}

function makeStoryDraft({ owner, repo, readme, primaryLanguage, languages }) {
  const name = repo.replace(/[-_]/g, " ");
  const languageLine = [primaryLanguage, ...languages.filter((item) => item !== primaryLanguage)].filter(Boolean).slice(0, 4).join(", ") || "the project stack";
  const firstHeading = readme.split(/\r?\n/).find((line) => line.trim().startsWith("#"))?.replace(/^#+\s*/, "").trim() || name;

  return {
    pitch30: `${firstHeading} is a public GitHub project I can use to explain practical security delivery: the goal, the implementation choices, and the evidence I would show during an interview. I would frame it around the problem it solves, the controls it demonstrates, and what I would improve next.`,
    walkthrough2m: `I would start with the user or security problem, then walk through the repository structure, the ${languageLine} implementation, and the controls demonstrated in the README. I would call out tradeoffs, testing evidence, operational risks, and the next hardening step instead of overselling the project.`,
    star: {
      situation: `${owner}/${repo} gives me a concrete project to discuss instead of speaking hypothetically.`,
      task: "Turn the repository into a clear interview story with problem, design, implementation, validation, and lessons learned.",
      action: "Review the README, identify the technical stack and security-relevant decisions, map the work to role expectations, and prepare follow-up answers around limitations.",
      result: "A draft story that can be reviewed, edited, and approved before it is used in mock interviews."
    },
    architecture: [
      "Explain the entry point and user/security problem first.",
      `Describe the implementation stack: ${languageLine}.`,
      "Show where configuration, data flow, validation, and operational controls live.",
      "Name one limitation and one realistic hardening step."
    ],
    resumeBullets: [
      `Built and documented ${firstHeading}, using ${languageLine} to demonstrate practical security delivery.`,
      "Prepared architecture walkthrough, STAR story, risks, and follow-up answers from public repository evidence.",
      "Converted project documentation into interview-ready security impact, tradeoffs, and improvement plan."
    ],
    risks: [
      "README evidence may be incomplete; review code before approving the story.",
      "Do not claim production impact unless metrics are present in the repository.",
      "Keep secrets, private customer details, and unsupported claims out of the final story."
    ]
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    checkRateLimit(req);
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = parseRepoUrl(String(body?.url ?? ""));

    const cacheKey = `${parsed.owner}/${parsed.repo}`;
    if (cache.has(cacheKey)) {
      res.status(200).json({ ...cache.get(cacheKey), cached: true });
      return;
    }

    const repoMeta = await githubJson(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
    if (repoMeta.private) {
      res.status(403).json({ error: "Private repositories are not supported in this milestone." });
      return;
    }

    const readmeMeta = await githubJson(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/readme`);
    const readme = Buffer.from(readmeMeta.content ?? "", "base64").toString("utf8").slice(0, 80_000);
    const languageStats = await githubJson(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`).catch(() => ({}));
    const languages = Object.keys(languageStats).slice(0, 8);
    const primaryLanguage = repoMeta.language ?? languages[0] ?? null;
    const contentHash = hash(JSON.stringify({ readme, languageStats, defaultBranch: repoMeta.default_branch }));
    const importedAt = new Date().toISOString();
    const result = {
      project: {
        id: contentHash.slice(0, 24),
        owner: parsed.owner,
        repo: parsed.repo,
        url: parsed.url,
        defaultBranch: repoMeta.default_branch ?? "main",
        primaryLanguage,
        languages,
        stars: repoMeta.stargazers_count ?? 0,
        readme,
        readmeExcerpt: readme.replace(/\s+/g, " ").slice(0, 420),
        contentHash,
        importedAt,
        status: "draft",
        storyDraft: makeStoryDraft({ ...parsed, readme, primaryLanguage, languages })
      },
      controls: {
        permissionModel: "public-read-only",
        dailyLimit,
        cacheKey: contentHash,
        storyGeneration: "server-side deterministic draft"
      }
    };

    cache.set(cacheKey, result);
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode && Number(error.statusCode) >= 400 ? Number(error.statusCode) : 400;
    res.status(statusCode).json({ error: error instanceof Error ? error.message : "Unable to import repository." });
  }
}
