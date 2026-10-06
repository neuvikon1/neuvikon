import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SiteShell } from "@/components/site-shell";
import { Actions, Stack } from "@/components/layout/stack";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { href, ui } from "@/lib/i18n";

export const metadata: Metadata = { title: `404 — ${ui.tr.notFoundTitle}` };

/**
 * The 404, in both languages at once. GitHub Pages serves one `404.html` for
 * every unknown address, whichever language it was under, so this page cannot
 * know which one the reader came from - it says it twice instead of guessing.
 *
 * A *global* not-found because the app has two root layouts and no single one
 * to compose a 404 inside; this file renders the whole document itself, which
 * is why it brings the Turkish shell along.
 */
export default function GlobalNotFound() {
  return (
    <SiteShell locale="tr">
      <Section className="flex flex-1 flex-col justify-center">
        <Stack gap="lg">
          <Stack gap="sm">
            <Eyebrow>404</Eyebrow>
            <Title as="h1" level="display">
              {ui.tr.notFoundTitle}
            </Title>
            <Text level="lead">{ui.tr.notFoundBody}</Text>
            <Text lang="en">
              {ui.en.notFoundTitle} {ui.en.notFoundBody}
            </Text>
          </Stack>
          <Actions>
            <ButtonLink href={href("tr", "home")} size="lg">
              {ui.tr.home}
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
            <ButtonLink href={href("en", "home")} size="lg" variant="outline" lang="en">
              {ui.en.home}
            </ButtonLink>
          </Actions>
        </Stack>
      </Section>
    </SiteShell>
  );
}
