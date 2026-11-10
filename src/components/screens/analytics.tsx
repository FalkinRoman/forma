"use client";

import { ArrowDownRight, ArrowUpRight, ChartColumn, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { channelShare, funnel, revenueSeries, topItems } from "@/lib/data";
import { kpis } from "@/lib/mock";
import { Page, PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Segmented } from "@/components/ui/segmented";
import { Kpi } from "@/components/ui/kpi";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type Period = "7" | "30" | "90";
const kpiIcons = { revenue: <ChartColumn />, orders: <ShoppingCart />, clients: <Users />, repeat: <RefreshCw /> };

export function AnalyticsScreen() {
  const [period, setPeriod] = useState<Period>("30");
  return (
    <Page>
      <PageHeader
        title="Аналитика"
        description="Продажи, каналы и воронка — из реальных данных ваших продуктов."
        actions={
          <Segmented<Period>
            ariaLabel="Период"
            value={period}
            onChange={setPeriod}
            items={[
              { value: "7", label: "7 дней" },
              { value: "30", label: "30 дней" },
              { value: "90", label: "90 дней" },
            ]}
          />
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 @3xl:grid-cols-4">
        {kpis.map((k) => (
          <Kpi key={k.key} icon={kpiIcons[k.key]} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      <Card pad="lg">
        <SectionTitle action={<span className="text-caption text-ink-2">тыс. ₽ в день</span>}>Выручка</SectionTitle>
        <RevenueChart data={period === "7" ? revenueSeries.slice(-7) : revenueSeries} />
      </Card>

      <div className="grid grid-cols-1 gap-4 @4xl:grid-cols-2">
        <Card pad="lg">
          <SectionTitle>Каналы продаж</SectionTitle>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Donut />
            <ul className="flex w-full flex-col gap-3">
              {channelShare.map((c) => (
                <li key={c.label} className="flex items-center gap-3 text-body-sm">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1 text-ink">{c.label}</span>
                  <span className="font-semibold tabular">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <Card pad="lg">
          <SectionTitle>Воронка покупки</SectionTitle>
          <ol className="flex flex-col gap-3">
            {funnel.map((s, i) => {
              const pct = (s.value / funnel[0].value) * 100;
              const conv = i > 0 ? Math.round((s.value / funnel[i - 1].value) * 100) : null;
              return (
                <li key={s.label}>
                  <div className="mb-1 flex justify-between gap-3 text-body-sm">
                    <span className="text-ink">{s.label}</span>
                    <span className="text-ink-2 tabular">
                      <b className="font-semibold text-ink">{s.value.toLocaleString("ru-RU")}</b>
                      {conv !== null && <span className="ml-2 text-micro">{conv}%</span>}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-linear-to-r from-accent to-[#7c3aed]" style={{ width: `${Math.max(pct, 4)}%` }} />
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-caption text-ink-2">Больше всего теряем до корзины: её собирают 17% посетителей. Идеи, как это исправить, — в «Улучшениях».</p>
        </Card>
      </div>

      <Card pad="none">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <SectionTitle>Популярные товары</SectionTitle>
        </div>
        <ul>
          {topItems.map((t, i) => (
            <li key={t.name} className="flex items-center gap-4 border-t border-line px-5 py-3.5 sm:px-6">
              <span className="w-5 text-caption text-ink-3 tabular">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate text-body-sm text-ink">{t.name}</span>
              <span className="hidden w-24 text-right text-caption text-ink-2 tabular sm:block">{t.sold} шт.</span>
              <span className="w-28 text-right text-body-sm font-medium tabular">{t.revenue}</span>
              <span className={cn("inline-flex w-14 items-center justify-end gap-0.5 text-micro font-medium tabular", t.trend >= 0 ? "text-success" : "text-error")}>
                {t.trend >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {Math.abs(t.trend)}%
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}

function RevenueChart({ data }: { data: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 800, H = 220, P = 8;
  const max = Math.max(...data) * 1.1;
  const pts = useMemo(() => data.map((v, i) => [P + (i * (W - 2 * P)) / (data.length - 1), H - (v / max) * (H - 20)] as const), [data, max]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${W - P} ${H} L${P} ${H} Z`;
  const h = hover !== null ? pts[hover] : null;
  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[220px] w-full touch-none"
        preserveAspectRatio="none"
        role="img"
        aria-label={`График выручки: от ${data[0]} до ${data[data.length - 1]} тыс. ₽ в день`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const i = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1));
          setHover(Math.max(0, Math.min(data.length - 1, i)));
        }}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1769ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#1769ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--color-line)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill="url(#rev)" />
        <path d={line} fill="none" stroke="#1769ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {h && <line x1={h[0]} x2={h[0]} y1={0} y2={H} stroke="var(--color-line-strong)" vectorEffect="non-scaling-stroke" />}
      </svg>
      <div className="mt-2 flex justify-between text-micro text-ink-3 tabular" aria-hidden>
        <span>{data.length === 7 ? "4 ноя" : "12 окт"}</span>
        {data.length > 7 && <span>26 окт</span>}
        <span>сегодня</span>
      </div>
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute -top-2 -translate-x-1/2 rounded-[12px] bg-graphite px-2.5 py-1.5 text-micro font-medium whitespace-nowrap text-white shadow-raised"
          style={{ left: `${(h[0] / W) * 100}%` }}
        >
          ₽{data[hover]} тыс. · {hover === data.length - 1 ? "сегодня" : `${data.length - 1 - hover} дн. назад`}
        </div>
      )}
    </div>
  );
}

function Donut() {
  const r = 52, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 140 140" className="size-[150px] shrink-0 -rotate-90" role="img" aria-label="Доли каналов продаж">
      {channelShare.map((s) => {
        const len = (s.value / 100) * c;
        const el = (
          <circle key={s.label} cx="70" cy="70" r={r} fill="none" stroke={s.color} strokeWidth="18" strokeDasharray={`${len - 2} ${c - len + 2}`} strokeDashoffset={-acc} />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}
