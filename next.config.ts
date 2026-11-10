import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Значок Next.js в dev-режиме перекрывал аватар в сайдбаре
  devIndicators: false,
};

export default nextConfig;
