import type { ProductPolicy } from "@/lib/privacy/types";

export const vecta: ProductPolicy = {
  slug: "vecta",
  name: "Vecta",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Vecta geniş izinler ister, çünkü telefonunuzla saatiniz arasında köprü kurar. Bildirimleriniz, ekran görüntünüz ve fotoğraflarınız bize değil yalnızca kendi cihazınıza gider, ama bu trafik yerel ağda şifresizdir. Bulutta tutulan ise ses notları, çizimler ve kısa mesajlardır: bunlar Google Firestore'da durur ve uygulamada silme düğmesi yoktur.",
    scope:
      "Bu metin, Vecta Android uygulamasını, Vecta cihazının yazılımını ve bunların kullandığı bulut hizmetlerini kapsar. Hesap açılmaz. Çoğu özellik telefonla cihaz arasında çalışır; her izin ilgili özelliği açtığınızda istenir.",
    rows: [
      {
        data: "Konum (yaklaşık ve kesin)",
        purpose: "Bulucu, İkiz pusulası, harita, navigasyon ve hava durumu",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Uygulama konum geçmişi tutmaz; özellik açıkken kullanılır, sağlayıcıların kendi kayıt süreleri geçerlidir",
      },
      {
        data: "Yazdığınız hedef adresi, rota başlangıç ve bitiş koordinatları, harita bölgesi",
        purpose: "Adresi bulmak, rota çizmek, haritayı cihazda göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Uygulamada kayıt tutulmaz; Nominatim, OSRM ve OSM kendi kayıtlarını tutar",
      },
      {
        data: "Ses notları (telefon mikrofonundan, yaklaşık 10 saniyeye kadar), gönderen etiketi ve zaman",
        purpose: "Aynı odadaki Vecta kullanıcılarıyla uzaktan mesajlaşmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Firestore'da süresiz kalır; otomatik silinmez, uygulamada silme yolu yoktur",
      },
      {
        data: "Oda adı, cihaz kimliği, cihazdan gönderilen çizim ve kısa mesajlar",
        purpose: "Vecta cihazları arasında internet üzerinden iletişim",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Firestore'da süresiz kalır; otomatik silinmez, uygulamada silme yolu yoktur",
      },
      {
        data: "Anonim Firebase kimliği ve bağlantı anındaki IP adresi",
        purpose: "Firestore'a erişmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Firebase projesinde silinene kadar",
      },
      {
        data: "Asistana söylediğiniz ses kaydı (cihaz mikrofonu, kayıt başına yaklaşık 4 saniye), asistan metni, Gemini anahtarınız",
        purpose: "Kendi Gemini anahtarınızla sesli asistanı çalıştırmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Anahtar telefonda siz silene kadar durur; ses ve metin için Google'ın koşulları geçerlidir, bize gelmez",
      },
      {
        data: "Bildirimler: uygulama adı, tür, başlık (40 karakter), içerik (150 karakter)",
        purpose: "Telefon bildirimlerini saatte göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Cihaz belleğinde son 8 bildirim durur; cihaz yeniden başlayınca ya da siz silince gider. Bize ve buluta gitmez.",
      },
      {
        data: "Çalan parçanın adı, sanatçısı, kapağı; isteğe bağlı Spotify oturumu",
        purpose: "Şimdi çalıyor ekranı ve şarkı sözleri",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Spotify oturum bilgisi telefonda, bağlantıyı kesene kadar; LRCLIB ve Spotify kendi kayıtlarını tutar",
      },
      {
        data: "Seçtiğiniz fotoğraf, video ve belgeler; fotoğraf izleme açıkken çekilen yeni fotoğraflar",
        purpose: "Görseli ya da metni cihazda göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Kaydettikleriniz telefondaki kütüphanede siz silene kadar durur; bize gelmez",
      },
      {
        data: "Ekran görüntüsü kareleri ve saatten gelen dokunma hareketleri",
        purpose: "Telefon ekranını saatte görmek ve saatten kontrol etmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Yalnızca yansıtma sürerken akar; kaydedilmez, bize gelmez",
      },
      {
        data: "Wi-Fi ağ adı ve şifresi, cihaz adresleri, cihaz ayar yedekleri, modül kullanım sayıları",
        purpose: "Cihazı ağa bağlamak, birden çok cihazı yönetmek, ayarları geri yüklemek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Telefonda ve cihazda, siz silene ya da uygulamayı kaldırana kadar",
      },
      {
        data: "Seçilen modül listesi ve IP adresi",
        purpose: "Özel yazılım derlemesini başlatmak, modül ve güncelleme dosyalarını indirmek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Derleme adı ve dosyası herkese açık GitHub deposunda kalır; size bağlanmaz",
      },
      {
        data: "Bize yazarsanız e-posta adresiniz ve mesajınız",
        purpose: "Destek ve silme isteklerini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): başvurunuzu cevaplamaktaki meşru menfaat",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Veriler sizin başlattığınız işlemlerle ve açtığınız özelliklerle toplanır. Bildirim aynalama, müzik, ekran yansıtma ve fotoğraf izleme açık kaldığı sürece otomatik ve sürekli çalışır. Ses notu yalnızca kayıt düğmesiyle, asistan kaydı yalnızca siz başlatınca alınır.",
    required:
      "Hiçbir izin zorunlu değildir; Vecta'yı resim göndermek gibi temel işler için bu izinler olmadan kullanabilirsiniz. Bir izni vermezseniz yalnızca ona bağlı özellik çalışmaz. Android ayarlarından izni dilediğiniz an geri alabilirsiniz. Gemini anahtarı, Spotify ve oda adı da isteğe bağlıdır.",
    notCollected: [
      "Hesap, ad, e-posta ya da telefon numarası.",
      "Rehber, SMS, arama kaydı ya da takvim. Uygulama bu izinleri istemez.",
      "Arka plan konumu. Konum izni yalnızca uygulama kullanılırken geçerlidir.",
      "Reklam, analitik ya da hata raporlama aracı.",
      "Bildirimlerinizin, ekran görüntünüzün ve galerinizin bize ya da buluta gönderilmesi. Bunlar yalnızca kendi cihazınıza gider.",
      "Erişilebilirlik yoluyla ekran içeriği. Servis ekranı okumaz.",
    ],
    extra: [
      {
        title: "İzinler: neden isteniyor, veri nereye gidiyor",
        list: [
          "Konum: Bulucu, İkiz, harita, navigasyon, hava durumu. Cihazınıza gider; harita ve rota için OpenStreetMap ve OSRM'ye, hava durumu için Open-Meteo'ya gider.",
          "Mikrofon: ses notu kaydı. Kayıt Firestore'a yüklenir. Telefon arka planda dinleme yapmaz.",
          "Fotoğraf ve videolar: seçtiğiniz görseli göndermek ve fotoğraf izlemede yeni çekilen kareyi cihaza iletmek. Yalnızca cihazınıza gider. Android bu izni ses dosyalarıyla birlikte sorabilir; uygulama ses dosyalarınızı okumaz.",
          "Ekran kaydı: ekran yansıtma. Android her seferinde onay ister, üstte bildirim görünür. Kareler yalnızca cihazınıza gider. Yansıtma açıkken ekrandaki her şey, şifreler ve özel mesajlar dahil saatte görünür.",
          "Bildirim erişimi: bildirimleri saate aynalamak, Google Maps yönlerini okumak, çalan müziği görmek. Filtre yoktur: mesajlar, banka bildirimleri ve doğrulama kodları dahil her uygulamanın başlık ve içeriği saate gider. Yalnızca cihazınıza gider.",
          "Erişilebilirlik: saatteki dokunuşları telefona uygulamak. Yalnızca ekran yansıtma sırasında hareket uygular, ekran içeriğini okumaz. Ayarlardan siz açarsınız.",
          "Bluetooth: cihaza navigasyon ve bildirim paketi göndermek. Yalnızca cihazınıza gider.",
          "Bildirim gönderme ve ön plan hizmeti: yansıtma, müzik ve fotoğraf izleme çalışırken bunu görünür kılmak.",
          "İnternet ve ağ durumu: cihaza ve aşağıdaki hizmetlere bağlanmak.",
        ],
      },
      {
        title: "Oda adı şifre değildir",
        paragraphs: [
          "Oda (uzak iletişim) özelliğinde aynı oda adını giren herkes o odanın ses notlarını, çizimlerini ve mesajlarını görebilir. Uygulama adı kısa örneklerle anlatsa da tahmin edilmesi zor bir ad seçin, ad ya da numara kullanmayın ve gizli bir şey söylemeyin. Oda adı girmezseniz bu özellik çalışmaz ve Firestore'a veri gitmez.",
        ],
      },
      {
        title: "Gemini asistanı",
        paragraphs: [
          "Asistan kendi Google Gemini anahtarınızla çalışır. Ses kaydınız ve metin telefonunuzdan doğrudan Google'a gider, bize uğramaz; bu kullanımda Google ile siz muhatapsınız. Google'ın ücretsiz katman koşullarına göre içerik ürün geliştirmede kullanılabilir ve insanlar tarafından incelenebilir. Google bu katmana hassas, gizli ya da kişisel bilgi vermemenizi ister ve 18 yaş şartı koyar.",
          "XiaoZhi ve OpenClaw modüllerini açarsanız ses ya da metin sizin yazdığınız sunucuya gider. O sunucudan biz sorumlu değiliz.",
        ],
      },
      {
        title: "Yerel ağda şifresiz trafik",
        paragraphs: [
          "Telefon ile cihaz arasındaki Wi-Fi trafiği düz HTTP'dir, yani şifrelenmez. Bildirimler, fotoğraflar, ekran kareleri, konum ve Wi-Fi şifreniz bu yoldan geçer. Aynı ağdaki biri bunları görebilir. Bu yüzden cihazı güvendiğiniz ağlarda kullanın, halka açık Wi-Fi'da bildirim aynalama ve ekran yansıtmayı kapatın.",
        ],
      },
    ],
    recipients: [
      {
        name: "Google Firebase (Firestore, Authentication)",
        role: "Ses notlarını, çizimleri, mesajları, oda adlarını, cihaz kimliklerini ve anonim kimlikleri saklar; bağlantı IP adresini görür.",
        location: "Google altyapısı, Türkiye dışı",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google Gemini API",
        role: "Yalnızca anahtar girerseniz. Ses kaydını ve metni işler, cevabı ve sesi üretir. Kendi anahtarınızla, kendi Google hesabınız adına çalışır.",
        location: "Küresel",
        url: "https://aistudio.google.com/docs/terms",
      },
      {
        name: "Spotify",
        role: "Yalnızca bağlarsanız. Oturum bilginizle çalan parça bilgisini sunar.",
        location: "Küresel",
        url: "https://www.spotify.com/legal/privacy-policy/",
      },
      {
        name: "LRCLIB",
        role: "Sanatçı ve parça adını alır, şarkı sözü döner. Telefon ve cihaz doğrudan bağlanır.",
        location: "Konumu açıklanmıyor",
        url: "https://lrclib.net/",
      },
      {
        name: "Open-Meteo",
        role: "Koordinatlarınızı alır, hava durumu döner. Telefon ve cihaz doğrudan bağlanır.",
        location: "İsviçre merkezli şirket; sunucu konumu açıklanmıyor",
        url: "https://open-meteo.com/en/terms",
      },
      {
        name: "OpenStreetMap (harita ve Nominatim)",
        role: "Harita bölgesini ve yazdığınız adres aramasını alır. IP adresini görür.",
        location: "Birleşik Krallık ve küresel",
        url: "https://osmfoundation.org/wiki/Privacy_Policy",
      },
      {
        name: "Project OSRM",
        role: "Rota başlangıç ve bitiş koordinatlarını alır, rota döner. Ücretsiz genel sunucudur, aramızda özel bir sözleşme yoktur.",
        location: "Konumu açıklanmıyor",
        url: "https://project-osrm.org/",
      },
      {
        name: "Cloudflare",
        role: "Derleme isteğini ileten Worker: modül listesini ve IP adresini görür, kayıt tutmaz. cdnjs üzerinden PDF okuyucu dosyalarını da sunar; PDF'in kendisi gitmez.",
        location: "Küresel",
        url: "https://www.cloudflare.com/privacypolicy/",
      },
      {
        name: "GitHub",
        role: "Modül listesini ve yazılım dosyalarını sunar, derlemeyi çalıştırır. İndirme sırasında IP adresini görür.",
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
      "Firestore'daki ses notları, çizimler ve mesajlar Google'ın yurt dışındaki sunucularında tutulur; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Konum, adres araması, parça adı ve IP adresi de açtığınız özelliğe göre yukarıdaki yurt dışı hizmetlere doğrudan telefonunuzdan ya da cihazınızdan gider. Bildirimler, ekran görüntüleri ve galeri cihazınızdan öteye gitmez, yurt dışına çıkmaz.",
    security:
      "Bulut hizmetlerine bağlantılar HTTPS ile şifrelidir. Telefon ile cihaz arasındaki Wi-Fi trafiği şifresizdir. Cihazın kendi yayınladığı Wi-Fi ağı sabit bir şifre kullanır ve cihazın yerel arayüzünde giriş yoktur; aynı ağdaki biri cihaza komut gönderebilir. Gemini anahtarınız ve Spotify oturumunuz telefonda şifrelenmeden saklanır ve Android yedeklemesine dahil olabilir. Paylaşımlı bir telefonda bu özellikleri kullanmayın.",
    deletion:
      "Hesap olmadığı için kapatılacak bir hesap da yoktur. Uygulamayı kaldırdığınızda telefondaki anahtarlar, ayarlar, kütüphane ve yedekler silinir. Kütüphane öğelerini uygulamadan da silebilirsiniz; Spotify bağlantısını kesebilir, izinleri Android ayarlarından geri alabilirsiniz. Firestore'daki ses notları, çizimler ve mesajlar için uygulamada ve cihazda silme yolu yoktur ve kendiliğinden silinmezler. Silinmeleri için oda adınızı bize yazın, odadaki kayıtları elle sileriz; aynı odadaki kişilerin içeriği de birlikte gidebilir. Google'daki Gemini kayıtları için Google'a başvurmanız gerekir.",
    children:
      "Vecta yaş sormaz ve çocuklara özel bir sürümü yoktur. Gemini asistanı için Google 18 yaş şartı koyar. Ses notu ve oda özelliği, oda adını bilen başkalarıyla içerik paylaştığı için çocukların kullanımına uygun değildir. Veliyseniz ve çocuğunuza ait bir kayıt olduğunu düşünüyorsanız oda adıyla bize yazın, sileriz.",
  },
  en: {
    summary:
      "Vecta asks for broad permissions because it bridges your phone and your watch. Your notifications, screen and photos go only to your own device, not to us, but that traffic is unencrypted on your local network. What lives in the cloud is voice memos, drawings and short messages: they stay in Google Firestore, and the app has no delete button for them.",
    scope:
      "This policy covers the Vecta Android app, the software on the Vecta device and the cloud services they use. There are no accounts. Most features run between phone and device, and each permission is requested when you turn on the feature that needs it.",
    rows: [
      {
        data: "Location (approximate and precise)",
        purpose: "Finder, Buddy compass, map, navigation and weather",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "The app keeps no location history; used while a feature is on, and providers apply their own log periods",
      },
      {
        data: "Destination address you type, route start and end coordinates, map area",
        purpose: "Finding the address, plotting a route, showing the map on the device",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Not stored in the app; Nominatim, OSRM and OSM keep their own logs",
      },
      {
        data: "Voice memos (from the phone microphone, up to about 10 seconds), sender label and time",
        purpose: "Messaging other Vecta users in the same room remotely",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Kept in Firestore indefinitely; no automatic deletion and no delete option in the app",
      },
      {
        data: "Room name, device ID, drawings and short messages sent from the device",
        purpose: "Communication between Vecta devices over the internet",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Kept in Firestore indefinitely; no automatic deletion and no delete option in the app",
      },
      {
        data: "Anonymous Firebase ID and IP address at connection",
        purpose: "Reaching Firestore",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Until removed from the Firebase project",
      },
      {
        data: "Audio you say to the assistant (device microphone, about 4 seconds per recording), assistant text, your Gemini key",
        purpose: "Running the voice assistant with your own Gemini key",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "The key stays on the phone until you remove it; Google's terms apply to audio and text, which never reach us",
      },
      {
        data: "Notifications: app name, type, title (40 characters), body (150 characters)",
        purpose: "Showing phone notifications on the watch",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "The device's memory holds the last 8; they go when it restarts or you dismiss them. They never reach us or the cloud.",
      },
      {
        data: "Title, artist and cover of what is playing; optional Spotify session",
        purpose: "Now-playing screen and lyrics",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Spotify session stays on the phone until you disconnect; LRCLIB and Spotify keep their own logs",
      },
      {
        data: "Photos, videos and documents you pick; new photos while photo watching is on",
        purpose: "Showing the image or text on the device",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Saved items stay in the phone's library until you delete them; nothing reaches us",
      },
      {
        data: "Screen frames and touch gestures from the watch",
        purpose: "Seeing the phone screen on the watch and controlling it from there",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Flows only during mirroring; not stored and does not reach us",
      },
      {
        data: "Wi-Fi network name and password, device addresses, device settings backups, module usage counts",
        purpose: "Connecting the device, managing several devices, restoring settings",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "On the phone and device until you delete it or uninstall the app",
      },
      {
        data: "Chosen module list and IP address",
        purpose: "Starting a custom software build, downloading module and update files",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "The build name and file stay in a public GitHub repository, not linked to you",
      },
      {
        data: "Your email address and message if you write to us",
        purpose: "Answering support and deletion requests",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "Data comes from actions you start and features you turn on. Notification mirroring, music, screen mirroring and photo watching run automatically and continuously while enabled. Voice memos are recorded only with the record button, and assistant audio only when you start it.",
    required:
      "No permission is mandatory; you can use Vecta for basic tasks such as sending images without them. If you refuse a permission, only the feature that needs it stops working, and you can withdraw any permission in Android settings. A Gemini key, Spotify and a room name are optional too.",
    notCollected: [
      "Accounts, names, email addresses or phone numbers.",
      "Contacts, SMS, call logs or calendars. The app does not ask for these permissions.",
      "Background location. Location permission applies only while the app is in use.",
      "Ads, analytics or crash reporting tools.",
      "Sending your notifications, screen or gallery to us or the cloud. They go only to your own device.",
      "Screen content through accessibility. The service does not read the screen.",
    ],
    extra: [
      {
        title: "Permissions: why they are requested and where data goes",
        list: [
          "Location: Finder, Buddy, map, navigation, weather. It goes to your device, to OpenStreetMap and OSRM for maps and routes, and to Open-Meteo for weather.",
          "Microphone: recording voice memos. Recordings are uploaded to Firestore. The phone does not listen in the background.",
          "Photos and videos: sending images you pick and passing newly taken shots to the device when photo watching is on. They go only to your device. Android may bundle this request with audio files; the app does not read your audio files.",
          "Screen capture: screen mirroring. Android asks each time and shows a notification. Frames go only to your device. While mirroring, everything on screen appears on the watch, including passwords and private messages.",
          "Notification access: mirroring notifications to the watch, reading Google Maps directions, seeing what is playing. There is no filter: titles and bodies from every app, including messages, bank alerts and verification codes, go to the watch. They go only to your device.",
          "Accessibility: applying watch touches to the phone. It injects gestures only during screen mirroring and does not read screen content. You turn it on yourself in settings.",
          "Bluetooth: sending navigation and notification packets to the device. They go only to your device.",
          "Notifications and foreground services: showing that mirroring, music or photo watching is running.",
          "Internet and network state: reaching the device and the services below.",
        ],
      },
      {
        title: "A room name is not a password",
        paragraphs: [
          "In the Room (remote messaging) feature, anyone who enters the same room name can see that room's voice memos, drawings and messages. The app gives short names as examples, but choose something hard to guess, avoid names and numbers, and do not say anything confidential. Without a room name this feature does not work and nothing goes to Firestore.",
        ],
      },
      {
        title: "Gemini assistant",
        paragraphs: [
          "The assistant runs on your own Google Gemini key. Your audio and text go straight from your phone to Google and never pass through us; for this use your relationship is with Google. Under Google's terms for its unpaid tier, content may be used to improve products and may be read by human reviewers. Google asks you not to submit sensitive, confidential or personal information there and requires users to be 18 or older.",
          "If you enable the XiaoZhi or OpenClaw modules, voice or text goes to the server you enter. We are not responsible for that server.",
        ],
      },
      {
        title: "Unencrypted traffic on your local network",
        paragraphs: [
          "Wi-Fi traffic between phone and device is plain HTTP, so it is not encrypted. Notifications, photos, screen frames, location and your Wi-Fi password travel this way, and someone on the same network could see them. Use the device on networks you trust, and turn off notification mirroring and screen mirroring on public Wi-Fi.",
        ],
      },
    ],
    recipients: [
      {
        name: "Google Firebase (Firestore, Authentication)",
        role: "Stores voice memos, drawings, messages, room names, device IDs and anonymous IDs, and sees the connecting IP address.",
        location: "Google infrastructure, outside Turkey",
        url: "https://firebase.google.com/support/privacy",
      },
      {
        name: "Google Gemini API",
        role: "Only if you enter a key. Processes audio and text and produces the reply and speech, on your own key and Google account.",
        location: "Global",
        url: "https://aistudio.google.com/docs/terms",
      },
      {
        name: "Spotify",
        role: "Only if you connect it. Provides what is playing, using your session.",
        location: "Global",
        url: "https://www.spotify.com/legal/privacy-policy/",
      },
      {
        name: "LRCLIB",
        role: "Receives artist and track names and returns lyrics. Phone and device connect directly.",
        location: "Not disclosed",
        url: "https://lrclib.net/",
      },
      {
        name: "Open-Meteo",
        role: "Receives your coordinates and returns the weather. Phone and device connect directly.",
        location: "Swiss company; server location not disclosed",
        url: "https://open-meteo.com/en/terms",
      },
      {
        name: "OpenStreetMap (maps and Nominatim)",
        role: "Receives the map area and your address search, and sees your IP address.",
        location: "UK and global",
        url: "https://osmfoundation.org/wiki/Privacy_Policy",
      },
      {
        name: "Project OSRM",
        role: "Receives route start and end coordinates and returns the route. It is a free public server and we have no specific contract with it.",
        location: "Not disclosed",
        url: "https://project-osrm.org/",
      },
      {
        name: "Cloudflare",
        role: "The Worker that forwards build requests sees the module list and IP address and stores neither. cdnjs also serves the PDF reader files; the PDF itself is not sent.",
        location: "Global",
        url: "https://www.cloudflare.com/privacypolicy/",
      },
      {
        name: "GitHub",
        role: "Serves the module list and software files and runs builds. Sees your IP address during downloads.",
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
      "Voice memos, drawings and messages in Firestore are held on Google's servers outside your country. Depending on the features you use, location, address searches, track names and your IP address also go directly from your phone or device to the international services above. Notifications, screen frames and your gallery go no further than your device, so they do not leave the country.",
    security:
      "Connections to cloud services use HTTPS. Wi-Fi traffic between phone and device is unencrypted. The device's own Wi-Fi network uses a fixed password and its local interface has no login, so someone on the same network can send it commands. Your Gemini key and Spotify session are stored unencrypted on the phone and may be included in Android backups. Avoid these features on a shared phone.",
    deletion:
      "With no account, there is no account to close. Uninstalling the app deletes keys, settings, the library and backups on the phone. You can also delete library items in the app, disconnect Spotify and withdraw permissions in Android settings. There is no way to delete voice memos, drawings or messages in Firestore from the app or the device, and they do not expire. To have them removed, send us your room name and we will delete that room's records by hand; content from other people in the room may go with them. For Gemini records, you need to contact Google.",
    children:
      "Vecta does not ask for age and has no children's version. Google requires Gemini users to be 18 or older. Voice memos and rooms share content with anyone who knows the room name, so they are not suitable for children. If you are a parent and think a record belongs to your child, send us the room name and we will delete it.",
  },
};
