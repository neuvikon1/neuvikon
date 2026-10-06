import { cn } from "@/lib/utils";
import { Container } from "./container";
import { GridRail, GridRule, GridTick } from "./grid-lines";

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical rails at the container edges. */
  rails?: boolean;
  /** Full-bleed hairline along the top edge. */
  rule?: boolean;
  /** Padding applied to the inner container. */
  inset?: boolean;
  containerClassName?: string;
};

/**
 * The frame every section wears. The lines draw themselves in as the section is
 * reached - see `grid-lines.tsx`, which owns that and the reasons for it.
 */
export function Section({
  className,
  containerClassName,
  children,
  rails = true,
  rule = true,
  inset = true,
  ...props
}: SectionProps) {
  return (
    // `data-rails` is what ScrollInk follows down the page.
    <section className={cn("relative w-full", className)} data-rails={rails || undefined} {...props}>
      {/* A masked element, not a border: a border cannot be gapped. */}
      {rule && <GridRule />}
      <Container
        className={cn("relative", inset && "py-20 md:py-28", containerClassName)}
      >
        {rails && (
          <>
            <GridRail side="left" />
            <GridRail side="right" />
          </>
        )}
        {/* The dot marks a crossing, so it only exists where both lines do. */}
        {rails && rule && (
          <>
            <GridTick side="left" />
            <GridTick side="right" />
          </>
        )}
        {children}
      </Container>
    </section>
  );
}
