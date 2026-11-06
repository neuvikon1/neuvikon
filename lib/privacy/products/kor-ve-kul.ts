import type { ProductPolicy } from "@/lib/privacy/types";

export const korVeKul: ProductPolicy = {
  slug: "kor-ve-kul",
  name: "Kor ve Kül",
  project: "Kor ve Kül",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Kor ve Kül'de hesap yoktur. Koşularınız, ayarlarınız ve başarımlarınız yalnızca cihazınızda durur, bize gelmez. Oyunda reklam ve analitik yoktur; satın alma işlemini Google Play yürütür.",
    scope:
      "Bu metin, Neuvikon'un Android için yayımladığı tek oyunculu kart oyunu Kor ve Kül'ü kapsar. Oyunun bir sunucusu yoktur.",
    rows: [
      {
        data: "Satın alma durumu (tam oyun ürünü, işlem sonucu)",
        purpose: "Akt 2 ve 3'ü açmak, satın almayı geri yüklemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Durum cihazınızda kalır; ödeme kaydını Google Play tutar",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): meşru menfaat",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Satın alma bilgisi, işlemi başlattığınızda Google Play üzerinden otomatik olarak gelir. E-posta verileri bize yazdığınızda sizin göndermenizle ulaşır. Oyun kayıtları cihazınızda otomatik oluşur ve dışarı gönderilmez.",
    required:
      "Akt 1 satın alma yapmadan oynanır. Satın alma isteğe bağlıdır, yapmazsanız yalnızca Akt 2 ve 3 kapalı kalır. Destek için bize yazmak da isteğe bağlıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da oyun içi hesap.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Reklam kimliği. Oyunda reklam ve analitik aracı yoktur.",
      "Kart bilgisi. Ödeme bilgilerinizi hiç görmeyiz.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Oyunu dağıtır, satın almayı ve ödemeyi yürütür. Bu verileri kendi gizlilik politikasına göre işler.",
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
      "Satın almada verileri doğrudan Google Play'e siz iletirsiniz. Destek e-postaları Google'ın yurt dışındaki sunucularında saklanır ve bu, KVKK m.9 kapsamında yurt dışına aktarım sayılabilir. Bizden geçen başka bir aktarım yoktur.",
    security:
      "Sunucumuz olmadığı için oyun verileriniz bizde birikmez. Cihazınızdaki kayıtların korunması cihazınızın güvenliğine bağlıdır.",
    deletion:
      "Oyunu kaldırdığınızda ya da uygulama verilerini temizlediğinizde cihazınızdaki tüm kayıtlar silinir ve bu geri alınamaz. Satın alma geçmişi Google hesabınızda kalır. Destek yazışmalarınızın silinmesi için bize yazabilirsiniz.",
    children:
      "Kor ve Kül 13 yaş ve üzeri oyuncular içindir, çünkü şiddet ve korku teması içerir. Oyun yaş sormaz. Çocuklardan bilerek kişisel veri toplamayız; 13 yaşından küçük birine ait veri olduğunu öğrenirsek sileriz.",
  },
  en: {
    summary:
      "Kor ve Kül has no accounts. Your runs, settings and achievements stay on your device and never reach us. The game has no ads or analytics; Google Play handles purchases.",
    scope:
      "This policy covers Kor ve Kül, a single-player card game published by Neuvikon for Android. The game has no server.",
    rows: [
      {
        data: "Purchase status (full game product, transaction result)",
        purpose: "Unlocking Acts 2 and 3, restoring the purchase",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Status stays on your device; Google Play keeps the payment record",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Purchase status arrives automatically through Google Play when you start a purchase. Email data reaches us when you write to us. Game saves are created automatically on your device and are not sent anywhere.",
    required:
      "Act 1 is playable without paying. Buying is optional; without it only Acts 2 and 3 stay locked. Writing to us is optional too.",
    notCollected: [
      "Name, email, phone number or an in-game account.",
      "Location, contacts, photos, camera or microphone data.",
      "Advertising ID. The game has no ads and no analytics tools.",
      "Card details. We never see your payment information.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Distributes the game and handles purchases and payment under its own privacy policy.",
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
      "When you buy, you give your data directly to Google Play. Support email is stored on Google's servers outside Turkey and may leave your country. No other transfer passes through us.",
    security:
      "With no server, your game data does not build up with us. Saves on your device are protected by your device's own security.",
    deletion:
      "Uninstalling the game or clearing its app data deletes all saves on your device, permanently. Purchase history stays in your Google account. Write to us to have your support messages deleted.",
    children:
      "Kor ve Kül is for players aged 13 and over because it has violent and horror themes. The game does not ask your age. We do not knowingly collect personal data from children and delete it if we learn it belongs to someone under 13.",
  },
};
