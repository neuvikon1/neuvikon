import Image from "next/image";

import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import {
  Reveal,
  RevealCell,
  RevealGroup,
  RevealItem,
  RevealRow,
} from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { statusLabel, type Division, type Project } from "@/lib/content";
import { divisionLogos } from "@/lib/division-logos";

/**
 * One project. The icon is the app's own square icon, so it is sized as a
 * mark rather than stretched across the card.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
      <CardContent>
        <Stack gap="sm">
          <div className="flex w-full items-start justify-between gap-3">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                width={96}
                height={96}
                /* The icon is the only thing on the card that reacts to the
                   pointer: a mark lifting slightly out of its own ring. */
                className="size-11 rounded-lg object-cover ring-1 ring-foreground/10 transition-transform duration-500 ease-house group-hover/card:scale-[1.06]"
              />
            ) : (
              /* No icon yet - hold the row height so cards stay aligned. */
              <span aria-hidden className="size-11 rounded-lg bg-muted" />
            )}
            <Badge variant="outline">{statusLabel[project.status]}</Badge>
          </div>

          <Stack gap="xs">
            <Title as="h4" level="sub" className="text-base leading-snug">
              {project.name}
            </Title>
            <Text>{project.tagline}</Text>
          </Stack>

          {project.description && (
            <Text className="text-muted-foreground/80">
              {project.description}
            </Text>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {project.links && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline underline-offset-4 hover:no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * The division's name at the top of its section.
 *
 * Where there is a lockup it *is* the heading - the artwork already says
 * "Neuvikon Games", and setting the text beside it would be the name twice.
 * The alt text carries the name instead, so the heading reads the same to a
 * screen reader either way.
 *
 * Width rather than height: the two lockups have different proportions, and
 * matching their heights would print Robotics - the lighter, outline-drawn
 * one - noticeably wider than Games. Held to a common width they sit at the
 * same weight down the page.
 */
function DivisionHeading({ division }: { division: Division }) {
  const logo = divisionLogos[division.slug];

  if (!logo) {
    return (
      <Title>
        <RisingWords>{division.name}</RisingWords>
      </Title>
    );
  }

  return (
    <Reveal>
      {/* h2, matching what Title renders for the text branch - the two
          headings have to sit at the same level in the outline.

          The width is a definite length, not a percentage. The Stack above is
          `items-start`, so this sits in a shrink-to-fit box: a percentage
          would have nothing to resolve against, collapse to zero, and then
          the lazy image inside could never intersect the viewport to load -
          leaving the heading permanently blank. */}
      <h2 className="w-[22rem] max-w-full">
        {/* The name lives on the heading, not on either image. Only one ink
            version is displayed at a time and the other is `display: none`,
            so an alt on the images would leave the heading nameless in
            whichever theme hid the one carrying it. */}
        <span className="sr-only">{division.name}</span>
        <Image
          src={logo.light}
          alt=""
          aria-hidden
          className="block h-auto w-full dark:hidden"
        />
        <Image
          src={logo.dark}
          alt=""
          aria-hidden
          className="hidden h-auto w-full dark:block"
        />
      </h2>
    </Reveal>
  );
}

/**
 * A division: what it does, what it can do, and everything it has in flight.
 * One of these per record in `divisions`.
 *
 * Three groups, each arriving on its own cue as it is reached, which is also
 * the order of the argument: the name, then the evidence that the division can
 * do the thing, then the things it is doing.
 */
export function DivisionSection({ division }: { division: Division }) {
  return (
    <Section id={division.slug} className="scroll-mt-20">
      <Stack gap="xl" className="w-full">
        <Stack gap="md">
          <Reveal still>
            <Eyebrow>{division.short}</Eyebrow>
          </Reveal>
          <DivisionHeading division={division} />
          <Reveal delay={0.1}>
            <Text level="lead">{division.tagline}</Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Text>{division.intro}</Text>
          </Reveal>
        </Stack>

        <RevealGroup stagger={0.05} className="w-full">
          <Stack gap="sm" className="w-full">
            <RevealItem still>
              <Eyebrow>Capabilities</Eyebrow>
            </RevealItem>
            <ul className="grid w-full gap-x-10 gap-y-2 md:grid-cols-2">
              {division.capabilities.map((capability) => (
                <RevealRow
                  key={capability}
                  className="border-t border-rule py-2 text-sm text-muted-foreground"
                >
                  {capability}
                </RevealRow>
              ))}
            </ul>
          </Stack>
        </RevealGroup>

        {division.projects.length > 0 ? (
          <Stack gap="sm" className="w-full">
            <Reveal still>
              <Eyebrow>
                {division.projects.length} project
                {division.projects.length === 1 ? "" : "s"}
              </Eyebrow>
            </Reveal>
            <RevealGroup
              stagger={0.06}
              className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {division.projects.map((project) => (
                <RevealCell key={project.name}>
                  <ProjectCard project={project} />
                </RevealCell>
              ))}
            </RevealGroup>
          </Stack>
        ) : (
          /* Robotics has no public project yet; say so rather than hide the
             division, which is staffed and shipping internally. The notice
             sits in the same card the projects would have filled, so the
             section keeps the ruled edge every other division has. */
          <Stack gap="sm" className="w-full">
            <Reveal still>
              <Eyebrow>No public projects</Eyebrow>
            </Reveal>
            <Reveal className="w-full">
              <Card>
                <CardContent>
                  <Text>
                    Nothing public from this division yet — the work is at
                    prototype stage. Write to us if it is the part you care
                    about.
                  </Text>
                </CardContent>
              </Card>
            </Reveal>
          </Stack>
        )}
      </Stack>
    </Section>
  );
}
