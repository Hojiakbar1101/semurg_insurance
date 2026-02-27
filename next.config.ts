import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint xatolari bo'lsa ham build davom etadi
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript xatolari bo'lsa ham build davom etadi
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;