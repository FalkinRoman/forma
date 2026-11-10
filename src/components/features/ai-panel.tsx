"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ChevronRight, Paperclip, Rocket, Smartphone, Sparkles, TrendingUp, WandSparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { recommendations } from "@/lib/mock";
import { Button, IconButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";

const recIcons = { rocket: Rocket, phone: Smartphone, trend: TrendingUp };

type Msg = { id: number; from: "ai" | "me"; text: string };

const quick = ["Что сейчас требует внимания?", "Как поднять повторные заказы?", "Подключить СБП"];

function Recommendations() {
  const toast = useToast();
  const [selected, setSelected] = useState<string[]>(["loyalty"]);
  const [loading, setLoading] = useState(false);
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="rounded-[16px] border border-line bg-surface p-2 shadow-xs">
      <ul className="flex flex-col">
        {recommendations.map((r) => {
          const Icon = recIcons[r.icon];
          const on = selected.includes(r.id);
          return (
            <li key={r.id}>
              <div
                className={cn(
                  "group flex items-start gap-3 rounded-[12px] p-3 transition-colors duration-150",
                  on ? "bg-accent-soft/60" : "hover:bg-subtle",
                )}
              >
                <Checkbox checked={on} onChange={() => toggle(r.id)} label={r.title} className="mt-2" />
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-surface text-ink">
                  <Icon className="size-[18px]" strokeWidth={1.75} />
                </span>
                <button type="button" onClick={() => toggle(r.id)} className="min-w-0 flex-1 text-left">
                  <span className="block text-caption font-semibold text-ink">{r.title}</span>
                  <span className="mt-0.5 block text-micro text-ink-2">{r.hint}</span>
                </button>
                <ChevronRight className="mt-2.5 size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        variant="dark"
        className="mt-2 w-full"
        leftIcon={<WandSparkles />}
        loading={loading}
        disabled={selected.length === 0}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            toast({
              kind: "pending",
              title: "Готовим предпросмотр",
              description: "Покажем макет «до/после» и стоимость. В продакшен — только после вашего подтверждения.",
            });
          }, 900);
        }}
      >
        {selected.length ? `Показать предпросмотр · ${selected.length}` : "Выберите рекомендацию"}
      </Button>
    </div>
  );
}

/** AI-архитектор: чат-панель справа. Раскрывается по запросу, ничего не применяет без согласия. */
export function AiPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (t: string) => {
    const v = t.trim();
    if (!v) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: v }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "ai",
          text: "Понял. Соберу варианты с оценкой эффекта и стоимости и покажу предпросмотр — без изменений в продакшене.",
        },
      ]);
    }, 1100);
  };

  return (
    <section aria-labelledby="ai-title" className="flex h-full flex-col">
      <header className="flex h-[72px] shrink-0 items-center gap-3 border-b border-line px-5">
        <span className="flex size-9 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
          <Sparkles className="size-[18px]" fill="currentColor" strokeWidth={1.2} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="ai-title" className="text-body-sm font-semibold">
            AI-архитектор
          </h2>
          <p className="flex items-center gap-1.5 text-micro text-ink-2">
            <span className="size-1.5 rounded-full bg-success" /> Онлайн · видит весь проект
          </p>
        </div>
        <IconButton label="Скрыть AI-архитектора (⌘J)" size="sm" onClick={onClose}>
          <X />
        </IconButton>
      </header>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease }}
            className="flex flex-col gap-3"
          >
            <p className="max-w-[92%] rounded-[16px] rounded-tl-[6px] bg-subtle px-4 py-3 text-body-sm text-ink">
              Роман, нашёл 3 возможности для роста. Отметьте, что показать в предпросмотре:
            </p>
            <Recommendations />
            <p className="text-micro text-ink-3">Оценки — ориентировочные, не гарантия результата.</p>
          </motion.div>

          <AnimatePresence initial={false}>
            {msgs.map((m) => (
              <motion.p
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.base, ease }}
                className={cn(
                  "max-w-[85%] rounded-[16px] px-4 py-3 text-body-sm",
                  m.from === "me"
                    ? "self-end rounded-tr-[6px] bg-accent text-white"
                    : "self-start rounded-tl-[6px] bg-subtle text-ink",
                )}
              >
                {m.text}
              </motion.p>
            ))}
            {typing && (
              <motion.span
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-fit gap-1 rounded-[16px] rounded-tl-[6px] bg-subtle px-4 py-3.5"
                aria-label="AI печатает"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-ink-3"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="shrink-0 border-t border-line p-4">
        {msgs.length === 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {quick.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-line px-3 py-1.5 text-micro font-medium text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
          className="flex items-end gap-1 rounded-[16px] border border-line bg-surface p-1.5 transition-[border-color,box-shadow] focus-within:border-accent/50 focus-within:ring-4 focus-within:ring-accent-ring"
        >
          <IconButton label="Прикрепить файл" size="sm">
            <Paperclip />
          </IconButton>
          <label htmlFor="ai-input" className="sr-only">
            Сообщение AI-архитектору
          </label>
          <textarea
            id="ai-input"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(text);
              }
            }}
            placeholder="Спросите или попросите изменить…"
            className="max-h-32 min-h-8 flex-1 resize-none bg-transparent py-1.5 text-body-sm outline-none placeholder:text-ink-3"
          />
          <button
            type="submit"
            aria-label="Отправить"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-[10px] transition-colors",
              text.trim() ? "bg-accent text-white hover:bg-accent-hover" : "bg-subtle text-ink-3",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
