import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { ButtonLink } from "@/components/ui/button-link";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Text, Title } from "@/components/ui/typography";
import { divisions, org, projectCount } from "@/lib/content";

/** Counted from the content, so the figures cannot drift from the lists below. */
const STATS = [
  { value: String(divisions.length), label: "Divisions" },
  { value: String(projectCount), label: "Projects under way" },
  { value: String(org.year), label: "Founded" },
];

/**
 * Page-opening hero. No top rule - the header's own edge sits above it.
 *
 * The prism backdrop is clipped to this section and sits behind the content;
 * the wrapper owns the stacking context so the shader can't escape it.
 */
export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <Section rule={false} containerClassName="py-24 md:py-36">
        <Stack gap="lg">
          <Stack gap="md">
            <Title as="h1" level="display">
              Software, games and robotics.
            </Title>
            <Text level="lead">{org.description}</Text>
          </Stack>

          <Actions>
            <ButtonLink href="#divisions" size="lg">
              Explore the divisions
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
            <ButtonLink
              href={`mailto:${org.email}`}
              size="lg"
              variant="outline"
            >
              {org.email}
            </ButtonLink>
          </Actions>
          <StatGroup>
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </StatGroup>
        </Stack>
      </Section>
    </div>
  );
}
