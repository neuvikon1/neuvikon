import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <>
      {/* Hero: rails only, no top rule (the header sits above it) */}
      <Section rule={false} containerClassName="py-28 md:py-40">
        <p className="text-muted-foreground">Neuvikon</p>
        <h1 className="mt-4 max-w-2xl text-5xl leading-[1.05] tracking-tight md:text-6xl">
          The divider grid, applied.
        </h1>
      </Section>

      <Section>
        <p className="text-muted-foreground">Platform</p>
        <h2 className="mt-4 max-w-xl text-4xl leading-[1.1] tracking-tight">
          Every boundary is one full-bleed rule plus two rails.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {["Testing", "Guardrails", "Workflows"].map((t) => (
            <div key={t} className="rounded-2xl bg-muted/60 p-6">
              <p className="text-muted-foreground">{t}</p>
              <p className="mt-2 text-base">
                Cards keep their own radius; the grid lines stay behind them.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tight band: same lines, less air */}
      <Section containerClassName="py-8">
        <p className="text-muted-foreground">
          A tight row works too — rails scale to whatever height the section has.
        </p>
      </Section>

      <Section>
        <h2 className="max-w-xl text-4xl leading-[1.1] tracking-tight">
          Or build anything with a powerful host of APIs
        </h2>
      </Section>

      <Section rails={false} inset={false}>
        <div className="py-10 text-muted-foreground">
          Rails off, rule on — for footers and full-width bands.
        </div>
      </Section>
    </>
  );
}
