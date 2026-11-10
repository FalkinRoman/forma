"use client";

import { BASE } from "@/lib/base";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { roadmap } from "@/lib/mock";

export function Roadmap({ className }: { className?: string }) {
  const currentIdx = roadmap.findIndex((s) => s.state === "current");
  const progress = currentIdx / (roadmap.length - 1);

  return (
    <section aria-labelledby="roadmap-title" className={cn("@container min-w-0 rounded-card border border-line bg-surface p-5 shadow-card sm:p-6", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="roadmap-title" className="flex items-center gap-2.5 text-h3 font-semibold">
          <TrendingUp className="size-5" strokeWidth={1.75} />
          Дорожная карта развития
        </h2>
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-caption text-ink-2">
          <Sparkles className="size-3.5 text-accent" fill="currentColor" />
          Цель: ×3 к выручке за 6 месяцев
        </span>
      </header>

      <div className="mt-8 hidden @2xl:block">
        <ol className="relative grid grid-cols-7">
          {/* линия прогресса */}
          <span className="absolute top-3 right-[7.14%] left-[7.14%] h-0.5 rounded-full bg-line" aria-hidden />
          <motion.span
            className="absolute top-3 left-[7.14%] h-0.5 origin-left rounded-full bg-linear-to-r from-success to-accent"
            style={{ width: `${progress * 85.72}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            aria-hidden
          />
          {roadmap.map((s, i) => (
            <li key={s.id} className="relative flex flex-col items-center gap-2.5 text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease, delay: 0.2 + i * 0.07 }}
                className={cn(
                  "relative z-10 flex size-6 items-center justify-center rounded-full text-micro font-semibold",
                  s.state === "done" && "bg-success text-white",
                  s.state === "current" && "bg-accent text-white ring-4 ring-accent-soft",
                  s.state === "todo" && "border-[1.5px] border-line-strong bg-surface text-ink-2",
                )}
              >
                {s.state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : s.id}
              </motion.span>
              <span
                className={cn(
                  "px-1 text-caption leading-tight",
                  s.state === "current" ? "font-semibold text-accent" : s.state === "done" ? "text-ink" : "text-ink-2",
                )}
              >
                {s.label}
                <span className="sr-only">
                  {s.state === "done" ? " — завершено" : s.state === "current" ? " — текущий этап" : " — впереди"}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Узкая ширина: вертикальный список вместо слипающихся подписей */}
      <ol className="mt-6 flex flex-col @2xl:hidden">
        {roadmap.map((s, i) => (
          <li key={s.id} className="relative flex items-center gap-3 pb-4 last:pb-0">
            {i < roadmap.length - 1 && (
              <span
                className={cn("absolute top-6 bottom-0 left-3 w-0.5 -translate-x-1/2", s.state === "done" ? "bg-success" : "bg-line")}
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-micro font-semibold",
                s.state === "done" && "bg-success text-white",
                s.state === "current" && "bg-accent text-white ring-4 ring-accent-soft",
                s.state === "todo" && "border-[1.5px] border-line-strong bg-surface text-ink-2",
              )}
            >
              {s.state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : s.id}
            </span>
            <span className={cn("text-body-sm", s.state === "current" ? "font-semibold text-accent" : s.state === "done" ? "text-ink" : "text-ink-2")}>
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function NextStageCard({ className }: { className?: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex min-h-[152px] flex-col justify-end overflow-hidden rounded-card border border-line bg-surface p-5 shadow-card sm:p-6",
        className,
      )}
    >
      {/* фото справа, мягко растворяется к тексту */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BASE + "/images/next-stage.jpg"}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[46%] object-cover transition-transform duration-500 ease-soft [mask-image:linear-gradient(to_right,transparent,black_45%)] group-hover:scale-[1.04]"
      />
      <span className="relative text-micro text-ink-2">Следующий этап</span>
      <span className="relative mt-1 text-[22px] leading-tight font-semibold tracking-[-0.015em]">Масштабирование</span>
      <span className="relative mt-1 max-w-[52%] text-caption text-ink-2">Новые товары, каналы продаж и регионы</span>
      <span className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-raised backdrop-blur transition-transform duration-200 group-hover:translate-x-0.5">
        <ArrowRight className="size-5" />
      </span>
    </motion.a>
  );
}
