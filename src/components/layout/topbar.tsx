"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Layers, Menu, Plus, Search, ShoppingBag, Sparkles, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CommandPalette } from "./command-palette";
import { Notifications } from "./notifications";
import { project } from "@/lib/mock";
import { Button, IconButton } from "@/components/ui/button";
import { useShell } from "./shell-context";

const projects = [project.name, "Кофейня «Зерно»", "Студия маникюра"];

export function ProjectSwitcher() {
  const [current, setCurrent] = useState(projects[0]);
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          className="flex h-11 max-w-[260px] min-w-0 items-center md:shrink-0 gap-2.5 rounded-full border border-line/70 bg-surface pr-3.5 pl-1.5 shadow-xs transition-colors hover:bg-subtle data-[state=open]:bg-subtle"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#c4553f] to-[#8e2f22] text-[13px] font-bold text-white">
            {current[0]}
          </span>
          <span className="truncate text-body-sm font-semibold">{current}</span>
          <ChevronDown className="size-4 shrink-0 text-ink-2" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          sideOffset={8}
          align="start"
          className="z-50 min-w-[240px] rounded-[16px] border border-line bg-surface p-1.5 shadow-float"
        >
          <Dropdown.Label className="px-2.5 pt-1.5 pb-1 text-micro text-ink-3">Бизнес-проекты</Dropdown.Label>
          {projects.map((p) => (
            <Dropdown.Item
              key={p}
              onSelect={() => setCurrent(p)}
              className="flex h-10 cursor-pointer items-center justify-between gap-3 rounded-[10px] px-2.5 text-body-sm outline-none data-[highlighted]:bg-subtle"
            >
              {p}
              {p === current && <Check className="size-4 text-accent" />}
            </Dropdown.Item>
          ))}
          <Dropdown.Separator className="my-1 h-px bg-line" />
          <Dropdown.Item className="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] px-2.5 text-body-sm text-accent outline-none data-[highlighted]:bg-accent-soft">
            <Plus className="size-4" /> Новый бизнес
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

const createItems = [
  { href: "/orders", label: "Заказ", icon: ShoppingBag },
  { href: "/clients", label: "Клиента", icon: Users },
  { href: "/overview?add=1", label: "Часть системы", icon: Layers },
  { href: "/team", label: "Приглашение в команду", icon: UserPlus },
];

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { aiOpen, setAiOpen } = useShell();
  const [cmdk, setCmdk] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdk((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="sticky top-0 z-30 bg-canvas/70 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
      <div className="flex h-[84px] items-center gap-3 px-4 sm:px-6 lg:px-2 xl:px-4">
        <IconButton label="Открыть меню" className="-ml-1 lg:hidden" onClick={onMenu}>
          <Menu />
        </IconButton>
        <ProjectSwitcher />

        <button
          type="button"
          onClick={() => setCmdk(true)}
          className="ml-2 hidden h-11 min-w-0 flex-1 max-w-[340px] items-center gap-2.5 rounded-full border border-line/70 bg-surface/70 shadow-xs px-3.5 text-body-sm text-ink-3 transition-colors hover:bg-muted md:flex"
        >
          <Search className="size-[18px]" />
          <span className="flex-1 text-left">Поиск по бизнесу</span>
          <kbd className="rounded-[6px] border border-line bg-surface px-1.5 py-0.5 font-sans text-micro text-ink-2">⌘K</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <IconButton label="Поиск" className="md:hidden" onClick={() => setCmdk(true)}>
            <Search />
          </IconButton>
          <Notifications />
          {!aiOpen && (
            <Button variant="secondary" leftIcon={<Sparkles className="text-accent" />} onClick={() => setAiOpen(true)}>
              <span className="hidden sm:inline">AI-архитектор</span>
            </Button>
          )}
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button variant="dark" leftIcon={<Plus />} className="hidden sm:inline-flex">
                Создать
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <Dropdown.Content align="end" sideOffset={8} className="z-50 min-w-[240px] rounded-[16px] border border-line bg-surface p-1.5 shadow-float">
                {createItems.map((c) => (
                  <Dropdown.Item key={c.href} asChild>
                    <Link href={c.href} className="flex h-10 items-center gap-2.5 rounded-[10px] px-2.5 text-body-sm outline-none data-[highlighted]:bg-subtle">
                      <c.icon className="size-4 text-ink-2" /> {c.label}
                    </Link>
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown.Portal>
          </Dropdown.Root>
        </div>
      </div>
      <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
    </header>
  );
}
