import type { ProductPolicy } from "@/lib/privacy/types";

const DELETE_URL = "https://precise-sockeye-895.convex.site/delete-account";

export const eclosion: ProductPolicy = {
  slug: "eclosion",
  name: "Eclosion",
  project: "Eclosion",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Eclosion alışkanlık ve öz gelişim uygulamasıdır. Görevleriniz, ruh hâli kayıtlarınız, yeminleriniz ve sohbet geçmişiniz cihazınızda değil, bizim için çalışan bulut veritabanında durur ve hesabınıza bağlıdır. Bu kayıtların bir kısmı sağlığınızla ilgili olabilir. Uygulamada Google reklamları, Firebase Analytics, Sentry hata kaydı ve hesabınıza bağlı kendi kullanım kayıtlarımız vardır.",
    scope:
      "Bu metin Eclosion'un Android ve iOS uygulamalarını, uygulamanın Convex üzerindeki sunucusunu ve web'deki hesap silme sayfasını kapsar. Geliştiriciler Vural Bilgin ve Oğulcan Bozkurt'tur.",
    rows: [
      {
        data: "Hesap bilgileri: misafir girişinde anonim hesap kimliği; e-posta girişinde e-posta adresi; Google girişinde ad, e-posta ve profil fotoğrafı adresi; Apple girişinde ad ve e-posta (ya da Apple'ın yönlendirme adresi)",
        purpose: "Hesabı açmak, girişi sağlamak, verilerinizi cihazlar arasında taşımak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Hesap durdukça. Profil fotoğrafı adresi şu an uygulamada kullanılmaz, yalnızca kayıtta durur",
      },
      {
        data: "Görevler, tamamlama kayıtları, alışkanlık sayaçları, seri, odak oturumları ve notları, kalibrasyon cevapları, stat geçmişi, ödüller, gölge ordusu, baskın ve düello kayıtları, sistem günlüğü, dil ve saat dilimi farkı",
        purpose: "Uygulamanın temel işlevi: ilerlemenizi tutmak, günlük döngüyü işletmek, görevleri size göre önermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesap durdukça ya da Tehlikeli Bölge'den sıfırlayana kadar",
      },
      {
        data: "Ruh hâli puanı ve notu",
        purpose: "Ruh hâli kaydınızı tutmak ve size göstermek; sohbet asistanının cevabını cihazınızda şekillendirmek",
        legalBasis:
          "KVKK m.5/2-(c): sözleşmenin ifası. Sağlık verisi sayılırsa KVKK m.6 da uygulanır; aşağıdaki Hassas olabilecek veriler bölümüne bakın",
        retention: "Hesap durdukça ya da Tehlikeli Bölge'den sıfırlayana kadar",
      },
      {
        data: "Ejderha yemini: yemin metni (önerilenlerden biri ya da kendi yazdığınız), ejderha adı, günlük cevap sayaçları ve seri",
        purpose: "Seçtiğiniz tek alışkanlığı günlük takip etmek",
        legalBasis:
          "KVKK m.5/2-(c): sözleşmenin ifası. Sağlık ya da cinsel hayat verisi sayılırsa KVKK m.6 da uygulanır; aşağıdaki Hassas olabilecek veriler bölümüne bakın",
        retention: "Yemin kaydı bırakana ya da hesap silinene kadar; bırakılan yeminin metni sistem günlüğünde hesap durdukça kalır",
      },
      {
        data: "Uygulama içi asistanla sohbet mesajlarınız",
        purpose: "Sohbet geçmişinizi göstermek. Cevaplar cihazınızdaki kural tabanlı motorla üretilir",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Son 80 mesaj tutulur, eskileri silinir. Geçmişi temizleyebilirsiniz",
      },
      {
        data: "Künye: arkadaş kodu, oyuncu adı, unvan, rütbe, seviye, toplam XP, ordu gücü ve kadrosu, seri, statlar. Bağlaşık bağlantıları ve düello sonuçları",
        purpose: "Bağlaşık ve düello özelliklerini işletmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesap durdukça. Künye her kullanıcı için otomatik oluşur",
      },
      {
        data: "Bildirim jetonu, cihaz platformu, bildirim tercihleri, gönderilen bildirimlerin kaydı",
        purpose: "İzin verdiğiniz hatırlatmaları göndermek, aynı bildirimi iki kez göndermemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Jeton ve tercihler hesap durdukça; gönderim kaydı 21 gün",
      },
      {
        data: "Reklam kimliği (Android AAID, iOS'ta izin verirseniz IDFA), IP adresi, cihaz ve reklam etkileşimi verileri; sunucumuzda günlük ödüllü reklam sayacı",
        purpose: "Reklam göstermek, ölçmek, sahteciliği önlemek, ödüllü reklamın gold'unu vermek",
        legalBasis:
          "Rıza formu gösterilen bölgelerde KVKK m.5/1: açık rıza. Form gösterilmeyen bölgelerde KVKK m.5/2-(f): ücretsiz uygulamayı reklamla finanse etme meşru menfaati",
        retention:
          "Google'ın kendi süreleri (politikasına bakın); ödül sayacımız hesap durdukça",
      },
      {
        data: "Firebase Analytics olayları: giriş yöntemi, kalibrasyonun bitmesi, görev tamamlama (stat türü, seviye atlama), uygulama örneği kimliği, cihaz bilgileri",
        purpose: "Uygulamanın nasıl kullanıldığını toplu olarak görmek",
        legalBasis:
          "Rıza formu gösterilen bölgelerde KVKK m.5/1: açık rıza. Form gösterilmeyen bölgelerde KVKK m.5/2-(f): ürünü geliştirme meşru menfaati",
        retention: "Firebase projemizdeki saklama ayarı kadar. Hesap kimliğiniz Firebase'e gönderilmez",
      },
      {
        data: "Ürün olayları: profil oluşturma, kalibrasyon, görev tamamlama (kategori, XP), odak süresi, baskın, düello, bağlaşık, ödül satın alma ve ödüllü reklam olayları",
        purpose: "Hangi özelliklerin kullanıldığını ve kullanıcıların nerede bıraktığını ölçmek",
        legalBasis: "KVKK m.5/2-(f): ürünü geliştirme meşru menfaati",
        retention:
          "Hesap durdukça. Bu kayıtlar hesabınıza bağlıdır ve reklam rızası formundan bağımsız tutulur",
      },
      {
        data: "Çökme ve hata kayıtları: hata iletisi, yığın izi, çağrılan fonksiyonun adı, cihaz modeli, işletim sistemi, uygulama sürümü",
        purpose: "Hataları bulmak ve düzeltmek",
        legalBasis: "KVKK m.5/2-(f): uygulamayı çalışır tutma meşru menfaati",
        retention: "Sentry hesabımızdaki saklama süresi kadar. Hesap kimliğiniz kayda eklenmez",
      },
      {
        data: "Rıza kayıtları: tür, metin sürümü, tarih, platform",
        purpose: "Hangi metin sürümü ve reklam tercihiyle kullandığınızı kanıtlamak",
        legalBasis: "KVKK m.5/2-(f): hukuki talepte kanıt tutma meşru menfaati",
        retention: "Hesap durdukça",
      },
      {
        data: "Giriş kodu, hız sınırı sayaçları (hesap kimliği ya da e-posta adresiyle), sunucu istek günlükleri ve IP adresi",
        purpose: "Girişi doğrulamak, kaba kuvveti ve kötüye kullanımı engellemek",
        legalBasis: "KVKK m.5/2-(f): hesapları ve hizmeti koruma meşru menfaati",
        retention:
          "Silme kodu 15 dakika geçerlidir. Sayaçlar otomatik temizlenmez ve hesap silinse de kalır. Sunucu günlükleri sağlayıcının süresince",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap verme meşru menfaati",
        retention: "Konu kapandıktan sonra silinmesini isteyene kadar",
      },
    ],
    collection:
      "Verilerin çoğunu uygulamayı kullanırken siz girersiniz ve uygulama bunları otomatik olarak sunucuya yazar. Uygulama çevrimiçi çalışır. Google ve Apple girişinde hesap bilgileri ilgili sağlayıcıdan gelir. Reklam, analitik, hata ve ürün olayı kayıtları otomatik oluşur. Ana ekran widget'ları görev ve seviye özetinizi yalnızca cihazınızda tutar.",
    required:
      "Hesap oluşturmak zorunda değilsiniz, misafir olarak başlayabilirsiniz. Misafir hesabı e-postaya bağlı olmadığı için cihazı değiştirirseniz verilere erişemeyebilirsiniz. Ruh hâli, yemin, sohbet ve bağlaşık özellikleri isteğe bağlıdır; kullanmazsanız bu veriler oluşmaz. Görev ve ilerleme verisi olmadan uygulama çalışmaz. Ürün olayları ve hata kayıtları için uygulamada kapatma seçeneği yoktur; itiraz etmek için bize yazabilirsiniz.",
    notCollected: [
      "Mikrofon. Android'de izin engellidir, uygulama ses kaydetmez.",
      "Konum izni. Uygulama cihazınızdan konum istemez.",
      "Rehber. Bağlaşıklar kod ya da QR ile eklenir.",
      "Kamera görüntüsü. Kamera yalnızca düello QR'ını okumak için cihazda çalışır, görüntü yüklenmez.",
      "Ödeme bilgisi. Uygulamada gerçek para ile satın alma yoktur.",
      "Yapay zekâ sağlayıcısına gönderim. Sohbet mesajlarınız üçüncü bir yapay zekâ hizmetine gitmez.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Sunucu ve veritabanı. Yukarıdaki uygulama verilerinin tamamını saklar.",
        location: "ABD (AWS, Kuzey Virginia)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Resend",
        role: "Giriş ve hesap silme kodlarını e-postayla gönderir. E-posta adresinizi ve kodu alır.",
        location: "ABD merkezli",
        url: "https://resend.com/legal/privacy-policy",
      },
      {
        name: "Sentry",
        role: "Çökme ve hata kayıtlarını saklar.",
        location: "Almanya (AB veri bölgesi)",
        url: "https://sentry.io/privacy/",
      },
      {
        name: "Expo",
        role: "Bildirimleri Apple ve Google üzerinden cihazınıza iletir. Jetonu, bildirim başlığını ve metnini alır.",
        location: "ABD merkezli",
        url: "https://expo.dev/privacy",
      },
      {
        name: "Google AdMob",
        role: "Reklam gösterir. Reklam kimliği, IP adresi, cihaz ve reklam etkileşimi verilerini kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google (Firebase Analytics)",
        role: "Kullanım analitiği. Yukarıdaki olayları ve uygulama örneği kimliğini alır.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google ve Apple girişi",
        role: "Bu yöntemi seçerseniz kimliğinizi doğrular ve hesap bilgilerinizi bize iletir.",
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
      "Uygulama verileriniz, sağlığınızla ilgili olabilecek kayıtlar dahil, Convex üzerinden ABD'de barındırılır; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Hata kayıtları Almanya'da, e-posta ve bildirim verileri ABD merkezli sağlayıcılarda, reklam ve analitik verileri Google'ın küresel altyapısında işlenir.",
    security:
      "Veriler aktarım sırasında TLS ile şifrelenir. Sunucudaki her işlem hesabınızla doğrulanır, oturum jetonları cihazın güvenli deposunda tutulur, hesap silme kodları özetlenerek saklanır ve deneme sayıları sınırlanır. Hiçbir sistem tam güvenli değildir; bir ihlal olursa kanunun öngördüğü bildirimleri yaparız.",
    deletion:
      `Uygulama içinden: Ayarlar, Hesabı Sil. Web'den: ${DELETE_URL} adresinde hesabınıza bağlı e-postaya gelen kodla. Misafir hesapları yalnızca uygulama içinden silinir. Uygulamayı kaldırmak sunucudaki verileri silmez; misafir hesabınızı silmeden uygulamayı kaldırırsanız veriler sunucuda kalır ve bize yazmanız gerekir. Silme; ilerleme, ruh hâli, yemin, sohbet, künye, bağlaşık, düello, bildirim, ürün olayı ve rıza kayıtlarını siler. Şunlar kalır: hız sınırı sayaçları, sağlayıcıların kendi süreleriyle tuttuğu Sentry, Firebase, AdMob ve e-posta kayıtları ve sunucu günlükleri. Silmeden önce Ayarlar, Verimi indir (JSON) ile verinizin kopyasını alabilirsiniz.`,
    children:
      "Eclosion'u kullanmak için en az 13 yaşında olmak gerekir; 13-18 yaş arasındakiler Kullanım Şartları'nı ebeveyn ya da vasi izniyle kabul eder. Uygulamada yaş doğrulaması yoktur. 13 yaşından küçük bir kullanıcının hesabını öğrenirsek hesabı ve verilerini sileriz.",
    extra: [
      {
        title: "Hassas olabilecek veriler",
        paragraphs: [
          "Ruh hâli kayıtlarınız, yemin metniniz (\"Sigara içmeyeceğim\", \"Alkol almayacağım\", \"Temiz kalacağım\" gibi), alışkanlık sayaçlarınız (\"sigara içtim\" gibi), uyku ve hareket görevleriniz, kalibrasyon cevaplarınız, notlarınız ve sohbet mesajlarınız sağlığınız ya da cinsel hayatınız hakkında bilgi verebilir. Bu tür veriler KVKK m.6 ve GDPR Art. 9 kapsamında özel nitelikli veri sayılır ve kural olarak açık rıza gerektirir.",
          "Uygulamada bu veriler için ayrı bir rıza ekranı yoktur. Girişteki \"devam ederek kabul edersin\" notu açık rıza değildir ve onun yerine geçmez. Bu özellikleri kullanmak isteğe bağlıdır: ruh hâli girmez, yemin etmez ve bu tür görev yazmazsanız bu veriler oluşmaz.",
          "Yemin ve ruh hâli metinleri reklam ve analitik servislerine gönderilmez, bildirimlerde de yer almaz. Sunucudaki ürün olayları görevin kategorisini ve kazanılan XP'yi içerir, görevin metnini içermez.",
        ],
      },
      {
        title: "Reklam ve analitik",
        paragraphs: [
          "Reklamları Google AdMob gösterir. AB, Birleşik Krallık ve bazı ABD eyaletlerinde önce Google'ın rıza formu (UMP) açılır; cevabınıza göre reklamlar kişiselleştirilir ya da kişiselleştirilmez. Form tamamlanmazsa reklam istenmez ve Firebase Analytics kapalı kalır. Tercihinizi Ayarlar, Yasal, Reklam gizlilik tercihleri bölümünden değiştirebilirsiniz.",
          "Türkiye dahil formun gösterilmediği bölgelerde form çıkmaz: Android'de reklamlar kişiselleştirilebilir ve Firebase Analytics açılır. iOS'ta formdan sonra Apple'ın izleme izni (ATT) sorulur; reddederseniz IDFA kullanılmaz ve reklamlar yine çıkar.",
          "Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites . Reklam çerezleri ve reklam kimliği: https://policies.google.com/technologies/ads . Reklam tercihleriniz: https://myadcenter.google.com . Android'de reklam kimliğini cihaz ayarlarından sıfırlayabilir ya da silebilirsiniz.",
        ],
      },
      {
        title: "Diğer kullanıcıların gördükleri",
        paragraphs: [
          "Arkadaş kodunuzu verdiğiniz ya da düello QR'ınızı okutan kişi künyenizi görür: oyuncu adı, unvan, rütbe, seviye, XP, statlar, seri, ordu gücü ve kadro. Bağlaşıklarınız bu bilgileri güncel olarak görmeye devam eder. E-posta adresiniz, görevleriniz, ruh hâliniz, yemininiz ve sohbetiniz künyede yer almaz.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Eclosion is a habit and self-improvement app. Your quests, mood entries, vows and chat history are not kept on your device: they sit in the cloud database that runs the app, tied to your account. Some of these records may relate to your health. The app uses Google ads, Firebase Analytics, Sentry error logging and our own account-linked usage records.",
    scope:
      "This policy covers the Eclosion Android and iOS apps, the app's server on Convex and the web account deletion page. The developers are Vural Bilgin and Oğulcan Bozkurt.",
    rows: [
      {
        data: "Account details: an anonymous account ID for guests; email address for email sign-in; name, email and profile photo address for Google; name and email (or Apple's relay address) for Apple",
        purpose: "Creating the account, signing you in, carrying your data across devices",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "While the account exists. The profile photo address is not used in the app today; it only sits in the record",
      },
      {
        data: "Quests, completion logs, habit counters, streaks, focus sessions and notes, calibration answers, stat history, rewards, shadow army, raid and duel records, the system log, language and time zone offset",
        purpose: "The app's core function: keeping your progress, running the daily cycle, suggesting quests that fit you",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "While the account exists, or until you reset from the Danger Zone",
      },
      {
        data: "Mood score and note",
        purpose: "Keeping and showing your mood log; shaping the chat assistant's replies on your device",
        legalBasis:
          "GDPR Art. 6(1)(b): performance of a contract. If this counts as health data, Art. 9 also applies; see Data that may be sensitive below",
        retention: "While the account exists, or until you reset from the Danger Zone",
      },
      {
        data: "Dragon vow: the vow text (a suggested one or your own), dragon name, daily answer counters and streak",
        purpose: "Tracking the one habit you chose, day by day",
        legalBasis:
          "GDPR Art. 6(1)(b): performance of a contract. If this counts as data about health or sex life, Art. 9 also applies; see Data that may be sensitive below",
        retention: "The vow record until you abandon it or the account is deleted; an abandoned vow's text stays in the system log while the account exists",
      },
      {
        data: "Your messages with the in-app assistant",
        purpose: "Showing your chat history. Replies come from a rule-based engine on your device",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "The last 80 messages are kept, older ones are deleted. You can clear the history",
      },
      {
        data: "Player card: friend code, player name, title, rank, level, total XP, army power and squad, streak, stats. Ally links and duel results",
        purpose: "Running the ally and duel features",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "While the account exists. A card is created automatically for every user",
      },
      {
        data: "Push token, device platform, notification preferences, a log of notifications sent",
        purpose: "Sending the reminders you allow, not sending the same one twice",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Token and preferences while the account exists; send log for 21 days",
      },
      {
        data: "Advertising ID (Android AAID, iOS IDFA if you allow it), IP address, device and ad interaction data; on our server, a daily rewarded-ad counter",
        purpose: "Showing and measuring ads, preventing fraud, granting rewarded-ad gold",
        legalBasis:
          "GDPR Art. 6(1)(a): consent where the consent form is shown. Elsewhere, Art. 6(1)(f): legitimate interest in funding a free app with ads",
        retention: "Google's own periods (see its policy); our reward counter while the account exists",
      },
      {
        data: "Firebase Analytics events: sign-in method, finishing calibration, quest completion (stat type, level-up), app instance ID, device details",
        purpose: "Seeing in aggregate how the app is used",
        legalBasis:
          "GDPR Art. 6(1)(a): consent where the consent form is shown. Elsewhere, Art. 6(1)(f): legitimate interest in improving the product",
        retention: "As long as our Firebase project's retention setting. Your account ID is not sent to Firebase",
      },
      {
        data: "Product events: profile creation, calibration, quest completion (category, XP), focus time, raid, duel, ally, reward purchase and rewarded-ad events",
        purpose: "Measuring which features are used and where people stop",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in improving the product",
        retention:
          "While the account exists. These records are tied to your account and are kept regardless of the ad consent form",
      },
      {
        data: "Crash and error logs: error message, stack trace, name of the function called, device model, operating system, app version",
        purpose: "Finding and fixing faults",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the app working",
        retention: "As long as our Sentry account's retention period. Your account ID is not added to the log",
      },
      {
        data: "Consent records: type, text version, date, platform",
        purpose: "Proving which text version and ad choice applied to you",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping evidence for legal claims",
        retention: "While the account exists",
      },
      {
        data: "Sign-in code, rate limit counters (by account ID or email address), server request logs and IP address",
        purpose: "Verifying sign-in, blocking brute force and abuse",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in protecting accounts and the service",
        retention:
          "The deletion code is valid for 15 minutes. Counters are not cleared automatically and stay after account deletion. Server logs for the provider's period",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "After the matter closes, until you ask us to delete it",
      },
    ],
    collection:
      "You enter most of this data while using the app, and the app writes it to the server automatically. The app works online. With Google and Apple sign-in, account details come from that provider. Ad, analytics, error and product event records are created automatically. Home screen widgets keep your quest and level summary on your device only.",
    required:
      "You do not have to create an account; you can start as a guest. A guest account has no email tied to it, so you may lose access if you change devices. Mood, vow, chat and ally features are optional; if you do not use them, this data does not exist. The app cannot work without quest and progress data. Product events and error logs have no off switch in the app; write to us to object.",
    notCollected: [
      "Microphone. The permission is blocked on Android and the app does not record sound.",
      "Location permission. The app does not ask your device for location.",
      "Contacts. Allies are added by code or QR.",
      "Camera images. The camera only reads a duel QR on your device and nothing is uploaded.",
      "Payment details. The app has no real-money purchases.",
      "AI provider access. Your chat messages do not go to a third-party AI service.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Server and database. Stores all of the app data above.",
        location: "United States (AWS, Northern Virginia)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Resend",
        role: "Emails sign-in and account deletion codes. Receives your email address and the code.",
        location: "US-based",
        url: "https://resend.com/legal/privacy-policy",
      },
      {
        name: "Sentry",
        role: "Stores crash and error logs.",
        location: "Germany (EU data region)",
        url: "https://sentry.io/privacy/",
      },
      {
        name: "Expo",
        role: "Delivers notifications to your device through Apple and Google. Receives the token and the notification title and text.",
        location: "US-based",
        url: "https://expo.dev/privacy",
      },
      {
        name: "Google AdMob",
        role: "Shows ads. Processes advertising ID, IP address, device and ad interaction data under its own policy.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google (Firebase Analytics)",
        role: "Usage analytics. Receives the events above and the app instance ID.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google and Apple sign-in",
        role: "If you choose this method, they verify you and pass your account details to us.",
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
      "Your app data, including records that may relate to your health, is hosted in the United States through Convex. For users in Turkey this is a transfer abroad under KVKK Art. 9; for users in the EU and UK it is a transfer to a third country. Error logs are processed in Germany, email and notification data by US-based providers, and ad and analytics data on Google's global infrastructure.",
    security:
      "Data is encrypted in transit with TLS. Every server operation is checked against your account, session tokens sit in the device's secure storage, account deletion codes are stored hashed, and attempts are limited. No system is perfectly secure; if a breach happens we make the notifications the law requires.",
    deletion:
      `In the app: Settings, Delete Account. On the web: ${DELETE_URL} with a code sent to the email on your account. Guest accounts can only be deleted in the app. Uninstalling does not delete data on the server; if you uninstall without deleting a guest account, the data stays on the server and you need to write to us. Deletion removes progress, mood, vow, chat, player card, ally, duel, notification, product event and consent records. What stays: rate limit counters, Sentry, Firebase, AdMob and email records held for those providers' own periods, and server logs. Before deleting you can take a copy with Settings, Export my data (JSON).`,
    children:
      "You must be at least 13 to use Eclosion; users aged 13 to 18 accept the Terms with a parent's or guardian's permission. The app has no age check. If we learn an account belongs to someone under 13, we delete it and its data.",
    extra: [
      {
        title: "Data that may be sensitive",
        paragraphs: [
          "Your mood entries, vow text (such as \"I won't smoke\", \"I won't drink\", \"I'll stay clean\"), habit counters (such as \"I smoked\"), sleep and movement quests, calibration answers, notes and chat messages may reveal something about your health or sex life. Under GDPR Art. 9 and KVKK Art. 6 such data is a special category and as a rule needs explicit consent.",
          "The app has no separate consent screen for this data. The \"by continuing you accept\" note at sign-in is not explicit consent and does not replace it. These features are optional: if you do not enter a mood, make a vow or write such quests, this data does not exist.",
          "Vow and mood text is not sent to ad or analytics services and does not appear in notifications. Product events on our server hold a quest's category and XP, not its text.",
        ],
      },
      {
        title: "Ads and analytics",
        paragraphs: [
          "Google AdMob shows the ads. In the EU, the UK and some US states, Google's consent form (UMP) opens first, and your answer decides whether ads are personalised. If the form is not completed, no ads are requested and Firebase Analytics stays off. You can change your choice in Settings, Legal, Ad privacy choices.",
          "Where the form is not shown, Turkey included, no form appears: on Android ads may be personalised and Firebase Analytics turns on. On iOS, Apple's tracking permission (ATT) is asked after the form; if you refuse, IDFA is not used and ads still appear.",
          "How Google uses this data: https://policies.google.com/technologies/partner-sites . Ad cookies and advertising IDs: https://policies.google.com/technologies/ads . Your ad settings: https://myadcenter.google.com . On Android you can reset or delete your advertising ID in device settings.",
        ],
      },
      {
        title: "What other users see",
        paragraphs: [
          "Someone you give your friend code to, or who scans your duel QR, sees your player card: player name, title, rank, level, XP, stats, streak, army power and squad. Your allies keep seeing this up to date. Your email address, quests, mood, vow and chat are not on the card.",
        ],
      },
    ],
  },
};
