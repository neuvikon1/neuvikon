import type { Metadata } from "next";
import { LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";

const { org } = getContent("tr");

/**
 * Gizlilik politikası.
 *
 * KVKK metni "hangi hakların var" sorusuna cevap veriyor; bu sayfa "site ne
 * yapıyor" sorusuna. İkisini ayırmak, ikisini de okunur tutuyor.
 *
 * ⚠️ Siteye çerez kullanan bir analitik, reklam pikseli ya da gömülü video
 * eklenirse bu metin ve çerez bölümü güncellenmeli.
 */

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Bu sitenin hangi verileri topladığı, neden topladığı ve ne kadar sakladığı.",
};

export default function PrivacyPage() {
  return (
    <LegalPage locale="tr" eyebrow="Yasal" title="Gizlilik Politikası">
      <LegalSection title="Kısaca">
        <p>
          Bu site sizi takip etmiyor. Reklam ağı, sosyal medya pikseli ve
          profilleme yok. Hesap açmıyorsunuz; site önceden üretilmiş
          sayfalardan ibaret. Bize ulaşan tek bilgi, iletişim formuyla ya da
          e-postayla kendi isteğinizle gönderdiğiniz mesajdır.
        </p>
      </LegalSection>

      <LegalSection title="Çerezler">
        <p>
          Bu site tarayıcınıza çerez yazmaz. Oturum, tercih ya da reklam
          çerezi kullanılmadığından bir çerez onay penceresi de bulunmaz.
        </p>
      </LegalSection>

      <LegalSection title="Dışarıdan yüklenen kaynaklar">
        <p>
          Yazı tipleri sitenin kendi sunucusundan servis edilir; sayfa
          açıldığında Google Fonts&apos;a bir istek gitmez. Görseller ve
          logolar da aynı alan adından gelir. İletişim formu yalnızca siz
          &quot;Gönder&quot;e bastığınızda dışarıya, Web3Forms&apos;a bir
          istek gönderir; sayfa açıldığında dışarıya istek gitmez.
        </p>
      </LegalSection>

      <LegalSection title="İletişim formu">
        <p>
          İletişim formunu gönderdiğinizde adınız, e-posta adresiniz ve
          mesajınız, formu e-postaya çeviren Web3Forms hizmetine iletilir;
          Web3Forms bunları bizim e-posta adresimize gönderir. Bu hizmeti,
          statik bir sitede mesajın bize ulaşabilmesi için kullanıyoruz.
          Web3Forms gönderilen verileri kendi gizlilik politikasına göre
          işler. Mesaj bize ulaştıktan sonra aşağıda e-posta için anlatılanla
          aynı şekilde ele alınır.
        </p>
      </LegalSection>

      <LegalSection title="E-posta yazdığınızda">
        <p>
          Bize{" "}
          <LegalLink href={`mailto:${org.email}`}>
            {org.email}
          </LegalLink>{" "}
          adresinden yazdığınızda, mesajınız ve içindeki bilgiler e-posta
          sağlayıcımızın sunucularında saklanır. Bu verileri yalnızca size
          dönüş yapmak için kullanırız; bülten listesine eklemeyiz ve üçüncü
          kişilerle paylaşmayız.
        </p>
      </LegalSection>

      <LegalSection title="Sunucu kayıtları">
        <p>
          Barındırma sağlayıcısı, güvenlik ve hata takibi için standart erişim
          kayıtları tutabilir: IP adresi, tarayıcı bilgisi, istenen sayfa ve
          zaman damgası. Bu kayıtlara reklam ya da analiz amacıyla bakılmaz.
        </p>
      </LegalSection>

      <LegalSection title="Değişiklikler">
        <p>
          Bu metin değiştiğinde sayfanın üstündeki tarih güncellenir. Önemli
          bir değişiklik olursa ana sayfada duyurulur.
        </p>
      </LegalSection>

      <LegalSection title="İlgili metin">
        <p>
          Kişisel verilerinize ilişkin haklarınız ve veri sorumlusu künyesi
          için{" "}
          <LegalLink href="/kvkk">
            KVKK Aydınlatma Metni
          </LegalLink>{" "}
          sayfasına bakabilirsiniz.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
