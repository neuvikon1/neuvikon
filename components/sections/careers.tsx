import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Reveal, RevealCell, RevealGroup } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * Open roles, or the honest absence of them. On the home page and the
 * Careers page. Applying is an email with the role already in the subject,
 * so it lands in the inbox sorted.
 */
export function CareersSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const t = ui[locale];
  const { careers, org } = getContent(locale);

  return (
    <Section id="careers" className="scroll-mt-20">
      {/* Two columns on a wide screen: the pitch on the left, the roles beside
          it, so a single opening does not leave half the row empty. */}
      <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-start">
        <Stack gap="md" className="lg:col-span-6">
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
          <RevealGroup stagger={0.06} className="grid w-full gap-4 lg:col-span-5 lg:col-start-8">
            {careers.openings.map((opening) => (
              <RevealCell key={opening.title}>
                <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
                  <CardContent>
                    <Stack gap="sm">
                      <Eyebrow lang="en">{opening.division}</Eyebrow>
                      <Title as="h3" level="sub" className="text-xl">
                        {opening.title}
                      </Title>
                      <Text>{opening.summary}</Text>
                      <ButtonLink
                        href={`mailto:${org.email}?subject=${encodeURIComponent(`${t.apply}: ${opening.title}`)}`}
                      >
                        {t.apply}
                        <ArrowRight data-icon="inline-end" />
                      </ButtonLink>
                    </Stack>
                  </CardContent>
                </Card>
              </RevealCell>
            ))}
          </RevealGroup>
        )}
      </div>
    </Section>
  );
}
