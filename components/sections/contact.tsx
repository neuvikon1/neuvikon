import { ArrowRight } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { getContent } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";

/**
 * One address for the whole studio, and a form that writes to it without
 * leaving the page. The address stays visible either way: some people would
 * rather use their own mail client, and it is the fallback if the form's
 * service is ever down. See `ContactForm` for where the form sends.
 */
const HAS_FORM = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

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
        {HAS_FORM && (
          <Reveal delay={0.18} className="w-full">
            <ContactForm locale={locale} email={org.email} />
          </Reveal>
        )}
        <Reveal delay={0.24}>
          {HAS_FORM && <Text className="mb-3">{t.formOr}</Text>}
          <Actions>
            <ButtonLink href={`mailto:${org.email}`} size="lg" variant={HAS_FORM ? "outline" : "default"}>
              {org.email}
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
          </Actions>
        </Reveal>
      </Stack>
    </Section>
  );
}
