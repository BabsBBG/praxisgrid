import { ShieldAlert } from "lucide-react";
import { Card } from "./ui/card";

export const DEMO_BANK_COPY =
  "Demo practice bank: These questions are seed content for testing the platform. They are not official Microsoft questions and are not yet source-grounded or fully reviewed.";

export const MICROSOFT_DISCLAIMER = "Not affiliated with or endorsed by Microsoft.";

export function QuestionBankNotice({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={compact ? "border-emerald-900/20 bg-emerald-50 p-3 text-emerald-950 dark:border-emerald-300/20 dark:bg-emerald-950/30 dark:text-emerald-50" : "border-emerald-900/20 bg-emerald-50 p-4 text-emerald-950 dark:border-emerald-300/20 dark:bg-emerald-950/30 dark:text-emerald-50"}>
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />
        <div className="space-y-1">
          <p className={compact ? "text-sm font-semibold leading-snug" : "font-semibold leading-snug"}>{DEMO_BANK_COPY}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/70 dark:text-emerald-200/70">{MICROSOFT_DISCLAIMER}</p>
        </div>
      </div>
    </Card>
  );
}
