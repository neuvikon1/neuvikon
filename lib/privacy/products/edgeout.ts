import type { ProductPolicy } from "@/lib/privacy/types";

export const edgeout: ProductPolicy = {
  slug: "edgeout",
  name: "EdgeOut",
  project: "EdgeOut",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "EdgeOut'a Google hesabınızla girersiniz. Hesabınız, oyun adınız, derece puanınız ve maç kayıtlarınız Convex üzerindeki sunucumuzda durur; adınız ve istatistikleriniz diğer oyunculara görünür. Mobil uygulamada Google AdMob banner reklamı vardır. Hesabınızı silmek için neuvikon@gmail.com adresine yazmanız gerekir, uygulamada silme düğmesi yoktur.",
    scope:
      "Bu metin, Neuvikon'un Android ve iOS için yayımladığı çevrimiçi strateji oyunu EdgeOut'u ve oyunun Convex üzerindeki sunucusunu kapsar.",
    rows: [
      {
        data: "Google hesabından gelen ad, e-posta adresi, e-posta doğrulama durumu, profil fotoğrafı bağlantısı ve Google hesap kimliği",
        purpose: "Hesabınızı açmak ve sizi tanımak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınız silinene kadar",
      },
      {
        data: "Google giriş belirteçleri",
        purpose: "Google ile girişi tamamlamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınız silinene kadar",
      },
      {
        data: "Oturum kaydı: oturum belirteci, IP adresi, tarayıcı/uygulama bilgisi, bitiş zamanı",
        purpose: "Girişinizi açık tutmak, hesabınızı başkalarından korumak",
        legalBasis: "KVKK m.5/2-(f): hesapları koruma menfaatimiz",
        retention: "Çıkış yapınca silinir; süresi dolan kayıt en geç hesabınız silinene kadar kalabilir",
      },
      {
        data: "Oyun adı (en çok 20 karakter) ve profil: MMR, derece, seviye, galibiyet, mağlubiyet, beraberlik, seri",
        purpose: "Sizi rakiplerinize ve liderlik tablosunda göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınız silinene kadar",
      },
      {
        data: "Oyun ilerlemesi: XP, günlük görev ve seri bilgisi, eğitim durumu, oynanan günler",
        purpose: "İlerlemenizi saklamak, görevleri ve ödülleri hesaplamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınız silinene kadar",
      },
      {
        data: "Kullanım şartlarını kabul ettiğiniz zaman",
        purpose: "Şartların kabul edildiğini gösterebilmek",
        legalBasis: "KVKK m.5/2-(e): bir hakkın tesisi, kullanılması veya korunması",
        retention: "Hesabınız silinene kadar",
      },
      {
        data: "Maç kaydı: iki oyuncunun numarası, mod, tahta durumu, son hamle, süre, emoji, sonuç, puan değişimi",
        purpose: "Maçı sunucuda yürütmek, sonucu ve sıralamayı hesaplamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Otomatik silinmez. Hesabınız silinince kayıttaki numara artık size bağlanamaz",
      },
      {
        data: "Eşleşme kuyruğu kaydı (MMR, mod, giriş zamanı) ve arkadaş davet kodu",
        purpose: "Size rakip bulmak, arkadaşınızla maç başlatmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Eşleşince ya da kuyruktan çıkınca silinir; davet kodu en çok 10 dakika geçerlidir",
      },
      {
        data: "Sunucu günlükleri: oyuncu numarası, MMR, maç başlangıcı, bitişi ve kuyruk olayları",
        purpose: "Hataları ve takılan maçları bulmak",
        legalBasis: "KVKK m.5/2-(f): oyunu ayakta tutma menfaatimiz",
        retention: "Convex'in günlük saklama süresi kadar",
      },
      {
        data: "Reklam kimliği (Android reklam kimliği, iOS'ta izin verirseniz IDFA), IP adresi, cihaz bilgisi, reklam gösterim ve tıklamaları",
        purpose: "Google AdMob banner reklamlarını göstermek, ölçmek ve sahteciliği önlemek",
        legalBasis: "KVKK m.5/2-(f): oyunu reklam geliriyle ücretsiz sunma menfaatimiz",
        retention: "Google'ın kendi politikasındaki süre kadar",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek ve silme taleplerini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): oyuncuların sorularını cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Google bilgileriniz, Google ile giriş yaptığınızda Google'dan gelir. Oyun adını ilk girişte siz yazarsınız. Oyun, oturum ve günlük kayıtları oynarken otomatik oluşur. Reklam verilerini AdMob doğrudan cihazınızdan otomatik toplar. E-posta verileri bize yazdığınızda gelir.",
    required:
      "Oynamak için Google hesabıyla giriş yapmanız ve bir oyun adı seçmeniz gerekir, yoksa hesap açılamaz. Kutuda Google adınız hazır gelir, ama gerçek adınızı kullanmak zorunda değilsiniz. Bize yazmak isteğe bağlıdır.",
    notCollected: [
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi. Uygulama bu izinleri istemez.",
      "Serbest sohbet mesajı. Oyunda yalnızca altı hazır emoji vardır.",
      "Şifre. Girişi Google yapar, şifrenizi görmeyiz.",
      "Kullanım analitiği. Uygulamada analitik aracı yoktur.",
      "Ödeme bilgisi. Uygulama içi satın alma yoktur.",
      "Adınız, e-postanız ve oyun istatistikleriniz AdMob'a gönderilmez.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Oyunun sunucusunu, veritabanını, girişi ve günlükleri barındırır. Bu metindeki hesap, oturum ve oyun verilerini işler.",
        location: "AB (İrlanda, eu-west-1)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Google (giriş)",
        role: "Google ile girişi yürütür ve hesap bilgilerinizi sunucumuza iletir.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google AdMob",
        role: "Banner reklam gösterir ve ölçer. Reklam kimliğini, IP adresini ve cihaz bilgisini doğrudan cihazınızdan alır, kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play ve Apple App Store",
        role: "Uygulamayı dağıtır. Mağaza hesabınız ve indirme verileriniz kendi politikalarına tabidir.",
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
    recipientNote:
      "Convex'i oyunu çalıştırmak için kullanırız. Google AdMob, Google ve uygulama mağazaları aldıkları verileri kendi politikalarına göre, kısmen kendi amaçları için de işler. Verilerinizi satmayız. Yetkili kurumların hukuka uygun talepleri hâlinde gerekli bilgiyi paylaşabiliriz.",
    transfer:
      "Hesap ve oyun verileri Convex'in İrlanda'daki bölgesinde barındırılır; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Reklam verileri, Google ile giriş ve destek e-postaları da Google'ın yurt dışındaki altyapısında işlenir.",
    security:
      "Uygulama ile sunucu arasındaki trafik şifrelenir. Kimliğiniz sunucuda doğrulanan oturumdan gelir, hamleleriniz sunucuda kontrol edilir ve istek sayısı sınırlanır. Giriş oturumunuz cihazınızda uygulamanın yerel deposunda durur.",
    deletion:
      "Uygulamada silme düğmesi yoktur. Hesabınızı silmek için Google hesabınızın e-posta adresinden neuvikon@gmail.com adresine yazın. Hesabınızı, Google bilgilerinizi, oturumlarınızı ve oyuncu profilinizi sileriz; liderlik tablosundan da çıkarsınız. Geçmiş maç kayıtları rakibinizin geçmişi için kalır, ama içindeki numara artık size bağlanamaz. Profil ekranındaki çıkış düğmesi yalnızca oturumunuzu kapatır. Reklam kimliğinizi cihaz ayarlarından sıfırlayabilirsiniz.",
    children:
      "EdgeOut, Abalone kurallarıyla oynanan rekabetçi bir strateji oyunudur; 13 yaş ve üzeri oyuncular içindir. Kullanım şartları 13 yaşından küçüklerin oynamasına izin vermez ve oyun Google hesabı ister, ama yaş sormaz. Çocuklardan bilerek kişisel veri toplamayız; 13 yaşından küçük birine ait bir hesabı öğrenirsek sileriz.",
    extra: [
      {
        title: "Diğer oyuncular ne görür",
        paragraphs: [
          "Rakibiniz maçta oyun adınızı, derecenizi, seviyenizi, galibiyet ve seri bilgilerinizi ve gönderdiğiniz emojileri görür. İlk 20 sıradaysanız adınız, MMR'ınız, dereceniz, seviyeniz ve galibiyet sayınız liderlik tablosunda herkese görünür. Oyun adı kutusu ilk girişte Google adınızla dolu gelir, değiştirmezseniz bu ad görünür. Bu kutudaki ad sonradan uygulamadan değiştirilemez. E-posta adresiniz gösterilmez.",
        ],
      },
      {
        title: "Reklamlar",
        paragraphs: [
          "Android ve iOS uygulamalarının altında Google AdMob banner reklamı gösterilir. Reklam isteklerinde kişiselleştirmeyi kapatan bir ayar göndermiyoruz, bu nedenle reklamlar Google'ın ayarlarına ve cihaz tercihlerinize göre kişiselleştirilmiş olabilir.",
          "iOS'ta uygulama reklamları başlatmadan önce Apple'ın izleme iznini (ATT) sorar; izin vermezseniz IDFA paylaşılmaz. Bunun dışında uygulamada ayrı bir reklam rıza ekranı yoktur.",
          "Reklam tercihleriniz: https://myadcenter.google.com/ . Google'ın reklam çerezleri: https://policies.google.com/technologies/ads . Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Android izinleri",
        paragraphs: [
          "Uygulama internet, ağ durumu ve reklam kimliği iznini kullanır. Android yedeklemesi açıksa uygulama verileri kendi Google hesabınıza yedeklenebilir.",
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
      "You sign in to EdgeOut with your Google account. Your account, player name, rating and match records live on our server at Convex, and your name and stats are visible to other players. The mobile app shows Google AdMob banner ads. To delete your account you need to write to neuvikon@gmail.com; there is no delete button in the app.",
    scope:
      "This policy covers EdgeOut, an online strategy game published by Neuvikon for Android and iOS, and the game's server on Convex.",
    rows: [
      {
        data: "Name, email address, email verification status, profile photo link and Google account ID from your Google account",
        purpose: "Creating your account and recognising you",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until your account is deleted",
      },
      {
        data: "Google sign-in tokens",
        purpose: "Completing Google sign-in",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until your account is deleted",
      },
      {
        data: "Session record: session token, IP address, browser/app details, expiry time",
        purpose: "Keeping you signed in and protecting your account from others",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in protecting accounts",
        retention: "Deleted when you sign out; an expired record may remain until your account is deleted at the latest",
      },
      {
        data: "Player name (up to 20 characters) and profile: MMR, rank, level, wins, losses, draws, streak",
        purpose: "Showing you to opponents and on the leaderboard",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until your account is deleted",
      },
      {
        data: "Game progress: XP, daily quests and streak, tutorial status, days played",
        purpose: "Saving your progress and working out quests and rewards",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until your account is deleted",
      },
      {
        data: "The time you accepted the terms of use",
        purpose: "Being able to show the terms were accepted",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in establishing and defending legal claims",
        retention: "Until your account is deleted",
      },
      {
        data: "Match record: both players' numbers, mode, board state, last move, clock, emotes, result, rating change",
        purpose: "Running the match on the server and working out results and rankings",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not deleted automatically. Once your account is deleted, the number in it can no longer be linked to you",
      },
      {
        data: "Matchmaking queue entry (MMR, mode, join time) and friend invite code",
        purpose: "Finding you an opponent and starting a match with a friend",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Deleted when you are matched or leave the queue; an invite code lasts up to 10 minutes",
      },
      {
        data: "Server logs: player number, MMR, match start and end, queue events",
        purpose: "Finding errors and stuck matches",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the game running",
        retention: "As long as Convex's log retention period",
      },
      {
        data: "Advertising ID (Android advertising ID, or IDFA on iOS if you allow it), IP address, device details, ad impressions and clicks",
        purpose: "Showing and measuring Google AdMob banner ads and preventing fraud",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in funding the free game with ads",
        retention: "As long as Google's own policy sets",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering support and deletion requests",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering players' questions",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Your Google details come from Google when you sign in. You type your player name at first sign-in. Game, session and log records are created automatically as you play. AdMob collects ad data directly and automatically from your device. Email data arrives when you write to us.",
    required:
      "To play you need to sign in with Google and pick a player name; without them no account can be created. The box comes pre-filled with your Google name, but you do not have to use your real name. Writing to us is optional.",
    notCollected: [
      "Location, contacts, photos, camera or microphone data. The app does not ask for these permissions.",
      "Free-text chat. The game only has six preset emotes.",
      "Passwords. Google handles sign-in and we never see your password.",
      "Usage analytics. The app has no analytics tool.",
      "Payment details. There are no in-app purchases.",
      "Your name, email and game stats are not sent to AdMob.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Hosts the game's server, database, sign-in and logs. Processes the account, session and game data in this policy.",
        location: "EU (Ireland, eu-west-1)",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Google (sign-in)",
        role: "Runs Google sign-in and passes your account details to our server.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Google AdMob",
        role: "Shows and measures banner ads. Receives the advertising ID, IP address and device details directly from your device and processes them under its own policy.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play and Apple App Store",
        role: "Distribute the app. Your store account and download data fall under their own policies.",
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
    recipientNote:
      "We use Convex to run the game. Google AdMob, Google and the app stores process what they receive under their own policies, partly for their own purposes too. We do not sell your data. We may disclose information where a lawful request from an authority requires it.",
    transfer:
      "Account and game data are hosted in Convex's Ireland region, which is outside Turkey. Ad data, Google sign-in and support email are also processed on Google's infrastructure, which may be outside your country.",
    security:
      "Traffic between the app and the server is encrypted. Your identity comes from a session verified on the server, your moves are checked on the server, and request rates are limited. Your sign-in session is kept in the app's local storage on your device.",
    deletion:
      "There is no delete button in the app. To delete your account, write to neuvikon@gmail.com from your Google account's email address. We delete your account, Google details, sessions and player profile, and you leave the leaderboard. Past match records stay as part of your opponents' history, but the number in them can no longer be linked to you. The sign-out button on the profile screen only ends your session. You can reset your advertising ID in your device settings.",
    children:
      "EdgeOut is a competitive strategy game played with Abalone rules, for players aged 13 and over. The terms of use do not allow anyone under 13 to play and the game requires a Google account, but it does not ask your age. We do not knowingly collect personal data from children and delete an account if we learn it belongs to someone under 13.",
    extra: [
      {
        title: "What other players see",
        paragraphs: [
          "Your opponent sees your player name, rank, level, wins and streak, and the emotes you send. If you are in the top 20, your name, MMR, rank, level and win count appear to everyone on the leaderboard. The player name box is pre-filled with your Google name at first sign-in, and that name is what others see unless you change it. You cannot change it later in the app. Your email address is not shown.",
        ],
      },
      {
        title: "Ads",
        paragraphs: [
          "The Android and iOS apps show a Google AdMob banner at the bottom. We do not send a setting that turns personalisation off, so ads may be personalised according to Google's settings and your device preferences.",
          "On iOS the app asks for Apple's tracking permission (ATT) before starting ads; if you refuse, the IDFA is not shared. Apart from that, the app has no separate ad consent screen.",
          "Your ad preferences: https://myadcenter.google.com/ . Google's advertising cookies: https://policies.google.com/technologies/ads . How Google uses this data: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Android permissions",
        paragraphs: [
          "The app uses the internet, network state and advertising ID permissions. If Android backup is on, app data may be backed up to your own Google account.",
        ],
      },
      {
        title: "This page",
        paragraphs: [
          "neuvikon.com's hosting provider may keep standard access logs such as IP address, browser details and a timestamp when you open this page. The site's general privacy policy has the details.",
        ],
      },
    ],
  },
};
