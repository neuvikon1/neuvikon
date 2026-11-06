import type { ProductPolicy } from "@/lib/privacy/types";

export const guessfast: ProductPolicy = {
  slug: "guessfast",
  name: "GuessFast",
  project: "GuessFast",
  contactEmail: "guessfast.app@gmail.com",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "GuessFast bir sayı tahmin oyunudur. Sıralama ve çok oyunculu oyun için takma adınızı, skorlarınızı, şehir düzeyinde konumunuzu ve Firebase'in ürettiği anonim kimliği işleriz. Oyunda Google AdMob reklamları vardır. Verilerinizi silmek için bize yazabilirsiniz.",
    scope:
      "Bu metin, Android ve iOS için yayımlanan sayı tahmin oyunu GuessFast'i ve oyunun verilerini tuttuğu Firebase altyapısını kapsar.",
    rows: [
      {
        data: "Takma ad",
        purpose: "Sıralama tablosunda görünmek, çok oyunculu (PVP) oyun",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Silinmesini isteyene kadar",
      },
      {
        data: "Oyun skorları, günlük challenge sonuçları",
        purpose: "Günlük ve haftalık sıralamalar, oyun istatistiklerinizi göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Silinmesini isteyene kadar",
      },
      {
        data: "Şehir düzeyinde yaklaşık konum (isteğe bağlı)",
        purpose:
          "Günlük challenge'da şehir bazında sıralama. App Store etiketi ayrıca reklam ve analitik amacını beyan eder; aşağıdaki Mağaza gizlilik beyanları bölümüne bakın",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Silinmesini isteyene kadar",
      },
      {
        data: "Firebase'in ürettiği anonim kullanıcı kimliği",
        purpose: "Oyun verilerinizi tutmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Silinmesini isteyene kadar",
      },
      {
        data: "Yukarıdaki oyun verileri",
        purpose: "Uygulama performansını iyileştirmek",
        legalBasis: "KVKK m.5/2-(f): oyunu geliştirme meşru menfaati",
        retention: "Silinmesini isteyene kadar",
      },
      {
        data: "Google'ın topladığı cihaz tanımlayıcıları ve kullanım verileri",
        purpose: "Reklam göstermek",
        legalBasis:
          "KVKK m.5/2-(f): ücretsiz oyunu reklamla finanse etme meşru menfaati; kişiselleştirilmiş reklam için gereken yerde KVKK m.5/1: açık rıza",
        retention: "Google'ın kendi süreleri; politikasına bakın",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek ve silme taleplerini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap verme meşru menfaati",
        retention: "Konu kapandıktan sonra silinmesini isteyene kadar",
      },
    ],
    collection:
      "Takma adı siz girersiniz. Skorlar oynadıkça oluşur. Yaklaşık konum isteğe bağlıdır. Anonim kimliği Firebase otomatik üretir. Reklam verilerini Google otomatik toplar.",
    required:
      "Konum isteğe bağlıdır. Takma ad, sıralama tablosunda görünmek için gerekir.",
    notCollected: [
      "Kesin adresiniz ya da GPS koordinatlarınız saklanmaz ve paylaşılmaz.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Oyun verilerini saklar, anonim kullanıcı kimliğini üretir.",
        location: "Google Cloud altyapısı",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Reklam gösterir. Cihaz tanımlayıcıları ve kullanım verilerini kendi politikasına göre toplayabilir.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play ve App Store",
        role: "Oyunu dağıtır ve indirme kayıtlarını kendi politikalarına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Destek e-postalarının saklandığı e-posta hizmeti.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Oyun verileri Firebase (Google Cloud), reklam verileri Google altyapısında işlenir. Bu altyapı Türkiye dışındadır; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Destek e-postaları da Google'ın yurt dışındaki sunucularında saklanır.",
    security:
      "Veriler aktarım sırasında şifrelenir ve Firebase (Google Cloud) altyapısında saklanır.",
    deletion:
      "Hesabınızı ve verilerinizi silmek için guessfast.app@gmail.com adresine yazın. Talebiniz e-postayla alınır.",
    children:
      "GuessFast App Store'da 4+, Google Play'de PEGI 3 yaş derecesiyle listelenir ve reklam içerir. Bu dereceler içeriğin uygunluğunu gösterir. Veli iseniz ve çocuğunuzun verisinin silinmesini istiyorsanız bize yazın, sileriz.",
    extra: [
      {
        title: "Sıralamalar ve diğer oyuncular",
        paragraphs: [
          "Takma adınız ve skorlarınız sıralama tablolarında ve çok oyunculu oyunda diğer oyunculara görünür. Gerçek adınızı takma ad olarak yazmak zorunda değilsiniz.",
        ],
      },
      {
        title: "Mağaza gizlilik beyanları",
        paragraphs: [
          "App Store'daki gizlilik etiketinde izleme için iletişim bilgisi; üçüncü taraf reklam için yaklaşık konum ve iletişim bilgisi, analitik için yaklaşık konum, ürün kişiselleştirme için iletişim bilgisi kimliğinize bağlı olarak beyan edilir. Google Play veri güvenliği bölümünde ise isteğe bağlı yaklaşık konumun uygulama işlevi için toplandığı ve üçüncü taraflarla paylaşılmadığı beyan edilir.",
          "Reklamlar hakkında: https://policies.google.com/technologies/ads . Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites",
        ],
      },
    ],
  },
  en: {
    summary:
      "GuessFast is a number guessing game. For leaderboards and multiplayer we process your nickname, your scores, your city-level location and an anonymous ID generated by Firebase. The game shows Google AdMob ads. To delete your data, write to us.",
    scope:
      "This policy covers GuessFast, a number guessing game for Android and iOS, and the Firebase infrastructure that holds its data.",
    rows: [
      {
        data: "Nickname",
        purpose: "Appearing on leaderboards, multiplayer (PVP) play",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you ask us to delete it",
      },
      {
        data: "Game scores, daily challenge results",
        purpose: "Daily and weekly leaderboards, showing your game stats",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you ask us to delete it",
      },
      {
        data: "City-level approximate location (optional)",
        purpose:
          "City rankings in the daily challenge. The App Store label also declares advertising and analytics purposes; see Store privacy declarations below",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you ask us to delete it",
      },
      {
        data: "Anonymous user ID generated by Firebase",
        purpose: "Keeping your game data",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you ask us to delete it",
      },
      {
        data: "The game data above",
        purpose: "Improving app performance",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in improving the game",
        retention: "Until you ask us to delete it",
      },
      {
        data: "Device identifiers and usage data collected by Google",
        purpose: "Showing ads",
        legalBasis:
          "GDPR Art. 6(1)(f): legitimate interest in funding a free game with ads; Art. 6(1)(a): consent where personalised ads require it",
        retention: "Google's own periods; see its policy",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering support and deletion requests",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "After the matter closes, until you ask us to delete it",
      },
    ],
    collection:
      "You enter the nickname. Scores are created as you play. Approximate location is optional. Firebase generates the anonymous ID automatically. Google collects ad data automatically.",
    required:
      "Location is optional. A nickname is needed to appear on leaderboards.",
    notCollected: [
      "Your exact address or GPS coordinates are not stored or shared.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Stores game data and generates the anonymous user ID.",
        location: "Google Cloud infrastructure",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Shows ads. May collect device identifiers and usage data under its own policy.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play and the App Store",
        role: "Distribute the game and handle download records under their own policies.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Email service where support messages are stored.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Game data is processed on Firebase (Google Cloud) and ad data on Google's infrastructure, outside Turkey, so your data may leave your country. For users in Turkey this is a transfer abroad under KVKK Art. 9. Support email is stored on Google's servers too.",
    security:
      "Data is encrypted in transit and stored on Firebase (Google Cloud) infrastructure.",
    deletion:
      "To delete your account and data, write to guessfast.app@gmail.com. Requests are taken by email.",
    children:
      "GuessFast is listed as 4+ on the App Store and PEGI 3 on Google Play, and it contains ads. These ratings describe how suitable the content is. If you are a parent and want your child's data deleted, write to us and we will delete it.",
    extra: [
      {
        title: "Leaderboards and other players",
        paragraphs: [
          "Your nickname and scores are visible to other players on leaderboards and in multiplayer. You do not have to use your real name as a nickname.",
        ],
      },
      {
        title: "Store privacy declarations",
        paragraphs: [
          "The App Store privacy label declares contact info used for tracking, and, linked to your identity, coarse location and contact info for third-party advertising, coarse location for analytics, and contact info for product personalisation. The Google Play data safety section declares optional approximate location collected for app functionality and no sharing with third parties.",
          "About ads: https://policies.google.com/technologies/ads . How Google uses this data: https://policies.google.com/technologies/partner-sites",
        ],
      },
    ],
  },
};
