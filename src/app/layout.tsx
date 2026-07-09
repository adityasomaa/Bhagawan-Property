import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/motion/Preloader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { TransitionProvider } from "@/components/motion/PageTransition";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/i18n/provider";
import { OverridesProvider } from "@/lib/overrides";
import { ACCESS_COOKIE, ACCESS_TOKEN } from "@/lib/auth";
import UnderConstruction from "@/components/UnderConstruction";
import FloatingUI from "@/components/FloatingUI";
import { site } from "@/lib/site";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bhagawan Property — Find Exceptional Property in Bali",
    template: "%s | Bhagawan Property Bali",
  },
  description: site.description,
  keywords: [
    "Bali property",
    "Bali real estate",
    "Bali villas for sale",
    "freehold Bali",
    "leasehold Bali",
    "Bali property investment",
    "Uluwatu villas",
    "Canggu villas",
    "buy property Bali",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Bhagawan Property — Find Exceptional Property in Bali",
    description: site.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bhagawan Property — Bali real estate advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagawan Property — Find Exceptional Property in Bali",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  legalName: site.legalName,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Raya Canggu No. 88",
    addressLocality: "Canggu, Badung",
    addressRegion: "Bali",
    postalCode: "80361",
    addressCountry: "ID",
  },
  areaServed: ["Uluwatu", "Canggu", "Sanur", "Seminyak", "Ubud", "Pererenan", "Bali"],
  knowsAbout: [
    "Bali real estate",
    "freehold property",
    "leasehold property",
    "property investment",
    "villa rentals",
  ],
  sameAs: [site.instagram],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

// The access cookie must be read per request while the pre-launch gate is on.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Pre-launch gate: without preview access, the middleware rewrites every
  // route to the standalone under-construction page — so we drop the marketing
  // chrome (header/footer/preloader/floating controls) entirely in that state.
  const authed = (await cookies()).get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;

  return (
    <html lang="en" className={`${space.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <Script id="preload-check" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("bp-preloaded")==="1"){document.documentElement.dataset.preloaded="1";document.documentElement.dataset.appReady="1"}}catch(e){}`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LocaleProvider>
          <OverridesProvider>
            {authed ? (
              <>
                <SmoothScroll />
                <TransitionProvider>
                  <Preloader />
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <FloatingUI />
                </TransitionProvider>
              </>
            ) : (
              // Bulletproof gate: render the lock screen for every route when
              // locked, independent of the middleware matcher.
              <UnderConstruction />
            )}
          </OverridesProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
