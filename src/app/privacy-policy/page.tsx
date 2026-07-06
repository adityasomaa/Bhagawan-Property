import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

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
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="font-display mt-4 text-4xl font-light text-ink md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: 1 July 2026</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="prose-editorial mt-12">
            <p>
              {site.legalName} (&ldquo;Bhagawan Property&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) respects your privacy. This policy explains what personal
              information we collect through {site.url}, how we use it, and the choices you have.
              We keep it in plain language — the same way we give property advice.
            </p>

            <h2>1. Information we collect</h2>
            <p>We collect only what you choose to share and the minimum needed to operate the site:</p>
            <ul>
              <li>
                <strong>Enquiry details</strong> — name, email address, phone number, and the
                content of your message when you use our contact, enquiry, or property-submission
                forms. Our forms open a pre-filled message in WhatsApp or your email client;
                the conversation then continues on that platform under its own privacy terms.
              </li>
              <li>
                <strong>Usage data</strong> — standard technical logs (IP address, browser type,
                pages visited) collected by our hosting provider for security and performance.
              </li>
            </ul>
            <p>
              We do not run advertising trackers, we do not sell data, and we do not build
              marketing profiles.
            </p>

            <h2>2. How we use your information</h2>
            <ul>
              <li>To respond to your enquiries and provide property advisory services.</li>
              <li>To match you with suitable properties or buyers when you ask us to.</li>
              <li>To operate, secure, and improve the website.</li>
              <li>To meet legal obligations that apply to real estate transactions in Indonesia.</li>
            </ul>

            <h2>3. Sharing</h2>
            <p>
              We share personal information only when needed to serve you: with sellers or buyers
              you ask us to introduce, with notaries, lawyers, and other professionals engaged in
              your transaction, and with service providers who host our website. We never sell or
              rent your details to third parties.
            </p>

            <h2>4. Communication platforms</h2>
            <p>
              WhatsApp and email are our primary communication channels. Messages you send there
              are governed by those platforms&apos; own privacy policies in addition to ours.
            </p>

            <h2>5. Retention</h2>
            <p>
              We keep enquiry correspondence for as long as needed to serve you and to meet legal
              record-keeping duties connected to property transactions, then delete it.
            </p>

            <h2>6. Your rights</h2>
            <p>
              You may request a copy of the personal information we hold about you, ask us to
              correct it, or ask us to delete it (subject to legal retention duties). Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within a
              reasonable time.
            </p>

            <h2>7. Cookies</h2>
            <p>
              The site uses only technically necessary storage (for example, remembering that
              you&apos;ve already seen our loading animation this session). No advertising or
              cross-site tracking cookies are set.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update this policy as the website or the law evolves. The &ldquo;last
              updated&rdquo; date above always reflects the current version.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about privacy? Contact us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or {site.address}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
