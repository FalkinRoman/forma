"use client";

import * as T from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

export const TooltipProvider = ({ children }: { children: ReactNode }) => (
  <T.Provider delayDuration={250} skipDelayDuration={100}>
    {children}
  </T.Provider>
);

export function Tooltip({
  content,
  children,
  side = "right",
  disabled,
}: {
  content: ReactNode;
  children: ReactNode;
  side?: "right" | "bottom" | "top" | "left";
  disabled?: boolean;
}) {
  if (disabled) return <>{children}</>;
  return (
    <T.Root>
      <T.Trigger asChild>{children}</T.Trigger>
      <T.Portal>
        <T.Content
          side={side}
          sideOffset={10}
          className="z-[60] rounded-[8px] bg-graphite px-2.5 py-1.5 text-caption font-medium text-white shadow-raised"
        >
          {content}
        </T.Content>
      </T.Portal>
    </T.Root>
  );
}
