import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";

import "@/app/globals.css";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollInk } from "@/components/motion/scroll-ink";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getContent } from "@/lib/content";
import { routes, ui, type Locale } from "@/lib/i18n";

// latin-ext carries ğ, ş, ı and İ. Without it the Turkish pages fall back to a
// system face for every one of those letters, mid-word.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

/** The metadata both root layouts share, in their own language. */
export function siteMetadata(locale: Locale): Metadata {
  const { org } = getContent(locale);
  return {
    title: {
      default: `${org.name} — ${org.tagline}`,
      template: `%s — ${org.name}`,
    },
    description: org.description,
    openGraph: {
      title: `${org.name} — ${org.tagline}`,
      description: org.description,
      siteName: org.name,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_GB",
    },
    alternates: {
      languages: { tr: routes.home.tr, en: routes.home.en },
    },
  };
}

/**
 * Everything around a page, for either language.
 *
 * Each language has its own root layout only so each can print its own
 * `<html lang>`; both are this component with a different `locale`.
 */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui[locale];
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* `min-h-svh`, not `min-h-full`: Lenis resets the html element to
          `height: auto`, and a percentage minimum measured against that has
          nothing to measure. The viewport unit is the thing actually meant
          here anyway - keep the footer off the fold on a short page. */}
      <body className="flex min-h-svh flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          {t.skipToContent}
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <MotionProvider>
              <Header locale={locale} />
              <main id="content" tabIndex={-1} className="relative flex w-full flex-1 flex-col outline-none">
                <ScrollInk />
                {children}
              </main>
              <Footer locale={locale} />
              <Toaster />
            </MotionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
