import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * The site's type scale. Sizes live here and nowhere else - a section picks a
 * level, never a font size. Measure (max-width) travels with the level, since
 * the comfortable line length is a property of the size.
 *
 * None of these carry vertical margin; spacing is the job of the layout
 * primitives (Stack, Section) so rhythm stays consistent across sections.
 */

const eyebrowVariants = cva(
  "font-mono text-xs tracking-widest text-muted-foreground uppercase"
)

function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="eyebrow" className={cn(eyebrowVariants(), className)} {...props} />
  )
}

const titleVariants = cva("tracking-tight text-balance", {
  variants: {
    level: {
      /** Page-opening statement. One per page. */
      display: "max-w-4xl text-3l leading-[1.02] md:text-4xl xl:text-5xl",
      /** Section headline. */
      section: "max-w-xl text-4xl leading-[1.1]",
      /** Subsection or card headline. */
      sub: "max-w-md text-2xl leading-[1.2]",
    },
  },
  defaultVariants: { level: "section" },
})

type TitleProps = React.ComponentProps<"h2"> &
  VariantProps<typeof titleVariants> & {
    as?: "h1" | "h2" | "h3" | "h4"
  }

function Title({ className, level, as: Tag = "h2", ...props }: TitleProps) {
  return (
    <Tag
      data-slot="title"
      className={cn(titleVariants({ level }), className)}
      {...props}
    />
  )
}

const textVariants = cva("text-muted-foreground", {
  variants: {
    level: {
      /** Supporting paragraph under a display title. */
      lead: "max-w-xl text-base leading-relaxed md:text-lg",
      /** Body copy. */
      body: "max-w-prose text-sm leading-relaxed",
    },
  },
  defaultVariants: { level: "body" },
})

type TextProps = React.ComponentProps<"p"> & VariantProps<typeof textVariants>

function Text({ className, level, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      className={cn(textVariants({ level }), className)}
      {...props}
    />
  )
}

export { Eyebrow, Title, Text, titleVariants, textVariants }
