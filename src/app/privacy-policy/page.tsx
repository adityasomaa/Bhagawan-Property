import type { Metadata } from "next";
import PrivacyBody from "@/components/legal/PrivacyBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bhagawan Property collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
      <PrivacyBody />
    </section>
  );
}
