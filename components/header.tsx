import Image from "next/image";
import Link from "next/link";

import { getContent } from "@/lib/content";
import { divisionHref, href, ui, type Locale } from "@/lib/i18n";
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
 * The header's bottom rule is a CSS animation on a `scroll()` timeline rather
 * than anything React knows about: it appears once there is page behind the
 * header - at the top of the hero there is nothing to separate it from.
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
        {/* Wordmark and nav sit together on the left, 40px apart and centred
            on each other, as in the design. The nav's 8px top padding is the
            design's too: it sets the link text a touch below the wordmark's
            middle, which is where its lowercase letters sit. */}
        <div className="flex items-center gap-[calc(40rem/12)]">
          <Link href={href(locale, "home")} aria-label={org.name} className="shrink-0">
            {/* The design system's wordmark. Its letters are near-black, so dark
              mode gets a copy with them set to the dark foreground; the green
              n is the same in both. Swapped by the `dark` class, not by
              React, so the server and client render the same markup. */}
            <Image
              src="/brand/neuvikon-wordmark.svg"
              alt=""
              width={116}
              height={20}
              priority
              unoptimized
              className="dark:hidden"
            />
            <Image
              src="/brand/neuvikon-wordmark-dark.svg"
              alt=""
              width={116}
              height={20}
              priority
              unoptimized
              className="hidden dark:block"
            />
          </Link>
          <SiteNav items={items} label={t.mainNav} className="pt-[calc(8rem/12)]" />
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href={contact.href} className="hidden sm:inline-flex">
            {t.contact}
          </ButtonLink>
          <ModeToggle label={t.toggleTheme} />
          <LanguageSwitch locale={locale} codes className="ml-1 hidden font-mono text-xs md:inline" />
          <MobileNav locale={locale} items={items} contact={contact} />
        </div>
      </Container>

      <span
        aria-hidden
        className="header-edge pointer-events-none absolute inset-x-0 bottom-0 h-px bg-rule"
      />
    </header>
  );
};

export default Header;
