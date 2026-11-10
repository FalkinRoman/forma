"use client";

import { BASE } from "@/lib/base";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus, Sparkles, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { duration, ease, spring } from "@/lib/motion";
import { moduleCatalog, type CatalogItem, type ProductKind } from "@/lib/mock";
import { Icon3D } from "@/components/ui/icon-3d";
import { Button } from "@/components/ui/button";

const groups = ["Каналы продаж", "Операции", "Маркетинг и рост"] as const;

/**
 * «Создать часть системы»: подложка + окно по центру.
 * Один клик по продукту — выбор, кнопка внизу — создание (один первичный CTA).
 */
export function AddModuleDialog({
  open,
  onClose,
  existing,
  icons,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  existing: Set<ProductKind>;
  icons: Record<ProductKind, LucideIcon>;
  onCreate: (item: CatalogItem) => void;
}) {
  const [picked, setPicked] = useState<ProductKind | null>(null);

  useEffect(() => {
    if (!open) return;
    setPicked(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const item = moduleCatalog.find((m) => m.kind === picked);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base }}
        >
          {/* подложка */}
          <div className="absolute inset-0 bg-[#0e1424]/30 backdrop-blur-md" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: duration.map, ease }}
            className="relative flex max-h-[92dvh] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[32px] border border-white/70 bg-surface/95 shadow-float backdrop-blur-xl sm:rounded-[32px]"
          >
            <header className="flex items-start gap-4 px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BASE + "/images/3d-platform.png"} alt="" className="hidden h-14 w-auto sm:block" />
              <div className="min-w-0 flex-1">
                <h2 id="add-title" className="text-h2 font-semibold">
                  Создать часть системы
                </h2>
                <p className="mt-1 text-body-sm text-ink-2">
                  Новый продукт сразу подключится к ядру: клиентам, заказам и товарам.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle text-ink-2 transition-colors hover:bg-muted hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 sm:px-8">
              {groups.map((g) => (
                <section key={g} className="mt-4 first:mt-2">
                  <h3 className="mb-3 text-micro font-semibold tracking-wide text-ink-3 uppercase">{g}</h3>
                  <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 md:grid-cols-3">
                    {moduleCatalog
                      .filter((m) => m.group === g)
                      .map((m, i) => {
                        const added = existing.has(m.kind);
                        const on = picked === m.kind;
                        return (
                          <motion.button
                            key={m.kind}
                            type="button"
                            disabled={added}
                            onClick={() => setPicked(m.kind)}
                            onDoubleClick={() => !added && onCreate(m)}
                            aria-pressed={on}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: duration.slow, ease, delay: 0.04 * i }}
                            whileHover={added ? undefined : { y: -3 }}
                            className={cn(
                              "relative flex flex-col items-start gap-4 rounded-[24px] border p-5 text-left transition-[border-color,box-shadow,background-color] duration-200",
                              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
                              on
                                ? "border-accent bg-accent-soft/50 shadow-[0_0_0_4px_var(--color-accent-soft)]"
                                : "border-line bg-surface shadow-xs hover:border-line-strong hover:shadow-card",
                              added && "cursor-default opacity-50 hover:shadow-none",
                            )}
                          >
                            <Icon3D icon={icons[m.kind]} tone={m.tone} size={52} />
                            <span>
                              <span className="block text-body-sm font-semibold text-ink">{m.title}</span>
                              <span className="mt-1 block text-caption text-ink-2">{m.why}</span>
                            </span>
                            <span
                              className={cn(
                                "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full border transition-colors",
                                on ? "border-accent bg-accent text-white" : "border-line-strong bg-surface text-transparent",
                                added && "border-success bg-success-soft text-success",
                              )}
                              aria-hidden
                            >
                              <Check className="size-3.5" strokeWidth={3} />
                            </span>
                            {added && <span className="text-micro font-medium text-success">Уже в системе</span>}
                          </motion.button>
                        );
                      })}
                  </div>
                </section>
              ))}

              <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-subtle p-4">
                <Sparkles className="size-5 shrink-0 text-accent" />
                <p className="text-caption text-ink-2">
                  Нужного нет? Опишите задачу AI-архитектору — он соберёт модуль под ваш бизнес.
                </p>
              </div>
            </div>

            <footer className="flex flex-col-reverse items-stretch gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-micro text-ink-3">Создаётся черновик в плане. Запуск — только после вашего подтверждения.</p>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={item?.kind ?? "none"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                  <Button size="lg" disabled={!item} leftIcon={<Plus />} onClick={() => item && onCreate(item)} className="w-full rounded-full sm:w-auto">
                    {item ? `Создать «${item.title}»` : "Выберите продукт"}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
