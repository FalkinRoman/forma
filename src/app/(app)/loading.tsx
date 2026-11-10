import { Skeleton } from "@/components/ui/progress";

/** Скелетон раздела: повторяет структуру страницы, чтобы контент не «прыгал». */
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8" aria-busy="true" aria-label="Загрузка">
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-3 h-5 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-[104px] rounded-card" />)}
      </div>
      <Skeleton className="h-[420px] rounded-panel" />
    </div>
  );
}
