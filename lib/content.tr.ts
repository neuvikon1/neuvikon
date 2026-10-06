/**
 * Sitenin Türkçe içeriği. İngilizcesi `content.en.ts`; ikisinin uyduğu şekil
 * `content.ts` içinde.
 *
 * Kayıtlar iki dosyada aynı sırada duruyor: bir proje eklenince ya da
 * sırası değişince diğer dosya da aynı şekilde güncellenmeli.
 */

import type { About, Careers, Division, Org, ProjectStatus } from "./content";

export const org: Org = {
  name: "Neuvikon",
  tagline: "Yazılım, oyun ve robotik.",
  description:
    "Neuvikon; ürün geliştirme, mobil oyun ve gömülü sistemler alanlarında " +
    "çalışan bağımsız bir teknoloji stüdyosudur. Üç bölümde topladığımız işleri " +
    "uçtan uca kendimiz tasarlar, yazar ve yayınlarız.",
  email: "neuvikon@gmail.com",
  year: 2026,
};

export const statusLabel: Record<ProjectStatus, string> = {
  released: "Yayında",
  building: "Geliştirmede",
};

export const divisions: Division[] = [
  {
    slug: "games",
    name: "Neuvikon Games",
    short: "Games",
    tagline: "Mobil oyunlar; çok oyunculu ve tek oturumda oynanan.",
    intro:
      "Games bölümü mobil için kısa oturumlu, öğrenmesi birkaç saniye süren " +
      "ama ustalaşması uzun süren oyunlar üretiyor. Tasarımdan ağ katmanına, " +
      "görsellerden mağaza yayınına kadar her aşama stüdyo içinde yapılıyor.",
    capabilities: [
      "Unity 6 ile mobil oyun geliştirme — URP 2D, Input System",
      "Çok oyunculu ağ mimarisi — Netcode for GameObjects, Mirror, Unity Relay",
      "React Native + Expo ile mobil oyun; Firestore oda senkronizasyonu",
      "Prosedürel görsel ve ses üretimi, kodla kurulan arayüz",
      "Sunucu yetkili kural motorları, eşleştirme ve MMR/ELO",
      "Erişilebilirlik, çift dil (TR/EN) ve mağaza yayın süreçleri",
    ],
    projects: [
      {
        name: "PushBump",
        tagline: "Eğ, doldur, bırak. Tek itiş her şeyi değiştirir.",
        description:
          "Çevrimiçi çok oyunculu mobil arena oyunu. Telefonu eğerek hareket " +
          "eder, atışını doldurup bırakırsın. Her biri farklı silah ve " +
          "yeteneğe sahip karakterler, dört arena, bot modu ve savunma modu.",
        status: "building",
        tags: ["Unity", "Mirror", "Android", "Çok oyunculu"],
        image: "/apps/pushbump.png",
      },
      {
        name: "Neu-Pummel Party",
        tagline: "İki ila sekiz telefon, otuz mini oyun, tek oda.",
        description:
          "Telefonlarla oynanan parti oyunu. Biri oda kurar, herkes aynı " +
          "Wi-Fi'deki listeden katılır — IP yazmak yok, hesap açmak yok; " +
          "internet üzerinden oynamak için altı haneli oda kodu var. Her " +
          "turda otuz mini oyundan biri gelir, her birinin üç arena varyantı " +
          "ve bot yapay zekâsı vardır. Depoda tek bir ikili sanat varlığı " +
          "yok: tüm görseller ve sesler çalışma anında kodla üretiliyor. " +
          "Reklam ve uygulama içi satın alma yok.",
        status: "building",
        tags: ["Unity 6", "Netcode for GameObjects", "Android", "2-8 oyuncu"],
        image: "/apps/neuparty.png",
      },
      {
        name: "UnderCard",
        tagline: "Elin en düşükse çağır. Değilse kaybettin.",
        description:
          "Cabo tarzı, gerçek zamanlı çok oyunculu mobil kart oyunu. 2-8 " +
          "oyuncu dört haneli oda kodu ya da davet linkiyle katılır; oda " +
          "durumu Firestore üzerinden eşitlenir. Üç zorlukta bot rakip ve " +
          "tamamen cihazda çalışan çevrimdışı mod, yeniden bağlanma, yetenek " +
          "ve olay kartları, üç tema ve iki dil.",
        status: "building",
        tags: ["React Native", "Expo", "Firebase", "2-8 oyuncu"],
        image: "/apps/undercard.png",
      },
      {
        name: "EdgeOut",
        tagline: "Rakibinin altı küresini tahtadan dışarı it.",
        description:
          "Abalone kural setiyle oynanan, altıgen tahtada rekabetçi çevrimiçi " +
          "itme stratejisi oyunu. Kural motoru istemci ve sunucuda aynı kodu " +
          "paylaşıyor: istemci hamleyi anında önizliyor, sunucu doğrulayıp " +
          "yayınlıyor — hile sunucu duvarını aşamıyor. MMR penceresiyle " +
          "genişleyen eşleştirme kuyruğu, rütbe merdiveni, tur sayacı ve " +
          "pratik için bot rakip.",
        status: "building",
        tags: ["TypeScript", "Node.js", "WebSocket", "Çok oyunculu"],
        image: "/apps/edgeout.png",
      },
      {
        name: "GuessFast",
        tagline: "Sayıyı bul. Hızlı bul.",
        description:
          "Sayı tahmin oyunu. Her tahmin seni doğruya biraz daha yaklaştırır; " +
          "mesele kaç denemede değil, ne kadar sürede bulduğun.",
        status: "released",
        tags: ["React Native", "Expo", "Android", "Bulmaca"],
        image: "/apps/guessfast.png",
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/ng/app/guessfast/id6758861605",
          },
        ],
      },
      {
        name: "Card Wars",
        tagline: "Hat tabanlı kart savaşı; 1v1 ya da 2v2.",
        description:
          "Hat (lane) tabanlı kart savaşı oyunu. Oyun açılışta kendini kurar " +
          "— boş bir sahnede bile çalışır, böylece sahne dosyası bozulsa bile " +
          "her şey sürüm kontrolünde metin olarak durur. 2v2'de her oyuncunun " +
          "tek bir karşısı vardır ve takım ancak tüm üyeleri düşünce kaybeder; " +
          "bu da müttefiki ayakta tutmayı anlamlı bir karar hâline getirir.",
        status: "building",
        tags: ["Unity 6", "Kart oyunu", "2v2"],
      },
      {
        name: "Today's Word",
        tagline: "Günün kelimesi.",
        description:
          "Her gün herkese aynı İngilizce kelime: anlamı, gerçek hayattan " +
          "örnekleri ve nereden geldiği, ardından kısa bir test. Öğrenilen " +
          "kelimeler sonradan geri geliyor, böylece gerçekten akılda " +
          "kalıyor; günlük takip seriyi tutuyor. Hesap yok.",
        status: "released",
        tags: ["React Native", "Expo", "Convex", "iOS"],
        image: "/apps/todays-word.jpg",
        links: [{ label: "App Store", href: "https://apps.apple.com/app/todays-word-learn-everyday/id6810232514" }],
      },
      {
        name: "WordDeck",
        tagline: "Sınav kelimeleri, unutmadan hemen önce.",
        description:
          "İngilizce kelime kartları. Her kelime " +
          "Türkçe anlamı, İngilizce tanımı, örnek cümlesi, eş ve zıt " +
          "anlamlılarıyla geliyor; aralıklı tekrar her kartı tam unutmak " +
          "üzereyken geri getiriyor. Hesap yok, ilerleme cihazda üretilen " +
          "rastgele bir kimliğe bağlı.",
        status: "building",
        tags: ["Kelime kartları", "Aralıklı tekrar", "Expo"],
        image: "/apps/worddeck.png",
        links: [{ label: "Gizlilik Politikası", href: "/gizlilik/worddeck" }],
      },
      {
        name: "Timber Supply & Co",
        tagline: "Kes, taşı, sat. Zincirin tamamı sende.",
        description:
          "Kereste tedarik zinciri üzerine kurulu yönetim oyunu. Ayrıntılar " +
          "yayına hazır olduğunda eklenecek.",
        status: "building",
        tags: ["Yönetim"],
        image: "/apps/timber-supply.jpg",
      },
      {
        name: "Muavin-Sim",
        tagline: "Direksiyonda değilsin — kapıdasın.",
        description:
          "Otobüs muavinliği üzerine simülasyon oyunu. Ayrıntılar yayına " +
          "hazır olduğunda eklenecek.",
        status: "building",
        tags: ["Simülasyon"],
        image: "/apps/muavin-sim.png",
      },
      {
        name: "Duskfield",
        tagline: "Alacakaranlıkta geçen bir dünya.",
        description:
          "Arka uç tarafı Bun ile yazılıyor. Oyunun kendisine dair ayrıntılar " +
          "yayına hazır olduğunda eklenecek.",
        status: "building",
        tags: ["Bun", "TypeScript"],
        image: "/apps/duskfield.png",
      },
    ],
  },
  {
    slug: "tech",
    name: "Neuvikon Tech",
    short: "Tech",
    tagline: "Web ve mobil ürünler, arka uç altyapısı.",
    intro:
      "Tech tarafında ürünün tamamını üstleniyoruz: arayüz, sunucu, veri ve " +
      "dağıtım. Küçük ekiple çalıştığımız için karmaşıklığı baştan " +
      "sınırlamayı, çalışan bir sürümü erken çıkarmayı tercih ediyoruz.",
    capabilities: [
      "Web uygulamaları — TypeScript, React, Next.js, Angular",
      "Mobil uygulamalar — React Native, Expo",
      "Arka uç ve gerçek zamanlı servisler — Node.js, Bun, Firebase",
      "Veri toplama, puanlama ve rapor üretimi — Python",
      "Bilgisayarlı görü ve hareketle etkileşim",
      "CI/CD, sürüm yönetimi ve mağaza yayın süreçleri",
    ],
    projects: [
      {
        name: "Neu-Source",
        tagline: "Ajan hangi bilette, ne harcadı — tek ekranda.",
        description:
          "Next.js ve TypeScript ile yazılan iç platform. neuvikon CLI'ı " +
          "buraya bağlanıyor: kodlama ajanının hangi bilet üzerinde " +
          "çalıştığını ve ne kadar token harcadığını bildiriyor.",
        status: "released",
        tags: ["Next.js", "TypeScript"],
        links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
      },
      {
        name: "Eclosion",
        tagline: "Altı alanda kendini geliştir.",
        description:
          "Alışkanlık takibi uygulaması. İnsanın gelişmesi gereken altı alanı " +
          "ayrı ayrı takip ediyor; günlük tekrar sürdükçe ilerleme birikiyor.",
        status: "building",
        tags: ["React Native", "Expo", "Alışkanlık takibi"],
        image: "/apps/eclosion.png",
      },
      {
        name: "Neu-Chat",
        tagline: "Stüdyonun kendi sohbet katmanı.",
        description: "Sohbet uygulaması. Ayrıntılar yayına hazır olduğunda eklenecek.",
        status: "building",
        tags: ["Sohbet"],
        image: "/apps/neu-chat.png",
      },
      {
        name: "Neuvikon Web",
        tagline: "Bu site.",
        description:
          "Next.js App Router, TypeScript ve Tailwind ile yazılmış statik " +
          "kurumsal site. İçerik tek bir veri dosyasından üretiliyor.",
        status: "building",
        tags: ["Next.js", "TypeScript", "Tailwind"],
      },
    ],
  },
  {
    slug: "robotics",
    name: "Neuvikon Robotics",
    short: "Robotics",
    tagline: "Gömülü sistemler, otonom robotlar ve donanım prototipleri.",
    intro:
      "Robotics bölümü donanımla yazılımın kesiştiği yerde çalışıyor: sensör " +
      "okuyan, karar veren ve fiziksel dünyada bir şey yapan sistemler. " +
      "Prototipten çalışan cihaza kadar olan yolu kısaltmaya odaklanıyoruz.",
    capabilities: [
      "Gömülü yazılım — ESP32 / ESP32-S3, C++, FreeRTOS",
      "Sensör füzyonu ve kontrol döngüleri — IMU, pusula, ToF",
      "Cihaz–bulut ve cihaz–masaüstü haberleşmesi — WebSocket, BLE, USB HID",
      "Kablosuz (OTA) firmware güncelleme ve modüler firmware mimarisi",
      "ROS 2 / Gazebo simülasyonu, hareket planlama ve navigasyon",
      "Kinematik analiz ve çalışma alanı görselleştirme",
    ],
    projects: [],
  },
];

