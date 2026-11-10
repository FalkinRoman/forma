"use client";

import { AnimatePresence, motion } from "motion/react";
import { CornerDownLeft, Layers, Search, ShoppingBag, User, Zap, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allNav } from "@/lib/nav";
import { clients, orders, products } from "@/lib/data";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { Portal } from "@/components/ui/portal";

type Item = { id: string; group: string; label: string; hint?: string; icon: LucideIcon; href: string; keywords?: string };

const actions: Item[] = [
  { id: "a-add", group: "Действия", label: "Создать часть системы", hint: "Новый продукт из ядра", icon: Zap, href: "/overview?add=1" },
  { id: "a-inv", group: "Действия", label: "Пригласить сотрудника", icon: Zap, href: "/team" },
  { id: "a-int", group: "Действия", label: "Подключить оплату", hint: "ЮKassa, СБП", icon: Zap, href: "/integrations" },
];

/** Поиск ⌘K: разделы, продукты, клиенты, заказы и действия. Стрелки — выбор, Enter — открыть, Esc — закрыть. */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const all: Item[] = useMemo(
    () => [
      ...actions,
      ...allNav.map((n) => ({ id: n.href, group: "Разделы", label: n.label, hint: n.hint, icon: n.icon, href: n.href })),
      ...products.map((p) => ({ id: `p-${p.id}`, group: "Продукты", label: p.title, hint: p.version !== "—" ? p.version : "в плане", icon: Layers, href: `/products/${p.id}` })),
      ...orders.map((o) => ({ id: `o-${o.id}`, group: "Заказы", label: `Заказ №${o.id}`, hint: `${o.client} · ${o.total}`, icon: ShoppingBag, href: "/orders", keywords: o.items })),
      ...clients.map((c) => ({ id: `c-${c.id}`, group: "Клиенты", label: c.name, hint: c.phone, icon: User, href: "/clients", keywords: c.favorite })),
    ],
    [],
  );

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all.filter((i) => i.group === "Действия" || i.group === "Разделы");
    return all.filter((i) => `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(s)).slice(0, 12);
  }, [q, all]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    const t = setTimeout(() => input.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);
  useEffect(() => setActive(0), [q]);

  const go = (i?: Item) => {
    if (!i) return;
    onClose();
    router.push(i.href);
  };

  const groups = [...new Set(results.map((r) => r.group))];

  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-start justify-center p-3 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: duration.fast }}>
          <div className="absolute inset-0 bg-[#0e1424]/25 backdrop-blur-[4px]" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Поиск по бизнесу"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: duration.base, ease }}
            className="relative w-full max-w-[600px] overflow-hidden rounded-panel border border-white/70 bg-surface shadow-float"
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") (e.preventDefault(), setActive((a) => Math.min(a + 1, results.length - 1)));
              if (e.key === "ArrowUp") (e.preventDefault(), setActive((a) => Math.max(a - 1, 0)));
              if (e.key === "Enter") go(results[active]);
            }}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 text-ink-3" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Заказ, клиент, продукт или раздел"
                className="h-14 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-3"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={results[active] ? `cmdk-${results[active].id}` : undefined}
              />
              <kbd className="rounded-[6px] border border-line px-1.5 py-0.5 text-micro text-ink-3">Esc</kbd>
            </div>
            <div id="cmdk-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-3 py-10 text-center text-body-sm text-ink-2">Ничего не нашли по «{q}»</p>}
              {groups.map((g) => (
                <div key={g} className="mb-1">
                  <div className="px-3 pt-2 pb-1 text-micro font-medium text-ink-3">{g}</div>
                  {results.map((r, idx) =>
                    r.group !== g ? null : (
                      <button
                        key={r.id}
                        id={`cmdk-${r.id}`}
                        type="button"
                        role="option"
                        aria-selected={idx === active}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => go(r)}
                        className={cn("flex h-11 w-full items-center gap-3 rounded-[12px] px-3 text-left text-body-sm", idx === active ? "bg-accent-soft text-ink" : "text-ink")}
                      >
                        <r.icon className={cn("size-[18px] shrink-0", idx === active ? "text-accent" : "text-ink-3")} />
                        <span className="truncate">{r.label}</span>
                        {r.hint && <span className="ml-auto truncate pl-3 text-caption text-ink-3">{r.hint}</span>}
                        {idx === active && <CornerDownLeft className="size-4 shrink-0 text-accent" />}
                      </button>
                    ),
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}
