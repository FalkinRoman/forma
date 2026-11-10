"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof RadixSwitch.Root>) {
  return (
    <RadixSwitch.Root
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-line-strong p-0.5 transition-colors duration-200",
        "data-[state=checked]:bg-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
        "disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb className="block size-5 rounded-full bg-white shadow-[0_1px_3px_rgb(16_24_40/0.2)] transition-transform duration-200 ease-soft data-[state=checked]:translate-x-4" />
    </RadixSwitch.Root>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
        checked ? "border-accent bg-accent text-white" : "border-line-strong bg-surface hover:border-ink-3",
        className,
      )}
    >
      <Check className={cn("size-3.5 transition-transform duration-150", checked ? "scale-100" : "scale-0")} strokeWidth={3} />
    </button>
  );
}
