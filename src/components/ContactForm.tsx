"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/provider";
import { site, waLink } from "@/lib/site";

export default function ContactForm({ subject }: { subject?: string }) {
  const t = useT();
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
        <p className="font-display text-2xl text-ink">{t("form.thanks")}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t("form.thanksBody")}{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline">
            {site.email}
          </a>
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
            {t("form.name")}
          </label>
          <input id="cf-name" name="name" required className="field mt-1" placeholder={t("form.namePh")} />
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow">
            {t("form.email")}
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
          {t("form.phone")} <span className="normal-case text-muted">{t("form.optional")}</span>
        </label>
        <input id="cf-phone" name="phone" className="field mt-1" placeholder="+62 ..." />
      </div>
      <div>
        <label htmlFor="cf-message" className="eyebrow">
          {t("form.message")}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className="field mt-1 resize-none"
          placeholder={t("form.msgPh")}
        />
      </div>
      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        {t("form.send")}
      </button>
    </form>
  );
}
