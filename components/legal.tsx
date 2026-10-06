import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Eyebrow, Title } from "@/components/ui/typography";
import { legalEntity, PENDING } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The shared frame for legal texts.
 *
 * These pages exist to be read, not looked at: a narrow measure, ordinary
 * line height, no entrance motion. A privacy policy that rises in word by
 * word is a privacy policy nobody finishes.
 */
export function LegalPage({
  locale,
  eyebrow,
  title,
  updated,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  /** An app's own policy is dated separately from the site's texts. */
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Stack gap="lg" className="w-full max-w-3xl">
        <Stack gap="sm">
          <Eyebrow lang="en">{eyebrow}</Eyebrow>
          <Title as="h1" level="display">
            {title}
          </Title>
          <p className="text-sm text-muted-foreground">
            {ui[locale].lastUpdated}
            {updated ?? legalEntity.updated[locale]}
          </p>
        </Stack>
        <div className="flex w-full flex-col gap-10">{children}</div>
      </Stack>
    </Section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg tracking-tight">{title}</h2>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

/** An inline link inside legal copy: mailto and external links as `<a>`, the site's own through `Link`. */
export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "text-foreground underline underline-offset-4 hover:no-underline";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/**
 * The data controller's particulars. Unfilled fields are shown as unfilled:
 * in a legal notice, hiding a missing detail only hides that the notice is
 * not valid yet.
 */
export function LegalEntityTable({ locale }: { locale: Locale }) {
  const labels =
    locale === "en"
      ? { title: "Data controller", address: "Address", mersis: "MERSIS no", tax: "Tax office / number" }
      : { title: "Veri sorumlusu", address: "Adres", mersis: "MERSİS no", tax: "Vergi dairesi / no" };

  const rows = [
    { label: labels.title, value: legalEntity.title },
    { label: labels.address, value: legalEntity.address },
    { label: labels.mersis, value: legalEntity.mersis },
    { label: labels.tax, value: legalEntity.taxOffice },
  ];

  return (
    <dl className="flex flex-col">
      {rows.map((row) => (
        <div key={row.label} className="border-t border-rule py-3 sm:flex sm:gap-6">
          <dt className="font-mono text-xs tracking-widest uppercase sm:w-52 sm:shrink-0">{row.label}</dt>
          <dd
            className={cn(
              "mt-1 sm:mt-0",
              row.value
                ? "text-foreground"
                : "font-mono text-xs tracking-widest text-muted-foreground/70 uppercase",
            )}
          >
            {row.value ?? PENDING[locale]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
