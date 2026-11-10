import type { Metadata } from "next";
import { DesignStep } from "@/components/onboarding/design-step";

export const metadata: Metadata = { title: "Дизайн" };
export default function Page() {
  return <DesignStep />;
}
