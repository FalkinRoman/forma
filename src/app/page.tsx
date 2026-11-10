import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { StartFlow } from "@/components/onboarding/start-flow";

const how = [
  { img: "/images/3d-ai.png", title: "Опишите идею", text: "Своими словами, голосом или файлами. AI спросит только важное." },
  { img: "/images/3d-platform.png", title: "Получите план", text: "Какие продукты нужны и зачем — сайт, Mini App, CRM, агенты." },
  { img: "/images/3d-bolt.png", title: "Выберите стиль", text: "2–3 дизайн-концепции вашего бренда с превью экранов." },
  { img: "/images/3d-growth.png", title: "Запустите и растите", text: "Публикация с подтверждением, дальше — карта бизнеса и улучшения." },
];

export default function StartPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* мягкое световое пятно — без насыщенных градиентов */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(23,105,255,0.08) 0%, rgba(23,105,255,0.03) 45%, rgba(250,251,253,0) 75%)",
        }}
      />

      <header className="relative mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
          <Link href="/design-system" className={buttonVariants({ variant: "ghost", size: "md", className: "hidden sm:inline-flex" })}>
            Дизайн-система
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "md" })}>
            Войти
          </Link>
          <Link href="/overview" className={buttonVariants({ variant: "secondary", size: "md" })}>
            <LayoutDashboard /> Демо-кабинет
          </Link>
        </nav>
      </header>

      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-10 pb-20 text-center sm:px-6 sm:pt-16">
        <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-caption font-medium text-ink-2 shadow-xs">
          <span className="size-1.5 rounded-full bg-accent" /> AI Business OS для малого и среднего бизнеса
        </span>
        <h1 className="mt-5 text-[32px] leading-[1.12] font-bold tracking-[-0.025em] text-balance sm:text-display">
          Расскажите о бизнесе —<br className="hidden sm:block" /> FORMA соберёт всё остальное
        </h1>
        <p className="mt-4 max-w-xl text-body text-ink-2 sm:text-[17px]">
          Сайт, Telegram Mini App, CRM и AI-агенты на общих данных. Без программистов и технических решений с вашей стороны.
        </p>

        <div className="mt-10 w-full">
          <StartFlow />
        </div>
      </main>


      <section aria-labelledby="how-title" className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 id="how-title" className="text-center text-h2 font-semibold">
          Как это работает
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {how.map((s, i) => {
            return (
              <li key={s.title} className="rounded-card border border-line bg-surface p-5 shadow-card">
                <div className="flex items-start justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" className="h-16 w-auto" />
                  <span className="text-caption font-semibold text-ink-3 tabular">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-body font-semibold">{s.title}</h3>
                <p className="mt-1 text-caption text-ink-2">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
