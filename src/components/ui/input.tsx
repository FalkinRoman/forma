import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
};

/** Большое удобное поле: 44px, понятный placeholder, подпись и ошибка с текстом. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, label, hint, error, className, id, ...props },
  ref,
) {
  const inputId = id ?? props.name;
  return (
    <label className="flex w-full flex-col gap-1.5" htmlFor={inputId}>
      {label && <span className="text-caption font-medium text-ink">{label}</span>}
      <span
        className={cn(
          "group flex h-11 items-center gap-2 rounded-btn border bg-surface px-3.5 transition-[border-color,box-shadow] duration-150",
          "focus-within:border-accent focus-within:ring-4 focus-within:ring-accent-ring",
          error ? "border-error" : "border-line hover:border-line-strong",
          className,
        )}
      >
        {icon && <span className="text-ink-3 [&_svg]:size-[18px]">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error || undefined}
          className="h-full w-full min-w-0 bg-transparent text-body-sm text-ink outline-none placeholder:text-ink-3"
          {...props}
        />
      </span>
      {(error || hint) && (
        <span className={cn("text-micro", error ? "text-error" : "text-ink-2")}>{error ?? hint}</span>
      )}
    </label>
  );
});
