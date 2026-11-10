"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUp,
  Bot,
  CreditCard,
  Globe,
  Layers,
  Mic,
  Paperclip,
  PencilLine,
  Send,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { Button, IconButton } from "@/components/ui/button";
import { Chip } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/switch";

const examples = [
  "Доставка деликатесов по Москве, заказы через Telegram",
  "Кофейня с предзаказом и программой лояльности",
  "Барбершоп с онлайн-записью и напоминаниями",
  "Магазин одежды: сайт, склад и курьеры",
];

type Step = "idea" | "thinking" | "plan";

const steps: { key: Step | "design" | "launch"; label: string }[] = [
  { key: "idea", label: "Идея" },
  { key: "plan", label: "План" },
  { key: "design", label: "Дизайн" },
  { key: "launch", label: "Запуск" },
];

type Module = { id: string; icon: LucideIcon; title: string; why: string; on: boolean; tag?: string };

const initialModules: Module[] = [
  { id: "site", icon: Globe, title: "Сайт-магазин", why: "Каталог и заказы из поиска и рекламы", on: true },
  { id: "miniapp", icon: Send, title: "Telegram Mini App", why: "Заказ в два касания там, где уже ваши клиенты", on: true },
  { id: "crm", icon: Layers, title: "CRM / Админка", why: "Все заказы, клиенты и товары в одном месте", on: true },
  { id: "pay", icon: CreditCard, title: "Онлайн-оплата", why: "ЮKassa или СБП — подключим с вашего согласия", on: true },
  { id: "courier", icon: Truck, title: "Приложение курьера", why: "Маршруты и статусы доставки", on: false, tag: "Можно позже" },
  { id: "agent", icon: Bot, title: "AI-агент поддержки", why: "Отвечает на частые вопросы 24/7", on: false, tag: "Можно позже" },
];

const thinkingLines = ["Определяю тип бизнеса", "Подбираю модули", "Связываю данные: клиенты, заказы, товары"];

