import { LegalEntityTable, LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";
import { href, privacyHref, ui, type Locale } from "@/lib/i18n";
import { externalPolicies, policies } from "@/lib/privacy";
import type { PolicyDoc, PolicyRecipient, PolicyRow, ProductPolicy } from "@/lib/privacy/types";

const COPY = {
  tr: {
    title: "Gizlilik Politikası ve Aydınlatma Metni",
    short: "Kısaca",
    controller: "Veri sorumlusu",
    controllerLead: (name: string) =>
      `${name}, Neuvikon markasıyla yayımlanır. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu aşağıda künyesi verilen taraftır.`,
    contact: "Gizlilikle ilgili iletişim:",
    scope: "Bu metin neyi kapsar",
    data: "Hangi verileri, neden işliyoruz",
    noData: "Bu ürün kişisel veri toplamaz ve size ait bir veriyi bize göndermez.",
    columns: { data: "Veri", purpose: "Amaç", legalBasis: "Hukuki sebep", retention: "Saklama süresi" },
    collection: "Veriler nasıl toplanır",
    required: "Vermek zorunda mısınız",
    notCollected: "Neleri toplamıyoruz",
    recipients: "Veriler kimlere aktarılır",
    noRecipients: "Veriler üçüncü kişilere aktarılmaz.",
    recipientColumns: { name: "Taraf", role: "Rolü", location: "Konum" },
    recipientNote:
      "Bu tarafları yalnızca yukarıdaki amaçlar için kullanırız ve verileri bu metindekiyle aynı ya da eşdeğer düzeyde korumalarını bekleriz. Verilerinizi satmayız. Yetkili kurumların hukuka uygun talepleri hâlinde gerekli bilgiyi paylaşabiliriz.",
    transfer: "Yurt dışına aktarım",
    security: "Güvenlik",
    deletion: "Verileri silmek",
    children: "Çocuklar",
    rights: "Haklarınız",
    rightsBody:
      "KVKK m.11 kapsamındaki haklarınızı kullanabilirsiniz: verinizin işlenip işlenmediğini ve nasıl işlendiğini öğrenebilir, düzeltilmesini ya da silinmesini isteyebilir, işlemeye itiraz edebilirsiniz. Hakların tam listesi",
    rightsLink: "KVKK Aydınlatma Metni",
    rightsPage: "sayfasındadır.",
    apply:
      "Başvurunuzu Türkçe olarak, adınız, soyadınız ve talebinizle birlikte yukarıdaki adrese yazılı olarak iletebilirsiniz. Başvurular ücretsizdir ve en geç otuz gün içinde sonuçlandırılır. Açık rızaya dayanan işlemelerde rızanızı dilediğiniz an geri alabilirsiniz; bu, önceki işlemeleri etkilemez.",
    complaint: "Şikâyet",
    complaintBody:
      "Başvurunuz reddedilir, cevabı yetersiz bulunur ya da süresinde cevaplanmazsa Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz. AB ve Birleşik Krallık'ta yaşıyorsanız önce bize, ardından bulunduğunuz ülkenin veri koruma otoritesine başvurabilirsiniz.",
    changes: "Değişiklikler",
    changesBody:
      "Metin değiştiğinde sayfanın başındaki tarih güncellenir. Önemli değişiklikler ayrıca ürünün içinde ya da sürüm notlarında duyurulur.",
  },
  en: {
    title: "Privacy Policy",
    short: "In short",
    controller: "Who is responsible",
    controllerLead: (name: string) =>
      `${name} is published under the Neuvikon brand. The data controller, under the GDPR and Turkey's Law No. 6698 (KVKK), is the party named below.`,
    contact: "Privacy contact:",
    scope: "What this covers",
    data: "What we process and why",
    noData: "This product does not collect personal data and sends nothing about you to us.",
    columns: { data: "Data", purpose: "Purpose", legalBasis: "Legal basis", retention: "Kept for" },
    collection: "How data is collected",
    required: "Do you have to provide it",
    notCollected: "What we do not collect",
    recipients: "Who receives data",
    noRecipients: "No data is shared with third parties.",
    recipientColumns: { name: "Party", role: "Role", location: "Location" },
    recipientNote:
      "We use these parties only for the purposes above and expect them to protect the data to the same or an equivalent standard as this policy. We do not sell your data. We may disclose information where a lawful request from an authority requires it.",
    transfer: "International transfers",
    security: "Security",
    deletion: "Deleting your data",
    children: "Children",
    rights: "Your rights",
    rightsBody:
      "You may ask for access to your data, correction, erasure, restriction and portability, and you may object to processing based on legitimate interests. Where processing rests on consent, you may withdraw it at any time, without affecting earlier processing. Turkish users have the rights in KVKK Art. 11, listed on our",
    rightsLink: "data protection notice",
    rightsPage: "page.",
    apply:
      "Write to the address above with your name and request. It is free, and we answer within one month at the latest (30 days under KVKK). KVKK applications are made in Turkish.",
    complaint: "Complaints",
    complaintBody:
      "You can complain to us first. You may also complain to your local data protection authority (in the UK, the ICO) or, in Turkey, to the Personal Data Protection Board (KVKK).",
    changes: "Changes",
    changesBody:
      "When this text changes, the date at the top changes too. Significant changes are also announced in the product or its release notes. We do not respond to browser Do Not Track signals.",
  },
} as const;

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="border-t border-rule py-3 pr-4 align-top">{children}</td>;
}

