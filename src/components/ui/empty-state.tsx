import type { ReactNode } from "react";

/** Empty state: одно действие и 1–2 примера, без перегрузки инструкциями. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  examples,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  examples?: string[];
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-[18px] border border-line bg-surface text-accent shadow-card [&_svg]:size-6">
        {icon}
      </div>
      <h2 className="text-h2 font-semibold">{title}</h2>
      <p className="mt-2 text-body text-ink-2">{description}</p>
      {action && <div className="mt-6">{action}</div>}
      {examples && examples.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {examples.map((e) => (
            <span key={e} className="rounded-full bg-subtle px-3 py-1.5 text-caption text-ink-2">
              {e}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
