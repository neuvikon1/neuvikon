import { cn } from "@/lib/utils";

/**
 * The single source of horizontal edges for the whole site.
 * Nothing else should set a max-width or a page gutter.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-6 md:px-10", className)}
      {...props}
    />
  );
}
