import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { RevealCell, RevealGroup } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { href, ui, type Locale } from "@/lib/i18n";

/**
 * The end of the home page: the studio, its open roles and how to reach it,
 * each one line and a way through to the page that has the rest. Each of those
 * is a page of its own, and the contact form in particular is taller than
 * everything else here put together.
 */
export function StudioLinks({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { careers } = getContent(locale);
  const hasOpenings = careers.openings.length > 0;

  const items = [
    { key: "about", to: href(locale, "about"), title: t.howWeWork, body: t.howWeWorkTeaser },
    {
      key: "careers",
      to: href(locale, "careers"),
      title: hasOpenings ? t.openPositions : t.noOpenPositions,
      body: careers.openings.map((opening) => opening.title).join(" · "),
    },
    { key: "contact", to: href(locale, "contact"), title: t.contactTitle, body: t.contactLead },
  ];

  return (
    <Section id="studio" inset={false} className="scroll-mt-20" containerClassName="py-14 md:py-16">
      <RevealGroup stagger={0.06} className="grid w-full gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <RevealCell key={item.key}>
            <Link
              href={item.to}
              className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-shadow duration-500 ease-house group-hover:ring-foreground/20">
                <CardContent>
                  <div className="flex items-start justify-between gap-3">
                    <Title as="h2" level="sub" className="text-xl">
                      {item.title}
                    </Title>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </div>
                  {item.body && <Text className="mt-2 text-sm">{item.body}</Text>}
                </CardContent>
              </Card>
            </Link>
          </RevealCell>
        ))}
      </RevealGroup>
    </Section>
  );
}
