import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { org } from "@/lib/content";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* `min-h-svh`, not `min-h-full`: Lenis resets the html element to
          `height: auto`, and a percentage minimum measured against that has
          nothing to measure. The viewport unit is the thing actually meant
          here anyway - keep the footer off the fold on a short page. */}
      <body className="flex min-h-svh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <MotionProvider>
              <Header />
              <main className="flex w-full flex-1 flex-col">{children}</main>
              <Footer />
              <Toaster />
            </MotionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
