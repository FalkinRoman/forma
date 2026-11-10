/**
 * Демо-данные экранов прототипа. Все числа — иллюстрация, не реальные метрики.
 * В продукте приходят из единой модели данных бизнеса (клиенты, заказы, товары, события).
 */
import { BASE } from "@/lib/base";
import type { StatusKind } from "@/components/ui/status";
import type { ProductKind } from "./mock";

/* ───────── Продукты ───────── */
export type Product = {
  id: string;
  kind: ProductKind;
  title: string;
  status: StatusKind;
  statusText?: string;
  version: string;
  updated: string;
  url?: string;
  env: "production" | "staging" | "draft";
  preview: string;
  metrics: { label: string; value: string }[];
  description: string;
};

export const products: Product[] = [
  {
    id: "site",
    kind: "site",
    title: "Сайт магазина",
    status: "live",
    version: "v1.8",
    updated: "сегодня, 10:42",
    url: "delikatesy.ru",
    env: "production",
    preview: BASE + "/images/mock-site.png",
    metrics: [
      { label: "Визиты за 7 дней", value: "8 214" },
      { label: "Конверсия", value: "3,4%" },
      { label: "Заказы", value: "279" },
    ],
    description: "Каталог, корзина, оплата через ЮKassa и СБП, личный кабинет.",
  },
  {
    id: "miniapp",
    kind: "miniapp",
    title: "Telegram Mini App",
    status: "live",
    version: "v1.3",
    updated: "вчера, 18:05",
    url: "t.me/delikatesy_bot/shop",
    env: "production",
    preview: BASE + "/images/mock-tg.png",
    metrics: [
      { label: "Открытия за 7 дней", value: "5 102" },
      { label: "Конверсия", value: "4,1%" },
      { label: "Заказы", value: "209" },
    ],
    description: "Витрина и заказ прямо в Telegram, общая корзина и каталог с сайтом.",
  },
  {
    id: "crm",
    kind: "crm",
    title: "CRM / Админка",
    status: "live",
    version: "v2.1",
    updated: "8 ноя, 14:20",
    env: "production",
    preview: BASE + "/images/mock-crm.png",
    metrics: [
      { label: "Заказов в работе", value: "37" },
      { label: "Среднее время сборки", value: "18 мин" },
      { label: "Сотрудников", value: "4" },
    ],
    description: "Заказы, клиенты, товары и остатки — для менеджеров и склада.",
  },
  {
    id: "courier",
    kind: "courier",
    title: "Приложение курьера",
    status: "building",
    version: "v0.6",
    updated: "сегодня, 09:15",
    env: "staging",
    preview: BASE + "/images/mock-courier.png",
    metrics: [
      { label: "Готовность", value: "70%" },
      { label: "Тестовых доставок", value: "12" },
      { label: "Осталось шагов", value: "3" },
    ],
    description: "Маршруты, статусы доставки и фото-подтверждение для курьеров.",
  },
  {
    id: "mobile",
    kind: "mobile",
    title: "Мобильное приложение",
    status: "planned",
    version: "—",
    updated: "в плане",
    env: "draft",
    preview: BASE + "/images/mock-mobile.png",
    metrics: [
      { label: "Оценка эффекта", value: "до +40% повторных" },
      { label: "Срок сборки", value: "≈ 3 недели" },
      { label: "Платформы", value: "iOS, Android" },
    ],
    description: "Приложение для постоянных клиентов: быстрый повтор заказа и push.",
  },
];

export const productReleases = [
  { version: "v1.8", date: "сегодня, 10:42", author: "AI-архитектор", text: "Блок «Новинки недели» на главной", env: "production" as const, approvedBy: "Роман Ф." },
  { version: "v1.7", date: "6 ноя, 16:30", author: "Роман Ф.", text: "Новые фото каталога сыров", env: "production" as const, approvedBy: "Роман Ф." },
  { version: "v1.6", date: "2 ноя, 11:02", author: "AI-архитектор", text: "Оплата через СБП в корзине", env: "production" as const, approvedBy: "Роман Ф." },
  { version: "v1.5", date: "28 окт, 09:48", author: "Анна С.", text: "Исправлены цены в разделе «Хамон»", env: "production" as const, approvedBy: "Анна С." },
];

