"use client";

import { Download, MessageCircle, Plus, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { clients, orders, type Client, type Segment } from "@/lib/data";
import { Page, PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chip } from "@/components/ui/status";
import { Avatar } from "@/components/ui/avatar";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import { useToast } from "@/components/ui/toast";

const segments: { value: Segment | "all"; hint?: string }[] = [
  { value: "all" },
  { value: "VIP", hint: "от ₽100 000 за всё время" },
  { value: "Постоянный", hint: "3 и больше заказов" },
  { value: "Новый", hint: "первый заказ" },
  { value: "Уснувший", hint: "нет заказов 60+ дней" },
];

const segTone: Record<Segment, string> = {
  VIP: "bg-[#f3ecff] text-[#6b3fd6]",
  Постоянный: "bg-accent-soft text-accent",
  Новый: "bg-success-soft text-success",
  Уснувший: "bg-subtle text-ink-2",
};

export function ClientsScreen() {
  const toast = useToast();
  const [seg, setSeg] = useState<Segment | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Client | null>(null);

  const shown = useMemo(
    () => clients.filter((c) => (seg === "all" || c.segment === seg) && (!q || `${c.name} ${c.phone}`.toLowerCase().includes(q.toLowerCase()))),
    [seg, q],
  );
  const sleeping = clients.filter((c) => c.segment === "Уснувший").length;

  return (
    <Page>
      <PageHeader
        title="Клиенты"
        description="Единая база: клиенты сайта, Mini App, бота и CRM собраны без дублей."
        actions={
          <>
            <Button variant="secondary" leftIcon={<Download />}>Импорт</Button>
            <Button variant="primary" leftIcon={<Plus />}>Добавить клиента</Button>
          </>
        }
      />

      {/* Подсказка AI — одна, по делу, с понятным действием */}
      <div className="flex flex-col gap-3 rounded-[24px] border border-accent/15 bg-linear-to-r from-accent-soft to-[#f3ecff] p-4 sm:flex-row sm:items-center sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-accent shadow-xs">
          <Sparkles className="size-5" />
        </span>
        <p className="flex-1 text-body-sm text-ink">
          <b className="font-semibold">{sleeping} клиента давно не заказывали.</b> Агент «Маркетинг» может подготовить для них персональное предложение — отправка только после вашего подтверждения.
        </p>
        <Button
          variant="secondary"
          onClick={() => toast({ kind: "pending", title: "Черновик рассылки готовится", description: "Пришлём на проверку в раздел «AI-агенты»" })}
        >
          Подготовить
        </Button>
      </div>

      <section className="rounded-panel border border-line bg-surface shadow-card">
        <div className="flex flex-col gap-3 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Сегменты">
            {segments.map((s) => (
              <Chip key={s.value} as="button" selected={seg === s.value} onClick={() => setSeg(s.value)} title={s.hint}>
                {s.value === "all" ? "Все" : s.value}
                <span className="tabular opacity-60">
                  {s.value === "all" ? clients.length : clients.filter((c) => c.segment === s.value).length}
                </span>
              </Chip>
            ))}
          </div>
          <div className="w-full lg:max-w-[280px]">
            <Input icon={<Search />} placeholder="Имя или телефон" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Поиск клиента" />
          </div>
        </div>

        {shown.length === 0 ? (
          <EmptyState icon={<Search />} title="Клиент не найден" description="Проверьте имя или последние цифры телефона." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Клиент</Th>
                <Th>Сегмент</Th>
                <Th className="hidden text-right sm:table-cell">Заказов</Th>
                <Th className="hidden text-right md:table-cell">Сумма покупок</Th>
                <Th className="hidden lg:table-cell">Последний заказ</Th>
              </tr>
            </thead>
            <tbody>
              {shown.map((c) => (
                <Tr key={c.id} interactive tabIndex={0} onClick={() => setOpen(c)} onKeyDown={(e) => e.key === "Enter" && setOpen(c)}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size={36} />
                      <div className="min-w-0">
                        <span className="block truncate font-medium text-ink">{c.name}</span>
                        <span className="block text-micro text-ink-3 tabular">{c.phone}</span>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className={cn("rounded-full px-2.5 py-1 text-micro font-medium whitespace-nowrap", segTone[c.segment])}>{c.segment}</span>
                  </Td>
                  <Td className="hidden text-right tabular sm:table-cell">{c.orders}</Td>
                  <Td className="hidden text-right font-medium tabular md:table-cell">{c.ltv}</Td>
                  <Td className="hidden text-ink-2 lg:table-cell">{c.last}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>

      <Dialog
        side="right"
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.name ?? ""}
        description={open ? `${open.phone} · пришёл через ${open.channel}` : undefined}
        footer={
          <>
            <Button variant="secondary" leftIcon={<MessageCircle />}>Написать</Button>
            <Button variant="primary" leftIcon={<ShoppingBag />}>Создать заказ</Button>
          </>
        }
      >
        {open && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Заказов", String(open.orders)],
                ["Сумма", open.ltv],
                ["Последний", open.last],
              ].map(([l, v]) => (
                <div key={l} className="rounded-[18px] bg-subtle p-3">
                  <div className="text-micro text-ink-3">{l}</div>
                  <div className="mt-1 truncate text-body-sm font-semibold text-ink tabular">{v}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-2 text-caption font-medium text-ink-2">Чаще всего берёт</h3>
              <span className="rounded-full bg-subtle px-3 py-1.5 text-caption text-ink">{open.favorite}</span>
            </div>
            <div>
              <h3 className="mb-2 text-caption font-medium text-ink-2">Последние заказы</h3>
              <ul className="divide-y divide-line rounded-[18px] border border-line">
                {orders.slice(0, 3).map((o) => (
                  <li key={o.id} className="flex items-center justify-between gap-3 px-4 py-3 text-body-sm">
                    <span className="min-w-0 truncate text-ink">{o.items}</span>
                    <span className="shrink-0 font-medium tabular">{o.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Dialog>
    </Page>
  );
}
