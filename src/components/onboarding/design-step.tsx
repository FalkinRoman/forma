"use client";

import { ArrowLeft, ArrowRight, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";
import { Stepper } from "./start-flow";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

/** Концепции стиля БИЗНЕСА клиента (не оболочки FORMA) — у каждой свой цвет и шрифт. */
const concepts = [
  {
    id: "warm",
    name: "Тёплый гастроном",
    mood: "Уют, крафт, натуральные продукты",
    bg: "#f6efe6",
    surface: "#fffaf3",
    ink: "#3b2a1e",
    accent: "#b4532a",
    font: "Georgia, 'Times New Roman', serif",
    fontName: "Антиква + гротеск",
  },
  {
    id: "clean",
    name: "Чистый минимализм",
    mood: "Свежо, светло, много воздуха",
    bg: "#f3f5f4",
    surface: "#ffffff",
    ink: "#18201c",
    accent: "#2f7d5b",
    font: "var(--font-sans)",
    fontName: "Современный гротеск",
  },
  {
    id: "night",
    name: "Ночной деликатес",
    mood: "Премиально, контрастно, вечерний ужин",
    bg: "#15161b",
    surface: "#202229",
    ink: "#f4efe6",
    accent: "#d9a54a",
    font: "Georgia, 'Times New Roman', serif",
    fontName: "Элегантная антиква",
  },
];

function PhoneMock({ c }: { c: (typeof concepts)[number] }) {
  return (
    <div className="mx-auto w-[150px] rounded-[30px] border-[5px] border-[#1d1f24] bg-[#1d1f24] shadow-raised">
      <div className="overflow-hidden rounded-[25px]" style={{ background: c.bg, color: c.ink }}>
        <div className="mx-auto mt-1.5 h-3 w-12 rounded-full bg-[#1d1f24]" />
        <div className="p-3">
          <div className="text-[13px] leading-tight font-bold" style={{ fontFamily: c.font }}>Деликатесы</div>
          <div className="mt-1 text-[8px] opacity-60">Доставка за 90 минут</div>
          <div className="mt-2.5 h-16 rounded-[12px]" style={{ background: `linear-gradient(135deg, ${c.accent}33, ${c.accent}99)` }} />
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-[10px] p-1.5" style={{ background: c.surface }}>
                <div className="h-7 rounded-[7px]" style={{ background: `${c.accent}${i % 2 ? "26" : "40"}` }} />
                <div className="mt-1 h-1 w-3/4 rounded-full opacity-40" style={{ background: c.ink }} />
              </div>
            ))}
          </div>
          <div className="mt-2.5 rounded-full py-1.5 text-center text-[8px] font-semibold text-white" style={{ background: c.accent }}>
            В корзину
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignStep() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  const [going, setGoing] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <Stepper index={2} />
      <h1 className="mt-8 text-center text-[28px] leading-tight font-bold tracking-[-0.02em] text-balance sm:text-h1">Выберите стиль вашего бренда</h1>
      <p className="mt-3 max-w-xl text-center text-body text-ink-2">
        Стиль применится к сайту и Mini App. Цвета, шрифт и детали можно поменять потом — в любой момент.
      </p>

      <div role="radiogroup" aria-label="Дизайн-концепции" className="mt-10 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {concepts.map((c, i) => {
          const on = picked === c.id;
          return (
            <motion.button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPicked(c.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease, delay: i * 0.06 }}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-card border bg-surface text-left shadow-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5",
                "focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:outline-none",
                on ? "border-accent shadow-[0_0_0_4px_var(--color-accent-soft)]" : "border-line hover:border-line-strong",
              )}
            >
              <div className="py-7" style={{ background: `linear-gradient(180deg, ${c.bg}, ${c.bg}cc)` }}>
                <PhoneMock c={c} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-h3 font-semibold">{c.name}</h2>
                    <p className="text-caption text-ink-2">{c.mood}</p>
                  </div>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                      on ? "border-accent bg-accent text-white" : "border-line-strong text-transparent",
                    )}
                    aria-hidden
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  {[c.bg, c.surface, c.ink, c.accent].map((col) => (
                    <span key={col} className="size-6 rounded-full border border-black/10" style={{ background: col }} />
                  ))}
                  <span className="ml-auto text-micro text-ink-3">{c.fontName}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft /> Назад к плану
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" leftIcon={<RefreshCw />}>Ещё варианты</Button>
          <Button
            size="lg"
            rightIcon={<ArrowRight />}
            disabled={!picked}
            loading={going}
            onClick={() => {
              setGoing(true);
              setTimeout(() => router.push("/onboarding/launch"), 600);
            }}
          >
            {picked ? "Утвердить стиль" : "Выберите вариант"}
          </Button>
        </div>
      </div>
    </div>
  );
}
