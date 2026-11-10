"use client";

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export type SegmentItem<T extends string> = { value: T; label: ReactNode; badge?: ReactNode };

/** Сегментированный переключатель с «плавающей» подложкой (вкладки, карта/список, сейчас/план). */
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  size = "md",
  className,
  ariaLabel,
}: {
  items: SegmentItem<T>[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
  className?: string;
  ariaLabel: string;
}) {
  const id = useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-subtle p-1", className)}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
              size === "md" ? "h-8 px-3.5 text-body-sm" : "h-7 px-2.5 text-caption",
              active ? "text-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                transition={spring}
                className="absolute inset-0 rounded-full bg-surface shadow-[0_1px_2px_rgb(16_24_40/0.06),0_1px_6px_rgb(16_24_40/0.06)]"
              />
            )}
            <span className="relative">{it.label}</span>
            {it.badge && <span className="relative">{it.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
