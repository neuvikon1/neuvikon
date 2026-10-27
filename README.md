# Neuvikon

[neuvikon.com](https://neuvikon.com) sitesinin kaynak kodu. Neuvikon üç bölümden
oluşan bağımsız bir teknoloji stüdyosu: **Tech**, **Games** ve **Robotics**.

- Türkçe site kökte: `/`, `/games`, `/hakkimizda`, `/iletisim` …
- İngilizce site `/en` altında: `/en`, `/en/games`, `/en/about`, `/en/contact` …

Site Next.js 16 ile yazılıyor ve **statik olarak** dışa aktarılıyor
(`output: "export"`); sunucu yok, GitHub Pages yalnızca HTML/CSS/JS dosyalarını
sunuyor.

## Yerelde çalıştırma

Paket yöneticisi pnpm (sürümü `package.json` içindeki `packageManager`
alanında). Ayrıca kurmana gerek yok, Node ile gelen corepack üzerinden çalışır:

```bash
corepack pnpm install   # bağımlılıkları kur
corepack pnpm dev       # geliştirme sunucusu → http://localhost:3000
corepack pnpm build     # statik derleme → out/ klasörü
corepack pnpm lint      # ESLint
```

> `pnpm start` statik export ile anlamlı değil; derlenmiş siteye bakmak için
> `out/` klasörünü herhangi bir statik sunucuyla açabilirsin.

## Yayına alma

`main` dalına yapılan her push, `.github/workflows/pages.yml` iş akışını
tetikler: GitHub Actions `pnpm build` ile statik siteyi üretir ve `out/`
klasörünü GitHub Pages'e yükler. Elle bir şey yapmana gerek yok; iş akışı
Actions sekmesinden elle de (`workflow_dispatch`) çalıştırılabilir.

**İletişim formu — `WEB3FORMS_KEY`:** Site sunucusuz olduğu için iletişim
formu mesajları [Web3Forms](https://web3forms.com) üzerinden e-postaya
iletir. Anahtar, deponun **Settings → Secrets and variables → Actions →
Variables** bölümündeki `WEB3FORMS_KEY` değişkeninden derleme sırasında okunur
(gizli değil; yalnızca kendi gelen kutusuna mail atabilir).

- Değişken tanımlıysa: İletişim sayfasında form görünür.
- Tanımlı değilse: form **hiç çizilmez**, sayfada yalnızca e-posta adresi
  kalır. Hata vermez.

Yerelde formu denemek için `.env.local` dosyasına
`NEXT_PUBLIC_WEB3FORMS_KEY=...` yazabilirsin.

## İçeriği değiştirme

Sayfa metinlerinin neredeyse tamamı iki dosyada, JSX'e dokunmadan
değiştirilebilir:

| Dosya | İçerik |
| --- | --- |
| `lib/content.tr.ts` | Türkçe içerik (bölümler, projeler, hakkımızda, ekip, kariyer) |
| `lib/content.en.ts` | Aynı içeriğin İngilizcesi |
| `lib/content.ts` | İki dosyanın uyması gereken şekil (tipler), `legalEntity`, dış bağlantılar |
| `lib/i18n.ts` | Adresler (`routes`) ve arayüz metinleri (`ui`: menü, buton, form yazıları) |

**Kural:** İki dil dosyası birbirinin aynası. Bir kayıt eklediğinde,
sildiğinde ya da sırasını değiştirdiğinde aynısını diğer dosyada da yap.
Bir alan eksik ya da yanlış yazılırsa `pnpm build` / editör TypeScript hatası
verir.

### Proje eklemek

1. **İkon:** Kare uygulama ikonunu `public/apps/<ad>.png` olarak ekle.
2. **Ekran görüntüleri (isteğe bağlı):** `public/media/<slug>/` klasörüne koy
   (`01.jpg`, `02.jpg` …). `<slug>` proje adından türetilir: küçük harf,
   Türkçe karakterler sadeleşir, boşluklar `-` olur
   (`Neu-Pummel Party` → `neu-pummel-party`).
3. **Kayıt:** Hem `content.tr.ts` hem `content.en.ts` içinde ilgili bölümün
   `projects` dizisine, **aynı sıraya** ekle:

```ts
{
  name: "Proje Adı",              // iki dilde aynı; adres de buradan çıkar
  tagline: "Tek satırlık özet.",
  description: "Proje sayfasındaki uzun açıklama.",
  status: "building",             // "building" (Geliştirmede) ya da "released" (Yayında)
  tags: ["Strateji", "Mobil"],
  image: "/apps/proje-adi.png",
  links: [{ label: "Google Play", href: "https://..." }],
  featured: true,                 // isteğe bağlı: bölümde öne alınır, geniş kart
  media: [
    { src: "/media/proje-adi/01.jpg", alt: "Ana menü" },
    { src: "/media/proje-adi/02.jpg", alt: "Oyun ekranı", wide: true }, // yatay görüntü
    // video için: { src: "...mp4", kind: "video", poster: "...jpg" }
  ],
}
```

Kayıt eklenince ana sayfa, bölüm sayfası, proje sayfası
(`/<bölüm>/<slug>` ve `/en/<bölüm>/<slug>`) ve menüler kendiliğinden güncellenir.
`media` boşsa proje sayfası "görseller henüz eklenmedi" yazar.

Yollar her zaman `public/` sonrasından, `/` ile başlayarak yazılır
(`public/apps/x.png` → `"/apps/x.png"`). Görselleri eklemeden önce WebP'ye
çevirip boyutlarını küçült.

### Hakkımızda, ekip, kariyer

Her iki dil dosyasında:

- `org` — stüdyo adı, kısa açıklama, iletişim e-postası, yıl
- `about` — giriş metni (`lead`), rakamlar (`facts`), ilkeler (`principles`),
  ekip (`team`: yalnızca isim listesi, unvan yok)
- `careers` — giriş metni ve açık pozisyonlar (`openings`). Liste boşsa sayfa
  "Açık pozisyon yok — yine de yaz." gösterir.

### Yasal metinler ve veri sorumlusu

- Metinler doğrudan sayfa dosyalarında:
  - KVKK aydınlatma metni: `app/(tr)/kvkk/page.tsx` ↔ `app/(en)/en/data-protection/page.tsx`
  - Gizlilik politikası: `app/(tr)/gizlilik/page.tsx` ↔ `app/(en)/en/privacy/page.tsx`
  - WordDeck uygulamasının gizlilik politikası: `app/(tr)/gizlilik/worddeck/page.tsx` ↔ `app/(en)/en/privacy/worddeck/page.tsx`
- **Veri sorumlusu (KVKK) bilgileri** `lib/content.ts` içindeki `legalEntity`
  nesnesinde: `title` (ad/unvan), `address`, `mersis`, `taxOffice`. Boş
  (`null`) bırakılan alanlar sayfada bilerek **"EKLENECEK" / "PENDING"**
  olarak görünür; bunlar doldurulmadan KVKK metni geçerli sayılmaz. Şirket
  yoksa gerçek kişinin adı ve adresi yazılır; MERSIS ve vergi dairesi yalnızca
  şirketler için geçerlidir.
- Yasal metinleri değiştirdiğinde `legalEntity.updated` tarihini (iki dilde)
  elle güncelle. WordDeck sayfasının kendi `UPDATED` tarihi var.
- Siteye çerez, analitik, üyelik ya da yeni bir form eklenirse yasal metinler
  yeniden gözden geçirilmeli (metinler avukat tarafından yazılmadı).

### Bölüm eklemek

1. Her iki dil dosyasında `divisions` dizisine bir kayıt ekle: `slug` (iki
   dilde aynı, adres olur: `/<slug>` ve `/en/<slug>`), `name`, `short`,
   `tagline`, `intro`, `capabilities`, `projects`.
2. Bölüm sayfası, ana sayfadaki liste ve alt bilgi menüsü kendiliğinden oluşur.
3. Elle güncellenmesi gerekenler: `lib/i18n.ts` içindeki "Üç bölüm" / "three
   divisions" yazan arayüz metinleri ve `about.facts` içindeki bölüm sayısı.
4. İsteğe bağlı logo: `public/divisions/<slug>.png` (koyu tema) ve
   `<slug>-light.png` (açık tema) ekleyip `lib/division-logos.ts` dosyasına
   kaydet. Logo yoksa bölüm başlığı metin olarak görünür (Tech'te olduğu gibi).

## Klasör haritası

```
app/
  (tr)/                 Türkçe sayfalar (kök adresler) ve Türkçe kök layout
  (en)/en/              İngilizce sayfalar (/en altında) ve İngilizce kök layout
    [division]/         bölüm sayfası; [project]/ proje sayfası
  global-not-found.tsx  404 sayfası
  globals.css           tema renkleri ve genel stiller
components/
  sections/             sayfa bölümleri (hero, bölüm, proje ızgarası, iletişim…)
  views/                sayfaların iki dilde ortak gövdeleri
  ui/                   shadcn/ui temel bileşenleri
  contact-form.tsx      Web3Forms iletişim formu
  legal.tsx             yasal sayfa iskeleti ve veri sorumlusu tablosu
lib/
  content.ts            içerik tipleri, legalEntity
  content.tr.ts         Türkçe içerik
  content.en.ts         İngilizce içerik
  i18n.ts               adresler ve arayüz metinleri
  division-logos.ts     bölüm logoları
public/
  apps/                 proje ikonları
  media/<slug>/         proje ekran görüntüleri ve videoları
  divisions/            bölüm logoları
  brand/                Neuvikon logosu
.github/workflows/pages.yml   GitHub Pages yayın iş akışı
```

## Geliştiriciler için notlar

- Sayfalar arası bağlantıları elle yazma; `lib/i18n.ts` içindeki `href()`,
  `divisionHref()`, `projectHref()` fonksiyonlarını kullan. Aksi halde
  İngilizce sayfadan Türkçeye düşülür.
- `public/` altındaki dosyalara string olarak verilen yollar `asset()`
  (`lib/content.ts`) ile sarılmalı; site GitHub Pages'te alt yoldan da
  sunulabildiği için (`NEXT_PUBLIC_BASE_PATH`) aksi halde 404 olur.
- Bu Next.js sürümü eğitim verilerindekinden farklı olabilir; ayrıntı için
  `AGENTS.md`.
