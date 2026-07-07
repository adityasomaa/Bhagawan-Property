"use client";

import { useState } from "react";
import { site, waLink } from "@/lib/site";

export default function ContactForm({ subject }: { subject?: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = [
      `Hi Bhagawan Property,`,
      ``,
      subject ? `Regarding: ${subject}` : `New enquiry from the website`,
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      data.get("phone") ? `Phone: ${data.get("phone")}` : "",
      ``,
      `${data.get("message")}`,
    ]
      .filter((l) => l !== "")
      .join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-line bg-paper p-10 text-center">
        <p className="font-display text-2xl text-ink">Thank you.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your message has been prepared in WhatsApp — press send and we&apos;ll come back to you
          within one working day. Prefer email? Write to{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline">
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-muted">#Here4U</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow">
            Name
          </label>
          <input id="cf-name" name="name" required className="field mt-1" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className="field mt-1"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className="eyebrow">
          Phone / WhatsApp <span className="normal-case text-muted">(optional)</span>
        </label>
        <input id="cf-phone" name="phone" className="field mt-1" placeholder="+62 ..." />
      </div>
      <div>
        <label htmlFor="cf-message" className="eyebrow">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className="field mt-1 resize-none"
          placeholder="Tell us what you're looking for — area, budget, freehold or leasehold..."
        />
      </div>
      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        Send Enquiry
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Sends via WhatsApp — no account details stored. By submitting you agree to our{" "}
        <a href="/privacy-policy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
