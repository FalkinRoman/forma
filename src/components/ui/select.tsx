import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Нативный select в стиле полей ДС: 44px, доступен с клавиатуры и на телефоне. */
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { label?: string; hint?: string }>(
  function Select({ label, hint, className, children, id, ...props }, ref) {
    const sid = id ?? props.name;
    return (
      <label className="flex w-full flex-col gap-1.5" htmlFor={sid}>
        {label && <span className="text-caption font-medium text-ink">{label}</span>}
        <span className="relative">
          <select
            ref={ref}
            id={sid}
            className={cn(
              "h-11 w-full appearance-none rounded-btn border border-line bg-surface pr-10 pl-3.5 text-body-sm text-ink transition-[border-color,box-shadow] outline-none hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent-ring",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-2" />
        </span>
        {hint && <span className="text-micro text-ink-2">{hint}</span>}
      </label>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }>(
  function Textarea({ label, hint, className, id, ...props }, ref) {
    const tid = id ?? props.name;
    return (
      <label className="flex w-full flex-col gap-1.5" htmlFor={tid}>
        {label && <span className="text-caption font-medium text-ink">{label}</span>}
        <textarea
          ref={ref}
          id={tid}
          className={cn(
            "min-h-24 w-full resize-y rounded-btn border border-line bg-surface px-3.5 py-3 text-body-sm text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-3 hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent-ring",
            className,
          )}
          {...props}
        />
        {hint && <span className="text-micro text-ink-2">{hint}</span>}
      </label>
    );
  },
);
