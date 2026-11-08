import type { MetadataRoute } from "next";

const PATHS = ["", "/natural-gas", "/nuclear", "/technology", "/campus", "/data-centers"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `https://alaniaenergy.com${p || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p ? 0.8 : 1,
  }));
}
