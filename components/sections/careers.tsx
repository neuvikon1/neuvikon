import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal, RevealGroup, RevealItem, RevealRow } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/** Open roles, or the honest absence of them. On the home page and the Careers page. */
export function CareersSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const t = ui[locale];
  const { careers } = getContent(locale);

  return (
    <Section id="careers" className="scroll-mt-20">
      <Stack gap="lg" className="w-full">
        <Stack gap="md">
          <Reveal still>
            <Eyebrow>{t.careers}</Eyebrow>
          </Reveal>
          <Title as={as}>
            <RisingWords>
              {careers.openings.length > 0 ? t.openPositions : t.noOpenPositions}
            </RisingWords>
          </Title>
          <Reveal delay={0.1}>
            <Text level="lead">{careers.lead}</Text>
          </Reveal>
        </Stack>

        {careers.openings.length > 0 && (
          <ul className="grid w-full gap-4 md:grid-cols-2">
            {careers.openings.map((opening) => (
              <li key={opening.title} className="border-t border-rule py-3">
                <Stack gap="xs">
                  <Title as="h3" level="sub" className="text-base">
                    {opening.title}
                  </Title>
                  <Eyebrow lang="en">{opening.division}</Eyebrow>
                  <Text>{opening.summary}</Text>
                </Stack>
              </li>
            ))}
          </ul>
        )}

        <RevealGroup stagger={0.05} className="w-full">
          <Stack gap="sm" className="w-full">
            <RevealItem still>
              <Eyebrow>{t.whatWeReadFirst}</Eyebrow>
            </RevealItem>
            <ul className="grid w-full gap-x-10 gap-y-2 md:grid-cols-2">
              {careers.interests.map((interest) => (
                <RevealRow
                  key={interest}
                  className="border-t border-rule py-2 text-sm text-muted-foreground"
                >
                  {interest}
                </RevealRow>
              ))}
            </ul>
          </Stack>
        </RevealGroup>
      </Stack>
    </Section>
  );
}
