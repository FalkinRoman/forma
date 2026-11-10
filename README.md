# FORMA — фронтенд MVP

AI Business OS для малого и среднего бизнеса: человек описывает бизнес — FORMA предлагает и собирает экосистему (сайт, Telegram Mini App, CRM, AI-агенты, аналитика) на общих данных.

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшен-сборка
```

## Стек
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 (токены в `@theme`) · Motion · Radix UI · Lucide.

## Экраны
| Путь | Что это |
|---|---|
| `/` | Старт: «Расскажите о бизнесе» → AI-анализ → план экосистемы |
| `/overview` | Мой бизнес: KPI, карта бизнеса (карта/список, сейчас/план), AI-архитектор, дорожная карта |
| `/design-system` | Живая витрина дизайн-системы |
| `/products`, `/agents`, … | Разделы-заглушки с empty state |

## Структура
```
src/
  app/globals.css          ← ВСЕ дизайн-токены (цвета, типографика, радиусы, тени, движение)
  lib/motion.ts            ← токены анимаций для Motion
  lib/nav.ts, lib/mock.ts  ← навигация и демо-данные
  components/ui/           ← базовые компоненты: Button, IconButton, Card, Input, Status, Badge, Chip,
                             Switch, Checkbox, Segmented, Kpi, EmptyState, Toast, Logo, Avatar
  components/layout/       ← AppShell, Sidebar, Topbar
  components/features/     ← карта бизнеса, превью продуктов, AI-архитектор, дорожная карта
  components/onboarding/   ← стартовый сценарий
```

## Правила дизайн-системы (не нарушать)
- Новые цвета/радиусы/тени — только через токены в `globals.css`, никаких hex в компонентах (исключение — превью продуктов клиента).
- Оболочка FORMA нейтральна; синий `#1769FF` — экономно: активное состояние, CTA, ссылки.
- Статус = точка + текст, не только цвет.
- Один первичный CTA на локальный сценарий.
- Карточки: отступы 16–24px, радиус 20; кнопки 12; панели 24. Сетка 8px.
- Анимации 150–250 мс, переходы карты до 400 мс, `prefers-reduced-motion` уважается.
- Оценки AI помечаются как оценки; ничего не публикуется без подтверждения.

Промпты для изображений — `IMAGE_PROMPTS.md`.
