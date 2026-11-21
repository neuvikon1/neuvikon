import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

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
import { ExpandableGrid } from "@/components/sections/expandable-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

/** How many projects a division shows on the home page, at every screen size. */
const HOME_PROJECTS = 9;

/**
 * How many projects a division's own page shows before "show more": two full
 * rows of three on a wide screen.
 */
const PAGE_PROJECTS = 6;

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
    <Card className="h-full py-6 transition-shadow [--card-spacing:--spacing(5)] duration-500 ease-house hover:ring-foreground/20">
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
            <Badge variant="outline" className="h-auto px-3 py-1">{statusLabel[project.status]}</Badge>
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

          {project.pitch ? (
            <Text className="text-muted-foreground/80">{project.pitch}</Text>
          ) : (
            project.description && (
              /* Without a pitch, the page's description is cut short rather
                 than letting one card run far past its neighbours. */
              <Text className="line-clamp-2 text-muted-foreground/80">
                {project.description}
              </Text>
            )
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="h-auto px-3 py-1.5">
                {tag}
              </Badge>
            ))}
          </div>

          {project.links && <ProjectLinks links={project.links} />}
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
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => {
        const content = (
          <>
            <LinkIcon label={link.label} />
            {link.label}
          </>
        );
        return link.href.startsWith("/") ? (
          <ButtonLink key={link.href} href={link.href} variant="outline" size="sm">
            {content}
          </ButtonLink>
        ) : (
          <Button
            key={link.href}
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href={link.href} target="_blank" rel="noreferrer" lang="en" />}
          >
            {content}
          </Button>
        );
      })}
    </div>
  );
}

/**
 * The store's own mark, so the button is recognised before it is read. Store
 * labels are brand names and the same in both languages, which is what makes
 * them safe to match on. Anything else is a site.
 */
function LinkIcon({ label }: { label: string }) {
  if (label === "App Store") {
    return (
      <svg data-icon="inline-start" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    );
  }
  if (label === "Google Play") {
    return (
      <svg data-icon="inline-start" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
      </svg>
    );
  }
  return <Globe data-icon="inline-start" aria-hidden />;
}

/**
 * A division on the home page: its name, its line and up to HOME_PROJECTS of its
 * projects. The way through to its own page only appears when that page has more
 * to show, or when there is nothing to show here.
 *
 * Tighter than a full section, because three of these run back to back.
 */
export function DivisionPreview({ division, locale }: { division: Division; locale: Locale }) {
  const t = ui[locale];
  const all = orderedProjects(division);
  const projects = all.slice(0, HOME_PROJECTS);
  const hasMore = all.length > HOME_PROJECTS;

  return (
    <Section
      id={division.slug}
      inset={false}
      className="scroll-mt-20"
      containerClassName="py-14 md:py-16"
    >
      <Stack gap="lg" className="w-full">
        <div className="flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <Stack gap="sm">
            <DivisionHeading division={division} as="h2" />
            <Reveal delay={0.1}>
              <Text>{division.tagline}</Text>
            </Reveal>
            {projects.length === 0 && (
              <Reveal delay={0.14}>
                <Text>{t.noPublicProjectsBody}</Text>
              </Reveal>
            )}
          </Stack>
          {(hasMore || projects.length === 0) && (
            <Reveal delay={0.16}>
              <ButtonLink href={divisionHref(locale, division.slug)} variant="outline">
                {hasMore ? t.viewAll : t.explore}
                <ArrowRight data-icon="inline-end" />
              </ButtonLink>
            </Reveal>
          )}
        </div>

        {projects.length > 0 && (
          <RevealGroup stagger={0.06} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <RevealCell key={project.name}>
                <ProjectCard project={project} locale={locale} divisionSlug={division.slug} />
              </RevealCell>
            ))}
          </RevealGroup>
        )}
      </Stack>
    </Section>
  );
}

/**
 * A division's own page: what it does, what it can do, and everything it has
 * in flight.
 *
 * Three groups, each arriving on its own cue as it is reached, which is also
 * the order of the argument: the name, then the evidence that the division can
 * do the thing, then the things it is doing.
 */
export function DivisionSection({ division, locale }: { division: Division; locale: Locale }) {
  const t = ui[locale];
  const projects = orderedProjects(division);

  return (
    <Section id={division.slug} className="scroll-mt-20">
      <Stack gap="xl" className="w-full">
        <Stack gap="md">
          <DivisionHeading division={division} as="h1" />
          <Reveal delay={0.1}>
            <Text level="lead">{division.tagline}</Text>
          </Reveal>
          <Reveal delay={0.16}>
            <Text>{division.intro}</Text>
          </Reveal>
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
            <ExpandableGrid
              initial={PAGE_PROJECTS}
              moreLabel={t.showMore}
              lessLabel={t.showLess}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <RevealCell key={project.name}>
                  <ProjectCard project={project} locale={locale} divisionSlug={division.slug} />
                </RevealCell>
              ))}
            </ExpandableGrid>
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
