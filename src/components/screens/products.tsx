"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";
import { Page, PageHeader } from "@/components/ui/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { Status } from "@/components/ui/status";
import { cn } from "@/lib/cn";

type F = "all" | "live" | "building" | "planned";
const envLabel = { production: "Опубликован", staging: "Тестовая среда", draft: "Черновик" };

export function ProductsScreen() {
  const [f, setF] = useState<F>("all");
  const shown = products.filter((p) => f === "all" || p.status === f);
  return (
    <Page>
      <PageHeader
        title="Продукты"
        description="Всё, что работает на ваш бизнес. Продукты используют общие данные: клиентов, заказы и товары."
        actions={
          <Link href="/overview?add=1" className={buttonVariants({ variant: "primary" })}>
            <Plus /> Добавить продукт
          </Link>
        }
      />
      <Segmented<F>
        ariaLabel="Фильтр продуктов"
        value={f}
        onChange={setF}
        className="max-w-full self-start overflow-x-auto"
        items={[
          { value: "all", label: `Все · ${products.length}` },
          { value: "live", label: "Работают" },
          { value: "building", label: "В разработке" },
          { value: "planned", label: "В плане" },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3">
        {shown.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[box-shadow,transform,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:outline-none"
          >
            <div className="relative flex h-[180px] items-end justify-center overflow-hidden bg-[#fafbfd] px-6 pt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.preview}
                alt=""
                className={cn(
                  "h-full w-auto max-w-full object-contain object-bottom mix-blend-multiply transition-transform duration-300 ease-soft group-hover:scale-[1.03]",
                  p.status === "planned" && "opacity-60 grayscale-[0.4]",
                )}
              />
              <span className="absolute top-4 left-4 rounded-full bg-surface/90 px-2.5 py-1 text-micro font-medium text-ink-2 shadow-xs backdrop-blur">
                {envLabel[p.env]}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-h3 font-semibold text-ink">{p.title}</h2>
                  <Status kind={p.status} className="mt-1" />
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
              </div>
              <p className="text-caption text-ink-2">{p.description}</p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 text-micro text-ink-3">
                <span>{p.version !== "—" ? `${p.version} · ${p.updated}` : "Ещё не собран"}</span>
                {p.url && <span className="truncate text-ink-2">{p.url}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}
