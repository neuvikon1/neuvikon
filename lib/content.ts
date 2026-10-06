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
  /** Store pages, live sites, repositories — several per project is normal. */
  links?: ProjectLink[];
  /** Pulled to the front of its division and given a wider card. */
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
  interests: string[];
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

/** External accounts, the same in both languages. Added as they open. */
export const links: ProjectLink[] = [
  { label: "GitHub", href: "https://github.com/Zer0desu1" },
];

/**
 * The data controller, as the KVKK notice and the privacy policy print it.
 *
 * Still unfilled. A data controller's identity is a required part of a KVKK
 * notice, so the gaps are printed as gaps rather than hidden - hiding them
 * would only hide that the notice is not valid yet. Without a legal entity
 * this is a real person's name and address; MERSIS and tax details only
 * apply to a company.
 */
export const PENDING = { tr: "EKLENECEK", en: "PENDING" } as const;

export const legalEntity = {
  title: null as string | null,
  address: null as string | null,
  mersis: null as string | null,
  taxOffice: null as string | null,
  /** Changed by hand whenever the site's own legal texts change. */
  updated: { tr: "6 Ekim 2026", en: "6 October 2026" },
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
