import type { Metadata } from "next";
import { LegalEntityTable, LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";

const { org } = getContent("en");

/**
 * KVKK aydınlatma metninin İngilizcesi.
 *
 * Yürürlükteki kanun Türk hukuku (6698 sayılı KVKK); bu metin onun İngilizce
 * anlatımı, ayrı bir GDPR bildirimi değil. Avrupa'dan gelen ziyaretçiler için
 * ayrı bir GDPR metni gerekirse bu sayfa çoğaltılmamalı, kapsam genişletilmeli.
 *
 * ⚠️ Bu metin bir avukat tarafından yazılmadı.
 */

export const metadata: Metadata = {
  title: "Data Protection Notice",
  description:
    "Information notice under Turkish Personal Data Protection Law no. 6698 (KVKK).",
};

export default function DataProtectionPage() {
  return (
    <LegalPage locale="en" eyebrow="Legal" title="Data Protection Notice">
      <LegalSection title="Data controller">
        <p>
          Under Turkish Personal Data Protection Law no. 6698
          (&quot;KVKK&quot;), your personal data is processed by the party
          identified below, acting as data controller.
        </p>
        <LegalEntityTable locale="en" />
      </LegalSection>

      <LegalSection title="What we process">
        <p>
          This site is statically generated. There is no account, payment or
          session, so simply browsing it sends us no personal data.
        </p>
        <p>Personal data is processed in one case only:</p>
        <ul>
          <li>
            <strong>When you send the contact form or an email:</strong> your
            name, your email address and whatever you include in the message.
          </li>
        </ul>
        <p>
          In addition, our hosting provider may briefly retain technical records
          on the server side (IP address, browser information, request time) for
          security and error tracking.
        </p>
      </LegalSection>

      <LegalSection title="Purpose and legal basis">
        <p>
          Data you send by email is processed only to answer your request and,
          where applicable, to establish a working relationship. The legal basis
          is KVKK art. 5/2-(c) — directly related to the conclusion or
          performance of a contract — and art. 5/2-(f) — legitimate interest.
        </p>
        <p>
          Server logs are processed under art. 5/2-(ç), legal obligation, and
          art. 5/2-(f), legitimate interest in system security.
        </p>
      </LegalSection>

      <LegalSection title="Transfers">
        <p>
          Your personal data is never sold or transferred to third parties for
          marketing. It resides only in the infrastructure of our email and
          hosting providers and of Web3Forms, which turns the contact form into
          email, as needed to run the service. Because those
          providers&apos; servers may be outside Türkiye, such transfers take
          place under KVKK art. 9.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Email correspondence is kept for a reasonable period after the matter
          concludes and is deleted once the purpose no longer applies. Server
          logs are kept for the period set by the provider.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under KVKK art. 11 you have the right to:</p>
        <ul>
          <li>Learn whether your personal data is processed</li>
          <li>Request information if it has been processed</li>
          <li>Learn the purpose and whether it is used accordingly</li>
          <li>Know the third parties it is transferred to, at home or abroad</li>
          <li>Request correction if it is incomplete or inaccurate</li>
          <li>Request erasure or destruction within the conditions of the law</li>
          <li>
            Request that correction, erasure and destruction be notified to the
            third parties it was transferred to
          </li>
          <li>
            Object to a result against you produced solely by automated analysis
          </li>
          <li>
            Claim compensation if you suffer damage from unlawful processing
          </li>
        </ul>
        <p>
          Send your requests to{" "}
          <LegalLink href={`mailto:${org.email}`}>
            {org.email}
          </LegalLink>
          . Applications are answered within thirty days at the latest.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          For the full picture of this site&apos;s data and cookie behaviour,
          see the{" "}
          <LegalLink href="/en/privacy">
            Privacy Policy
          </LegalLink>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
