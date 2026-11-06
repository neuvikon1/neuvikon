import type { ProductPolicy } from "@/lib/privacy/types";

export const saksi: ProductPolicy = {
  slug: "saksi",
  name: "Saksı",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Saksı sakin bir tıklama oyunudur ve sizden hiçbir bilgi istemez. Bitkiniz ve ayarlarınız yalnızca telefonunuzda saklanır, bize gelmez. Oyunda hesap, reklam, satın alma ve analitik yoktur.",
    scope:
      "Bu metin, Neuvikon'un Android için yayımladığı Saksı oyununu kapsar. Oyunun sunucusu yoktur.",
    rows: [
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Yazdığınız konuyu cevaplamak",
        legalBasis: "KVKK m.5/2-(f): oyuncuların sorularını cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Oyun durumu ve bir önceki kaydın yedeği telefonunuzda otomatik oluşur. Bu kayıtlarda yalnızca oyun sayıları ve ayarlar vardır. Bize ulaşan tek şey sizin yazdığınız e-postadır.",
    required: "Oyunu oynamak için bilgi vermeniz gerekmez. Bize yazmak tamamen isteğinize bağlıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da hesap.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Reklam kimliği ve cihaz kimliği.",
      "Kullanım istatistiği ve çökme raporu. Oyunda bunları toplayan bir araç yoktur.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Oyunu dağıtır. İndirme ve mağaza verilerini kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Destek e-postalarımızı sakladığımız hizmet.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Oyun kaydınız telefonunuzda kalır. Bize e-posta yazarsanız mesajınız Google'ın yurt dışındaki sunucularında saklanır; bu, KVKK m.9 kapsamında yurt dışına aktarım sayılabilir.",
    security:
      "Kayıtlarınız telefonunuzda, cihazın kendi korumasıyla durur ve şifrelenmez. Sunucumuz olmadığı için bizde bir kopyası bulunmaz.",
    deletion:
      "Ayarlar > Veri > Sıfırla kaydınızı siler. Oyunu kaldırmak ya da uygulama verilerini temizlemek de aynı sonucu verir. Sunucuda kopya olmadığı için geri getiremeyiz. Destek yazışmanızın silinmesi için bize yazın.",
    children:
      "Oyun yaş, ad ya da iletişim bilgisi sormaz. Yaş derecelendirmesi mağaza sayfasında görünür. Bir çocuk bize yazdıysa velisinin talebiyle yazışmayı sileriz.",
    extra: [
      {
        title: "Oyun motoru ve izinler",
        paragraphs: [
          "Oyun Unity ile yapıldı. Projede Unity Analytics, tanılama ve bulut servisleri kapalıdır, proje Unity Cloud'a bağlı değildir ve oyunun kodu ağ bağlantısı açmaz. Android paketi titreşim izni ile standart internet iznini bildirir; oyun bu izni kullanan bir özellik içermez. Konum, kamera, mikrofon ya da rehber izni istemez.",
        ],
      },
      {
        title: "Kaydı dışa aktarma",
        paragraphs: [
          "Ayarlar'daki Kaydı dışa aktar, kaydınızı metin olarak panoya kopyalar. Bu metin size aittir; nereye yapıştıracağınıza siz karar verirsiniz.",
        ],
      },
      {
        title: "Android yedekleme",
        paragraphs: [
          "Android yedeklemesi açıksa telefonunuz kaydı kendi Google hesabınıza yedekleyebilir. Bu kopyaya erişimimiz yoktur.",
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
      "Saksı is a calm clicker game that asks you for nothing. Your plant and settings are stored only on your phone and never reach us. The game has no accounts, ads, purchases or analytics.",
    scope:
      "This policy covers Saksı, a game published by Neuvikon for Android. The game has no server.",
    rows: [
      {
        data: "Your email address and message when you write to us",
        purpose: "Replying to what you wrote about",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering players' questions",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Your game state and a backup of the previous save are created automatically on your phone. They contain only game numbers and settings. The only thing that reaches us is an email you write.",
    required: "You do not need to give any information to play. Writing to us is entirely up to you.",
    notCollected: [
      "Name, email, phone number or an account.",
      "Location, contacts, photos, camera or microphone data.",
      "Advertising ID or device ID.",
      "Usage statistics or crash reports. The game has no tool that collects them.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Distributes the game and handles download and store data under its own policy.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google (Gmail)",
        role: "Service where we keep support email.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Your save stays on your phone. If you email us, your message is stored on Google's servers, which may be outside your country.",
    security:
      "Your saves sit on your phone under the device's own protection and are not encrypted. With no server, we hold no copy.",
    deletion:
      "Settings > Data > Reset deletes your save. Uninstalling the game or clearing its app data does the same. With no copy on a server, we cannot restore it. Write to us to have your support messages deleted.",
    children:
      "The game does not ask for an age, name or contact details. The age rating is shown on the store page. If a child has written to us, we delete the conversation at a parent's request.",
    extra: [
      {
        title: "Game engine and permissions",
        paragraphs: [
          "The game is made with Unity. Unity Analytics, diagnostics and cloud services are off in this project, the project is not linked to Unity Cloud, and the game's code opens no network connection. The Android package declares the vibration permission and the standard internet permission; the game has no feature that uses the latter. It does not request location, camera, microphone or contacts.",
        ],
      },
      {
        title: "Exporting your save",
        paragraphs: [
          "Export save in Settings copies your save to the clipboard as text. That text is yours, and where you paste it is up to you.",
        ],
      },
      {
        title: "Android backup",
        paragraphs: [
          "If Android backup is on, your phone may back up the save to your own Google account. We have no access to that copy.",
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
