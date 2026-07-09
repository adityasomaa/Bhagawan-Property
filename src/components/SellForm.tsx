"use client";

import { useState } from "react";
import Select from "@/components/Select";
import { useT } from "@/lib/i18n/provider";
import { areas } from "@/data/areas";
import { site, waLink } from "@/lib/site";

export default function SellForm() {
  const t = useT();
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
      <div className="rounded-3xl border border-line bg-cream p-10 text-center">
        <p className="font-display text-2xl text-ink">{t("form.thanks")}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t("form.sellThanksBody")}{" "}
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
          <label htmlFor="sf-name" className="eyebrow">{t("form.name")}</label>
          <input id="sf-name" name="name" required className="field mt-1" placeholder={t("form.namePh")} />
        </div>
        <div>
          <label htmlFor="sf-email" className="eyebrow">{t("form.email")}</label>
          <input id="sf-email" name="email" type="email" required className="field mt-1" placeholder={t("form.emailPh")} />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="sf-phone" className="eyebrow">{t("form.phone")}</label>
          <input id="sf-phone" name="phone" required className="field mt-1" placeholder={t("form.phonePh")} />
        </div>
        <Select
          label={t("form.propertyType")}
          name="type"
          value={propertyType}
          onChange={setPropertyType}
          options={["Villa", "Land", "Townhouse", "Commercial", "Other"].map((v) => ({
            value: v,
            label: t(`val.type.${v.toLowerCase()}`),
          }))}
        />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Select
          label={t("form.areaLabel")}
          name="area"
          value={areaValue}
          onChange={setAreaValue}
          options={[
            ...areas.map((a) => ({ value: a.name, label: a.name })),
            { value: "Other", label: t("form.optionOther") },
          ]}
        />
        <div>
          <label htmlFor="sf-price" className="eyebrow">{t("form.askingPrice")}</label>
          <input id="sf-price" name="price" required className="field mt-1" placeholder={t("form.askingPricePh")} />
        </div>
      </div>
      <div>
        <label htmlFor="sf-message" className="eyebrow">{t("form.tellUs")}</label>
        <textarea
          id="sf-message"
          name="message"
          required
          rows={5}
          className="field mt-1 resize-none"
          placeholder={t("form.tellUsPh")}
        />
      </div>
      <div className="rounded-2xl border border-dashed border-line bg-cream/60 p-5 text-sm leading-relaxed text-muted">
        <strong className="text-ink">{t("form.photosStrong")}</strong>{t("form.photosNote")}
      </div>
      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        {t("form.listProperty")}
      </button>
      <p className="text-xs leading-relaxed text-muted">
        {t("form.agreePre")}
        <a href="/privacy-policy" className="underline">{t("form.agreePrivacy")}</a>
        {t("form.agreePost")}
      </p>
    </form>
  );
}
