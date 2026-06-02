import type { MetadataRoute } from "next";
import { destinations, blogList } from "@/lib/data";

function titleToSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hillyagency.vercel.app";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/experiences`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/plan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${base}/destinations/${d.id}-${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: d.is_featured ? 0.85 : 0.7,
  }));

  const tourRoutes: MetadataRoute.Sitemap = destinations.flatMap((d) =>
    (d.tours || []).map((t) => ({
      url: `${base}/tours/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: t.is_featured ? 0.8 : 0.65,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = blogList.map((b) => ({
    url: `${base}/blog/${titleToSlug(b.title)}`,
    lastModified: new Date(b.datePublished),
    changeFrequency: "monthly" as const,
    priority: b.is_featured ? 0.75 : 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...tourRoutes, ...blogRoutes];
}
