"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Shell = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  aiOpen: boolean;
  setAiOpen: (v: boolean) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
};

const Ctx = createContext<Shell | null>(null);

export const useShell = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useShell must be used inside ShellProvider");
  return c;
};

function read(key: string, fallback: boolean) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "1";
  } catch {
    return fallback;
  }
}

function write(key: string, v: boolean) {
  try {
    localStorage.setItem(key, v ? "1" : "0");
  } catch {}
}

/** Состояние оболочки: свёрнутый сайдбар и панель AI запоминаются между визитами. */
export function ShellProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [aiOpen, setAiOpenState] = useState(true);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setCollapsed(read("forma.sidebar.collapsed", false));
    // на узких экранах панель AI по умолчанию закрыта
    setAiOpenState(read("forma.ai.open", window.innerWidth >= 1536));
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v) => {
      write("forma.sidebar.collapsed", !v);
      return !v;
    });
  }, []);

  const setAiOpen = useCallback((v: boolean) => {
    write("forma.ai.open", v);
    setAiOpenState(v);
  }, []);

  return (
    <Ctx.Provider value={{ collapsed, toggleCollapsed, aiOpen, setAiOpen, drawer, setDrawer }}>{children}</Ctx.Provider>
  );
}
