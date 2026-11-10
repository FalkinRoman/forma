import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Заголовок страницы: одна строка смысла + действия справа.
 * Первичное действие — одно (правило «один очевидный следующий шаг»).
 */
export function PageHeader({
  title,
  description,
  actions,
  back,
  meta,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        {back && (
          <Link
            href={back.href}
            className="mb-3 inline-flex items-center gap-1 rounded-full text-caption font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <ChevronLeft className="size-4" />
            {back.label}
          </Link>
        )}
        <h1 className="text-[28px] leading-tight font-bold tracking-[-0.02em] sm:text-h1">{title}</h1>
        {description && <p className="mt-2 max-w-[640px] text-body text-ink-2">{description}</p>}
        {meta && <div className="mt-3 flex flex-wrap items-center gap-2">{meta}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/** Обёртка страницы: единая ширина и вертикальный ритм 32px. */
export function Page({ children, className, wide }: { children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <div className={cn("@container mx-auto flex w-full min-w-0 flex-col gap-8 [&>*]:min-w-0", wide ? "max-w-[1280px]" : "max-w-[1200px]", className)}>
      {children}
    </div>
  );
}

/** Заголовок секции внутри страницы. */
export function SectionTitle({ children, action, className }: { children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-3", className)}>
      <h2 className="text-h3 font-semibold text-ink">{children}</h2>
      {action}
    </div>
  );
}
