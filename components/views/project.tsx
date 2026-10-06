import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { Reveal, RevealCell, RevealGroup } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { ProjectCard, ProjectLinks } from "@/components/sections/division";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { asset, getContent, orderedProjects, type Division, type Project } from "@/lib/content";
import { divisionHref, href, ui, type Locale } from "@/lib/i18n";

/**
 * One project's own page: what it is, what it looks like from inside, and
 * the rest of its division.
 *
 * Most projects have no screenshots yet. The page says so instead of
 * borrowing an image from somewhere else - adding a line to the project's
 * `media` in the content files is all it takes to fill it.
 */
export function ProjectView({
  locale,
  division,
  project,
}: {
  locale: Locale;
  division: Division;
  project: Project;
}) {
  const t = ui[locale];
  const { statusLabel } = getContent(locale);
  const others = orderedProjects(division).filter((p) => p.name !== project.name);

  return (
    <>
      <Section className="scroll-mt-20">
        <Stack gap="lg" className="w-full">
          <Reveal still inView={false}>
            <Link
              href={divisionHref(locale, division.slug)}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              <span lang="en">{t.backToDivision(division.name)}</span>
            </Link>
          </Reveal>

          <div className="flex w-full flex-wrap items-center gap-6">
            {project.image && (
              <Reveal inView={false}>
                <Image
                  src={asset(project.image)}
                  alt=""
                  width={192}
                  height={192}
                  priority
                  className="size-24 rounded-[22%] object-cover ring-1 ring-foreground/10 md:size-28"
                />
              </Reveal>
            )}
            <Stack gap="xs">
              <Badge variant="outline">{statusLabel[project.status]}</Badge>
              <Title as="h1" level="display" lang="en">
                <RisingWords inView={false}>{project.name}</RisingWords>
              </Title>
            </Stack>
          </div>

          <Reveal inView={false} delay={0.3}>
            <Stack gap="sm">
              <Text level="lead">{project.tagline}</Text>
              {project.description && <Text>{project.description}</Text>}
            </Stack>
          </Reveal>

          <Reveal inView={false} delay={0.4}>
            <Stack gap="sm">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.links && <ProjectLinks links={project.links} className="text-sm" />}
            </Stack>
          </Reveal>
        </Stack>
      </Section>

      <Section>
        <Stack gap="sm" className="w-full">
          <Reveal still>
            <Eyebrow>{t.media}</Eyebrow>
          </Reveal>
          {project.media && project.media.length > 0 ? (
            <RevealGroup stagger={0.06} className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.media.map((media) => (
                <RevealCell key={media.src}>
                  <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
                    {media.kind === "video" ? (
                      /* No autoplay: six clips running at once is noise, and
                         on a phone it is someone's data plan. */
                      <video
                        src={asset(media.src)}
                        poster={media.poster && asset(media.poster)}
                        aria-label={media.alt}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-auto w-full"
                      />
                    ) : (
                      <Image
                        src={asset(media.src)}
                        alt={media.alt ?? ""}
                        width={1080}
                        height={1920}
                        className="h-auto w-full"
                      />
                    )}
                  </div>
                </RevealCell>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="w-full">
              <Text>{t.mediaPending}</Text>
            </Reveal>
          )}
        </Stack>
      </Section>

      {others.length > 0 && (
        <Section>
          <Stack gap="lg" className="w-full">
            <Stack gap="sm" className="w-full">
              <Reveal still>
                <Eyebrow>{t.otherProjects}</Eyebrow>
              </Reveal>
              <RevealGroup stagger={0.06} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
                {others.map((other) => (
                  <RevealCell key={other.name}>
                    <ProjectCard project={other} locale={locale} divisionSlug={division.slug} />
                  </RevealCell>
                ))}
              </RevealGroup>
            </Stack>
            <Reveal>
              <Actions>
                <ButtonLink href={href(locale, "contact")} size="lg">
                  {t.getInTouch}
                  <ArrowRight data-icon="inline-end" />
                </ButtonLink>
              </Actions>
            </Reveal>
          </Stack>
        </Section>
      )}
    </>
  );
}
