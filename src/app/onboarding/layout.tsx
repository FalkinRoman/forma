import Link from "next/link";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

/** Мастер создания: без бокового меню — один фокус, один следующий шаг. */
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(23,105,255,0.08) 0%, rgba(250,251,253,0) 75%)" }}
      />
      <header className="relative mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="FORMA — на главную"><Logo /></Link>
        <Link
          href="/overview"
          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-body-sm font-medium text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
        >
          <X className="size-4" /> Сохранить и выйти
        </Link>
      </header>
      <main className="relative mx-auto max-w-5xl px-4 pt-6 pb-20 sm:px-6 sm:pt-10">{children}</main>
    </div>
  );
}
