/**
 * The shape of the site's content, and the one way pages reach it.
 *
 * Each language is a file of records - `content.tr.ts`, `content.en.ts` - and
 * pages ask for theirs through `getContent(locale)`, so one component prints
 * both. Adding a project or a division is a record in both files; the home
 * page, the division page, the project page and the menus follow.
 */

import * as en from "./content.en";
import * as tr from "./content.tr";
import { projectSlug, type Locale } from "./i18n";

export type ProjectStatus = "released" | "building";

/** Labels are brand names (Google Play, App Store), the same in both languages. */
export type ProjectLink = { label: string; href: string };

/** One screenshot or clip on a project's own page. `src` is a path under `public/`. */
export type ProjectMedia = {
  src: string;
  /** Poster frame for a video; without one the video shows its first frame. */
  poster?: string;
  alt?: string;
  kind?: "image" | "video";
  /** A landscape capture (desktop, tablet). Phone screenshots are the default. */
  wide?: boolean;
};

export type Project = {
  name: string;
  /** One line, shown under the name. */
  tagline: string;
  description?: string;
  status: ProjectStatus;
  tags: string[];
  /** Square app icon under public/apps. */
  image?: string;
  /**
   * A 16:10 picture made for the project card, under public/media. Without one
   * the card falls back to the first of `media`.
   */
  cover?: string;
  /** Store pages, live sites, repositories — several per project is normal. */
  links?: ProjectLink[];
  /** Pulled to the front of its division, which is what puts it on the home page. */
  featured?: boolean;
  /**
   * In-app screenshots and clips for the project's own page. Empty for most
   * projects so far; the page says so rather than inventing something, and
   * adding a line here is all it takes to fill it.
   */
  media?: ProjectMedia[];
};

export type Division = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  capabilities: string[];
  projects: Project[];
};

export type Org = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  year: number;
};

export type About = {
  lead: string;
  facts: { label: string; value: string }[];
  principles: { title: string; body: string }[];
  /** No roles: in a studio this size everyone does several jobs. */
  team: string[];
};

export type Careers = {
  lead: string;
  openings: { title: string; division: string; summary: string }[];
};

export type Content = {
  org: Org;
  statusLabel: Record<ProjectStatus, string>;
  divisions: Division[];
  about: About;
  careers: Careers;
};

const CONTENT: Record<Locale, Content> = { tr, en };

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}

export function getDivision(locale: Locale, slug: string): Division | undefined {
  return getContent(locale).divisions.find((division) => division.slug === slug);
}

export function getProject(
  locale: Locale,
  divisionSlug: string,
  slug: string,
): { division: Division; project: Project } | undefined {
  const division = getDivision(locale, divisionSlug);
  const project = division?.projects.find((p) => projectSlug(p.name) === slug);
  return division && project ? { division, project } : undefined;
}

/** Featured projects first, the rest in the order they were written. */
export function orderedProjects(division: Division): Project[] {
  return [
    ...division.projects.filter((project) => project.featured),
    ...division.projects.filter((project) => !project.featured),
  ];
}

/**
 * The picture on a project's card: its first screenshot, or a clip's poster
 * frame. A clip with no poster is skipped, since a card is no place to load a
 * video. Nothing usable means the card falls back to the app icon.
 */
export function projectCover(project: Project): (ProjectMedia & { src: string }) | undefined {
  if (project.cover) return { src: project.cover, wide: true };
  for (const item of project.media ?? []) {
    const src = item.kind === "video" ? item.poster : item.src;
    if (src) return { ...item, src };
  }
  return undefined;
}

/** External accounts, the same in both languages. Company socials (LinkedIn, TikTok, Instagram) go here as they open. */
export const links: ProjectLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/neuvikon-tech-135a35428/" },
  { label: "Instagram", href: "https://www.instagram.com/neuvikon/" },
];

/**
 * The data controller, as the KVKK notice and the privacy policy print it.
 * Only filled fields are printed. Address, MERSIS and tax details belong here
 * as soon as they exist.
 */
export const legalEntity = {
  title: "Neuvikon" as string | null,
  address: null as string | null,
  mersis: null as string | null,
  taxOffice: null as string | null,
  /** Changed by hand whenever the site's own legal texts change. */
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
};

/**
 * A path under `public/` as the browser has to request it.
 *
 * The site is served from a sub-path on GitHub Pages, and Next only prefixes
 * that onto links and imported images - a string `src` on an unoptimized
 * image or a video is printed exactly as written, and 404s.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
