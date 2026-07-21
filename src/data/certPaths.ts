import type { Cert } from "../types";

export interface CertPathMeta {
  cert: Cert;
  title: string;
  role: string;
  accent: string;
  summary: string;
  targetRoles: string[];
  readinessTarget: number;
  examFormat: string;
  quizFormat: string;
  status: "ACTIVE" | "RETIRING" | "ARCHIVED";
  retirementDate?: string;
  replacementCert?: Cert;
  transitionMessage?: string;
}

export const certPaths: CertPathMeta[] = [
  {
    cert: "SC-300",
    title: "Identity & Access Administrator",
    role: "IAM / Entra ID",
    accent: "from-blue-900 via-blue-700 to-sky-400",
    summary: "Master Entra ID, Conditional Access, workload identities, PIM, access reviews, and identity governance.",
    targetRoles: ["IAM Analyst", "Identity Engineer", "Entra Administrator", "Cloud Security Analyst"],
    readinessTarget: 80,
    examFormat: "50 questions / 100 minutes / weighted by domain",
    quizFormat: "10 questions / 12 minutes / focused sprints",
    status: "ACTIVE"
  },
  {
    cert: "AZ-500",
    title: "Azure Security Engineer",
    role: "Azure Security",
    accent: "from-blue-800 via-sky-600 to-sky-400",
    summary: "Historical Azure security practice remains available while AZ-500 retires. New activation is disabled; SC-500 is recommended for continuing cloud and security preparation.",
    targetRoles: ["Azure Security Engineer", "Cloud Security Engineer", "Cloud SOC Analyst", "Security Operations Engineer"],
    readinessTarget: 82,
    examFormat: "50 questions / 100 minutes / Defender/Sentinel heavy",
    quizFormat: "10 questions / 12 minutes / domain-based drills",
    status: "RETIRING",
    retirementDate: "2026-08-31",
    replacementCert: "SC-500",
    transitionMessage: "AZ-500 retires on August 31, 2026. PraxisGrid preserves your history and progress, but new activation is disabled. Continue with SC-500 for the next cloud security path."
  },
  {
    cert: "SC-500",
    title: "Cloud & AI Security Engineer",
    role: "Cloud + AI Security",
    accent: "from-blue-950 via-blue-800 to-blue-500",
    summary: "Prepare for cloud, hybrid, multicloud, Microsoft security posture, Copilot, AI workload, and agent security.",
    targetRoles: ["Cloud Security Engineer", "AI Security Engineer", "Cloud SOC Engineer", "Security Engineer"],
    readinessTarget: 82,
    examFormat: "50 questions / 100 minutes / cloud + AI security mix",
    quizFormat: "10 questions / 12 minutes / modern security sprints",
    status: "ACTIVE"
  }
];

export function certSlug(cert: Cert) {
  return cert.toLowerCase();
}

export function certFromSlug(slug?: string): Cert {
  const normalized = (slug ?? "").toUpperCase();
  if (normalized === "AZ-500" || normalized === "SC-500" || normalized === "SC-300") return normalized;
  return "SC-300";
}

export function pathFor(cert: Cert) {
  return cert.toLowerCase();
}

export function metaFor(cert: Cert) {
  return certPaths.find((path) => path.cert === cert) ?? certPaths[0];
}

export function isCertActivatable(cert: Cert) {
  return metaFor(cert).status === "ACTIVE";
}
