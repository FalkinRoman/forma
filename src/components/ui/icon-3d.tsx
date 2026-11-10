import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Объёмная иконка в стиле бренд-листа FORMA:
 * стеклянная плитка с градиентом синий → фиолетовый, белый глиф, мягкий блик и тень.
 * Используется для модулей и витринных мест; в навигации остаются линейные иконки.
 */
const tones = {
  blue: ["#6FB1FF", "#1769FF", "#4B3DFF"],
  violet: ["#B59CFF", "#7B5CFF", "#4B3DFF"],
  teal: ["#7CE0D3", "#1EA7B8", "#1769FF"],
  amber: ["#FFD27A", "#F59E2B", "#E2602C"],
  rose: ["#FFA3B5", "#F2557A", "#B83DFF"],
  green: ["#8FE3A6", "#28A745", "#138A6A"],
} as const;

export type Icon3DTone = keyof typeof tones;

export function Icon3D({
  icon: Icon,
  tone = "blue",
  size = 48,
  className,
}: {
  icon: LucideIcon;
  tone?: Icon3DTone;
  size?: number;
  className?: string;
}) {
  const [a, b, c] = tones[tone];
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `linear-gradient(145deg, ${a} 0%, ${b} 55%, ${c} 100%)`,
        boxShadow: `inset 0 1px 1px rgba(255,255,255,.65), inset 0 -2px 6px rgba(20,10,80,.25), 0 ${size * 0.12}px ${size * 0.3}px -${size * 0.08}px ${b}66`,
      }}
      aria-hidden
    >
      {/* блик */}
      <span
        className="pointer-events-none absolute inset-x-[8%] top-[6%] h-[45%]"
        style={{ borderRadius: size * 0.24, background: "linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,0))" }}
      />
      <Icon className="relative text-white drop-shadow-[0_1px_1px_rgba(20,10,80,.35)]" style={{ width: size * 0.48, height: size * 0.48 }} strokeWidth={2.1} />
    </span>
  );
}
