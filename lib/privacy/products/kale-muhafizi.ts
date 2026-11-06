import type { ProductPolicy } from "@/lib/privacy/types";

export const kaleMuhafizi: ProductPolicy = {
  slug: "kale-muhafizi",
  name: "Kale Muhafızı",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Kale Muhafızı çevrimdışı çalışır, hesap açmanızı istemez. Kaleniz, ilerlemeniz ve ses ayarlarınız yalnızca cihazınızda tutulur. Oyunda reklam, satın alma ve analitik servisi yoktur.",
    scope:
      "Bu metin, Neuvikon'un yayımladığı idle kale savunma oyunu Kale Muhafızı'nın Android ve Windows sürümlerini kapsar. Oyunun sunucusu ve bulut kaydı yoktur.",
    rows: [
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Oyuncu desteği vermek",
        legalBasis: "KVKK m.5/2-(f): destek taleplerini cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Kayıt dosyası ve ayarlar oyunu oynarken cihazınızda otomatik oluşur ve dışarı gönderilmez. E-posta verileri yalnızca siz bize yazınca ulaşır.",
    required: "Oyun için kişisel veri gerekmez. Destek için bize yazmak isteğe bağlıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da oyun içi hesap.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Reklam kimliği. Oyunda reklam ağı yoktur.",
      "Oyun içi olaylar. Oyun analitik verisi göndermez.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Android sürümünü dağıtır ve mağaza verilerini kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Destek e-postalarının tutulduğu e-posta hizmeti.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Oyun verisi yurt dışına çıkmaz, çünkü cihazınızdan hiç ayrılmaz. Bize yazarsanız mesajınız Google'ın yurt dışındaki sunucularında tutulur; bu, KVKK m.9 kapsamında yurt dışına aktarım sayılabilir.",
    security:
      "Kayıt dosyası şifresizdir ve cihazınızın güvenliğiyle korunur. Elimizde oyuncu verisi birikmez.",
    deletion:
      "Ayarlar > Kaydı Sıfırla ilerlemeyi ve yedek dosyasını siler; ses ve hareket ayarları kalır. Android'de oyunu kaldırmak ya da uygulama verilerini temizlemek her şeyi siler. Windows'ta kayıt klasörü AppData\\LocalLow\\neuvikon\\Kale Muhafizi altındadır, ayarlar Windows kayıt defterinde tutulur. Destek yazışmanızın silinmesi için bize yazın.",
    children:
      "Kale Muhafızı genel kitleye yöneliktir, çocuklar da oynayabilir. Oyun yaş, ad ya da iletişim bilgisi sormaz ve oyuncudan veri toplamaz. Bir çocuk bize yazdıysa velisinin talebiyle yazışmayı sileriz.",
    extra: [
      {
        title: "Oyun motoru ve izinler",
        paragraphs: [
          "Oyun Unity ile yapıldı. Unity Analytics, tanılama ve reklam servisleri projede kapalıdır, proje Unity Cloud'a bağlı değildir ve oyunun kodu ağ bağlantısı açmaz. Android sürümü internet izni dahil hiçbir tehlikeli izin istemez.",
        ],
      },
      {
        title: "Android yedekleme",
        paragraphs: [
          "Android yedeklemesi açıksa cihazınız kaydı kendi Google hesabınıza yedekleyebilir. Bu kopya size aittir, biz erişemeyiz.",
        ],
      },
      {
        title: "Bu sayfa",
        paragraphs: [
          "Bu sayfayı açtığınızda neuvikon.com'un barındırma sağlayıcısı IP adresi, tarayıcı bilgisi ve zaman damgası gibi standart erişim kayıtları tutabilir. Ayrıntı sitenin genel gizlilik politikasındadır.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Kale Muhafızı works offline and needs no account. Your castle, progress and sound settings are kept only on your device. The game has no ads, no purchases and no analytics service.",
    scope:
      "This policy covers the Android and Windows versions of Kale Muhafızı, an idle castle defence game published by Neuvikon. The game has no server and no cloud save.",
    rows: [
      {
        data: "Your email address and message when you write to us",
        purpose: "Providing player support",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering support requests",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "The save file and settings are created automatically on your device as you play and are not sent anywhere. Email data reaches us only when you write.",
    required: "The game needs no personal data. Writing to us for support is optional.",
    notCollected: [
      "Name, email, phone number or an in-game account.",
      "Location, contacts, photos, camera or microphone data.",
      "Advertising ID. The game has no ad network.",
      "In-game events. The game sends no analytics data.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Distributes the Android version and handles store data under its own policy.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Email service that holds support messages.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Game data does not go abroad because it never leaves your device. If you write to us, your message is held on Google's servers, which may be outside your country.",
    security:
      "The save file is not encrypted and is protected by your device's security. No player data builds up with us.",
    deletion:
      "Settings > Reset Save deletes your progress and the backup file; sound and motion settings stay. On Android, uninstalling the game or clearing its app data deletes everything. On Windows, the save folder is AppData\\LocalLow\\neuvikon\\Kale Muhafizi and settings are in the Windows registry. Write to us to have your support messages deleted.",
    children:
      "Kale Muhafızı is made for a general audience and children can play it too. The game asks for no age, name or contact details and collects no data from players. If a child has written to us, we delete the conversation at a parent's request.",
    extra: [
      {
        title: "Game engine and permissions",
        paragraphs: [
          "The game is made with Unity. Unity Analytics, diagnostics and ads services are off in this project, the project is not linked to Unity Cloud, and the game's code opens no network connection. The Android version requests no dangerous permissions and no internet permission.",
        ],
      },
      {
        title: "Android backup",
        paragraphs: [
          "If Android backup is on, your device may back up the save to your own Google account. That copy is yours and we cannot access it.",
        ],
      },
      {
        title: "This page",
        paragraphs: [
          "When you open this page, the hosting provider of neuvikon.com may keep standard access logs such as IP address, browser details and a timestamp. See the site's general privacy policy for details.",
        ],
      },
    ],
  },
};
