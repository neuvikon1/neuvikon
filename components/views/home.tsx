import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { CareersSection } from "@/components/sections/careers";
import { ContactSection } from "@/components/sections/contact";
import { DivisionSection } from "@/components/sections/division";
import { Hero } from "@/components/sections/hero";
import { Showreel } from "@/components/sections/showreel";
import { StudioSection } from "@/components/sections/studio";
import { Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * The whole studio on one page: the statement, the work, the three divisions,
 * how we work, careers and contact. Each of those also has a page of its own;
 * this is the overview that hands off to them.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { divisions, about } = getContent(locale);

  return (
    <>
      <Hero locale={locale} />

      <Section id="divisions" className="scroll-mt-20">
        <Stack gap="md">
          <Title>
            <RisingWords>{t.divisionsTitle}</RisingWords>
          </Title>
          <Reveal delay={0.1}>
            <Text level="lead">{about.lead}</Text>
          </Reveal>
          {/* Inside the grid: the reel is clipped at the rails, so the screens
              slide in and out at the section's own edges. */}
          <Showreel label={t.showreel} />
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
