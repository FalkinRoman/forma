"use client";

import { ArrowLeft, Mail, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Вход без пароля: Telegram или код на почту. 2 шага, всегда есть путь назад. */
export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const sendCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setErr("Проверьте почту — например, anna@shop.ru");
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep("code");
      setLeft(45);
      setTimeout(() => refs.current[0]?.focus(), 50);
    }, 700);
  };

  const onDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = code.map((c, k) => (k === i ? d : c));
    setCode(next);
    setErr("");
    if (d && i < 3) refs.current[i + 1]?.focus();
    if (next.every(Boolean)) {
      setBusy(true);
      setTimeout(() => router.push("/overview"), 600);
    }
  };

  if (step === "code")
    return (
      <div>
        <button type="button" onClick={() => setStep("email")} className="mb-4 inline-flex items-center gap-1 text-caption font-medium text-ink-2 hover:text-ink">
          <ArrowLeft className="size-4" /> Другая почта
        </button>
        <h1 className="text-h2 font-semibold">Введите код</h1>
        <p className="mt-1 text-body-sm text-ink-2">Отправили 4 цифры на {email}</p>
        <div className="mt-6 flex justify-between gap-3" role="group" aria-label="Код из письма">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={c}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`Цифра ${i + 1}`}
              onChange={(e) => onDigit(i, e.target.value)}
              onKeyDown={(e) => e.key === "Backspace" && !c && i > 0 && refs.current[i - 1]?.focus()}
              className="h-14 w-full rounded-btn border border-line bg-surface text-center text-h2 font-semibold tabular outline-none focus:border-accent focus:ring-4 focus:ring-accent-ring"
            />
          ))}
        </div>
        <Button className="mt-6 w-full" size="lg" loading={busy} disabled={!code.every(Boolean)}>
          Войти
        </Button>
        <p className="mt-4 text-center text-caption text-ink-2">
          {left > 0 ? (
            <>Отправить снова через {left} с</>
          ) : (
            <button type="button" className="font-medium text-accent hover:underline" onClick={() => sendCode()}>
              Отправить код ещё раз
            </button>
          )}
        </p>
      </div>
    );

  return (
    <div>
      <h1 className="text-h2 font-semibold">Вход в FORMA</h1>
      <p className="mt-1 text-body-sm text-ink-2">Без пароля — через Telegram или код на почту.</p>
      <Button variant="dark" size="lg" className="mt-6 w-full" leftIcon={<Send />} onClick={() => router.push("/overview")}>
        Войти через Telegram
      </Button>
      <div className="my-5 flex items-center gap-3 text-micro text-ink-3">
        <span className="h-px flex-1 bg-line" /> или <span className="h-px flex-1 bg-line" />
      </div>
      <form onSubmit={sendCode} className="flex flex-col gap-3" noValidate>
        <Input
          icon={<Mail />}
          type="email"
          label="Почта"
          placeholder="anna@shop.ru"
          autoComplete="email"
          value={email}
          onChange={(e) => (setEmail(e.target.value), setErr(""))}
          error={err}
        />
        <Button type="submit" variant="secondary" size="lg" loading={busy}>
          Получить код
        </Button>
      </form>
    </div>
  );
}
