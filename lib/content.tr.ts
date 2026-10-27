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
    capabilities: [],
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
        image: "/apps/pushbump.webp",
        media: [
          { src: "/media/pushbump/store-en-01.webp", alt: "Push. Bump. Win. — arcade şekil dövüşü" },
          { src: "/media/pushbump/store-en-02.webp", alt: "17 eşsiz şekil kahraman" },
          { src: "/media/pushbump/store-en-03.webp", alt: "Kahramanını seç" },
          { src: "/media/pushbump/store-en-04.webp", alt: "Sonsuz dalgalara dayan" },
          { src: "/media/pushbump/store-en-05.webp", alt: "Seviye atla, yapını güçlendir" },
          { src: "/media/pushbump/store-en-06.webp", alt: "Efsanevi görünümleri aç" },
          { src: "/media/pushbump/store-en-07.webp", alt: "Günlük ödüller, görevler ve seriler" },
        ],
      },
      {
        name: "Neu-Pummel Party",
        tagline: "İki ila sekiz telefon, kırk mini oyun, tek oda.",
        description:
          "Telefonlarla oynanan parti oyunu. Biri oda kurar, herkes aynı " +
          "Wi-Fi'deki listeden katılır — IP yazmak yok, hesap açmak yok; " +
          "internet üzerinden oynamak için altı haneli oda kodu var. Her " +
          "turda kırk mini oyundan biri gelir, her birinin üç arena varyantı " +
          "ve bot yapay zekâsı vardır. Depoda tek bir ikili sanat varlığı " +
          "yok: tüm görseller ve sesler çalışma anında kodla üretiliyor. " +
          "Reklam ve uygulama içi satın alma yok.",
        status: "building",
        tags: ["Parti oyunu", "Mini oyunlar", "Yerel çok oyunculu", "2-8 oyuncu"],
        image: "/apps/neuparty.webp",
        media: [
          { src: "/media/neu-pummel-party/store-tr-01.webp", alt: "40 mini oyun, tek parti" },
          { src: "/media/neu-pummel-party/store-tr-02.webp", alt: "Aynı Wi-Fi, anında oda" },
          { src: "/media/neu-pummel-party/store-tr-03.webp", alt: "Hızlı düşün, hızlı dokun" },
          { src: "/media/neu-pummel-party/store-tr-04.webp", alt: "Her tur yeni bir oyun" },
          { src: "/media/neu-pummel-party/store-tr-05.webp", alt: "Takım 2v2 ve Grand Prix" },
          { src: "/media/neu-pummel-party/store-tr-06.webp", alt: "Reklam yok, sadece parti" },
        ],
      },
      {
        name: "Shardbound",
        tagline: "Her öldürülen bir ruh bırakır. Her ruh yeniden ayağa kalkabilir.",
        description:
          "PC ve Android için yukarıdan bakışlı bir roguelite zindan oyunu. " +
          "Beş kahraman, dallanan odalardan oluşan üç bölüm, elitler, mini " +
          "boss'lar ve boss'lar. Nekromansör düşenleri gölge ordusu olarak " +
          "diriltiyor; ordu seviye atlıyor, ekipman kuşanıyor ve diziliş " +
          "emirleri alıyor. Koşular arasında kamptaki kalıcı geliştirmeler " +
          "kristallerle alınıyor; Heat ayarları her yeni koşuyu daha zor ve " +
          "daha ödüllü yapıyor.",
        status: "building",
        tags: ["Roguelite", "Zindan", "Aksiyon", "PC", "Android"],
        image: "/apps/shardbound.webp",
        media: [
          { src: "/media/shardbound/01.webp", alt: "Kamp: ateşin başında kahramanını seç", wide: true },
          { src: "/media/shardbound/02.webp", alt: "Kahraman paneli: Nekromansör ve Arise yeteneği", wide: true },
          { src: "/media/shardbound/03.webp", alt: "1. bölüm haritası: Yosunlu Katakomplar, yolunu seç", wide: true },
          { src: "/media/shardbound/04.webp", alt: "Nekromansör dört iskeletle odaya giriyor", wide: true },
          { src: "/media/shardbound/05.webp", alt: "Çatışma: gölge ordusu goblinlere ve yaban domuzuna karşı", wide: true },
          { src: "/media/shardbound/06.webp", alt: "Kutsama seçimi: yol için bir lütuf", wide: true },
          { src: "/media/shardbound/07.webp", alt: "Gölge Ordusu: seviye, ekipman ve diziliş emirleri", wide: true },
          { src: "/media/shardbound/08.webp", alt: "Demirhane: kalıcı geliştirmeler ve silah planları", wide: true },
          { src: "/media/shardbound/09.webp", alt: "Üç bölümün boss'ları ve mini boss'ları", wide: true },
        ],
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
        image: "/apps/undercard.webp",
        media: [
          { src: "/media/undercard/01.webp", alt: "Ana menü ve günlük meydan okuma" },
          { src: "/media/undercard/02.webp", alt: "Botlarla oyun lobisi" },
          { src: "/media/undercard/03.webp", alt: "Oyun masası" },
          { src: "/media/undercard/04.webp", alt: "Kart çekme: değiştir ya da at" },
          { src: "/media/undercard/05.webp", alt: "Olay kartı: Vergi" },
          { src: "/media/undercard/06.webp", alt: "Tur sonucu ve puan tablosu" },
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
        image: "/apps/edgeout.webp",
        media: [
          { src: "/media/edgeout/01.webp", alt: "Başlangıç dizilimi: 61 hücrelik tahtada 14 siyah ve 14 beyaz küre" },
          { src: "/media/edgeout/02.webp", alt: "Orta oyun: seçili üç beyaz küre ve olası hamle yönleri" },
          { src: "/media/edgeout/03.webp", alt: "Duvar yerleştirme modu: uygun kenarlar vurgulu" },
          { src: "/media/edgeout/04.webp", alt: "Siyahın yerleştirdiği duvar beyazların önünü kesiyor" },
          { src: "/media/edgeout/05.webp", alt: "Giriş ekranı" },
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
        image: "/apps/guessfast.webp",
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/app/guessfast/id6758861605",
          },
        ],
        media: [
          { src: "/media/guessfast/store-tr-01.webp", alt: "5 zekâ oyunu tek uygulamada" },
          { src: "/media/guessfast/store-tr-02.webp", alt: "Gizli sayıyı çöz" },
          { src: "/media/guessfast/store-tr-03.webp", alt: "Ne kadar yakınsan o kadar puan" },
          { src: "/media/guessfast/store-tr-04.webp", alt: "Her gün yeni bir film" },
          { src: "/media/guessfast/store-tr-05.webp", alt: "Ünlüyü ipuçlarından bul" },
          { src: "/media/guessfast/store-tr-06.webp", alt: "Hangisi daha çok?" },
          { src: "/media/guessfast/store-tr-07.webp", alt: "Paylaş, sıralamada yüksel" },
          { src: "/media/guessfast/store-tr-08.webp", alt: "Seviye atla, başarım topla" },
          { src: "/media/guessfast/01.webp", alt: "Ana menü" },
          { src: "/media/guessfast/02.webp", alt: "Pratik oyunu: her tahminden sonra doğru rakam sayısı" },
          { src: "/media/guessfast/03.webp", alt: "Göstergeli mod: doğru yerdeki rakamlar yeşil, yanlış yerdekiler sarı" },
          { src: "/media/guessfast/04.webp", alt: "PvP modu: özel oda kur ya da kodla katıl" },
          { src: "/media/guessfast/05.webp", alt: "Ayarlar" },
          { src: "/media/guessfast/06.webp", alt: "Günlük challenge sonucu" },
          { src: "/media/guessfast/07.webp", alt: "Son 7 günün istatistikleri" },
        ],
      },
      {
        name: "Kor ve Kül",
        tagline: "Ateşi harla ya da soğut — onda taşar.",
        description:
          "Türk-Altay mitolojisinden beslenen, dikey ekran mobil roguelike " +
          "deste kurma oyunu. Genç ocak bekçisi Alaz, sönmüş Ulu Ocak'ı yeniden " +
          "yakmak için yeraltına iner ve oradaki yaratıklarla kartlarla " +
          "savaşır. Her savaşın kalbinde Isı var: turlar arasında kalır, " +
          "yükseldikçe Alaz'ı güçlendirir, ama 10'a ulaşınca taşar ve patlar; " +
          "soğutmak ise boşaltılan ısıyı blok ya da hasara çevirir. Dallanan " +
          "harita, olaylar, tüccar, dinlenip kart dövülen ocak, tılsımlar ve " +
          "boss'lar.",
        status: "building",
        tags: ["Roguelike", "Deste kurma", "Türk mitolojisi", "Tek oyunculu"],
        image: "/apps/kor-ve-kul.webp",
        media: [
          { src: "/media/kor-ve-kul/01.webp", alt: "Ana menü" },
          { src: "/media/kor-ve-kul/02.webp", alt: "Savaş: Isı göstergesi, enerji ve el" },
          { src: "/media/kor-ve-kul/03.webp", alt: "Kart yakın görünümü" },
          { src: "/media/kor-ve-kul/04.webp", alt: "Aşağıdan yukarı, boss'a tırmanılan harita" },
          { src: "/media/kor-ve-kul/05.webp", alt: "Olay: Yaşlı Kam" },
          { src: "/media/kor-ve-kul/06.webp", alt: "Ocak: dinlen ya da kart döv" },
          { src: "/media/kor-ve-kul/07.webp", alt: "Gezgin Tüccar" },
          { src: "/media/kor-ve-kul/08.webp", alt: "Hazine sandığı" },
          { src: "/media/kor-ve-kul/09.webp", alt: "Boss tılsımı seçimi" },
          { src: "/media/kor-ve-kul/10.webp", alt: "Zafer ve koşu özeti" },
        ],
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
    capabilities: [],
    projects: [
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
        image: "/apps/worddeck.webp",
        links: [{ label: "Gizlilik Politikası", href: "/gizlilik/worddeck" }],
        media: [
          { src: "/media/worddeck/store-tr-01.webp", alt: "Sınav kelimelerini kalıcı öğren" },
          { src: "/media/worddeck/store-tr-02.webp", alt: "Kartı çevir, anlamını gör" },
          { src: "/media/worddeck/store-tr-03.webp", alt: "Unutmadan önce tekrar et" },
          { src: "/media/worddeck/store-tr-04.webp", alt: "Sınav tarzı testler" },
          { src: "/media/worddeck/store-tr-05.webp", alt: "Gramer, sınavın diliyle" },
          { src: "/media/worddeck/store-tr-06.webp", alt: "Her gün biraz, seri bozulmasın" },
          { src: "/media/worddeck/01.webp", alt: "Günlük deste ekranı" },
          { src: "/media/worddeck/02.webp", alt: "Kelime kartı (ön yüz)" },
          { src: "/media/worddeck/03.webp", alt: "Kartın arka yüzü ve tekrar aralığı seçimi" },
          { src: "/media/worddeck/04.webp", alt: "Desteler" },
          { src: "/media/worddeck/05.webp", alt: "Kendini test et: beş şıklı alıştırma testleri" },
          { src: "/media/worddeck/06.webp", alt: "Gramer konuları" },
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
        image: "/apps/neu-source.webp",
        links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
        media: [
          { src: "/media/neu-source/01.webp", alt: "Ana sayfa ve canlı ajan panosu", wide: true },
          { src: "/media/neu-source/02.webp", alt: "Bilete bağlı ajan oturumu", wide: true },
          { src: "/media/neu-source/03.webp", alt: "Ajan harcama paneli", wide: true },
          { src: "/media/neu-source/04.webp", alt: "Wiki sayfaları ve bağlantı grafiği", wide: true },
          { src: "/media/neu-source/05.webp", alt: "Kişisel çalışma alanı", wide: true },
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
        image: "/apps/eclosion.webp",
        media: [
          { src: "/media/eclosion/store-tr-01.webp", alt: "Hayatını seviye atla" },
          { src: "/media/eclosion/store-tr-02.webp", alt: "Her görev XP kazandırır" },
          { src: "/media/eclosion/store-tr-03.webp", alt: "Her seviye bir asker" },
          { src: "/media/eclosion/store-tr-04.webp", alt: "Üç gölge, tek elit" },
          { src: "/media/eclosion/store-tr-05.webp", alt: "Tek yemin, tek ejderha" },
          { src: "/media/eclosion/store-tr-06.webp", alt: "Seri bozulmasın" },
          { src: "/media/eclosion/store-koru-tr-01.webp", alt: "Koru dünyası: hayatını seviye atla" },
          { src: "/media/eclosion/store-koru-tr-02.webp", alt: "Gelişim ağacı: dal dal büyü" },
          { src: "/media/eclosion/store-koru-tr-03.webp", alt: "Her seviye bir tohum" },
          { src: "/media/eclosion/store-koru-tr-04.webp", alt: "Aşı tezgâhı: üç bitki, tek elit" },
          { src: "/media/eclosion/store-koru-tr-05.webp", alt: "Tek yemin, tek ağaç" },
          { src: "/media/eclosion/store-koru-tr-06.webp", alt: "Gelişim takvimi: seri bozulmasın" },
          { src: "/media/eclosion/01.webp", alt: "Dünya seçimi: Gölge Ordusu önizlemesi ve günlük görevler" },
          { src: "/media/eclosion/02.webp", alt: "Günün görevleri: rütbe, XP ve alan filtreleri" },
          { src: "/media/eclosion/03.webp", alt: "Altı gelişim alanını gösteren durum radarı" },
          { src: "/media/eclosion/04.webp", alt: "Gölge Ordusu: asker, güç, moral ve haftalık kapı" },
          { src: "/media/eclosion/05.webp", alt: "Ödül mağazası: seri kalkanı ve kişisel ödüller" },
        ],
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
    capabilities: [],
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
    { label: "Ekip", value: "7 kişi" },
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
  team: ["Vural Bilgin", "Oğulcan Bozkurt", "Arda Özan", "İrem Bozkurt", "Selinay Kıyak", "Eylül Dardoğan", "Zeynep Saygı"],
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
