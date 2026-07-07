import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

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
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-ink md:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: 1 July 2026</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="prose-editorial mt-12">
            <p>
              Welcome to {site.url}, operated by {site.legalName} (&ldquo;Bhagawan
              Property&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this website you
              agree to these terms. If you do not agree, please do not use the site.
            </p>

            <h2>1. What this website is</h2>
            <p>
              This website presents property listings, area guides, educational articles, and
              tools (such as our ROI calculator) relating to real estate in Bali, Indonesia. It
              exists to inform and to start conversations — not to complete transactions online.
            </p>

            <h2>2. No offer, no advice</h2>
            <ul>
              <li>
                Listings are invitations to enquire, not offers capable of acceptance. Prices,
                availability, lease terms, and specifications may change or contain errors and are
                only confirmed in a signed agreement.
              </li>
              <li>
                Articles, guides, and calculators are general information, not legal, tax,
                financial, or investment advice. Bali property transactions require independent
                professional advice specific to your situation — we will happily help you engage
                it.
              </li>
              <li>
                The ROI calculator produces illustrative projections from assumptions you control.
                Actual returns will differ. Past or projected performance is no guarantee of
                future results.
              </li>
            </ul>

            <h2>3. Accuracy of information</h2>
            <p>
              We curate carefully and verify what we publish, but we cannot warrant that every
              detail is complete, current, or error-free. Property details are supplied in part by
              sellers and third parties. Always verify independently — we insist on this even for
              our own clients.
            </p>

            <h2>4. Intellectual property</h2>
            <p>
              The website&apos;s content — text, design, branding, and imagery — belongs to
              Bhagawan Property or its licensors. You may view and share it for personal,
              non-commercial purposes with attribution; any other reproduction requires our
              written permission.
            </p>

            <h2>5. Acceptable use</h2>
            <ul>
              <li>Do not misuse the site: no scraping at scale, no attempts to breach security, no unlawful use.</li>
              <li>Do not submit false, defamatory, or infringing content through our forms.</li>
            </ul>

            <h2>6. Third-party links and services</h2>
            <p>
              The site links to third-party services (for example WhatsApp, email clients, and
              embedded maps). Those services operate under their own terms and privacy policies,
              which we do not control.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Bhagawan Property is not liable for losses
              arising from reliance on website content or from inability to use the site. Nothing
              in these terms limits liability that cannot lawfully be limited.
            </p>

            <h2>8. Governing law</h2>
            <p>
              These terms are governed by the laws of the Republic of Indonesia. Disputes will be
              resolved in the courts of Denpasar, Bali, unless mandatory law provides otherwise.
            </p>

            <h2>9. Changes</h2>
            <p>
              We may revise these terms from time to time. Continued use of the site after changes
              take effect constitutes acceptance of the revised terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
