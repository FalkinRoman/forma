import type { NextConfig } from "next";

// Для GitHub Pages сборка статическая и живёт в подпапке /forma.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Значок Next.js в dev-режиме перекрывал аватар в сайдбаре
  devIndicators: false,
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  basePath,
  trailingSlash: !!process.env.STATIC_EXPORT,
  images: { unoptimized: true },
};

export default nextConfig;
