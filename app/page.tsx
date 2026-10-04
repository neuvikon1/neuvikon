import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { DivisionSection } from "@/components/sections/division";
import { Hero } from "@/components/sections/hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { about, careers, divisions, org } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="divisions" className="scroll-mt-20">
        <Stack gap="lg" className="w-full">
          <Stack gap="md">
            <Eyebrow>Divisions</Eyebrow>
            <Title>Three divisions, one studio.</Title>
            <Text level="lead">{about.lead}</Text>
          </Stack>

          <div className="grid w-full gap-4 md:grid-cols-3">
            {divisions.map((division) => (
              <Card key={division.slug}>
                <CardContent>
                  <Stack gap="sm">
                    <Eyebrow>{division.short}</Eyebrow>
                    <Title as="h3" level="sub" className="text-xl">
                      {division.name}
                    </Title>
                    <Text>{division.tagline}</Text>
                    <a
                      href={`#${division.slug}`}
                      className="text-xs underline underline-offset-4 hover:no-underline"
                    >
                      {division.projects.length > 0
                        ? `${division.projects.length} projects`
                        : "In prototype"}
                    </a>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Section>

      {divisions.map((division) => (
        <DivisionSection key={division.slug} division={division} />
      ))}

      <Section id="studio" className="scroll-mt-20">
        <Stack gap="xl" className="w-full">
          <Stack gap="md">
            <Eyebrow>Studio</Eyebrow>
            <Title>How we work.</Title>
          </Stack>

          <div className="grid w-full gap-4 md:grid-cols-2">
            {about.principles.map((principle) => (
              <Card key={principle.title}>
                <CardContent>
                  <Stack gap="xs">
                    <Title as="h3" level="sub" className="text-base">
                      {principle.title}
                    </Title>
                    <Text>{principle.body}</Text>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>

          <Stack gap="lg" className="w-full">
            <StatGroup className="max-w-none md:grid-cols-4">
              {about.facts.map((fact) => (
                <Stat key={fact.label} value={fact.value} label={fact.label} />
              ))}
            </StatGroup>

            <Stack gap="sm" className="w-full">
              <Eyebrow>Team</Eyebrow>
              {/* No titles: in a studio this size everyone does several jobs. */}
              <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {about.team.map((person) => (
                  <li key={person}>{person}</li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </Stack>
      </Section>

      <Section id="careers" className="scroll-mt-20">
        <Stack gap="lg" className="w-full">
          <Stack gap="md">
            <Eyebrow>Careers</Eyebrow>
            <Title>
              {careers.openings.length > 0
                ? "Open positions."
                : "No open positions — write anyway."}
            </Title>
            <Text level="lead">{careers.lead}</Text>
          </Stack>

          <Stack gap="sm" className="w-full">
            <Eyebrow>What we would read first</Eyebrow>
            <ul className="grid w-full gap-x-10 gap-y-2 md:grid-cols-2">
              {careers.interests.map((interest) => (
                <li
                  key={interest}
                  className="border-t border-rule py-2 text-sm text-muted-foreground"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Stack>
        </Stack>
      </Section>

      <Section id="contact" className="scroll-mt-20">
        <Stack gap="lg">
          <Stack gap="md">
            <Eyebrow>Contact</Eyebrow>
            <Title>Tell us what you are building.</Title>
            <Text level="lead">
              One studio, three divisions, and a single address for all of
              them. We read everything that arrives.
            </Text>
          </Stack>
          <Actions>
            <ButtonLink href={`mailto:${org.email}`} size="lg">
              {org.email}
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
          </Actions>
        </Stack>
      </Section>
    </>
  );
}
