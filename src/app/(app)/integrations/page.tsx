import type { Metadata } from "next";
import { IntegrationsScreen } from "@/components/screens/integrations";

export const metadata: Metadata = { title: "Интеграции" };
export default function Page() {
  return <IntegrationsScreen />;
}
