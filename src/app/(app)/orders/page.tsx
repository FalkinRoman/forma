import type { Metadata } from "next";
import { OrdersScreen } from "@/components/screens/orders";

export const metadata: Metadata = { title: "Заказы" };
export default function Page() {
  return <OrdersScreen />;
}
