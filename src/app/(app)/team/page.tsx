import type { Metadata } from "next";
import { TeamScreen } from "@/components/screens/team";

export const metadata: Metadata = { title: "Команда" };
export default function Page() {
  return <TeamScreen />;
}
