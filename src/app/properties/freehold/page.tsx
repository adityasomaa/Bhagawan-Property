import type { Metadata } from "next";
import TenurePage from "@/components/TenurePage";

export const metadata: Metadata = {
  title: "Freehold Properties for Sale in Bali",
  description:
    "Curated freehold villas, estates, and land for sale across Bali — clean certificates, compliant structures, and honest advice from a buyer-first advisory.",
  alternates: { canonical: "/properties/freehold" },
};

export default function FreeholdPage() {
  return <TenurePage tenure="freehold" />;
}
