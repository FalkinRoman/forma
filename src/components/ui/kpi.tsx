import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** KPI-плитка: подпись → значение → динамика. Ширина задаётся сеткой родителя — все плитки равные. */
export function Kpi({
  icon,
  label,
  value,
  delta,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta?: number;
  className?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={cn("min-w-0 rounded-card border border-line bg-surface p-4 shadow-card sm:p-5", className)}>
      <div className="flex items-center gap-2 text-caption text-ink-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-accent">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
        <span className="truncate text-[20px] leading-tight font-semibold tracking-[-0.02em] whitespace-nowrap text-ink tabular sm:text-[24px]">
          {value}
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-micro font-medium tabular",
              up ? "bg-success-soft text-success" : "bg-error-soft text-error",
            )}
          >
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {up ? "+" : ""}
            {delta}%<span className="sr-only"> за 30 дней</span>
          </span>
        )}
      </div>
    </div>
  );
}
