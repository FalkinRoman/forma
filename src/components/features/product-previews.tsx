/**
 * Мини-превью продуктов клиента для карты бизнеса.
 * Важно: это «чужие» дизайн-системы (продукты клиента), поэтому они живут
 * внутри нейтральных рамок FORMA и могут иметь свои цвета.
 * Реальные скриншоты подставляются через /public/images/* (см. IMAGE_PROMPTS.md),
 * пока их нет — рисуем векторные заглушки.
 */
import { cn } from "@/lib/cn";

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[10px] border border-line/80 bg-white shadow-xs", className)}>{children}</div>
  );
}

export function SitePreview({ className }: { className?: string }) {
  return (
    <Frame className={cn("w-full", className)}>
      <div className="flex h-3.5 items-center gap-1 border-b border-line/70 bg-subtle px-1.5">
        <span className="size-1 rounded-full bg-[#ff6b5f]" />
        <span className="size-1 rounded-full bg-[#ffc23d]" />
        <span className="size-1 rounded-full bg-[#2bc94d]" />
        <span className="mx-auto h-1.5 w-16 rounded-full bg-line" />
      </div>
      <div
        className="relative flex h-[76px] items-end p-2.5"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,12,10,.92) 0%, rgba(20,12,10,.55) 55%, rgba(20,12,10,.05) 100%), url(/images/site-hero.jpg), radial-gradient(120% 140% at 85% 60%, #c2583f 0%, #7a2a1d 45%, #241311 80%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="max-w-[60%] text-[10px] leading-[1.15] font-semibold text-white">Премиальные деликатесы с доставкой</p>
      </div>
    </Frame>
  );
}

export function PhonePreview({ variant = "shop", className }: { variant?: "shop" | "map"; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[96px] w-[56px] shrink-0 overflow-hidden rounded-[12px] border-[3px] border-[#15181e] bg-white shadow-raised",
        className,
      )}
    >
      <span className="absolute top-0.5 left-1/2 z-10 h-1 w-4 -translate-x-1/2 rounded-full bg-[#15181e]" />
      {variant === "shop" ? (
        <div className="flex h-full flex-col gap-1 px-1 pt-2.5">
          <span className="h-1 w-8 rounded-full bg-[#2a1915]" />
          <div className="grid grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="aspect-square rounded-[3px]"
                style={{ background: `radial-gradient(circle at 40% 40%, #d0694c, #7a2a1d)` }}
              />
            ))}
          </div>
          <span className="mt-auto mb-1 h-2 rounded-[3px] bg-[#c2583f]" />
        </div>
      ) : (
        <svg viewBox="0 0 50 90" className="size-full" aria-hidden>
          <rect width="50" height="90" fill="#eef2f6" />
          <path d="M0 22h50M0 48h50M0 70h50M14 0v90M34 0v90" stroke="#fff" strokeWidth="3" />
          <path d="M-5 60 Q 20 40 55 52" stroke="#dde4ec" strokeWidth="5" fill="none" />
          <path d="M15 24 L 15 46 L 33 52 L 31 72" stroke="#1769ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="24" r="2.5" fill="#1769ff" />
          <circle cx="31" cy="72" r="3" fill="#fff" stroke="#1769ff" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export function CrmPreview({ className }: { className?: string }) {
  const bars = [30, 45, 38, 62, 50, 78, 92];
  return (
    <Frame className={cn("flex h-[66px] w-full", className)}>
      <div className="flex w-1/4 flex-col gap-1 bg-[#1b1f27] p-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={cn("h-1 rounded-full", i === 1 ? "bg-white/70" : "bg-white/20")} />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-1.5">
        <span className="h-1 w-10 rounded-full bg-ink/70" />
        <div className="mt-auto flex h-9 items-end gap-[3px]">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[2px] bg-[#8b8ff7]" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function SparkPreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 56" className={cn("h-14 w-full", className)} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#28a745" stopOpacity="0.22" />
          <stop offset="1" stopColor="#28a745" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 46 C 20 40, 30 44, 48 36 S 80 38, 98 30 S 130 34, 148 22 S 186 24, 200 12 L 220 6 L 220 56 L 0 56 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 46 C 20 40, 30 44, 48 36 S 80 38, 98 30 S 130 34, 148 22 S 186 24, 200 12 L 220 6"
        fill="none"
        stroke="#28a745"
        strokeWidth="1.75"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Нейтральные ярлыки сервисов (без чужих логотипов — их подключим официальными ассетами). */
export function ServiceChip({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 text-micro font-semibold text-ink">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}
