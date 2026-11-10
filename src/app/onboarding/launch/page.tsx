import type { Metadata } from "next";
import { LaunchStep } from "@/components/onboarding/launch-step";

export const metadata: Metadata = { title: "Запуск" };
export default function Page() {
  return <LaunchStep />;
}
