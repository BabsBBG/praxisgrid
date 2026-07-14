import { Progress } from "../ui/progress";
import { nextLevelXp, xpForLevel } from "../../utils/quizEngine";

export function XPBar({ xp, level }: { xp: number; level: number }) {
  const floor = xpForLevel(level);
  const next = nextLevelXp(level);
  const percent = Math.max(0, Math.min(100, ((xp - floor) / (next - floor)) * 100));
  return (
    <div className="aq-subtle-panel p-4">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
        <span>Level {level}</span>
        <span>{xp} XP</span>
      </div>
      <Progress value={percent} />
      <p className="mt-2 text-xs font-semibold text-[var(--aq-muted)]">{Math.max(0, next - xp)} XP to next level</p>
    </div>
  );
}