export const publishChecks = [
  { label: "Сборка без ошибок", ok: true },
  { label: "Тесты оформления заказа", ok: true },
  { label: "Оплата в тестовом режиме", ok: true },
  { label: "Скорость загрузки 1,4 с", ok: true },
  { label: "Проверка безопасности", ok: true },
];

/* ───────── Заказы ───────── */
export type OrderStatus = "new" | "assembling" | "delivering" | "done" | "canceled";
export const orderStatusMeta: Record<OrderStatus, { label: string; kind: StatusKind }> = {
  new: { label: "Новый", kind: "new" },
  assembling: { label: "Сборка", kind: "building" },
  delivering: { label: "В пути", kind: "building" },
  done: { label: "Доставлен", kind: "live" },
  canceled: { label: "Отменён", kind: "planned" },
};

export type Order = {
  id: string;
  client: string;
  channel: "Сайт" | "Mini App" | "Telegram-бот" | "Телефон";
  items: string;
  total: string;
  status: OrderStatus;
  time: string;
  payment: "Оплачен" | "При получении" | "Ожидает оплаты";
  address: string;
  courier?: string;
};

export const orders: Order[] = [
  { id: "4291", client: "Екатерина Л.", channel: "Mini App", items: "Сырная тарелка, хамон 200 г", total: "₽4 380", status: "new", time: "2 мин назад", payment: "Оплачен", address: "ул. Остоженка, 12" },
  { id: "4290", client: "Дмитрий В.", channel: "Сайт", items: "Оливки каламата, пармезан", total: "₽2 150", status: "new", time: "9 мин назад", payment: "Ожидает оплаты", address: "Ленинский пр-т, 64" },
  { id: "4289", client: "Ольга Т.", channel: "Сайт", items: "Набор «Ужин на двоих»", total: "₽6 900", status: "assembling", time: "24 мин назад", payment: "Оплачен", address: "ул. Арбат, 31" },
  { id: "4288", client: "Сергей К.", channel: "Telegram-бот", items: "Бри, мёд, грецкий орех", total: "₽1 840", status: "assembling", time: "41 мин назад", payment: "При получении", address: "Пресненская наб., 8" },
  { id: "4287", client: "Наталья П.", channel: "Mini App", items: "Хамон серрано 500 г", total: "₽5 200", status: "delivering", time: "1 ч назад", payment: "Оплачен", address: "Кутузовский пр-т, 24", courier: "Илья К." },
  { id: "4286", client: "Артём Г.", channel: "Сайт", items: "Сыр комте, багет", total: "₽1 390", status: "delivering", time: "1 ч назад", payment: "Оплачен", address: "ул. Тверская, 18", courier: "Илья К." },
  { id: "4285", client: "Мария Р.", channel: "Телефон", items: "Подарочная корзина", total: "₽9 800", status: "done", time: "3 ч назад", payment: "Оплачен", address: "Б. Никитская, 5", courier: "Павел Д." },
  { id: "4284", client: "Игорь С.", channel: "Mini App", items: "Прошутто, моцарелла", total: "₽2 760", status: "done", time: "4 ч назад", payment: "Оплачен", address: "Цветной б-р, 15", courier: "Павел Д." },
  { id: "4283", client: "Анна М.", channel: "Сайт", items: "Оливковое масло 1 л", total: "₽1 950", status: "canceled", time: "5 ч назад", payment: "Ожидает оплаты", address: "ул. Покровка, 40" },
];

/* ───────── Клиенты ───────── */
export type Segment = "Новый" | "Постоянный" | "VIP" | "Уснувший";
export type Client = {
  id: string;
  name: string;
  phone: string;
  segment: Segment;
  orders: number;
  ltv: string;
  last: string;
  channel: "Сайт" | "Mini App" | "Telegram-бот" | "Телефон";
  favorite: string;
};

