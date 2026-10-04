import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, RevealGroup, RevealRow } from "@/components/motion/reveal";
import { RisingWords } from "@/components/motion/rising-words";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { ButtonLink } from "@/components/ui/button-link";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { divisions, org, projectCount } from "@/lib/content";

/** Counted from the content, so the figures cannot drift from the lists below. */
const STATS = [
  { value: divisions.length, label: "Divisions" },
  { value: projectCount, label: "Projects under way" },
  { value: org.year, label: "Founded" },
];

/**
 * The first screen, in order of arrival.
 *
 * Nothing here waits to be scrolled to - it is all already on screen - so the
 * sequence is held by hand instead: the statement rises word by word, the
 * supporting line and the buttons follow it up, the index comes in beside them,
 * and the figures land last, on the floor of the screen. Read top-left to
 * bottom-right, which is the order the page wants to be read in anyway.
 *
 * The numbers are the one thing that moves on its own after it has arrived, and
 * the delay here is what buys that: the roll starts while the row is still
 * fading up, so no figure is ever seen sitting still before it counts.
 */
const CUE = {
  lead: 0.42,
  actions: 0.56,
  index: 0.5,
  floor: 0.78,
};

/**
 * The three divisions as a numbered index, opposite the statement.
 *
 * It earns the right half of the screen that a lone headline would leave
 * empty, and it is the page's table of contents: the primary call to action
 * scrolls to the divisions, these jump straight into one.
 */
function DivisionIndex() {
  return (
    <Stack gap="sm" className="w-full">
      <Eyebrow>Divisions</Eyebrow>
      <RevealGroup inView={false} delay={CUE.index} className="w-full">
        <ul className="w-full">
          {divisions.map((division, index) => (
            <RevealRow key={division.slug} className="border-t border-rule">
              <a
                href={`#${division.slug}`}
                className="group flex items-baseline gap-4 py-4 transition-colors hover:text-foreground"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base tracking-tight">
                    {division.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {division.tagline}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </a>
            </RevealRow>
          ))}
        </ul>
      </RevealGroup>
    </Stack>
  );
}

/**
 * Where the first screen ends. Everything below the fold starts at the rule
 * under the hero, so the next section announces itself by its own top edge.
 */
function ScrollCue() {
  return (
    <a
      href="#divisions"
      className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground md:flex"
    >
      Scroll
      <ArrowDown
        aria-hidden
        className="size-3.5 motion-safe:animate-hero-cue"
      />
    </a>
  );
}

/**
 * Page-opening hero, one screen tall, and the only section with no frame of
 * its own: no top rule, because the header's edge already sits above it, and
 * no rails, so the grid starts at the divisions. The first screen is the
 * statement; the ruled grid is what the page turns into below it.
 *
 * The height is `100svh` less the header rather than `100vh`: on mobile the
 * large viewport unit would hide the stat row behind the browser chrome, and
 * the whole point of that row is that it is readable without scrolling.
 *
 * Two bands inside the container. The statement band takes all the slack and
 * centres its content in it, so the title sits optically mid-screen at any
 * window height; the stat band is pinned to the bottom above its own hairline,
 * which lands just above the fold and reads as the floor of the first screen.
 *
 * The prism backdrop is clipped to this section and sits behind the content;
 * the wrapper owns the stacking context so the shader can't escape it.
 */
export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <Section
        rails={false}
        rule={false}
        inset={false}
        className="flex min-h-[calc(100svh-var(--header-h))] flex-col"
        containerClassName="flex flex-1 flex-col"
      >
        {/* The padding here is only a floor. This band takes the slack and
            centres in it, so on a tall window the space above and below the
            content is set by the centring, not by this number - it matters
            only on a short one, where it is what keeps the headline off the
            stat rule. */}
        <div className="grid w-full flex-1 content-center gap-12 py-10 lg:grid-cols-12 lg:gap-16">
          <Stack gap="lg" className="lg:col-span-7">
            <Stack gap="md">
              <Title as="h1" level="display">
                <RisingWords inView={false}>{org.tagline}</RisingWords>
              </Title>
              <Reveal inView={false} delay={CUE.lead}>
                <Text level="lead">{org.description}</Text>
              </Reveal>
            </Stack>

            <Reveal inView={false} delay={CUE.actions}>
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
            </Reveal>
          </Stack>

          {/* Bottom-aligned, so the index hangs off the same optical baseline
              as the actions rather than floating beside the headline. */}
          <div className="lg:col-span-5 lg:self-end">
            <DivisionIndex />
          </div>
        </div>

        <Reveal
          inView={false}
          delay={CUE.floor}
          still
          className="flex w-full items-end justify-between gap-6 border-t border-rule py-6"
        >
          {/* Three across at every width. The default two-column wrap costs a
              second row, and this band only works if it clears the fold. */}
          <StatGroup className="max-w-none grid-cols-3 gap-4 md:gap-8">
            {STATS.map((stat) => (
              <Stat
                key={stat.label}
                value={
                  <span className="tabular-nums">
                    <CountUp to={stat.value} />
                  </span>
                }
                label={stat.label}
              />
            ))}
          </StatGroup>
          <ScrollCue />
        </Reveal>
      </Section>
    </div>
  );
}
