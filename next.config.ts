import type { NextConfig } from "next";

// GitHub Pages serves this repo under https://neuvikon1.github.io/neuvikon,
// so the build needs a base path. Set by the Pages workflow only, keeping
// `next dev` at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  experimental: {
    // Two root layouts (one per language) leave no single layout to build a
    // 404 inside; see app/global-not-found.tsx.
    globalNotFound: true,
  },
  images: {
    // No image optimization server on Pages.
    unoptimized: true,
  },
};

export default nextConfig;
