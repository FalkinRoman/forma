# FORMA: промты картинок в стиле Apple (финальная версия)

Эта версия заменяет все прошлые промты. Правила для всех картинок:
- никаких логотипов, никакого слова FORMA и вообще никакого читаемого текста;
- никаких товаров, еды и фото людей;
- на экранах устройств только абстрактный интерфейс: скруглённые карточки, полоски вместо текста, кружки вместо иконок;
- подача как на сайте Apple: спокойный свет, много воздуха, один объект в кадре, мягкая тень, стекло и металл.

## Как пользоваться

1. Новый чат с ChatGPT. Первым сообщением вставь **Базовый стиль**.
2. Дальше вставляй промты по одному. Если стиль поплыл, напиши: *Same style as before: no text, no logos, same light and palette.*
3. Сохраняй под указанным именем и присылай мне архивом. Фон я вырежу сам.

---

## Базовый стиль (первым сообщением)

```
Create a consistent series of images for a calm, premium software interface. Follow these rules for EVERY image in this chat:

LOOK: Apple product-page aesthetic. Minimal, airy, precise. Soft diffused studio light from the top-left, very soft contact shadow, subtle reflections. Photoreal 3D render, crisp edges, high detail.
MATERIALS: frosted glass, polished aluminium, natural titanium, soft-touch matte surfaces. Rounded corners everywhere (continuous "squircle" curves).
PALETTE: white and very light cool grey (#FAFBFD, #F4F6F9, #E8EBF0), one accent gradient from blue #1769FF to violet #7C3AED, small touches of green #28A745 only for "success" dots.
DEVICES: generic unbranded laptop / smartphone / tablet in silver or titanium, thin bezels. No brand logos, no camera text.
SCREENS: abstract UI only — rounded white cards, soft grey bars instead of text, small circles instead of icons, one blue accent button shape, simple chart curves. Absolutely no readable letters, numbers, logos or photos on screens.
STRICTLY FORBIDDEN: any text, letters, numbers, logos, brand names, watermarks, food, products, people, hands.
BACKGROUND: transparent PNG. If transparency is not possible — pure flat #FFFFFF, no floor line, no vignette, no texture.
COMPOSITION: one subject, centered, nothing cropped unless stated, 10% empty padding around.
Reply "ok" and wait for the first image request.
```

---

## 1. Превью продуктов на карте бизнеса

Формат **1536×1024**. Объект прижат к нижнему краю: снизу 4% отступа, по бокам 8%. Эти же картинки пойдут в раздел «Продукты» и в обзор продукта.

**site.png: Сайт**
```
A thin silver laptop at a 3/4 angle (rotated ~20° right), lid open ~110°. Screen shows an abstract website: a wide soft blue→violet gradient hero block with a soft 3D wave shape, two grey text bars and one small blue pill button, below it a row of three white rounded cards. Anchored to the bottom edge.
```

**mobile.png: Мобильное приложение**
```
Two titanium smartphones standing side by side, slightly overlapping, tilted back ~15° and turned toward each other. Screens: abstract app UI — left: one large rounded gradient card and a blue pill button; right: a 2×3 grid of white rounded tiles with small grey circles. Anchored to the bottom edge.
```

**miniapp.png: Mini App в мессенджере**
```
One titanium smartphone at a 3/4 angle, slightly tilted back, cut off by the bottom edge of the frame (top 75% visible). Screen: abstract messenger mini-app — thin top bar with a small round back button, a small violet→blue pill, then three white rounded tiles in a row with simple outline circle icons, grey bars below. Background of screen very light grey.
```

**crm.png: CRM / Админка**
```
A floating flat dashboard panel without a device frame, slight perspective tilt (~10°), soft shadow. Left: a narrow dark graphite vertical sidebar with small round dots. Main area: white, a rising bar chart with blue→violet gradient bars, a donut chart ring, a row of small white KPI cards with grey bars. No text, no numbers.
```

**courier.png: Курьеры**
```
A titanium smartphone at a 3/4 angle, cut off by the bottom edge. Screen: a very light abstract map (soft grey roads, pale green park shapes) with a smooth blue→violet route line ending at a blue location pin. In front of the phone, overlapping its lower-left corner, a floating white rounded chip with a small box outline icon and two grey bars.
```

**agents.png: AI-агенты**
```
A thick rounded-square slab of frosted glass, isometric view, blue→violet gradient with a glowing violet edge light underneath, resting on a slightly larger translucent base layer. On its top face, an embossed glossy white four-point sparkle star. Soft violet glow below.
```

**analytics.png: Аналитика**
```
A soft 3D area chart floating in space: a smooth curved violet line rising left to right, filled below with a translucent blue→violet gradient fading to transparent. On the right part of the line, one glowing violet dot with a thin vertical guide line and a small empty white rounded tooltip bubble above it. No axes, no grid, no text.
```

---

## 2. Иконки модулей (окно «Добавить модуль») и AI-агентов

Формат **1024×1024**, объект по центру, занимает 70% кадра. Один шаблон на все иконки, меняется только символ в скобках:

```
A single 3D app-style icon: a rounded-square slab of frosted glass, isometric 3/4 view, blue→violet gradient (#1769FF → #7C3AED), soft inner glow, glossy highlight along the top edge. Floating slightly above it, a glossy white 3D symbol: [SYMBOL]. Soft violet glow beneath. No text.
```

