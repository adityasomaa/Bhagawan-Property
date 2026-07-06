import { img } from "./areas";

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  image: string;
  sections: ArticleSection[];
  faq?: { q: string; a: string }[];
}

export const categories = [
  "Buying Guides",
  "Investment",
  "Legal",
  "Taxes",
  "Visa Information",
  "Area Guides",
  "Market Updates",
] as const;

export const articles: Article[] = [
  {
    slug: "freehold-vs-leasehold-bali",
    title: "Freehold vs Leasehold in Bali: Which Is Right for You?",
    category: "Buying Guides",
    excerpt:
      "The single most important decision in any Bali purchase. We break down both structures honestly — costs, risks, and who each one truly suits.",
    date: "2026-06-12",
    readTime: "8 min read",
    image: img("1600596542815-ffad4c1539a9", 1400),
    sections: [
      {
        paragraphs: [
          "Every conversation about buying property in Bali eventually arrives at the same fork in the road: freehold or leasehold? It is the decision that shapes your budget, your legal structure, your exit strategy, and your peace of mind — and it is where honest advice matters most.",
          "At Bhagawan Property we don't push clients toward either structure. Both are legitimate, both can be excellent, and both can be wrong for the wrong buyer. Here is how we actually explain it across the table.",
        ],
      },
      {
        heading: "What freehold really means for foreigners",
        paragraphs: [
          "Freehold (Hak Milik) is perpetual ownership of the land itself. Indonesian law reserves Hak Milik for Indonesian citizens — so a foreigner cannot hold a freehold certificate in their own name. Foreign buyers access freehold through a fully compliant PT PMA (foreign-owned company), which can hold land under HGB (Right to Build) title, typically for an initial 30 years, extendable to 80.",
          "The PT PMA route carries setup and annual compliance costs, and it is the right tool for investors operating property as a business: rentals, developments, or portfolios. What it is not: a casual structure for a single holiday home. Anyone who tells you to 'just use a nominee' — an Indonesian citizen holding title on your behalf — is exposing you to a structure that Indonesian courts have repeatedly refused to protect. We will never recommend it.",
        ],
      },
      {
        heading: "What leasehold really means",
        paragraphs: [
          "Leasehold (Hak Sewa) is a long-term lease registered against the land — commonly 25 to 35 years in today's market, often with a contractual option to extend. It is simple, fully legal for foreigners in a personal name, cheaper to transact, and it is how the majority of foreign-owned villas in Bali are actually held.",
          "The trade-offs are real: the asset amortises toward the end of the lease term, extensions must be negotiated (ideally priced and locked in the original contract), and financing options are limited. A well-structured lease with a long remaining term, clear extension mechanics, and a fair per-year price is a genuinely good asset. A short lease bought at a freehold-like price is not.",
        ],
      },
      {
        heading: "How we help clients decide",
        list: [
          "Buying primarily for rental yield over 10–20 years? Leasehold usually wins on cash-on-cash returns.",
          "Building a portfolio, developing, or operating hospitality? Freehold via PT PMA gives control and bankability.",
          "Buying a legacy asset to pass on? Freehold — the perpetual title is the point.",
          "First property in Bali with a moderate budget? A long leasehold in a proven area is the sensible entry.",
        ],
      },
      {
        heading: "The honest bottom line",
        paragraphs: [
          "Price the lease per year, insist on extension terms in writing, verify the certificate matches the land, and structure freehold properly or not at all. If a deal only works with legal shortcuts, it isn't a deal — it's a liability with a pool.",
        ],
      },
    ],
    faq: [
      {
        q: "Can foreigners own freehold property in Bali?",
        a: "Not in a personal name. Foreigners access freehold-equivalent control through a PT PMA company holding HGB title (30 years, extendable to 80), or hold long-term registered leasehold in a personal name.",
      },
      {
        q: "How long are typical leaseholds in Bali?",
        a: "Most villa leaseholds run 25–35 years, often with contractual extension options. Always have the extension price and mechanism written into the original lease.",
      },
      {
        q: "Are nominee structures safe?",
        a: "No. Indonesian courts have consistently declined to protect foreign beneficiaries of nominee arrangements. Bhagawan Property never recommends them.",
      },
    ],
  },
  {
    slug: "can-foreigners-buy-property-in-bali",
    title: "Can Foreigners Buy Property in Bali? The Complete 2026 Answer",
    category: "Legal",
    excerpt:
      "Yes — legally and safely, if you use the right structure. Here is exactly how foreign ownership works in Indonesia, without the myths.",
    date: "2026-05-28",
    readTime: "7 min read",
    image: img("1518548419970-58e3b4079ab2", 1400),
    sections: [
      {
        paragraphs: [
          "It is the first question every international buyer asks, and the internet answers it badly in both directions — either 'foreigners can't own anything' or 'no problem, just sign here.' The truth is precise: foreigners cannot hold Indonesian freehold title personally, but Indonesian law provides several fully legal routes to secure, long-term property rights.",
        ],
      },
      {
        heading: "Route 1: Leasehold in your personal name",
        paragraphs: [
          "The simplest and most common route. A registered long-term lease (Hak Sewa) gives you exclusive rights to the property for the lease term — typically 25–35 years with negotiated extensions. It requires no company, no special visa, and transacts quickly. The critical work is contractual: extension mechanics, inheritance clauses, and exact land-certificate verification.",
        ],
      },
      {
        heading: "Route 2: PT PMA — the foreign-owned company",
        paragraphs: [
          "A PT PMA is an Indonesian limited company that can be 100% foreign-owned. It can hold land under Hak Guna Bangunan (Right to Build) — an initial 30-year title extendable to 80 years — and can legally operate rental income, which personal leaseholds technically require licensing for. This is the professional investor's structure: more cost and compliance, far more control.",
        ],
      },
      {
        heading: "Route 3: Hak Pakai for residence holders",
        paragraphs: [
          "Foreigners holding Indonesian residence permits (KITAS/KITAP) may hold Hak Pakai (Right to Use) title on a dwelling in their own name, subject to minimum property values. It suits genuine residents buying a home to live in.",
        ],
      },
      {
        heading: "What to avoid",
        list: [
          "Nominee arrangements — an Indonesian citizen 'holding' freehold for you. Courts do not protect these.",
          "Unregistered leases or leases signed only with a landowner's relative.",
          "Any deal that discourages independent legal due diligence.",
          "Prices that only make sense with illegal zoning use.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "Every Bhagawan Property transaction runs through independent notaries (PPAT) and legal due diligence: certificate verification, zoning checks, tax status, and structure review. Buying in Bali is safe when the process is respected — and that process is exactly what we manage for you. #Here4U",
        ],
      },
    ],
    faq: [
      {
        q: "Is it legal for foreigners to buy property in Bali?",
        a: "Yes. Foreigners can legally hold long-term registered leasehold personally, HGB title through a PT PMA company, or Hak Pakai title with a residence permit. Only personal freehold (Hak Milik) is restricted to Indonesian citizens.",
      },
      {
        q: "Do I need to live in Indonesia to buy property in Bali?",
        a: "No. Leasehold and PT PMA structures do not require residency. Hak Pakai title requires a KITAS/KITAP residence permit.",
      },
    ],
  },
  {
    slug: "bali-property-investment-guide-2026",
    title: "The Bali Property Investment Guide 2026",
    category: "Investment",
    excerpt:
      "Yields, growth corridors, and the strategies that actually work — a clear-eyed guide to investing in the world's most loved island.",
    date: "2026-06-20",
    readTime: "10 min read",
    image: img("1573790387438-4da905039392", 1400),
    sections: [
      {
        paragraphs: [
          "Bali's investment case rests on a simple imbalance: global demand to stay on this island grows every year, while genuinely well-located land is finite. Tourism arrivals have fully recovered and pushed to new records, the digital-nomad economy has made 'low season' a fading concept, and villa-style accommodation keeps taking share from hotels.",
          "But averages hide everything in Bali. The gap between a well-bought villa and a badly-bought one is the difference between 12% net yields and an illiquid regret. Here is how we think about it.",
        ],
      },
      {
        heading: "The yield engine: short-term rentals",
        paragraphs: [
          "Well-run villas in prime areas typically generate 8–14% gross yields, with the strongest performers combining three ingredients: a proven location (Canggu, Uluwatu, Pererenan, Seminyak), a design that photographs distinctively, and professional management with dynamic pricing.",
          "Net yields land meaningfully lower after management (15–25% of revenue), utilities, maintenance, and taxes — model with honesty, and treat any listing that quotes only gross occupancy-free numbers with suspicion. Our ROI calculator is built to run these numbers conservatively.",
        ],
      },
      {
        heading: "The growth engine: land scarcity",
        paragraphs: [
          "Capital growth in Bali follows infrastructure and lifestyle gravity. The past decade's winners — Canggu, then Pererenan, then the Bukit — all followed the same pattern: surf-and-café culture arrives, land prices double, then double again as hospitality brands validate the area.",
          "The current frontier runs west along the coast (Seseh, Kedungu, Nyanyi) and south across the Bukit's clifftops. Sanur is a special case: a mature area with a genuine new catalyst in the Special Economic Zone and international hospital district.",
        ],
      },
      {
        heading: "Four strategies that work",
        list: [
          "Yield-first: long leasehold villa in a proven rental pocket, professionally managed. Simple, liquid, cash-flowing.",
          "Growth-first: freehold land on a validated frontier corridor, held 5–10 years.",
          "Build-to-rent: leasehold land plus construction — the highest returns and the most work.",
          "Legacy: freehold estate or clifftop asset via PT PMA, held indefinitely.",
        ],
      },
      {
        heading: "The risks nobody puts in brochures",
        paragraphs: [
          "Zoning enforcement is tightening — verify land use before, not after. Oversupply is real in generic mid-market villas; distinctive assets keep outperforming. Lease-end amortisation must be in your model. And currency: income is largely USD-linked while costs run in rupiah, which has historically favoured foreign owners but deserves a line in your spreadsheet.",
          "Our commitment is simple: we would rather lose a sale than place a client into the wrong asset. That is what buyer-first means. #Here4U",
        ],
      },
    ],
    faq: [
      {
        q: "What rental yields are realistic in Bali?",
        a: "Well-located, professionally managed villas typically achieve 8–14% gross yields; conservative net modelling usually lands at 6–10% after management, running costs, and taxes.",
      },
      {
        q: "Which Bali areas have the best investment potential in 2026?",
        a: "Uluwatu and Pererenan lead capital-growth momentum; Canggu and Seminyak offer the deepest, most proven rental markets; Sanur has a unique infrastructure catalyst in its Special Economic Zone; Ubud dominates the fast-growing wellness segment.",
      },
    ],
  },
  {
    slug: "bali-property-taxes-explained",
    title: "Bali Property Taxes Explained: What Buyers, Owners, and Sellers Pay",
    category: "Taxes",
    excerpt:
      "BPHTB, PPh, annual PBB, and rental income tax — the complete map of Indonesian property taxation, in plain language.",
    date: "2026-04-15",
    readTime: "6 min read",
    image: img("1554224155-6726b3ff858f", 1400),
    sections: [
      {
        paragraphs: [
          "Indonesian property taxes are straightforward once mapped clearly — and pricing them into your numbers from day one is basic honesty. Here is the full picture for a typical villa transaction. (Figures are current as of mid-2026; always confirm rates with your notary and tax advisor at transaction time.)",
        ],
      },
      {
        heading: "When you buy",
        list: [
          "BPHTB (buyer's transfer tax): 5% of the taxable transaction value for freehold/HGB transfers.",
          "Notary/PPAT fees: typically around 1% of transaction value.",
          "Legal due diligence: fixed-fee, and worth every rupiah.",
          "Leasehold purchases: no BPHTB — lease tax is borne differently (see selling).",
        ],
      },
      {
        heading: "While you own",
        list: [
          "PBB (annual land & building tax): a modest annual charge, usually a few million rupiah for a villa.",
          "Rental income tax: 10% final withholding on gross rental income for tax residents with an NPWP; 20% for non-residents. PT PMA companies are taxed under corporate rules instead.",
          "If operating short-term rental: local licences (PBG/SLF, tourism registration) and associated small fees.",
        ],
      },
      {
        heading: "When you sell",
        list: [
          "PPh (seller's income tax): 2.5% of the gross transfer value on freehold/HGB sales.",
          "Leasehold assignments: 10% final tax on the lease value applies to the lessor (structure varies — get advice).",
          "Agent commission: customarily paid by the seller.",
        ],
      },
      {
        heading: "The practical takeaway",
        paragraphs: [
          "Budget roughly 6–7% on top of purchase price for a freehold acquisition (tax, notary, legal), and model rental income net of the 10–20% withholding. When a listing's numbers only work pre-tax, they don't work. We provide every client a full transaction-cost schedule before any offer is made.",
        ],
      },
    ],
    faq: [
      {
        q: "How much tax does a buyer pay on Bali property?",
        a: "Freehold/HGB buyers pay 5% BPHTB transfer tax plus roughly 1% notary fees. Leasehold purchases carry no BPHTB, making entry costs lower.",
      },
      {
        q: "How is Bali rental income taxed?",
        a: "Rental income is subject to a final withholding tax — 10% of gross rent for Indonesian tax residents with an NPWP, 20% for non-residents. PT PMA companies are taxed under corporate rules.",
      },
    ],
  },
  {
    slug: "bali-visa-guide-for-property-buyers",
    title: "Visas for Bali Property Buyers: KITAS, Second Home, and Long Stays",
    category: "Visa Information",
    excerpt:
      "You don't need a visa to buy — but the right visa transforms how you can live with what you've bought. The 2026 options, compared.",
    date: "2026-03-22",
    readTime: "7 min read",
    image: img("1512757776214-26d36777b513", 1400),
    sections: [
      {
        paragraphs: [
          "Let's clear the biggest misconception first: you do not need any Indonesian visa to buy property in Bali. Leasehold and PT PMA purchases can be completed entirely with a passport. The visa question is about what comes after — how long, and on what basis, you can actually enjoy the island.",
        ],
      },
      {
        heading: "Visit visas: the starting point",
        paragraphs: [
          "Visa on Arrival (extendable once) covers a 60-day stay, and the multiple-entry D1/D2 visit visas suit buyers making repeated trips during a purchase or build. Fine for transacting; not a way to live here.",
        ],
      },
      {
        heading: "KITAS: the residence workhorse",
        paragraphs: [
          "The KITAS (limited-stay permit) is the standard residence route, and property buyers usually reach it one of three ways: an investor KITAS through their own PT PMA (the natural pairing with company-held property), a retirement KITAS for those 60+, or a remote-worker KITAS for foreign-payroll professionals. A KITAS also unlocks practical life: local banking, an NPWP tax number for the favourable 10% rental tax rate, local driving licence, and — importantly — eligibility for Hak Pakai property title in your own name.",
        ],
      },
      {
        heading: "Second Home visa: designed for property owners",
        paragraphs: [
          "The Second Home visa grants five to ten years of residence for individuals who maintain a qualifying deposit in an Indonesian state bank or hold qualifying Indonesian property. It was built precisely for the international villa-owner demographic — long tenure, no work requirement, family included.",
        ],
      },
      {
        heading: "Matching visa to strategy",
        list: [
          "Pure investor, visiting occasionally: visit visas are enough.",
          "Operating rentals through PT PMA: investor KITAS.",
          "Retiring to your Sanur villa: retirement KITAS or Second Home.",
          "Working remotely from Canggu: remote-worker KITAS.",
          "Buying a substantial home to live in: Second Home visa + Hak Pakai title.",
        ],
      },
      {
        paragraphs: [
          "Immigration rules evolve quickly in Indonesia — we work with licensed visa agents and immigration counsel, and we'll connect you with the right specialist for your situation as part of every purchase. #Here4U",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a visa to buy property in Bali?",
        a: "No. Property purchases can be completed on a passport alone. Visas matter for how long you can stay and for unlocking benefits like resident tax rates and Hak Pakai title.",
      },
    ],
  },
  {
    slug: "area-guide-uluwatu-investment",
    title: "Area Deep-Dive: Why Uluwatu Is Bali's Strongest Growth Story",
    category: "Area Guides",
    excerpt:
      "Clifftop scarcity, infrastructure catch-up, and a luxury market still maturing — the investment anatomy of the Bukit Peninsula.",
    date: "2026-05-05",
    readTime: "6 min read",
    image: img("1539367628448-4bc5c9d171c8", 1400),
    sections: [
      {
        paragraphs: [
          "Every property cycle in Bali has a protagonist. The 2010s belonged to Seminyak, the late 2010s to Canggu. The current cycle belongs to Uluwatu — and unusually, the fundamentals suggest it is still early.",
        ],
      },
      {
        heading: "The scarcity mathematics",
        paragraphs: [
          "The Bukit Peninsula's investable coastline is fixed: a limited run of clifftop between Balangan and Nusa Dua, much of it already secured by resorts and estates. Unlike the rice-field frontier of the southwest coast — which can always convert one more paddy — clifftop supply cannot be manufactured. When demand compounds against fixed supply, the long-term direction is not mysterious.",
        ],
      },
      {
        heading: "The infrastructure catch-up",
        paragraphs: [
          "For years the Bukit's constraint was access and water. Both have improved decisively: widened arterial roads, the new southern link cutting airport transfer times, and utility infrastructure following the hospitality investment. Every improvement re-rates land that was previously discounted for inconvenience.",
        ],
      },
      {
        heading: "The demand mix",
        paragraphs: [
          "Uluwatu's guest economy is unusually diversified: surf tourism (the most loyal repeat segment in travel), the wedding and events market on the clifftops, wellness travellers, and the luxury segment anchored by world-class resorts. Diversified demand means resilient occupancy.",
          "Villa performance data reflects it — ocean-view properties on the Bukit now command some of the island's highest nightly rates while still trading at land prices below Canggu equivalents.",
        ],
      },
      {
        heading: "How to buy it",
        list: [
          "Yield: leasehold ocean-view villas above Bingin, Padang Padang, and Suluban.",
          "Growth: freehold land toward Melasti and Nyang Nyang before the next hospitality wave lands.",
          "Trophy: true clifftop freehold — buy it when it appears, because it rarely does.",
        ],
      },
    ],
  },
  {
    slug: "bali-market-update-mid-2026",
    title: "Bali Market Update: Mid-2026",
    category: "Market Updates",
    excerpt:
      "Record arrivals, a maturing villa market, tightening zoning enforcement, and where pricing actually moved in the first half of 2026.",
    date: "2026-06-30",
    readTime: "5 min read",
    image: img("1592364395653-83e648b20cc2", 1400),
    sections: [
      {
        paragraphs: [
          "Our mid-year read on the market, drawn from transaction activity across our network, published tourism data, and what we see on the ground every week. The short version: demand remains structurally strong, quality is separating from quantity, and regulation is — helpfully — getting more serious.",
        ],
      },
      {
        heading: "Demand: records, again",
        paragraphs: [
          "Foreign arrivals continue to set records, with Australia, India, and Europe all growing and average stay lengths continuing to rise on the back of remote-work travel. Villa-style stays keep gaining share from hotels, particularly in the family and group segments that drive three-plus-bedroom demand.",
        ],
      },
      {
        heading: "Pricing: the corridor story continues",
        paragraphs: [
          "The strongest appreciation over the past twelve months has again been on the growth corridors: the Pererenan–Seseh–Kedungu line and the Bukit's clifftop zones. Core Canggu and Seminyak remain steady rather than spectacular — their story is scarcity and rental depth, not headline growth. Sanur's SEZ narrative is now visibly attracting early positioning.",
        ],
      },
      {
        heading: "Supply and regulation",
        paragraphs: [
          "The generic mid-market villa segment is crowded, and average products in average lanes are working harder for occupancy. Meanwhile zoning and rental-licence enforcement has tightened across Badung — a development we welcome, since it protects compliant owners and punishes exactly the shortcuts we advise clients against.",
        ],
      },
      {
        heading: "Our stance for H2 2026",
        list: [
          "Stay disciplined on lease pricing: value per remaining year, not the headline number.",
          "Favour distinctive design and genuine location over spreadsheet-identical stock.",
          "Freehold corridor land remains the cleanest medium-term growth exposure.",
          "Compliance is now alpha: licensed, certified properties will out-earn and out-sell.",
        ],
      },
    ],
  },
  {
    slug: "due-diligence-checklist-bali",
    title: "The Complete Due Diligence Checklist for Buying in Bali",
    category: "Buying Guides",
    excerpt:
      "The exact checks we run before any client signs anything — certificates, zoning, access, taxes, and the questions most buyers forget.",
    date: "2026-02-18",
    readTime: "9 min read",
    image: img("1600585154340-be6161a56a0c", 1400),
    sections: [
      {
        paragraphs: [
          "Due diligence is where Bali purchases succeed or fail — and it is the part of our work we take most seriously. Below is the actual checklist framework we run with independent legal counsel before any Bhagawan Property client commits to a purchase. Use it even if you never work with us.",
        ],
      },
      {
        heading: "1. The certificate",
        list: [
          "Verify the certificate (SHM/HGB/lease deed) at the National Land Agency (BPN) — not from a photocopy.",
          "Confirm the registered owner is exactly who you're negotiating with.",
          "Check for encumbrances: mortgages, disputes, blocking notes.",
          "Match certificate boundaries against a fresh physical survey.",
        ],
      },
      {
        heading: "2. Zoning and permits",
        list: [
          "Confirm the zone (ITR) allows your intended use — residential, rental, or hospitality.",
          "Verify building permits (PBG, formerly IMB) match what is actually built.",
          "Check the SLF (function-worthiness certificate) for completed buildings.",
          "For rentals: confirm tourism-licence eligibility in that zone.",
        ],
      },
      {
        heading: "3. The land itself",
        list: [
          "Legal road access — registered, not informal goodwill.",
          "Water source and reliability; PDAM connection or well permits.",
          "Power capacity and connection status.",
          "Flood behaviour in rainy season; ask neighbours, not just the seller.",
          "Any temple, shrine, or customary (adat) considerations on or beside the land.",
        ],
      },
      {
        heading: "4. The contract",
        list: [
          "For leases: extension option with price mechanism, inheritance clause, sublease/rental rights, early-termination protections.",
          "For freehold via PT PMA: company compliance, capital requirements, HGB timeline.",
          "Tax allocation between parties stated explicitly.",
          "Deposit held in escrow with a notary, never transferred informally.",
        ],
      },
      {
        heading: "5. The seller and the numbers",
        list: [
          "Land and building tax (PBB) paid current.",
          "For operating villas: audited or bank-verifiable rental history, not screenshots.",
          "Inventory list, staff obligations, and management contracts reviewed.",
          "Independent valuation if the price sits far from comparable evidence.",
        ],
      },
      {
        paragraphs: [
          "None of this is exotic — it is simply thorough. The difference between a safe Bali purchase and a cautionary tale is rarely luck; it is whether someone did this work before the money moved. That someone is us. #Here4U",
        ],
      },
    ],
    faq: [
      {
        q: "What due diligence is needed when buying property in Bali?",
        a: "Certificate verification at BPN, zoning (ITR) confirmation, building permit checks (PBG/SLF), physical survey, legal road access, water and power verification, contract review by independent counsel, and tax status checks — before any deposit moves.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
