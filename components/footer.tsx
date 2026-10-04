import Link from "next/link";

import { divisions, links, org } from "@/lib/content";
import { Container } from "./layout/container";

/**
 * A single strip, not a sitemap. The rule is the same masked hairline every
 * Section uses, so the footer's top edge lines up with the grid above it.
 */
export function Footer() {
  return (
    <footer className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-rule grid-rule"
      />
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/" className="text-foreground">
            {org.name}
          </Link>
          {divisions.map((division) => (
            <Link
              key={division.slug}
              href={`#${division.slug}`}
              className="transition-colors hover:text-foreground"
            >
              {division.short}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a
            href={`mailto:${org.email}`}
            className="transition-colors hover:text-foreground"
          >
            {org.email}
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <span>
            © {org.year} {org.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
