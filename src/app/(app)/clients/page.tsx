import type { Metadata } from "next";
import { ClientsScreen } from "@/components/screens/clients";

export const metadata: Metadata = { title: "Клиенты" };
export default function Page() {
  return <ClientsScreen />;
}
