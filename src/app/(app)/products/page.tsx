import type { Metadata } from "next";
import { ProductsScreen } from "@/components/screens/products";

export const metadata: Metadata = { title: "Продукты" };
export default function Page() {
  return <ProductsScreen />;
}
