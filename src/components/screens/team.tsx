"use client";

import { Check, ChevronDown, Minus, Eye, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { rolePermissions, team as initial, type Role } from "@/lib/data";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";

const roles: Role[] = ["Владелец", "Администратор", "Менеджер", "Курьер", "Маркетолог"];

export function TeamScreen() {
  const toast = useToast();
  const [members, setMembers] = useState(initial);
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Менеджер");
  const [err, setErr] = useState("");
  const limit = 5;

  const send = () => {
    if (!/.+@.+\..+/.test(email) && !/^\+?\d[\d\s-]{9,}$/.test(email)) {
      setErr("Введите почту или телефон, например anna@shop.ru");
      return;
    }
    setMembers((m) => [...m, { name: email, email, role, status: "invited", last: "приглашение отправлено" }]);
    toast({ kind: "success", title: "Приглашение отправлено", description: `${email} · роль «${role}»` });
    setInvite(false);
    setEmail("");
    setErr("");
  };

  const full = members.length >= limit;

  return (
    <Page>
      <PageHeader
        title="Команда"
        description="Сотрудники видят только то, что нужно для их роли."
        actions={<Button variant="primary" leftIcon={<UserPlus />} onClick={() => setInvite(true)}>Пригласить</Button>}
      />

      <div className="flex flex-col gap-2 rounded-[20px] border border-line bg-surface p-4 shadow-xs sm:flex-row sm:items-center sm:gap-6">
        <span className="text-body-sm text-ink">
          Участников: <b className="font-semibold tabular">{members.length} из {limit}</b> по тарифу Business
        </span>
        <Progress value={members.length} max={limit} className="sm:max-w-[240px]" label="Использовано мест" />
        {full && <span className="text-caption text-warning">Мест больше нет — новое приглашение потребует тариф Scale</span>}
      </div>

      <section className="rounded-panel border border-line bg-surface shadow-card">
        <Table>
          <thead>
            <tr>
              <Th>Участник</Th>
              <Th>Роль</Th>
              <Th className="hidden md:table-cell">Активность</Th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <Tr key={m.email}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.status === "invited" ? "✉" : m.name} size={36} />
                    <div className="min-w-0">
                      <span className="block truncate font-medium text-ink">{m.name}</span>
                      <span className="block truncate text-micro text-ink-3">{m.email}</span>
                    </div>
                  </div>
                </Td>
                <Td>
                  {m.role === "Владелец" ? (
                    <span className="text-body-sm text-ink">Владелец</span>
                  ) : (
                    <span className="relative inline-flex">
                      <select
                        defaultValue={m.role}
                        aria-label={`Роль: ${m.name}`}
                        onChange={(e) => toast({ kind: "success", title: `${m.name}: роль «${e.target.value}»` })}
                        className="h-9 appearance-none rounded-[12px] border border-line bg-surface pr-8 pl-3 text-body-sm outline-none hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent-ring"
                      >
                        {roles.slice(1).map((r) => <option key={r}>{r}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-ink-2" />
                    </span>
                  )}
                </Td>
                <Td className="hidden text-ink-2 md:table-cell">
                  {m.status === "invited" ? <span className="inline-flex items-center gap-1.5 text-warning"><Mail className="size-4" />{m.last}</span> : m.last}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section>
        <SectionTitle>Что может каждая роль</SectionTitle>
        <div className="rounded-panel border border-line bg-surface shadow-card">
          <Table>
            <thead>
              <tr>
                <Th>Раздел</Th>
                {roles.map((r) => <Th key={r} className="text-center">{r}</Th>)}
              </tr>
            </thead>
            <tbody>
              {rolePermissions.map((p) => (
                <Tr key={p.area}>
                  <Td className="font-medium whitespace-nowrap">{p.area}</Td>
                  {roles.map((r) => {
                    const a = p.access[r];
                    return (
                      <Td key={r} className="text-center">
                        {a === "full" ? (
                          <span className="inline-flex items-center gap-1 text-caption text-success"><Check className="size-4" /><span className="sr-only">Полный доступ</span></span>
                        ) : a === "view" ? (
                          <span className="inline-flex items-center gap-1 text-caption text-ink-2"><Eye className="size-4" /><span className="sr-only">Просмотр</span></span>
                        ) : (
                          <span className="inline-flex text-ink-3"><Minus className="size-4" /><span className="sr-only">Нет доступа</span></span>
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </tbody>
          </Table>
          <p className="flex flex-wrap gap-4 border-t border-line px-5 py-3 text-micro text-ink-2">
            <span className="inline-flex items-center gap-1"><Check className="size-3.5 text-success" /> полный доступ</span>
            <span className="inline-flex items-center gap-1"><Eye className="size-3.5" /> только просмотр</span>
            <span className="inline-flex items-center gap-1"><Minus className="size-3.5" /> нет доступа</span>
          </p>
        </div>
      </section>

      <Dialog
        open={invite}
        onClose={() => setInvite(false)}
        size="sm"
        title="Пригласить в команду"
        description="Пришлём ссылку на почту или в Telegram по номеру телефона."
        footer={
          <>
            <Button variant="secondary" onClick={() => setInvite(false)}>Отмена</Button>
            <Button variant="primary" onClick={send} disabled={full}>Отправить приглашение</Button>
          </>
        }
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => (e.preventDefault(), send())}>
          <Input
            icon={<Mail />}
            label="Почта или телефон"
            placeholder="anna@shop.ru"
            value={email}
            onChange={(e) => (setEmail(e.target.value), setErr(""))}
            error={err}
            data-autofocus
          />
          <Select label="Роль" value={role} onChange={(e) => setRole(e.target.value as Role)} hint="Роль можно поменять в любой момент">
            {roles.slice(1).map((r) => <option key={r}>{r}</option>)}
          </Select>
          {full && <p className="rounded-[14px] bg-warning-soft p-3 text-caption text-ink">Все 5 мест заняты. Освободите место или перейдите на тариф Scale.</p>}
        </form>
      </Dialog>
    </Page>
  );
}
