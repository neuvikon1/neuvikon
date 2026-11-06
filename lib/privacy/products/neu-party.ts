import type { ProductPolicy } from "@/lib/privacy/types";

export const neuParty: ProductPolicy = {
  slug: "neu-party",
  name: "Neu Party",
  project: "Neu-Pummel Party",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Neu Party'de hesap açmazsınız, reklam ve uygulama içi satın alma yoktur. Yine de oyun açıldığında Unity'ye bağlanır: oyun ayarlarını almak için geçici bir kimlikle giriş yapar ve hata olursa çökme kaydı gönderir. Kullanım istatistikleri ise yalnızca ilk açılıştaki ekranda kabul ederseniz toplanır.",
    scope:
      "Bu metin, Neuvikon'un Android için yayımladığı çok oyunculu parti oyunu Neu Party'yi kapsar. Bizim işlettiğimiz bir oyun sunucusu yoktur; internet odaları ve uzak ayarlar Unity Gaming Services üzerinden çalışır.",
    rows: [
      {
        data: "Unity oyuncu kimliği, kurulum kimliği, IP adresi, cihaz modeli ve donanım bilgisi, işletim sistemi, dil, uygulama sürümü",
        purpose: "Her açılışta uzak oyun ayarlarını almak: denge değerleri, sorunlu bir mini oyunu kapatma",
        legalBasis: "KVKK m.5/2-(f): oyunu dengeli ve çalışır tutma menfaatimiz",
        retention:
          "Remote Config bu verileri saklamaz. Oyuncu kimliği, siz istemedikçe ya da biz silmedikçe Unity Authentication'da kalır",
      },
      {
        data: "Unity oyuncu kimliği, IP adresi, oda numarası, oda bağlantı kodu",
        purpose: "İnternet üzerinden oda kurmak ve odaya katılmak (Unity Lobby ve Relay)",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Relay'de 30 gün, Lobby günlüklerinde oyuncu kimliği en çok 30 gün",
      },
      {
        data: "Oyuncu adı, oyunun cihazınızda ürettiği jeton, galibiyet sayısı, seçili görünüm, oyun içi girdiler",
        purpose: "Aynı odadaki oyuncularla maç oynamak, kopan oyuncuyu aynı yerine geri almak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Bizde saklanmaz. Maç boyunca oda kurucusunun ve oyuncuların cihazında durur",
      },
      {
        data: "Kurulum kimliği, çökme kaydı, uygulama yanıt vermedi kaydı, hata izi, son günlük satırları, cihaz bilgisi",
        purpose: "Oyundaki hataları bulmak ve düzeltmek (Unity tanılama)",
        legalBasis: "KVKK m.5/2-(f): oyunu kararlı çalıştırma menfaatimiz",
        retention: "Unity'de en çok 90 gün",
      },
      {
        data: "IP adresi, kurulum kimliği, Unity kullanıcı ve oyuncu kimliği, cihaz bilgisi, oturum bilgisi, maç ve tur olayları (mini oyun, tur, oyuncu sayısı, çevrimiçi mi)",
        purpose: "Hangi mini oyunların oynandığını ve maçların nerede bırakıldığını anlamak (Unity Analytics)",
        legalBasis: "KVKK m.5/1: açık rıza",
        retention: "Unity'de 13 ay",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): soruları cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Uzak ayar isteği her açılışta, tanılama verisi hata anında otomatik gider. Oda verileri siz oda kurunca ya da odaya katılınca, maç verileri oyun sırasında otomatik işlenir. İstatistikler yalnızca izin verdiyseniz otomatik toplanır. E-posta verileri siz yazınca gelir.",
    required:
      "Hesap ya da kişisel bilgi vermeden oynarsınız; ad boş kalırsa oyun rastgele bir ad seçer. İstatistik paylaşımı isteğe bağlıdır, reddederseniz hiçbir özellik kapanmaz. Uzak ayar isteği ve tanılama oyunda kapatılamaz ve bu seçimden etkilenmez. İnternet olmadan da aynı Wi-Fi'de oynayabilirsiniz; bu durumda bu veriler Unity'ye ulaşmaz.",
    notCollected: [
      "E-posta, telefon numarası, ödeme bilgisi ya da oyun içi hesap.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi. Oyun bu izinleri istemez.",
      "Reklam kimliği. Oyunda reklam yoktur.",
      "Sohbet mesajı. Oyunda sohbet yoktur.",
    ],
    recipients: [
      {
        name: "Unity Technologies",
        role: "Authentication, Remote Config, Lobby, Relay, tanılama ve Analytics hizmetlerini sağlar. Unity'nin belgelerine göre bu hizmetlerde bizim adımıza işleyen konumundadır; kendisinin veri sorumlusu olduğu işlemlerde kendi politikası geçerlidir.",
        location: "ABD ve Unity'nin tesisi bulunan diğer ülkeler",
        url: "https://unity.com/legal/game-player-and-app-user-privacy-policy",
      },
      {
        name: "Aynı odadaki oyuncular",
        role: "Adınızı, görünümünüzü ve skorunuzu görür. Oda kurucusunun cihazı ayrıca jetonunuzu, galibiyet sayınızı ve girdilerinizi alır.",
        location: "Oyuncuların bulunduğu yer",
      },
      {
        name: "Google Play",
        role: "Oyunu dağıtır. Mağaza verilerini kendi gizlilik politikasına göre işler.",
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
      "Unity'ye giden veriler Türkiye dışında, ABD'nin de aralarında olduğu ülkelerde işlenir; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Destek e-postaları Google'ın yurt dışındaki sunucularında saklanır, bu da aynı kapsamdadır. Aynı Wi-Fi'de oynarken cihazlar birbirine doğrudan bağlanır ve bu trafik yurt dışına çıkmaz.",
    security:
      "İnternet odalarında oyun trafiği Unity Relay üzerinden şifreli (DTLS) taşınır. Yerel ağ oyunu şifrelenmez: oda duyurusu ve maç verileri, oyuncu adı dahil, aynı ağdaki cihazlardan görülebilir. Bu yüzden adınıza kişisel bilgi yazmayın ve güvenmediğiniz ağlarda dikkatli olun.",
    deletion:
      "Oyunu kaldırdığınızda ya da uygulama verilerini temizlediğinizde ad, ilerleme ve ayarlar cihazınızdan silinir. Unity'deki oyuncu kimliği ve istatistikler bununla silinmez, oyun içinde de bunun için bir düğme yoktur. Silinmesi için bize yazın; Unity'den silinmesini talep ederiz. Oyun kimliğinizi göstermediği için talebi hangi kayıtla eşleştirebileceğimiz sınırlı olabilir. İstatistikler her durumda 13 ay sonra, tanılama verileri en çok 90 gün sonra silinir.",
    children:
      "Neu Party 13 yaşın altındaki çocuklara yönelik değildir ve bu yaş grubundan bilerek kişisel veri toplamayız. Böyle bir veriye ulaştığımızı öğrenirsek sileriz.",
    extra: [
      {
        title: "İstatistik onayı",
        paragraphs: [
          "İlk açılışta ayrı bir ekran, istatistik paylaşımını kabul edip etmediğinizi sorar; karar vermeden kapanmaz ve varsayılan olarak veri toplanmaz. Bu seçimi Ayarlar > İstatistik paylaşımı anahtarından değiştirebilirsiniz. Bu onay yalnızca kullanım istatistiklerini kapsar, tanılama ve uzak ayarları kapsamaz.",
        ],
      },
      {
        title: "Android izinleri",
        list: [
          "İnternet ve ağ durumu: Unity hizmetleri ve çok oyunculu bağlantı için.",
          "Wi-Fi durumu ve çok noktaya yayın: aynı ağdaki odaları bulmak için.",
          "Titreşim: oyun içi geri bildirim için.",
        ],
      },
      {
        title: "Cihazınızda kalan veriler",
        paragraphs: [
          "Ad, ilerleme, ayarlar, son bağlanılan IP ve tekrar kayıtları cihazınızda durur, bize gönderilmez. Android yedeklemesi açıksa cihazınız bunları kendi Google hesabınıza yedekleyebilir; bu kopyayı biz göremeyiz. Sonuç kartını paylaşırsanız metin, seçtiğiniz uygulamaya gider.",
        ],
      },
      {
        title: "Bu sayfa",
        paragraphs: [
          "Bu metni açtığınızda oyun bağlantıyı tarayıcınızda açar. neuvikon.com'un barındırma sağlayıcısı IP adresi, tarayıcı bilgisi ve zaman damgası gibi standart erişim kayıtları tutabilir. Ayrıntı sitenin genel gizlilik politikasındadır.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Neu Party has no accounts, ads or in-app purchases. Even so, the game connects to Unity when it starts: it signs in with a temporary ID to fetch game settings, and sends a crash report if something breaks. Usage statistics are collected only if you agree on the first-launch screen.",
    scope:
      "This policy covers Neu Party, a multiplayer party game published by Neuvikon for Android. We run no game server of our own; internet rooms and remote settings work through Unity Gaming Services.",
    rows: [
      {
        data: "Unity player ID, installation ID, IP address, device model and hardware details, operating system, language, app version",
        purpose: "Fetching remote game settings at each launch: balance values, switching off a faulty mini game",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the game balanced and working",
        retention:
          "Remote Config does not retain this data. The player ID stays in Unity Authentication until you ask us to delete it or we delete it",
      },
      {
        data: "Unity player ID, IP address, room number, room join code",
        purpose: "Creating and joining rooms over the internet (Unity Lobby and Relay)",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "30 days in Relay; the player ID stays in Lobby logs for up to 30 days",
      },
      {
        data: "Player name, a token the game creates on your device, win count, selected look, in-game inputs",
        purpose: "Playing with others in the room and returning a dropped player to the same slot",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not kept by us. Held on the host's and players' devices during the match",
      },
      {
        data: "Installation ID, crash logs, app-not-responding records, error traces, recent log lines, device details",
        purpose: "Finding and fixing bugs (Unity diagnostics)",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the game stable",
        retention: "Up to 90 days at Unity",
      },
      {
        data: "IP address, installation ID, Unity user and player IDs, device details, session details, match and round events (mini game, round, player count, online or not)",
        purpose: "Understanding which mini games are played and where matches stop (Unity Analytics)",
        legalBasis: "GDPR Art. 6(1)(a): consent",
        retention: "13 months at Unity",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "The remote settings request goes out automatically at each launch, and diagnostics automatically when an error occurs. Room data is processed automatically when you host or join, and match data during play. Statistics are collected automatically only if you allowed them. Email data reaches us when you write.",
    required:
      "You can play without an account or personal details; leave the name blank and the game picks a random one. Sharing statistics is optional and declining disables nothing. The remote settings request and diagnostics cannot be turned off in the game and are not affected by that choice. You can also play on the same Wi-Fi with no internet connection, in which case this data does not reach Unity.",
    notCollected: [
      "Email, phone number, payment details or an in-game account.",
      "Location, contacts, photos, camera or microphone data. The game does not request these permissions.",
      "Advertising ID. The game has no ads.",
      "Chat messages. The game has no chat.",
    ],
    recipients: [
      {
        name: "Unity Technologies",
        role: "Provides Authentication, Remote Config, Lobby, Relay, diagnostics and Analytics. Unity's documentation describes it as our processor for these services; its own policy applies where it acts as a controller.",
        location: "United States and other countries where Unity has facilities",
        url: "https://unity.com/legal/game-player-and-app-user-privacy-policy",
      },
      {
        name: "Other players in the room",
        role: "See your name, look and score. The host's device also receives your token, win count and inputs.",
        location: "Wherever the players are",
      },
      {
        name: "Google Play",
        role: "Distributes the game and handles store data under its own privacy policy.",
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
      "Data sent to Unity is processed outside Turkey and outside your country, including in the United States. Support email is stored on Google's servers abroad. On the same Wi-Fi, devices connect directly to each other and that traffic does not leave the network.",
    security:
      "In internet rooms, game traffic travels through Unity Relay encrypted with DTLS. Local network play is not encrypted: room broadcasts and match data, including player names, can be seen from other devices on that network. So keep personal details out of your name and take care on networks you do not trust.",
    deletion:
      "Uninstalling the game or clearing its app data deletes your name, progress and settings from the device. That does not delete your player ID or statistics at Unity, and the game has no button for it. Write to us and we will ask Unity to delete them. The game does not show you your ID, so we may be limited in matching a request to a record. Statistics are deleted after 13 months and diagnostics after 90 days at most in any case.",
    children:
      "Neu Party is not aimed at children under 13 and we do not knowingly collect personal data from them. We delete such data if we learn we hold any.",
    extra: [
      {
        title: "Statistics consent",
        paragraphs: [
          "A separate screen on first launch asks whether you agree to share statistics. It stays until you choose, and nothing is collected by default. You can change this under Settings > Share statistics. This consent covers usage statistics only, not diagnostics or remote settings.",
        ],
      },
      {
        title: "Android permissions",
        list: [
          "Internet and network state: for Unity services and multiplayer connections.",
          "Wi-Fi state and multicast: to find rooms on the same network.",
          "Vibration: for in-game feedback.",
        ],
      },
      {
        title: "Data that stays on your device",
        paragraphs: [
          "Your name, progress, settings, last connected IP and replay files stay on your device and are not sent to us. If Android backup is on, your device may back them up to your own Google account; we cannot see that copy. If you share a result card, the text goes to the app you choose.",
        ],
      },
      {
        title: "This page",
        paragraphs: [
          "The game opens this page in your browser. The hosting provider of neuvikon.com may keep standard access logs such as IP address, browser details and a timestamp. See the site's general privacy policy for details.",
        ],
      },
    ],
  },
};