export const clients: Client[] = [
  { id: "c1", name: "Мария Романова", phone: "+7 916 ••• 42 18", segment: "VIP", orders: 34, ltv: "₽148 200", last: "сегодня", channel: "Телефон", favorite: "Подарочные корзины" },
  { id: "c2", name: "Наталья Петрова", phone: "+7 903 ••• 11 07", segment: "VIP", orders: 27, ltv: "₽116 900", last: "сегодня", channel: "Mini App", favorite: "Хамон" },
  { id: "c3", name: "Ольга Титова", phone: "+7 925 ••• 63 90", segment: "Постоянный", orders: 12, ltv: "₽52 400", last: "сегодня", channel: "Сайт", favorite: "Наборы" },
  { id: "c4", name: "Сергей Кузнецов", phone: "+7 977 ••• 28 44", segment: "Постоянный", orders: 9, ltv: "₽24 300", last: "сегодня", channel: "Telegram-бот", favorite: "Сыры" },
  { id: "c5", name: "Екатерина Лебедева", phone: "+7 915 ••• 75 31", segment: "Новый", orders: 1, ltv: "₽4 380", last: "сегодня", channel: "Mini App", favorite: "Сыры" },
  { id: "c6", name: "Дмитрий Волков", phone: "+7 999 ••• 03 66", segment: "Новый", orders: 1, ltv: "₽2 150", last: "сегодня", channel: "Сайт", favorite: "Оливки" },
  { id: "c7", name: "Игорь Смирнов", phone: "+7 926 ••• 19 52", segment: "Постоянный", orders: 7, ltv: "₽19 800", last: "вчера", channel: "Mini App", favorite: "Мясные деликатесы" },
  { id: "c8", name: "Анна Морозова", phone: "+7 905 ••• 87 20", segment: "Уснувший", orders: 4, ltv: "₽9 100", last: "62 дня назад", channel: "Сайт", favorite: "Масло и соусы" },
  { id: "c9", name: "Павел Егоров", phone: "+7 917 ••• 54 09", segment: "Уснувший", orders: 3, ltv: "₽7 450", last: "75 дней назад", channel: "Сайт", favorite: "Сыры" },
  { id: "c10", name: "Артём Григорьев", phone: "+7 985 ••• 36 71", segment: "Постоянный", orders: 6, ltv: "₽11 200", last: "сегодня", channel: "Сайт", favorite: "Сыры" },
];

/* ───────── Улучшения (гипотезы AI) ───────── */
export type Hypothesis = {
  id: string;
  title: string;
  product: string;
  basis: string;
  effect: string;
  confidence: "Высокая" | "Средняя" | "Низкая";
  cost: string;
  status: "new" | "testing" | "applied" | "dismissed";
  before: string;
  after: string;
};

export const hypotheses: Hypothesis[] = [
  {
    id: "h1",
    title: "Кнопка «Повторить заказ» в Mini App",
    product: "Telegram Mini App",
    basis: "41% клиентов заказывают те же позиции. Сейчас повтор занимает 6 шагов.",
    effect: "+8–12% повторных заказов",
    confidence: "Высокая",
    cost: "≈ 40 кредитов · 1 день",
    status: "new",
    before: "Каталог → поиск товара → карточка → корзина (6 шагов)",
    after: "Профиль → «Повторить» → оплата (2 шага)",
  },
  {
    id: "h2",
    title: "Напоминание о брошенной корзине",
    product: "AI-агент продаж",
    basis: "За неделю 214 корзин не дошли до оплаты, средний чек брошенной корзины ₽2 900.",
    effect: "вернуть 6–9% корзин",
    confidence: "Средняя",
    cost: "≈ 15 кредитов · 2 часа",
    status: "new",
    before: "Корзина пропадает, клиенту никто не пишет",
    after: "Через 2 часа — сообщение в Telegram со ссылкой на корзину",
  },
  {
    id: "h3",
    title: "Бесплатная доставка от ₽3 000",
    product: "Сайт магазина",
    basis: "Медианный чек ₽2 640. Порог чуть выше чека обычно увеличивает средний заказ.",
    effect: "+5–7% к среднему чеку",
    confidence: "Средняя",
    cost: "≈ 10 кредитов · 1 час",
    status: "testing",
    before: "Доставка ₽350 при любой сумме",
    after: "Полоса прогресса «до бесплатной доставки ₽360»",
  },
  {
    id: "h4",
    title: "Сократить форму оформления на сайте",
    product: "Сайт магазина",
    basis: "28% уходят на шаге адреса: 9 полей, из них 4 необязательных.",
    effect: "+0,4–0,6 п.п. к конверсии",
    confidence: "Высокая",
    cost: "≈ 25 кредитов · 1 день",
    status: "new",
    before: "9 полей на одном экране",
    after: "5 полей и подсказки адреса",
  },
  {
    id: "h5",
    title: "Блок «Новинки недели» на главной",
    product: "Сайт магазина",
    basis: "Новые позиции получали 3% просмотров каталога.",
    effect: "+18% просмотров новинок (факт)",
    confidence: "Высокая",
    cost: "38 кредитов",
    status: "applied",
    before: "Новинки только в каталоге",
    after: "Блок на главной, обновляется автоматически",
  },
];

