import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "dark" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-btn font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-soft " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white shadow-xs hover:bg-accent-hover",
  dark: "bg-graphite text-white shadow-xs hover:bg-graphite-hover",
  secondary: "border border-line bg-surface text-ink shadow-xs hover:border-line-strong hover:bg-subtle",
  ghost: "text-ink-2 hover:bg-subtle hover:text-ink",
  destructive: "bg-error text-white shadow-xs hover:brightness-95",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-caption [&_svg]:size-4",
  md: "h-10 px-4 text-body-sm [&_svg]:size-[18px]",
  lg: "h-12 px-5 text-body [&_svg]:size-5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading, leftIcon, rightIcon, className, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" aria-hidden /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "ghost" | "secondary" | "soft";
  size?: "sm" | "md";
}

/** Кнопка-иконка: всегда с aria-label, область нажатия не меньше 32px. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = "ghost", size = "md", className, children, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-btn text-ink-2 transition-colors duration-150",
        "hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring active:scale-95",
        "disabled:pointer-events-none disabled:opacity-45",
        size === "md" ? "size-10 [&_svg]:size-5" : "size-8 [&_svg]:size-[18px]",
        variant === "ghost" && "hover:bg-subtle",
        variant === "secondary" && "border border-line bg-surface shadow-xs hover:bg-subtle",
        variant === "soft" && "bg-accent-soft text-accent hover:text-accent-hover",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
