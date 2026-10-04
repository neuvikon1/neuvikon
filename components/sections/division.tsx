import Image from "next/image";

import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
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
    <Card>
      <CardContent>
        <Stack gap="sm">
          <div className="flex w-full items-start justify-between gap-3">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                width={96}
                height={96}
                className="size-11 rounded-lg object-cover ring-1 ring-foreground/10"
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
 */
export function DivisionSection({ division }: { division: Division }) {
  return (
    <Section id={division.slug} className="scroll-mt-20">
      <Stack gap="xl" className="w-full">
        <Stack gap="md">
          <Eyebrow>{division.short}</Eyebrow>
          <Title>{division.name}</Title>
          <Text level="lead">{division.tagline}</Text>
          <Text>{division.intro}</Text>
        </Stack>

        <Stack gap="sm" className="w-full">
          <Eyebrow>Capabilities</Eyebrow>
          <ul className="grid w-full gap-x-10 gap-y-2 md:grid-cols-2">
            {division.capabilities.map((capability) => (
              <li
                key={capability}
                className="border-t border-rule py-2 text-sm text-muted-foreground"
              >
                {capability}
              </li>
            ))}
          </ul>
        </Stack>

        {division.projects.length > 0 ? (
          <Stack gap="sm" className="w-full">
            <Eyebrow>
              {division.projects.length} project
              {division.projects.length === 1 ? "" : "s"}
            </Eyebrow>
            <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
              {division.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </Stack>
        ) : (
          /* Robotics has no public project yet; say so rather than hide the
             division, which is staffed and shipping internally. */
          <Text>
            Nothing public from this division yet — the work is at prototype
            stage. Write to us if it is the part you care about.
          </Text>
        )}
      </Stack>
    </Section>
  );
}
