import { cn } from "cn"

/** A figure and its caption. The value reads as type, not as a heading. */
function Stat({
  value,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: React.ReactNode
  label: React.ReactNode
}) {
  return (
    <div data-slot="stat" className={className} {...props}>
      <dt className="text-2xl tracking-tight md:text-3xl">{value}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
    </div>
  )
}

/** Lays a short row of stats out; wraps to two columns on small screens. */
function StatGroup({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="stat-group"
      className={cn(
        "grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-3",
        className
      )}
      {...props}
    />
  )
}

export { Stat, StatGroup }
