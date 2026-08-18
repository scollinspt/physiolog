import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only — no Node server for
  // image optimization or SSR.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
