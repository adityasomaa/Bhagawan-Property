import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Bhagawan Property Bali",
  description:
    "Talk to Bali's buyer-first property advisory. WhatsApp, email, or the contact form — we reply personally within one working day. #Here4U",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's find your right one"
            description="Whether you're six months from buying or just curious what your budget means in Bali — the conversation is free and the advice is honest."
          />
          <Reveal delay={0.1}>
            <dl className="mt-12 space-y-8">
              <div className="border-t border-line pt-6">
                <dt className="text-[10px] tracking-[0.3em] uppercase text-muted">WhatsApp</dt>
                <dd className="mt-2">
                  <a
                    href={waLink("Hi Bhagawan Property, I'd like to enquire about property in Bali.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line font-display text-2xl text-ink"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-1 text-sm text-muted">Fastest — usually within business hours, Bali time (GMT+8).</p>
                </dd>
              </div>
              <div className="border-t border-line pt-6">
                <dt className="text-[10px] tracking-[0.3em] uppercase text-muted">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="link-line font-display text-2xl text-ink">
                    {site.email}
                  </a>
                  <p className="mt-1 text-sm text-muted">For detailed briefs and documents.</p>
                </dd>
              </div>
              <div className="border-t border-line pt-6">
                <dt className="text-[10px] tracking-[0.3em] uppercase text-muted">Office</dt>
                <dd className="mt-2 text-base leading-relaxed text-ink-soft">{site.address}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="border border-line bg-paper p-8 md:p-12">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