/* ───────── AI-агенты ───────── */
export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  enabled: boolean;
  channel: string;
  today: { label: string; value: string }[];
  pending: number;
  permissions: { label: string; mode: "auto" | "approve" | "off" }[];
  budget: { used: number; limit: number };
  tone: "blue" | "violet" | "teal" | "amber" | "rose" | "green";
};

export const agents: Agent[] = [
  {
    id: "support",
    name: "Поддержка клиентов",
    role: "Отвечает в Telegram и на сайте",
    description: "Отвечает на вопросы о товарах, доставке и статусе заказа. Сложные случаи передаёт менеджеру.",
    enabled: true,
    channel: "Telegram, сайт",
    today: [
      { label: "Диалогов за день", value: "86" },
      { label: "Решено без людей", value: "79%" },
    ],
    pending: 0,
    permissions: [
      { label: "Отвечать клиентам", mode: "auto" },
      { label: "Менять адрес и время доставки", mode: "approve" },
      { label: "Оформлять возврат", mode: "off" },
    ],
    budget: { used: 312, limit: 1000 },
    tone: "blue",
  },
  {
    id: "sales",
    name: "Продажи",
    role: "Возвращает брошенные корзины",
    description: "Напоминает о корзине, предлагает похожие товары. Скидки — только с вашего согласия.",
    enabled: true,
    channel: "Telegram",
    today: [
      { label: "Напоминаний за день", value: "34" },
      { label: "Вернулось заказов", value: "5" },
    ],
    pending: 2,
    permissions: [
      { label: "Писать клиентам о корзине", mode: "auto" },
      { label: "Давать скидку до 10%", mode: "approve" },
      { label: "Менять цены", mode: "off" },
    ],
    budget: { used: 184, limit: 600 },
    tone: "violet",
  },
  {
    id: "marketing",
    name: "Маркетинг",
    role: "Готовит рассылки по сегментам",
    description: "Собирает подборки и тексты рассылок. Ничего не отправляет без вашего подтверждения.",
    enabled: true,
    channel: "Telegram, email",
    today: [
      { label: "Черновиков рассылок", value: "2" },
      { label: "Клиентов в сегменте", value: "312" },
    ],
    pending: 1,
    permissions: [
      { label: "Готовить черновики", mode: "auto" },
      { label: "Отправлять рассылки", mode: "approve" },
      { label: "Тратить рекламный бюджет", mode: "off" },
    ],
    budget: { used: 96, limit: 400 },
    tone: "rose",
  },
  {
    id: "stock",
    name: "Склад",
    role: "Следит за остатками",
    description: "Предупреждает, когда товар заканчивается, и готовит заказ поставщику.",
    enabled: false,
    channel: "CRM",
    today: [
      { label: "Позиций под контролем", value: "148" },
      { label: "Заканчивается", value: "на паузе" },
    ],
    pending: 0,
    permissions: [
      { label: "Скрывать товар без остатка", mode: "auto" },
      { label: "Отправлять заказ поставщику", mode: "approve" },
    ],
    budget: { used: 0, limit: 300 },
    tone: "amber",
  },
];

export const agentLog = [
  { time: "11:42", agent: "Продажи", text: "Предлагает скидку 7% Дмитрию В. на корзину ₽2 150", needsApproval: true },
  { time: "11:30", agent: "Маркетинг", text: "Подготовил рассылку «Новинки недели» для 312 постоянных клиентов", needsApproval: true },
  { time: "11:18", agent: "Поддержка клиентов", text: "Ответил Екатерине Л. о времени доставки заказа №4291", needsApproval: false },
  { time: "10:55", agent: "Продажи", text: "Напомнил о корзине 12 клиентам, вернулось 2 заказа", needsApproval: false },
  { time: "10:31", agent: "Поддержка клиентов", text: "Передал менеджеру вопрос о возврате (заказ №4279)", needsApproval: false },
];

