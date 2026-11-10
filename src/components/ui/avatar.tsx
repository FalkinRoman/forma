import { cn } from "@/lib/cn";

/** Аватар с инициалами — фото подставится, когда будет src. */
export function Avatar({ name, src, size = 36, className }: { name: string; src?: string; size?: number; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#dfe7f5] to-[#c9d5ea] font-semibold text-ink-2",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {src ? <img src={src} alt={name} className="size-full object-cover" /> : initials}
    </span>
  );
}
