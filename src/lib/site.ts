export const site = {
  name: "Bhagawan Property",
  legalName: "Bhagawan Property Bali",
  tagline: "We don't just sell property—we help people buy the right one.",
  signature: "#Here4U",
  url: "https://bhagawan-property.vercel.app",
  description:
    "Bhagawan Property is a trusted, buyer-first property advisor in Bali. Curated freehold and leasehold villas, land, and investment opportunities across Uluwatu, Canggu, Sanur, Seminyak, Ubud, and Pererenan.",
  email: "hello@bhagawanproperty.com",
  phone: "+62 812 3456 7890",
  whatsapp: "6281234567890",
  address: "Jl. Raya Canggu No. 88, Canggu, Badung, Bali 80361, Indonesia",
  instagram: "https://instagram.com/bhagawanproperty",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/properties",
    children: [
      { label: "Freehold", href: "/properties/freehold" },
      { label: "Leasehold", href: "/properties/leasehold" },
    ],
  },
  { label: "Areas", href: "/areas" },
  { label: "Sell With Us", href: "/sell-with-us" },
  { label: "Knowledge Base", href: "/knowledge-base" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
