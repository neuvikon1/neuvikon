import type { ProductPolicy } from "@/lib/privacy/types";

export const colorHunting: ProductPolicy = {
  slug: "color-hunting",
  name: "Color Hunting",
  updated: { tr: "7 Kasım 2026", en: "7 November 2026" },
  tr: {
    summary:
      "Color Hunting'de hesap yoktur. Oyunda çektiğiniz fotoğraflar sunucuya yüklenir ve odadaki oyunculara gösterilir. Fotoğraflar, oda son hareketinden yaklaşık iki saat sonra otomatik olarak silinir. Fotoğraflarda başka insanlar görünebilir, bu yüzden kimi çektiğinize dikkat edin.",
    scope:
      "Bu metin, Neuvikon'un yayımladığı, gerçek zamanlı kamera ile renk avı parti oyunu Color Hunting'i ve oyuna hizmet veren sunucu tarafını kapsar.",
    rows: [
      {
        data: "Oyuncu adı, oyunda kullandığınız renk",
        purpose: "Sizi odada ve sonuç ekranında göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Odadan çıkınca sunucudan silinir; çıkmazsanız oda silinene kadar. Ad ayrıca cihazınızda kalır",
      },
      {
        data: "Cihazda üretilen rastgele oyuncu kimliği, son görülme zamanı",
        purpose: "Bağlantı koptuğunda sizi aynı koltuğa oturtmak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Sunucuda odadan çıkana ya da oda silinene kadar; cihazda uygulama durdukça",
      },
      {
        data: "Oyunda çektiğiniz fotoğraflar: tam boy ve küçük kopya, çekim zamanı, hedef renk",
        purpose: "Oyunu oynatmak, kareleri oylatmak, sonuç kolajını göstermek",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Yeni tura geçince ya da oda son hareketinden yaklaşık iki saat sonra silinir",
      },
      {
        data: "Fotoğraflarda görünen başka kişiler, yazılar ya da mekânlar",
        purpose: "Oyuncunun çektiği kareyi oyunda göstermek",
        legalBasis: "KVKK m.5/2-(f): oyunun sunulmasındaki meşru menfaatimiz",
        retention: "Fotoğrafla aynı süre",
      },
      {
        data: "Renk puanı ve verilen yıldızlar",
        purpose: "Sıralamayı hesaplamak",
        legalBasis: "KVKK m.5/2-(c): sözleşmenin ifası",
        retention: "Yeni tura geçince ya da oda silinince silinir",
      },
      {
        data: "IP adresi ve olağan istek kayıtları",
        purpose: "Hizmeti çalıştırmak ve güvende tutmak",
        legalBasis: "KVKK m.5/2-(f): hizmet güvenliğindeki meşru menfaatimiz",
        retention: "Barındırma sağlayıcısının kendi kurallarına göre",
      },
      {
        data: "Bize yazdığınızda e-posta adresiniz ve mesajınız",
        purpose: "Destek talebini ve fotoğraf silme isteğini cevaplamak",
        legalBasis: "KVKK m.5/2-(f): size cevap vermedeki meşru menfaatimiz",
        retention: "Konu kapandıktan sonra en çok 1 yıl",
      },
    ],
    collection:
      "Adınızı oda kurarken ya da odaya katılırken siz yazarsınız. Fotoğrafları yalnızca oyun sırasında canlı kameradan siz çekersiniz; uygulamada galeri seçici yoktur. Çektiğiniz kare cihazınızda küçültülür ve otomatik olarak sunucuya yüklenir. Sunucu küçük kopyadaki piksellere bakarak hedef renge uyum puanı hesaplar. E-posta verileri bize yazdığınızda ulaşır.",
    required:
      "Oynamak için bir ad ve kamera izni gerekir. Gerçek adınızı yazmak zorunda değilsiniz. Kamera iznini vermezseniz fotoğraf çekemezsiniz. Oyun sırasında kilit süresi dolmadan kendi karenizi silip yeniden çekebilirsiniz.",
    notCollected: [
      "Hesap, e-posta ya da telefon numarası.",
      "Galerinizdeki fotoğraflar. Uygulama galerinize erişmez.",
      "Ses kaydı, rehber ya da konum verisi. Uygulama konum izni istemez.",
      "Yüz tanıma. Sunucu fotoğraflarda yalnızca renk ölçer.",
      "Reklam ve analitik. Oyunda bunların SDK'sı yoktur.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Sunucu, veri tabanı ve dosya deposu sağlayıcısı. Adları, fotoğrafları ve oyun durumunu bizim adımıza barındırır, renk puanını hesaplayan kodu çalıştırır, istek kayıtlarını tutar.",
        location: "Türkiye dışı",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Odadaki oyuncular",
        role: "Oylama ve sonuç aşamalarında adınızı ve fotoğraflarınızı görür. Fotoğrafları ekran görüntüsü alarak saklayabilirler; bunu engelleyemeyiz.",
        location: "Oyuncuların bulunduğu yer",
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
      "Adlar, fotoğraflar ve oyun verileri Türkiye dışındaki Convex sunucularında barındırılır; bu, KVKK m.9 kapsamında yurt dışına aktarımdır. Destek e-postaları Google'ın yurt dışındaki sunucularında saklanır.",
    security:
      "Uygulama ile sunucu arasındaki bağlantı şifrelidir. Oyun sırasında her oyuncu yalnızca kendi karelerini görür, diğerleri oylamada açılır. Fotoğraflar tahmin edilmesi zor bağlantılarla sunulur, ancak bağlantıya sahip olan biri giriş yapmadan açabilir. Oda kodunu yalnızca birlikte oynayacağınız kişilerle paylaşın.",
    deletion:
      "Otomatik temizlik 15 dakikada bir çalışır ve son iki saattir hareket olmayan odaları fotoğrafları, oyları ve oyuncu kayıtlarıyla siler. Son oyuncu da çıktığında oda bir sonraki temizlikte silinir. Yeni tur başlatıldığında önceki turun fotoğrafları hemen silinir. Odadan çıkmak adınızı siler, ancak çektiğiniz kareler oda silinene kadar diğer oyuncular için kalır. Yükleme bitip kayıt tamamlanmadan bağlantı koparsa dosya otomatik temizliğe girmeyebilir. Hesap olmadığı için ayrı bir hesap silme adımı yoktur; uygulamayı kaldırmak adınızı, kimliğinizi ve görüntü önbelleğini cihazınızdan siler. Bir fotoğrafın daha erken silinmesini istiyorsanız oda kodunu belirterek bize yazın.",
    children:
      "Oyun yaş sormaz ve çocuklara özel bir ürün değildir. Çocuklardan bilerek kişisel veri toplamayız; bir çocuğa ait veri yüklendiğini öğrenirsek sileriz. Çocukların fotoğrafını çekmeyin, çocuk oyuncular oyunu bir yetişkin eşliğinde oynasın.",
    extra: [
      {
        title: "Başkalarının fotoğrafları",
        paragraphs: [
          "Renk ararken karenize başka insanlar, plakalar ya da özel alanlar girebilir. Bu kareler odadaki oyunculara gösterilir ve Türkiye dışındaki sunuculara yüklenir. Birini çekecekseniz önce iznini alın, tanımadığınız kişileri ve çocukları çekmeyin, özel ya da uygunsuz içerik yüklemeyin. Yanlış bir kare çektiyseniz çekim süresi bitmeden uygulamadan silebilirsiniz.",
          "Bir fotoğrafta göründüğünüzü düşünüyorsanız bize yazabilirsiniz. Odalar kısa sürede silindiği için çoğu durumda fotoğraf siz yazmadan kaybolmuş olur.",
        ],
      },
      {
        title: "Kamera izni",
        paragraphs: [
          "Kamera yalnızca oyunun çekim ekranında açılır. Oyun mikrofon kullanmaz ve ses kaydetmez. Çektiğiniz kare yüklenirken kısa süre cihazınızda geçici dosya olarak durur, gösterilen fotoğraflar uygulamanın görüntü önbelleğinde kalabilir.",
        ],
      },
    ],
  },
  en: {
    summary:
      "Color Hunting has no accounts. The photos you take in a game are uploaded to the server and shown to the players in your room. Photos are deleted automatically about two hours after the room's last activity. Other people may appear in photos, so take care who you shoot.",
    scope:
      "This policy covers Color Hunting, Neuvikon's real-time camera colour-hunt party game, and the backend that serves it.",
    rows: [
      {
        data: "Player name and the colour you play",
        purpose: "Showing you in the room and on the results screen",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Removed from the server when you leave; otherwise until the room is deleted. Your name also stays on your device",
      },
      {
        data: "Random player ID created on your device, last seen time",
        purpose: "Putting you back in your seat after a disconnect",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "On the server until you leave or the room is deleted; on your device while the app is installed",
      },
      {
        data: "Photos you take in a game: full size and small copy, capture time, target colour",
        purpose: "Running the game, voting on shots, showing the results collage",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Deleted when a new round starts, or about two hours after the room's last activity",
      },
      {
        data: "Other people, text or places visible in photos",
        purpose: "Showing the player's shot in the game",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in providing the game",
        retention: "Same as the photo",
      },
      {
        data: "Colour score and stars given",
        purpose: "Working out the ranking",
        legalBasis: "GDPR Art. 6(1)(b): performance of a contract",
        retention: "Deleted when a new round starts or the room is deleted",
      },
      {
        data: "IP address and ordinary request logs",
        purpose: "Running the service and keeping it secure",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in service security",
        retention: "Under the hosting provider's own rules",
      },
      {
        data: "Your email address and message when you write to us",
        purpose: "Answering support and photo removal requests",
        legalBasis: "GDPR Art. 6(1)(f): legitimate interest in answering you",
        retention: "Up to 1 year after the matter closes",
      },
    ],
    collection:
      "You type your name when you create or join a room. You take photos only from the live camera during a game; the app has no gallery picker. Each shot is resized on your device and uploaded automatically. The server reads the pixels of the small copy to score how well it matches the target colour. Email data reaches us when you write to us.",
    required:
      "You need a name and camera permission to play. It does not have to be your real name. Without camera permission you cannot take photos. During a game, until the shutter locks, you can delete your own shot and retake it.",
    notCollected: [
      "Accounts, email addresses or phone numbers.",
      "Photos from your gallery. The app does not access it.",
      "Sound recordings, contacts or location data. The app does not ask for location permission.",
      "Face recognition. The server only measures colour in photos.",
      "Ads and analytics. The game contains no SDK for them.",
    ],
    recipients: [
      {
        name: "Convex",
        role: "Backend, database and file storage provider. Hosts names, photos and game state on our behalf, runs the code that scores colour and keeps request logs.",
        location: "Outside Turkey",
        url: "https://www.convex.dev/legal/privacy",
      },
      {
        name: "Players in your room",
        role: "See your name and photos in the voting and results stages. They can keep photos by taking a screenshot, which we cannot prevent.",
        location: "Wherever the players are",
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
      "Names, photos and game data are hosted on Convex servers outside Turkey, which is a transfer abroad under KVKK Art. 9 for users in Turkey. Support email is stored on Google's servers, which may be outside your country.",
    security:
      "Traffic between the app and the server is encrypted. During a game each player sees only their own shots; the others open in voting. Photos are served from hard-to-guess links, but anyone holding a link can open it without signing in. Share your room code only with people you are playing with.",
    deletion:
      "Automatic cleanup runs every 15 minutes and deletes rooms with no activity for two hours, along with their photos, votes and player records. When the last player leaves, the room goes at the next cleanup. Starting a new round deletes the previous round's photos at once. Leaving a room removes your name, but your shots stay for the other players until the room is deleted. If the connection drops after an upload finishes but before it is recorded, the file may escape automatic cleanup. With no accounts there is no account deletion step; uninstalling removes your name, ID and image cache from your device. To have a photo removed sooner, write to us with the room code.",
    children:
      "The game does not ask your age and is not a product made specially for children. We do not knowingly collect personal data from children and delete it if we learn it was uploaded. Do not photograph children, and child players should play with an adult present.",
    extra: [
      {
        title: "Photos of other people",
        paragraphs: [
          "While hunting a colour, other people, number plates or private spaces can end up in your shot. Those shots are shown to the players in your room and uploaded to servers outside Turkey. Ask first before photographing someone, do not shoot strangers or children, and do not upload private or inappropriate content. If you took a wrong shot you can delete it in the app before capture time ends.",
          "If you think you appear in a photo, you can write to us. Because rooms are deleted quickly, the photo is usually gone before you need to.",
        ],
      },
      {
        title: "Camera permission",
        paragraphs: [
          "The camera opens only on the game's capture screen. The game does not use the microphone and records no sound. A shot stays on your device as a temporary file while it uploads, and displayed photos may remain in the app's image cache.",
        ],
      },
    ],
  },
};
