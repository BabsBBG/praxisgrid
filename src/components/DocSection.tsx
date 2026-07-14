import { ExternalLink } from "lucide-react";
import type { ExamDocs } from "../data/docs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function DocSection({ examKey, doc }: { examKey: string; doc: ExamDocs }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <Badge className="mb-2 border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white">{examKey.toUpperCase()}</Badge>
          <CardTitle className="text-2xl">{doc.title}</CardTitle>
          <p className="mt-2 font-semibold text-[var(--aq-muted)]">{doc.description}</p>
        </div>
        <div className="aq-metric text-center">
          <p className="text-2xl font-semibold">{doc.passingScore}</p>
          <p className="text-xs font-semibold text-[var(--aq-muted)]">passing score</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {doc.domains.map((domain) => (
            <div key={domain.name} className="aq-subtle-panel p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold">
                <span>{domain.name}</span>
                <span>{domain.weight}</span>
              </div>
              <Progress value={Number(domain.weight.split("-")[1]?.replace("%", "") ?? 25)} />
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          {doc.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="aq-row-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{link.label}</p>
                  <p className="text-sm font-semibold text-[var(--aq-muted)]">{link.description}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-slate-400" />
              </div>
            </a>
          ))}
        </div>
        <Button asChild variant="soft" size="lg" className="w-full">
          <a href={doc.links[0]?.url} target="_blank" rel="noreferrer">Open study guide</a>
        </Button>
      </CardContent>
    </Card>
  );
}
