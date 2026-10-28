import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ScrollScene } from "@/components/motion/scroll-scene";
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
 *
 * Behind all of it runs `ScrollScene`, the point cloud that takes the shape of
 * whichever division is on screen. The sections keep the left of the grid for
 * their copy so the cloud has the right side to itself.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { divisions, about } = getContent(locale);

  return (
    <>
      <ScrollScene />
      <Hero locale={locale} />

      <Section id="divisions" className="scroll-mt-20">
        <Stack gap="md">
          <Title>
            <RisingWords>{t.divisionsTitle}</RisingWords>
          </Title>
          <Reveal delay={0.1}>
            <Text level="lead">{about.lead}</Text>
          </Reveal>
        </Stack>
      </Section>

      {/* Full bleed, outside the grid: the screens run off both edges. */}
      <Showreel label={t.showreel} />

      {divisions.map((division) => (
        <DivisionSection key={division.slug} division={division} locale={locale} />
      ))}

      <StudioSection locale={locale} />
      <CareersSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
