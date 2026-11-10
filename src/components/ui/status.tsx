import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatusKind = "live" | "building" | "attention" | "planned" | "new";

export const statusMeta: Record<StatusKind, { label: string; dot: string; text: string; soft: string }> = {
  live: { label: "Работает", dot: "bg-success", text: "text-success", soft: "bg-success-soft" },
  building: { label: "В разработке", dot: "bg-warning", text: "text-warning", soft: "bg-warning-soft" },
  attention: { label: "Требует внимания", dot: "bg-error", text: "text-error", soft: "bg-error-soft" },
  planned: { label: "Запланировано", dot: "bg-ink-3", text: "text-ink-2", soft: "bg-subtle" },
  new: { label: "Новое", dot: "bg-accent", text: "text-accent", soft: "bg-accent-soft" },
};

/** Статус: точка + текст, смысл никогда не передаётся только цветом. */
export function Status({
  kind,
  children,
  className,
  pill,
}: {
  kind: StatusKind;
  children?: ReactNode;
  className?: string;
  pill?: boolean;
}) {
  const m = statusMeta[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-micro font-medium",
        m.text,
        pill && cn("rounded-full px-2.5 py-1", m.soft),
        className,
      )}
    >
      <span className={cn("relative size-1.5 shrink-0 rounded-full", m.dot)}>
        {kind === "live" && (
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden", m.dot)} />
        )}
      </span>
      {children ?? m.label}
    </span>
  );
}

export function Badge({
  tone = "accent",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "accent" | "neutral" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-micro font-semibold tabular",
        tone === "accent" && "bg-accent text-white",
        tone === "neutral" && "bg-subtle text-ink-2",
        tone === "dark" && "bg-graphite text-white",
        className,
      )}
      {...props}
    />
  );
}

/** Chip — нейтральный ярлык или выбираемая подсказка. */
export function Chip({
  className,
  selected,
  as = "span",
  ...props
}: HTMLAttributes<HTMLElement> & { selected?: boolean; as?: "span" | "button" }) {
  const Comp = as;
  return (
    <Comp
      {...(as === "button" ? { type: "button", "aria-pressed": selected } : {})}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-caption font-medium transition-colors duration-150",
        selected
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-line bg-surface text-ink-2",
        as === "button" && !selected && "hover:border-line-strong hover:text-ink",
        className,
      )}
      {...props}
    />
  );
}
