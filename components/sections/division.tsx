import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
import { ProjectGrid } from "@/components/sections/project-grid";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import {
  asset,
  getContent,
  orderedProjects,
  type Division,
  type Project,
} from "@/lib/content";
import { divisionHref, projectHref, ui, type Locale } from "@/lib/i18n";
import { GamesLogo } from "@/components/brand/games-logo";
import { RoboticsLogo } from "@/components/brand/robotics-logo";
import { TechLogo } from "@/components/brand/tech-logo";
import { cn } from "@/lib/utils";

/**
 * One project. The icon is the app's own square icon, so it is sized as a
 * mark rather than stretched across the card.
 *
 * The name links to the project's own page. Store and site links stay as
 * separate links beside it, so the card is not one giant link with smaller
 * links nested inside it.
 */
export function ProjectCard({
  project,
  locale,
  divisionSlug,
}: {
  project: Project;
  locale: Locale;
  divisionSlug: string;
}) {
  const { statusLabel } = getContent(locale);
  return (
    <Card className="h-full transition-shadow duration-500 ease-house hover:ring-foreground/20">
      <CardContent>
        <Stack gap="sm">
          <div className="flex w-full items-start justify-between gap-3">
            {project.image ? (
              <Image
                src={asset(project.image)}
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
            <Title as="h3" level="sub" className="text-base leading-snug" lang="en">
              <Link
                href={projectHref(locale, divisionSlug, project.name)}
                className="underline-offset-4 hover:underline"
              >
                {project.name}
              </Link>
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

          {project.links && <ProjectLinks links={project.links} className="text-xs" />}
        </Stack>
      </CardContent>
    </Card>
  );
}

/** Division lockups, each with its own entrance. A division without one keeps its text heading. */
const LOCKUPS: Partial<Record<string, () => React.ReactNode>> = {
  games: GamesLogo,
  robotics: RoboticsLogo,
  tech: TechLogo,
};

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
function DivisionHeading({ division, as }: { division: Division; as: "h1" | "h2" }) {
  const Lockup = LOCKUPS[division.slug];
  const Heading = as;

  if (!Lockup) {
    return (
      <Title as={as} lang="en">
        <RisingWords>{division.name}</RisingWords>
      </Title>
    );
  }

  // h2, matching what Title renders for the text branch: the two headings have
  // to sit at the same level in the outline. The width is a definite length,
  // not a percentage: the Stack above is `items-start`, so a percentage would
  // have nothing to resolve against and the heading would collapse to zero.
  return (
    <Heading className="w-[22rem] max-w-full">
      {/* The name lives on the heading: the lockup itself is decorative. */}
      <span className="sr-only">{division.name}</span>
      <Lockup />
    </Heading>
  );
}

/**
 * Store pages, live sites and the like. A link on this site (a privacy
 * policy) stays in the tab; anything leaving the site opens beside it.
 */
export function ProjectLinks({
  links,
  className,
}: {
  links: NonNullable<Project["links"]>;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1", className)}>
      {links.map((link) =>
        link.href.startsWith("/") ? (
          <Link
            key={link.href}
            href={link.href}
            className="underline underline-offset-4 hover:no-underline"
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            lang="en"
            className="underline underline-offset-4 hover:no-underline"
          >
            {link.label}
          </a>
        ),
      )}
    </div>
  );
}

/**
 * A division: what it does, what it can do, and everything it has in flight.
 * On the home page there is one of these per record in `divisions`; on the
 * division's own page it is the page, with the name as its `h1`.
 *
 * Three groups, each arriving on its own cue as it is reached, which is also
 * the order of the argument: the name, then the evidence that the division can
 * do the thing, then the things it is doing.
 *
 * Featured projects lead and take two columns of the grid.
 */
export function DivisionSection({
  division,
  locale,
  as = "h2",
}: {
  division: Division;
  locale: Locale;
  as?: "h1" | "h2";
}) {
  const t = ui[locale];
  const projects = orderedProjects(division);

  return (
    <Section id={division.slug} className="scroll-mt-20">
      <Stack gap="xl" className="w-full">
        <Stack gap="md">
          <DivisionHeading division={division} as={as} />
          <Reveal delay={0.1}>
            <Text level="lead">{division.tagline}</Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Text>{division.intro}</Text>
          </Reveal>
          {as === "h2" && (
            <Reveal delay={0.2}>
              <ButtonLink href={divisionHref(locale, division.slug)} variant="outline">
                {t.explore}
                <ArrowRight data-icon="inline-end" />
              </ButtonLink>
            </Reveal>
          )}
        </Stack>

        {division.capabilities.length > 0 && (
          <RevealGroup stagger={0.05} className="w-full">
            <Stack gap="sm" className="w-full">
              <RevealItem still>
                <Eyebrow>{t.capabilities}</Eyebrow>
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
        )}

        {projects.length > 0 ? (
          <Stack gap="sm" className="w-full">
            <Reveal still>
              <Eyebrow>{t.projectCount(projects.length)}</Eyebrow>
            </Reveal>
            {/* On the home page a long division shows six and keeps the rest
                behind a button; its own page lists everything. */}
            <ProjectGrid
              limit={as === "h2" ? 6 : undefined}
              moreLabel={t.viewMore(projects.length - 6)}
              lessLabel={t.viewLess}
              className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <RevealCell
                  key={project.name}
                  className={cn(project.featured && "md:col-span-2")}
                >
                  <ProjectCard project={project} locale={locale} divisionSlug={division.slug} />
                </RevealCell>
              ))}
            </ProjectGrid>
          </Stack>
        ) : (
          /* Robotics has no public project yet; say so rather than hide the
             division, which is staffed and shipping internally. The notice
             sits in the same card the projects would have filled, so the
             section keeps the ruled edge every other division has. */
          <Stack gap="sm" className="w-full">
            <Reveal still>
              <Eyebrow>{t.noPublicProjects}</Eyebrow>
            </Reveal>
            <Reveal className="w-full">
              <Card>
                <CardContent>
                  <Text>{t.noPublicProjectsBody}</Text>
                </CardContent>
              </Card>
            </Reveal>
          </Stack>
        )}
      </Stack>
    </Section>
  );
}
