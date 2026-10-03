import Link from "next/link"

import { Button } from "./button"

/**
 * A Button that navigates. Base UI assumes a native <button> unless told
 * otherwise, so `nativeButton={false}` belongs here once rather than at every
 * call site.
 */
function ButtonLink({
  href,
  ...props
}: React.ComponentProps<typeof Button> & { href: React.ComponentProps<typeof Link>["href"] }) {
  return <Button nativeButton={false} render={<Link href={href} />} {...props} />
}

export { ButtonLink }
