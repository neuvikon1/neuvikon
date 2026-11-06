import type { ProductPolicy } from "@/lib/privacy/types";

export const todaysWord: ProductPolicy = {
  slug: "todays-word",
  name: "Today's Word",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Today's Word'de hesap yoktur. Dil seçiminiz, hatırlatıcı saatiniz ve ilerlemeniz, cihazınızın ürettiği rastgele bir tanımlayıcıya bağlı olarak sunucumuzda durur. Uygulamada Google AdMob banner reklamı vardır ve yalnızca kişiselleştirilmemiş reklam isteriz.",
    scope:
      "Bu metin, Neuvikon'un iOS ve Android için yayımladığı günlük İngilizce kelime uygulaması Today's Word'ü, iOS ve Android ana ekran widget'larını ve uygulamaya hizmet veren sunucu tarafını kapsar.",
    rows: [
      {
        data: "Cihaz tanımlayıcısı: ilk açılışta cihazınızda üretilen rastgele 256 bitlik değer",
        purpose: "Hesap olmadan ilerlemenizi size bağlamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar. Kullanılmayan kayıtları kendiliğinden silmiyoruz",
      },
      {
        data: "Ana diliniz, hatırlatıcı saatiniz ve başlangıç tarihiniz",
        purpose: "Kelimeyi dilinizde sunmak, başlamadan önceki günleri kaçırılmış saymamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "Tamamladığınız günler ve o günlerin test puanı",
        purpose: "Takip ekranını ve seriyi göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "Her kelimedeki doğru ve yanlış sayısı, son görülme zamanı",
        purpose: "Alıştırma testinde en zayıf kelimeleri öne almak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "IP adresi ve olağan istek kayıtları",
        purpose: "Hizmeti çalıştırmak ve güvende tutmak",
        legalBasis: "KVKK m.5/2-(f): hizmet güvenliğindeki meşru menfaatimiz",
        retention: "Barındırma sağlayıcısının kendi kurallarına göre. Bu kayıtları ilerlemenizle birleştirmeyiz",
      },
      {
        data: "Reklam isteğinin taşıdığı veriler: Android'de reklam kimliği, cihaz türü, IP adresinden çıkarılan yaklaşık konum",
        purpose: "Ücretsiz uygulamayı finanse eden banner reklamı göstermek",
        legalBasis: "KVKK m.5/2-(f): uygulamayı reklamla finanse etmedeki meşru menfaatimiz",
        retention: "Bu veriler bize gelmez; Google kendi politikasına göre saklar",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap vermedeki meşru menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Dil ve hatırlatıcı saati başlangıç ekranında sizden gelir, sonradan Ayarlar'dan değişir. Tamamladığınız günler ve test sonuçları siz kullandıkça otomatik olarak sunucuya gider. Reklam verileri, banner yüklenirken cihazınızdan doğrudan Google'a gider. E-posta verileri bize yazdığınızda ulaşır.",
    required:
      "Dil ve ilerleme kaydı uygulamanın çalışması için gerekir. Bildirim izni isteğe bağlıdır, izin vermezseniz uygulama hatırlatıcı dışında aynı şekilde çalışır. Widget eklemek ve bize yazmak da isteğe bağlıdır. Reklamları kapatma seçeneği yoktur.",
    notCollected: [
      "Ad, e-posta, telefon numarası ya da şifre. Bize yazmadığınız sürece e-postanızı görmeyiz.",
      "Rehber, fotoğraf, takvim, mikrofon, kamera ya da konum izni. Uygulama bunları istemez.",
      "Analitik, kullanıcı takibi ya da hata raporlama SDK'sı.",
      "Hangi reklamı gördüğünüz ya da reklama dokunup dokunmadığınız.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Sunucu ve veri tabanı sağlayıcısı. Tanımlayıcınızı, tercihlerinizi ve ilerlemenizi bizim adımıza barındırır, istek kayıtlarını tutar.",
        location: "Avrupa Birliği (eu-west-1 bölgesi)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Google AdMob",
        role: "Banner reklamı cihazınıza sunar, reklam isteğinin taşıdığı verileri alır. Sunucumuzda sakladığınız hiçbir şeyi almaz.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Apple App Store ve Google Play",
        role: "Uygulamayı dağıtır, indirme bilgilerini kendi politikalarına göre işler.",
        location: "Küresel",
        url: "https://www.apple.com/legal/privacy/",
      },
      {
        name: "Google (Gmail)",
        role: "Destek e-postalarının saklandığı e-posta hizmeti.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Tanımlayıcınız, tercihleriniz ve ilerlemeniz Avrupa Birliği'nde barındırılır; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Reklam verileri cihazınızdan Google'a, destek e-postaları Google'ın yurt dışındaki sunucularına gider.",
    security:
      "Cihaz tanımlayıcısı iOS anahtar zincirinde ya da Android keystore korumasında saklanır, uygulama ile sunucu arasındaki bağlantı şifrelidir. Tanımlayıcı giriş bilgisi yerine geçer; donanımınızdan, Apple ya da Google hesabınızdan türetilmez, reklam kimliği değildir.",
    deletion:
      "Ayarlar > İlerlemeyi sil, kayıtlarınızı veri tabanımızdan anında siler; tanımlayıcıyı ve tercihleri cihazınızdan kaldırır. Bu işlem geri alınamaz. Uygulamayı bu düğmeyi kullanmadan silerseniz kayıtlar sunucuda kalır ve sizi tanımadığımız için hangi kaydın size ait olduğunu e-postayla bulamayabiliriz. Bu yüzden silmeden önce düğmeyi kullanın. Web üzerinden silme yolu yoktur. Destek yazışmalarınızın silinmesi için bize yazabilirsiniz.",
    children:
      "Uygulama yaş sormaz ve bir kullanıcının yaşını bilmeyiz. Today's Word 13 yaşından küçük çocuklara yönelik değildir ve çocuklardan bilerek kişisel veri toplamayız. Bir çocuğun kullandığını düşünüyorsanız Ayarlar'daki düğmeyle kayıtları silebilirsiniz.",
    extra: [
      {
        title: "Reklamlar",
        paragraphs: [
          "Uygulama kelime, alıştırma, ilerleme ve ayarlar ekranlarında Google AdMob banner reklamı gösterir. Her istekte yalnızca kişiselleştirilmemiş reklam isteriz; banner hakkınızda oluşturulmuş bir profile göre seçilmez. iOS'ta izleme izni (App Tracking Transparency) istemeyiz, bu yüzden reklam kimliğiniz (IDFA) kullanılmaz.",
          "Uygulamada şu anda ayrı bir reklam rıza ekranı yoktur. Reklam tercihlerinizi https://myadcenter.google.com adresinden yönetebilirsiniz. Android'de reklam kimliğini cihaz ayarlarından silebilir ya da sıfırlayabilirsiniz. Google'ın reklam çerezlerini ve benzeri teknolojileri nasıl kullandığı https://policies.google.com/technologies/ads sayfasında anlatılır.",
        ],
      },
      {
        title: "Widget'lar",
        paragraphs: [
          "iOS ve Android ana ekran widget'ları günün kelimesini seçtiğiniz dille sunucudan alır. Bu istek cihaz tanımlayıcınızı taşımaz, çünkü kelime herkes için aynıdır; dil bilgisi ve her internet isteğinde olduğu gibi IP adresiniz sunucuya ulaşır. Widget dil tercihinizi cihazınızda okur. iOS'ta widget eklemezseniz bu istek yapılmaz; Android'de uygulama açıkken widget'ı güncellemek için aynı istek yapılabilir.",
        ],
      },
      {
        title: "Telaffuz ve bildirimler",
        paragraphs: [
          "Kelimeyi dinlediğinizde sesi cihazınızın metinden sese dönüştürme motoru üretir, bize bir şey gönderilmez. Günlük hatırlatıcıyı işletim sistemi cihazınızda planlar; push token oluşturulmaz ve sunucumuzdan bildirim gönderilmez. Bu yüzden hatırlatıcıyı açıp açmadığınızı bilemeyiz.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Today's Word has no accounts. Your language, reminder time and progress sit on our server against a random identifier your device creates. The app shows a Google AdMob banner, and we request non-personalised ads only.",
    scope:
      "This policy covers Today's Word, the daily English word app Neuvikon publishes for iOS and Android, its iOS and Android home screen widgets and the backend that serves it.",
    rows: [
      {
        data: "Device identifier: a random 256-bit value created on your device at first launch",
        purpose: "Tying your progress to you without an account",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it. We do not remove unused records automatically",
      },
      {
        data: "Your native language, reminder time and start date",
        purpose: "Giving you the word in your language and not counting days before you started as missed",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "Days you completed and their quiz scores",
        purpose: "Showing your tracker and streak",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "Right and wrong counts per word, last time seen",
        purpose: "Putting your weakest words first in the practice test",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "IP address and ordinary request logs",
        purpose: "Running the service and keeping it secure",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in service security",
        retention: "Under the hosting provider's own rules. We do not join these logs to your progress",
      },
      {
        data: "What an ad request carries: advertising ID on Android, device type, approximate location derived from your IP address",
        purpose: "Showing the banner that funds the free app",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in funding the app through ads",
        retention: "This data does not reach us; Google keeps it under its own policy",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "You give your language and reminder time on the first screens and can change them in Settings. Completed days and quiz results reach the server automatically as you use the app. Ad data goes directly from your device to Google when the banner loads. Email data reaches us when you write to us.",
    required:
      "The app needs your language and progress on record to work. Notification permission is optional; without it everything but the reminder works the same. Adding a widget and writing to us are optional too. There is no option to turn ads off.",
    notCollected: [
      "Name, email, phone number or password. We only see your email if you write to us.",
      "Contacts, photos, calendar, microphone, camera or location permission. The app does not ask for them.",
      "Analytics, user tracking or crash reporting SDKs.",
      "Which ad you saw or whether you tapped it.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Backend and database provider. Hosts your identifier, preferences and progress on our behalf and keeps request logs.",
        location: "European Union (eu-west-1 region)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Google AdMob",
        role: "Serves the banner to your device and receives what the ad request carries. Receives nothing you have stored on our server.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Apple App Store and Google Play",
        role: "Distribute the app and process download information under their own policies.",
        location: "Global",
        url: "https://www.apple.com/legal/privacy/",
      },
      {
        name: "Google (Gmail)",
        role: "Email service where support messages are stored.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
    ],
    transfer:
      "Your identifier, preferences and progress are hosted in the European Union, which is a transfer abroad under KVKK Art. 9 for users in Turkey. Ad data goes from your device to Google, and support email is stored on Google's servers, which may be outside your country.",
    security:
      "The device identifier is kept in the iOS keychain or under Android keystore protection, and traffic between the app and the server is encrypted. The identifier stands in for a login; it is not derived from your hardware or your Apple or Google account and it is not an advertising ID.",
    deletion:
      "Settings > Clear progress deletes your records from our database immediately and removes the identifier and preferences from your device. This cannot be undone. If you delete the app without using that button, the records stay on the server, and because we do not know who you are we may be unable to find yours from an email. So use the button first. There is no web deletion route. Write to us to have your support messages deleted.",
    children:
      "The app does not ask your age and we do not know how old a user is. Today's Word is not directed at children under 13 and we do not knowingly collect personal data from children. If you think a child is using the app, the button in Settings deletes the records.",
    extra: [
      {
        title: "Advertising",
        paragraphs: [
          "The app shows a Google AdMob banner on the word, practice, progress and settings screens. Every request asks for non-personalised ads only, so the banner is not chosen from a profile built about you. On iOS we do not ask for App Tracking Transparency permission, so your advertising identifier (IDFA) is not used.",
          "The app currently has no separate ad consent screen. You can manage ad preferences at https://myadcenter.google.com. On Android you can delete or reset your advertising ID in device settings. Google explains how it uses advertising cookies and similar technologies at https://policies.google.com/technologies/ads.",
        ],
      },
      {
        title: "Widgets",
        paragraphs: [
          "The iOS and Android home screen widgets fetch the day's word from the server using your language. The request does not carry your device identifier, because the word is the same for everyone; your language and, as with any internet request, your IP address reach the server. The widget reads your language setting on your device. Without a widget iOS makes no such request; on Android the app may make the same request to refresh the widget while it is open.",
        ],
      },
      {
        title: "Pronunciation and notifications",
        paragraphs: [
          "When you listen to a word, your device's text-to-speech engine produces the sound and nothing is sent to us. Your daily reminder is scheduled by the operating system on your device; no push token is created and our server sends no notifications, so we cannot tell whether you opened one.",
        ],
      },
    ],
  },
};
