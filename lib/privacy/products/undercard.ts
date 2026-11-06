import type { ProductPolicy } from "@/lib/privacy/types";

export const undercard: ProductPolicy = {
  slug: "undercard",
  name: "UnderCard",
  project: "UnderCard",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "UnderCard'da hesap, e-posta ya da şifre yoktur. Çevrimiçi odaya girdiğinizde takma adınız ve oyun durumunuz oda boyunca Google'ın Firebase sunucularında durur ve oda kodunu bilen görebilir. Tek kişilik oyun, ayarlar ve istatistikler cihazınızda kalır. Oyunda Google AdMob reklamları vardır, analitik yoktur.",
    scope:
      "Bu metin, Neuvikon'un Android ve iOS için yayımladığı çok oyunculu kart oyunu UnderCard'ı ve çevrimiçi odaların tutulduğu Firebase projesini kapsar. Ayrı bir sunucumuz yoktur.",
    rows: [
      {
        data: "Takma ad (en çok 16 karakter), oda kodu, kartlar, puanlar, sıra durumu, emoji tepkileri, oyuncu kimliği ve anonim Firebase kimliği",
        purpose: "Çevrimiçi odayı kurmak ve oyunu oyuncular arasında eşitlemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Son gerçek oyuncu çıkınca oda silinir. Çıkılmazsa oda kurulduktan 24 saat sonra süresi dolar ve Firebase onu genellikle sonraki 24 saat içinde siler",
      },
      {
        data: "Anonim Firebase kimlik kaydı, giriş sırasında Firebase'in kaydettiği IP adresi ve kullanıcı aracısı",
        purpose: "Hesap açtırmadan odalara erişimi sağlamak, kötüye kullanımı sınırlamak",
        legalBasis: "KVKK m.5/2-(f): oda sistemini koruma meşru menfaati",
        retention:
          "Kimlik kaydı biz silene kadar durur, uygulamayı kaldırmak onu silmez. IP kayıtlarını Firebase birkaç hafta tutar",
      },
      {
        data: "Reklam kimliği, IP adresi, cihaz ve uygulama bilgileri, reklam etkileşimi",
        purpose: "Reklam göstermek, ölçmek, sıklığını sınırlamak, sahteciliği önlemek",
        legalBasis:
          "Rıza formu gösterilen bölgelerde KVKK m.5/1: açık rıza. Form gösterilmeyen bölgelerde KVKK m.5/2-(f): ücretsiz oyunu reklamla finanse etme meşru menfaati",
        retention: "Google'ın kendi süreleri; politikasına bakın",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap verme meşru menfaati",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Takma adı siz yazarsınız. Oyun durumu oynarken otomatik olarak Firebase'e yazılır. Anonim kimlik, uygulama ilk açıldığında otomatik oluşur; bu, yalnızca tek kişilik oynasanız da böyledir. Reklam verilerini AdMob SDK'sı otomatik toplar. Takma ad, ayarlar, istatistikler ve günlük görev ilerlemesi cihazınızda saklanır.",
    required:
      "Çevrimiçi oynamak için takma ad gerekir; gerçek adınızı yazmak zorunda değilsiniz ve yazmamanızı öneririz. Tek kişilik mod oda verisi oluşturmaz. Reklam izlemek ödüllü reklamlarda isteğe bağlıdır; diğer reklamlar oyunun parçasıdır.",
    notCollected: [
      "Ad, e-posta, telefon ya da şifre. Oyunda kayıt yoktur.",
      "Konum, rehber, fotoğraf, kamera ya da mikrofon. Uygulama bu izinleri istemez.",
      "Yazılı ya da sesli sohbet. Oyuncular yalnızca hazır emojilerle tepki verir.",
      "Analitik ya da çökme raporlama aracı. Oyunda ikisi de yoktur.",
      "Ödeme bilgisi. Oyunda gerçek para ile satın alma yoktur.",
    ],
    recipients: [
      {
        name: "Google Firebase",
        role: "Anonymous Authentication anonim kimliği, Cloud Firestore çevrimiçi odaları yürütür.",
        location: "Authentication ABD'de; Firestore Google Cloud altyapısında",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Reklam gösterir. Reklam kimliği, IP adresi, cihaz ve reklam etkileşimi verilerini kendi politikasına göre işler.",
        location: "Küresel",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play ve App Store",
        role: "Oyunu dağıtır ve indirme kayıtlarını kendi politikalarına göre işler.",
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
      "Anonim kimlik kayıtları ABD'de, oda verileri Google'ın yurt dışındaki bulut altyapısında, reklam verileri Google'ın küresel altyapısında işlenir; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Destek e-postaları da Google'ın yurt dışındaki sunucularında saklanır.",
    security:
      "Odalara yalnızca uygulamanın anonim girişi üzerinden erişilir ve bağlantılar şifrelidir. Oda kodu parola değildir: 4 hanelidir ve aşağıda anlatıldığı gibi tek başına erişimi sınırlamaz. Bu yüzden takma adınıza kişisel bilgi yazmayın.",
    deletion:
      "Odadan ayrıldığınızda oyuncu kaydınız odadan çıkar; oda en geç yukarıdaki sürede silinir. Uygulamayı kaldırdığınızda ya da verilerini temizlediğinizde cihazınızdaki takma ad, ayarlar, istatistikler ve anonim kimlik bağlantısı silinir. Firebase'deki anonim kimlik kaydı bundan etkilenmez ve uygulamada onu silen bir düğme yoktur; silinmesi için bize yazabilirsiniz. Firebase, silinen kaydı canlı ve yedek sistemlerinden 180 gün içinde kaldırır. Hesap olmadığı için silinecek başka veri yoktur.",
    children:
      "UnderCard 13 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek kişisel veri toplamayız. Uygulamada yaş sorulmaz; bir çocuğun verisine ulaştığımızı öğrenirsek sileriz.",
    extra: [
      {
        title: "Çevrimiçi odalarda kim neyi görür",
        paragraphs: [
          "Odadaki oyuncular takma adınızı, puanınızı ve emoji tepkilerinizi görür. Oda kodu 4 hanelidir. Oda verisi, kartlar ve takma adlar dahil, oda kodunu bilen ya da deneyen ve uygulama üzerinden giriş yapmış herhangi bir istemci tarafından okunabilir. Bir odaya yalnızca davet ettiğiniz kişilerin ulaşabileceğini varsaymayın.",
        ],
      },
      {
        title: "Reklamlar",
        paragraphs: [
          "Reklamları Google AdMob gösterir. AB, Birleşik Krallık ve bazı ABD eyaletlerinde reklam yüklenmeden önce Google'ın rıza formu (UMP) açılır; rıza verilmezse reklam istenmez. Tercihinizi Ayarlar, Reklam Gizlilik Tercihleri bölümünden değiştirebilirsiniz. Banner reklamlar kişiselleştirilmez. Geçiş ve ödüllü reklamlar, rıza durumunuza göre kişiselleştirilebilir; Türkiye dahil formun gösterilmediği bölgelerde de öyledir.",
          "iOS'ta izleme izni (ATT) Apple'ın penceresiyle sorulur; izni Ayarlar, Gizlilik ve Güvenlik bölümünden değiştirebilirsiniz. Android'de reklam kimliğini cihaz ayarlarından sıfırlayabilir ya da silebilirsiniz.",
          "Google'ın bu verileri nasıl kullandığı: https://policies.google.com/technologies/partner-sites . Reklam çerezleri ve reklam kimliği: https://policies.google.com/technologies/ads . Reklam tercihleriniz: https://myadcenter.google.com",
        ],
      },
    ],
  },
  en: {
    summary:
      "UnderCard has no accounts, email or passwords. When you join an online room, your nickname and game state sit on Google's Firebase servers for the life of the room, and anyone with the room code can see them. Solo mode, settings and stats stay on your device. The game shows Google AdMob ads and has no analytics.",
    scope:
      "This policy covers UnderCard, a multiplayer card game published by Neuvikon for Android and iOS, and the Firebase project that holds online rooms. We run no server of our own.",
    rows: [
      {
        data: "Nickname (up to 16 characters), room code, cards, scores, turn state, emoji reactions, player ID and anonymous Firebase ID",
        purpose: "Creating online rooms and syncing the game between players",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "The room is deleted when the last human player leaves. Otherwise it expires 24 hours after creation and Firebase typically deletes it within the next 24 hours",
      },
      {
        data: "Anonymous Firebase identity record, and the IP address and user agent Firebase logs at sign-in",
        purpose: "Giving access to rooms without an account, limiting abuse",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in protecting the room system",
        retention:
          "The identity record stays until we delete it; uninstalling does not remove it. Firebase keeps IP logs for a few weeks",
      },
      {
        data: "Advertising ID, IP address, device and app details, ad interaction",
        purpose: "Showing and measuring ads, limiting frequency, preventing fraud",
        legalBasis:
          "GDPR Art. 6(1)(a): consent where the consent form is shown. Elsewhere, Art. 6(1)(f): legitimate interest in funding a free game with ads",
        retention: "Google's own periods; see its policy",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering your support request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "You type the nickname. Game state is written to Firebase automatically as you play. The anonymous ID is created automatically when the app first opens, even if you only play solo. The AdMob SDK collects ad data automatically. Nickname, settings, stats and daily challenge progress are stored on your device.",
    required:
      "Online play needs a nickname; it does not have to be your real name and we suggest it is not. Solo mode creates no room data. Watching rewarded ads is optional; other ads are part of the game.",
    notCollected: [
      "Name, email, phone number or password. There is no sign-up.",
      "Location, contacts, photos, camera or microphone. The app does not ask for these permissions.",
      "Text or voice chat. Players can only react with preset emojis.",
      "Analytics or crash reporting tools. The game has neither.",
      "Payment details. The game has no real-money purchases.",
    ],
    recipients: [
      {
        name: "Google Firebase",
        role: "Anonymous Authentication runs the anonymous ID, Cloud Firestore runs online rooms.",
        location: "Authentication in the US; Firestore on Google Cloud infrastructure",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google AdMob",
        role: "Shows ads. Processes advertising ID, IP address, device and ad interaction data under its own policy.",
        location: "Global",
        url: "https://policies.google.com/technologies/partner-sites",
      },
      {
        name: "Google Play and the App Store",
        role: "Distribute the game and handle download records under their own policies.",
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
      "Anonymous identity records are processed in the United States, room data on Google's cloud infrastructure and ad data on Google's global infrastructure, so your data may leave your country. Support email is stored on Google's servers too. For users in Turkey this is a transfer abroad under KVKK Art. 9.",
    security:
      "Rooms can only be reached through the app's anonymous sign-in, and connections are encrypted. A room code is not a password: it has 4 digits and, as explained below, does not limit access on its own. So do not put personal details in your nickname.",
    deletion:
      "When you leave a room your player entry leaves with you; the room is deleted within the period above at the latest. Uninstalling or clearing app data removes the nickname, settings, stats and the link to your anonymous ID from your device. The anonymous record in Firebase is not affected and the app has no button to delete it; write to us to have it deleted. Firebase removes a deleted record from live and backup systems within 180 days. With no account, there is nothing else to delete.",
    children:
      "UnderCard is not directed at children under 13. We do not knowingly collect personal data from children. The app does not ask your age; if we learn we hold a child's data, we delete it.",
    extra: [
      {
        title: "Who sees what in online rooms",
        paragraphs: [
          "Players in a room see your nickname, score and emoji reactions. Room codes have 4 digits. Room data, including cards and nicknames, can be read by any client signed in through the app that knows or guesses the code. Do not assume only the people you invited can reach a room.",
        ],
      },
      {
        title: "Ads",
        paragraphs: [
          "Google AdMob shows the ads. In the EU, the UK and some US states, Google's consent form (UMP) opens before ads load; without consent no ads are requested. You can change your choice in Settings, Ad Privacy Choices. Banner ads are not personalised. Interstitial and rewarded ads may be personalised depending on your consent status, and also where the form is not shown, Turkey included.",
          "On iOS, tracking permission (ATT) is asked in Apple's own prompt; you can change it in Settings, Privacy & Security. On Android you can reset or delete your advertising ID in device settings.",
          "How Google uses this data: https://policies.google.com/technologies/partner-sites . Ad cookies and advertising IDs: https://policies.google.com/technologies/ads . Your ad settings: https://myadcenter.google.com",
        ],
      },
    ],
  },
};
