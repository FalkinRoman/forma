"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { Portal } from "@/components/ui/portal";

/**
 * Модальное окно / боковая панель.
 * - center: окно по центру (на телефоне — шторка снизу);
 * - right: панель справа для деталей записи (клиент, заказ, агент).
 * Esc закрывает, фокус переходит внутрь и возвращается на кнопку, прокрутка страницы блокируется.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "center",
  size = "md",
  icon,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: "center" | "right";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restore.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      const el = panel.current?.querySelector<HTMLElement>("[data-autofocus], input, textarea, button:not([data-close])");
      (el ?? panel.current)?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      restore.current?.focus?.();
    };
  }, [open, onClose]);

  const widths = { sm: "sm:max-w-[440px]", md: "sm:max-w-[560px]", lg: "sm:max-w-[760px]" };

  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[70] flex",
            side === "center" ? "items-end justify-center sm:items-center sm:p-6" : "justify-end sm:p-3",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base }}
        >
          <div className="absolute inset-0 bg-[#0e1424]/30 backdrop-blur-[6px]" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={side === "center" ? { opacity: 0, y: 24, scale: 0.98 } : { opacity: 0, x: 40 }}
            animate={side === "center" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0 }}
            exit={side === "center" ? { opacity: 0, y: 16, scale: 0.98 } : { opacity: 0, x: 40 }}
            transition={{ duration: duration.slow, ease }}
            className={cn(
              "relative flex w-full flex-col overflow-hidden border border-white/70 bg-surface shadow-float outline-none",
              side === "center"
                ? cn("max-h-[92dvh] rounded-t-[28px] sm:rounded-modal", widths[size])
                : "h-full max-w-[480px] sm:rounded-panel",
            )}
          >
            <header className="flex items-start gap-3 px-6 pt-6 pb-4">
              {icon}
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-h3 font-semibold text-ink">
                  {title}
                </h2>
                {description && <p className="mt-1 text-body-sm text-ink-2">{description}</p>}
              </div>
              <button
                type="button"
                data-close
                onClick={onClose}
                aria-label="Закрыть"
                className="-mt-1 -mr-2 flex size-10 shrink-0 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-subtle hover:text-ink focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:outline-none"
              >
                <X className="size-5" />
              </button>
            </header>
            {children && <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{children}</div>}
            {footer && (
              <footer className="flex flex-col-reverse gap-2 border-t border-line bg-subtle/50 px-6 py-4 sm:flex-row sm:justify-end">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}
