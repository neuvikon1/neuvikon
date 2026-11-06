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
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import {
  asset,
  getContent,
  orderedProjects,
  projectCover,
  type Division,
  type Project,
} from "@/lib/content";
import { divisionHref, projectHref, ui, type Locale } from "@/lib/i18n";
import { GamesLogo } from "@/components/brand/games-logo";
import { RoboticsLogo } from "@/components/brand/robotics-logo";
import { TechLogo } from "@/components/brand/tech-logo";
import { cn } from "@/lib/utils";

/** The widths a card renders at: one column on a phone, two, then three. */
const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

/** How many projects a division shows on the home page. */
const HOME_PROJECTS = 3;

/**
 * The cover for a project with nothing to show yet. Its icon, large, over a
 * wash of its own colours, so the card keeps the same weight as its neighbours
 * and nothing is borrowed from another project. A project with no icon either
 * gets its initial.
 */
function CoverFallback({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <span
        aria-hidden
        lang="en"
        className="absolute inset-0 grid place-items-center text-6xl tracking-tight text-muted-foreground"
      >
        {project.name.charAt(0)}
      </span>
    );
  }
  const icon = asset(project.image);
  return (
    <>
      <Image
        src={icon}
        alt=""
        fill
        sizes={CARD_SIZES}
        className="scale-125 object-cover opacity-50 blur-2xl"
      />
      <span className="absolute inset-0 grid place-items-center">
        <Image
          src={icon}
          alt=""
          width={192}
          height={192}
          className="size-20 rounded-[22%] object-cover ring-1 ring-foreground/10 transition-transform duration-700 ease-house group-hover/card:scale-[1.04]"
        />
      </span>
    </>
  );
}

/**
 * One project, led by a picture: its cover, icon, name, one line and status.
 * What it is in detail, its tags and its store links are on its own page, which
 * the whole card opens: the name's link is stretched over the card, so there is
 * one link to tab to and read out rather than a link for every part of it.
 *
 * Most covers are phone screenshots in a landscape frame. They are held at
 * the top, where a screen keeps its title; a wide capture is simply centred.
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
  const cover = projectCover(project);

  return (
    <Card className="relative h-full pt-0 transition-shadow duration-500 ease-house hover:ring-foreground/20 has-focus-visible:ring-2 has-focus-visible:ring-ring">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={asset(cover.src)}
            alt=""
            fill
            sizes={CARD_SIZES}
            className={cn(
              "object-cover transition-transform duration-700 ease-house group-hover/card:scale-[1.03]",
              cover.wide ? "object-center" : "object-top",
            )}
          />
        ) : (
          <CoverFallback project={project} />
        )}
        <Badge variant="outline" className="absolute right-3 bottom-3 bg-background/85">
          {statusLabel[project.status]}
        </Badge>
      </div>

      <CardContent>
        <div className="flex w-full items-start gap-3">
          {/* The fallback cover is already the icon; once is enough. */}
          {cover && project.image && (
            <Image
              src={asset(project.image)}
              alt=""
              width={96}
              height={96}
              className="size-11 shrink-0 rounded-lg object-cover ring-1 ring-foreground/10"
            />
          )}
          <Stack gap="xs" className="min-w-0">
            <Title as="h3" level="sub" className="text-base leading-snug" lang="en">
              <Link
                href={projectHref(locale, divisionSlug, project.name)}
                className="underline-offset-4 outline-none group-hover/card:underline after:absolute after:inset-0"
              >
                {project.name}
              </Link>
            </Title>
            <Text className="text-sm">{project.tagline}</Text>
          </Stack>
        </div>
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
 * A division on the home page: its name, its line and its leading projects,
 * with the way through to the rest. The division's own page is where the intro
 * and the full list live.
 *
 * Tighter than a full section, because three of these run back to back. Below
 * `lg` the grid has one or two columns, so the third project is dropped: on two
 * it would sit alone on a row, and on a phone it is another screen of scrolling.
 */
export function DivisionPreview({ division, locale }: { division: Division; locale: Locale }) {
  const t = ui[locale];
  const projects = orderedProjects(division).slice(0, HOME_PROJECTS);

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
          <Reveal delay={0.16}>
            <ButtonLink href={divisionHref(locale, division.slug)} variant="outline">
              {projects.length > 0 ? t.viewAll : t.explore}
              <ArrowRight data-icon="inline-end" />
            </ButtonLink>
          </Reveal>
        </div>

        {projects.length > 0 && (
          <RevealGroup stagger={0.06} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <RevealCell key={project.name} className={cn(index >= 2 && "hidden lg:block")}>
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
            <RevealGroup stagger={0.06} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <RevealCell key={project.name}>
                  <ProjectCard project={project} locale={locale} divisionSlug={division.slug} />
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
