import { DivisionPreview } from "@/components/sections/division";
import { Hero } from "@/components/sections/hero";
import { StudioLinks } from "@/components/sections/studio-links";
import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/i18n";

/**
 * The overview, and only that: the statement, each division's leading projects
 * and the way on to everything else. Detail belongs to the page it is about;
 * the home page is held to about four screens on a desktop.
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

      <StudioLinks locale={locale} />
    </>
  );
}
