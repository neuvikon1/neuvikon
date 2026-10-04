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
          <Title>
            <RisingWords>{division.name}</RisingWords>
          </Title>
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
             division, which is staffed and shipping internally. */
          <Reveal>
            <Text>
              Nothing public from this division yet — the work is at prototype
              stage. Write to us if it is the part you care about.
            </Text>
          </Reveal>
        )}
      </Stack>
    </Section>
  );
}
