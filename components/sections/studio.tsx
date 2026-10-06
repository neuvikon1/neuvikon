import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal, RevealCell, RevealGroup, RevealItem, RevealRow } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { Card, CardContent } from "@/components/ui/card";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * How the studio works and who is in it. A section of the home page, and the
 * whole of the About page - where it opens with the studio's own lead and its
 * title is the page's `h1`.
 */
export function StudioSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const t = ui[locale];
  const { about } = getContent(locale);

  return (
    <Section id="studio" className="scroll-mt-20">
      <Stack gap="xl" className="w-full">
        <Stack gap="md">
          <Reveal still>
            <Eyebrow>{t.studio}</Eyebrow>
          </Reveal>
          <Title as={as}>
            <RisingWords>{t.howWeWork}</RisingWords>
          </Title>
          {as === "h1" && (
            <Reveal delay={0.1}>
              <Text level="lead">{about.lead}</Text>
            </Reveal>
          )}
        </Stack>

        <RevealGroup className="grid w-full gap-4 md:grid-cols-2">
          {about.principles.map((principle) => (
            <RevealCell key={principle.title}>
              <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
                <CardContent>
                  <Stack gap="xs">
                    <Title as="h3" level="sub" className="text-base">
                      {principle.title}
                    </Title>
                    <Text>{principle.body}</Text>
                  </Stack>
                </CardContent>
              </Card>
            </RevealCell>
          ))}
        </RevealGroup>

        <Stack gap="lg" className="w-full">
          {/* The row arrives as one block rather than figure by figure: a
              `dl` may only hold `dt`/`dd` pairs and the `div` that groups
              them, so a per-figure animator would have to be a second `div`
              inside the first. Not worth a staggered entrance. */}
          <Reveal className="w-full">
            <StatGroup className="max-w-none md:grid-cols-4">
              {about.facts.map((fact) => (
                <Stat key={fact.label} value={fact.value} label={fact.label} />
              ))}
            </StatGroup>
          </Reveal>

          <RevealGroup stagger={0.05} className="w-full">
            <Stack gap="sm" className="w-full">
              <RevealItem still>
                <Eyebrow>{t.team}</Eyebrow>
              </RevealItem>
              {/* No titles: in a studio this size everyone does several jobs. */}
              <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {about.team.map((person) => (
                  <RevealRow key={person}>{person}</RevealRow>
                ))}
              </ul>
            </Stack>
          </RevealGroup>
        </Stack>
      </Stack>
    </Section>
  );
}
