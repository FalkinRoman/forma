import type { Metadata } from "next";
import { AgentsScreen } from "@/components/screens/agents";

export const metadata: Metadata = { title: "AI-агенты" };
export default function Page() {
  return <AgentsScreen />;
}
