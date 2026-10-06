"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { href, ui, type Locale } from "@/lib/i18n";

/**
 * GitHub Pages serves files and nothing else, so the form posts to Web3Forms,
 * which emails the message to the address the access key was issued for.
 * The key is public by design - it can only send to that one inbox - and it
 * arrives at build time from the repository variable `WEB3FORMS_KEY`.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Write and send without leaving the page. Without a key the form is not
 * drawn at all: a form that cannot send is worse than the email address the
 * section already shows.
 */
export function ContactForm({ locale, email }: { locale: Locale; email: string }) {
  const t = ui[locale];
  const [status, setStatus] = useState<Status>("idle");

  if (!ACCESS_KEY) return null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Neuvikon — ${data.get("name")}`,
          from_name: "neuvikon site",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || !result.success) throw new Error("Web3Forms refused the message");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex w-full max-w-xl flex-col items-start gap-4">
        <p className="text-base">{t.formSent}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {t.formSendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-name">{t.formName}</FieldLabel>
            <Input id="contact-name" name="name" autoComplete="name" required maxLength={120} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-email">{t.formEmail}</FieldLabel>
            <Input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="contact-message">{t.formMessage}</FieldLabel>
          <Textarea id="contact-message" name="message" required rows={6} maxLength={5000} />
        </Field>

        {/* A field people never see and bots fill in; Web3Forms drops any
            submission that arrives with it ticked. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Button type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? t.formSending : t.formSend}
          </Button>
          <p className="text-xs text-muted-foreground">
            {t.formNotice}{" "}
            <Link href={href(locale, "privacy")} className="underline underline-offset-4 hover:no-underline">
              {t.formPrivacy}
            </Link>
          </p>
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {t.formError}{" "}
            <a href={`mailto:${email}`} className="underline underline-offset-4">
              {email}
            </a>
          </p>
        )}
      </FieldGroup>
    </form>
  );
}
