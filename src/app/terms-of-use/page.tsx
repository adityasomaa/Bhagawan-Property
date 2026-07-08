import type { Metadata } from "next";
import TermsBody from "@/components/legal/TermsBody";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the Bhagawan Property website and the information published on it.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <section className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
      <TermsBody />
    </section>
  );
}
