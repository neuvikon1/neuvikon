import type { Locale } from "@/lib/i18n";

/**
 * A product's privacy notice as data. The shared frame (`components/privacy-policy.tsx`)
 * prints the parts every notice must carry - controller, rights, complaints, changes -
 * so a product file holds only what is true of that product, and a required field
 * cannot be skipped: KVKK Art. 10, GDPR Art. 13-14 and the store rules are the reason
 * each field exists.
 *
 * Every product is written from its own code. Reused text is both inaccurate and,
 * since KVKK decision 2026/347, a problem in itself. If a product starts collecting
 * something new, its file changes first.
 */

/** One purpose: what is processed, why, on which legal ground, for how long. */
export type PolicyRow = {
  data: string;
  purpose: string;
  /** KVKK Art. 5 clause in Turkish, GDPR Art. 6(1) point in English. */
  legalBasis: string;
  retention: string;
};

export type PolicyRecipient = {
  name: string;
  /** What this party does for the product and what it receives. */
  role: string;
  /** Where it processes data, as far as the provider states it. */
  location: string;
  /** The provider's own privacy page. */
  url?: string;
};

export type PolicySection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type PolicyDoc = {
  /** Two or three sentences a person will actually read. */
  summary: string;
  /** What the product is, and which apps, sites and servers this notice covers. */
  scope: string;
  /** Empty means the product itself collects no personal data; `summary` must then say so. */
  rows: PolicyRow[];
  /** How data arrives, and whether that is automated. */
  collection: string;
  /** Which data is optional, and what happens without it. */
  required: string;
  /** Things people assume are collected and are not. Only claims checked against the code. */
  notCollected?: string[];
  recipients: PolicyRecipient[];
  /**
   * Replaces the shared sentence about how recipients protect data. Needed when a
   * recipient is a public service with no contract behind it, where that sentence
   * would be untrue.
   */
  recipientNote?: string;
  /** Whether data leaves Turkey, to where, and what is known about it. Never claims an unsigned safeguard. */
  transfer: string;
  security: string;
  /** How to delete data, and what stays. */
  deletion: string;
  children: string;
  /** Anything specific to the product: ads, permissions, multiplayer, widgets. */
  extra?: PolicySection[];
};

export type ProductPolicy = {
  slug: string;
  name: string;
  updated: Record<Locale, string>;
  /** Name in `lib/content.*.ts`, when the product has a page on this site. */
  project?: string;
  /** Replaces the site's address for this product only. */
  contactEmail?: string;
  tr: PolicyDoc;
  en: PolicyDoc;
};

/** A product whose notice lives elsewhere and is linked rather than copied. */
export type ExternalPolicy = {
  slug: string;
  name: string;
  project?: string;
  href: string;
};
