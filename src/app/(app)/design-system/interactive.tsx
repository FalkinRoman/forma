"use client";

import { useState } from "react";
import { Segmented } from "@/components/ui/segmented";
import { Checkbox, Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function DsInteractive() {
  const [seg, setSeg] = useState<"a" | "b" | "c">("a");
  const [sw, setSw] = useState(true);
  const [cb, setCb] = useState(true);
  const toast = useToast();
  return (
    <section className="rounded-panel border border-line bg-surface p-6 shadow-card">
      <h2 className="text-h3 font-semibold">Контролы и уведомления</h2>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <Segmented
          ariaLabel="Пример"
          value={seg}
          onChange={setSeg}
          items={[
            { value: "a", label: "Обзор" },
            { value: "b", label: "Разработка" },
            { value: "c", label: "Рост" },
          ]}
        />
        <label className="flex items-center gap-2.5 text-body-sm">
          <Switch checked={sw} onCheckedChange={setSw} /> Автопубликация
        </label>
        <label className="flex items-center gap-2.5 text-body-sm">
          <Checkbox checked={cb} onChange={setCb} /> Согласен
        </label>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => toast({ kind: "success", title: "Сайт опубликован", description: "delikatesy.ru обновлён до версии 1.4" })}>
            Toast: успех
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast({ kind: "pending", title: "Ждёт подтверждения", description: "Подключение ЮKassa — проверьте реквизиты" })}>
            Toast: ожидание
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast({ kind: "error", title: "Сборка не прошла", description: "Нет фото у 3 товаров. Добавьте их в каталоге." })}>
            Toast: ошибка
          </Button>
        </div>
      </div>
    </section>
  );
}
