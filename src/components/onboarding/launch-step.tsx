"use client";

import { ArrowRight, CircleCheck, Eye, Globe, LoaderCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Stepper } from "./start-flow";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PaymentMarks } from "@/components/ui/payment-marks";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

// [в процессе, готово] — глагол меняется, когда шаг завершён
const tasks: [string, string][] = [
  ["Создаю общую базу: клиенты, заказы, товары", "Общая база создана: клиенты, заказы, товары"],
  ["Собираю сайт-магазин", "Сайт-магазин собран"],
  ["Собираю Telegram Mini App", "Telegram Mini App собран"],
  ["Настраиваю CRM для команды", "CRM для команды настроена"],
  ["Проверяю оформление заказа и оплату в тестовом режиме", "Оформление заказа и оплата проверены"],
  ["Проверяю скорость и безопасность", "Скорость и безопасность проверены"],
];

export function LaunchStep() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (done >= tasks.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 900);
    return () => clearTimeout(t);
  }, [done]);
  const ready = done >= tasks.length;

  return (
    <div className="flex flex-col items-center">
      <Stepper index={3} />
      <h1 className="mt-8 text-center text-[28px] leading-tight font-bold tracking-[-0.02em] sm:text-h1">
        {ready ? "Всё собрано и проверено" : "Собираем вашу экосистему"}
      </h1>
      <p className="mt-3 max-w-xl text-center text-body text-ink-2" aria-live="polite">
        {ready
          ? "Продукты работают в тестовой среде. Клиенты увидят их только после вашей публикации."
          : "Обычно это занимает несколько минут. Можно закрыть страницу — пришлём уведомление."}
      </p>

      <div className="mt-10 grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-panel border border-line bg-surface p-5 shadow-card sm:p-6" aria-label="Ход сборки">
          <div className="mb-4 flex items-center justify-between text-body-sm">
            <span className="font-medium">Готово {done} из {tasks.length}</span>
            <span className="text-ink-2 tabular">{Math.round((done / tasks.length) * 100)}%</span>
          </div>
          <Progress value={done} max={tasks.length} tone={ready ? "success" : "accent"} label="Прогресс сборки" />
          <ol className="mt-5 flex flex-col gap-3">
            {tasks.map((t, i) => {
              const state = i < done ? "done" : i === done ? "active" : "wait";
              return (
                <motion.li
                  key={t[0]}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: duration.slow, ease, delay: i * 0.04 }}
                  className="flex items-center gap-3 text-body-sm"
                >
                  {state === "done" ? (
                    <CircleCheck className="size-5 shrink-0 text-success" />
                  ) : state === "active" ? (
                    <LoaderCircle className="size-5 shrink-0 animate-spin text-accent" />
                  ) : (
                    <span className="size-5 shrink-0 rounded-full border-2 border-line-strong" />
                  )}
                  <span className={cn(state === "wait" ? "text-ink-3" : "text-ink")}>{state === "done" ? t[1] : t[0]}</span>
                </motion.li>
              );
            })}
          </ol>
        </section>

        <section className={cn("flex flex-col gap-3 transition-opacity duration-300", !ready && "pointer-events-none opacity-50")} aria-label="Перед публикацией">
          <h2 className="text-h3 font-semibold">Перед публикацией</h2>
          <div className="flex items-start gap-3 rounded-card border border-line bg-surface p-4 shadow-card">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle text-ink-2"><Globe className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-semibold">Домен</p>
              <p className="text-caption text-ink-2">Пока работает на delikatesy.forma.app</p>
              <Button variant="secondary" size="sm" className="mt-2">Подключить свой</Button>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-card border border-line bg-surface p-4 shadow-card">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-subtle text-ink-2"><CreditCard className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-semibold">Оплата</p>
              <p className="mb-2 text-caption text-ink-2">Работает в тестовом режиме</p>
              <PaymentMarks />
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <Link href="/products/site" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              <Eye /> Открыть предпросмотр
            </Link>
            <Link href="/overview" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Перейти в кабинет <ArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
