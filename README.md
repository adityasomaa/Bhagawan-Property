# Bhagawan Property

> We don't just sell property — we help people buy the right one. **#Here4U**

A premium, minimalist, editorial real estate website for **Bhagawan Property**, a buyer-first property advisory in Bali. Inspired by Propertia and Aman Resorts. Live at [bhagawan-property.vercel.app](https://bhagawan-property.vercel.app).

## Stack

- **Next.js 16** (App Router, static generation) + **TypeScript**
- **Tailwind CSS v4** with a warm editorial design system (Fraunces + Instrument Sans)
- **GSAP + ScrollTrigger** — preloader, page transitions, scroll reveals
- **Lenis** smooth scrolling (desktop only; auto-disabled on tablet/mobile and inside scrollable popups)
- Deployed on **Vercel**

## Features

- Homepage per brief: hero, featured properties, Bali areas, why-choose, about, knowledge base preview, contact
- Property catalogues (freehold / leasehold) with filters (area, type, price, bedrooms, land size)
- Property detail pages: gallery lightbox, specs, investment highlights, map, enquiry form, related listings
- 6 editorial area guides: Uluwatu, Canggu, Sanur, Seminyak, Ubud, Pererenan
- Sell With Us landing page with property submission form (submits via WhatsApp)
- Knowledge Base with 8 in-depth guides across 7 categories
- **ROI Calculator** with freehold appreciation / leasehold amortisation modelling (pre-fillable from listing pages)
- Legal pages: privacy policy & terms of use
- First-visit preloader (session-aware) and curtain page transitions (close → swap content → scroll top → open)
- Fully responsive with animated full-screen hamburger menu
- SEO: per-page metadata, OpenGraph, JSON-LD (RealEstateAgent, Product, Article, FAQPage, Place), `sitemap.xml`, `robots.txt`
- GEO (AI-engine optimization): `/llms.txt`, AI crawlers welcomed in robots

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (46 static pages)
```

## Content

All content lives in typed data files — no CMS required:

- `src/data/properties.ts` — listings
- `src/data/areas.ts` — area guides
- `src/data/articles.ts` — knowledge base
- `src/lib/site.ts` — contact details, navigation, brand copy

> **Note:** contact details (WhatsApp number, email, address) in `src/lib/site.ts` are placeholders — update them before going live commercially. Property photography currently uses Unsplash imagery.
