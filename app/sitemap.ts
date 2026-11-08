import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://alaniaenergy.com/", lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
