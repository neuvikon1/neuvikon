import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * A 2px dot marking a rail/rule intersection. Near-foreground on purpose:
 * the contrast against the hairlines is the point.
 *
 * Rendered as a sibling of the rails, never a child - the rails carry a mask,
 * and a mask clips its descendants too, which would swallow the dot.
 */
function Tick({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 size-[2px] -translate-y-1/2 rounded-full bg-tick",
        side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
      )}
    />
  );
}

/** A vertical hairline at one edge of the container, gapped at each crossing. */
function Rail({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 w-px bg-rule grid-rail",
        side === "left" ? "left-0" : "right-0",
      )}
    />
  );
}

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical rails at the container edges. */
  rails?: boolean;
  /** Full-bleed hairline along the top edge. */
  rule?: boolean;
  /** Padding applied to the inner container. */
  inset?: boolean;
  containerClassName?: string;
};

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
    <section className={cn("relative w-full", className)} {...props}>
      {/* A masked element, not a border: a border cannot be gapped. */}
      {rule && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-rule grid-rule"
        />
      )}
      <Container
        className={cn("relative", inset && "py-20 md:py-28", containerClassName)}
      >
        {rails && (
          <>
            <Rail side="left" />
            <Rail side="right" />
          </>
        )}
        {/* The dot marks a crossing, so it only exists where both lines do. */}
        {rails && rule && (
          <>
            <Tick side="left" />
            <Tick side="right" />
          </>
        )}
        {children}
      </Container>
    </section>
  );
}
