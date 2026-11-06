import type { ProductPolicy } from "@/lib/privacy/types";

export const hasatHayattaKal: ProductPolicy = {
  slug: "hasat-hayatta-kal",
  name: "Hasat & Hayatta Kal",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Hasat & Hayatta Kal'da hesap yoktur ve kayıtlarınız tarayıcınızda durur. Tek başınıza oynarken dışarı yalnızca sayfa, oyun motoru ve yazı tipleri için IP adresiniz gider. Çok oyunculu modu açarsanız oyuncu adınız oda arkadaşlarınıza gider; IP adresinizi hem onlar hem de bağlantıyı kuran ve aktaran sunucular görebilir.",
    scope:
      "Bu metin, tarayıcıda oynanan çiftçilik ve zombi savunma oyunu Hasat & Hayatta Kal'ı kapsar. Oyun GitHub Pages'te barındırılır. Oyun sunucumuz yoktur: çok oyunculu oyunda simülasyonu odayı kuran kişinin tarayıcısı çalıştırır. Bizim işlettiğimiz tek parça, kısa ömürlü aktarım kimliği veren küçük bir Cloudflare Worker'dır.",
    rows: [
      {
        data: "IP adresi ve tarayıcı bilgisi",
        purpose: "Sayfayı, Phaser oyun motorunu ve yazı tiplerini yüklemek",
        legalBasis: "KVKK m.5/2-(f): oyunu çalışır ve güvenli tutmaktaki meşru menfaat",
        retention: "Her sağlayıcının kendi kayıt süresi kadar; biz bu kayıtları tutmayız",
      },
      {
        data: "Oyuncu adı (en çok 14 karakter), karakter görünümü ve sınıfı, oturum kimliği, oyun içi durum",
        purpose: "Odaya katılmak, co-op oynamak, kopunca kaldığınız yerden dönmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Oyun boyunca oda arkadaşlarında kalır. Misafirin envanteri adına bağlı olarak oda sahibinin kaydında durur; oda sahibi kaydı silene kadar kalır.",
      },
      {
        data: "IP adresi ve WebRTC bağlantı bilgileri (ICE adayları, oda kimliği)",
        purpose: "Oyuncuları birbirine bağlamak; doğrudan bağlantı kurulamazsa trafiği aktarmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Bağlantı süresince kullanılır; sinyal ve aktarım sağlayıcılarının kendi kayıt süreleri geçerlidir",
      },
      {
        data: "IP adresi ve sayfa kaynağı (Cloudflare Worker isteği)",
        purpose: "6 saat geçerli aktarım kimliği almak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Worker kodumuz bu isteği kaydetmez; Cloudflare'ın kendi işletim kayıtları geçerlidir",
      },
      {
        data: "Bağlantı günlüğü: son 20 olay, oyuncu adları, kopma nedenleri",
        purpose: "Bağlantı sorunlarını görmek ve gerekirse bize iletmek",
        legalBasis: "KVKK m.5/2-(f): bağlantı sorunlarını gidermekteki meşru menfaat",
        retention: "Tarayıcınızda en yeni 20 olay kalır; siz kopyalayıp göndermedikçe bize gelmez",
      },
      {
        data: "Bize yazarsanız e-posta adresiniz, mesajınız ve eklediğiniz günlük",
        purpose: "Sorununuzu çözmek",
        legalBasis: "KVKK m.5/2-(f): destek talebini cevaplamaktaki meşru menfaat",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "IP adresi sayfayı açtığınızda, bağlanılan sunuculara kendiliğinden ulaşır. PeerJS, aktarım kimliği ve STUN/TURN bağlantıları yalnızca Çok Oyunculu seçeneğinde oda kurup ya da odaya katılınca devreye girer. Oyuncu adını siz yazarsınız. Kayıtlar ve ayarlar tarayıcınızda otomatik oluşur.",
    required:
      "Tek oyunculu oyun için bizden ya da sizden bir bilgi istenmez. Çok oyunculu için bir ad gerekir, gerçek adınız olması gerekmez; takma ad kullanabilirsiniz. Çok oyunculu oynamazsanız adınız ve bağlantı bilgileriniz paylaşılmaz.",
    notCollected: [
      "Hesap, e-posta, telefon numarası ya da şifre.",
      "Konum, rehber, kamera ya da mikrofon verisi. Oyunda sesli sohbet yoktur.",
      "Reklam ve analitik. Oyunda ikisi de yoktur.",
      "Çerez. Oyunun kendisi çerez yazmaz.",
    ],
    extra: [
      {
        title: "Çok oyunculuda ağ adresiniz",
        paragraphs: [
          "Oyuncular WebRTC ile doğrudan bağlanır. Doğrudan bağlantıda oda arkadaşlarınız teknik olarak ağ adresinizi (IP) görebilir. IP adresi kabaca bölgenizi ve internet sağlayıcınızı ele verebilir. Bu yüzden oda kodunu ve davet linkini yalnızca güvendiğiniz kişilerle paylaşın.",
          "Oda kodu 5 harflidir ve kodu bilen herkes odaya katılabilir; oda sahibinin ayrıca onayı yoktur.",
          "Doğrudan bağlantı kurulamazsa trafik bir aktarıcı (TURN) üzerinden geçer. Aktarıcı bağlanan tarafların adreslerini görür. Oyun verisi WebRTC'nin kendi şifrelemesiyle gider.",
        ],
      },
      {
        title: "Kendi TURN sunucunuz",
        paragraphs: [
          "Oda panelinden kendi TURN sunucunuzu girebilirsiniz. Girdiğiniz adres, kullanıcı adı ve şifre tarayıcınızda şifrelenmeden saklanır ve davet linkine eklenir, yani linki alan kişi bunları görür. Bu durumda trafiğiniz o sunucuya da gider; o sağlayıcıdan biz sorumlu değiliz.",
        ],
      },
      {
        title: "Çerezler ve yerel depolama",
        paragraphs: [
          "Oyun çerez kullanmaz. Aşağıdakileri tarayıcınızın yerel depolamasında tutar; bunlar bize gönderilmez:",
        ],
        list: [
          "Oyun kaydı, rekorlar, görülen ipuçları ve rehber tercihleri.",
          "Ses, dokunmatik kontrol, nişan ve efekt ayarları.",
          "Oyuncu adı, seçilen karakter görünümü ve sınıf.",
          "Son oda kodu: oda sahibi sayfayı yenilerse aynı kod 12 saat içinde geri alınır.",
          "Bağlantı günlüğü ve varsa kendi TURN ayarınız.",
          "Oturum kimliği (sekme kapanınca silinir): kopan misafirin karakterine dönmesi için.",
        ],
      },
      {
        title: "Bağlantı günlüğünü kopyalamak",
        paragraphs: [
          "Oda panelindeki \"Günlüğü kopyala\" düğmesi günlüğe tarayıcı bilgisini, ağ türünü ve sayfa adresini ekleyip panoya kopyalar. Bu metin otomatik gönderilmez. Bize ya da başkasına yapıştırmadan önce içindeki oyuncu adlarına bakın.",
        ],
      },
    ],
    recipients: [
      {
        name: "Oda arkadaşlarınız",
        role: "Adınızı ve oyun içi durumunuzu görür; doğrudan bağlantıda IP adresinizi görebilir. Oda sahibi misafirin adını ve envanterini kendi kaydında tutar.",
        location: "Oyuncuların bulunduğu yer",
      },
      {
        name: "PeerJS (0.peerjs.com, turn.peerjs.com)",
        role: "Ücretsiz, herkese açık sinyal sunucusu; oyuncuları eşleştirir, IP adresini, oda kimliğini ve bağlantı bilgilerini görür. Son çare aktarıcı olarak da kullanılır. Hesap açmadan kullandığımız için aramızda özel bir sözleşme yoktur.",
        location: "Sinyal sunucusunun konumu açıklanmıyor; aktarıcılar AB ve ABD",
        url: "https://peerjs.com/",
      },
      {
        name: "Cloudflare",
        role: "TURN aktarımı, aktarım kimliği veren Worker, STUN ve cdnjs üzerinden Phaser ile PeerJS dosyaları. IP adresini ve aktarılan trafiğin bağlantı bilgilerini görür.",
        location: "Küresel",
        url: "https://www.cloudflare.com/privacypolicy/",
      },
      {
        name: "Google",
        role: "Google Fonts yazı tiplerini sunar, STUN sunucusu dış ağ adresinizi bulmaya yarar. İkisi de IP adresini alır.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
      },
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
    recipientNote:
      "Bu tarafları yalnızca yukarıdaki amaçlar için kullanırız. Aralarında herkese açık, sözleşmesiz hizmetler vardır; bunların veriyi nasıl koruduğunu güvence altına alamayız. Verilerinizi satmayız. Yetkili kurumların hukuka uygun talepleri hâlinde gerekli bilgiyi paylaşabiliriz.",
    transfer:
      "Tarayıcınız yukarıdaki sağlayıcılara doğrudan bağlanır. Sunucuları Türkiye dışında olabilir; IP adresiniz ve çok oyunculu bağlantı bilgileriniz bu yolla yurt dışına çıkabilir ve bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Oda arkadaşlarınız başka ülkedeyse adınız ve IP adresiniz doğrudan onlara da ulaşabilir.",
    security:
      "Çok oyunculu veri WebRTC ile şifreli gider, sinyal bağlantısı da şifrelidir. Asıl gizlilik sınırı karşınızdaki oyunculardır: onlar adınızı görür ve IP adresinizi öğrenebilir. Tarayıcınızdaki kayıtlar cihazınızın güvenliğine bağlıdır ve şifrelenmez.",
    deletion:
      "Tarayıcınızın bu site için tuttuğu verileri temizlediğinizde kayıtlar, ayarlar, adınız ve günlük silinir; bu geri alınamaz. Başka birinin odasında oynadıysanız adınız ve envanteriniz onun tarayıcısındaki kayıtta kalır, silinmesini ondan istemeniz gerekir. Bu kayda biz erişemeyiz. Bize yazdığınız e-postaların silinmesini isteyebilirsiniz.",
    children:
      "Oyun yaş sormaz ve zombi şiddeti içerir. Çok oyunculu modda ad ve ağ adresi paylaşıldığı için çocuklar oda kodunu tanımadıkları kişilerle paylaşmamalıdır. Bizde hesap ya da oyuncu kaydı bulunmaz. Veliyseniz ve destek yazışmalarında çocuğunuza ait bir bilgi olduğunu düşünüyorsanız bize yazın, sileriz.",
  },
  en: {
    summary:
      "Hasat & Hayatta Kal has no accounts and your saves stay in your browser. In single player, only your IP address leaves, to fetch the page, the game engine and fonts. If you turn on multiplayer, your player name goes to your roommates, and both they and the servers that set up and relay the connection can see your IP address.",
    scope:
      "This policy covers Hasat & Hayatta Kal, a farming and zombie defence game played in the browser and hosted on GitHub Pages. There is no game server: in multiplayer the browser of the person who opens the room runs the simulation. The only part we operate is a small Cloudflare Worker that hands out short-lived relay credentials.",
    rows: [
      {
        data: "IP address and browser details",
        purpose: "Loading the page, the Phaser game engine and fonts",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the game working and secure",
        retention: "As long as each provider keeps its own logs; we hold none of them",
      },
      {
        data: "Player name (up to 14 characters), character look and class, session ID, in-game state",
        purpose: "Joining a room, playing co-op, coming back after a disconnect",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "Stays with your roommates during play. A guest's inventory stays in the host's save under the guest's name until the host deletes that save.",
      },
      {
        data: "IP address and WebRTC connection details (ICE candidates, room ID)",
        purpose: "Connecting players, and relaying traffic if a direct link fails",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Used during the connection; signalling and relay providers apply their own log periods",
      },
      {
        data: "IP address and page origin (Cloudflare Worker request)",
        purpose: "Getting a relay credential valid for 6 hours",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Our Worker code does not store the request; Cloudflare's own operational logs apply",
      },
      {
        data: "Connection log: last 20 events, player names, disconnect reasons",
        purpose: "Seeing connection problems and reporting them if you choose",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in fixing connection problems",
        retention: "The newest 20 events stay in your browser; they reach us only if you copy and send them",
      },
      {
        data: "Your email address, message and any log you attach if you write to us",
        purpose: "Solving your problem",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Your IP address reaches the servers your browser connects to when you open the page. PeerJS, the relay credential and STUN/TURN connections start only when you open or join a room from the Multiplayer option. You type the player name. Saves and settings are created in your browser automatically.",
    required:
      "Single player needs nothing from you. Multiplayer needs a name, which does not have to be your real one; a nickname is fine. If you do not play multiplayer, your name and connection details are not shared.",
    notCollected: [
      "Accounts, email addresses, phone numbers or passwords.",
      "Location, contacts, camera or microphone data. The game has no voice chat.",
      "Ads and analytics. The game has neither.",
      "Cookies. The game itself sets none.",
    ],
    extra: [
      {
        title: "Your network address in multiplayer",
        paragraphs: [
          "Players connect directly over WebRTC. On a direct link your roommates can technically see your IP address, which can reveal your rough area and internet provider. Share the room code and invite link only with people you trust.",
          "Room codes are 5 letters, and anyone with the code can join. The host does not approve each player.",
          "If a direct link fails, traffic goes through a relay (TURN). The relay sees the addresses of both sides. Game data travels under WebRTC's own encryption.",
        ],
      },
      {
        title: "Your own TURN server",
        paragraphs: [
          "You can enter your own TURN server in the room panel. The address, username and password are stored unencrypted in your browser and added to the invite link, so anyone who gets the link can see them. Your traffic then also goes to that server, and we are not responsible for that provider.",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "The game uses no cookies. It keeps the following in your browser's local storage, and none of it is sent to us:",
        ],
        list: [
          "Saves, records, tips already seen and guide preferences.",
          "Sound, touch control, aim and effect settings.",
          "Player name, chosen character look and class.",
          "Last room code: if the host reloads, the same code can be reclaimed within 12 hours.",
          "Connection log and your own TURN settings, if any.",
          "Session ID (gone when the tab closes): lets a dropped guest return to their character.",
        ],
      },
      {
        title: "Copying the connection log",
        paragraphs: [
          "The \"copy log\" button in the room panel adds browser details, network type and the page address to the log and copies it to your clipboard. Nothing is sent automatically. Check the player names in it before pasting it to us or anyone else.",
        ],
      },
    ],
    recipients: [
      {
        name: "Your roommates",
        role: "See your name and in-game state, and can see your IP address on a direct link. The host keeps guests' names and inventories in their own save.",
        location: "Wherever they are",
      },
      {
        name: "PeerJS (0.peerjs.com, turn.peerjs.com)",
        role: "Free public signalling server. It matches players and sees your IP address, room ID and connection details. It is also the last-resort relay. We use it without an account, so we have no specific contract with it.",
        location: "Signalling server location not disclosed; relays in the EU and US",
        url: "https://peerjs.com/",
      },
      {
        name: "Cloudflare",
        role: "TURN relay, the Worker that issues relay credentials, STUN, and the Phaser and PeerJS files on cdnjs. Sees your IP address and connection details of relayed traffic.",
        location: "Global",
        url: "https://www.cloudflare.com/privacypolicy/",
      },
      {
        name: "Google",
        role: "Google Fonts serves the fonts, and its STUN server helps find your public address. Both receive your IP address.",
        location: "Global",
        url: "https://policies.google.com/privacy",
      },
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
    recipientNote:
      "We use these parties only for the purposes above. Some are public services with no contract with us, so we cannot guarantee how they protect the data. We do not sell your data. We may disclose information where a lawful request from an authority requires it.",
    transfer:
      "Your browser connects directly to the providers above, whose servers may be outside your country. Your IP address and multiplayer connection details can leave the country this way. If your roommates are abroad, your name and IP address can reach them directly too.",
    security:
      "Multiplayer data travels encrypted over WebRTC, and the signalling connection is encrypted too. The real privacy limit is the people you play with: they see your name and can learn your IP address. Saves in your browser depend on your device's security and are not encrypted.",
    deletion:
      "Clearing your browser's data for this site deletes your saves, settings, name and log, permanently. If you played in someone else's room, your name and inventory remain in the save in their browser, and you need to ask them to delete it. We cannot reach that save. You can ask us to delete your emails.",
    children:
      "The game does not ask for age and contains zombie violence. Because multiplayer shares a name and a network address, children should not share room codes with strangers. We hold no accounts or player records. If you are a parent and think our support email contains your child's information, write to us and we will delete it.",
  },
};
