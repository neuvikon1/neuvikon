import Link from "next/link";

import { Container } from "./layout/container";
import { ModeToggle } from "./mode-toggle";
import { ButtonLink } from "./ui/button-link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="tracking-tight">
          Neuvikon
        </Link>
        <div className="flex items-center gap-2">
          <ButtonLink href="/contact">Contact Sales</ButtonLink>
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
