import type { Metadata } from "next";
import {
  Bell,
  ChartColumn,
  House,
  Layers,
  LayoutGrid,
  Plus,
  Puzzle,
  Search,
  Settings,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge, Chip, Status } from "@/components/ui/status";
import { Kpi } from "@/components/ui/kpi";
import { Logo, LogoMark } from "@/components/ui/logo";
import { DsInteractive } from "./interactive";

export const metadata: Metadata = { title: "Дизайн-система" };

const colors = [
  { group: "Поверхности", items: [["canvas", "#FAFBFD"], ["surface", "#FFFFFF"], ["subtle", "#F4F6F9"], ["line", "#E8EBF0"]] },
  { group: "Текст", items: [["ink", "#171B23"], ["ink-2", "#667085"], ["ink-3", "#98A2B3"]] },
  { group: "Акцент", items: [["accent", "#1769FF"], ["accent-hover", "#0F5AE6"], ["accent-soft", "#EAF1FF"]] },
  { group: "Статусы", items: [["success", "#28A745"], ["warning", "#E89B25"], ["error", "#D94B4B"]] },
] as const;

const type = [
  ["text-h1", "H1 · 32 / Bold", "Ваша бизнес-экосистема", "text-h1 font-bold"],
  ["text-h2", "H2 · 24 / Semibold", "Дорожная карта развития", "text-h2 font-semibold"],
  ["text-h3", "H3 · 18 / Semibold", "AI-архитектор FORMA", "text-h3 font-semibold"],
  ["text-body", "Body · 15 / Regular", "Все продукты, процессы и AI-автоматизация в одной системе.", "text-body"],
  ["text-caption", "Caption · 13 / Regular", "Расширение ассортимента и новые регионы", "text-caption text-ink-2"],
  ["text-micro", "Micro · 12 / Medium", "Активен до 12 дек. 2026", "text-micro font-medium text-ink-2"],
] as const;

const radii = [
  ["control", 10],
  ["btn", 12],
  ["card", 20],
  ["panel / modal", 24],
] as const;

