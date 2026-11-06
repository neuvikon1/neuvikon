import type { ProductPolicy } from "@/lib/privacy/types";

export const zarEfsanesi: ProductPolicy = {
  slug: "zar-efsanesi",
  name: "Zar Efsanesi",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Zar Efsanesi'nde hesap yoktur. Koşularınız ve açtığınız içerikler cihazınızdaki kayıt dosyasında kalır, bize gönderilmez. Oyunda reklam, satın alma, bulut kaydı ve analitik servisi yoktur.",
    scope:
      "Bu metin, Neuvikon'un yayımladığı zar tahtalı roguelike Zar Efsanesi'nin Android ve Windows sürümlerini kapsar. Oyun tek başına çalışır, bağlandığı bir sunucusu yoktur.",
    rows: [
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Sorunuzu ya da hata bildiriminizi cevaplamak",
        legalBasis: "KVKK m.5/2-(f): oyuncuya destek verme menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Kayıt dosyası ve ayarlar oyun sırasında cihazınızda otomatik oluşur. Bize yalnızca sizin gönderdiğiniz e-postalar ulaşır.",
    required: "Oynamak için hiçbir kişisel veri gerekmez. E-posta yazmak isteğe bağlıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da hesap bilgisi.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Reklam kimliği ve kullanım istatistiği.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Android sürümünü dağıtır. Mağaza verileri Google'ın kendi politikasına tabidir.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Destek e-postalarımızın saklandığı hizmet.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Oyun verileriniz cihazınızda kalır. Bize yazdığınız e-postalar Google'ın yurt dışındaki sunucularında saklanır ve bu, KVKK m.9 kapsamında yurt dışına aktarım sayılabilir.",
    security:
      "Kayıt dosyası şifrelenmez, cihazınızın güvenliğiyle korunur. Sunucumuz olmadığı için sizden veri biriktirmeyiz.",
    deletion:
      "Android'de oyunu kaldırmak ya da uygulama verilerini temizlemek kayıtları siler ve geri getirilemez. Windows'ta kayıtlar AppData\\LocalLow\\neuvikon\\Zar Efsanesi altındadır, ayarlar Windows kayıt defterinde tutulur. Destek yazışmalarınızın silinmesi için bize yazın.",
    children:
      "Zar Efsanesi genel kitleye yöneliktir, çocuklar da oynayabilir. Oyun yaş, ad ya da iletişim bilgisi sormaz ve oyuncudan veri toplamaz. Bir çocuk bize yazdıysa velisinin talebiyle yazışmayı sileriz.",
    extra: [
      {
        title: "Oyun motoru ve izinler",
        paragraphs: [
          "Oyun Unity ile yapıldı. Projede Unity Analytics, tanılama ve bulut servisleri kapalıdır, proje Unity Cloud'a bağlı değildir ve oyunun kodu ağ bağlantısı açmaz. Android'de oyun yalnızca titreşim için izin kullanır; konum, kamera, mikrofon ya da rehber izni istemez.",
        ],
      },
      {
        title: "Android yedekleme",
        paragraphs: [
          "Android yedeklemesi açıksa kayıtlarınız kendi Google hesabınıza yedeklenebilir. Bu kopyaya erişimimiz yoktur.",
        ],
      },
      {
        title: "Bu sayfa",
        paragraphs: [
          "Oyundaki Gizlilik Politikası düğmesi bu sayfayı tarayıcınızda açar. neuvikon.com'un barındırma sağlayıcısı IP adresi, tarayıcı bilgisi ve zaman damgası gibi standart erişim kayıtları tutabilir. Ayrıntı sitenin genel gizlilik politikasındadır.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Zar Efsanesi has no accounts. Your runs and unlocks stay in a save file on your device and are not sent to us. The game has no ads, no purchases, no cloud save and no analytics service.",
    scope:
      "This policy covers the Android and Windows versions of Zar Efsanesi, a dice-board roguelike published by Neuvikon. The game runs on its own and has no server to connect to.",
    rows: [
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your question or bug report",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in supporting players",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "The save file and settings are created automatically on your device during play. Only the emails you send reach us.",
    required: "No personal data is needed to play. Emailing us is optional.",
    notCollected: [
      "Name, email, phone number or account details.",
      "Location, contacts, photos, camera or microphone data.",
      "Advertising ID and usage statistics.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Distributes the Android version. Store data falls under Google's own policy.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Service where our support email is stored.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Your game data stays on your device. Emails you send us are stored on Google's servers, which may be outside your country.",
    security:
      "The save file is not encrypted and relies on your device's security. With no server, we do not build up data about you.",
    deletion:
      "On Android, uninstalling the game or clearing its app data deletes your saves for good. On Windows, saves are under AppData\\LocalLow\\neuvikon\\Zar Efsanesi and settings are in the Windows registry. Write to us to have your support messages deleted.",
    children:
      "Zar Efsanesi is made for a general audience and children can play it too. The game asks for no age, name or contact details and collects no data from players. If a child has written to us, we delete the conversation at a parent's request.",
    extra: [
      {
        title: "Game engine and permissions",
        paragraphs: [
          "The game is made with Unity. Unity Analytics, diagnostics and cloud services are off in this project, the project is not linked to Unity Cloud, and the game's code opens no network connection. On Android the game uses a permission only for vibration; it does not request location, camera, microphone or contacts.",
        ],
      },
      {
        title: "Android backup",
        paragraphs: [
          "If Android backup is on, your saves may be backed up to your own Google account. We have no access to that copy.",
        ],
      },
      {
        title: "This page",
        paragraphs: [
          "The Privacy Policy button in the game opens this page in your browser. The hosting provider of neuvikon.com may keep standard access logs such as IP address, browser details and a timestamp. See the site's general privacy policy for details.",
        ],
      },
    ],
  },
};
