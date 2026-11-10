import { useId } from "react";
import { cn } from "@/lib/cn";

/* Знак FORMA — вектор, обведённый по утверждённому референсу (public/brand/forma_mark.svg).
   Курсивная F из трёх «лент»: верхняя перекладина, средняя и стойка. Сетка 128, наклон 14°. */
const F_PARTS = [
  "M33.6 62C34 40 46 27 66 27H92.5Q96 27 95.2 30.5C93.5 37 89 44 80 44H64C56 44 51 46 48.5 50C43 52.5 38 56.5 33.6 62Z",
  "M33.5 77C35 66 43 57 57 57H86.5Q89.5 57 88.8 60C87.3 66 83 71 75 71H58C48 71 40 73 33.5 77Z",
  "M32.5 93C32.5 82 38 75 48.5 75H50.5Q53.5 75 53.3 78V89C53 97 48 102 42 102C36 102 32.5 99 32.5 93Z",
];
const F_TRANSFORM = "translate(17.8 0) skewX(-14)";

/** Векторная копия знака — для монохромной версии. */
function LogoMarkVector({ size = 32, mono, className }: { size?: number; mono?: boolean; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" className={cn("shrink-0", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="8" y1="6" x2="122" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00BEFF" />
          <stop offset="0.3" stopColor="#009CFD" />
          <stop offset="0.56" stopColor="#005CFB" />
          <stop offset="0.76" stopColor="#3B44FC" />
          <stop offset="1" stopColor="#7C22FC" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="34" fill={mono ? "currentColor" : `url(#${id})`} />
      <g fill={mono ? "var(--color-canvas)" : "white"} transform={F_TRANSFORM}>
        {F_PARTS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Знак FORMA — утверждённый файл public/brand/forma-mark.png. mono — монохромная векторная версия. */
export function LogoMark({ size = 32, mono, className }: { size?: number; mono?: boolean; className?: string }) {
  if (mono) return <LogoMarkVector size={size} mono className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/forma-mark.png" alt="" width={size} height={size} draggable={false} className={cn("shrink-0 select-none", className)} />
  );
}

/* Пропорции логотипа (одни на весь интерфейс):
   знак 28px = 1.4× иконки навигации (20px) и ровно в строку 40px;
   надпись — высота прописных ≈ 42% знака (Inter: cap 0.727 → 16px), жирность 700,
   трекинг +4% (прописным нужна разрядка), отступ знак–надпись = 10px (≈ 1/3 знака). */
export const LOGO_MARK_SIZE = 28;

/** Полный логотип: знак forma-mark.png + надпись FORMA. */
export function Logo({ className, size = LOGO_MARK_SIZE }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: Math.round(size * 0.36) }}>
      <LogoMark size={size} />
      <span
        className="font-bold leading-none tracking-[0.04em] text-ink"
        style={{ fontSize: Math.round(size * 0.58) }}
      >
        FORMA
      </span>
    </span>
  );
}
