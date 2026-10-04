import Link from "next/link";

import { divisions, links, org } from "@/lib/content";
import { Reveal } from "./motion/reveal";
import { Container } from "./layout/container";
import { GridRule } from "./layout/grid-lines";

/**
 * A single strip, not a sitemap. The rule is the same masked hairline every
 * Section uses, so the footer's top edge lines up with the grid above it.
 */
export function Footer() {
  return (
    <footer className="relative w-full">
      <GridRule />
      <Container className="py-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
        </Reveal>
      </Container>
    </footer>
  );
}
