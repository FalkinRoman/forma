import { notFound } from "next/navigation";

/** Все разделы теперь имеют свои страницы; неизвестный адрес → 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return [];
}
export default function SectionPage() {
  notFound();
}
