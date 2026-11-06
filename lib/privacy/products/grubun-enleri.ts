import type { ProductPolicy } from "@/lib/privacy/types";

export const grubunEnleri: ProductPolicy = {
  slug: "grubun-enleri",
  name: "Grubun En'leri",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Grubun En'leri'nde hesap yok ama gizli bir oda da yok: yazdığınız ad ve verdiğiniz oylar herkese açık bir MQTT sunucusundan (broker.hivemq.com) geçer ve bu trafiği başkaları görebilir. Odanın son durumu da o sunucuda kalır. Bu yüzden gerçek adınız yerine takma ad kullanmanızı, oyuna gizli kalmasını istediğiniz hiçbir şey yazmamanızı öneririz.",
    scope:
      "Bu metin, zer0desu1.github.io/grubun-enleri adresindeki tarayıcı oyununu kapsar. Herkes kendi telefonundan odaya katılır ve her soruda gruptan birini seçer. Oyunun bize ait bir sunucusu ve veritabanı yoktur; odayı kuran kişinin telefonu hakemlik yapar.",
    rows: [
      {
        data: "Oyuna yazdığınız ad (en çok 24 karakter) ve rastgele üretilen oyuncu kimliği",
        purpose: "Odaya katılmak, oyuncu listesini ve sonuçları göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Odanın son durumunda yer alır ve oyun bunu silmez. HiveMQ kaldırana ya da aynı koda yeni durum yazılana kadar durabilir; bu süreyi biz belirlemiyoruz.",
      },
      {
        data: "Oylarınız (kimin kimi seçtiği), sorular ve kazananlar",
        purpose: "Oyu sayıp sonucu ortaya çıkarmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention:
          "Oylar sunucudan geçip gider. Sürmekte olan turun oyları ve o oyunun kazananları, odanın son durumunda yukarıdaki gibi kalır.",
      },
      {
        data: "Tarayıcınızda tutulan ad ve oyuncu kimliği (ge_name, ge_id)",
        purpose: "Sayfa yenilense de aynı oyuncu olarak devam etmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Tarayıcınızın site verilerini temizleyene kadar",
      },
      {
        data: "IP adresi ve tarayıcı bilgisi",
        purpose: "Sayfayı, oyun kütüphanesini ve yazı tiplerini yüklemek, MQTT bağlantısını kurmak",
        legalBasis: "KVKK m.5/2-(f): oyunu çalışır ve güvenli tutmaktaki meşru menfaat",
        retention: "Her sağlayıcının kendi kayıt süresi kadar; biz bu kayıtları tutmayız",
      },
      {
        data: "Bize yazarsanız e-posta adresiniz ve mesajınız",
        purpose: "Sorunuzu ya da silme isteğinizi cevaplamak",
        legalBasis: "KVKK m.5/2-(f): başvurunuzu cevaplamaktaki meşru menfaat",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Adı siz yazarsınız, oyu siz verirsiniz; ikisi de telefonunuzdan doğrudan MQTT sunucusuna gider. Oyuncu kimliği ilk açılışta tarayıcınızda otomatik üretilir. IP adresi sayfayı açtığınızda bağlanılan sunuculara kendiliğinden ulaşır.",
    required:
      "Oda kurmak ya da katılmak için bir ad gerekir ama gerçek adınız olması gerekmez. Takma ad, lakap ya da tek harf yeter; oyun bunu doğrulamaz. Ad yazmazsanız oynayamazsınız.",
    notCollected: [
      "Hesap, e-posta, telefon numarası ya da şifre.",
      "Konum, rehber, kamera ya da mikrofon verisi.",
      "Reklam ve analitik. Sayfada ikisi de yoktur.",
      "Çerez. Oyunun kendisi çerez yazmaz.",
    ],
    extra: [
      {
        title: "Bu oda ne kadar özel",
        paragraphs: [
          "Oyun, herkesin bağlanabildiği bir MQTT sunucusunu kullanır. HiveMQ da bu sunucunun özel ya da gerçek ürün verisi için olmadığını söyler. Telefonunuzla sunucu arasındaki bağlantı şifrelidir, oyun içeriği ise şifrelenmez ve kimlik doğrulaması yoktur.",
          "Oda kodu şifre değildir. Kodu bilen biri adları, oyları ve sonuçları görebilir, odaya yazabilir. Kod dört harflidir, tahmin edilebilir; MQTT'nin joker abonelikleri bu sunucuda açıksa kodu bilmeyen biri de oyunun tüm odalarını dinleyebilir.",
          "Sorular kişiler hakkında sonuç üretir: \"grubun en dedikoducusu\" gibi. Bu sonuçlar da adlarla birlikte aynı yoldan geçer. Oyun arkadaşlar arası eğlence içindir, gizli bilgi için uygun değildir.",
        ],
      },
      {
        title: "Çerezler ve yerel depolama",
        paragraphs: [
          "Oyun çerez kullanmaz. Tarayıcınızın yerel depolamasına iki değer yazar: ge_id (rastgele oyuncu kimliği) ve ge_name (yazdığınız ad). İkisi de sizi aynı oyuncu olarak tanımak içindir, reklam ya da takip için kullanılmaz. ge_id ayrıca bağlantı adınızın bir parçası olarak MQTT sunucusuna gider.",
          "Sayfa açılırken MQTT kütüphanesi unpkg.com'dan, yazı tipleri Google Fonts'tan yüklenir. Bu yüklemelerde IP adresiniz bu hizmetlere ulaşır.",
        ],
      },
    ],
    recipients: [
      {
        name: "HiveMQ (broker.hivemq.com)",
        role: "Ücretsiz, herkese açık MQTT sunucusu. Ad, oyuncu kimliği, oy, oda kodu ve IP adresi buradan geçer; odanın son durumu burada tutulur. Hesap açmadan kullandığımız için aramızda özel bir sözleşme yoktur ve bağlanan diğer kişiler de aynı trafiği görebilir.",
        location: "Sunucu konumu açıklanmıyor",
        url: "https://www.hivemq.com/legal/privacy-policy/",
      },
      {
        name: "Odadaki diğer oyuncular",
        role: "Adınızı, seçimlerinizi ve sonuçları görür.",
        location: "Oyuncuların bulunduğu yer",
      },
      {
        name: "GitHub Pages",
        role: "Sayfayı barındırır. Ziyaretçinin IP adresini güvenlik amacıyla kaydeder.",
        location: "ABD ve küresel",
        url: "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
      },
      {
        name: "unpkg",
        role: "MQTT kütüphanesini sunan içerik ağı. IP adresini ve tarayıcı bilgisini alır.",
        location: "Küresel",
        url: "https://unpkg.com/",
      },
      {
        name: "Google Fonts",
        role: "Yazı tiplerini sunar. IP adresini ve tarayıcı bilgisini alır.",
        location: "Küresel",
        url: "https://policies.google.com/privacy",
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
      "Oyunu açtığınızda tarayıcınız yukarıdaki sağlayıcılara doğrudan bağlanır. Bu sağlayıcıların sunucuları Türkiye dışında olabilir; adınız, oylarınız ve IP adresiniz bu yolla yurt dışına çıkabilir ve bu, KVKK m.9 kapsamında yurt dışına aktarımdır. HiveMQ'nun herkese açık sunucusu için özel bir güvence sunmuyoruz.",
    security:
      "Bağlantılar TLS ile şifrelidir, ancak oyun içeriği şifrelenmez ve sunucuda giriş yoktur. Bu nedenle oda verilerinin gizli kalacağını garanti edemeyiz. Sunucumuz olmadığı için oyun verileri bizde birikmez.",
    deletion:
      "Tarayıcınızdaki adı ve oyuncu kimliğini site verilerini temizleyerek silersiniz. Sunucudaki oda durumu için oyunda silme düğmesi yoktur; \"Aynı grupla yeniden oyna\" oyları ve sonuçları temizler, adları listede bırakır. Oda kodunu bize yazarsanız o odanın kaydını boş bir iletiyle temizlemeye çalışırız. Sunucuyu biz işletmediğimiz için silindiğini garanti edemeyiz.",
    children:
      "Oyun yaş sormaz, bu yüzden bir oyuncunun çocuk olup olmadığını bilmeyiz. Çocuklara özel bir sürüm ya da koruma yoktur. Oyun adı açık bir kanaldan gönderdiği için çocuklar gerçek adlarını kullanmamalıdır. Veliyseniz bize yazabilirsiniz; bizde bir kayıt varsa sileriz.",
  },
  en: {
    summary:
      "Grubun En'leri has no accounts, but it has no private rooms either. The name you type and your votes pass through a public MQTT server (broker.hivemq.com), where other people can see that traffic, and the room's last state stays on that server. Use a nickname instead of your real name, and do not put anything in the game that you want to keep private.",
    scope:
      "This policy covers the browser game at zer0desu1.github.io/grubun-enleri. Everyone joins a room from their own phone and picks someone from the group for each question. The game has no server or database of ours; the phone of the person who opens the room acts as referee.",
    rows: [
      {
        data: "The name you type (up to 24 characters) and a randomly generated player ID",
        purpose: "Joining a room, showing the player list and results",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "Part of the room's last state, which the game does not delete. It can stay until HiveMQ removes it or a new state is written to the same code. We do not control this period.",
      },
      {
        data: "Your votes (who picked whom), questions and winners",
        purpose: "Counting votes and revealing the result",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention:
          "Votes pass through the server. Votes in the current round and that game's winners stay in the room's last state, as above.",
      },
      {
        data: "Name and player ID kept in your browser (ge_name, ge_id)",
        purpose: "Staying the same player after a page reload",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until you clear your browser's site data",
      },
      {
        data: "IP address and browser details",
        purpose: "Loading the page, the game library and fonts, opening the MQTT connection",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in keeping the game working and secure",
        retention: "As long as each provider keeps its own logs; we hold none of them",
      },
      {
        data: "Your email address and message if you write to us",
        purpose: "Answering your question or deletion request",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "You type the name and cast the votes; both go straight from your phone to the MQTT server. The player ID is generated automatically in your browser on first use. Your IP address reaches the servers your browser connects to when you open the page.",
    required:
      "You need a name to open or join a room, but it does not have to be your real one. A nickname or a single letter is enough, and the game does not check it. Without a name you cannot play.",
    notCollected: [
      "Accounts, email addresses, phone numbers or passwords.",
      "Location, contacts, camera or microphone data.",
      "Ads and analytics. The page has neither.",
      "Cookies. The game itself sets none.",
    ],
    extra: [
      {
        title: "How private a room is",
        paragraphs: [
          "The game uses an MQTT server anyone can connect to. HiveMQ itself says this server is not intended for private or production data. The link between your phone and the server is encrypted, but game content is not, and there is no login.",
          "A room code is not a password. Anyone who knows it can see names, votes and results, and can write to the room. Codes are four letters and can be guessed. If MQTT wildcard subscriptions are open on this server, someone without a code can listen to every room of the game too.",
          "Questions produce results about people, such as \"the group's biggest gossip\", and those results travel the same way, next to names. The game is for fun among friends and is not suitable for anything confidential.",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "The game uses no cookies. It writes two values to your browser's local storage: ge_id (a random player ID) and ge_name (the name you typed). Both exist to recognise you as the same player and are not used for ads or tracking. ge_id also goes to the MQTT server as part of your connection name.",
          "When the page opens, the MQTT library loads from unpkg.com and fonts load from Google Fonts. These requests give those services your IP address.",
        ],
      },
    ],
    recipients: [
      {
        name: "HiveMQ (broker.hivemq.com)",
        role: "Free public MQTT server. Your name, player ID, votes, room code and IP address pass through it, and the room's last state is kept there. We use it without an account, so we have no specific contract with HiveMQ, and other people connected to it can see the same traffic.",
        location: "Server location not disclosed",
        url: "https://www.hivemq.com/legal/privacy-policy/",
      },
      {
        name: "Other players in the room",
        role: "See your name, your choices and the results.",
        location: "Wherever they are",
      },
      {
        name: "GitHub Pages",
        role: "Hosts the page. Logs visitors' IP addresses for security.",
        location: "US and global",
        url: "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
      },
      {
        name: "unpkg",
        role: "Content network serving the MQTT library. Receives your IP address and browser details.",
        location: "Global",
        url: "https://unpkg.com/",
      },
      {
        name: "Google Fonts",
        role: "Serves the fonts. Receives your IP address and browser details.",
        location: "Global",
        url: "https://policies.google.com/privacy",
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
      "When you open the game your browser connects directly to the providers above, whose servers may be outside your country. Your name, votes and IP address can leave the country this way. We offer no specific safeguard for HiveMQ's public server.",
    security:
      "Connections use TLS, but game content is not encrypted and the server has no login, so we cannot promise room data stays private. With no server of our own, game data does not build up with us.",
    deletion:
      "You delete the name and player ID in your browser by clearing site data. The game has no delete button for the room state on the server; \"play again with the same group\" clears votes and results and keeps the names in the list. If you send us the room code we will try to clear that room's record with an empty message. We do not run the server, so we cannot guarantee it is gone.",
    children:
      "The game does not ask for age, so we cannot tell whether a player is a child. There is no children's version and no special protection. Because names travel over an open channel, children should not use their real names. Parents can write to us, and we will delete anything we hold.",
  },
};
