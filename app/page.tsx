import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import {
  Reveal,
  RevealCell,
  RevealGroup,
  RevealItem,
  RevealRow,
} from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
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
            <Reveal still>
              <Eyebrow>Divisions</Eyebrow>
            </Reveal>
            <Title>
              <RisingWords>Three divisions, one studio.</RisingWords>
            </Title>
            <Reveal delay={0.1}>
              <Text level="lead">{about.lead}</Text>
            </Reveal>
          </Stack>

          <RevealGroup className="grid w-full gap-4 md:grid-cols-3">
            {divisions.map((division) => (
              <RevealCell key={division.slug}>
                <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
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
              </RevealCell>
            ))}
          </RevealGroup>
        </Stack>
      </Section>

      {divisions.map((division) => (
        <DivisionSection key={division.slug} division={division} />
      ))}

      <Section id="studio" className="scroll-mt-20">
        <Stack gap="xl" className="w-full">
          <Stack gap="md">
            <Reveal still>
              <Eyebrow>Studio</Eyebrow>
            </Reveal>
            <Title>
              <RisingWords>How we work.</RisingWords>
            </Title>
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
                  <Eyebrow>Team</Eyebrow>
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

      <Section id="careers" className="scroll-mt-20">
        <Stack gap="lg" className="w-full">
          <Stack gap="md">
            <Reveal still>
              <Eyebrow>Careers</Eyebrow>
            </Reveal>
            <Title>
              <RisingWords>
                {careers.openings.length > 0
                  ? "Open positions."
                  : "No open positions — write anyway."}
              </RisingWords>
            </Title>
            <Reveal delay={0.1}>
              <Text level="lead">{careers.lead}</Text>
            </Reveal>
          </Stack>

          <RevealGroup stagger={0.05} className="w-full">
            <Stack gap="sm" className="w-full">
              <RevealItem still>
                <Eyebrow>What we would read first</Eyebrow>
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

      <Section id="contact" className="scroll-mt-20">
        <Stack gap="lg">
          <Stack gap="md">
            <Reveal still>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Title>
              <RisingWords>Tell us what you are building.</RisingWords>
            </Title>
            <Reveal delay={0.1}>
              <Text level="lead">
                One studio, three divisions, and a single address for all of
                them. We read everything that arrives.
              </Text>
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
    </>
  );
}
