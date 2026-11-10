"use client";

import * as Popover from "@radix-ui/react-dropdown-menu";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications as initial } from "@/lib/data";
import { cn } from "@/lib/cn";

/** Уведомления: коротко что случилось + куда идти. Непрочитанные — точкой и жирным. */
export function Notifications() {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const unread = items.filter((n) => n.unread).length;
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={unread ? `Уведомления: ${unread} новых` : "Уведомления"}
          className="relative flex size-10 items-center justify-center rounded-btn text-ink-2 transition-colors hover:bg-subtle hover:text-ink focus-visible:ring-4 focus-visible:ring-accent-ring focus-visible:outline-none data-[state=open]:bg-subtle"
        >
          <Bell className="size-5" />
          {unread > 0 && <span className="absolute top-2 right-2.5 size-2 rounded-full border-2 border-canvas bg-error" />}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" sideOffset={8} className="z-50 w-[min(380px,calc(100vw-24px))] rounded-[20px] border border-line bg-surface p-2 shadow-float">
          <div className="flex items-center justify-between px-3 pt-2 pb-2">
            <span className="text-body-sm font-semibold">Уведомления</span>
            {unread > 0 && (
              <button type="button" className="text-caption font-medium text-accent hover:underline" onClick={() => setItems((l) => l.map((n) => ({ ...n, unread: false })))}>
                Прочитать все
              </button>
            )}
          </div>
          {items.map((n) => (
            <Popover.Item
              key={n.id}
              onSelect={() => {
                setItems((l) => l.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
                router.push(n.href);
              }}
              className="flex cursor-pointer gap-3 rounded-[14px] px-3 py-2.5 outline-none data-[highlighted]:bg-subtle"
            >
              <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-accent" : "bg-transparent")} />
              <span className="min-w-0 flex-1">
                <span className={cn("block text-body-sm", n.unread ? "font-semibold text-ink" : "text-ink")}>{n.title}</span>
                <span className="block text-caption text-ink-2">{n.text}</span>
              </span>
              <span className="shrink-0 text-micro text-ink-3">{n.time}</span>
            </Popover.Item>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
