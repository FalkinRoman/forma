import type { Metadata } from "next";
import { ImprovementsScreen } from "@/components/screens/improvements";

export const metadata: Metadata = { title: "Улучшения" };
export default function Page() {
  return <ImprovementsScreen />;
}