function Head({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className="pb-2 pr-4 text-left font-mono text-xs font-normal tracking-widest uppercase">
      {children}
    </th>
  );
}

/** Legal tables stay tables on a phone: the wrapper scrolls, the page does not. */
function DataTable({ locale, rows }: { locale: Locale; rows: PolicyRow[] }) {
  const c = COPY[locale].columns;
  return (
    <div className="overflow-x-auto" tabIndex={0}>
      <table className="w-full min-w-xl border-collapse text-sm">
        <thead>
          <tr>
            <Head>{c.data}</Head>
            <Head>{c.purpose}</Head>
            <Head>{c.legalBasis}</Head>
            <Head>{c.retention}</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.data}-${row.purpose}`}>
              <Cell>{row.data}</Cell>
              <Cell>{row.purpose}</Cell>
              <Cell>{row.legalBasis}</Cell>
              <Cell>{row.retention}</Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecipientTable({ locale, recipients }: { locale: Locale; recipients: PolicyRecipient[] }) {
  const c = COPY[locale].recipientColumns;
  return (
    <div className="overflow-x-auto" tabIndex={0}>
      <table className="w-full min-w-lg border-collapse text-sm">
        <thead>
          <tr>
            <Head>{c.name}</Head>
            <Head>{c.role}</Head>
            <Head>{c.location}</Head>
          </tr>
        </thead>
        <tbody>
          {recipients.map((r) => (
            <tr key={r.name}>
              <Cell>{r.url ? <LegalLink href={r.url}>{r.name}</LegalLink> : r.name}</Cell>
              <Cell>{r.role}</Cell>
              <Cell>{r.location}</Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The list of product notices, on the site's own privacy page. */
export function ProductPolicyList({ locale }: { locale: Locale }) {
  const items = [
    ...policies.map((policy) => ({ name: policy.name, target: privacyHref(locale, policy.slug) })),
    ...externalPolicies.map((policy) => ({ name: policy.name, target: policy.href })),
  ].sort((a, b) => a.name.localeCompare(b.name, locale));

  return (
    <LegalSection title={ui[locale].productPolicies}>
      <p>{ui[locale].productPoliciesLead}</p>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <LegalLink href={item.target}>{item.name}</LegalLink>
          </li>
        ))}
      </ul>
    </LegalSection>
  );
}

export function ProductPolicyPage({ locale, policy }: { locale: Locale; policy: ProductPolicy }) {
  const t = COPY[locale];
  const doc: PolicyDoc = policy[locale];
  const email = policy.contactEmail ?? getContent(locale).org.email;

  return (
    <LegalPage locale={locale} eyebrow={policy.name} title={t.title} updated={policy.updated[locale]}>
      <LegalSection title={t.short}>
        <p>{doc.summary}</p>
      </LegalSection>

      <LegalSection title={t.controller}>
        <p>{t.controllerLead(policy.name)}</p>
        <LegalEntityTable locale={locale} />
        <p>
          {t.contact} <LegalLink href={`mailto:${email}`}>{email}</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title={t.scope}>
        <p>{doc.scope}</p>
      </LegalSection>

      <LegalSection title={t.data}>
        {doc.rows.length ? <DataTable locale={locale} rows={doc.rows} /> : <p>{t.noData}</p>}
      </LegalSection>

      <LegalSection title={t.collection}>
        <p>{doc.collection}</p>
      </LegalSection>

      <LegalSection title={t.required}>
        <p>{doc.required}</p>
      </LegalSection>

      {doc.notCollected?.length ? (
        <LegalSection title={t.notCollected}>
          <ul>
            {doc.notCollected.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>
      ) : null}

      {doc.extra?.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.list?.length ? (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </LegalSection>
      ))}

      <LegalSection title={t.recipients}>
        {doc.recipients.length ? (
          <>
            <RecipientTable locale={locale} recipients={doc.recipients} />
            <p>{doc.recipientNote ?? t.recipientNote}</p>
          </>
        ) : (
          <p>{t.noRecipients}</p>
        )}
      </LegalSection>

      <LegalSection title={t.transfer}>
        <p>{doc.transfer}</p>
      </LegalSection>

      <LegalSection title={t.security}>
        <p>{doc.security}</p>
      </LegalSection>

      <LegalSection title={t.deletion}>
        <p>{doc.deletion}</p>
      </LegalSection>

      <LegalSection title={t.children}>
        <p>{doc.children}</p>
      </LegalSection>

      <LegalSection title={t.rights}>
        <p>
          {t.rightsBody} <LegalLink href={href(locale, "dataProtection")}>{t.rightsLink}</LegalLink> {t.rightsPage}
        </p>
        <p>{t.apply}</p>
      </LegalSection>

      <LegalSection title={t.complaint}>
        <p>{t.complaintBody}</p>
      </LegalSection>

      <LegalSection title={t.changes}>
        <p>{t.changesBody}</p>
      </LegalSection>
    </LegalPage>
  );
}
