import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** padding: 16 / 20 / 24px — фиксированные внутренние отступы по ДС */
  pad?: "sm" | "md" | "lg" | "none";
  interactive?: boolean;
  tone?: "surface" | "subtle";
};

const pads = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };

/** Card: иерархия заголовок → статус → превью → действие. Радиус 20px. */
export function Card({ pad = "md", interactive, tone = "surface", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line",
        tone === "surface" ? "bg-surface shadow-card" : "bg-subtle",
        pads[pad],
        interactive &&
          "cursor-pointer transition-[box-shadow,transform,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-h3 font-semibold text-ink", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-caption text-ink-2", className)} {...props} />;
}
