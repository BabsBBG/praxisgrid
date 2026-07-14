import { cn } from "../../lib/utils";

export function Switch({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (next: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn("relative h-8 w-14 rounded-full border border-[var(--aq-border)] transition", checked ? "bg-[var(--aq-blue-700)]" : "bg-slate-300 dark:bg-[#0b2545]")}
    >
      <span className={cn("absolute top-1 h-6 w-6 rounded-full bg-white shadow transition", checked ? "left-7" : "left-1")} />
    </button>
  );
}
