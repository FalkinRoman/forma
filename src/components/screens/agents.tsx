"use client";

import { Bot, Check, CircleCheck, Clock, Megaphone, Package, ShieldCheck, ShoppingCart, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { agents as initial, agentLog, type Agent } from "@/lib/data";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon3D } from "@/components/ui/icon-3d";
import { Progress } from "@/components/ui/progress";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/status";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

const agentIcon: Record<string, LucideIcon> = { support: Bot, sales: ShoppingCart, marketing: Megaphone, stock: Package };
const modeMeta = {
  auto: { label: "Сам", cls: "bg-success-soft text-success" },
  approve: { label: "С вашего согласия", cls: "bg-warning-soft text-warning" },
  off: { label: "Запрещено", cls: "bg-subtle text-ink-3" },
};

export function AgentsScreen() {
  const toast = useToast();
  const [list, setList] = useState<Agent[]>(initial);
  const [log, setLog] = useState(agentLog);
  const [open, setOpen] = useState<Agent | null>(null);
  const pending = log.filter((l) => l.needsApproval);

  const decide = (i: number, ok: boolean) => {
    const item = log[i];
    setLog((l) => l.map((x, k) => (k === i ? { ...x, needsApproval: false, text: `${x.text} — ${ok ? "одобрено" : "отклонено"}` } : x)));
    toast({ kind: ok ? "success" : "pending", title: ok ? "Одобрено" : "Отклонено", description: `${item.agent}: ${ok ? "действие выполнено" : "агент учтёт решение"}` });
  };

  return (
    <Page>
      <PageHeader
        title="AI-агенты"
        description="Агенты работают за вас в рамках прав и бюджета, которые вы задали. Платежи, скидки и рассылки — только с вашего согласия."
      />

      {pending.length > 0 && (
        <section aria-labelledby="pending-title" className="rounded-panel border border-warning/25 bg-warning-soft/50 p-4 sm:p-5">
          <h2 id="pending-title" className="mb-3 flex items-center gap-2 text-body-sm font-semibold text-ink">
            <Clock className="size-4 text-warning" /> Ждут вашего решения <Badge tone="dark">{pending.length}</Badge>
          </h2>
          <ul className="flex flex-col gap-2">
            {log.map((l, i) =>
              l.needsApproval ? (
                <li key={i} className="flex flex-col gap-3 rounded-[18px] bg-surface p-4 shadow-xs sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-micro text-ink-3">{l.agent} · {l.time}</p>
                    <p className="text-body-sm text-ink">{l.text}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" leftIcon={<X />} onClick={() => decide(i, false)}>Отклонить</Button>
                    <Button size="sm" variant="primary" leftIcon={<Check />} onClick={() => decide(i, true)}>Одобрить</Button>
                  </div>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-2">
        {list.map((a) => (
          <article key={a.id} className={cn("flex flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-opacity", !a.enabled && "opacity-70")}>
            <div className="flex items-start gap-4">
              <Icon3D icon={agentIcon[a.id] ?? Bot} tone={a.tone} size={48} />
              <div className="min-w-0 flex-1">
                <h2 className="text-h3 font-semibold text-ink">{a.name}</h2>
                <p className="text-caption text-ink-2">{a.role}</p>
              </div>
              <Switch
                checked={a.enabled}
                aria-label={`${a.enabled ? "Выключить" : "Включить"} агента «${a.name}»`}
                onCheckedChange={(v) => {
                  setList((l) => l.map((x) => (x.id === a.id ? { ...x, enabled: v } : x)));
                  toast({ kind: "success", title: `Агент «${a.name}» ${v ? "включён" : "на паузе"}` });
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2" aria-label="Сегодня">
              {a.today.map((t) => (
                <div key={t.label} className="rounded-[16px] bg-subtle p-3">
                  <div className="text-micro text-ink-3">{t.label}</div>
                  <div className="mt-0.5 text-body font-semibold tabular">{t.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-micro text-ink-2">
                <span>Бюджет на месяц</span>
                <span className="tabular">{a.budget.used} из {a.budget.limit} кредитов</span>
              </div>
              <Progress value={a.budget.used} max={a.budget.limit} label={`Бюджет агента ${a.name}`} />
            </div>
            <Button variant="secondary" className="mt-5 self-start" leftIcon={<ShieldCheck />} onClick={() => setOpen(a)}>
              Права и лимиты
            </Button>
          </article>
        ))}
      </div>

      <section>
        <SectionTitle>Журнал действий</SectionTitle>
        <ol className="rounded-panel border border-line bg-surface shadow-card">
          {log.map((l, i) => (
            <li key={i} className="flex items-start gap-3 border-b border-line px-5 py-3.5 last:border-0">
              <span className="w-12 shrink-0 pt-0.5 text-caption text-ink-3 tabular">{l.time}</span>
              <span className={cn("mt-0.5", l.needsApproval ? "text-warning" : "text-success")}>
                {l.needsApproval ? <Clock className="size-4" /> : <CircleCheck className="size-4" />}
              </span>
              <p className="min-w-0 flex-1 text-body-sm text-ink">
                <b className="font-semibold">{l.agent}.</b> {l.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Dialog
        side="right"
        open={!!open}
        onClose={() => setOpen(null)}
        title={open ? `Права: ${open.name}` : ""}
        description={open?.description}
        footer={
          <Button
            variant="primary"
            onClick={() => {
              toast({ kind: "success", title: "Права сохранены" });
              setOpen(null);
            }}
          >
            Сохранить
          </Button>
        }
      >
        {open && (
          <div className="flex flex-col gap-5">
            <ul className="flex flex-col gap-2">
              {open.permissions.map((p) => (
                <li key={p.label} className="flex items-center justify-between gap-3 rounded-[16px] border border-line p-3.5">
                  <span className="text-body-sm text-ink">{p.label}</span>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-micro font-medium", modeMeta[p.mode].cls)}>{modeMeta[p.mode].label}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-[16px] bg-subtle p-4 text-caption text-ink-2">
              Канал: {open.channel}. Агент не может менять цены, оформлять возвраты и тратить деньги без вашего подтверждения.
            </div>
          </div>
        )}
      </Dialog>
    </Page>
  );
}
