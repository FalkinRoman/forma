import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Учим tailwind-merge нашим токенам, чтобы text-h1 и text-ink не «съедали» друг друга. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "body", "body-sm", "caption", "micro"] }],
      shadow: [{ shadow: ["xs", "card", "raised", "float"] }],
      rounded: [{ rounded: ["control", "btn", "card", "panel", "modal"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
