import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Vertical rhythm. Children carry no margins of their own - a Stack owns the
 * gap, so the same step values repeat across every section instead of a
 * one-off `mt-7` per element.
 */
const stackVariants = cva("flex flex-col items-start", {
  variants: {
    gap: {
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-10",
      xl: "gap-16",
    },
  },
  defaultVariants: { gap: "md" },
})

type StackProps = React.ComponentProps<"div"> &
  VariantProps<typeof stackVariants>

export function Stack({ className, gap, ...props }: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(stackVariants({ gap }), className)}
      {...props}
    />
  )
}

/** A horizontal row of calls to action. */
export function Actions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="actions"
      className={cn("flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  )
}
