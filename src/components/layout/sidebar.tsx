"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Ellipsis, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav, secondaryNav, type NavItem } from "@/lib/nav";
import { project } from "@/lib/mock";
import { duration, ease, spring } from "@/lib/motion";
import { Logo, LogoMark, LOGO_MARK_SIZE } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/status";
import { IconButton } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

function NavLink({
  item,
  active,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Tooltip content={item.label} disabled={!collapsed}>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? item.label : undefined}
        className={cn(
          "group relative flex h-10 items-center gap-3 rounded-btn text-body-sm font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
          collapsed ? "w-10 justify-center" : "px-3",
          active ? "text-ink" : "text-ink-2 hover:bg-subtle hover:text-ink",
        )}
      >
        {active && (
          <motion.span layoutId="sidebar-active" transition={spring} className="absolute inset-0 rounded-btn bg-accent-soft" />
        )}
        <Icon className={cn("relative size-5 shrink-0", active ? "text-accent" : "text-ink-2 group-hover:text-ink")} strokeWidth={1.75} />
        {!collapsed && <span className="relative flex-1 truncate">{item.label}</span>}
        {item.badge ? (
          collapsed ? (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full border-2 border-canvas bg-accent" aria-label={`${item.badge} новых`} />
          ) : (
            <Badge className="relative">{item.badge}</Badge>
          )
        ) : null}
      </Link>
    </Tooltip>
  );
}

export function Sidebar({
  collapsed = false,
  onToggle,
  onNavigate,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const secondaryActive = secondaryNav.some((i) => pathname.startsWith(i.href));
  const [moreOpen, setMoreOpen] = useState(secondaryActive);
  const showMore = moreOpen || collapsed;

  return (
    <div className={cn("flex h-full flex-col pt-4 pb-4", collapsed ? "items-center px-4" : "px-4")}>
      {/* Шапка: логотип + свернуть. Высота 40 = выравнивание с топбаром (72px).
          Знак стоит в одной точке (x=21) и в свёрнутом, и в развёрнутом меню — без прыжка. */}
      <div className={cn("mb-6 flex h-10 items-center", collapsed ? "flex-col" : "justify-between pl-[5px]")}>
        {collapsed ? (
          <Tooltip content="Развернуть меню · ⌘B">
            <button
              type="button"
              onClick={onToggle}
              aria-label="Развернуть меню"
              className="group relative flex size-10 items-center justify-center rounded-btn hover:bg-subtle"
            >
              <LogoMark size={LOGO_MARK_SIZE} className="transition-opacity group-hover:opacity-0" />
              <PanelLeftOpen className="absolute size-5 text-ink-2 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </Tooltip>
        ) : (
          <>
            <Link href="/" aria-label="FORMA — на старт" className="flex items-center">
              <Logo />
            </Link>
            {onToggle && (
              <IconButton label="Свернуть меню (⌘B)" size="sm" onClick={onToggle} className="-mr-1">
                <PanelLeftClose />
              </IconButton>
            )}
          </>
        )}
      </div>

      <nav aria-label="Основная навигация" className={cn("flex flex-col gap-1", collapsed ? "items-center" : "")}>
        {primaryNav.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} active={pathname.startsWith(item.href)} onNavigate={onNavigate} />
        ))}

        {collapsed ? (
          <span className="my-2 h-px w-6 bg-line" aria-hidden />
        ) : (
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className="flex h-10 items-center gap-3 rounded-btn px-3 text-body-sm font-medium text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
          >
            <Ellipsis className="size-5" strokeWidth={1.75} />
            <span className="flex-1 text-left">Ещё</span>
            <ChevronDown className={cn("size-4 transition-transform duration-200", moreOpen && "rotate-180")} />
          </button>
        )}
        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: duration.slow, ease }}
              className={cn("flex flex-col gap-1 overflow-hidden", collapsed && "items-center")}
            >
              {secondaryNav.map((item) => (
                <NavLink key={item.href} item={item} collapsed={collapsed} active={pathname.startsWith(item.href)} onNavigate={onNavigate} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className={cn("mt-auto flex flex-col gap-2 pt-6", collapsed && "items-center")}>
        {!collapsed && (
          <Link
            href="/settings"
            onClick={onNavigate}
            className="rounded-[16px] border border-line bg-surface px-4 py-3 shadow-xs transition-shadow hover:shadow-card"
          >
            <p className="text-body-sm font-semibold">Тариф {project.plan.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-micro text-ink-2">
              <span className="size-1.5 rounded-full bg-success" />
              Активен до {project.plan.until}
            </p>
          </Link>
        )}
        <Tooltip content={`${project.owner.name} · ${project.owner.role}`} disabled={!collapsed}>
          <button
            type="button"
            aria-label={collapsed ? "Профиль" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-btn text-left transition-colors hover:bg-subtle",
              collapsed ? "size-10 justify-center" : "p-2",
            )}
          >
            <Avatar name={project.owner.name} size={collapsed ? 32 : 36} />
            {!collapsed && (
              <span className="min-w-0 flex-1">
                <span className="block truncate text-body-sm font-semibold">{project.owner.name}</span>
                <span className="block text-micro text-ink-2">{project.owner.role}</span>
              </span>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