| Файл | Для чего | [SYMBOL] |
|---|---|---|
| chatbot.png | Бот | a speech bubble with a small paper plane |
| marketplace.png | Маркетплейсы | a shopping bag with a small awning on top |
| booking.png | Бронирование | a calendar page with a check mark |
| payments.png | Онлайн-оплата | a bank card with a contactless wave |
| warehouse.png | Склад | three stacked boxes |
| staff.png | Приложение сотрудника | an ID badge with a simple person silhouette |
| loyalty.png | Лояльность | a gift box with a small star |
| mailing.png | Рассылки | an envelope with a small dot |
| reviews.png | Отзывы | a star inside a speech bubble |
| integrations.png | Интеграции | two puzzle pieces clicking together |
| agent-support.png | Агент поддержки | a headset with a small speech bubble |
| agent-sales.png | Агент продаж | a shopping cart with a circular arrow |
| agent-marketing.png | Агент маркетинга | a megaphone with two small sparkles |
| agent-stock.png | Агент склада | a box with a small bell |

---

## 3. Ядро бизнеса (центр карты)

**core.png**, 1024×1024.
```
Three thin rounded-square glass plates stacked vertically with even gaps, floating, isometric view. Top plate light sky-blue, middle blue, bottom violet; glossy edges, light passing through, soft inner glow. Soft blue-violet glow beneath the stack. Centered, 60% of frame.
```

---

## 4. Стартовая: «Как это работает»

1024×1024, в стиле иконок модулей, без плиты-основы, объект занимает 65% кадра.

| Файл | Шаг | Промт |
|---|---|---|
| step-1-idea.png | Опишите идею | `A 3D frosted-glass speech bubble with a small glossy white sparkle star on top, blue→violet gradient, soft glow.` |
| step-2-plan.png | Получите план | `A 3D frosted-glass clipboard with three glossy white check-mark rows, blue→violet gradient, soft glow.` |
| step-3-style.png | Выберите стиль | `Three small rounded glass cards fanned out like a hand of cards, tinted sky-blue, blue and violet, the front card showing an abstract white layout of rounded blocks. Soft glow.` |
| step-4-launch.png | Запустите и растите | `Four rising rounded glass columns with blue→violet gradient and a glossy white arrow curving upward above them. Soft glow.` |

---

## 5. Карточка «Следующий этап» (дорожная карта)

**next-stage.png**, 1536×1024.
```
Two titanium smartphones floating side by side, tilted back ~20° and slightly rotated, abstract app screens: left — a large rounded gradient banner card and a grid of white tiles; right — a vertical progress tracker with three dots connected by a line and a blue pill button. Soft blue-violet glow behind. Subject in the right 60% of the frame, left side empty.
```

---

## 6. Пустые состояния разделов

1024×1024, в стиле иконок модулей, без плиты-основы, объект занимает 55% кадра.

| Файл | Раздел | Объект |
|---|---|---|
| empty-orders.png | Заказы | a glass shopping bag with a small glowing check mark |
| empty-clients.png | Клиенты | three glass person silhouettes standing in a row |
| empty-products.png | Продукты | three stacked glass app windows of different sizes |
| empty-analytics.png | Аналитика | a glass donut chart with one violet segment lifted out |
| empty-agents.png | AI-агенты | a friendly rounded glass robot head with two glowing dots as eyes |
| empty-improvements.png | Улучшения | a glass magnifying glass over a small rising bar chart |
| empty-integrations.png | Интеграции | two glass puzzle pieces almost touching, glow between them |
| empty-team.png | Команда | two glass chat bubbles with simple person silhouettes |
| empty-search.png | Поиск ничего не нашёл | a glass magnifying glass with a small question mark |

---

## 7. Вход, мастер создания, служебные экраны

**login-visual.png**, 1024×1024.
```
A cluster of three floating rounded frosted-glass tiles, slightly rotated, blue→violet gradient, the front tile carries a glossy white key symbol. Soft glow. Centered, 55% of frame.
```

**launch-success.png**, 1024×1024.
```
A 3D frosted blue→violet glass rocket lifting off from a small platform of three stacked rounded glass plates, a soft cloud of white glow below, a few tiny sparkles. Centered, 65% of frame.
```

**not-found.png**, 1024×1024.
```
A 3D frosted-glass compass lying slightly tilted, blue→violet gradient rim, the needle is a glossy white arrow pointing up-right. Soft glow. Centered, 55% of frame.
```

**og-cover.png**, 1200×630, белый фон #FAFBFD, без прозрачности. Обложка для ссылок.
```
Wide banner on flat #FAFBFD background. Right half: three stacked frosted glass plates glowing blue-violet, surrounded by five small floating abstract UI cards (a laptop with an abstract site, a phone with abstract tiles, a dashboard card with bars, a map card with a route line, a chart card with a curve), connected to the plates by thin light-violet lines with small glowing dots. Left half completely empty. No text, no logos.
```

---

## Не генерировать

- **Логотип FORMA.** Он уже стоит в интерфейсе слева вверху.
- **Знаки ЮKassa, СБП и Сбера.** В проекте уже официальные векторы.
- **Иконки меню и кнопок, графики, аватары.** Всё это делается кодом.
