import { projects } from "@/lib/projects";

const BASE = "https://hasanbinali.com";

/** All public routes — static pages plus every prerendered project. */
export default function sitemap() {
  const staticPages = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resources`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const projectPages = projects.map((project) => ({
    url: `${BASE}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages].map((page) => ({
    lastModified: new Date(),
    ...page,
  }));
}
