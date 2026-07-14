import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, Search } from "lucide-react";
import { scenarios, projectScenarios } from "../data/scenarios";
import { ScenarioCard } from "../components/ScenarioCard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const exams = ["all", "sc-300", "sc-500", "projects"] as const;
type Filter = (typeof exams)[number];

export function Scenarios() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const scenarioRows = useMemo(() => {
    return (Object.entries(scenarios) as ["sc-300" | "sc-500", typeof scenarios["sc-300"]][]).flatMap(([exam, certData]) =>
      certData.domains.flatMap((domain) =>
        domain.scenarios.map((scenario) => ({ exam, domain, scenario }))
      )
    ).filter((row) => {
      if (filter !== "all" && filter !== row.exam) return false;
      if (!normalized) return true;
      return [row.scenario.title, row.scenario.description, row.domain.name, row.scenario.tags.join(" ")].join(" ").toLowerCase().includes(normalized);
    });
  }, [filter, normalized]);

  const projectRows = projectScenarios.filter((project) => {
    if (filter !== "all" && filter !== "projects") return false;
    if (!normalized) return true;
    return [project.title, project.description, project.tech.join(" "), project.domains.join(" ")].join(" ").toLowerCase().includes(normalized);
  });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Card className="aq-hero">
        <CardHeader>
          <div>
            <Badge className="mb-3 border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white">Scenario Lab</Badge>
            <CardTitle className="text-3xl">Enterprise scenarios by domain</CardTitle>
            <p className="mt-2 font-semibold text-[var(--aq-muted)]">Practice with realistic tasks mapped to exam objectives and your portfolio projects.</p>
          </div>
          <BookOpen className="h-9 w-9 text-[var(--aq-blue-600)]" />
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search scenarios, tags, or domains" className="aq-input h-14 w-full pl-12 pr-4 font-semibold outline-none focus:border-[var(--aq-blue-600)]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {exams.map((item) => <Button key={item} onClick={() => setFilter(item)} variant={filter === item ? "default" : "soft"} size="sm">{item === "all" ? "All" : item.toUpperCase()}</Button>)}
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Exam scenarios</h2>
          <Badge>{scenarioRows.length} available</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {scenarioRows.map(({ exam, domain, scenario }) => <ScenarioCard key={`${exam}-${scenario.id}`} scenario={scenario} exam={exam} domain={domain.name} />)}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your project scenarios</h2>
          <Badge>{projectRows.length} mapped</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projectRows.map((project) => (
            <Card key={project.id} className="aq-row-card">
              <CardHeader>
                <div>
                  <Badge className="mb-2">Portfolio-linked</Badge>
                  <CardTitle>{project.title}</CardTitle>
                </div>
                <BriefcaseBusiness className="h-7 w-7 text-[var(--aq-blue-600)]" />
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-[var(--aq-muted)]">{project.description}</p>
                <div className="flex flex-wrap gap-2">{project.tech.map((item) => <Badge key={item}>{item}</Badge>)}</div>
                <a href={project.repo} target="_blank" rel="noreferrer" className="font-semibold text-[var(--aq-blue-700)] dark:text-[var(--aq-blue-500)]">Open repository</a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
