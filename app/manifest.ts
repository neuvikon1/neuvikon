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
    // The icon's own white, so the splash screen and the icon read as one.
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
      // Maskable icons are cut to shape by the platform and must fill the
      // square, so this one is the plain white tile without its own rounded
      // corners. The N sits well inside the safe zone.
      { src: asset("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
