import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Таблица: строка 56px, текст 14px, числа — табличные, вторичные колонки скрываются на узких экранах. */
export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative -mx-px overflow-x-auto">
      <table className={cn("w-full border-separate border-spacing-0 text-left text-body-sm", className)} {...props} />
    </div>
  );
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn("h-11 border-b border-line px-4 text-micro font-medium whitespace-nowrap text-ink-3 first:pl-5 last:pr-5", className)}
      {...props}
    />
  );
}

export function Tr({ className, interactive, ...props }: HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }) {
  return (
    <tr
      className={cn(
        "group [&>td]:border-b [&>td]:border-line last:[&>td]:border-0",
        interactive && "cursor-pointer transition-colors hover:bg-subtle/70 focus-visible:bg-subtle focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("h-14 px-4 align-middle first:pl-5 last:pr-5", className)} {...props} />;
}
