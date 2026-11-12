import type { MetadataRoute } from "next";
import { projects } from "./lib/projects";
import { site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.8 })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    priority,
  }));
}
