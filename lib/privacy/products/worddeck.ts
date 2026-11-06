import type { ProductPolicy } from "@/lib/privacy/types";

export const worddeck: ProductPolicy = {
  slug: "worddeck",
  name: "WordDeck",
  project: "WordDeck",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "WordDeck'te hesap yoktur; adınızı, e-postanızı ya da şifrenizi istemeyiz. Tercihleriniz ve çalışma ilerlemeniz, cihazınızın ürettiği rastgele bir tanımlayıcıya bağlı olarak sunucumuzda durur. Uygulamada Google AdMob reklamları vardır ve yalnızca kişiselleştirilmemiş reklam isteriz.",
    scope:
      "Bu metin, Neuvikon'un iOS ve Android için yayımladığı kelime kartı uygulaması WordDeck'i, ana ekran widget'ını ve uygulamaya hizmet veren sunucu tarafını kapsar.",
    rows: [
      {
        data: "Cihaz tanımlayıcısı: ilk açılışta cihazınızda üretilen rastgele 256 bitlik değer",
        purpose: "Hesap olmadan ilerlemenizi size bağlamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar. Kullanılmayan kayıtları kendiliğinden silmiyoruz",
      },
      {
        data: "Tercihler: arayüz dili, İngilizce seviyesi, sınavlar, günlük yeni kart ve tekrar limiti, kartın hangi yüzle başladığı, cevap yazma tercihi, hatırlatıcı saati, başlangıç tarihi",
        purpose: "Size uygun kartları getirmek ve uygulamayı seçtiğiniz gibi çalıştırmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "Kart ilerlemesi: her kartın tekrar takvimi, kaç kez cevaplandığı ve unutulduğu, bildiğiniz olarak işaretlenip işaretlenmediği; çalıştığınız her gün için kart sayıları",
        purpose: "Kelimeleri doğru zamanda geri getirmek, etkinlik tablosunu ve seriyi göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "Günün kelimesi ilerlemesi: tamamladığınız günler, en iyi test puanı, her kelimedeki doğru ve yanlış sayısı, son tekrar zamanı",
        purpose: "Günlük takibi göstermek, kelime tekrarında en zayıf kelimeleri öne almak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Siz silene kadar",
      },
      {
        data: "Her cevap için rastgele bir kimlik",
        purpose: "Çevrimdışı çalışınca iki kez gönderilen cevabı bir kez saymak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Yaklaşık iki gün",
      },
      {
        data: "Taşıma kodu",
        purpose: "İlerlemenizi yeni telefona taşımak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Kullanılınca ya da 15 dakika sonra silinir",
      },
      {
        data: "Çeviri bildirimi: bildirdiğiniz kart ya da gramer konusu, dil, tarih, tanımlayıcınızla bağı",
        purpose: "Makine çevirilerinde önce çok bildirilenleri düzeltmek",
        legalBasis: "KVKK m.5/2-(f): içeriğin doğruluğunu sağlamadaki meşru menfaatimiz",
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
        purpose: "Ücretsiz uygulamayı finanse eden reklamları göstermek",
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
      "Tercihleriniz siz seçtikçe, ilerlemeniz çalıştıkça otomatik olarak sunucuya gider. Bir cevap sunucuya ulaşana kadar telefonunuzda, cihaz tanımlayıcısı olmadan bekler. Reklam verileri, reklam yüklenirken cihazınızdan doğrudan Google'a gider. E-posta verileri bize yazdığınızda ulaşır.",
    required:
      "Uygulamayı kullanmak için tercihler ve ilerleme kaydı gerekir, çünkü kartlar bunlara göre gelir. Bildirim izni, taşıma kodu, çeviri bildirimi ve destek e-postası isteğe bağlıdır. Reklamları kapatma seçeneği yoktur.",
    notCollected: [
      "Ad, e-posta, telefon numarası ya da şifre. Bize yazmadığınız sürece e-postanızı görmeyiz.",
      "Rehber, fotoğraf, takvim, mikrofon, kamera ya da konum izni. Uygulama bunları istemez.",
      "Yazarak verdiğiniz cevaplar. Cihazınızda kontrol edilir, sunucuya gönderilmez.",
      "Kart alıştırma testlerindeki cevaplar. Yanlışlarınızı çalışmaya eklemeyi seçerseniz yalnızca o kartlar takviminize yazılır.",
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
        role: "Reklamları cihazınıza sunar, reklam isteğinin taşıdığı verileri alır. Sunucumuzda sakladığınız hiçbir şeyi almaz.",
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
      "Cihaz tanımlayıcısı iOS anahtar zincirinde ya da Android keystore korumasında saklanır, uygulama ile sunucu arasındaki bağlantı şifrelidir. Tanımlayıcı giriş bilgisi yerine geçer; donanımınızdan, Apple ya da Google hesabınızdan türetilmez, reklam kimliği değildir. Taşıma kodu tek kullanımlıktır.",
    deletion:
      "Ayarlar > İlerlemeyi sil, kayıtlarınızı veri tabanımızdan anında siler; tanımlayıcıyı ve tercihleri cihazınızdan kaldırır. Bu işlem geri alınamaz. Uygulamayı bu düğmeyi kullanmadan silerseniz kayıtlar sunucuda kalır ve sizi tanımadığımız için hangi kaydın size ait olduğunu e-postayla bulamayabiliriz. Bu yüzden silmeden önce düğmeyi kullanın. Web üzerinden silme yolu yoktur. Google'da kalan reklam verileri ve mağaza geçmişi için ilgili sağlayıcının ayarlarını kullanın. Destek yazışmalarınızın silinmesi için bize yazabilirsiniz.",
    children:
      "WordDeck, YDS, YÖKDİL, YDT, TOEFL ve IELTS gibi sınavlara hazırlananlar ve İngilizce kelime öğrenenler için yapılmıştır; 13 yaşından küçük çocuklara yönelik değildir. App Store'daki 4+ derecesi içeriğin uygunluğunu gösterir, uygulamanın çocuklara yönelik olduğu anlamına gelmez. Uygulama yaş sormaz. Çocuklardan bilerek kişisel veri toplamayız; bir çocuğun kullandığını düşünüyorsanız Ayarlar'daki düğmeyle kayıtları silebilirsiniz.",
    extra: [
      {
        title: "Reklamlar",
        paragraphs: [
          "Uygulama ana ekranların altında banner, bir çalışma oturumunu ya da testi bitirdiğinizde en çok on dakikada bir tam ekran reklam gösterir. Her istekte yalnızca kişiselleştirilmemiş reklam isteriz; reklamlar hakkınızda oluşturulmuş bir profile göre seçilmez. iOS'ta izleme izni (App Tracking Transparency) istemeyiz, bu yüzden reklam kimliğiniz (IDFA) kullanılmaz.",
          "Uygulamada şu anda ayrı bir reklam rıza ekranı yoktur. Reklam tercihlerinizi https://myadcenter.google.com adresinden yönetebilirsiniz. Android'de reklam kimliğini cihaz ayarlarından silebilir ya da sıfırlayabilirsiniz. Google'ın reklam çerezlerini ve benzeri teknolojileri nasıl kullandığı https://policies.google.com/technologies/ads sayfasında anlatılır.",
        ],
      },
      {
        title: "Telaffuz ve bildirimler",
        paragraphs: [
          "Karttaki hoparlöre dokunduğunuzda kelimeyi cihazınızın metinden sese dönüştürme motoru okur, kelime bize gönderilmez. Günlük hatırlatıcıyı işletim sistemi cihazınızda planlar; push token oluşturulmaz ve sunucumuzdan bildirim gönderilmez. Bu yüzden hatırlatıcıyı açıp açmadığınızı bilemeyiz.",
        ],
      },
      {
        title: "Widget",
        paragraphs: [
          "Ana ekran widget'ı günün kelimesini seçtiğiniz dille ve o günün tarihiyle sunucudan alır. Bu istek cihaz tanımlayıcınızı taşımaz, çünkü kelime herkes için aynıdır. Widget dil tercihinizi cihazınızda okur.",
        ],
      },
    ],
  },
  en: {
    summary:
      "WordDeck has no accounts; we never ask for your name, email or a password. Your preferences and study progress sit on our server against a random identifier your device creates. The app shows Google AdMob ads, and we request non-personalised ads only.",
    scope:
      "This policy covers WordDeck, the vocabulary flashcard app Neuvikon publishes for iOS and Android, its home screen widget and the backend that serves it.",
    rows: [
      {
        data: "Device identifier: a random 256-bit value created on your device at first launch",
        purpose: "Tying your progress to you without an account",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it. We do not remove unused records automatically",
      },
      {
        data: "Preferences: interface language, English level, exams, daily new-card and review limits, which side a card starts on, whether you type answers, reminder time, start date",
        purpose: "Dealing the right cards and running the app the way you set it",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "Card progress: each card's review schedule, how often you answered and forgot it, whether you marked it as known, and card counts for each day you studied",
        purpose: "Bringing words back at the right time, drawing your activity grid and streak",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "Word-of-the-day progress: days completed, best quiz score, right and wrong counts per word, last review time",
        purpose: "Showing your daily tracker and putting your weakest words first in word review",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete it",
      },
      {
        data: "A random id for each answer",
        purpose: "Counting an answer sent twice after offline study only once",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "About two days",
      },
      {
        data: "Transfer code",
        purpose: "Moving your progress to a new phone",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Deleted once used, or after 15 minutes",
      },
      {
        data: "Translation report: the card or grammar topic you flagged, language, date, link to your identifier",
        purpose: "Fixing the most-reported machine translations first",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in accurate content",
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
        purpose: "Showing the ads that fund the free app",
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
      "Preferences reach the server as you choose them, and progress goes automatically as you study. Until an answer reaches the server it waits on your phone, without the device identifier. Ad data goes directly from your device to Google when an ad loads. Email data reaches us when you write to us.",
    required:
      "The app needs your preferences and progress on record, because cards are dealt from them. Notification permission, transfer codes, translation reports and support email are optional. There is no option to turn ads off.",
    notCollected: [
      "Name, email, phone number or password. We only see your email if you write to us.",
      "Contacts, photos, calendar, microphone, camera or location permission. The app does not ask for them.",
      "Typed answers. They are checked on your device and never sent to the server.",
      "Answers in card practice quizzes. If you choose to study your misses, only those cards are added to your schedule.",
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
        role: "Serves ads to your device and receives what the ad request carries. Receives nothing you have stored on our server.",
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
      "The device identifier is kept in the iOS keychain or under Android keystore protection, and traffic between the app and the server is encrypted. The identifier stands in for a login; it is not derived from your hardware or your Apple or Google account and it is not an advertising ID. Transfer codes work once.",
    deletion:
      "Settings > Clear progress deletes your records from our database immediately and removes the identifier and preferences from your device. This cannot be undone. If you delete the app without using that button, the records stay on the server, and because we do not know who you are we may be unable to find yours from an email. So use the button first. There is no web deletion route. For ad data held by Google and store history, use those providers' own settings. Write to us to have your support messages deleted.",
    children:
      "WordDeck is made for people preparing for exams such as YDS, YÖKDİL, YDT, TOEFL and IELTS and for English learners; it is not directed at children under 13. The 4+ rating on the App Store describes the content and does not mean the app is aimed at children. The app does not ask your age. We do not knowingly collect personal data from children; if you think a child is using the app, the button in Settings deletes the records.",
    extra: [
      {
        title: "Advertising",
        paragraphs: [
          "The app shows a banner at the bottom of the main screens and, at most once every ten minutes, a full-screen ad when you finish a study session or a test. Every request asks for non-personalised ads only, so ads are not chosen from a profile built about you. On iOS we do not ask for App Tracking Transparency permission, so your advertising identifier (IDFA) is not used.",
          "The app currently has no separate ad consent screen. You can manage ad preferences at https://myadcenter.google.com. On Android you can delete or reset your advertising ID in device settings. Google explains how it uses advertising cookies and similar technologies at https://policies.google.com/technologies/ads.",
        ],
      },
      {
        title: "Pronunciation and notifications",
        paragraphs: [
          "When you tap the speaker on a card, your device's text-to-speech engine reads the word and it is not sent to us. Your daily reminder is scheduled by the operating system on your device; no push token is created and our server sends no notifications, so we cannot tell whether you opened one.",
        ],
      },
      {
        title: "Widget",
        paragraphs: [
          "The home screen widget fetches the day's word from the server using your language and the date. The request does not carry your device identifier, because the word is the same for everyone. The widget reads your language setting on your device.",
        ],
      },
    ],
  },
};
