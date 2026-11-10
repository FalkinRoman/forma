"use client";

import {
  CircleCheck,
  Database,
  ExternalLink,
  Eye,
  Globe,
  History,
  RotateCcw,
  Rocket,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { productReleases, publishChecks, type Product } from "@/lib/data";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Status } from "@/components/ui/status";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PaymentMarks } from "@/components/ui/payment-marks";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";

type Tab = "overview" | "versions" | "settings";

export function ProductDetail({ product: p }: { product: Product }) {
  const toast = useToast();
  const [tab, setTab] = useState<Tab>("overview");
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [rollback, setRollback] = useState<string | null>(null);
  const planned = p.status === "planned";

  const publish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublishOpen(false);
      toast({ kind: "success", title: `${p.title} опубликован`, description: "Предыдущая версия сохранена — можно откатить в один клик" });
    }, 1400);
  };

  return (
    <Page>
      <PageHeader
        back={{ href: "/products", label: "Продукты" }}
        title={p.title}
        meta={
          <>
            <Status kind={p.status} pill>{p.statusText}</Status>
            {p.version !== "—" && <span className="text-caption text-ink-2">{p.version} · обновлён {p.updated}</span>}
          </>
        }
        actions={
          planned ? (
            <Button variant="primary" leftIcon={<Sparkles />} onClick={() => toast({ kind: "pending", title: "AI готовит план сборки", description: "Покажем оценку стоимости до запуска" })}>
              Начать сборку
            </Button>
          ) : (
            <>
              <Button variant="secondary" leftIcon={<Eye />}>Предпросмотр</Button>
              <Button variant="primary" leftIcon={<Rocket />} onClick={() => setPublishOpen(true)}>
                Опубликовать
              </Button>
            </>
          )
        }
      />

      <Segmented<Tab>
        ariaLabel="Разделы продукта"
        value={tab}
        onChange={setTab}
        className="max-w-full self-start overflow-x-auto"
        items={[
          { value: "overview", label: "Обзор" },
          { value: "versions", label: "Версии" },
          { value: "settings", label: "Настройки" },
        ]}
      />

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-4 @5xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-w-0 flex-col gap-4">
            <Card pad="none" className="overflow-hidden">
              <div className="flex h-[280px] items-center justify-center bg-[#fafbfd] px-8 py-6 sm:h-[340px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={`Превью: ${p.title}`} className={cn("h-auto max-h-full w-auto max-w-[min(100%,440px)] object-contain mix-blend-multiply", planned && "opacity-60")} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                <p className="text-body-sm text-ink-2">{p.description}</p>
                {p.url && (
                  <a href="#" className="inline-flex items-center gap-1 text-body-sm font-medium text-accent hover:underline">
                    {p.url} <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </Card>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {p.metrics.map((m) => (
                <div key={m.label} className="min-w-0 rounded-[20px] border border-line bg-surface p-3 shadow-card sm:rounded-card sm:p-4">
                  <div className="text-micro text-ink-2 sm:text-caption">{m.label}</div>
                  <div className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-ink tabular sm:text-[22px]">{m.value}</div>
                </div>
              ))}
            </div>
            {planned && <p className="text-micro text-ink-3">Эффект и сроки — оценка AI на основе похожих проектов, не гарантия.</p>}
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <SectionTitle>Среды</SectionTitle>
              <ul className="flex flex-col gap-3 text-body-sm">
                <li className="flex items-center justify-between gap-3 rounded-[16px] bg-subtle px-4 py-3">
                  <span>
                    <b className="block font-semibold">Production</b>
                    <span className="text-caption text-ink-2">видят клиенты</span>
                  </span>
                  <span className="font-medium tabular">{p.env === "production" ? p.version : "—"}</span>
                </li>
                <li className="flex items-center justify-between gap-3 rounded-[16px] bg-subtle px-4 py-3">
                  <span>
                    <b className="block font-semibold">Staging</b>
                    <span className="text-caption text-ink-2">для проверки</span>
                  </span>
                  <span className="font-medium tabular">{p.version}</span>
                </li>
              </ul>
            </Card>
            <Card>
              <SectionTitle>Общие данные</SectionTitle>
              <p className="mb-3 text-caption text-ink-2">Продукт работает с ядром бизнеса — изменения видны во всех каналах сразу.</p>
              <div className="flex flex-wrap gap-2">
                {["Клиенты", "Заказы", "Товары", "Оплаты"].map((d) => (
                  <span key={d} className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-caption font-medium text-accent">
                    <Database className="size-3.5" /> {d}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="border-accent/15 bg-linear-to-b from-accent-soft/60 to-surface">
              <div className="flex items-center gap-2 text-caption font-semibold text-accent">
                <Sparkles className="size-4" /> Совет AI
              </div>
              <p className="mt-2 text-body-sm text-ink">28% покупателей уходят на шаге адреса. Сократить форму с 9 до 5 полей?</p>
              <Link href="/improvements" className="mt-3 inline-flex text-body-sm font-medium text-accent hover:underline">
                Смотреть гипотезу →
              </Link>
            </Card>
          </div>
        </div>
      )}

      {tab === "versions" && (
        <Card pad="none">
          <ol className="divide-y divide-line">
            {productReleases.map((r, i) => (
              <li key={r.version} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", i === 0 ? "bg-success-soft text-success" : "bg-subtle text-ink-3")}>
                  {i === 0 ? <CircleCheck className="size-5" /> : <History className="size-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-body-sm font-medium text-ink">
                    {r.version} · {r.text}
                  </p>
                  <p className="text-caption text-ink-2">
                    {r.date} · подготовил {r.author} · подтвердил {r.approvedBy}
                  </p>
                </div>
                {i === 0 ? (
                  <span className="text-caption font-medium text-success">Текущая</span>
                ) : (
                  <Button variant="ghost" size="sm" leftIcon={<RotateCcw />} onClick={() => setRollback(r.version)}>
                    Вернуть
                  </Button>
                )}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {tab === "settings" && (
        <div className="grid grid-cols-1 gap-4 @4xl:grid-cols-2">
          <Card pad="lg">
            <SectionTitle>Домен</SectionTitle>
            <Input icon={<Globe />} label="Адрес" defaultValue={p.url ?? ""} placeholder="shop.ru" hint="SSL-сертификат выпускается автоматически" />
          </Card>
          <Card pad="lg">
            <SectionTitle>Оплата</SectionTitle>
            <p className="mb-4 text-caption text-ink-2">Способы оплаты из раздела «Интеграции».</p>
            <PaymentMarks />
          </Card>
          <Card pad="lg">
            <SectionTitle>Публикация</SectionTitle>
            <label className="flex items-center justify-between gap-4 py-2">
              <span>
                <span className="block text-body-sm font-medium">Подтверждать каждую публикацию</span>
                <span className="text-caption text-ink-2">Изменения AI не попадут к клиентам без вас</span>
              </span>
              <Switch defaultChecked aria-label="Подтверждать публикации" />
            </label>
          </Card>
          <Card pad="lg" className="border-error/20">
            <SectionTitle>Опасная зона</SectionTitle>
            <p className="mb-4 text-caption text-ink-2">Клиенты увидят страницу «Скоро вернёмся». Данные и заказы сохранятся.</p>
            <Button variant="destructive" leftIcon={<TriangleAlert />}>Снять с публикации</Button>
          </Card>
        </div>
      )}

      {/* Публикация: проверки → подтверждение → staging → production */}
      <Dialog
        open={publishOpen}
        onClose={() => !publishing && setPublishOpen(false)}
        title={`Опубликовать ${p.version}?`}
        description="Клиенты увидят новую версию сразу после публикации. Текущая версия сохранится."
        icon={<span className="flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent"><Rocket className="size-5" /></span>}
        footer={
          <>
            <Button variant="secondary" onClick={() => setPublishOpen(false)} disabled={publishing}>
              Отмена
            </Button>
            <Button variant="primary" loading={publishing} onClick={publish}>
              Опубликовать
            </Button>
          </>
        }
      >
        <ul className="flex flex-col gap-2.5">
          {publishChecks.map((c) => (
            <li key={c.label} className="flex items-center gap-3 text-body-sm">
              <CircleCheck className="size-5 text-success" />
              {c.label}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-[16px] bg-subtle p-3 text-caption text-ink-2">
          Что изменится: {productReleases[0].text}. Стоимость публикации включена в тариф.
        </p>
      </Dialog>

      <Dialog
        open={!!rollback}
        onClose={() => setRollback(null)}
        size="sm"
        title={`Вернуть версию ${rollback}?`}
        description="Текущая версия не удалится — её можно будет снова опубликовать."
        icon={<span className="flex size-10 items-center justify-center rounded-full bg-warning-soft text-warning"><RotateCcw className="size-5" /></span>}
        footer={
          <>
            <Button variant="secondary" onClick={() => setRollback(null)}>Отмена</Button>
            <Button
              variant="dark"
              onClick={() => {
                toast({ kind: "success", title: `Версия ${rollback} восстановлена` });
                setRollback(null);
              }}
            >
              Вернуть версию
            </Button>
          </>
        }
      />
    </Page>
  );
}
