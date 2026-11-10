"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, Clock, X } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

type ToastKind = "success" | "pending" | "error";
type ToastItem = { id: number; kind: ToastKind; title: string; description?: string };

const ToastCtx = createContext<(t: Omit<ToastItem, "id">) => void>(() => {});

export const useToast = () => useContext(ToastCtx);

const icons = {
  success: <CircleCheck className="text-success" />,
  pending: <Clock className="text-warning" />,
  error: <CircleAlert className="text-error" />,
};

/** Toast: коротко — что сделано, что ждёт подтверждения, где ошибка и как исправить. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => setItems((s) => s.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = Date.now() + Math.random();
      setItems((s) => [...s.slice(-2), { ...t, id }]);
      setTimeout(() => dismiss(id), 4800);
    },
    [dismiss],
  );

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      >
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: duration.fast } }}
              transition={{ duration: duration.slow, ease }}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[16px] border border-line bg-surface p-4 shadow-float",
              )}
            >
              <span className="mt-0.5 [&_svg]:size-5">{icons[t.kind]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-caption text-ink-2">{t.description}</p>}
              </div>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => dismiss(t.id)}
                className="rounded-md p-0.5 text-ink-3 transition-colors hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
