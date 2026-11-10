/**
 * Демо-данные для прототипа. Не являются реальными метриками —
 * в продукте всё приходит из единой модели данных бизнеса.
 */
import type { StatusKind } from "@/components/ui/status";

export const project = {
  name: "Доставка деликатесов",
  owner: { name: "Роман Фалькин", role: "Владелец" },
  plan: { name: "Business", until: "12 дек. 2026" },
};

export const kpis = [
  { key: "revenue", label: "Выручка", value: "₽1 840 000", delta: 27 },
  { key: "orders", label: "Заказы", value: "1 436", delta: 21 },
  { key: "clients", label: "Клиенты", value: "892", delta: 18 },
  { key: "repeat", label: "Повторные", value: "41%", delta: 9 },
] as const;

export type ProductKind =
  | "site"
  | "mobile"
  | "miniapp"
  | "crm"
  | "courier"
  | "agents"
  | "integrations"
  | "analytics"
  | "loyalty"
  | "warehouse"
  | "staff"
  | "booking"
  | "mailing"
  | "reviews"
  | "chatbot"
  | "marketplace"
  | "payments";

export type EcoNode = {
  id: string;
  kind: ProductKind;
  title: string;
  status: StatusKind;
  statusText?: string;
  layer: "now" | "plan";
  /** позиция на холсте относительно ядра, px */
  x: number;
  y: number;
};

export const ecosystem: EcoNode[] = [
  { id: "site", kind: "site", title: "Сайт", status: "live", layer: "now", x: -420, y: -230 },
  { id: "crm", kind: "crm", title: "CRM / Админка", status: "live", layer: "now", x: -460, y: 20 },
  { id: "agents", kind: "agents", title: "AI-агенты", status: "live", statusText: "3 активных", layer: "now", x: -420, y: 260 },
  { id: "mobile", kind: "mobile", title: "Мобильное приложение", status: "planned", layer: "plan", x: 0, y: -330 },
  { id: "integrations", kind: "integrations", title: "Интеграции", status: "live", layer: "now", x: 0, y: 320 },
  { id: "miniapp", kind: "miniapp", title: "Telegram Mini App", status: "live", layer: "now", x: 420, y: -230 },
  { id: "courier", kind: "courier", title: "Курьеры", status: "building", layer: "now", x: 460, y: 20 },
  { id: "analytics", kind: "analytics", title: "Аналитика", status: "live", layer: "now", x: 420, y: 260 },
];

/** Модули, которые можно «вырастить» из ядра. */
export type CatalogItem = {
  kind: ProductKind;
  title: string;
  why: string;
  group: "Каналы продаж" | "Операции" | "Маркетинг и рост";
  tone: "blue" | "violet" | "teal" | "amber" | "rose" | "green";
};

export const moduleCatalog: CatalogItem[] = [
  { kind: "chatbot", title: "Telegram-бот", why: "Принимает заказы и отвечает 24/7", group: "Каналы продаж", tone: "blue" },
  { kind: "marketplace", title: "Маркетплейсы", why: "Ozon и Wildberries из одного каталога", group: "Каналы продаж", tone: "violet" },
  { kind: "booking", title: "Бронирование", why: "Запись и свободные слоты онлайн", group: "Каналы продаж", tone: "teal" },
  { kind: "payments", title: "Онлайн-оплата", why: "Карты и СБП с вашего согласия", group: "Операции", tone: "green" },
  { kind: "warehouse", title: "Склад и остатки", why: "Остатки синхронно во всех каналах", group: "Операции", tone: "amber" },
  { kind: "staff", title: "Приложение сотрудника", why: "Задачи, смены и чек-листы", group: "Операции", tone: "violet" },
  { kind: "loyalty", title: "Программа лояльности", why: "Баллы и персональные предложения", group: "Маркетинг и рост", tone: "rose" },
  { kind: "mailing", title: "Рассылки", why: "Email и push по сегментам клиентов", group: "Маркетинг и рост", tone: "blue" },
  { kind: "reviews", title: "Отзывы", why: "Сбор отзывов и ответы с помощью AI", group: "Маркетинг и рост", tone: "amber" },
];

export const recommendations = [
  {
    id: "loyalty",
    title: "Запустить программу лояльности",
    hint: "Оценка: до +24% повторных заказов",
    icon: "rocket",
  },
  { id: "mobile", title: "Добавить iOS / Android приложение", hint: "Оценка: рост продаж до 40%", icon: "phone" },
  { id: "marketing", title: "Автоматизировать маркетинг", hint: "AI-кампании и персональные предложения", icon: "trend" },
] as const;

export const roadmap = [
  { id: 1, label: "Идея и анализ", state: "done" },
  { id: 2, label: "Структура", state: "done" },
  { id: 3, label: "Дизайн", state: "done" },
  { id: 4, label: "Разработка", state: "current" },
  { id: 5, label: "Тестирование", state: "todo" },
  { id: 6, label: "Запуск", state: "todo" },
  { id: 7, label: "Рост", state: "todo" },
] as const;
