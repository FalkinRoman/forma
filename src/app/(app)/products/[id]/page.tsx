import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetail } from "@/components/screens/product-detail";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: products.find((p) => p.id === id)?.title };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
