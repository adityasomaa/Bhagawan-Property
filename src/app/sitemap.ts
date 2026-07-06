import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import { articles } from "@/data/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/properties/freehold`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/properties/leasehold`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/sell-with-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/knowledge-base`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${site.url}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${site.url}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/knowledge-base/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...areaPages, ...articlePages];
}
