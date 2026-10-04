import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Actions, Stack } from "@/components/layout/stack";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { ButtonLink } from "@/components/ui/button-link";
import { Stat, StatGroup } from "@/components/ui/stat";
import { Eyebrow, Text, Title } from "@/components/ui/typography";
import { divisions, org, projectCount } from "@/lib/content";

/** Counted from the content, so the figures cannot drift from the lists below. */
const STATS = [
  { value: String(divisions.length), label: "Divisions" },
  { value: String(projectCount), label: "Projects under way" },
  { value: String(org.year), label: "Founded" },
];

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
      <ul className="w-full">
        {divisions.map((division, index) => (
          <li key={division.slug} className="border-t border-rule">
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
          </li>
        ))}
      </ul>
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
                {org.tagline}
              </Title>
              <Text level="lead">{org.description}</Text>
            </Stack>

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
          </Stack>

          {/* Bottom-aligned, so the index hangs off the same optical baseline
              as the actions rather than floating beside the headline. */}
          <div className="lg:col-span-5 lg:self-end">
            <DivisionIndex />
          </div>
        </div>
      </Section>
    </div>
  );
}