/* ───────── Аналитика ───────── */
export const revenueSeries = [
  42, 48, 45, 51, 57, 54, 49, 58, 62, 60, 66, 71, 64, 59, 68, 73, 70, 76, 81, 78, 72, 84, 88, 83, 91, 95, 89, 97, 102, 99,
]; // тыс. ₽ в день, 30 дней

export const channelShare = [
  { label: "Сайт", value: 38, color: "#1769ff" },
  { label: "Telegram Mini App", value: 34, color: "#7c3aed" },
  { label: "Telegram-бот", value: 16, color: "#22b3c9" },
  { label: "Телефон", value: 12, color: "#c3cad6" },
];

export const funnel = [
  { label: "Визиты", value: 12480 },
  { label: "Добавили в корзину", value: 2140 },
  { label: "Начали оформление", value: 1690 },
  { label: "Оплатили", value: 1436 },
];

export const topItems = [
  { name: "Хамон серрано 500 г", sold: 214, revenue: "₽1 112 800", trend: 12 },
  { name: "Сырная тарелка", sold: 198, revenue: "₽514 800", trend: 8 },
  { name: "Набор «Ужин на двоих»", sold: 87, revenue: "₽600 300", trend: 21 },
  { name: "Пармезан 24 мес.", sold: 156, revenue: "₽265 200", trend: -4 },
  { name: "Оливки каламата", sold: 241, revenue: "₽168 700", trend: 3 },
];

/* ───────── Интеграции ───────── */
export type Integration = {
  id: string;
  name: string;
  category: "Оплата" | "Доставка" | "Учёт и склад" | "Маркетинг" | "Каналы продаж" | "Аналитика";
  description: string;
  connected: boolean;
  brand?: "yookassa" | "sbp" | "sber";
  color: string;
  usedBy?: string;
};

export const integrations: Integration[] = [
  { id: "yookassa", name: "ЮKassa", category: "Оплата", description: "Приём карт и СБП на сайте и в Mini App", connected: true, brand: "yookassa", color: "#0070f0", usedBy: "Сайт, Mini App" },
  { id: "sbp", name: "СБП", category: "Оплата", description: "Оплата по QR и в один тап из банка", connected: true, brand: "sbp", color: "#5b57a2", usedBy: "Сайт, Mini App" },
  { id: "sber", name: "СберБанк эквайринг", category: "Оплата", description: "Интернет-эквайринг и SberPay", connected: false, brand: "sber", color: "#21a038" },
  { id: "cdek", name: "СДЭК", category: "Доставка", description: "Доставка по России и пункты выдачи", connected: false, color: "#1ab248" },
  { id: "yadelivery", name: "Яндекс Доставка", category: "Доставка", description: "Экспресс-доставка по городу за 1–2 часа", connected: true, color: "#fc3f1d", usedBy: "CRM" },
  { id: "moysklad", name: "МойСклад", category: "Учёт и склад", description: "Остатки, закупки и документы", connected: true, color: "#1c8bdc", usedBy: "CRM" },
  { id: "1c", name: "1С", category: "Учёт и склад", description: "Обмен товарами и заказами с 1С", connected: false, color: "#f2c94c" },
  { id: "telegram", name: "Telegram", category: "Каналы продаж", description: "Бот, Mini App и уведомления клиентам", connected: true, color: "#27a6e5", usedBy: "Mini App, агенты" },
  { id: "vk", name: "VK", category: "Каналы продаж", description: "Сообщения сообщества и товары VK", connected: false, color: "#0077ff" },
  { id: "ozon", name: "Ozon", category: "Каналы продаж", description: "Выгрузка каталога и заказов", connected: false, color: "#005bff" },
  { id: "wb", name: "Wildberries", category: "Каналы продаж", description: "Выгрузка каталога и остатков", connected: false, color: "#a73afd" },
  { id: "unisender", name: "Unisender", category: "Маркетинг", description: "Email-рассылки по сегментам", connected: false, color: "#3d5afe" },
  { id: "metrika", name: "Яндекс Метрика", category: "Аналитика", description: "Посещаемость и цели на сайте", connected: true, color: "#ffcc00", usedBy: "Сайт" },
];

