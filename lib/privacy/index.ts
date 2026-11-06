import type { Project } from "@/lib/content";
import { privacyHref, ui, type Locale } from "@/lib/i18n";
import { ciftligim } from "@/lib/privacy/products/ciftligim";
import { eclosion } from "@/lib/privacy/products/eclosion";
import { edgeout } from "@/lib/privacy/products/edgeout";
import { guessfast } from "@/lib/privacy/products/guessfast";
import { kaleMuhafizi } from "@/lib/privacy/products/kale-muhafizi";
import { korVeKul } from "@/lib/privacy/products/kor-ve-kul";
import { neuParty } from "@/lib/privacy/products/neu-party";
import { pushbump } from "@/lib/privacy/products/pushbump";
import { saksi } from "@/lib/privacy/products/saksi";
import { shardbound } from "@/lib/privacy/products/shardbound";
import { todaysWord } from "@/lib/privacy/products/todays-word";
import { undercard } from "@/lib/privacy/products/undercard";
import { vecta } from "@/lib/privacy/products/vecta";
import { worddeck } from "@/lib/privacy/products/worddeck";
import { zarEfsanesi } from "@/lib/privacy/products/zar-efsanesi";
import type { ExternalPolicy, ProductPolicy } from "@/lib/privacy/types";

/** Every product notice on this site; a new one reaches the hub, sitemap and project page from here. */
export const policies: ProductPolicy[] = [
  ciftligim,
  eclosion,
  edgeout,
  guessfast,
  kaleMuhafizi,
  korVeKul,
  neuParty,
  pushbump,
  saksi,
  shardbound,
  todaysWord,
  undercard,
  vecta,
  worddeck,
  zarEfsanesi,
];

/** Products with their own, fuller legal pages. */
export const externalPolicies: ExternalPolicy[] = [
  { slug: "neu-source", name: "Neu-Source", project: "Neu-Source", href: "https://www.neuvikon.space/privacy" },
];

export function getPolicy(slug: string): ProductPolicy | undefined {
  return policies.find((policy) => policy.slug === slug);
}

/** A project's links with its privacy policy added, so no project can lose it by hand. */
export function projectLinks(locale: Locale, project: Project): NonNullable<Project["links"]> {
  const own = policies.find((policy) => policy.project === project.name);
  const external = externalPolicies.find((policy) => policy.project === project.name);
  const target = own ? privacyHref(locale, own.slug) : external?.href;
  return [...(project.links ?? []), ...(target ? [{ label: ui[locale].privacyLink, href: target }] : [])];
}
