import { CareersSection } from "@/components/sections/careers";
import { ContactSection } from "@/components/sections/contact";
import { DivisionPreview } from "@/components/sections/division";
import { Hero } from "@/components/sections/hero";
import { StudioSection } from "@/components/sections/studio";
import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/i18n";

/**
 * The whole studio on one page: the statement, each division's projects, how we
 * work, careers and contact. Project detail belongs to the project's own page.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const { divisions } = getContent(locale);

  return (
    <>
      <Hero locale={locale} />

      {/* The hero's button lands here. */}
      <div id="divisions" className="scroll-mt-20">
        {divisions.map((division) => (
          <DivisionPreview key={division.slug} division={division} locale={locale} />
        ))}
      </div>

      <StudioSection locale={locale} />
      <CareersSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
