import type { Metadata } from "next";
import TenurePage from "@/components/TenurePage";

export const metadata: Metadata = {
  title: "Leasehold Properties for Sale in Bali",
  description:
    "Curated leasehold villas and land across Bali with long terms, contractual extension options, and genuine rental performance — honestly priced per remaining year.",
  alternates: { canonical: "/properties/leasehold" },
};

export default function LeaseholdPage() {
  return <TenurePage tenure="leasehold" />;
}
