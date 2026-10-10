import type { Metadata } from "next";
import { LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";

const { org } = getContent("tr");

const UPDATED = "10 Ekim 2026";

/**
 * WordDeck'in gizlilik politikası — uygulamanın Ayarlar ekranındaki
 * "Gizlilik politikası" satırı ve mağaza listeleri buraya bağlanıyor.
 *
 * Eskiden uygulamanın kendi sunucusundan (Convex HTTP rotası) servis
 * ediliyordu; o adres dev ve prod arasında değişeceği için mağazaya
 * verilecek kalıcı adres burası. Metin uygulamanın veri modeliyle birlikte
 * değişmeli: uygulamaya yeni bir veri eklenirse önce bu sayfa güncellenir.
 */

const CONTACT = org.email;

export const metadata: Metadata = {
  title: "WordDeck Gizlilik Politikası",
  description: "WordDeck'in hangi verileri sakladığı, neden sakladığı ve nasıl silineceği.",
};

export default function WordDeckPrivacyPage() {
  return (
    <LegalPage
      locale="tr"
      eyebrow="WordDeck"
      title="Gizlilik Politikası"
      updated={UPDATED}
    >
      <LegalSection title="Kısaca">
        <p><strong>WordDeck&apos;te hesap yoktur.</strong> Bize adınızı, e-posta
          adresinizi ya da bir şifre vermezsiniz ve kim olduğunuzu öğrenmemizin bir yolu
          yoktur. Uygulama ayarlarınızı ve çalışma ilerlemenizi, cihazınızın ilk açılışta
          ürettiği rastgele bir tanımlayıcıya bağlı olarak saklar; başka hiçbir şey
          saklamaz.</p>
      </LegalSection>

      <LegalSection title="Bu metin kimi kapsar">
        <p>WordDeck, Neuvikon tarafından yayımlanan, iOS ve Android için bir kelime
          kartı uygulamasıdır. Bu aydınlatma metni uygulamayı ve ona hizmet veren sunucu
          tarafını kapsar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
          kapsamında veri sorumlusu Neuvikon&apos;dur. İletişim:
          {" "}
          <LegalLink href={`mailto:${CONTACT}`}>{CONTACT}</LegalLink>.</p>
      </LegalSection>

      <LegalSection title="Cihaz tanımlayıcısı">
        <p>Uygulamayı ilk açtığınızda cihazınız rastgele 256 bitlik bir değer üretir ve
          bunu sistemin anahtar zincirinde (keychain/keystore) saklar. İlerlemenizi bize
          tanıtan tek şey bu değerdir. Donanımınızdan, Apple ya da Google hesabınızdan,
          telefon numaranızdan veya hakkınızdaki başka bir bilgiden türetilmez; reklam
          kimliği değildir ve kimseyle paylaşılmaz. Uygulamayı silip yeniden
          yüklerseniz yeni bir değer üretilir ve eski ilerlemenize artık ulaşılamaz;
          bunu önlemek için ilerlemenizi önce bir taşıma koduyla aktarabilirsiniz
          (aşağıya bakın).</p>
      </LegalSection>

      <LegalSection title="Ne saklıyoruz">
        <p>Yalnızca bu tanımlayıcıya bağlı olarak:</p>
        <ul>
          <li>Seçtiğiniz arayüz dili.</li>
          <li>Seçtiğiniz İngilizce seviyesi (A1–C2); size gelecek kelimeleri belirler.</li>
          <li>Hazırlandığınız sınavlar, günde kaç yeni kart istediğiniz ve günlük tekrar limitiniz.</li>
          <li>Kartların önce İngilizce kelimeyi mi yoksa Türkçe anlamı mı gösterdiği ve
            cevaplarınızı yazıp yazmadığınız. Yazdığınız cevaplar cihazınızda kontrol
            edilir, bize hiç gönderilmez.</li>
          <li>Günlük hatırlatıcı için seçtiğiniz saat ve dakika.</li>
          <li>Başladığınız tarih.</li>
          <li>Yeni telefona taşımak istediğinizde: kullanılınca ya da on beş dakika
            sonra silinen, tek kullanımlık bir taşıma kodu.</li>
          <li>Her cevap için rastgele bir kimlik; iki kez gönderilen bir cevap (örneğin
            çevrimdışı çalıştıktan sonra) bir kez sayılsın diye yaklaşık iki gün saklanır.
            Bir cevap bize ulaşana kadar, cihaz anahtarınız olmadan telefonunuzda da
            saklanır.</li>
          <li>Çalıştığınız her kart için tekrar takvimindeki yeri: bir sonraki tekrar
            zamanı, mevcut aralığı, kaç kez cevaplayıp unuttuğunuz ve onu zaten
            bildiğiniz olarak işaretleyip işaretlemediğiniz. Uygulamanın her
            kelimeyi tam unutmak üzereyken geri getirmesini sağlayan budur.</li>
          <li>Çalıştığınız her gün için kaç kart cevapladığınız, kaçının yeni olduğu ve
            kaçını bildiğiniz. Etkinlik tablonuz ve seriniz bundan çizilir.</li>
        </ul>
        <p>Liste bundan ibarettir. Alıştırma testleri yukarıdaki bilgilerden üretilir;
          testteki cevaplarınız bize hiç gönderilmez. Tema ve arka plan tercihleriniz
          cihazınızda kalır.</p>
      </LegalSection>

      <LegalSection title="Neleri toplamıyoruz">
        <ul>
          <li>Ad, e-posta adresi, telefon numarası ya da şifre.</li>
          <li>Rehber, fotoğraf, takvim, mikrofon, kamera ya da konum verisi.</li>
          <li>Analitik ya da kullanıcı takibi yapan bir SDK.</li>
          <li>Reklamlarla ilgili hiçbir bilgi bize ulaşmaz: reklamları Google doğrudan
            cihazınıza sunar; kim olduğunuzu ya da size ne gösterildiğini görmeyiz.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Reklamlar">
        <p>Uygulama Google AdMob reklamları gösterir: ana ekranların altında bir banner
          ve bir çalışma oturumunu ya da testi bitirdiğinizde zaman zaman tam ekran
          bir reklam.
          Google, reklamı sunmak için gerekenleri alır — cihazınızın reklam kimliği, cihaz
          türü ve IP adresinden çıkarılan kaba bir konum — ve bu verileri kendi gizlilik
          politikasına göre işler. Biz yalnızca kişiselleştirilmemiş reklam isteriz; yani
          reklamlar hakkınızda oluşturulmuş bir profile göre değil, bağlama göre seçilir.
          Reklamlarla ilgili hiçbir şey bize geri gönderilmez ya da ilerlemenizle
          birleştirilmez.</p>
      </LegalSection>

      <LegalSection title="Telaffuz">
        <p>Karttaki hoparlöre dokunduğunuzda kelimeyi cihazınızın kendi metinden sese
          dönüştürme motoru okur. Kelime bize gönderilmez.</p>
      </LegalSection>

      <LegalSection title="Bildirimler">
        <p>Günlük hatırlatıcınızı, seçtiğiniz saatte işletim sistemi kendi cihazınızda
          planlar. Push token oluşturulmaz ve sunucularımızdan hiçbir şey gönderilmez;
          bu yüzden bir hatırlatıcının çalıp çalmadığını ya da açıp açmadığınızı
          bilemeyiz. Bildirim izni isteğe bağlıdır; uygulama izin olmadan da tam olarak
          çalışır.</p>
      </LegalSection>

      <LegalSection title="Veriler nerede tutulur">
        <p>Sunucu tarafı Convex (Convex, Inc.) üzerinde, Avrupa Birliği&apos;ndeki bir
          bölgede çalışır; yani yukarıdaki veriler yurt dışında barındırılır. Her
          internet hizmetinde olduğu gibi, altyapı hizmeti çalışır ve güvende tutmak
          için IP adreslerini içeren olağan istek kayıtlarını kısa bir süre tutar. Bu
          kayıtları hakkınızda profil oluşturmak için kullanmayız ve ilerlemenizle
          birleştirmeyiz.</p>
      </LegalSection>

      <LegalSection title="Verileri başka kim görür">
        <p>Verilerinizi satmayız ve ilerlemenizi kimseyle paylaşmayız. Sürece dahil
          olanlar yukarıda adı geçen barındırma sağlayıcısı ve reklamları sunan
          Google&apos;dır; Google yalnızca reklam isteğinin taşıdığı bilgiyi alır, bizde
          sakladığınız hiçbir şeyi almaz. Geçerli bir yasal karar gerektirirse verileri
          açıklarız — ancak açıklanacak çok az şey vardır ve hiçbiri bir kişiyi
          tanımlamaz.</p>
      </LegalSection>

      <LegalSection title="Her şeyi silmek">
        <p>Ayarlar → <em>İlerlemeyi sil</em>, saklanan ilerlemenizi veri tabanımızdan
          siler ve tanımlayıcıyı ve tercihleri cihazınızdan kaldırır; uygulama ilk
          indirildiği hâline döner. Silme anında gerçekleşir ve geri alınamaz. Bu
          düğmeyi kullanmadan uygulamayı silerseniz kayıtlar sunucuda kalır ve biz dahil
          kimse onlara ulaşamaz; yine de silinmesini isterseniz bize yazabilirsiniz.
          Bunun dışında veriler kurulum var olduğu sürece saklanır.</p>
      </LegalSection>

      <LegalSection title="Haklarınız">
        <p>KVKK&apos;nın 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini
          öğrenme, işlenmişse bilgi talep etme, düzeltilmesini ya da silinmesini isteme,
          aktarıldığı üçüncü kişileri bilme ve işlemeye itiraz etme haklarına sahipsiniz;
          AB ve Birleşik Krallık&apos;ta GDPR benzer haklar tanır. Sizi tanımlayan hiçbir şey
          tutmadığımız için e-postayla gelen bir talebi genellikle belirli bir kayıtla
          eşleştiremeyiz — silme hakkını kullanmanın güvenilir yolu Ayarlar&apos;daki
          düğmedir ve bizden bir şey istemenizi gerektirmez. Diğer talepleriniz için
          {" "}
          <LegalLink href={`mailto:${CONTACT}`}>{CONTACT}</LegalLink> adresine yazın. Yaptığımız sınırlı
          işlemenin hukuki dayanağı, uygulamayı istediğiniz gibi çalıştırmaktaki meşru
          menfaatimizdir.</p>
      </LegalSection>

      <LegalSection title="Çocuklar">
        <p>Uygulama 13 yaşından küçük çocuklara yönelik değildir ve çocuklar dahil
          kimseden kişisel bilgi toplamaz.</p>
      </LegalSection>

      <LegalSection title="Değişiklikler">
        <p>Bu metin değişirse sayfanın başındaki tarih de değişir. Önemli değişiklikler
          ayrıca uygulamanın sürüm notlarında belirtilir.</p>
      </LegalSection>
    </LegalPage>
  );
}
