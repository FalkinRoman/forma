import type { Metadata } from "next";
import { Suspense } from "react";
import { ChartColumn, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { kpis } from "@/lib/mock";
import { Kpi } from "@/components/ui/kpi";
import { EcosystemMap } from "@/components/features/ecosystem-map";
import { NextStageCard, Roadmap } from "@/components/features/roadmap";

export const metadata: Metadata = { title: "Мой бизнес" };

const kpiIcons = {
  revenue: <ChartColumn />,
  orders: <ShoppingCart />,
  clients: <Users />,
  repeat: <RefreshCw />,
};

/**
 * Вертикальный ритм страницы (шаг 8):
 * заголовок → 24 → KPI → 40 → карта → 40 → дорожная карта.
 */
export default function OverviewPage() {
  return (
    <div className="@container mx-auto flex w-full max-w-[1200px] min-w-0 flex-col gap-10">
      <section className="flex flex-col gap-6" aria-label="Сводка">
        <header>
          <h1 className="text-[28px] leading-tight font-bold tracking-[-0.02em] sm:text-h1">Ваша бизнес-экосистема</h1>
          <p className="mt-2 text-body text-ink-2">Все продукты, процессы и AI-автоматизация в одной связанной системе.</p>
        </header>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 @3xl:grid-cols-4">
          {kpis.map((k) => (
            <Kpi key={k.key} icon={kpiIcons[k.key]} label={k.label} value={k.value} delta={k.delta} />
          ))}
        </div>
      </section>

      <Suspense fallback={<div className="h-[560px] animate-pulse rounded-panel bg-muted sm:h-[720px]" />}>
        <EcosystemMap />
      </Suspense>

      <div className="grid grid-cols-1 gap-4 @6xl:grid-cols-[minmax(0,1fr)_320px]">
        <Roadmap />
        <NextStageCard />
      </div>
    </div>
  );
}
