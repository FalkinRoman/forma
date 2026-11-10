import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/onboarding/login-form";

export const metadata: Metadata = { title: "Вход" };

export default function LoginPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 45% at 50% 0%, rgba(23,105,255,0.09) 0%, rgba(250,251,253,0) 80%)" }}
      />
      <Link href="/" aria-label="FORMA — на главную" className="relative mb-8"><Logo /></Link>
      <div className="relative w-full max-w-[420px] rounded-modal border border-line bg-surface p-6 shadow-raised sm:p-8">
        <LoginForm />
      </div>
      <p className="relative mt-6 max-w-[420px] text-center text-micro text-ink-3">
        Продолжая, вы соглашаетесь с условиями сервиса и обработкой персональных данных. Данные хранятся в России.
      </p>
    </div>
  );
}
