"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { duration, ease } from "@/lib/motion";
import { IconButton } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AiPanel } from "@/components/features/ai-panel";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ShellProvider, useShell } from "./shell-context";

const SIDEBAR = 224;
const SIDEBAR_COLLAPSED = 72;
const AI_WIDTH = 380;

function Shell({ children }: { children: ReactNode }) {
  const { collapsed, toggleCollapsed, aiOpen, setAiOpen, drawer, setDrawer } = useShell();
  const pathname = usePathname();

  useEffect(() => setDrawer(false), [pathname, setDrawer]);

  // ⌘B — меню, ⌘J — AI-архитектор
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const k = e.key.toLowerCase();
      if (k === "b" || k === "и") {
        e.preventDefault();
        toggleCollapsed();
      } else if (k === "j" || k === "о") {
        e.preventDefault();
        setAiOpen(!aiOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleCollapsed, setAiOpen, aiOpen]);

  const sb = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR;

  return (
    <div
      className="min-h-dvh"
      style={
        {
          "--sb": `${sb}px`,
          "--content-l": `${sb + 24}px`,
          "--content-r": aiOpen ? `${AI_WIDTH + 24}px` : "12px",
        } as React.CSSProperties
      }
    >
      {/* Сайдбар: 224px / свёрнутый 72px */}
      <aside className="fixed top-3 bottom-3 left-3 z-20 hidden w-(--sb) overflow-hidden rounded-panel border border-white/80 bg-surface/75 shadow-card backdrop-blur-xl transition-[width] duration-300 ease-soft lg:block">
        <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} />
      </aside>

      {/* Мобильное меню */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              className="fixed top-3 bottom-3 left-3 z-50 w-[280px] overflow-hidden rounded-panel bg-surface shadow-float lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: duration.map, ease }}
            >
              <IconButton label="Закрыть меню" size="sm" className="absolute top-6 right-4 z-10" onClick={() => setDrawer(false)}>
                <X />
              </IconButton>
              <Sidebar onNavigate={() => setDrawer(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* AI-архитектор: на широких экранах — колонка справа на всю высоту, на узких — выезжающая панель */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAiOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[380px] overflow-hidden border-l border-line bg-surface shadow-float xl:top-3 xl:right-3 xl:bottom-3 xl:z-20 xl:rounded-panel xl:border xl:border-white/80 xl:bg-surface/85 xl:shadow-card xl:backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: duration.map, ease }}
            >
              <AiPanel onClose={() => setAiOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="transition-[padding] duration-300 ease-soft lg:pl-(--content-l) xl:pr-(--content-r)">
        <Topbar onMenu={() => setDrawer(true)} />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease }}
          className="px-4 pt-4 pb-16 sm:px-6 lg:px-2 xl:px-4"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ShellProvider>
      <TooltipProvider>
        <Shell>{children}</Shell>
      </TooltipProvider>
    </ShellProvider>
  );
}
