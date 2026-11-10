"use client";

import { ChartColumn, Check, KeyRound, Mail, Package, Plug, Search, ShieldCheck, Store, Truck, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { integrations as initial, type Integration } from "@/lib/data";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { Dialog } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/switch";
import { PaymentMark } from "@/components/ui/payment-marks";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/toast";

const cats = ["Оплата", "Доставка", "Учёт и склад", "Каналы продаж", "Маркетинг", "Аналитика"] as const;
const catIcon: Record<Integration["category"], LucideIcon> = {
  Оплата: Plug,
  Доставка: Truck,
  "Учёт и склад": Package,
  "Каналы продаж": Store,
  Маркетинг: Mail,
  Аналитика: ChartColumn,
};

function Mark({ i }: { i: Integration }) {
  if (i.brand) return <PaymentMark brand={i.brand} size={44} />;
  // Официального знака в проекте нет — нейтральная иконка категории, без имитации чужого логотипа
  const Icon = catIcon[i.category];
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] border border-line bg-surface text-ink-2 shadow-xs">
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  );
}

export function IntegrationsScreen() {
  const toast = useToast();
  const [list, setList] = useState(initial);
  const [tab, setTab] = useState<"connected" | "all">("all");
  const [q, setQ] = useState("");
  const [connect, setConnect] = useState<Integration | null>(null);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);

  const shown = useMemo(
    () => list.filter((i) => (tab === "all" || i.connected) && (!q || `${i.name} ${i.description}`.toLowerCase().includes(q.toLowerCase()))),
    [list, tab, q],
  );

  const doConnect = () => {
    if (!connect) return;
    setBusy(true);
    setTimeout(() => {
      setList((l) => l.map((x) => (x.id === connect.id ? { ...x, connected: true } : x)));
      toast({ kind: "success", title: `${connect.name} подключён`, description: "Проверили соединение тестовым запросом" });
      setBusy(false);
      setConnect(null);
      setAgree(false);
    }, 1100);
  };

  return (
    <Page>
      <PageHeader title="Интеграции" description="Подключайте сервисы через официальные API. Каждое подключение — только с вашим явным согласием." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Segmented
          ariaLabel="Фильтр интеграций"
          value={tab}
          onChange={setTab}
          items={[
            { value: "all", label: "Каталог" },
            { value: "connected", label: `Подключены · ${list.filter((i) => i.connected).length}` },
          ]}
        />
        <div className="w-full sm:max-w-[280px]">
          <Input icon={<Search />} placeholder="Найти сервис" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск сервиса" />
        </div>
      </div>

      {shown.length === 0 && (
        <div className="rounded-panel border border-line bg-surface shadow-card">
          <EmptyState icon={<Plug />} title="Сервис не найден" description="Напишите AI-архитектору — подскажем, как подключить через API или webhook." />
        </div>
      )}

      {cats.map((c) => {
        const items = shown.filter((i) => i.category === c);
        if (!items.length) return null;
        return (
          <section key={c}>
            <SectionTitle>{c}</SectionTitle>
            <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-2 @5xl:grid-cols-3">
              {items.map((i) => (
                <article key={i.id} className="flex items-start gap-4 rounded-card border border-line bg-surface p-5 shadow-card">
                  <Mark i={i} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-body font-semibold text-ink">{i.name}</h3>
                    <p className="mt-0.5 text-caption text-ink-2">{i.description}</p>
                    {i.connected ? (
                      <p className="mt-3 inline-flex items-center gap-1.5 text-caption font-medium text-success">
                        <Check className="size-4" /> Подключено{i.usedBy ? ` · ${i.usedBy}` : ""}
                      </p>
                    ) : (
                      <Button variant="secondary" size="sm" className="mt-3" onClick={() => setConnect(i)}>
                        Подключить
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <Dialog
        open={!!connect}
        onClose={() => !busy && (setConnect(null), setAgree(false))}
        title={connect ? `Подключить ${connect.name}` : ""}
        description="Ключ хранится в защищённом хранилище и не виден ни сотрудникам, ни AI."
        icon={connect ? <Mark i={connect} /> : undefined}
        footer={
          <>
            <Button variant="secondary" disabled={busy} onClick={() => (setConnect(null), setAgree(false))}>Отмена</Button>
            <Button variant="primary" disabled={!agree} loading={busy} onClick={doConnect}>Подключить</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input icon={<KeyRound />} label="Идентификатор магазина" placeholder="Например, 512345" />
          <Input icon={<KeyRound />} label="Секретный ключ" type="password" placeholder="Вставьте ключ из личного кабинета сервиса" hint="Где взять ключ: личный кабинет сервиса → Интеграции → API" />
          <label className="flex cursor-pointer items-start gap-3 rounded-[16px] bg-subtle p-3.5 text-caption text-ink-2">
            <Checkbox checked={agree} onChange={setAgree} label="Согласие на подключение" className="mt-0.5" />
            <span>
              <ShieldCheck className="mr-1 inline size-4 text-success" />
              Разрешаю FORMA передавать в сервис данные заказов, необходимые для его работы.
            </span>
          </label>
        </div>
      </Dialog>
    </Page>
  );
}
