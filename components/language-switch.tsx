"use client";

import { Fragment } from "react";
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
  codes = false,
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  /** Both locale codes ("EN / TR") as separate links, the current one bold. */
  codes?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const other = otherLocale(locale);
  const t = ui[locale];

  // Both codes, each its own link: the one you are reading in is set heavier
  // and stays where it is, the other goes to this page in that language.
  if (codes) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        {(["en", "tr"] as const).map((code, index) => {
          const isCurrent = code === locale;
          return (
            <Fragment key={code}>
              {index > 0 && <span aria-hidden className="mx-1.5">/</span>}
              <Link
                href={isCurrent ? pathname : counterpart(pathname, locale)}
                hrefLang={code}
                lang={code}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={isCurrent ? undefined : t.switchLanguageLabel}
                onClick={onNavigate}
                className={cn(
                  "uppercase transition-colors hover:text-foreground",
                  isCurrent && "font-medium text-foreground",
                )}
              >
                {code}
              </Link>
            </Fragment>
          );
        })}
      </span>
    );
  }

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
