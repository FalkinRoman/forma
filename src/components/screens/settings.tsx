"use client";

import { Bot, Building2, Check, CreditCard, Download, Globe, Lock, Plug, Rocket, ScrollText, Smartphone, UsersRound } from "lucide-react";
import { useState } from "react";
import { auditLog, plans, usage } from "@/lib/data";
import { project } from "@/lib/mock";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

type Tab = "company" | "billing" | "notifications" | "security" | "log";
const logIcon = { publish: Rocket, ai: Bot, integration: Plug, team: UsersRound } as const;

export function SettingsScreen() {
  const toast = useToast();
  const [tab, setTab] = useState<Tab>("company");
  const [dirty, setDirty] = useState(false);

  return (
    <Page>
      <PageHeader title="Настройки" description="Рабочее пространство, тариф, уведомления и безопасность." />
      <Segmented<Tab>
        ariaLabel="Разделы настроек"
        value={tab}
        onChange={setTab}
        className="max-w-full self-start overflow-x-auto"
        items={[
          { value: "company", label: "Компания" },
          { value: "billing", label: "Тариф" },
          { value: "notifications", label: "Уведомления" },
          { value: "security", label: "Безопасность" },
          { value: "log", label: "Журнал" },
        ]}
      />

      {tab === "company" && (
        <Card pad="lg" className="max-w-[760px]">
          <form
            className="flex flex-col gap-5"
            onChange={() => setDirty(true)}
            onSubmit={(e) => {
              e.preventDefault();
              setDirty(false);
              toast({ kind: "success", title: "Изменения сохранены" });
            }}
          >
            <SectionTitle className="mb-0">
              <span className="inline-flex items-center gap-2"><Building2 className="size-5 text-ink-2" />Компания</span>
            </SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Название бизнеса" defaultValue={project.name} name="name" />
              <Input label="ИНН" defaultValue="7701 234 567" name="inn" hint="Нужен для чеков и договоров с сервисами" />
              <Select label="Часовой пояс" name="tz" defaultValue="msk">
                <option value="msk">Москва (UTC+3)</option>
                <option value="ekb">Екатеринбург (UTC+5)</option>
                <option value="nsk">Новосибирск (UTC+7)</option>
              </Select>
              <Select label="Валюта" name="cur" defaultValue="rub">
                <option value="rub">Российский рубль, ₽</option>
              </Select>
              <div className="sm:col-span-2">
                <Input label="Основной домен" icon={<Globe />} defaultValue="delikatesy.ru" name="domain" hint="Подключён, SSL активен" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-line pt-5">
              {dirty && <span className="text-caption text-ink-2">Есть несохранённые изменения</span>}
              <Button type="submit" variant="primary" disabled={!dirty}>Сохранить</Button>
            </div>
          </form>
        </Card>
      )}

      {tab === "billing" && (
        <div className="flex flex-col gap-6">
          <Card pad="lg">
            <SectionTitle action={<Button variant="ghost" size="sm" leftIcon={<Download />}>Счета</Button>}>
              Использование · тариф {project.plan.name}
            </SectionTitle>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {usage.map((u) => (
                <div key={u.label}>
                  <div className="mb-2 flex justify-between text-body-sm">
                    <span className="text-ink-2">{u.label}</span>
                    <span className="font-semibold tabular">{u.used.toLocaleString("ru-RU")} / {u.limit.toLocaleString("ru-RU")}</span>
                  </div>
                  <Progress value={u.used} max={u.limit} label={u.label} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-caption text-ink-2">Следующее списание 12 декабря 2026 · 7 990 ₽ · карта •• 4417. Расход кредитов показываем до запуска каждой операции.</p>
          </Card>
          <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-2 @6xl:grid-cols-4">
            {plans.map((p) => {
              const current = p.name === project.plan.name;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "flex flex-col rounded-card border bg-surface p-5 shadow-card",
                    current ? "border-accent shadow-[0_0_0_4px_var(--color-accent-soft)]" : "border-line",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-h3 font-semibold">{p.name}</h3>
                    {current && <span className="rounded-full bg-accent-soft px-2.5 py-1 text-micro font-medium text-accent">Ваш тариф</span>}
                  </div>
                  <p className="mt-3 text-[26px] font-bold tracking-[-0.02em] tabular">{p.price}</p>
                  <p className="text-caption text-ink-2">{p.note}</p>
                  <ul className="mt-4 flex flex-1 flex-col gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-caption text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={current ? "secondary" : p.id === "scale" ? "primary" : "ghost"} className="mt-5" disabled={current}>
                    {current ? "Подключён" : p.id === "scale" ? "Перейти на Scale" : "Выбрать"}
                  </Button>
                </div>
              );
            })}
          </div>
          <p className="text-micro text-ink-3">Хостинг, домены, SMS и комиссии платёжных сервисов оплачиваются по факту и показываются отдельно.</p>
        </div>
      )}

      {tab === "notifications" && (
        <Card pad="lg" className="max-w-[760px]">
          <SectionTitle>Что присылать</SectionTitle>
          <ul className="divide-y divide-line">
            {[
              ["Новый заказ", "Сразу, в Telegram", true],
              ["Агент ждёт решения", "Сразу, в Telegram и в приложении", true],
              ["Ошибка в продукте", "Сразу, все каналы", true],
              ["Новые гипотезы AI", "Раз в день, утром", true],
              ["Еженедельный отчёт", "По понедельникам на почту", false],
            ].map(([t, d, on]) => (
              <li key={t as string} className="flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="block text-body-sm font-medium">{t}</span>
                  <span className="text-caption text-ink-2">{d}</span>
                </span>
                <Switch defaultChecked={on as boolean} aria-label={t as string} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {tab === "security" && (
        <div className="grid max-w-[960px] grid-cols-1 gap-4 @3xl:grid-cols-2">
          <Card pad="lg">
            <SectionTitle><span className="inline-flex items-center gap-2"><Lock className="size-5 text-ink-2" />Вход</span></SectionTitle>
            <label className="flex items-center justify-between gap-4 py-2">
              <span>
                <span className="block text-body-sm font-medium">Двухфакторная защита</span>
                <span className="text-caption text-ink-2">Код из Telegram при входе</span>
              </span>
              <Switch defaultChecked aria-label="Двухфакторная защита" />
            </label>
          </Card>
          <Card pad="lg">
            <SectionTitle><span className="inline-flex items-center gap-2"><Smartphone className="size-5 text-ink-2" />Активные сеансы</span></SectionTitle>
            <ul className="flex flex-col gap-2 text-body-sm">
              <li className="flex justify-between gap-3"><span>MacBook · Safari</span><span className="text-success">это устройство</span></li>
              <li className="flex justify-between gap-3"><span>iPhone · Telegram</span><span className="text-ink-2">вчера</span></li>
            </ul>
            <Button variant="ghost" size="sm" className="mt-3 -ml-3">Завершить другие сеансы</Button>
          </Card>
          <Card pad="lg" className="@3xl:col-span-2">
            <SectionTitle><span className="inline-flex items-center gap-2"><CreditCard className="size-5 text-ink-2" />Данные</span></SectionTitle>
            <p className="text-body-sm text-ink-2">Данные хранятся на серверах в России. Выгрузить все данные бизнеса можно в любой момент.</p>
            <Button variant="secondary" className="mt-4" leftIcon={<Download />}>Выгрузить данные</Button>
          </Card>
        </div>
      )}

      {tab === "log" && (
        <Card pad="none">
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <SectionTitle><span className="inline-flex items-center gap-2"><ScrollText className="size-5 text-ink-2" />Журнал действий</span></SectionTitle>
          </div>
          <ol>
            {auditLog.map((l, i) => {
              const Icon = logIcon[l.kind as keyof typeof logIcon];
              return (
                <li key={i} className="flex items-start gap-3 border-t border-line px-5 py-3.5 sm:px-6">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-subtle text-ink-2"><Icon className="size-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm text-ink"><b className="font-semibold">{l.who}</b> · {l.what}</p>
                    <p className="text-micro text-ink-3">{l.time}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      )}
    </Page>
  );
}
