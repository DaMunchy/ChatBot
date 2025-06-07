import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint error saat build (biar lancar di Vercel)
  },
};

export default nextConfig;
