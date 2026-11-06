import type { ProductPolicy } from "@/lib/privacy/types";

export const pushbump: ProductPolicy = {
  slug: "pushbump",
  name: "PushBump",
  project: "PushBump",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "PushBump'ta Google ile giriş isteğe bağlıdır; girerseniz Google adınız liderlik tablosunda diğer oyunculara görünür. Hızlı eşleşmede oyun sizin için anonim bir hesap açar. Oyunda Google AdMob reklamları, Firebase Analytics ve Unity Relay kullanılır. Hesabınızı oyundaki Ayarlar ekranından silebilirsiniz.",
    scope:
      "Bu metin, Neuvikon'un Android için yayımladığı çevrimiçi arena oyunu PushBump'ı, oyunun Firebase veritabanını ve sunucu fonksiyonlarını kapsar.",
    rows: [
      {
        data: "Firebase kullanıcı kimliği (Google ile girişte ya da hızlı eşleşmede açılan anonim hesapta)",
        purpose: "Kupa, puan ve karakterlerinizi aynı hesaba bağlamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınızı silene kadar",
      },
      {
        data: "Google ile girerseniz adınız, e-posta adresiniz, profil fotoğrafı bağlantınız ve Google hesap kimliğiniz",
        purpose: "Hesabınızı açmak, ilerlemenizi başka cihazda da açabilmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınızı silene kadar",
      },
      {
        data: "Görünen ad (Google adınızın ilk 24 karakteri ya da Player_1234 gibi bir ad) ve kupa sayısı",
        purpose: "Sizi liderlik tablosunda göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınızı silene kadar",
      },
      {
        data: "Oyun ilerlemesi: kupa, puan, açılan karakter ve kostümler, günlük ödül sayaçları, son maç zamanı",
        purpose: "İlerlemenizi saklamak, ödül ve fiyat sınırlarını sunucuda uygulamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Hesabınızı silene kadar",
      },
      {
        data: "IP adresi ve uygulama bilgisi (Firebase Authentication giriş kayıtları)",
        purpose: "Oturum açmayı güvenli tutmak, kötüye kullanımı önlemek",
        legalBasis: "KVKK m.5/2-(f): oyunu kötüye kullanıma karşı koruma menfaatimiz",
        retention: "Firebase IP kayıtlarını birkaç hafta tutar",
      },
      {
        data: "Eşleşme ilanı: oda kodu, kullanıcı kimliği, kupa sayısı, oturum kimliği, zaman damgası",
        purpose: "Hızlı eşleşmede size rakip bulmak, bekleme süresini tahmin etmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Oda dolunca ya da bağlantınız kopunca silinir, kalan eski ilanlar birkaç dakikada temizlenir",
      },
      {
        data: "Unity anonim oyuncu kimliği, IP adresi ve maç sırasındaki oyun trafiği",
        purpose: "Çevrimiçi maçı Unity Relay üzerinden iki oyuncu arasında taşımak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Oyun trafiği maç boyunca aktarılır, oyuncu kimliği ve kayıtlar Unity'nin politikasına tabidir",
      },
      {
        data: "Satın alma kaydı: ürün, Google Play sipariş numarası, kullanıcı kimliği, tarih ve satın alma belirtecinin özeti",
        purpose: "Satın almayı Google Play'den doğrulamak, ürünü hesabınıza vermek, aynı makbuzun başka hesapta kullanılmasını önlemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Otomatik silinmez ve hesabınızı silince de kalır; silinmesi için bize yazabilirsiniz",
      },
      {
        data: "Kimliksiz maç özeti: karakter, sonuç, süre, verilen ve alınan hasar, zaman damgası",
        purpose: "Karakter dengesini ölçmek",
        legalBasis: "KVKK m.5/2-(f): oyunun dengesini geliştirme menfaatimiz",
        retention: "Otomatik silinmez; kimliğinize bağlı olmadığı için hesabınızı silince de kalır",
      },
      {
        data: "Firebase Analytics verileri: uygulama örnek kimliği, reklam kimliği, cihaz ve sürüm bilgisi, açılış ve oturum olayları",
        purpose: "Oyunun kaç kişi tarafından, ne kadar kullanıldığını anlamak",
        legalBasis: "KVKK m.5/2-(f): oyunu geliştirmek için kullanımı anlama menfaatimiz",
        retention: "Firebase projesindeki Google Analytics saklama ayarı kadar",
      },
      {
        data: "Reklam kimliği, IP adresi, cihaz bilgisi, reklam gösterim ve tıklamaları",
        purpose: "Google AdMob reklamlarını göstermek, ölçmek ve sahteciliği önlemek",
        legalBasis:
          "Reklam rıza ekranı çıkan bölgelerde KVKK m.5/1: açık rıza; diğer bölgelerde KVKK m.5/2-(f): oyunu reklam geliriyle ücretsiz sunma menfaatimiz",
        retention: "Google'ın kendi politikasındaki süre kadar",
      },
      {
        data: "Cihaz modeli, işletim sistemi, Unity sürümü gibi teknik motor istatistikleri",
        purpose: "Unity'nin motoru hangi cihazlarda çalıştığını ölçmesi",
        legalBasis: "KVKK m.5/2-(f): oyun motorunun sürdürülmesi menfaati",
        retention: "Unity'nin kendi politikasındaki süre kadar",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): oyuncuların sorularını cevaplama menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Google bilgileriniz, Giriş düğmesine bastığınızda Google üzerinden gelir. Anonim hesap, giriş yapmadan hızlı eşleşmeye girdiğinizde otomatik açılır. Oyun, reklam, analitik ve motor verileri oyun çalışırken otomatik toplanır. Satın alma bilgisi Google Play'den, e-posta verileri siz yazdığınızda gelir.",
    required:
      "Bot maçlarını giriş yapmadan oynayabilirsiniz; bu durumda ilerlemeniz yalnızca cihazınızda kalır. Çevrimiçi maç için anonim hesap ve Unity Relay bağlantısı gerekir. Google ile giriş isteğe bağlıdır, yapmazsanız ilerlemeniz başka cihaza taşınmaz. Satın alma ve ödüllü reklam da isteğe bağlıdır.",
    notCollected: [
      "Konum, rehber, fotoğraf, kamera ya da mikrofon verisi. Oyun bu izinleri istemez.",
      "Sohbet mesajı ya da ses. Oyunda sohbet ve arkadaş listesi yoktur.",
      "Şifre. Girişi Google yapar. E-posta adresiniz diğer oyunculara gösterilmez.",
      "Kart bilgisi. Ödemeyi Google Play yürütür, ödeme bilgilerinizi görmeyiz.",
      "Hata raporu. Firebase Crashlytics kullanılmaz, Unity'nin bulut hata raporlaması kapalıdır.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Hesap, oyun verileri ve sunucu fonksiyonları için altyapı sağlar. Kullanıcı kimliğini, Google hesap bilgilerini, IP adresini ve oyun verilerini işler.",
        location: "Veritabanı Belçika (europe-west1), fonksiyonlar ABD (us-central1), kimlik doğrulama ABD",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google Analytics for Firebase",
        role: "Otomatik kullanım ölçümü yapar. Uygulama örnek kimliğini, reklam kimliğini ve cihaz bilgisini alır.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google AdMob",
        role: "Reklam gösterir ve ölçer. Reklam kimliğini, IP adresini ve cihaz bilgisini doğrudan cihazınızdan alır, kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Unity Technologies",
        role: "Unity Authentication ve Relay ile çevrimiçi maç bağlantısını kurar, motor istatistiklerini alır. Oyuncu kimliğini ve IP adresini işler.",
        location: "Oyuncuya yakın Relay bölgesi, Türkiye dışında olabilir",
        url: "https://unity.com/legal/privacy-policy",
      },
      {
        name: "Google Play",
        role: "Oyunu dağıtır, satın almayı ve ödemeyi yürütür. Sunucumuz satın almayı Google Play'den doğrular.",
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
      "Firebase altyapısını oyunu çalıştırmak için kullanırız. Google AdMob, Google Analytics, Google Play ve Unity ise aldıkları verileri kendi politikalarına göre, kısmen kendi amaçları için de işler. Verilerinizi satmayız. Yetkili kurumların hukuka uygun talepleri hâlinde gerekli bilgiyi paylaşabiliriz.",
    transfer:
      "Oyun veritabanı Belçika'da, sunucu fonksiyonları ve Firebase kimlik doğrulaması ABD'de çalışır. Reklam, analitik, destek e-postası ve Unity Relay verileri de Türkiye dışındaki sunuculara gidebilir. Bu, KVKK m.9 kapsamında yurt dışına aktarımdır.",
    security:
      "Oyun ile Firebase, Google ve Unity arasındaki trafik şifrelenir. Veritabanı kuralları kupa, puan ve karakter sahipliğini istemciye kapatır; bu alanları yalnızca sunucu fonksiyonlarımız yazar ve her oyuncu yalnızca kendi kaydını okuyabilir. Liderlik tablosunu ve eşleşme ilanlarını giriş yapmış tüm oyuncular görebilir. Cihazdaki ilerleme şifresiz tutulur.",
    deletion:
      "Oyunda Ayarlar > Hesabı Sil satırını kullanın. Bu işlem hesabınızı, sunucudaki ilerlemenizi, liderlik satırınızı ve cihazdaki yerel ilerlemenizi kalıcı olarak siler. Firebase yakın zamanda giriş yapmanızı isterse oyun silme işlemini tamamlayamaz; tekrar girip yeniden deneyin. Oyunu kaldırdıysanız neuvikon@gmail.com adresine görünen adınızla yazarak silinmesini isteyebilirsiniz. Satın alma kaydı ve kimliksiz maç özetleri kalır; silinen hesapta aldığınız ürünler yeni hesaba geri yüklenemez. Unity oyuncu kimliğinizin silinmesi için bize yazın. Reklam kimliğinizi Android ayarlarından sıfırlayabilir ya da silebilirsiniz.",
    children:
      "PushBump, reklam içeren, herkese açık sıralaması ve rastgele rakipleri olan çevrimiçi bir oyundur; 13 yaşın altındaki çocuklar için tasarlanmadı ve onlara yönelik değildir. Oyun yaş sormaz, bu yüzden oyuncuların yaşını bilmeyiz ve çocuk moduna sahip değildir. 13 yaşından küçük biri oynarsa verileri diğer oyuncularınkiyle aynı şekilde işlenir ve reklam isteklerinde çocuk işareti gönderilmez. Bu yaş grubundan bilerek veri toplamayı hedeflemeyiz. Ebeveynseniz çocuğunuzun görünen adıyla neuvikon@gmail.com adresine yazın ya da hesabı Ayarlar'dan silin.",
    extra: [
      {
        title: "Çok oyunculu oyun",
        paragraphs: [
          "Maç sırasında karakteriniz, kostümünüz, konumunuz ve can durumunuz rakibinizin cihazına iletilir. Oyun, Unity Relay üzerinden bağlandığı için IP adresiniz rakibe gösterilmez. Oda kodu yerine elle IP adresi girerek doğrudan bağlanırsanız iki cihaz IP adreslerini birbirine görür.",
        ],
      },
      {
        title: "Reklamlar",
        paragraphs: [
          "Oyunda Google AdMob banner, geçiş ve isteğe bağlı ödüllü reklamları gösterilir. Reklam isteklerinde kişiselleştirmeyi kapatan bir ayar göndermiyoruz, bu nedenle reklamlar Google'ın ayarlarına ve seçimlerinize göre kişiselleştirilmiş olabilir.",
          "Google'ın gerekli gördüğü bölgelerde, örneğin AB ve Birleşik Krallık'ta, reklamlar yüklenmeden önce rıza ekranı (Google UMP) çıkar. Bu ekran gösterildiyse seçiminizi Ayarlar > Reklam Gizliliği satırından değiştirebilirsiniz.",
          "Reklam tercihleriniz: https://myadcenter.google.com/ . Google'ın reklam çerezleri: https://policies.google.com/technologies/ads",
        ],
      },
      {
        title: "Firebase Analytics",
        paragraphs: [
          "Oyuna Firebase Analytics dahildir. Kodumuz özel olay göndermez; SDK açılış ve oturum gibi olayları kendiliğinden ölçer ve bu ölçüm reklam rıza ekranındaki seçiminize bağlı değildir. Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Oyun motoru",
        paragraphs: [
          "PushBump, Unity ile yapıldı. Proje Unity Cloud'a bağlıdır. Unity Analytics, Unity Ads ve bulut hata raporlaması kapalıdır; Unity Authentication, Relay ve motorun teknik istatistik gönderimi açıktır. Unity bu servislerde kendi politikasına göre hareket eder.",
        ],
      },
      {
        title: "Android izinleri",
        paragraphs: [
          "Oyun internet ve reklam kimliği iznini kullanır. Telefonu eğerek oynarsınız; hareket sensörü yalnızca karakteri yönetir, sensör verisi kaydedilmez.",
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
      "Signing in with Google is optional in PushBump; if you do, your Google name appears to other players on the leaderboard. In quick match the game creates an anonymous account for you. The game uses Google AdMob ads, Firebase Analytics and Unity Relay. You can delete your account from the game's Settings screen.",
    scope:
      "This policy covers PushBump, an online arena game published by Neuvikon for Android, along with its Firebase database and server functions.",
    rows: [
      {
        data: "Firebase user ID (from Google sign-in or the anonymous account created for quick match)",
        purpose: "Linking your trophies, points and characters to one account",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete your account",
      },
      {
        data: "If you sign in with Google: your name, email address, profile photo link and Google account ID",
        purpose: "Creating your account and letting you open your progress on another device",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete your account",
      },
      {
        data: "Display name (the first 24 characters of your Google name, or a name like Player_1234) and trophy count",
        purpose: "Showing you on the leaderboard",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete your account",
      },
      {
        data: "Game progress: trophies, points, unlocked characters and skins, daily reward counters, last match time",
        purpose: "Saving your progress and enforcing reward and price limits on the server",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you delete your account",
      },
      {
        data: "IP address and app information (Firebase Authentication sign-in logs)",
        purpose: "Keeping sign-in secure and preventing abuse",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in protecting the game from abuse",
        retention: "Firebase keeps logged IP addresses for a few weeks",
      },
      {
        data: "Match listing: room code, user ID, trophy count, session ID, timestamp",
        purpose: "Finding you an opponent in quick match and estimating the wait",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Deleted when the room fills or you disconnect; old listings are cleared within minutes",
      },
      {
        data: "Unity anonymous player ID, IP address and in-match game traffic",
        purpose: "Carrying an online match between two players through Unity Relay",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Game traffic passes through during the match; the player ID and logs fall under Unity's policy",
      },
      {
        data: "Purchase record: product, Google Play order number, user ID, date and a hash of the purchase token",
        purpose: "Verifying the purchase with Google Play, giving you the item and stopping one receipt being used on another account",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not deleted automatically and kept after account deletion; you can write to us to have it removed",
      },
      {
        data: "Match summary without identity: character, result, duration, damage dealt and taken, timestamp",
        purpose: "Measuring character balance",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in improving game balance",
        retention: "Not deleted automatically; it is not linked to you, so it stays after account deletion",
      },
      {
        data: "Firebase Analytics data: app instance ID, advertising ID, device and version details, launch and session events",
        purpose: "Understanding how many people use the game and how much",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in understanding use to improve the game",
        retention: "As long as the Google Analytics retention setting in the Firebase project",
      },
      {
        data: "Advertising ID, IP address, device details, ad impressions and clicks",
        purpose: "Showing and measuring Google AdMob ads and preventing fraud",
        legalBasis:
          "GDPR Art. 6(1)(a): consent, through the ad consent screen; where that screen does not appear, Art. 6(1)(f): legitimate interest in funding the free game with ads",
        retention: "As long as Google's own policy sets",
      },
      {
        data: "Technical engine statistics such as device model, operating system and Unity version",
        purpose: "Letting Unity measure which devices its engine runs on",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in maintaining the game engine",
        retention: "As long as Unity's own policy sets",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering players' questions",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Your Google details arrive through Google when you press Sign in. The anonymous account is created automatically when you enter quick match without signing in. Game, ad, analytics and engine data are collected automatically while the game runs. Purchase details come from Google Play, and email data arrives when you write to us.",
    required:
      "You can play bot matches without signing in; your progress then stays on your device only. Online matches need an anonymous account and a Unity Relay connection. Google sign-in is optional, but without it your progress does not move to another device. Purchases and rewarded ads are optional too.",
    notCollected: [
      "Location, contacts, photos, camera or microphone data. The game does not ask for these permissions.",
      "Chat messages or voice. The game has no chat and no friends list.",
      "Passwords. Google handles sign-in. Your email address is not shown to other players.",
      "Card details. Google Play handles payment and we never see your payment information.",
      "Crash reports. Firebase Crashlytics is not used and Unity's cloud crash reporting is off.",
    ],
    recipients: [
      {
        name: "Firebase (Google Cloud)",
        role: "Provides the infrastructure for accounts, game data and server functions. Processes your user ID, Google account details, IP address and game data.",
        location: "Database in Belgium (europe-west1), functions in the US (us-central1), authentication in the US",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google Analytics for Firebase",
        role: "Measures use automatically. Receives the app instance ID, advertising ID and device details.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google AdMob",
        role: "Shows and measures ads. Receives the advertising ID, IP address and device details directly from your device and processes them under its own policy.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Unity Technologies",
        role: "Sets up the online match connection through Unity Authentication and Relay and receives engine statistics. Processes the player ID and IP address.",
        location: "A Relay region near the player, which may be outside your country",
        url: "https://unity.com/legal/privacy-policy",
      },
      {
        name: "Google Play",
        role: "Distributes the game and handles purchases and payment. Our server verifies purchases with Google Play.",
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
      "We use the Firebase infrastructure to run the game. Google AdMob, Google Analytics, Google Play and Unity process what they receive under their own policies, partly for their own purposes too. We do not sell your data. We may disclose information where a lawful request from an authority requires it.",
    transfer:
      "The game database runs in Belgium, and the server functions and Firebase authentication run in the US. Ad, analytics, support email and Unity Relay data may also reach servers outside your country.",
    security:
      "Traffic between the game and Firebase, Google and Unity is encrypted. Database rules close trophies, points and character ownership to the client; only our server functions write them, and each player can read only their own record. All signed-in players can see the leaderboard and match listings. Progress on your device is not encrypted.",
    deletion:
      "In the game, use Settings > Delete Account. This permanently deletes your account, your progress on the server, your leaderboard row and the local progress on your device. If Firebase asks for a recent sign-in the game cannot finish the deletion; sign in again and retry. If you have uninstalled the game, write to neuvikon@gmail.com with your display name and ask us to delete it. Purchase records and match summaries without identity remain, and items bought on a deleted account cannot be restored to a new one. Write to us to have your Unity player ID deleted. You can reset or delete your advertising ID in Android settings.",
    children:
      "PushBump is an online game with ads, a public ranking and random opponents; it was not designed for, and is not directed at, children under 13. The game does not ask your age, so we do not know how old players are, and it has no children's mode. If someone under 13 plays, their data is processed the same way as any other player's and ad requests carry no child-directed flag. We do not aim to collect data from this age group. If you are a parent, write to neuvikon@gmail.com with your child's display name or delete the account from Settings.",
    extra: [
      {
        title: "Multiplayer",
        paragraphs: [
          "During a match your character, skin, position and health are sent to your opponent's device. Because the game connects through Unity Relay, your IP address is not shown to your opponent. If you connect directly by typing an IP address instead of a room code, the two devices see each other's IP addresses.",
        ],
      },
      {
        title: "Ads",
        paragraphs: [
          "The game shows Google AdMob banner, interstitial and optional rewarded ads. We do not send a setting that turns personalisation off, so ads may be personalised according to Google's settings and your choices.",
          "In regions where Google requires it, such as the EU and the UK, a consent screen (Google UMP) appears before ads load. If you saw this screen, you can change your choice under Settings > Ad Privacy.",
          "Your ad preferences: https://myadcenter.google.com/ . Google's advertising cookies: https://policies.google.com/technologies/ads",
        ],
      },
      {
        title: "Firebase Analytics",
        paragraphs: [
          "Firebase Analytics is included in the game. Our code sends no custom events; the SDK measures events such as launches and sessions by itself, and this does not depend on your choice in the ad consent screen. How Google uses this data: https://policies.google.com/technologies/partner-sites",
        ],
      },
      {
        title: "Game engine",
        paragraphs: [
          "PushBump is made with Unity. The project is linked to Unity Cloud. Unity Analytics, Unity Ads and cloud crash reporting are off; Unity Authentication, Relay and the engine's technical statistics are on. Unity acts under its own policy for these services.",
        ],
      },
      {
        title: "Android permissions",
        paragraphs: [
          "The game uses the internet and advertising ID permissions. You play by tilting the phone; the motion sensor only steers your character and its data is not saved.",
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
