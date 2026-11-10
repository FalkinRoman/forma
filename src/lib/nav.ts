import {
  Bot,
  ChartColumn,
  House,
  Layers,
  Palette,
  Plug,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  /** Короткое описание раздела — для поиска ⌘K */
  hint?: string;
};

/**
 * 7 первичных разделов (правило ДС: 5–7) в порядке ежедневной работы:
 * сводка → операционка (заказы, клиенты) → продукты → рост (аналитика, агенты, улучшения).
 * Второстепенное — в «Ещё».
 */
export const primaryNav: NavItem[] = [
  { href: "/overview", label: "Мой бизнес", icon: House, hint: "Карта бизнеса и сводка" },
  { href: "/orders", label: "Заказы", icon: ShoppingBag, badge: 2, hint: "Новые, сборка, доставка" },
  { href: "/clients", label: "Клиенты", icon: Users, hint: "Единая база и сегменты" },
  { href: "/products", label: "Продукты", icon: Layers, hint: "Сайт, Mini App, CRM, публикация" },
  { href: "/analytics", label: "Аналитика", icon: ChartColumn, hint: "Выручка, каналы, воронка" },
  { href: "/agents", label: "AI-агенты", icon: Bot, hint: "Права, лимиты, решения" },
  { href: "/improvements", label: "Улучшения", icon: Sparkles, badge: 3, hint: "Гипотезы роста от AI" },
];

export const secondaryNav: NavItem[] = [
  { href: "/integrations", label: "Интеграции", icon: Plug, hint: "Оплата, доставка, учёт" },
  { href: "/team", label: "Команда", icon: UsersRound, hint: "Участники и роли" },
  { href: "/settings", label: "Настройки", icon: Settings, hint: "Компания, тариф, безопасность" },
  { href: "/design-system", label: "Дизайн-система", icon: Palette, hint: "Токены и компоненты" },
];

export const allNav = [...primaryNav, ...secondaryNav];
