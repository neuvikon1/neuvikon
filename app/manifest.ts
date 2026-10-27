import type { MetadataRoute } from "next";

import { asset, getContent } from "@/lib/content";

// A static export only writes route handlers that are marked static.
export const dynamic = "force-static";

/**
 * One manifest for both languages: it can only sit at the root of `app/`, and
 * the Turkish site is the one at `/`.
 */
export default function manifest(): MetadataRoute.Manifest {
  const { org } = getContent("tr");
  return {
    name: org.name,
    short_name: org.name,
    description: org.description,
    lang: "tr",
    start_url: asset("/"),
    display: "standalone",
    // The site's dark `--background`, which is also the icon's own.
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
      // The N sits well inside the maskable safe zone, so the same file serves.
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
