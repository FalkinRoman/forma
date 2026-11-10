import { cn } from "@/lib/cn";

/** Линейный прогресс. tone=auto: синий, жёлтый от 80%, красный — сверх лимита. */
export function Progress({
  value,
  max = 100,
  className,
  tone = "auto",
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  tone?: "auto" | "accent" | "success";
  label?: string;
}) {
  const raw = (value / max) * 100;
  const pct = Math.min(100, Math.round(raw));
  // красный — только при превышении лимита; заполнено полностью — предупреждение
  const color =
    tone === "success" ? "bg-success" : tone === "accent" ? "bg-accent" : raw > 100 ? "bg-error" : raw >= 80 ? "bg-warning" : "bg-accent";
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-500 ease-soft", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[12px] bg-muted", className)} aria-hidden />;
}
