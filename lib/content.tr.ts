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
        tags: ["Arena", "Aksiyon", "Çok oyunculu", "Mobil"],
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
        tags: ["Parti oyunu", "Mini oyunlar", "Yerel çok oyunculu", "2-8 oyuncu"],
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
        tags: ["Kart oyunu", "Strateji", "Çok oyunculu", "2-8 oyuncu"],
        image: "/apps/undercard.png",
        media: [
          { src: "/media/undercard/01.jpg", alt: "Ana menü ve günlük meydan okuma" },
          { src: "/media/undercard/02.jpg", alt: "Botlarla oyun lobisi" },
          { src: "/media/undercard/03.jpg", alt: "Oyun masası" },
          { src: "/media/undercard/04.jpg", alt: "Kart çekme: değiştir ya da at" },
          { src: "/media/undercard/05.jpg", alt: "Olay kartı: Vergi" },
          { src: "/media/undercard/06.jpg", alt: "Tur sonucu ve puan tablosu" },
        ],
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
        tags: ["Strateji", "Masa oyunu", "Çevrimiçi", "Sıralamalı"],
        image: "/apps/edgeout.png",
        media: [
          { src: "/media/edgeout/01.png", alt: "Başlangıç dizilimi: 61 hücrelik tahtada 14 siyah ve 14 beyaz küre" },
          { src: "/media/edgeout/02.png", alt: "Orta oyun: seçili üç beyaz küre ve olası hamle yönleri" },
          { src: "/media/edgeout/03.png", alt: "Duvar yerleştirme modu: uygun kenarlar vurgulu" },
          { src: "/media/edgeout/04.png", alt: "Siyahın yerleştirdiği duvar beyazların önünü kesiyor" },
          { src: "/media/edgeout/05.png", alt: "Giriş ekranı" },
        ],
      },
      {
        name: "GuessFast",
        tagline: "Sayıyı bul. Hızlı bul.",
        description:
          "Sayı tahmin oyunu. Her tahmin seni doğruya biraz daha yaklaştırır; " +
          "mesele kaç denemede değil, ne kadar sürede bulduğun.",
        status: "released",
        tags: ["Bulmaca", "Sayı tahmini", "Günlük challenge", "PvP"],
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
        media: [
          { src: "/media/guessfast/01.jpg", alt: "Ana menü" },
          { src: "/media/guessfast/02.jpg", alt: "Pratik oyunu: her tahminden sonra doğru rakam sayısı" },
          { src: "/media/guessfast/03.jpg", alt: "Göstergeli mod: doğru yerdeki rakamlar yeşil, yanlış yerdekiler sarı" },
          { src: "/media/guessfast/04.jpg", alt: "PvP modu: özel oda kur ya da kodla katıl" },
          { src: "/media/guessfast/05.jpg", alt: "Ayarlar" },
          { src: "/media/guessfast/06.jpg", alt: "Günlük challenge sonucu" },
          { src: "/media/guessfast/07.jpg", alt: "Son 7 günün istatistikleri" },
        ],
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
        name: "Today's Word",
        tagline: "Günün kelimesi.",
        description:
          "Her gün herkese aynı İngilizce kelime: anlamı, gerçek hayattan " +
          "örnekleri ve nereden geldiği, ardından kısa bir test. Öğrenilen " +
          "kelimeler sonradan geri geliyor, böylece gerçekten akılda " +
          "kalıyor; günlük takip seriyi tutuyor. Hesap yok.",
        status: "released",
        tags: ["Eğitim", "Dil öğrenme", "Kelime", "Günlük"],
        image: "/apps/todays-word.jpg",
        links: [{ label: "App Store", href: "https://apps.apple.com/app/todays-word-learn-everyday/id6810232514" }],
        media: [
          { src: "/media/today-s-word/01.jpg", alt: "Günün kelimesi" },
          { src: "/media/today-s-word/02.jpg", alt: "Kelimenin geçmişi" },
          { src: "/media/today-s-word/03.jpg", alt: "Tekrar testi" },
          { src: "/media/today-s-word/04.jpg", alt: "Günlük test" },
          { src: "/media/today-s-word/05.jpg", alt: "Test sonucu" },
          { src: "/media/today-s-word/06.jpg", alt: "Yıllık ilerleme" },
          { src: "/media/today-s-word/07.jpg", alt: "Geçmiş bir günün kelimesi" },
          { src: "/media/today-s-word/08.jpg", alt: "Öğrenilen kelimeler" },
          { src: "/media/today-s-word/09.jpg", alt: "Alıştırma" },
          { src: "/media/today-s-word/10.jpg", alt: "Ayarlar" },
        ],
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
        tags: ["Eğitim", "Kelime kartları", "Aralıklı tekrar", "İngilizce"],
        image: "/apps/worddeck.png",
        links: [{ label: "Gizlilik Politikası", href: "/gizlilik/worddeck" }],
        media: [
          { src: "/media/worddeck/01.png", alt: "Günlük deste ekranı" },
          { src: "/media/worddeck/02.png", alt: "Kelime kartı (ön yüz)" },
          { src: "/media/worddeck/03.png", alt: "Kartın arka yüzü ve tekrar aralığı seçimi" },
          { src: "/media/worddeck/04.png", alt: "Desteler" },
          { src: "/media/worddeck/05.png", alt: "Kendini test et: beş şıklı alıştırma testleri" },
          { src: "/media/worddeck/06.png", alt: "Gramer konuları" },
        ],
      },
      {
        name: "Neu-Source",
        tagline: "Ajan hangi bilette, ne harcadı — tek ekranda.",
        description:
          "Next.js ve TypeScript ile yazılan iç platform. neuvikon CLI'ı " +
          "buraya bağlanıyor: kodlama ajanının hangi bilet üzerinde " +
          "çalıştığını ve ne kadar token harcadığını bildiriyor.",
        status: "released",
        tags: ["Geliştirici aracı", "Proje yönetimi", "Yapay zekâ ajanları"],
        links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
        media: [
          { src: "/media/neu-source/01.png", alt: "Ana sayfa ve canlı ajan panosu", wide: true },
          { src: "/media/neu-source/02.png", alt: "Bilete bağlı ajan oturumu", wide: true },
          { src: "/media/neu-source/03.png", alt: "Ajan harcama paneli", wide: true },
          { src: "/media/neu-source/04.png", alt: "Wiki sayfaları ve bağlantı grafiği", wide: true },
          { src: "/media/neu-source/05.png", alt: "Kişisel çalışma alanı", wide: true },
        ],
      },
      {
        name: "Eclosion",
        tagline: "Altı alanda kendini geliştir.",
        description:
          "Alışkanlık takibi uygulaması. İnsanın gelişmesi gereken altı alanı " +
          "ayrı ayrı takip ediyor; günlük tekrar sürdükçe ilerleme birikiyor.",
        status: "building",
        tags: ["Alışkanlık takibi", "Kişisel gelişim", "Oyunlaştırma"],
        image: "/apps/eclosion.png",
        media: [
          { src: "/media/eclosion/01.png", alt: "Dünya seçimi: Gölge Ordusu önizlemesi ve günlük görevler" },
          { src: "/media/eclosion/02.png", alt: "Günün görevleri: rütbe, XP ve alan filtreleri" },
          { src: "/media/eclosion/03.png", alt: "Altı gelişim alanını gösteren durum radarı" },
          { src: "/media/eclosion/04.png", alt: "Gölge Ordusu: asker, güç, moral ve haftalık kapı" },
          { src: "/media/eclosion/05.png", alt: "Ödül mağazası: seri kalkanı ve kişisel ödüller" },
        ],
      },
      {
        name: "Neu-Chat",
        tagline: "Stüdyonun kendi sohbet katmanı.",
        description: "Sohbet uygulaması. Ayrıntılar yayına hazır olduğunda eklenecek.",
        status: "building",
        tags: ["Sohbet", "Mesajlaşma"],
        image: "/apps/neu-chat.png",
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
    "Bir tasarımcı arıyoruz. İlgileniyorsan kısa bir e-posta yeterli: " +
    "kendini birkaç cümleyle anlat ve daha önce tasarladığın işlerden " +
    "birkaçını ekle.",
  openings: [
    {
      title: "Tasarımcı",
      division: "Games · Tech",
      summary:
        "Oyunlarımızın ve uygulamalarımızın arayüzlerini, ekran akışlarını " +
        "ve görsel dilini bizimle birlikte tasarlayacak biri.",
    },
  ],
};
