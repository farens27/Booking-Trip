import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes = ["/", "/search", "/dashboard", "/admin"];
  const destinationRoutes = destinations.flatMap((destination) => {
    const slug = destination.slug ?? destination.id;
    return [`/destinations/${slug}`, `/book/${slug}`];
  });

  return [...baseRoutes, ...destinationRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/destinations") ? 0.8 : 0.5,
  }));
}
