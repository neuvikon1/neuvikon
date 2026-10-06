import Link from "next/link";

import { getContent, links } from "@/lib/content";
import { divisionHref, href, ui, type Locale } from "@/lib/i18n";
import { Wordmark } from "./brand/logo";
import { LanguageSwitch } from "./language-switch";
import { Reveal } from "./motion/reveal";
import { Container } from "./layout/container";
import { GridRule } from "./layout/grid-lines";

const LINK = "transition-colors hover:text-foreground";

/**
 * A strip, not a sitemap: where to go, how to reach us, and the fine print.
 * The rule is the same masked hairline every Section uses, so the footer's top
 * edge lines up with the grid above it.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, divisions } = getContent(locale);
  const pages = [
    { href: href(locale, "about"), label: t.about },
    { href: href(locale, "careers"), label: t.careers },
    { href: href(locale, "contact"), label: t.contact },
  ];

  return (
    <footer className="relative w-full">
      <GridRule />
      <Container className="py-10">
        {/* No bottom margin on the in-view test, unlike every other Reveal:
            the footer is the last thing on the page, so it can never rise
            into the band the shared margin leaves out - it stayed invisible. */}
        <Reveal viewport={{ once: true }} className="flex flex-col gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href={href(locale, "home")} aria-label={org.name} className="shrink-0">
                <Wordmark height={18} />
              </Link>
              {divisions.map((division) => (
                <Link key={division.slug} href={divisionHref(locale, division.slug)} lang="en" className={LINK}>
                  {division.short}
                </Link>
              ))}
              {pages.map((page) => (
                <Link key={page.href} href={page.href} className={LINK}>
                  {page.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href={`mailto:${org.email}`} className={LINK}>
                {org.email}
              </a>
              {links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={LINK}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link href={href(locale, "privacy")} className={LINK}>
              {t.privacy}
            </Link>
            <Link href={href(locale, "dataProtection")} className={LINK}>
              {t.dataProtection}
            </Link>
            <LanguageSwitch locale={locale} className="text-xs" />
            <span className="md:ml-auto">
              © {org.year} {org.name}
            </span>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
