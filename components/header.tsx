import Link from "next/link";

import { divisions, org } from "@/lib/content";
import { Container } from "./layout/container";
import { ModeToggle } from "./mode-toggle";
import { ButtonLink } from "./ui/button-link";

/** Divisions first, then the two pages everyone looks for. */
const NAV = [
  ...divisions.map((division) => ({
    href: `#${division.slug}`,
    label: division.short,
  })),
  { href: "#studio", label: "Studio" },
  { href: "#careers", label: "Careers" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="tracking-tight">
          {org.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="#contact">Contact</ButtonLink>
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
