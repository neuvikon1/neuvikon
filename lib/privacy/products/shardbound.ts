import type { ProductPolicy } from "@/lib/privacy/types";

export const shardbound: ProductPolicy = {
  slug: "shardbound",
  name: "Shardbound",
  project: "Shardbound",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Shardbound tek oyunculu bir oyundur ve hesap istemez. İlerlemeniz ile ayarlarınız cihazınızdaki JSON dosyalarında durur, bize gelmez. Oyunda reklam, satın alma ve analitik servisi yoktur.",
    scope:
      "Bu metin, Neuvikon'un yayımladığı Shardbound oyununun Android ve Windows sürümlerini kapsar. Oyunun bir sunucusu ve çevrimiçi modu yoktur.",
    rows: [
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): oyuncuların sorularını cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Bize ulaşan tek veri, yazmayı seçtiğinizde gönderdiğiniz e-postadır. Kayıt ve ayar dosyaları oyun sırasında cihazınızda otomatik oluşur.",
    required: "Oyunu oynamak için hiçbir kişisel veri vermeniz gerekmez. Bize yazmak isteğe bağlıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da oyun içi hesap. Oyun oyuncu adı sormaz.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Reklam kimliği ve cihaz kimliği. Oyunun kodu bunları okumaz.",
      "Kullanım istatistiği. Oyunda analitik servisi yoktur.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Android sürümünü dağıtır. Mağaza hesabınız ve indirme verileriniz kendi gizlilik politikasına tabidir.",
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
      "Oyun verileri cihazınızdan çıkmaz. Yalnızca bize yazarsanız e-postanız Google'ın yurt dışındaki sunucularında saklanır; bu, KVKK m.9 kapsamında yurt dışına aktarım sayılabilir.",
    security:
      "Kayıtlar bizde birikmez. Cihazınızdaki dosyalar şifresizdir ve korunmaları cihazınızın güvenliğine bağlıdır.",
    deletion:
      "Android'de oyunu kaldırdığınızda ya da uygulama verilerini temizlediğinizde kayıtlar silinir. Windows'ta kayıtlar kullanıcı klasörünüzde AppData\\LocalLow\\Shardbound Studio\\Shardbound altındadır; bu klasörü silerek temizleyebilirsiniz. Destek yazışmalarınızın silinmesi için bize yazın.",
    children:
      "Oyun hiçbir yaş grubundan hesap, ad ya da iletişim bilgisi istemez. Yaş derecelendirmesi mağaza sayfasında görünür. Bir çocuk bize e-posta yazdıysa, velisinin talebiyle yazışmayı sileriz.",
    extra: [
      {
        title: "Oyun motoru ve ağ",
        paragraphs: [
          "Shardbound, Unity ile yapıldı. Projede Unity Analytics, tanılama ve diğer Unity bulut servisleri kapalıdır, proje Unity Cloud'a bağlı değildir ve oyunun kodu ağ bağlantısı açmaz. Android sürümü internet izni istemez; konum, kamera, mikrofon ya da rehber izni de istemez.",
        ],
      },
      {
        title: "Android yedekleme",
        paragraphs: [
          "Cihazınızda Android yedeklemesi açıksa kayıtlarınız kendi Google hesabınıza yedeklenebilir. Bu kopyayı biz göremeyiz; ayarını cihazınızdan yönetirsiniz.",
        ],
      },
      {
        title: "Bu sayfa",
        paragraphs: [
          "neuvikon.com'un barındırma sağlayıcısı, bu sayfayı açtığınızda IP adresi, tarayıcı bilgisi ve zaman damgası gibi standart erişim kayıtları tutabilir. Ayrıntı sitenin genel gizlilik politikasındadır.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Shardbound is a single-player game with no accounts. Your progress and settings live in JSON files on your device and never reach us. The game has no ads, no purchases and no analytics service.",
    scope:
      "This policy covers the Android and Windows versions of Shardbound, published by Neuvikon. The game has no server and no online mode.",
    rows: [
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering players' questions",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "The only data that reaches us is the email you choose to send. Save and settings files are created automatically on your device during play.",
    required: "You do not need to give any personal data to play. Writing to us is optional.",
    notCollected: [
      "Name, email, phone number or an in-game account. The game does not ask for a player name.",
      "Location, contacts, photos, camera or microphone data.",
      "Advertising ID or device ID. The game's code does not read them.",
      "Usage statistics. The game has no analytics service.",
    ],
    recipients: [
      {
        name: "Google Play",
        role: "Distributes the Android version. Your store account and download data fall under its own privacy policy.",
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
      "Game data does not leave your device. Only if you write to us is your email stored on Google's servers, which may be outside your country.",
    security:
      "Saves do not build up with us. The files on your device are not encrypted and rely on your device's own security.",
    deletion:
      "On Android, uninstalling the game or clearing its app data deletes your saves. On Windows, saves are in your user folder under AppData\\LocalLow\\Shardbound Studio\\Shardbound, and deleting that folder clears them. Write to us to have your support messages deleted.",
    children:
      "The game asks no age group for an account, name or contact details. The age rating is shown on the store page. If a child has emailed us, we delete the conversation at a parent's request.",
    extra: [
      {
        title: "Game engine and network",
        paragraphs: [
          "Shardbound is made with Unity. Unity Analytics, diagnostics and the other Unity cloud services are off in this project, the project is not linked to Unity Cloud, and the game's code opens no network connection. The Android version does not request the internet permission, nor location, camera, microphone or contacts permissions.",
        ],
      },
      {
        title: "Android backup",
        paragraphs: [
          "If Android backup is on, your saves may be backed up to your own Google account. We cannot see that copy; you manage it from your device.",
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