const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-panel border border-line bg-surface p-6 shadow-card">
      <h2 className="text-h3 font-semibold">{title}</h2>
      {description && <p className="mt-1 text-caption text-ink-2">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <header>
        <h1 className="text-h1 font-bold">Дизайн-система FORMA</h1>
        <p className="mt-2 max-w-2xl text-body text-ink-2">
          Нейтральная оболочка платформы. Она не конкурирует с брендами продуктов клиента: магазин может быть тёмным, а
          приложение ярким — навигация FORMA остаётся спокойной.
        </p>
      </header>

      <Section title="Логотип" description="Знак слева, надпись справа. Монохромная версия — для интерфейса и favicon.">
        <div className="flex flex-wrap items-center gap-8">
          <Logo size={40} />
          <LogoMark size={40} />
          <LogoMark size={40} mono className="text-ink" />
          <LogoMark size={24} />
          <LogoMark size={16} />
        </div>
      </Section>

      <Section title="Цвета" description="Акцент #1769FF — экономно: активное состояние, CTA, ссылки.">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((g) => (
            <div key={g.group}>
              <p className="mb-3 text-micro font-medium text-ink-2">{g.group}</p>
              <div className="flex flex-col gap-2">
                {g.items.map(([name, hex]) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="size-10 rounded-[12px] border border-line" style={{ background: hex }} />
                    <span>
                      <span className="block text-caption font-semibold">{name}</span>
                      <span className="block font-mono text-micro text-ink-2">{hex}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Типографика" description="Inter (или SF Pro при наличии лицензии). Line-height 1.35–1.5.">
        <div className="flex flex-col divide-y divide-line">
          {type.map(([token, meta, sample, cls]) => (
            <div key={token} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[200px_1fr] sm:items-baseline">
              <span className="text-micro text-ink-2">
                <span className="font-mono">{token}</span> · {meta}
              </span>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Радиусы">
          <div className="flex flex-wrap items-end gap-5">
            {radii.map(([n, r]) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <span className="size-16 border border-accent/40 bg-accent-soft" style={{ borderRadius: r }} />
                <span className="text-micro text-ink-2">
                  {n} · {r}px
                </span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Отступы" description="Шаг 8px (4px — для мелких внутренних зазоров).">
          <div className="flex flex-col gap-1.5">
            {spacing.map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="w-8 text-right font-mono text-micro text-ink-2">{s}</span>
                <span className="h-2.5 rounded-full bg-accent/70" style={{ width: s * 3 }} />
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Кнопки" description="Не больше одного первичного CTA на локальный сценарий.">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Основная</Button>
            <Button variant="dark" leftIcon={<Plus />}>
              Создать
            </Button>
            <Button variant="secondary">Вторичная</Button>
            <Button variant="ghost">Тихая</Button>
            <Button variant="destructive" leftIcon={<Trash2 />}>
              Удалить
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small 32</Button>
            <Button size="md">Medium 40</Button>
            <Button size="lg">Large 48</Button>
            <Button loading>Сохраняем</Button>
            <Button disabled>Недоступно</Button>
            <IconButton label="Добавить" variant="secondary">
              <Plus />
            </IconButton>
            <IconButton label="Поиск">
              <Search />
            </IconButton>
          </div>
        </div>
      </Section>

      <DsInteractive />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Поля ввода">
          <div className="flex flex-col gap-4">
            <Input icon={<Search />} placeholder="Поиск…" name="ds-search" />
            <Input label="Название бизнеса" placeholder="Например, «Доставка деликатесов»" hint="Можно изменить позже" name="ds-name" />
            <Input label="Домен" defaultValue="delikatesy" error="Домен занят — попробуйте delikatesy-msk" name="ds-domain" />
          </div>
        </Section>
        <Section title="Статусы, бейджи, чипы" description="Смысл никогда не передаётся только цветом.">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Status kind="live" />
              <Status kind="building" />
              <Status kind="attention" />
              <Status kind="planned" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Status kind="live" pill />
              <Status kind="building" pill />
              <Status kind="attention" pill />
              <Status kind="planned" pill />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>4</Badge>
              <Badge tone="neutral">12</Badge>
              <Badge tone="dark">Новое</Badge>
              <Chip>Продажи</Chip>
              <Chip selected>Выбрано</Chip>
            </div>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Карточки" description="Отступы 16–24px. Иерархия: заголовок → статус → превью → действие.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card interactive>
              <CardHeader>
                <div>
                  <CardTitle>Сайт</CardTitle>
                  <Status kind="live" className="mt-1" />
                </div>
              </CardHeader>
              <CardDescription className="mt-3">Наведите — карточка приподнимется.</CardDescription>
            </Card>
            <Card tone="subtle">
              <CardTitle>Вторичная</CardTitle>
              <CardDescription className="mt-1">Для вложенных блоков.</CardDescription>
            </Card>
          </div>
        </Section>
        <Section title="KPI">
          <div className="flex flex-wrap gap-3">
            <Kpi icon={<ChartColumn />} label="Выручка" value="₽1 840 000" delta={27} />
            <Kpi icon={<Users />} label="Клиенты" value="892" delta={-3} />
          </div>
        </Section>
      </div>

      <Section title="Иконки" description="Lucide, линейные, 18–22px, stroke 1.75. Не смешивать наборы.">
        <div className="flex flex-wrap gap-5 text-ink">
          {[House, Layers, LayoutGrid, Zap, ChartColumn, Users, Puzzle, Settings, Bell, Search].map((I, i) => (
            <I key={i} className="size-[22px]" strokeWidth={1.75} />
          ))}
        </div>
      </Section>

      <Section title="Движение" description="150–250 мс — микровзаимодействия, 250–400 мс — переходы карты. prefers-reduced-motion отключает анимации.">
        <div className="grid grid-cols-2 gap-3 font-mono text-micro text-ink-2 sm:grid-cols-4">
          <span className="rounded-btn bg-subtle p-3">fast · 150ms</span>
          <span className="rounded-btn bg-subtle p-3">base · 200ms</span>
          <span className="rounded-btn bg-subtle p-3">slow · 250ms</span>
          <span className="rounded-btn bg-subtle p-3">map · 350ms</span>
        </div>
      </Section>
    </div>
  );
}
