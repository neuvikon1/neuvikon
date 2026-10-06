import type { Metadata } from "next";
import { LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";

const { org } = getContent("en");

/**
 * Gizlilik politikasının İngilizcesi.
 *
 * Türkçe metnin birebir çevirisi değil ama aynı olguları anlatıyor: bu site
 * statik, çerez yazılmıyor, tek veri iletişim formu ve e-posta. İki metin ayrı dosyalarda durduğu için
 * biri değişince diğeri de elden geçirilmeli.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What this site collects, why, and for how long.",
};

export default function PrivacyPage() {
  return (
    <LegalPage locale="en" eyebrow="Legal" title="Privacy Policy">
      <LegalSection title="In short">
        <p>
          This site does not track you. There is no ad network, no social
          media pixel and no profiling. You do not create an account; the site
          is a set of pre-rendered pages. The only thing that reaches us is a
          message you choose to send, through the contact form or by email.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          This site writes no cookies to your browser. Because there are no
          session, preference or advertising cookies, there is no consent
          banner either.
        </p>
      </LegalSection>

      <LegalSection title="Externally loaded resources">
        <p>
          Fonts are served from this site&apos;s own origin; opening a page
          sends no request to Google Fonts. Images and logos come from the same
          domain. The contact form sends a request to Web3Forms only when you
          press &quot;Send&quot;; nothing leaves the page when it opens.
        </p>
      </LegalSection>

      <LegalSection title="The contact form">
        <p>
          When you send the contact form, your name, email address and
          message go to Web3Forms, a service that turns form submissions into
          email, which forwards them to our address. We use it because a
          static site has no server of its own to receive a message. Web3Forms
          handles that data under its own privacy policy. Once the message
          reaches us, it is treated exactly like an email, as described below.
        </p>
      </LegalSection>

      <LegalSection title="When you send an email">
        <p>
          When you write to{" "}
          <LegalLink href={`mailto:${org.email}`}>
            {org.email}
          </LegalLink>
          , your message and anything in it is stored on our email
          provider&apos;s servers. We use it only to reply to you; we do not add
          you to a mailing list and we do not share it with third parties.
        </p>
      </LegalSection>

      <LegalSection title="Server logs">
        <p>
          Our hosting provider may keep standard access logs for security and
          error tracking: IP address, browser information, the page requested
          and a timestamp. These logs are not read for advertising or analytics.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          When this text changes, the date at the top of the page is updated. A
          significant change is announced on the home page.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          For your rights over your personal data and the data controller
          identity, see the{" "}
          <LegalLink href="/en/data-protection">
            Data Protection Notice
          </LegalLink>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