export const about: About = {
  lead:
    "Neuvikon bağımsız bir teknoloji stüdyosu. Bir işi baştan sona üstlenmeyi " +
    "tercih ediyoruz: tasarım, yazılım, altyapı ve yayın aynı elden çıkıyor. " +
    "Bu yüzden az sayıda işi aynı anda yürütüyor, her birini gerçekten " +
    "bitirmeye çalışıyoruz.",
  facts: [
    { label: "Kuruluş", value: "2026" },
    { label: "Konum", value: "Türkiye" },
    { label: "Ekip", value: "5 kişi" },
    { label: "Bölüm", value: "3" },
  ],
  principles: [
    {
      title: "Uçtan uca tek elden",
      body:
        "Oyun tasarımından ağ katmanına, devre şemasından mağaza yayınına " +
        "kadar her aşama stüdyo içinde yapılıyor. Dışarıya iş verdiğimizde " +
        "bile mimari kararı bizde kalıyor.",
    },
    {
      title: "Sunucu otoritedir",
      body:
        "Çok oyunculu işlerimizde istemci yalnızca niyet gönderir; kuralı " +
        "sunucu işletir ve sonucu yayınlar. Aynı kural motoru istemcide de " +
        "çalıştığı için oyuncu gecikme hissetmez, ama hile sunucu duvarını " +
        "aşamaz.",
    },
    {
      title: "Kaynak koda güven, dosyaya değil",
      body:
        "Projelerimiz açılışta kendini kurar; sahneye elle bağlanmış hiçbir " +
        "şey yoktur. Böylece bir ikili dosya bozulsa bile sistem ayakta " +
        "kalır ve her şey sürüm kontrolünde metin olarak kalır.",
    },
    {
      title: "Erişilebilirlik sonradan eklenmez",
      body:
        "Renk körü paleti, renge eşlik eden şekil, yazı boyutu, hareket " +
        "azaltma ve sol el modu ürünün ilk sürümünde var. Sonraya " +
        "bırakılan erişilebilirlik hiç gelmiyor.",
    },
  ],
  team: ["Vural Bilgin", "Oğulcan Bozkurt", "Arda Özan", "İrem Bozkurt", "Selinay Kıyak"],
};

export const careers: Careers = {
  lead:
    "Şu anda açık bir pozisyon yok. Yine de birlikte çalışmak istiyorsan " +
    "yazabilirsin: ilgilendiğin bölümü ve daha önce bitirdiğin bir işi " +
    "anlatan kısa bir e-posta yeterli.",
  openings: [],
  interests: [
    "Unity ve çok oyunculu ağ mimarisi",
    "React Native / Expo ile mobil ürün",
    "Gömülü yazılım — ESP32, sensör füzyonu",
    "Oyun ve arayüz tasarımı",
  ],
};
