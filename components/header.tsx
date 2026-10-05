import Link from "next/link";

import { divisions, org } from "@/lib/content";
import { Wordmark } from "./brand/logo";
import { Container } from "./layout/container";
import { ModeToggle } from "./mode-toggle";
import { SiteNav, type NavItem } from "./site-nav";
import { ButtonLink } from "./ui/button-link";

/** Divisions first, then the two pages everyone looks for. */
const NAV: NavItem[] = [
  ...divisions.map((division) => ({
    href: `#${division.slug}`,
    label: division.short,
  })),
  { href: "#studio", label: "Studio" },
  { href: "#careers", label: "Careers" },
];

/**
 * The header carries two scroll-driven marks along its bottom edge, both of
 * them CSS animations on a `scroll()` timeline rather than anything React knows
 * about: an element that updates every frame has no business re-rendering, and
 * on the compositor neither of these can stutter under a heavy section.
 *
 * The rule appears once there is page behind the header - at the top of the
 * hero there is nothing to separate it from - and the brighter line over it is
 * how far through the document the reader has come.
 *
 * The bar is translucent only where the browser can blur what is behind it;
 * without that it stays opaque, because 70% of the background over the hero's
 * shader is not a frosted header, it is a smeared one.
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background supports-[backdrop-filter]:bg-background/72 supports-[backdrop-filter]:backdrop-blur-xl">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={org.name} className="shrink-0">
          <Wordmark height={20} priority />
        </Link>
        <SiteNav items={NAV} />
        <div className="flex items-center gap-2">
          <ButtonLink href="#contact">Contact</ButtonLink>
          <ModeToggle />
        </div>
      </Container>

      <span
        aria-hidden
        className="header-edge pointer-events-none absolute inset-x-0 bottom-0 h-px bg-rule"
      />
      <span
        aria-hidden
        className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 h-px bg-foreground/60"
      />
    </header>
  );
};

export default Header;
