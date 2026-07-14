import { Link } from "react-router-dom";
import { ArrowRight, Clock, Gauge } from "lucide-react";
import type { ScenarioTopic } from "../data/scenarios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { DomainBadge } from "./DomainBadge";

export function ScenarioCard({ scenario, exam, domain }: { scenario: ScenarioTopic; exam: "sc-300" | "sc-500"; domain: string }) {
  return (
    <Link to={`/scenarios/${exam}/${scenario.id}`} className="block">
      <Card className="aq-row-card h-full">
        <CardHeader>
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <DomainBadge label={exam.toUpperCase()} tone={exam === "sc-300" ? "blue" : "violet"} />
              <Badge>{scenario.difficulty}</Badge>
            </div>
            <CardTitle>{scenario.title}</CardTitle>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-[var(--aq-muted)]">{scenario.description}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--aq-muted)]">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {scenario.estimatedTime}</span>
            <span className="inline-flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> {domain}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.tags.slice(0, 4).map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
