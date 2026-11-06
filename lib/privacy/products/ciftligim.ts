import type { ProductPolicy } from "@/lib/privacy/types";

export const ciftligim: ProductPolicy = {
  slug: "ciftligim",
  name: "Çiftliğim",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Çiftliğim'in hesabı, sunucusu ve veritabanı yoktur. Çiftliğiniz yalnızca tarayıcınızda durur ve oyun size ait bir veriyi bize göndermez. Dışarı çıkan tek bilgi, sayfayı açarken barındırma hizmetine ulaşan IP adresinizdir.",
    scope:
      "Bu metin, zer0desu1.github.io/ciftlik adresinde oynanan web oyunu Çiftliğim'i kapsar. Tarlalarınızı, hayvanlarınızı ve pazarı yönettiğiniz tek oyunculu bir çiftlik oyunudur.",
    rows: [
      {
        data: "IP adresi ve tarayıcı bilgisi",
        purpose: "Oyunun sayfasını size ulaştırmak",
        legalBasis: "KVKK m.5/2-(f): siteyi çalışır ve güvenli tutmaktaki meşru menfaat",
        retention: "GitHub'ın kendi kayıt süresi kadar; bu kayıtları biz görmeyiz",
      },
      {
        data: "Bize yazarsanız e-posta adresiniz ve mesajınız",
        purpose: "Sorunuzu cevaplamak",
        legalBasis: "KVKK m.5/2-(f): destek talebini cevaplamaktaki meşru menfaat",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "IP adresi sayfayı açtığınızda barındırma hizmetine kendiliğinden ulaşır. Oyun kaydı tarayıcınızda otomatik oluşur ve dışarı gönderilmez. E-posta yalnızca siz yazarsanız gelir.",
    required:
      "Oynamak için hiçbir bilgi vermeniz gerekmez. Çiftliğinize ad vermek isteğe bağlıdır ve bu ad da tarayıcınızda kalır.",
    notCollected: [
      "Ad, e-posta, telefon ya da hesap.",
      "Konum, rehber, kamera, mikrofon ya da fotoğraf verisi.",
      "Reklam ve analitik. Oyunda ikisi de yoktur.",
      "Çerez. Oyun çerez yazmaz.",
      "Oyunun çalışması sırasında yapılan dış istek. Yazı tipleri dahil tüm dosyalar oyunla birlikte gelir.",
    ],
    extra: [
      {
        title: "Tarayıcınızda ne duruyor",
        paragraphs: [
          "Oyun, tarayıcınızın yerel depolamasına tek bir kayıt yazar (ciftlik-save). İçinde çiftliğinizin adı, altını, tarlaları, hayvanları ve ilerlemesi bulunur. Bu kayıt cihazınızdan çıkmaz. Yedeği yoktur: başka bir tarayıcıya ya da cihaza geçerse gelmez.",
        ],
      },
    ],
    recipients: [
      {
        name: "GitHub Pages",
        role: "Oyunu barındırır. Ziyaretçinin IP adresini güvenlik amacıyla kaydeder.",
        location: "ABD ve küresel",
        url: "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
      },
      {
        name: "Google (Gmail)",
        role: "Bize yazdığınız e-postaların saklandığı hizmet.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Oyun kaydınız yurt dışına çıkmaz, çünkü tarayıcınızdan hiç çıkmaz. Sayfayı açtığınızda IP adresiniz GitHub'a ulaşır; GitHub verileri Türkiye dışında işler ve bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Destek e-postaları da Google'ın yurt dışındaki sunucularında saklanır.",
    security:
      "Oyun verisi bizde birikmez, sayfa HTTPS ile gelir. Tarayıcınızdaki kaydı cihazınızın güvenliği korur ve kayıt şifrelenmez; cihazı kullanan biri oyunu açıp görebilir.",
    deletion:
      "Oyun içinde Ayarlar > Çiftliği sıfırla ilerlemenizi siler; çiftliğin adı kalır. Her şeyi kaldırmak için tarayıcınızın bu site için tuttuğu verileri temizleyin. İkisi de geri alınamaz. Bize yazdığınız e-postaların silinmesini isteyebilirsiniz.",
    children:
      "Çiftliğim genel kitleye yöneliktir, çocuklar da oynayabilir. Oyun yaş, ad ya da iletişim bilgisi sormaz ve oyuncudan veri toplamaz. Bir çocuk bize yazdıysa velisinin talebiyle yazışmayı sileriz.",
  },
  en: {
    summary:
      "Çiftliğim has no accounts, server or database. Your farm exists only in your browser, and the game sends nothing about you to us. The only thing that leaves is your IP address, which reaches the hosting service when you open the page.",
    scope:
      "This policy covers Çiftliğim, the web game at zer0desu1.github.io/ciftlik. It is a single-player farming game where you run fields, animals and a market.",
    rows: [
      {
        data: "IP address and browser details",
        purpose: "Delivering the game's page to you",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the site working and secure",
        retention: "As long as GitHub keeps its own logs; we do not see them",
      },
      {
        data: "Your email address and message if you write to us",
        purpose: "Answering your question",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Your IP address reaches the hosting service when you open the page. The save is created in your browser automatically and is not sent anywhere. Email reaches us only if you write.",
    required:
      "You do not need to give any information to play. Naming your farm is optional, and the name stays in your browser too.",
    notCollected: [
      "Name, email, phone number or an account.",
      "Location, contacts, camera, microphone or photo data.",
      "Ads and analytics. The game has neither.",
      "Cookies. The game sets none.",
      "Outside requests while you play. All files, fonts included, ship with the game.",
    ],
    extra: [
      {
        title: "What stays in your browser",
        paragraphs: [
          "The game writes one save to your browser's local storage (ciftlik-save), holding your farm's name, gold, fields, animals and progress. It never leaves your device. There is no backup, so it will not follow you to another browser or device.",
        ],
      },
    ],
    recipients: [
      {
        name: "GitHub Pages",
        role: "Hosts the game. Logs visitors' IP addresses for security.",
        location: "US and global",
        url: "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
      },
      {
        name: "Google (Gmail)",
        role: "Email service where messages to us are stored.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Your save does not cross any border because it never leaves your browser. Your IP address reaches GitHub when you open the page, and GitHub may process it outside your country. Support email is also stored on Google's servers abroad.",
    security:
      "Game data does not build up with us, and the page is served over HTTPS. Your device's security protects the save in your browser. It is not encrypted, so anyone using the device can open the game and see it.",
    deletion:
      "In the game, Settings > Reset the farm erases your progress and keeps the farm's name. To remove everything, clear your browser's data for this site. Neither can be undone. You can ask us to delete your emails.",
    children:
      "Çiftliğim is made for a general audience and children can play it too. The game asks for no age, name or contact details and collects no data from players. If a child has written to us, we delete the conversation at a parent's request.",
  },
};
