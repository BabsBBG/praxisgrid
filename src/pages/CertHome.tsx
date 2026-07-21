import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, Gauge, GraduationCap, HelpCircle, ShieldCheck } from "lucide-react";
import { certFromSlug, isCertActivatable, metaFor, pathFor } from "../data/certPaths";
import { docs } from "../data/docs";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { QuestionBankNotice } from "../components/QuestionBankNotice";

const actionCards = [
  { key: "knowledge", title: "Domain Quizzes", description: "Focused quick quizzes, scenario challenges, KQL practice, and activity history.", icon: HelpCircle },
  { key: "readiness", title: "Certification Progress", description: "Progress score, target domains, trends, and certification run action plan.", icon: Gauge },
  { key: "job", title: "Career Lab", description: "Interview Studio, GitHub project evidence, STAR answers, and what to say.", icon: BriefcaseBusiness }
];

export function CertHome() {
  const { cert: slug } = useParams();
  const cert = certFromSlug(slug);
  const meta = metaFor(cert);
  const readiness = Math.round(useAppStore((state) => state.progress.readiness[cert] ?? 0));
  const docInfo = docs[pathFor(cert) as keyof typeof docs];
  const active = isCertActivatable(cert);

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <section className="aq-hero overflow-hidden p-5 sm:p-6">
        <Badge className="mb-3 border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white">{cert}</Badge>
        {meta.status !== "ACTIVE" ? <Badge className="mb-3 ml-2 border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-300 dark:text-slate-950">{meta.status}</Badge> : null}
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold text-[var(--aq-muted)] sm:text-base">{meta.summary}</p>
        {meta.transitionMessage ? <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-950 dark:border-amber-300/40 dark:bg-amber-300/10 dark:text-amber-100">{meta.transitionMessage}</p> : null}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="aq-metric">
            <div className="text-3xl font-bold sm:text-4xl">{readiness}%</div>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--aq-muted)]">Progress</p>
          </div>
          <div className="aq-metric">
            <div className="text-xl font-bold sm:text-2xl">10Q / 12m</div>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--aq-muted)]">Sprints</p>
          </div>
          <div className="aq-metric">
            <div className="text-xl font-bold sm:text-2xl">{meta.readinessTarget}%</div>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.04em] text-[var(--aq-muted)]">Pass target</p>
          </div>
        </div>
      </section>

      <QuestionBankNotice />

      <section className="grid gap-4 sm:grid-cols-3">
        {actionCards.map((card) => {
          const Icon = card.icon;
          const targetCert = active || card.key === "readiness" ? cert : meta.replacementCert ?? "SC-500";
          return (
            <Link key={card.key} to={`/cert/${pathFor(targetCert)}/${card.key}`}>
              <Card className={`aq-row-card group h-full ${!active && card.key !== "readiness" ? "opacity-60" : ""}`}>
                <CardHeader>
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-[var(--aq-border)] bg-[var(--aq-blue-50)] text-[var(--aq-blue-700)]"><Icon className="h-6 w-6" /></div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-slate-500 dark:text-slate-400">{!active && card.key !== "readiness" ? "New activation is disabled for this retiring certification. Historical progress remains available." : card.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <Card>
        <CardHeader><CardTitle>Domain map</CardTitle><BookOpen className="h-6 w-6" /></CardHeader>
        <div className="grid gap-3">
          {docInfo.domains.map((domain) => (
            <div key={domain.name} className="aq-subtle-panel p-4">
              <div className="mb-2 flex justify-between gap-3 text-sm font-semibold"><span>{domain.name}</span><span>{domain.weight}</span></div>
              <Progress value={Number(domain.weight.match(/\d+/)?.[0] ?? 25)} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-[var(--aq-border)] bg-[var(--aq-blue-50)] text-[var(--aq-ink)] dark:bg-[#0b2545]">
        <CardHeader><CardTitle>Career Lab promise</CardTitle><ShieldCheck className="h-6 w-6" /></CardHeader>
        <p className="text-lg font-medium opacity-90">This path helps you explain project evidence, answer interviewer follow-ups, and sound like someone who can reason through real technical controls.</p>
        <Link className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--aq-blue-700)] bg-[var(--aq-blue-700)] px-5 py-3 font-semibold text-white" to={`/cert/${pathFor(active ? cert : meta.replacementCert ?? "SC-500")}/job`}><GraduationCap className="h-5 w-5" /> Open Career Lab</Link>
      </Card>
    </motion.div>
  );
}
