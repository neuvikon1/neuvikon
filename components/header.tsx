import Link from "next/link";

import { getContent } from "@/lib/content";
import { divisionHref, href, ui, type Locale } from "@/lib/i18n";
import { SignedWordmark } from "./brand/logo";
import { Container } from "./layout/container";
import { LanguageSwitch } from "./language-switch";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { SiteNav, type NavItem } from "./site-nav";
import { ButtonLink } from "./ui/button-link";

/**
 * Divisions first, then the two pages everyone looks for. Each goes to its own
 * page; on the home page each also has a section, which is what the marker
 * follows while you scroll there.
 */
function navItems(locale: Locale): NavItem[] {
  const t = ui[locale];
  return [
    ...getContent(locale).divisions.map((division) => ({
      href: divisionHref(locale, division.slug),
      label: division.short,
      section: division.slug,
      lang: "en",
    })),
    { href: href(locale, "about"), label: t.studio, section: "studio" },
    { href: href(locale, "careers"), label: t.careers, section: "careers" },
  ];
}

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
const Header = ({ locale }: { locale: Locale }) => {
  const t = ui[locale];
  const { org } = getContent(locale);
  const items = navItems(locale);
  const contact: NavItem = { href: href(locale, "contact"), label: t.contact, section: "contact" };

  return (
    <header className="sticky top-0 z-50 w-full bg-background supports-[backdrop-filter]:bg-background/72 supports-[backdrop-filter]:backdrop-blur-xl">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={href(locale, "home")} aria-label={org.name} className="shrink-0">
          <SignedWordmark height={20} />
        </Link>
        <SiteNav items={items} label={t.mainNav} />
        <div className="flex items-center gap-2">
          <LanguageSwitch locale={locale} className="mr-2 hidden md:inline" />
          <ButtonLink href={contact.href} className="hidden sm:inline-flex">
            {t.contact}
          </ButtonLink>
          <ModeToggle label={t.toggleTheme} />
          <MobileNav locale={locale} items={items} contact={contact} />
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
