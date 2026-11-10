import type { Metadata } from "next";
import { AnalyticsScreen } from "@/components/screens/analytics";

export const metadata: Metadata = { title: "Аналитика" };
export default function Page() {
  return <AnalyticsScreen />;
}
