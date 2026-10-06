"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { counterpart, otherLocale, ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Goes to the page you are on, in the other language - not to the other
 * language's home page, which would lose your place.
 *
 * The two languages have separate root layouts, so following this is a full
 * page load rather than a client-side transition. That is Next's rule for
 * crossing root layouts, and it is the price of each language printing its
 * own `<html lang>`.
 */
export function LanguageSwitch({
  locale,
  className,
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const other = otherLocale(locale);
  const t = ui[locale];

  return (
    <Link
      href={counterpart(pathname, locale)}
      hrefLang={other}
      lang={other}
      aria-label={t.switchLanguageLabel}
      onClick={onNavigate}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      {t.switchLanguage}
    </Link>
  );
}
