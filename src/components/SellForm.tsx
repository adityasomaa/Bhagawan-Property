"use client";

import { useState } from "react";
import Select from "@/components/Select";
import { areas } from "@/data/areas";
import { site, waLink } from "@/lib/site";

export default function SellForm() {
  const [sent, setSent] = useState(false);
  const [propertyType, setPropertyType] = useState("Villa");
  const [areaValue, setAreaValue] = useState("Canggu");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = [
      `Hi Bhagawan Property, I'd like to list my property with you.`,
      ``,
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Property type: ${data.get("type")}`,
      `Area: ${data.get("area")}`,
      `Asking price: ${data.get("price")}`,
      ``,
      `${data.get("message")}`,
      ``,
      `(I can share photos here on WhatsApp.)`,
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-cream p-10 text-center">
        <p className="font-display text-2xl text-ink">Thank you — we&apos;re on it.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your listing details are ready in WhatsApp — press send (and attach photos there if you
          like). We&apos;ll review and come back within one working day. Prefer email? Reach us at{" "}
          <a href={`mailto:${site.email}`} className="text-bronze-deep underline">
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-bronze">#Here4U</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="sf-name" className="eyebrow">Name</label>
          <input id="sf-name" name="name" required className="field mt-1" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="sf-email" className="eyebrow">Email</label>
          <input id="sf-email" name="email" type="email" required className="field mt-1" placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="sf-phone" className="eyebrow">Phone / WhatsApp</label>
          <input id="sf-phone" name="phone" required className="field mt-1" placeholder="+62 ..." />
        </div>
        <Select
          label="Property type"
          name="type"
          value={propertyType}
          onChange={setPropertyType}
          options={["Villa", "Land", "Townhouse", "Commercial", "Other"].map((v) => ({
            value: v,
            label: v,
          }))}
        />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Select
          label="Area"
          name="area"
          value={areaValue}
          onChange={setAreaValue}
          options={[
            ...areas.map((a) => ({ value: a.name, label: a.name })),
            { value: "Other", label: "Other" },
          ]}
        />
        <div>
          <label htmlFor="sf-price" className="eyebrow">Asking price (USD or IDR)</label>
          <input id="sf-price" name="price" required className="field mt-1" placeholder="e.g. $650,000" />
        </div>
      </div>
      <div>
        <label htmlFor="sf-message" className="eyebrow">Tell us about the property</label>
        <textarea
          id="sf-message"
          name="message"
          required
          rows={5}
          className="field mt-1 resize-none"
          placeholder="Bedrooms, land size, tenure (freehold / leasehold + years), current rental income, anything special..."
        />
      </div>
      <div className="border border-dashed border-line bg-cream/60 p-5 text-sm leading-relaxed text-muted">
        <strong className="text-ink">Photos (optional):</strong> after submitting, you can attach
        photos directly in the WhatsApp conversation this form opens.
      </div>
      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        List My Property
      </button>
      <p className="text-xs leading-relaxed text-muted">
        By submitting you agree to our{" "}
        <a href="/privacy-policy" className="underline">privacy policy</a>. We never publish your
        property without a signed agreement.
      </p>
    </form>
  );
}
