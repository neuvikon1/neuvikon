import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content";
import { divisionHref, locales, pageAlternates, projectHref, routes, type Locale } from "@/lib/i18n";

// A static export only writes route handlers it is told are static.
export const dynamic = "force-static";

/**
 * Every page in both languages, built from the same `routes` and content
 * records the pages are - a new project or division is listed here as soon
 * as its page exists. Each entry carries its hreflang alternates, the same
 * ones the page prints in its own `<head>`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => pathsFor(locale).map((path) => entry(locale, path)));
}

function pathsFor(locale: Locale): string[] {
  const { divisions } = getContent(locale);
  return [
    ...Object.values(routes).map((route) => route[locale]),
    ...divisions.map((division) => divisionHref(locale, division.slug)),
    ...divisions.flatMap((division) =>
      division.projects.map((project) => projectHref(locale, division.slug, project.name)),
    ),
  ];
}

function entry(locale: Locale, path: string): MetadataRoute.Sitemap[number] {
  const { canonical, languages } = pageAlternates(locale, path);
  return { url: canonical, alternates: { languages } };
}
