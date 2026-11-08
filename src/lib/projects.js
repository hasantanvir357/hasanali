import projects from "@/data/projects.json";

export { projects };

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectIndex(slug) {
  return projects.findIndex((project) => project.slug === slug);
}

/** Previous / next project with wrap-around. */
export function getNeighborProjects(slug) {
  const index = getProjectIndex(slug);
  if (index === -1) return { prev: null, next: null };
  const total = projects.length;
  return {
    prev: projects[(index - 1 + total) % total],
    next: projects[(index + 1) % total],
  };
}

/** YouTube thumbnail — null for Google Drive media (no thumbnail exists). */
export function getThumbUrl(project, quality = "maxresdefault") {
  if (!project || project.media !== "youtube" || !project.id) return null;
  return `https://i.ytimg.com/vi/${project.id}/${quality}.jpg`;
}

/**
 * Click-to-load embed URL. Built only when the user presses play,
 * so no iframe ever loads with the initial page view.
 */
export function getEmbedUrl(project) {
  if (!project || !project.id) return null;
  if (project.media === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${project.id}?autoplay=1&mute=1&rel=0&modestbranding=1`;
  }
  return `https://drive.google.com/file/d/${project.id}/preview`;
}

export function filterProjects(category) {
  if (!category || category === "all") return projects;
  return projects.filter((project) => project.category === category);
}
