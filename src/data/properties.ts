export type Tenure = "freehold" | "leasehold";
export type PropertyType = "villa" | "land" | "townhouse";

export interface Property {
  slug: string;
  name: string;
  area: string; // area slug
  areaName: string;
  tenure: Tenure;
  leaseholdYears?: number;
  type: PropertyType;
  price: number; // IDR
  bedrooms: number;
  bathrooms: number;
  landSize: number; // m²
  buildingSize?: number; // m²
  images: string[];
  excerpt: string;
  description: string[];
  highlights: string[];
  features: string[];
  featured: boolean;
  mapQuery: string;
  nightlyRate?: number;
  occupancy?: number;
}

/** Photos sourced from the Bhagawan Property Drive, hosted under /public/listings. */
const listing = (slug: string, files: string[]) =>
  files.map((f) => `/listings/${slug}/${f}.jpg`);

export const properties: Property[] = [
  // ── Real detail from Drive doc ────────────────────────────────────────
  {
    slug: "kayu-tulang-canggu",
    name: "Modern 3-Storey Villa, Kayu Tulang",
    area: "canggu",
    areaName: "Canggu",
    tenure: "freehold",
    type: "villa",
    price: 5_200_000_000,
    bedrooms: 2,
    bathrooms: 3,
    landSize: 122,
    buildingSize: 151,
    images: listing("kayu-tulang-canggu", ["01", "02", "03", "04", "05", "06", "07", "08"]),
    excerpt:
      "A stylish 3-storey villa in an elite gated complex on Kayu Tulang, minutes from Batu Bolong.",
    description: [
      "A stylish, functional villa in one of Canggu's most prestigious pockets — set within a super-elite gated complex on Jalan Kayu Tulang. Ideal for personal living or a high-return investment.",
      "Completed in 2024 across three levels, the home pairs warm modern interiors with a private pool and a practical layout: two bedrooms, a study, and generous living, kitchen, and service areas.",
      "The complex itself is the quiet luxury here — 6-metre-wide access roads, fully underground cabling with no overhead wires, a neat and organised environment, and 24-hour security.",
    ],
    highlights: [
      "Elite gated complex — 6m roads, underground cabling, 24h security",
      "8 minutes to Batu Bolong Beach; 6 minutes to Desa Kitsune",
      "8 minutes to La Brisa and Old Man's",
      "Built 2024 · 3 floors · private pool",
    ],
    features: [
      "2 Bedrooms",
      "2 + 1 Bathrooms",
      "Living room",
      "Kitchen & dining",
      "Study room",
      "Wardrobe & service area",
      "Private pool",
      "Parking area",
    ],
    featured: true,
    mapQuery: "Jalan Kayu Tulang, Canggu, Bali",
  },
  {
    slug: "pecatu-uluwatu",
    name: "Tropical Pool Villas, Pecatu",
    area: "uluwatu",
    areaName: "Uluwatu",
    tenure: "leasehold",
    leaseholdYears: 30,
    type: "villa",
    price: 3_500_000_000,
    bedrooms: 2,
    bathrooms: 2,
    landSize: 131,
    buildingSize: 100,
    images: listing("pecatu-uluwatu", ["07", "03", "05", "04", "06", "02", "08", "01"]),
    excerpt:
      "Ready, fully-furnished 2-bedroom tropical pool villas in a managed Pecatu community — from IDR 3.5B.",
    description: [
      "A collection of ready, fully-furnished two-bedroom tropical villas set within a managed community in Pecatu, Uluwatu — a genuinely turnkey entry into the Bukit's fast-growing villa market.",
      "Each villa has its own private pool, while the community adds a public swimming pool, gym, receptionist, cafeteria, and in-house property management — everything an owner or guest needs on site.",
      "A handful of units remain, priced from IDR 3.5B up to IDR 4.1B depending on land and building size. Purchase starts with a refundable IDR 25 million booking fee and a project visit within 14 days.",
    ],
    highlights: [
      "All units ready & fully furnished",
      "Private pool per villa + communal pool, gym & café",
      "In-house property management on site",
      "9 min to Uluwatu centre; 15 min to Padang Padang Beach",
    ],
    features: [
      "2 Bedrooms",
      "Fully furnished",
      "Private pool",
      "Communal swimming pool",
      "Gym",
      "Receptionist",
      "Cafeteria",
      "Property management",
    ],
    featured: true,
    mapQuery: "Pecatu, Uluwatu, Bali",
  },

  // ── Placeholder specs (photos real; details to be confirmed) ──────────
  {
    slug: "villa-ungasan-oceanview",
    name: "Villa Ungasan Oceanview",
    area: "uluwatu",
    areaName: "Uluwatu",
    tenure: "freehold",
    type: "villa",
    price: 6_000_000_000,
    bedrooms: 4,
    bathrooms: 4,
    landSize: 300,
    buildingSize: 280,
    images: listing("villa-ungasan-oceanview", ["01", "02", "03", "04", "05", "06", "07", "08"]),
    excerpt:
      "A clifftop-village villa in Ungasan with rooftop ocean views over the Bukit. (Details indicative — to be confirmed.)",
    description: [
      "A generously proportioned villa in Ungasan, high on the Bukit Peninsula, with a rooftop terrace framing views across the southern coastline.",
      "Please note: pricing and specifications shown here are placeholders while we finalise this listing — contact us for the confirmed details.",
    ],
    highlights: [
      "Rooftop ocean-view terrace",
      "Ungasan — quiet, elevated Bukit living",
      "Minutes to Melasti and Pandawa beaches",
      "Specifications to be confirmed",
    ],
    features: ["Rooftop terrace", "Private pool", "Ocean view", "Fully finished", "Parking"],
    featured: true,
    mapQuery: "Ungasan, Uluwatu, Bali",
  },
  {
    slug: "casa-mirea-2",
    name: "Casa Mirea 2",
    area: "pererenan",
    areaName: "Pererenan",
    tenure: "freehold",
    type: "villa",
    price: 3_800_000_000,
    bedrooms: 3,
    bathrooms: 3,
    landSize: 150,
    buildingSize: 180,
    images: listing("casa-mirea-2", ["01", "02", "03", "04", "05", "06", "07", "08"]),
    excerpt:
      "A contemporary multi-level villa with private pool near Pererenan. (Details indicative — to be confirmed.)",
    description: [
      "A crisp, contemporary villa arranged over multiple levels around a private pool, in the Pererenan–Canggu growth corridor.",
      "Please note: pricing and specifications shown here are placeholders while we finalise this listing — contact us for the confirmed details.",
    ],
    highlights: [
      "Contemporary multi-level design",
      "Private pool",
      "Pererenan growth corridor",
      "Specifications to be confirmed",
    ],
    features: ["Private pool", "Multi-level living", "Modern kitchen", "Parking", "Fully finished"],
    featured: true,
    mapQuery: "Pererenan, Bali",
  },
  {
    slug: "villa-iris-n-stone",
    name: "Villa Iris & Stone",
    area: "seminyak",
    areaName: "Seminyak",
    tenure: "leasehold",
    leaseholdYears: 28,
    type: "villa",
    price: 4_500_000_000,
    bedrooms: 3,
    bathrooms: 3,
    landSize: 250,
    buildingSize: 200,
    images: listing("villa-iris-n-stone", ["01", "02", "03", "04", "05", "06", "07", "08"]),
    excerpt:
      "A natural-stone-and-white modern villa in the Seminyak area. (Details indicative — to be confirmed.)",
    description: [
      "A modern villa combining crisp white volumes with natural-stone detailing and lush tropical planting.",
      "Please note: pricing and specifications shown here are placeholders while we finalise this listing — contact us for the confirmed details.",
    ],
    highlights: [
      "Natural stone & white modern design",
      "Private pool",
      "Walkable Seminyak lifestyle",
      "Specifications to be confirmed",
    ],
    features: ["Private pool", "Stone detailing", "Tropical garden", "Parking", "Fully finished"],
    featured: true,
    mapQuery: "Seminyak, Bali",
  },
  {
    slug: "sansa-villa",
    name: "Sansa Villa",
    area: "uluwatu",
    areaName: "Uluwatu",
    tenure: "leasehold",
    leaseholdYears: 25,
    type: "villa",
    price: 2_500_000_000,
    bedrooms: 2,
    bathrooms: 2,
    landSize: 200,
    buildingSize: 120,
    images: listing("sansa-villa", ["01", "02", "03", "04", "05", "06", "07", "08"]),
    excerpt:
      "A newly-built Mediterranean-tropical villa with private pool on the Bukit. (Off-plan — details indicative, to be confirmed.)",
    description: [
      "A fresh, light-filled villa blending Mediterranean whitewash with tropical thatch and a private pool — part of our off-plan / new-build collection on the Bukit.",
      "Please note: pricing and specifications shown here are placeholders while we finalise this listing — contact us for the confirmed details.",
    ],
    highlights: [
      "New build · Mediterranean-tropical design",
      "Private pool",
      "Bukit Peninsula location",
      "Specifications to be confirmed",
    ],
    features: ["Private pool", "Open-plan living", "Thatched accents", "Furnished", "Parking"],
    featured: true,
    mapQuery: "Uluwatu, Pecatu, Bali",
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function byTenure(tenure: Tenure) {
  return properties.filter((p) => p.tenure === tenure);
}

export function byArea(areaSlug: string) {
  return properties.filter((p) => p.area === areaSlug);
}

export const featuredProperties = properties.filter((p) => p.featured);
