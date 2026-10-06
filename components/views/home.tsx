import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal, RevealCell, RevealGroup } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { CareersSection } from "@/components/sections/careers";
import { ContactSection } from "@/components/sections/contact";
import { DivisionSection } from "@/components/sections/division";
import { Hero } from "@/components/sections/hero";
import { StudioSection } from "@/components/sections/studio";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * The whole studio on one page: the statement, the three divisions, how we
 * work, careers and contact. Each of those also has a page of its own; this
 * is the overview that hands off to them.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { divisions, about } = getContent(locale);

  return (
    <>
      <Hero locale={locale} />

      <Section id="divisions" className="scroll-mt-20">
        <Stack gap="lg" className="w-full">
          <Stack gap="md">
            <Reveal still>
              <Eyebrow>{t.divisions}</Eyebrow>
            </Reveal>
            <Title>
              <RisingWords>{t.divisionsTitle}</RisingWords>
            </Title>
            <Reveal delay={0.1}>
              <Text level="lead">{about.lead}</Text>
            </Reveal>
          </Stack>

          <RevealGroup className="grid w-full gap-4 md:grid-cols-3">
            {divisions.map((division) => (
              <RevealCell key={division.slug}>
                <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
                  <CardContent>
                    <Stack gap="sm">
                      <Eyebrow lang="en">{division.short}</Eyebrow>
                      <Title as="h3" level="sub" className="text-xl" lang="en">
                        {division.name}
                      </Title>
                      <Text>{division.tagline}</Text>
                      <a
                        href={`#${division.slug}`}
                        className="text-xs underline underline-offset-4 hover:no-underline"
                      >
                        {division.projects.length > 0
                          ? t.projectCount(division.projects.length)
                          : t.inPrototype}
                      </a>
                    </Stack>
                  </CardContent>
                </Card>
              </RevealCell>
            ))}
          </RevealGroup>
        </Stack>
      </Section>

      {divisions.map((division) => (
        <DivisionSection key={division.slug} division={division} locale={locale} />
      ))}

      <StudioSection locale={locale} />
      <CareersSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
