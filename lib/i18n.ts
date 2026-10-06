/**
 * Two languages: Turkish at the root (`/games`), English under `/en`
 * (`/en/games`).
 *
 * Turkish carries no prefix because it is the primary audience and the old
 * site's addresses live on. The price is that every link has to be built with
 * `href()` and friends: a hand-written `/iletisim` on an English page drops
 * the reader into Turkish.
 *
 * Each language has its own root layout (`app/(tr)`, `app/(en)`) so each can
 * print its own `<html lang>` - uppercase transforms are language-sensitive,
 * and "Unity" under `lang="tr"` comes out as "UNİTY".
 */

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Static pages, with their slugs translated. */
export const routes = {
  home: { tr: "/", en: "/en" },
  about: { tr: "/hakkimizda", en: "/en/about" },
  careers: { tr: "/kariyer", en: "/en/careers" },
  contact: { tr: "/iletisim", en: "/en/contact" },
  privacy: { tr: "/gizlilik", en: "/en/privacy" },
  dataProtection: { tr: "/kvkk", en: "/en/data-protection" },
  worddeckPrivacy: { tr: "/gizlilik/worddeck", en: "/en/privacy/worddeck" },
} as const;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, key: RouteKey): string {
  return routes[key][locale];
}

/** Division slugs are the same in both languages (games/tech/robotics). */
export function divisionHref(locale: Locale, slug: string): string {
  return locale === "en" ? `/en/${slug}` : `/${slug}`;
}

/**
 * A project's address segment from its name: "Neu-Pummel Party" →
 * "neu-pummel-party". Names are brand names and read the same in both
 * languages, so the slug does too and needs no field of its own.
 */
