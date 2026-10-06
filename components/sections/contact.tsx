import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * One address for the whole studio. Deliberately no form: a static site has
 * nowhere to send one, and a form that silently loses the message is worse
 * than an email address that works.
 */
export function ContactSection({ locale, as = "h2" }: { locale: Locale; as?: "h1" | "h2" }) {
  const t = ui[locale];
  const { org } = getContent(locale);

  return (
    <Section id="contact" className="scroll-mt-20">
      <Stack gap="lg">
        <Stack gap="md">
          <Reveal still>
            <Eyebrow>{t.contact}</Eyebrow>
          </Reveal>
          <Title as={as}>
            <RisingWords>{t.contactTitle}</RisingWords>
          </Title>
          <Reveal delay={0.1}>
            <Text level="lead">{t.contactLead}</Text>
          </Reveal>
        </Stack>
        <Reveal delay={0.18}>
          <Actions>
            <ButtonLink href={`mailto:${org.email}`} size="lg">
              {org.email}
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
          </Actions>
        </Reveal>
      </Stack>
    </Section>
  );
}
