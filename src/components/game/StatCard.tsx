import { motion } from "framer-motion";
import { Card } from "../ui/card";

export function StatCard({ emoji, label, value, hint }: { emoji: string; label: string; value: string | number; hint?: string }) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      <Card className="aq-metric overflow-hidden p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--aq-border)] bg-white text-xs font-bold text-[var(--aq-blue-800)] dark:bg-[#081d38] dark:text-[var(--aq-ink)] sm:h-12 sm:w-12 sm:text-sm">
            {emoji}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-wide text-[var(--aq-muted)]">{label}</p>
            <p className="truncate text-sm font-semibold">{value}</p>
          </div>
        </div>
        {hint ? <p className="mt-2 truncate text-xs font-semibold text-[var(--aq-muted)] sm:mt-3 sm:text-sm">{hint}</p> : null}
      </Card>
    </motion.div>
  );
}
