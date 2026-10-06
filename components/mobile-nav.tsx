"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import { LanguageSwitch } from "@/components/language-switch";
import { useCurrentItem, type NavItem } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The nav below `md`, where the inline one is hidden. A sheet rather than a
 * dropdown under the bar: it brings focus trapping, Escape and the backdrop
 * with it, which a hand-rolled panel would each have to re-implement.
 *
 * Every link closes it. A same-page anchor would otherwise scroll the page
 * behind a menu that is still covering it.
 */
export function MobileNav({
  locale,
  items,
  contact,
}: {
  locale: Locale;
  items: NavItem[];
  contact: NavItem;
}) {
  const [open, setOpen] = useState(false);
  const current = useCurrentItem([...items, contact]);
  const t = ui[locale];
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" aria-label={t.menu} />}
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="gap-0 p-6">
        <SheetClose
          render={<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" aria-label={t.close} />}
        >
          <XIcon />
        </SheetClose>
        <SheetTitle className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {t.menu}
        </SheetTitle>
        <nav aria-label={t.mainNav} className="mt-8 flex flex-col">
          {[...items, contact].map((item) => {
            const isCurrent = item === current?.item;
            return (
              <Link
                key={item.href}
                href={item.href}
                lang={item.lang}
                onClick={close}
                aria-current={isCurrent ? current?.ariaCurrent : undefined}
                className={cn(
                  "border-t border-rule py-3 text-base tracking-tight transition-colors",
                  isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-rule pt-4">
          <LanguageSwitch locale={locale} onNavigate={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
