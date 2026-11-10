import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <Logo className="mb-10" />
      <span className="flex size-14 items-center justify-center rounded-[18px] border border-line bg-surface text-accent shadow-card">
        <Compass className="size-6" />
      </span>
      <h1 className="mt-5 text-h1 font-bold">Такой страницы нет</h1>
      <p className="mt-2 max-w-sm text-body text-ink-2">Возможно, ссылка устарела. Всё важное — на карте вашего бизнеса.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/overview" className={buttonVariants({ variant: "primary" })}>Открыть «Мой бизнес»</Link>
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>На главную</Link>
      </div>
    </div>
  );
}
