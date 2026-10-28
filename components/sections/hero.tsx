import { ArrowRight } from "lucide-react";

import { SignedWordmark } from "@/components/brand/logo";
import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * The first screen, in order of arrival.
 *
 * Nothing here waits to be scrolled to - it is all already on screen - so the
 * sequence is held by hand instead: the signature writes itself, the statement
 * rises word by word, and the supporting line and the buttons follow it up.
 */
const CUE = {
  lead: 0.42,
  actions: 0.56,
};

/**
 * Page-opening hero, one screen tall, and the only section with no frame of
 * its own: no top rule, because the header's edge already sits above it, and
 * no rails, so the grid starts below it.
 *
 * The copy keeps to the left seven columns. The right of the screen belongs
 * to the point cloud behind the page (`ScrollScene`), which opens as the
 * signature's N and becomes each division further down - so the first screen
 * has one large thing on each side: the statement and the mark.
 *
 * The height is `100svh` less the header rather than `100vh`: on mobile the
 * large viewport unit would hide the actions behind the browser chrome.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org } = getContent(locale);
  return (
    <Section
      rails={false}
      rule={false}
      inset={false}
      className="flex min-h-[calc(100svh-var(--header-h))] flex-col"
      containerClassName="flex flex-1 flex-col"
    >
      <div className="grid w-full flex-1 content-center gap-12 py-16 lg:grid-cols-12">
        <Stack gap="lg" className="lg:col-span-7">
          {/* The signature, writing itself as the page opens. The size rides
              the viewport; the inline height SignedWordmark sets is only its
              default. */}
          <SignedWordmark className="!h-[clamp(4rem,9vw,7rem)] -ml-1" />
          <Stack gap="md">
            <Title as="h1" level="display">
              <RisingWords inView={false}>{org.tagline}</RisingWords>
            </Title>
            <Reveal inView={false} delay={CUE.lead}>
              <Text level="lead">{org.description}</Text>
            </Reveal>
          </Stack>

          <Reveal inView={false} delay={CUE.actions}>
            <Actions>
              <ButtonLink href="#divisions" size="lg">
                {t.exploreDivisions}
                <ArrowRight data-icon="inline-end" />
              </ButtonLink>
              <ButtonLink href={`mailto:${org.email}`} size="lg" variant="outline">
                {org.email}
              </ButtonLink>
            </Actions>
          </Reveal>
        </Stack>
      </div>
    </Section>
  );
}
