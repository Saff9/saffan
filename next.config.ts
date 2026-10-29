import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Support standalone output for containerized deployments (Docker/CI)
  ...(process.env.NEXT_STANDALONE === "true" ? { output: "standalone" } : {}),
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    cpus: 1,
    optimizePackageImports: ["lucide-react", "framer-motion", "simple-icons", "date-fns"],
  },
};

export default nextConfig;
