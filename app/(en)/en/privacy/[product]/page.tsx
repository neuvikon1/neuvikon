import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPolicyPage } from "@/components/privacy-policy";
import { pageAlternates, privacyHref } from "@/lib/i18n";
import { getPolicy, policies } from "@/lib/privacy";

type Params = { product: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return policies.map((policy) => ({ product: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const policy = getPolicy((await params).product);
  return policy
    ? {
        title: `${policy.name} Privacy Policy`,
        description: `What ${policy.name} processes, why, and how to delete it.`,
        alternates: pageAlternates("en", privacyHref("en", policy.slug)),
      }
    : {};
}

export default async function ProductPrivacyPage({ params }: { params: Promise<Params> }) {
  const policy = getPolicy((await params).product);
  if (!policy) notFound();
  return <ProductPolicyPage locale="en" policy={policy} />;
}
