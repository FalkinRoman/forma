"use client";

import { Bike, CircleCheck, MapPin, Plus, User, Search, ShoppingBag, Timer, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { orders as allOrders, orderStatusMeta, type Order, type OrderStatus } from "@/lib/data";
import { Page, PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { Status, Badge } from "@/components/ui/status";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Kpi } from "@/components/ui/kpi";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/toast";

type Filter = "active" | OrderStatus | "all";

const next: Partial<Record<OrderStatus, { to: OrderStatus; label: string }>> = {
  new: { to: "assembling", label: "Принять в сборку" },
  assembling: { to: "delivering", label: "Передать курьеру" },
  delivering: { to: "done", label: "Отметить доставленным" },
};

export function OrdersScreen() {
  const toast = useToast();
  const [list, setList] = useState<Order[]>(allOrders);
  const [filter, setFilter] = useState<Filter>("active");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Order | null>(null);

  const count = (s: OrderStatus) => list.filter((o) => o.status === s).length;
  const shown = useMemo(
    () =>
      list.filter((o) => {
        const byStatus =
          filter === "all" ? true : filter === "active" ? !["done", "canceled"].includes(o.status) : o.status === filter;
        const byQ = !q || `${o.id} ${o.client} ${o.items}`.toLowerCase().includes(q.toLowerCase());
        return byStatus && byQ;
      }),
    [list, filter, q],
  );

  const advance = (o: Order) => {
    const n = next[o.status];
    if (!n) return;
    setList((l) => l.map((x) => (x.id === o.id ? { ...x, status: n.to, courier: n.to === "delivering" ? "Илья К." : x.courier } : x)));
    setOpen((cur) => (cur && cur.id === o.id ? { ...cur, status: n.to } : cur));
    toast({ kind: "success", title: `Заказ №${o.id}: ${orderStatusMeta[n.to].label.toLowerCase()}`, description: "Клиент получил уведомление в Telegram" });
  };

  return (
    <Page>
      <PageHeader
        title="Заказы"
        description="Все заказы с сайта, Mini App, бота и телефона в одном списке."
        actions={<Button variant="primary" leftIcon={<Plus />}>Новый заказ</Button>}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 @3xl:grid-cols-4">
        <Kpi icon={<ShoppingBag />} label="Новые" value={String(count("new"))} />
        <Kpi icon={<Timer />} label="В сборке" value={String(count("assembling"))} />
        <Kpi icon={<Bike />} label="В пути" value={String(count("delivering"))} />
        <Kpi icon={<Wallet />} label="Выручка сегодня" value="₽48 600" delta={14} />
      </div>

      <section className="rounded-panel border border-line bg-surface shadow-card">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <Segmented<Filter>
            ariaLabel="Статус заказов"
            value={filter}
            onChange={setFilter}
            className="max-w-full overflow-x-auto"
            items={[
              { value: "active", label: "В работе", badge: <Badge tone="neutral">{list.filter((o) => !["done", "canceled"].includes(o.status)).length}</Badge> },
              { value: "new", label: "Новые" },
              { value: "done", label: "Доставлены" },
              { value: "all", label: "Все" },
            ]}
          />
          <div className="w-full sm:max-w-[280px]">
            <Input icon={<Search />} placeholder="Номер, клиент или товар" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск заказа" />
          </div>
        </div>

        {shown.length === 0 ? (
          <EmptyState icon={<Search />} title="Ничего не нашли" description="Попробуйте другой номер или имя клиента, либо выберите «Все»." />
        ) : (
          <>
          {/* телефон: карточки вместо таблицы — сумма и статус всегда видны */}
          <ul className="md:hidden">
            {shown.map((o) => (
              <li key={o.id} className="border-t border-line">
                <button type="button" onClick={() => setOpen(o)} className="flex w-full items-start gap-3 px-4 py-3.5 text-left active:bg-subtle">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-ink tabular">№{o.id}</span>
                      <span className="truncate text-body-sm text-ink">{o.client}</span>
                    </div>
                    <p className="mt-0.5 truncate text-caption text-ink-2">{o.items}</p>
                    <p className="mt-0.5 text-micro text-ink-3">{o.time} · {o.channel}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="font-semibold whitespace-nowrap tabular">{o.total}</span>
                    <Status kind={orderStatusMeta[o.status].kind} pill>{orderStatusMeta[o.status].label}</Status>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
          <Table>
            <thead>
              <tr>
                <Th>Заказ</Th>
                <Th>Клиент</Th>
                <Th className="hidden lg:table-cell">Состав</Th>
                <Th className="hidden md:table-cell">Канал</Th>
                <Th className="text-right">Сумма</Th>
                <Th>Статус</Th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <Tr key={o.id} interactive tabIndex={0} onClick={() => setOpen(o)} onKeyDown={(e) => e.key === "Enter" && setOpen(o)}>
                  <Td>
                    <span className="font-semibold text-ink tabular">№{o.id}</span>
                    <span className="block text-micro whitespace-nowrap text-ink-3">{o.time}</span>
                  </Td>
                  <Td className="max-w-[160px] truncate">{o.client}</Td>
                  <Td className="hidden max-w-[260px] truncate text-ink-2 lg:table-cell">{o.items}</Td>
                  <Td className="hidden text-ink-2 md:table-cell">{o.channel}</Td>
                  <Td className="text-right font-medium whitespace-nowrap tabular">{o.total}</Td>
                  <Td>
                    <Status kind={orderStatusMeta[o.status].kind} pill>
                      {orderStatusMeta[o.status].label}
                    </Status>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          </div>
          </>
        )}
      </section>

      <Dialog
        side="right"
        open={!!open}
        onClose={() => setOpen(null)}
        title={open ? `Заказ №${open.id}` : ""}
        description={open ? `${open.time} · ${open.channel}` : undefined}
        footer={
          open && next[open.status] ? (
            <Button variant="primary" className="w-full sm:w-auto" onClick={() => advance(open)}>
              {next[open.status]!.label}
            </Button>
          ) : undefined
        }
      >
        {open && (
          <div className="flex flex-col gap-5">
            <Status kind={orderStatusMeta[open.status].kind} pill className="self-start">
              {orderStatusMeta[open.status].label}
            </Status>
            <dl className="grid gap-4 rounded-[20px] bg-subtle p-4 text-body-sm">
              <Row icon={<User />} label="Клиент" value={open.client} />
              <Row icon={<MapPin />} label="Адрес" value={open.address} />
              <Row icon={<Wallet />} label="Оплата" value={`${open.total} · ${open.payment}`} />
              {open.courier && <Row icon={<Bike />} label="Курьер" value={open.courier} />}
            </dl>
            <div>
              <h3 className="mb-2 text-caption font-medium text-ink-2">Состав</h3>
              <p className="text-body-sm text-ink">{open.items}</p>
            </div>
            <ol className="flex flex-col gap-3" aria-label="История заказа">
              {(["new", "assembling", "delivering", "done"] as OrderStatus[]).map((s, i) => {
                const order = ["new", "assembling", "delivering", "done"];
                const reached = order.indexOf(open.status) >= i && open.status !== "canceled";
                return (
                  <li key={s} className="flex items-center gap-3 text-body-sm">
                    <span className={reached ? "text-success" : "text-line-strong"}>
                      <CircleCheck className="size-5" />
                    </span>
                    <span className={reached ? "text-ink" : "text-ink-3"}>{orderStatusMeta[s].label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </Dialog>
    </Page>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-ink-3 [&_svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <dt className="text-micro text-ink-3">{label}</dt>
        <dd className="text-ink">{value}</dd>
      </div>
    </div>
  );
}
