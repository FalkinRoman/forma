"use client";

import { ArrowRight, Check, CircleCheck, FlaskConical, Info, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { hypotheses as initial, type Hypothesis } from "@/lib/data";
import { Page, PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

type F = "new" | "testing" | "applied";
const confTone = { Высокая: "bg-success-soft text-success", Средняя: "bg-warning-soft text-warning", Низкая: "bg-subtle text-ink-2" };

export function ImprovementsScreen() {
  const toast = useToast();
  const [items, setItems] = useState<Hypothesis[]>(initial);
  const [f, setF] = useState<F>("new");
  const [confirm, setConfirm] = useState<Hypothesis | null>(null);
  const shown = items.filter((h) => h.status === f);
  const n = (s: F) => items.filter((h) => h.status === s).length;

  const setStatus = (id: string, status: Hypothesis["status"]) => setItems((l) => l.map((h) => (h.id === id ? { ...h, status } : h)));

  return (
    <Page>
      <PageHeader
        title="Улучшения"
        description="AI находит точки роста в ваших данных. Каждое изменение — с основанием, оценкой и превью. Применяется только после вашего согласия."
      />
      <Segmented<F>
        ariaLabel="Статус гипотез"
        value={f}
        onChange={setF}
        className="max-w-full self-start overflow-x-auto"
        items={[
          { value: "new", label: `Новые · ${n("new")}` },
          { value: "testing", label: `На проверке · ${n("testing")}` },
          { value: "applied", label: `Применены · ${n("applied")}` },
        ]}
      />

      {shown.length === 0 ? (
        <div className="rounded-panel border border-line bg-surface shadow-card">
          <EmptyState icon={<Sparkles />} title="Здесь пока пусто" description="AI проверяет данные каждый день — новые гипотезы появятся здесь." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 @4xl:grid-cols-2">
          {shown.map((h) => (
            <article key={h.id} className="flex flex-col rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-micro">
                <span className="rounded-full bg-subtle px-2.5 py-1 font-medium text-ink-2">{h.product}</span>
                <span className={cn("rounded-full px-2.5 py-1 font-medium", confTone[h.confidence])}>Уверенность: {h.confidence.toLowerCase()}</span>
              </div>
              <h2 className="mt-3 text-h3 font-semibold text-ink">{h.title}</h2>
              <p className="mt-2 flex gap-2 text-body-sm text-ink-2">
                <Info className="mt-0.5 size-4 shrink-0 text-ink-3" />
                {h.basis}
              </p>

              {/* до / после */}
              <div className="mt-4 grid grid-cols-1 items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-[16px] bg-subtle p-3">
                  <div className="text-micro font-medium text-ink-3">Сейчас</div>
                  <p className="mt-1 text-caption text-ink">{h.before}</p>
                </div>
                <ArrowRight className="hidden size-4 self-center text-ink-3 sm:block" />
                <div className="rounded-[16px] bg-accent-soft p-3">
                  <div className="text-micro font-medium text-accent">После</div>
                  <p className="mt-1 text-caption text-ink">{h.after}</p>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                <div>
                  <dt className="text-micro text-ink-3">{h.status === "applied" ? "Результат" : "Оценка эффекта"}</dt>
                  <dd className="text-body-sm font-semibold text-success">{h.effect}</dd>
                </div>
                <div>
                  <dt className="text-micro text-ink-3">Стоимость</dt>
                  <dd className="text-body-sm font-medium text-ink">{h.cost}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                {h.status === "new" && (
                  <>
                    <Button variant="primary" leftIcon={<Check />} onClick={() => setConfirm(h)}>Применить</Button>
                    <Button
                      variant="secondary"
                      leftIcon={<FlaskConical />}
                      onClick={() => {
                        setStatus(h.id, "testing");
                        toast({ kind: "pending", title: "Запущен A/B-тест на 50% посетителей", description: "Итоги — через 7 дней" });
                      }}
                    >
                      Сначала проверить
                    </Button>
                    <Button
                      variant="ghost"
                      leftIcon={<X />}
                      onClick={() => {
                        setStatus(h.id, "dismissed");
                        toast({ kind: "success", title: "Гипотеза скрыта", description: "AI учтёт это в следующих рекомендациях" });
                      }}
                    >
                      Не сейчас
                    </Button>
                  </>
                )}
                {h.status === "testing" && (
                  <p className="flex items-center gap-2 text-caption text-ink-2">
                    <FlaskConical className="size-4 text-warning" /> A/B-тест идёт 3-й день из 7 · промежуточно +4% к среднему чеку
                  </p>
                )}
                {h.status === "applied" && (
                  <p className="flex items-center gap-2 text-caption text-success">
                    <CircleCheck className="size-4" /> Применено 10 ноября · можно откатить в «Продукты → Версии»
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-micro text-ink-3">Оценки эффекта — прогноз AI по вашим данным и похожим магазинам, не гарантия результата.</p>

      <Dialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Применить изменение?"
        description={confirm ? `${confirm.title} — в продукте «${confirm.product}».` : undefined}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(null)}>Отмена</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!confirm) return;
                setStatus(confirm.id, "applied");
                toast({ kind: "pending", title: "AI собирает изменение в staging", description: "Пришлём предпросмотр перед публикацией" });
                setConfirm(null);
              }}
            >
              Собрать и показать превью
            </Button>
          </>
        }
      >
        {confirm && (
          <ul className="flex flex-col gap-2 text-body-sm">
            <li className="flex justify-between gap-3"><span className="text-ink-2">Стоимость</span><b className="font-semibold">{confirm.cost}</b></li>
            <li className="flex justify-between gap-3"><span className="text-ink-2">Остаток кредитов</span><b className="font-semibold">1 760 из 3 000</b></li>
            <li className="flex justify-between gap-3"><span className="text-ink-2">Публикация</span><b className="font-semibold">после вашей проверки</b></li>
          </ul>
        )}
      </Dialog>
    </Page>
  );
}
