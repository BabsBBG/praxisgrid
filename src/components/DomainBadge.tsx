import { Badge } from "./ui/badge";

export function DomainBadge({ label, tone = "slate" }: { label: string; tone?: "slate" | "sky" | "violet" | "blue" }) {
  const tones = {
    slate: "",
    sky: "",
    violet: "",
    blue: "border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white"
  };
  return <Badge className={tones[tone]}>{label}</Badge>;
}
