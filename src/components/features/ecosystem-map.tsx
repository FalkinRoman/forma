"use client";

import { BASE } from "@/lib/base";
import { AnimatePresence, motion } from "motion/react";
import {
  Store,
  Bot,
  CreditCard,
  CalendarCheck,
  ChartColumn,
  ChevronRight,
  Gift,
  Globe,
  IdCard,
  Layers,
  LayoutGrid,
  List,
  Mail,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  Scan,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  Warehouse,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { ecosystem, moduleCatalog, type CatalogItem, type EcoNode, type ProductKind } from "@/lib/mock";
import { AddModuleDialog } from "./add-module-dialog";
import { Segmented } from "@/components/ui/segmented";
import { Status, statusMeta } from "@/components/ui/status";
import { useToast } from "@/components/ui/toast";
import { Tooltip } from "@/components/ui/tooltip";
import { SparkPreview } from "./product-previews";
import { PaymentMarks } from "@/components/ui/payment-marks";
import { Icon3D } from "@/components/ui/icon-3d";

/* ───────────────────────── Карточки модулей ───────────────────────── */

const icons: Record<ProductKind, LucideIcon> = {
  site: Globe,
  mobile: Smartphone,
  miniapp: Send,
  crm: Layers,
  courier: Truck,
  agents: Sparkles,
  integrations: Zap,
  analytics: ChartColumn,
  loyalty: Gift,
  warehouse: Warehouse,
  staff: IdCard,
  booking: CalendarCheck,
  mailing: Mail,
  reviews: Star,
  chatbot: Bot,
  marketplace: Store,
  payments: CreditCard,
};

const previewImg: Partial<Record<ProductKind, string>> = {
  site: BASE + "/images/mock-site.png",
  mobile: BASE + "/images/mock-mobile.png",
  miniapp: BASE + "/images/mock-tg.png",
  crm: BASE + "/images/mock-crm.png",
  courier: BASE + "/images/mock-courier.png",
  agents: BASE + "/images/3d-ai.png",
};

function NodeBody({ node }: { node: EcoNode }) {
  const img = previewImg[node.kind];
  if (img) {
    return (
      <div className="relative mt-4 flex h-[112px] items-end justify-center overflow-hidden rounded-[16px] bg-linear-to-b from-[#f6f8fc] to-[#eef2f9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" draggable={false} className="h-full w-auto max-w-full object-contain object-bottom mix-blend-multiply" />
      </div>
    );
  }
  switch (node.kind) {
    case "analytics":
      return <SparkPreview className="mt-4 h-14" />;
    case "integrations":
      return (
        <PaymentMarks className="mt-4" />
      );
    default: {
      const meta = moduleCatalog.find((m) => m.kind === node.kind);
      if (!meta) return null;
      return (
        <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-subtle p-3">
          <Icon3D icon={icons[node.kind]} tone={meta.tone} size={40} />
          <span className="text-micro text-ink-2">{meta.why}</span>
        </div>
      );
    }
  }
}


function NodeCard({ node, layer, className }: { node: EcoNode; layer: "now" | "plan"; className?: string }) {
  const Icon = icons[node.kind];
  const ghost = layer === "now" && node.layer === "plan";
  const proposed = layer === "plan" && node.layer === "plan";

  return (
    <div
      className={cn(
        "group/node relative flex w-full rounded-card border bg-surface p-4 text-left",
        "shadow-card transition-[box-shadow,border-color,opacity] duration-200 hover:shadow-raised",
        ghost && "border-dashed border-line-strong bg-surface/70 opacity-60 shadow-none",
        proposed ? "border-accent/40 ring-4 ring-accent-soft" : !ghost && "border-line hover:border-line-strong",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-subtle text-ink">
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 pt-px">
            <span className="block text-body-sm leading-5 font-semibold text-balance text-ink">{node.title}</span>
            <Status kind={node.status} className="mt-0.5">
              {node.statusText}
            </Status>
          </span>
        </div>
        {proposed && (
          <span className="mt-3 flex items-center gap-1 text-micro font-medium text-accent">
            <Sparkles className="size-3" /> Предложено AI
          </span>
        )}
        <NodeBody node={node} />
      </div>
    </div>
  );
}

/* ───────────────────────── Ядро ───────────────────────── */

function Core({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative">
      {/* «дыхание» — два мягких кольца */}
      <span aria-hidden className="absolute inset-0 animate-[core-breathe_4s_ease-in-out_infinite] rounded-[40px] bg-accent/10 motion-reduce:hidden" />
      <span aria-hidden className="absolute inset-0 animate-[core-breathe_4s_ease-in-out_2s_infinite] rounded-[40px] bg-accent/10 motion-reduce:hidden" />
      <button
        type="button"
        data-core
        onClick={onOpen}
        aria-label="Ядро бизнеса: создать новую часть системы"
        className={cn(
          "group relative flex w-[236px] flex-col items-center rounded-[36px] border border-white/80 bg-linear-to-b from-white to-[#edf2fc] px-5 pt-4 pb-5 text-center",
          "shadow-[inset_0_1px_0_white,0_2px_4px_rgb(16_24_40/0.04),0_28px_64px_rgb(23_105_255/0.18)] transition-transform duration-200 ease-soft hover:scale-[1.02]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BASE + "/images/3d-platform.png"} alt="" draggable={false} className="h-[92px] w-auto drop-shadow-[0_12px_18px_rgba(23,105,255,0.25)] transition-transform duration-300 ease-soft group-hover:-translate-y-1" />
        <span className="mt-1 text-h3 font-semibold">Ядро бизнеса</span>
        <span className="mt-1 text-micro text-ink-2">Клиенты · Заказы · Товары · Процессы</span>
        <span className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-caption whitespace-nowrap font-medium text-white shadow-[0_6px_16px_-4px_rgb(23_105_255/0.6)] transition-colors group-hover:bg-accent-hover">
          <Plus className="size-4" />
          Создать часть системы
        </span>
      </button>
    </div>
  );
}

/* ───────────────────────── Холст ───────────────────────── */

type View = { x: number; y: number; s: number };
const MIN = 0.25;
const MAX = 1.8;
const NODE_W = 256;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function edgePath(n: { x: number; y: number }) {
  // мягкая дуга от ядра к модулю
  const mx = n.x / 2;
  const my = n.y / 2;
  const len = Math.hypot(n.x, n.y) || 1;
  const bend = 0.12 * len;
  const cx = mx + (-n.y / len) * bend;
  const cy = my + (n.x / len) * bend;
  return `M 0 0 Q ${cx} ${cy} ${n.x} ${n.y}`;
}

function nextSpot(nodes: EcoNode[]) {
  const angles = nodes.map((n) => Math.atan2(n.y, n.x)).sort((a, b) => a - b);
  let best = 0;
  let at = 0;
  for (let i = 0; i < angles.length; i++) {
    const a = angles[i];
    const b = i === angles.length - 1 ? angles[0] + Math.PI * 2 : angles[i + 1];
    if (b - a > best) {
      best = b - a;
      at = a + (b - a) / 2;
    }
  }
  const r = 720;
  return { x: Math.round(Math.cos(at) * r), y: Math.round(Math.sin(at) * r * 0.8) };
}

function Canvas({
  nodes,
  setNodes,
  layer,
  fullscreen,
  onFullscreen,
  fresh,
  onCore,
}: {
  nodes: EcoNode[];
  setNodes: React.Dispatch<React.SetStateAction<EcoNode[]>>;
  layer: "now" | "plan";
  fullscreen: boolean;
  onFullscreen: (v: boolean) => void;
  fresh: string | null;
  onCore: () => void;
}) {
  const toast = useToast();
  const router = useRouter();
  const viewport = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ x: 0, y: 0, s: 0.7 });
  const [panning, setPanning] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<
    | { type: "pan"; sx: number; sy: number; vx: number; vy: number }
    | { type: "node"; id: string; sx: number; sy: number; nx: number; ny: number; moved: boolean }
    | { type: "pinch"; d: number; s: number; cx: number; cy: number; vx: number; vy: number }
    | null
  >(null);

  /** Вписать всю систему в окно */
  const fit = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(-140, ...xs) - NODE_W / 2 - 24;
    const maxX = Math.max(140, ...xs) + NODE_W / 2 + 24;
    const minY = Math.min(-140, ...ys) - 130;
    const maxY = Math.max(140, ...ys) + 130;
    const s = clamp(Math.min(w / (maxX - minX), h / (maxY - minY)), MIN, 1);
    setSmooth(true);
    setView({ s, x: w / 2 - ((minX + maxX) / 2) * s, y: h / 2 - ((minY + maxY) / 2) * s });
  }, [nodes]);

  // новый модуль вырос — плавно показать всю систему
  useEffect(() => {
    if (!fresh) return;
    const t = setTimeout(fit, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fresh]);

  // при первом показе и смене режима — вписать
  const fitted = useRef(false);
  useLayoutEffect(() => {
    if (!fitted.current) {
      fit();
      fitted.current = true;
    }
  }, [fit]);
  useEffect(() => {
    const t = setTimeout(fit, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen]);

  const zoomAt = useCallback((factor: number, px?: number, py?: number) => {
    const el = viewport.current;
    if (!el) return;
    setView((v) => {
      const s = clamp(v.s * factor, MIN, MAX);
      const cx = px ?? el.clientWidth / 2;
      const cy = py ?? el.clientHeight / 2;
      return { s, x: cx - (cx - v.x) * (s / v.s), y: cy - (cy - v.y) * (s / v.s) };
    });
  }, []);

  // Колесо: ⌘/Ctrl + колесо или щипок на трекпаде — масштаб; в полноэкранном режиме — всегда.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey || fullscreen) {
        e.preventDefault();
        zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), e.clientX - r.left, e.clientY - r.top);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt, fullscreen]);

  const local = (e: React.PointerEvent) => {
    const r = viewport.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-pan]") || target.closest("[data-core]")) return;
    pointers.current.set(e.pointerId, local(e));
    viewport.current!.setPointerCapture(e.pointerId);
    setSmooth(false);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { type: "pinch", d: Math.hypot(a.x - b.x, a.y - b.y), s: view.s, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, vx: view.x, vy: view.y };
      return;
    }
    const nodeEl = target.closest<HTMLElement>("[data-node]");
    if (nodeEl) {
      const n = nodes.find((x) => x.id === nodeEl.dataset.node)!;
      gesture.current = { type: "node", id: n.id, sx: e.clientX, sy: e.clientY, nx: n.x, ny: n.y, moved: false };
    } else {
      gesture.current = { type: "pan", sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y };
      setPanning(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, local(e));
    const g = gesture.current;
    if (!g) return;
    if (g.type === "pan") {
      setView((v) => ({ ...v, x: g.vx + e.clientX - g.sx, y: g.vy + e.clientY - g.sy }));
    } else if (g.type === "node") {
      const dx = (e.clientX - g.sx) / view.s;
      const dy = (e.clientY - g.sy) / view.s;
      if (!g.moved && Math.hypot(dx, dy) < 4) return;
      g.moved = true;
      setNodes((ns) => ns.map((n) => (n.id === g.id ? { ...n, x: Math.round(g.nx + dx), y: Math.round(g.ny + dy) } : n)));
    } else if (g.type === "pinch" && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const s = clamp((g.s * Math.hypot(a.x - b.x, a.y - b.y)) / g.d, MIN, MAX);
      setView({ s, x: g.cx - (g.cx - g.vx) * (s / g.s), y: g.cy - (g.cy - g.vy) * (s / g.s) });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    if (g?.type === "node" && !g.moved) {
      const n = nodes.find((x) => x.id === g.id);
      const href = n && nodeHref(n);
      if (href) router.push(href);
      else if (n) toast({ kind: "pending", title: n.title, description: "Черновик: AI готовит структуру. Обзор появится после первой сборки." });
    }
    if (pointers.current.size === 0) {
      gesture.current = null;
      setPanning(false);
    }
  };

  // Ускорение «пульса» данных у работающих модулей
  const flowColor = (n: EcoNode) =>
    n.status === "live" ? "var(--color-accent)" : n.status === "building" ? "var(--color-warning)" : "var(--color-ink-3)";

  const grid = 24 * view.s;

  return (
    <div
      ref={viewport}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn(
        "relative touch-none overflow-hidden rounded-card border border-line bg-canvas select-none",
        fullscreen ? "h-full" : "h-[480px] sm:h-[640px]",
        panning ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{
        backgroundImage: "radial-gradient(circle, var(--color-line-strong) 1px, transparent 1.2px)",
        backgroundSize: `${grid}px ${grid}px`,
        backgroundPosition: `${view.x}px ${view.y}px`,
      }}
      aria-label="Карта бизнеса. Перетаскивайте, чтобы двигать; ⌘ и колесо — масштаб"
      role="application"
    >
      {/* мягкое свечение вокруг ядра */}
      <div
        aria-hidden
        className="pointer-events-none absolute size-[900px] rounded-full"
        style={{
          left: view.x - 450 * view.s,
          top: view.y - 450 * view.s,
          transform: `scale(${view.s})`,
          transformOrigin: "0 0",
          background: "radial-gradient(circle, rgba(23,105,255,0.10) 0%, rgba(23,105,255,0.04) 35%, transparent 65%)",
        }}
      />

      {/* мир */}
      <div
        className={cn("absolute top-0 left-0 origin-top-left will-change-transform", smooth && "transition-transform duration-500 ease-soft")}
        onTransitionEnd={() => setSmooth(false)}
        style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }}>
        <svg className="pointer-events-none absolute overflow-visible" width="1" height="1" aria-hidden>
          {nodes.map((n) => {
            const d = edgePath(n);
            const ghost = layer === "now" && n.layer === "plan";
            const isFresh = n.id === fresh;
            return (
              <g key={n.id}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--color-line-strong)"
                  strokeWidth={1.5 / Math.max(view.s, 0.6)}
                  strokeDasharray={ghost || n.layer === "plan" ? "5 6" : undefined}
                  initial={isFresh ? { pathLength: 0 } : false}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease }}
                />
                {!ghost && (
                  <g className="motion-reduce:hidden">
                    {[0, 1, 2].map((k) => (
                      <circle key={k} r={3} fill={flowColor(n)} opacity={0.7}>
                        <animateMotion
                          dur={`${n.status === "live" ? 3.2 : 5}s`}
                          begin={`${k * (n.status === "live" ? 1.07 : 1.67)}s`}
                          repeatCount="indefinite"
                          path={d}
                          keyPoints={k === 1 ? "1;0" : "0;1"}
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    ))}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {nodes.map((n, i) => (
          <motion.div
            key={n.id}
            data-node={n.id}
            className="absolute cursor-pointer"
            style={{ left: n.x, top: n.y, width: NODE_W, translateX: "-50%", translateY: "-50%" }}
            initial={n.id === fresh ? { x: -n.x, y: -n.y, scale: 0.2, opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            transition={n.id === fresh ? { type: "spring", stiffness: 140, damping: 18 } : { duration: duration.map, ease, delay: 0.03 * i }}
            whileHover={{ scale: 1.015 }}
          >
            <NodeCard node={n} layer={layer} />
          </motion.div>
        ))}

        <div className="absolute" style={{ left: 0, top: 0, transform: "translate(-50%, -50%)" }}>
          <Core onOpen={onCore} />
        </div>
      </div>

      {/* Управление */}
      <div data-no-pan className="absolute right-3 bottom-3 flex items-center gap-1 rounded-btn border border-line bg-surface/90 p-1 shadow-card backdrop-blur" onPointerDown={(e) => e.stopPropagation()}>
        <CtrlButton label="Уменьшить" onClick={() => { setSmooth(true); zoomAt(1 / 1.2); }}>
          <Minus />
        </CtrlButton>
        <button
          type="button"
          onClick={() => zoomAt(1 / view.s)}
          className="h-8 w-12 rounded-[8px] text-caption font-medium text-ink-2 tabular hover:bg-subtle hover:text-ink"
          aria-label="Масштаб 100%"
        >
          {Math.round(view.s * 100)}%
        </button>
        <CtrlButton label="Увеличить" onClick={() => { setSmooth(true); zoomAt(1.2); }}>
          <Plus />
        </CtrlButton>
        <span className="mx-0.5 h-5 w-px bg-line" />
        <CtrlButton label="Показать всё" onClick={fit}>
          <Scan />
        </CtrlButton>
        <CtrlButton label={fullscreen ? "Свернуть (Esc)" : "Во весь экран"} onClick={() => onFullscreen(!fullscreen)}>
          {fullscreen ? <Minimize2 /> : <Maximize2 />}
        </CtrlButton>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-4 hidden text-micro text-ink-3 sm:block">
        Тяните, чтобы двигать · {fullscreen ? "колесо" : "⌘ + колесо"} — масштаб · карточки можно переставлять
      </p>
    </div>
  );
}

function CtrlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Tooltip content={label} side="top">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="flex size-8 items-center justify-center rounded-[8px] text-ink-2 transition-colors hover:bg-subtle hover:text-ink [&_svg]:size-4"
      >
        {children}
      </button>
    </Tooltip>
  );
}

/** Куда ведёт карточка карты: продукт → его обзор, сервисные узлы → свой раздел. */
function nodeHref(n: EcoNode): string | null {
  if (["site", "crm", "miniapp", "courier", "mobile"].includes(n.id)) return `/products/${n.id}`;
  if (n.id === "agents") return "/agents";
  if (n.id === "analytics") return "/analytics";
  if (n.id === "integrations") return "/integrations";
  return null;
}

/* ───────────────────────── Список ───────────────────────── */

function ListView({ nodes, layer }: { nodes: EcoNode[]; layer: "now" | "plan" }) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {nodes.map((n, i) => {
        const Icon = icons[n.kind];
        const ghost = layer === "now" && n.layer === "plan";
        return (
          <motion.button
            key={n.id}
            type="button"
            onClick={() => {
              const href = nodeHref(n);
              if (href) router.push(href);
            }}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: ghost ? 0.55 : 1, x: 0 }}
            transition={{ duration: duration.slow, ease, delay: i * 0.03 }}
            className="flex w-full items-center gap-4 border-b border-line px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-subtle"
          >
            <span className="flex size-10 items-center justify-center rounded-btn bg-subtle text-ink">
              <Icon className="size-5" strokeWidth={1.6} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body-sm font-semibold">{n.title}</span>
              <span className="text-micro text-ink-2">{n.layer === "plan" ? "Из плана развития" : "Связан с ядром бизнеса"}</span>
            </span>
            <Status kind={n.status} pill>
              {n.statusText ?? statusMeta[n.status].label}
            </Status>
            <ChevronRight className="size-4 text-ink-3" />
          </motion.button>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Секция ───────────────────────── */

export function EcosystemMap() {
  const [view, setView] = useState<"map" | "list">("map");
  const [layer, setLayer] = useState<"now" | "plan">("now");
  const [nodes, setNodes] = useState<EcoNode[]>(ecosystem);
  const [fullscreen, setFullscreen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [fresh, setFresh] = useState<string | null>(null);
  const toast = useToast();
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("add") === "1") setDialog(true);
  }, [params]);

  const create = useCallback(
    (item: CatalogItem) => {
      const spot = nextSpot(nodes);
      const id = `${item.kind}-${Date.now()}`;
      setNodes((ns) => [...ns, { id, kind: item.kind, title: item.title, status: "planned", statusText: "Черновик", layer: "plan", ...spot }]);
      setFresh(id);
      setDialog(false);
      setView("map");
      toast({
        kind: "pending",
        title: `«${item.title}» вырос из ядра`,
        description: "AI подготовит структуру и предпросмотр. Запуск — после вашего подтверждения.",
      });
    },
    [nodes, toast],
  );

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullscreen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const controls = (
    <div className="flex flex-wrap items-center gap-2">
      <Segmented
        ariaLabel="Слой карты"
        size="sm"
        value={layer}
        onChange={setLayer}
        items={[
          { value: "now", label: "Сейчас" },
          { value: "plan", label: "План" },
        ]}
      />
      <Segmented
        ariaLabel="Вид"
        size="sm"
        value={view}
        onChange={setView}
        items={[
          { value: "map", label: <span className="flex items-center gap-1.5"><LayoutGrid className="size-3.5" />Карта</span> },
          { value: "list", label: <span className="flex items-center gap-1.5"><List className="size-3.5" />Список</span> },
        ]}
      />
    </div>
  );

  return (
    <section aria-labelledby="eco-title" className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="eco-title" className="text-h3 font-semibold">
          Карта бизнеса
        </h2>
        {controls}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: duration.base, ease }}
        >
          {view === "map" ? (
            fullscreen ? (
              <div className="h-[560px] rounded-card border border-dashed border-line-strong sm:h-[640px]" />
            ) : (
              <Canvas nodes={nodes} setNodes={setNodes} layer={layer} fullscreen={false} onFullscreen={setFullscreen} fresh={fresh} onCore={() => setDialog(true)} />
            )
          ) : (
            <ListView nodes={nodes} layer={layer} />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[45] flex flex-col bg-canvas p-3 sm:p-4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: duration.map, ease }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <h2 className="text-h3 font-semibold">Карта бизнеса</h2>
              {controls}
            </div>
            <div className="min-h-0 flex-1">
              <Canvas nodes={nodes} setNodes={setNodes} layer={layer} fullscreen onFullscreen={setFullscreen} fresh={fresh} onCore={() => setDialog(true)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AddModuleDialog
        open={dialog}
        onClose={() => setDialog(false)}
        existing={new Set(nodes.map((n) => n.kind))}
        icons={icons}
        onCreate={create}
      />
    </section>
  );
}