export function Stepper({ current, index }: { current?: Step; index?: number }) {
  const idx = index ?? (current === "idea" || current === "thinking" ? 0 : 1);
  return (
    <ol className="flex items-center justify-center gap-2" aria-label="Шаги создания">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1.5 text-caption font-medium transition-colors duration-200",
              i === idx ? "text-ink" : i < idx ? "text-success" : "text-ink-3",
            )}
            aria-current={i === idx ? "step" : undefined}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-micro font-semibold transition-colors duration-200",
                i === idx ? "bg-ink text-white" : i < idx ? "bg-success-soft text-success" : "bg-subtle text-ink-3",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden min-[420px]:inline">{s.label}</span>
          </span>
          {i < steps.length - 1 && <span className="h-px w-5 bg-line-strong sm:w-8" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

export function StartFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("idea");
  const [text, setText] = useState("");
  const [modules, setModules] = useState(initialModules);
  const [geo, setGeo] = useState<string | null>("city");
  const [building, setBuilding] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);

  // авто-высота поля для длинных описаний
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [text]);

  useEffect(() => {
    if (step !== "thinking") return;
    const t = setTimeout(() => setStep("plan"), 2100);
    return () => clearTimeout(t);
  }, [step]);

  const submit = () => {
    if (!text.trim()) {
      area.current?.focus();
      return;
    }
    setStep("thinking");
  };

  const activeCount = modules.filter((m) => m.on).length;

  return (
    <div className="w-full">
      <Stepper current={step} />

      <div className="relative mt-6">
        <AnimatePresence mode="wait" initial={false}>
          {step === "idea" && (
            <motion.div
              key="idea"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: duration.base } }}
              transition={{ duration: duration.slow, ease }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="group rounded-panel border border-line bg-surface p-2 shadow-raised transition-[border-color,box-shadow] duration-200 focus-within:border-accent/40 focus-within:shadow-[0_0_0_4px_var(--color-accent-soft),0_12px_32px_rgb(16_24_40/0.08)]"
              >
                <label htmlFor="idea" className="sr-only">
                  Расскажите о своём бизнесе
                </label>
                <textarea
                  id="idea"
                  ref={area}
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="Например: доставляем фермерские продукты по Москве, заказы сейчас принимаем в Telegram и по телефону…"
                  className="block min-h-[96px] w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-body text-ink outline-none placeholder:text-ink-3 sm:text-[17px]"
                />
                <div className="flex items-center gap-1 px-1.5 pb-1">
                  <Button variant="ghost" size="sm" leftIcon={<Paperclip />} className="text-ink-2">
                    <span className="hidden sm:inline">Файлы и референсы</span>
                    <span className="sm:hidden">Файлы</span>
                  </Button>
                  <IconButton label="Надиктовать голосом" size="sm">
                    <Mic />
                  </IconButton>
                  <span className="ml-auto hidden text-micro text-ink-3 sm:inline">Enter — отправить</span>
                  <motion.button
                    type="submit"
                    aria-label="Продолжить"
                    whileTap={{ scale: 0.92 }}
                    className={cn(
                      "ml-2 flex size-10 items-center justify-center rounded-btn transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
                      text.trim() ? "bg-accent text-white hover:bg-accent-hover" : "bg-subtle text-ink-3",
                    )}
                  >
                    <ArrowUp className="size-5" />
                  </motion.button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {examples.map((ex) => (
                  <Chip key={ex} as="button" onClick={() => {
                      setText(ex);
                      area.current?.focus();
                    }} selected={text === ex} className="h-9">
                    {ex}
                  </Chip>
                ))}
              </div>
            </motion.div>
          )}

          {step === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: duration.base } }}
              transition={{ duration: duration.slow, ease }}
              className="flex flex-col items-center rounded-panel border border-line bg-surface px-6 py-10 shadow-raised"
              role="status"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="flex size-12 items-center justify-center rounded-[16px] bg-accent-soft text-accent"
              >
                <Sparkles className="size-6" fill="currentColor" strokeWidth={1.2} />
              </motion.span>
              <p className="mt-4 text-h3 font-semibold">Проектирую вашу систему</p>
              <ul className="mt-4 flex flex-col gap-2">
                {thinkingLines.map((l, i) => (
                  <motion.li
                    key={l}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.55, duration: duration.slow, ease }}
                    className="flex items-center gap-2 text-body-sm text-ink-2"
                  >
                    <span className="size-1.5 rounded-full bg-accent" /> {l}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {step === "plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease }}
              className="rounded-panel border border-line bg-surface p-5 text-left shadow-raised sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-micro font-medium text-accent">План экосистемы</p>
                  <h2 className="mt-1 text-h2 font-semibold">Предлагаю начать с {activeCount} модулей</h2>
                  <p className="mt-1 text-body-sm text-ink-2">
                    Все работают на общих данных. Лишнее можно убрать, недостающее — добавить позже.
                  </p>
                </div>
                <Button variant="ghost" size="sm" leftIcon={<PencilLine />} onClick={() => setStep("idea")} className="shrink-0">
                  <span className="hidden sm:inline">Изменить описание</span>
                </Button>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {modules.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: duration.slow, ease, delay: 0.05 * i }}
                    >
                      <label
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-[16px] border p-3.5 transition-colors duration-150",
                          m.on ? "border-accent/30 bg-accent-soft/40" : "border-line hover:bg-subtle",
                        )}
                      >
                        <Checkbox
                          className="mt-0.5"
                          checked={m.on}
                          label={m.title}
                          onChange={(v) => setModules((s) => s.map((x) => (x.id === m.id ? { ...x, on: v } : x)))}
                        />
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-surface">
                          <Icon className="size-[18px]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-1.5 text-body-sm font-semibold">
                            {m.title}
                            {m.tag && !m.on && (
                              <span className="rounded-full bg-subtle px-2 py-0.5 text-micro font-medium text-ink-2">{m.tag}</span>
                            )}
                          </span>
                          <span className="block text-caption text-ink-2">{m.why}</span>
                        </span>
                      </label>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 rounded-[16px] bg-subtle p-4">
                <p className="text-body-sm font-medium">Уточню одно: где вы доставляете?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { v: "city", l: "В пределах города" },
                    { v: "region", l: "Город и область" },
                    { v: "russia", l: "По всей России" },
                    { v: "pickup", l: "Только самовывоз" },
                  ].map((o) => (
                    <Chip key={o.v} as="button" selected={geo === o.v} onClick={() => setGeo(o.v)}>
                      {o.l}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-micro text-ink-3">Ничего не публикуется без вашего подтверждения</p>
                <Button
                  size="lg"
                  rightIcon={<ArrowRight />}
                  loading={building}
                  disabled={activeCount === 0}
                  onClick={() => {
                    setBuilding(true);
                    setTimeout(() => router.push("/onboarding/design"), 700);
                  }}
                >
                  Собрать экосистему
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
