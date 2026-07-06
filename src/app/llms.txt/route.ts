import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-static";

/**
 * llms.txt — a structured summary of this site for AI / answer engines (GEO).
 * Spec: https://llmstxt.org
 */
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} is a buyer-first real estate advisory based in Canggu, Bali, Indonesia.
Philosophy: "${site.tagline}" Brand signature: ${site.signature}.
We curate freehold and leasehold villas, land, and investment properties, verify titles and
zoning before listing, and provide honest yield modelling for every property.

Contact: ${site.email} · WhatsApp ${site.phone} · ${site.address}

## Properties

- [All properties](${site.url}/properties): The full curated collection with filters for area, type, price, bedrooms, and land size.
- [Freehold properties](${site.url}/properties/freehold): Perpetual-title villas, estates, and land.
- [Leasehold properties](${site.url}/properties/leasehold): Long-term registered leases (25–35 years) curated for lease length and rental performance.

Current listings:
${properties.map((p) => `- [${p.name}](${site.url}/properties/${p.slug}): ${p.tenure}${p.leaseholdYears ? ` (${p.leaseholdYears} yrs)` : ""} ${p.type} in ${p.areaName} — ${formatPrice(p.price)}. ${p.excerpt}`).join("\n")}

## Bali Area Guides

${areas.map((a) => `- [${a.name}](${site.url}/areas/${a.slug}): ${a.tagline}`).join("\n")}

## Knowledge Base (guides)

${articles.map((a) => `- [${a.title}](${site.url}/knowledge-base/${a.slug}): ${a.excerpt}`).join("\n")}

## Tools & Services

- [ROI Calculator](${site.url}/roi-calculator): Model rental yield, net income, payback period, and total returns for Bali property (freehold appreciation or leasehold amortisation).
- [Sell With Us](${site.url}/sell-with-us): Seller representation — professional marketing, qualified international buyers, transparent process.
- [About](${site.url}/about): Who we are and how buyer-first advisory works.
- [Contact](${site.url}/contact): WhatsApp, email, and enquiry form.

## Legal

- [Privacy Policy](${site.url}/privacy-policy)
- [Terms of Use](${site.url}/terms-of-use)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
