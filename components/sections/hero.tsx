import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { ButtonLink } from "@/components/ui/button-link";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Eyebrow, Text, Title } from "@/components/ui/typography";

const STATS = [
  { value: "99.99%", label: "Platform uptime" },
  { value: "SOC 2", label: "Type II certified" },
  { value: "40+", label: "Enterprise deployments" },
];

/**
 * Page-opening hero. No top rule - the header's own edge sits above it.
 */
export function Hero() {
  return (
    <Section rule={false} containerClassName="py-24 md:py-36">
      <Stack gap="lg">
        <Stack gap="md">
          <Eyebrow>Neuvikon</Eyebrow>
          <Title as="h1" level="display">
            Intelligent systems, built to be trusted.
          </Title>
          <Text level="lead">
            Neuvikon helps teams design, evaluate, and operate AI products with
            the rigor production demands — one platform for testing, guardrails,
            and workflows, from first prototype to enterprise scale.
          </Text>
        </Stack>

        <Actions>
          <ButtonLink href="/contact" size="lg">
            Talk to our team
            <ArrowRight data-icon="inline-end" />
          </ButtonLink>
          <ButtonLink href="/platform" size="lg" variant="outline">
            Explore the platform
          </ButtonLink>
        </Actions>

        <StatGroup>
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </StatGroup>
      </Stack>
    </Section>
  );
}
