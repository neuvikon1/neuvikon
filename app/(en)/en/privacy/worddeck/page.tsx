import type { Metadata } from "next";
import { LegalLink, LegalPage, LegalSection } from "@/components/legal";
import { getContent } from "@/lib/content";

const { org } = getContent("en");

const UPDATED = "6 October 2026";

/** İngilizcesi; gerekçe Türkçe sayfanın başında (`/gizlilik/worddeck`). */

const CONTACT = org.email;

export const metadata: Metadata = {
  title: "WordDeck Privacy Policy",
  description: "What WordDeck stores, why it stores it and how to delete it.",
};

export default function WordDeckPrivacyPage() {
  return (
    <LegalPage locale="en" eyebrow="WordDeck" title="Privacy Policy" updated={UPDATED}>
      <LegalSection title="In short">
        <p><strong>WordDeck has no accounts.</strong> You never give
          us a name, an email address or a password, and we have no way to work out who
          you are. The app stores your settings and your study progress against a random
          identifier your device makes on first launch — nothing else.</p>
      </LegalSection>

      <LegalSection title="Who this is about">
        <p>WordDeck is a vocabulary flashcard app for iOS and Android, published by
          Neuvikon. This policy covers the app and the backend that serves it. Contact:
          {" "}
          <LegalLink href={`mailto:${CONTACT}`}>{CONTACT}</LegalLink>.</p>
      </LegalSection>

      <LegalSection title="The device identifier">
        <p>The first time you open the app it generates a random 256-bit value on your
          device and keeps it in the platform keychain or keystore. That value is the only
          thing identifying your progress to us. It is not derived from your hardware,
          your Apple or Google account, your phone number or anything else about you, it
          is not an advertising identifier, and it is not shared with anyone. Reinstall
          the app and a fresh one is made; the old progress becomes unreachable, unless
          you first moved it with a transfer code (see below).</p>
      </LegalSection>

      <LegalSection title="What we store">
        <p>Against that identifier, and only that identifier:</p>
        <ul>
          <li>The interface language you picked.</li>
          <li>The English level (A1–C2) you picked, which decides the words you are given.</li>
          <li>The exams you are studying for, how many new cards you want a day and your daily review limit.</li>
          <li>Whether cards show the English word or the Turkish meaning first, and
            whether you type your answers. What you type is checked on your device and
            never sent to us.</li>
          <li>The hour and minute you chose for your daily reminder.</li>
          <li>The date you started.</li>
          <li>When you ask to move to a new phone: a one-time transfer code, deleted
            once it is used or after fifteen minutes.</li>
          <li>For each answer, a random id, kept for about two days so an answer sent
            twice (for example after studying offline) is counted once. Until an answer
            reaches us, it is also kept on your phone, without your device key.</li>
          <li>For each card you have studied: its place in your review schedule — when
            it is next due, its current interval, how many times you have answered
            and forgotten it, and whether you marked it as already known. This is what lets the app bring each word back just before
            you would forget it.</li>
          <li>For each day you studied: how many cards you answered, how many were new,
            and how many you got right. This is what draws your activity grid and streak.</li>
        </ul>
        <p>That is the complete list. Practice quizzes are built from the list above
          and your answers to them are never sent to us. Your theme and background
          choices stay on your device.</p>
      </LegalSection>

      <LegalSection title="What we do not collect">
        <ul>
          <li>No name, email address, phone number or password.</li>
          <li>No contacts, photos, calendar, microphone, camera or location data.</li>
          <li>No analytics or attribution SDKs.</li>
          <li>Nothing from the adverts reaches us: they are served by Google directly to
            your device, and we never see who you are or what you were shown.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Advertising">
        <p>The app shows adverts from Google AdMob: a banner at the bottom of the main
          screens, and occasionally a full-screen advert when you finish a study session.
          Google receives what it needs to serve them — your device&apos;s advertising
          identifier, its type, and a coarse location derived from the IP address — and
          its use of that data is governed by Google&apos;s own privacy policy, not by ours. We
          ask only for non-personalised ads, so they are chosen from context rather than
          from a profile built about you. Nothing about the adverts is sent back to us or
          joined to your progress.</p>
      </LegalSection>

      <LegalSection title="Pronunciation">
        <p>When you tap the speaker on a card, the word is spoken by your device&apos;s own
          text-to-speech engine. The word is not sent to us.</p>
      </LegalSection>

      <LegalSection title="Notifications">
        <p>Your daily reminder is scheduled by the operating system on your own device
          at the time you picked. No push token is created and nothing is sent from our
          servers, so we cannot tell whether a reminder fired or whether you opened it.
          Notification permission is optional and the app works fully without it.</p>
      </LegalSection>

      <LegalSection title="Where the data lives">
        <p>The backend runs on Convex (Convex, Inc.) in an EU region. As with any
          internet service, the hosting infrastructure records ordinary request logs,
          which include IP addresses, for a short period to keep the service running and
          secure; we do not use those logs to build a profile of you and we do not join
          them to your progress.</p>
      </LegalSection>

      <LegalSection title="Who else sees it">
        <p>We do not sell your data and we do not share your progress with anyone. The
          processors involved are the hosting provider named above and Google, which
          serves the adverts and receives only what the request for one carries — never
          anything you have stored with us. We would disclose
          data if a valid legal order required it — though there is little to disclose,
          and nothing that identifies a person.</p>
      </LegalSection>

      <LegalSection title="Deleting everything">
        <p>Settings → <em>Clear progress</em> deletes your stored progress from our
          database and removes the identifier and preferences from your device, leaving
          the app exactly as a fresh download. It happens immediately and cannot be
          undone. Deleting the app without using that button leaves the records on the
          server, where they can no longer be reached by anyone, including us; write to
          us if you would like them removed anyway. Otherwise, data is kept for as long
          as the install exists.</p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Depending on where you live you may have the right to access, correct,
          export or delete personal data held about you, and to object to its processing.
          Because we hold nothing that identifies you, we usually cannot connect a
          request by email to a particular record — the button in Settings is the
          reliable way to exercise deletion, and it works without asking us for anything.
          For anything else, write to <LegalLink href={`mailto:${CONTACT}`}>{CONTACT}</LegalLink>. If you
          are in the EU, UK or Türkiye, the legal basis for the small amount of processing
          we do is our legitimate interest in making the app work as you asked it to.</p>
      </LegalSection>

      <LegalSection title="Children">
        <p>The app is not directed at children under 13 and collects no personal
          information from anyone, including children.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>If this policy changes, the date at the top of this page changes with it.
          Material changes will also be noted in the app&apos;s release notes.</p>
      </LegalSection>
    </LegalPage>
  );
}
