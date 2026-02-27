// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint xatolari bo'lsa ham build davom etadi
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript xatolari bo'lsa ham build davom etadi
    ignoreBuildErrors: true,
  },
};

export default nextConfig;