import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { RevealGroup, RevealRow } from "@/components/motion/reveal";
import { DivisionSection } from "@/components/sections/division";
import { Eyebrow } from "@/components/ui/typography";
import { getContent, type Division } from "@/lib/content";
import { divisionHref, ui, type Locale } from "@/lib/i18n";

/**
 * A division's own page: the same section the home page shows, as the page
 * itself, followed by the way to the other two. Ending on the division's last
 * project left the reader nowhere to go but back.
 */
export function DivisionView({ locale, division }: { locale: Locale; division: Division }) {
  const t = ui[locale];
  const others = getContent(locale).divisions.filter((d) => d.slug !== division.slug);

  return (
    <>
      <DivisionSection division={division} locale={locale} as="h1" />

      <Section>
        <Stack gap="sm" className="w-full">
          <Eyebrow>{t.otherDivisions}</Eyebrow>
          <RevealGroup className="w-full">
            <ul className="w-full">
              {others.map((other) => (
                <RevealRow key={other.slug} className="border-t border-rule">
                  <Link
                    href={divisionHref(locale, other.slug)}
                    className="group flex items-baseline gap-4 py-4 transition-colors hover:text-foreground"
                  >
                    <span className="min-w-0 flex-1">
                      <span lang="en" className="block text-base tracking-tight">
                        {other.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {other.tagline}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </Link>
                </RevealRow>
              ))}
            </ul>
          </RevealGroup>
        </Stack>
      </Section>
    </>
  );
}
