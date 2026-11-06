import type { ProductPolicy } from "@/lib/privacy/types";

export const guessfast: ProductPolicy = {
  slug: "guessfast",
  name: "GuessFast",
  project: "GuessFast",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "GuessFast'te e-postayla hesap açılmaz ve GPS konumu kullanılmaz; oyun cihazınıza Firebase üzerinden anonim bir kimlik verir. Günlük skorlarınız takma adınız ve cihaz bölgesinden gelen ülke bilgisiyle herkese açık sıralamalarda görünür. Oyunda Google AdMob reklamları vardır ve kişiselleştirilmemiş reklam isteriz. Verilerinizi silmek için neuvikon@gmail.com adresine yazmanız gerekir, uygulamada silme düğmesi yoktur.",
    scope:
      "Bu metin, Neuvikon'un Android ve iOS için yayımladığı GuessFast oyununu ve oyun verilerini tutan Firebase altyapısını kapsar. Oyunda Sayı, Tahmin, Film, Kişi ve Hangisi Çok oyunları ile çevrimiçi PvP bulunur.",
    rows: [
      {
        data: "Firebase'in ürettiği anonim kullanıcı kimliği",
        purpose: "Skorlarınızı, adınızı ve reytinginizi aynı oyuncuya bağlamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Otomatik silinmez, siz silinmesini isteyene kadar kalır",
      },
      {
        data: "IP adresi ve tarayıcı/uygulama bilgisi (user agent)",
        purpose: "Anonim oturum açarken güvenlik ve kötüye kullanımı önleme",
        legalBasis: "KVKK m.5/2-(f): oyunu kötüye kullanıma karşı koruma meşru menfaati",
        retention: "Firebase IP kayıtlarını birkaç hafta tutar",
      },
      {
        data: "Takma ad (onaylı ad ya da geçici Guest_1234 adı)",
        purpose: "Sizi sıralamalarda ve PvP'de göstermek, aynı adın iki kişide olmasını önlemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Otomatik silinmez, siz silinmesini isteyene kadar kalır",
      },
      {
        data: "İstediğiniz takma ad ve onay durumu",
        purpose: "Adları yayımlanmadan önce elle incelemek",
        legalBasis: "KVKK m.5/2-(f): sıralamaları uygunsuz adlardan koruma meşru menfaati",
        retention:
          "Onaylanan talep ad kaydına dönüşür. Reddedilen talep silinir; reddedilen ad, uyarıyı görene kadar oyuncu kaydınızda kalır",
      },
      {
        data: "Günlük tur sonuçları: puan, tarih, deneme sayısı, süre, tahminler ve cevaplar, oyun başına toplamlar",
        purpose: "Günlük, haftalık, aylık ve genel sıralamalar, seri takibi, gün sonu özetleri",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Otomatik silinmez, siz silinmesini isteyene kadar kalır",
      },
      {
        data: "Ülke (cihazınızın bölge ayarından). Eski kayıtlarda şehir adı bulunabilir",
        purpose: "Sıralamada adınızın yanında ülke etiketi göstermek",
        legalBasis: "KVKK m.5/2-(f): sıralamaya uluslararası rekabet bağlamı katma meşru menfaati",
        retention: "Skor kaydıyla birlikte kalır, siz silinmesini isteyene kadar",
      },
      {
        data: "PvP verileri: takma ad, reyting, maç sayısı, tahminler, kendi belirlediğiniz gizli sayı, oda ve eşleşme kayıtları",
        purpose: "Maçı yürütmek, eşleştirme yapmak, reyting ve ligleri hesaplamak, hileyi önlemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Reyting silinmesini isteyene kadar kalır. Oda ve eşleşme kayıtları otomatik silinmez; dört haneli oda kodu yeniden kullanılınca o oda kaydının üzerine yazılır",
      },
      {
        data: "Google'ın topladığı reklam verileri: reklam kimliği, IP adresi ve ondan çıkan genel konum, reklam etkileşimleri, tanılama verileri",
        purpose: "Kişiselleştirilmemiş reklam göstermek, reklamı ölçmek, sahteciliği önlemek",
        legalBasis: "KVKK m.5/2-(f): ücretsiz oyunu reklamla finanse etme meşru menfaati",
        retention: "Google kendi sürelerini uygular; aşağıdaki Reklamlar bölümüne bakın",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap verme meşru menfaati",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
      {
        data: "Silme ya da veri hakkı başvurunuzdaki bilgiler",
        purpose: "Başvurunuzu kanuni süresinde sonuçlandırmak",
        legalBasis: "KVKK m.5/2-(ç): hukuki yükümlülük",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Anonim kimlik oyun ilk açıldığında otomatik oluşur. Takma adı siz yazarsınız. Günlük turu bitirdiğinizde sonucunuz ve o anki ülke bilginiz otomatik kaydedilir; ülke, cihazınızın bölge ayarından okunur. PvP verileri maç sırasında oluşur. Reklam verilerini Google'ın reklam yazılımı otomatik toplar. Serbest oyun, XP, başarımlar ve ayarlar yalnızca cihazınızda durur, bize gelmez.",
    required:
      "Takma ad isteğe bağlıdır; vermezseniz sıralamada Anonymous, PvP'de genel bir oyuncu adıyla görünürsünüz. Günlük tur ve PvP de isteğe bağlıdır; serbest oyun sonuçları sıralamaya yazılmaz. Anonim kimlik oyunun açılışında otomatik oluşur, ülke etiketi de günlük turda otomatik yazılır; bunları oyun içinden kapatamazsınız. Bildirim izni ve iOS'taki izleme izni isteğe bağlıdır, vermezseniz oyun çalışmaya devam eder.",
    notCollected: [
      "GPS ya da cihaz konumu. Güncel sürümler konum izni istemez.",
      "E-posta, telefon numarası ya da şifre. Oyunda bunları isteyen bir kayıt yoktur.",
      "Rehber, fotoğraf, kamera ya da mikrofon verisi.",
      "Oyun içi sohbet. Oyuncular yalnızca takma ad, skor ve maç hamlelerini görür.",
      "Firebase Analytics ve Crashlytics. Bu oyunda kullanılmaz.",
      "Ödeme bilgisi. Oyunda uygulama içi satın alma yoktur.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Anonim kimliği üretir, oturumu açar, skor, ad ve PvP verilerini saklar.",
        location: "Kimlik doğrulama ABD'de; oyun verileri Türkiye dışındaki Google Cloud sunucularında",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Reklam gösterir. Reklam kimliği, IP adresi, reklam etkileşimleri ve tanılama verilerini alır.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play",
        role: "Oyunu Android'de dağıtır ve indirme kayıtlarını kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Apple App Store",
        role: "Oyunu iOS'ta dağıtır ve indirme kayıtlarını kendi politikasına göre işler.",
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
      "Anonim oturum Firebase'in ABD'deki veri merkezlerinde işlenir. Skor, ad ve PvP verileri Türkiye dışındaki Google Cloud sunucularında, reklam verileri ve destek e-postaları Google'ın yurt dışındaki altyapısında tutulur. Bunlar KVKK m.9 kapsamında yurt dışına aktarımdır.",
    security:
      "Oyun ile Firebase ve Google arasındaki trafik şifrelenir. Veritabanı kuralları, her oyuncunun yalnızca kendi skorunu yazmasına izin verir ve PvP'de belirlediğiniz sayıyı tur bitene kadar rakibinizden gizler. Sıralama verileri bilerek herkese açıktır, bu yüzden takma adınıza kişisel bilgi yazmayın.",
    deletion:
      "Uygulamada silme düğmesi yoktur. Silmek için neuvikon@gmail.com adresine yazın; takma adınızı ya da Guest adınızı ve oynadığınız bir günü belirtin, çünkü anonim kimliğinizi oyunda göremezsiniz ve sizi bu bilgilerle buluruz. Skorlarınızı, adınızı, reytinginizi, oda ve eşleşme kayıtlarınızı ve anonim hesabınızı sileriz. Kimlik bilgisi taşımayan günlük toplam sayılar kalır. Firebase silinen hesap verisini yedeklerinden 180 güne kadar temizler. Oyunu kaldırmak yalnızca cihazınızdaki verileri siler, sunucudaki kayıtları silmez; yeniden kurarsanız yeni bir kimlik oluşur ve eski kayıtlar yerinde kalır. Reklam kimliğinizi cihaz ayarlarından sıfırlayabilirsiniz.",
    children:
      "GuessFast App Store'da 4+, Google Play'de PEGI 3 derecesiyle listelenir, ama bu dereceler yalnızca içeriğin uygunluğunu gösterir. Oyun çocuklara özel tasarlanmadı: genel kültür, film ve ünlü kişi bilgisi ister, dereceli PvP ve herkese açık sıralama içerir, reklam gösterir. Yaş sormadığımız için oyuncuların yaşını bilmeyiz ve çocuklardan veri toplamayı hedeflemeyiz. Küçük bir çocuk oynuyorsa takma ad olarak gerçek adını yazmamasını sağlayın. Veliyseniz ve çocuğunuzun verisinin silinmesini istiyorsanız takma adıyla bize yazın, sileriz.",
    extra: [
      {
        title: "Sıralamalar ve diğer oyuncular",
        paragraphs: [
          "Takma adınız, ülkeniz, skorlarınız ve PvP reytinginiz sıralamalarda herkese açıktır. Bu kayıtlar yalnızca oyunun içinden değil, oturum açmadan veritabanından da okunabilir. Onay bekleyen ad da oyuncu kaydınızda bulunur. Takma adlar yayımlanmadan önce elle incelenir, onaya kadar geçici Guest_1234 adıyla oynarsınız.",
          "PvP'de rakibiniz takma adınızı, reytinginizi ve tahminlerinizi görür; belirlediğiniz sayıyı tur bitince görür. Oda kayıtlarını oturum açmış başka oyuncular da teknik olarak okuyabilir. Oyunda sohbet yoktur.",
        ],
      },
      {
        title: "Reklamlar",
        paragraphs: [
          "Oyunda Google AdMob banner, geçiş ve ödüllü reklamları gösterilir. Tüm reklam isteklerini kişiselleştirilmemiş olarak göndeririz. Google bu reklamlarda da reklam kimliğini ve IP adresini sıklık sınırı, ölçüm ve sahtecilik önleme için kullanabilir, IP adresinden genel konumu tahmin edebilir.",
          "iOS'ta oyun açılışta Apple'ın izleme iznini (ATT) sorar; izin vermezseniz reklam kimliği paylaşılmaz. Bunun dışında uygulamada ayrı bir reklam rıza ekranı yoktur.",
          "Reklam tercihleriniz: https://myadcenter.google.com/ . Google'ın reklam çerezleri: https://policies.google.com/technologies/ads . Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Bildirimler ve Android izinleri",
        paragraphs: [
          "Günlük tur ve seri hatırlatmaları cihazınızda planlanır, sunucumuzdan gönderilmez ve bildirim jetonu almayız. Telefon yeniden başladığında bu hatırlatmaların korunması için Android'de açılışta başlama izni bulunur.",
          "Android paketinde konum, depolama ve diğer uygulamaların üzerinde gösterme izinleri de görünebilir. Bunlar kullandığımız kütüphanelerden ve hazır proje şablonundan gelir; oyun bu izinleri sizden istemez ve kullanmaz.",
        ],
      },
      {
        title: "Eski sürümlerdeki şehir bilgisi",
        paragraphs: [
          "Oyunun 2026 başındaki eski sürümleri sıralama için cihaz konumundan şehir adı alıyordu. Güncel sürümler yalnızca bölge ayarından ülkeyi kullanır. O döneme ait skor kayıtlarında şehir adı durabilir; silinmesi için bize yazabilirsiniz.",
        ],
      },
    ],
  },
  en: {
    summary:
      "GuessFast has no email sign-up and uses no GPS location; the game gives your device an anonymous ID through Firebase. Your daily scores appear on public leaderboards with your nickname and a country taken from your device region. The game shows Google AdMob ads and we request non-personalised ads. To delete your data you need to write to neuvikon@gmail.com; there is no delete button in the app.",
    scope:
      "This policy covers GuessFast, published by Neuvikon for Android and iOS, and the Firebase infrastructure that holds its game data. The game has the Number, Estimate, Movie, Person and Higher or Lower games and online PvP.",
    rows: [
      {
        data: "Anonymous user ID generated by Firebase",
        purpose: "Linking your scores, name and rating to the same player",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not deleted automatically; kept until you ask us to delete it",
      },
      {
        data: "IP address and user agent",
        purpose: "Security and abuse prevention during anonymous sign-in",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in protecting the game from abuse",
        retention: "Firebase keeps logged IP addresses for a few weeks",
      },
      {
        data: "Nickname (approved name or temporary Guest_1234 name)",
        purpose: "Showing you on leaderboards and in PvP, keeping names unique",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not deleted automatically; kept until you ask us to delete it",
      },
      {
        data: "The nickname you request and its approval status",
        purpose: "Reviewing names by hand before they are published",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping leaderboards free of inappropriate names",
        retention:
          "An approved request becomes your name record. A rejected request is deleted; the rejected name stays in your player record until you see the notice",
      },
      {
        data: "Daily round results: score, date, attempts, time, guesses and answers, per-game totals",
        purpose: "Daily, weekly, monthly and overall leaderboards, streaks, daily summaries",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not deleted automatically; kept until you ask us to delete it",
      },
      {
        data: "Country (from your device region setting). Older records may hold a city name",
        purpose: "Showing a country label next to your name on leaderboards",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in giving leaderboards an international context",
        retention: "Kept with the score record until you ask us to delete it",
      },
      {
        data: "PvP data: nickname, rating, match count, guesses, the secret number you set, room and matchmaking records",
        purpose: "Running the match, matchmaking, calculating ratings and leagues, preventing cheating",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "Rating is kept until you ask us to delete it. Room and matchmaking records are not deleted automatically; a four-digit room code overwrites its room record when reused",
      },
      {
        data: "Ad data collected by Google: advertising ID, IP address and the general location derived from it, ad interactions, diagnostics",
        purpose: "Showing non-personalised ads, measuring ads, preventing fraud",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in funding a free game with ads",
        retention: "Google applies its own periods; see the Ads section below",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
      {
        data: "Details in a deletion or data rights request",
        purpose: "Completing your request within the legal time limit",
        legalBasis: "GDPR Art. 6(1)(c): legal obligation",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "The anonymous ID is created automatically when you first open the game. You type the nickname yourself. When you finish a daily round, your result and your current country are saved automatically; the country is read from your device region setting. PvP data is created during a match. Google's ad software collects ad data automatically. Free play, XP, achievements and settings stay on your device and never reach us.",
    required:
      "A nickname is optional; without one you appear as Anonymous on leaderboards and under a generic player name in PvP. Daily rounds and PvP are optional too, and free play results are not written to leaderboards. The anonymous ID is created automatically at launch and the country label is written automatically in daily rounds; you cannot turn these off in the game. Notification permission and the iOS tracking permission are optional, and the game keeps working without them.",
    notCollected: [
      "GPS or device location. Current versions do not ask for location permission.",
      "Email, phone number or password. The game has no sign-up that asks for them.",
      "Contacts, photos, camera or microphone data.",
      "In-game chat. Players see only nicknames, scores and match moves.",
      "Firebase Analytics and Crashlytics. This game does not use them.",
      "Payment details. The game has no in-app purchases.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Generates the anonymous ID, handles sign-in, and stores score, name and PvP data.",
        location: "Authentication in the US; game data on Google Cloud servers outside Turkey",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Shows ads. Receives the advertising ID, IP address, ad interactions and diagnostics.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play",
        role: "Distributes the game on Android and handles download records under its own policy.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
      {
        name: "Apple App Store",
        role: "Distributes the game on iOS and handles download records under its own policy.",
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
      "Anonymous sign-in is processed in Firebase data centres in the US. Score, name and PvP data sit on Google Cloud servers outside Turkey, and ad data and support email on Google's infrastructure abroad, so your data may leave your country. For users in Turkey this is a transfer abroad under KVKK Art. 9.",
    security:
      "Traffic between the game and Firebase and Google is encrypted. Database rules let each player write only their own scores and hide the number you set in PvP from your opponent until the round ends. Leaderboard data is public by design, so do not put personal details in your nickname.",
    deletion:
      "There is no delete button in the app. To delete your data, write to neuvikon@gmail.com with your nickname or Guest name and a day you played: you cannot see your anonymous ID in the game, so we find you by these details. We delete your scores, name, rating, room and matchmaking records and your anonymous account. Daily totals that carry no identity remain. Firebase clears deleted account data from its backups within up to 180 days. Uninstalling the game deletes only the data on your device, not the records on the server; if you reinstall, you get a new ID and the old records stay where they are. You can reset your advertising ID in your device settings.",
    children:
      "GuessFast is listed as 4+ on the App Store and PEGI 3 on Google Play, but these ratings only describe how suitable the content is. The game is not designed for children: it calls for general knowledge of films and famous people, and it has ranked PvP, public leaderboards and ads. We do not ask for age, so we do not know how old players are, and we do not aim to collect data from children. If a young child plays, make sure they do not use their real name as a nickname. If you are a parent and want your child's data deleted, write to us with the nickname and we will delete it.",
    extra: [
      {
        title: "Leaderboards and other players",
        paragraphs: [
          "Your nickname, country, scores and PvP rating are public on leaderboards. These records can be read not only inside the game but also directly from the database, without signing in. A name awaiting approval also sits in your player record. Nicknames are reviewed by hand before they are published, and until then you play as a temporary Guest_1234 name.",
          "In PvP your opponent sees your nickname, rating and guesses, and sees the number you set once the round ends. Other signed-in players can also technically read room records. The game has no chat.",
        ],
      },
      {
        title: "Ads",
        paragraphs: [
          "The game shows Google AdMob banner, interstitial and rewarded ads. We send every ad request as non-personalised. Even for these ads, Google may use the advertising ID and IP address for frequency capping, measurement and fraud prevention, and may estimate general location from the IP address.",
          "On iOS the game asks for Apple's tracking permission (ATT) at launch; if you refuse, the advertising ID is not shared. Apart from this, the app has no separate ad consent screen.",
          "Your ad preferences: https://myadcenter.google.com/ . Google's advertising cookies: https://policies.google.com/technologies/ads . How Google uses this data: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Notifications and Android permissions",
        paragraphs: [
          "Daily round and streak reminders are scheduled on your device, are not sent from our server, and we receive no notification token. Android has a run-at-startup permission so these reminders survive a phone restart.",
          "Location, storage and draw-over-other-apps permissions may also appear in the Android package. They come from libraries we use and from the stock project template; the game does not ask you for them and does not use them.",
        ],
      },
      {
        title: "City data from older versions",
        paragraphs: [
          "Older versions of the game from early 2026 took a city name from device location for leaderboards. Current versions use only the country from your region setting. Score records from that period may still hold a city name; write to us to have it deleted.",
        ],
      },
    ],
  },
};