/* ───────── Команда ───────── */
export type Role = "Владелец" | "Администратор" | "Менеджер" | "Курьер" | "Маркетолог";
export const team: { name: string; email: string; role: Role; status: "active" | "invited"; last: string }[] = [
  { name: "Роман Фалькин", email: "owner@delikatesy.ru", role: "Владелец", status: "active", last: "сейчас" },
  { name: "Анна Смирнова", email: "anna@delikatesy.ru", role: "Менеджер", status: "active", last: "5 мин назад" },
  { name: "Мария Орлова", email: "maria@delikatesy.ru", role: "Маркетолог", status: "active", last: "вчера" },
  { name: "Илья Козлов", email: "+7 926 ••• 11 40", role: "Курьер", status: "active", last: "12 мин назад" },
  { name: "Павел Данилов", email: "+7 916 ••• 77 02", role: "Курьер", status: "invited", last: "приглашение отправлено" },
];

export const rolePermissions: { area: string; access: Record<Role, "full" | "view" | "none"> }[] = [
  { area: "Заказы", access: { Владелец: "full", Администратор: "full", Менеджер: "full", Курьер: "view", Маркетолог: "view" } },
  { area: "Клиенты", access: { Владелец: "full", Администратор: "full", Менеджер: "full", Курьер: "none", Маркетолог: "view" } },
  { area: "Продукты и публикация", access: { Владелец: "full", Администратор: "full", Менеджер: "view", Курьер: "none", Маркетолог: "view" } },
  { area: "AI-агенты", access: { Владелец: "full", Администратор: "full", Менеджер: "view", Курьер: "none", Маркетолог: "full" } },
  { area: "Биллинг", access: { Владелец: "full", Администратор: "view", Менеджер: "none", Курьер: "none", Маркетолог: "none" } },
];

/* ───────── Настройки ───────── */
export const plans = [
  { id: "free", name: "Free", price: "0 ₽", note: "чтобы попробовать", features: ["1 черновик проекта", "Карта экосистемы", "До 2 дизайн-концепций", "Без публикации"] },
  { id: "start", name: "Start", price: "2 990 ₽", note: "в месяц", features: ["До 2 активных продуктов", "1–2 участника", "Редактор и история версий", "Базовые метрики"] },
  { id: "business", name: "Business", price: "7 990 ₽", note: "в месяц", features: ["До 5 активных продуктов", "До 5 участников", "Интеграции и автоматизации", "Несколько окружений"] },
  { id: "scale", name: "Scale", price: "от 19 990 ₽", note: "в месяц", features: ["Индивидуальные лимиты", "Несколько организаций", "Расширенные журналы", "SLA по договору"] },
];

export const usage = [
  { label: "Активные продукты", used: 4, limit: 5, unit: "" },
  { label: "Участники", used: 5, limit: 5, unit: "" },
  { label: "AI-кредиты", used: 1240, limit: 3000, unit: "" },
];

export const auditLog = [
  { time: "сегодня, 10:42", who: "Роман Ф.", what: "Опубликовал «Сайт магазина» v1.8 в production", kind: "publish" },
  { time: "сегодня, 10:40", who: "AI-архитектор", what: "Подготовил изменение «Новинки недели» (38 кредитов)", kind: "ai" },
  { time: "сегодня, 09:15", who: "AI-архитектор", what: "Собрал «Приложение курьера» v0.6 в staging", kind: "ai" },
  { time: "вчера, 18:05", who: "Анна С.", what: "Опубликовала «Telegram Mini App» v1.3", kind: "publish" },
  { time: "вчера, 12:31", who: "Роман Ф.", what: "Подключил Яндекс Доставку", kind: "integration" },
  { time: "8 ноя, 16:10", who: "Роман Ф.", what: "Пригласил Павла Данилова (роль «Курьер»)", kind: "team" },
];

/* ───────── Уведомления ───────── */
export const notifications = [
  { id: "n1", title: "Агент «Продажи» ждёт решения", text: "Скидка 7% для Дмитрия В. на корзину ₽2 150", time: "2 мин", unread: true, href: "/agents" },
  { id: "n2", title: "Новый заказ №4291", text: "Екатерина Л. · ₽4 380 · оплачен", time: "2 мин", unread: true, href: "/orders" },
  { id: "n3", title: "Приложение курьера собрано в staging", text: "Можно проверить перед публикацией", time: "2 ч", unread: false, href: "/products/courier" },
  { id: "n4", title: "AI нашёл 3 точки роста", text: "Оценка эффекта до +12% повторных заказов", time: "вчера", unread: false, href: "/improvements" },
];