export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[ıİ]/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectHref(locale: Locale, division: string, name: string): string {
  return `${divisionHref(locale, division)}/${projectSlug(name)}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

/**
 * `trailingSlash: true` makes `usePathname()` return "/games/" while every
 * builder above returns "/games"; compare them only after this.
 */
export function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

/**
 * The same page in the other language. Translated slugs come from `routes`;
 * everything else (divisions, projects) differs only by the `/en` prefix.
 */
export function counterpart(path: string, from: Locale): string {
  const current = normalizePath(path);
  const to = otherLocale(from);
  const route = Object.values(routes).find((r) => r[from] === current);
  if (route) return route[to];
  if (from === "en") return current.replace(/^\/en(?=\/|$)/, "") || "/";
  return current === "/" ? "/en" : `/en${current}`;
}

/**
 * Interface strings - the page frame, not the content. Divisions, projects
 * and the studio's own words live in `content.tr.ts` / `content.en.ts`.
 */
export const ui = {
  tr: {
    skipToContent: "İçeriğe geç",
    mainNav: "Ana menü",
    menu: "Menü",
    close: "Kapat",
    divisions: "Bölümler",
    studio: "Stüdyo",
    about: "Hakkımızda",
    careers: "Kariyer",
    contact: "İletişim",
    privacy: "Gizlilik",
    dataProtection: "KVKK",
    legal: "Yasal",
    toggleTheme: "Temayı değiştir",
    switchLanguage: "English",
    switchLanguageLabel: "Switch to English",
    exploreDivisions: "Bölümleri keşfet",
    scroll: "Kaydır",
    divisionsTitle: "Üç bölüm, tek stüdyo.",
    projectCount: (n: number) => `${n} proje`,
    inPrototype: "Prototip aşamasında",
    explore: "Bölümü incele",
    capabilities: "Yetkinlikler",
    noPublicProjects: "Yayında proje yok",
    noPublicProjectsBody:
      "Bu bölümden henüz yayına çıkan bir şey yok; işler prototip aşamasında. " +
      "İlgilendiğin kısım burasıysa bize yaz.",
    otherDivisions: "Diğer bölümler",
    otherProjects: "Bu bölümdeki diğer projeler",
    backToDivision: (name: string) => `${name} bölümüne dön`,
    media: "Uygulamanın içinden",
    mediaPending: "Bu projenin uygulama içi görselleri ve videoları henüz eklenmedi.",
    links: "Bağlantılar",
    galleryOpen: (n: number, total: number) => `Görseli büyüt (${n}/${total})`,
    galleryPrev: "Önceki görsel",
    galleryNext: "Sonraki görsel",
    getInTouch: "İletişime geç",
    howWeWork: "Nasıl çalışıyoruz.",
    team: "Ekip",
    openPositions: "Açık pozisyonlar.",
    noOpenPositions: "Açık pozisyon yok — yine de yaz.",
    whatWeReadFirst: "Önce neye bakarız",
    contactTitle: "Bizimle iletişime geç.",
    contactLead:
      "Tek stüdyo, üç bölüm ve hepsi için tek bir adres. Gelen her şeyi okuyoruz.",
    formName: "Adın",
    formEmail: "E-posta adresin",
    formMessage: "Mesajın",
    formSend: "Gönder",
    formSending: "Gönderiliyor…",
    formSent: "Mesajın bize ulaştı. En kısa sürede e-posta adresine dönüş yapacağız.",
    formSendAnother: "Yeni mesaj yaz",
    formError: "Mesaj gönderilemedi. Tekrar dene ya da doğrudan e-posta at:",
    formOr: "ya da doğrudan yaz:",
    formNotice: "Gönderdiğin bilgiler yalnızca sana dönüş yapmak için kullanılır.",
    formPrivacy: "Gizlilik",
    lastUpdated: "Son güncelleme: ",
    notFoundTitle: "Sayfa yok.",
    notFoundBody: "Aradığınız adres taşınmış ya da hiç var olmamış olabilir.",
    home: "Ana sayfa",
  },
  en: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    menu: "Menu",
    close: "Close",
    divisions: "Divisions",
    studio: "Studio",
    about: "About",
    careers: "Careers",
    contact: "Contact",
    privacy: "Privacy",
    dataProtection: "Data protection",
    legal: "Legal",
    toggleTheme: "Toggle theme",
    switchLanguage: "Türkçe",
    switchLanguageLabel: "Türkçeye geç",
    exploreDivisions: "Explore the divisions",
    scroll: "Scroll",
    divisionsTitle: "Three divisions, one studio.",
    projectCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    inPrototype: "In prototype",
    explore: "Explore the division",
    capabilities: "Capabilities",
    noPublicProjects: "No public projects",
    noPublicProjectsBody:
      "Nothing public from this division yet — the work is at prototype " +
      "stage. Write to us if it is the part you care about.",
    otherDivisions: "Other divisions",
    otherProjects: "More from this division",
    backToDivision: (name: string) => `Back to ${name}`,
    media: "Inside the app",
    mediaPending: "Screenshots and videos from inside this project are not up yet.",
    links: "Links",
    galleryOpen: (n: number, total: number) => `Enlarge image (${n} of ${total})`,
    galleryPrev: "Previous image",
    galleryNext: "Next image",
    getInTouch: "Get in touch",
    howWeWork: "How we work.",
    team: "Team",
    openPositions: "Open positions.",
    noOpenPositions: "No open positions — write anyway.",
    whatWeReadFirst: "What we would read first",
    contactTitle: "Get in touch with us.",
    contactLead:
      "One studio, three divisions, and a single address for all of them. We " +
      "read everything that arrives.",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "Your message",
    formSend: "Send",
    formSending: "Sending…",
    formSent: "Your message reached us. We will reply to your email address soon.",
    formSendAnother: "Write another",
    formError: "The message could not be sent. Try again, or email us directly:",
    formOr: "or write to us directly:",
    formNotice: "What you send is used only to reply to you.",
    formPrivacy: "Privacy",
    lastUpdated: "Last updated: ",
    notFoundTitle: "No such page.",
    notFoundBody: "The address you followed has moved, or never existed.",
    home: "Home",
  },
} as const;

export type UI = (typeof ui)[Locale];
