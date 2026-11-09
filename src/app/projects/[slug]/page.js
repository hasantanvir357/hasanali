import { notFound } from "next/navigation";

import { getNeighborProjects, getProject, projects } from "@/lib/projects";
import JsonLd from "@/components/seo/JsonLd";
import ProjectView from "./ProjectView";

/**
 * This route is fully prerendered per slug (`generateStaticParams`), so
 * every valid project page ships as static HTML and is instant on its
 * own. The segment opts out of instant-navigation validation because
 * `notFound()` needs the awaited param at the top level to return a real
 * 404 status — calling it from inside a streamed `<Suspense>` boundary
 * would downgrade unknown slugs to a 200 with not-found content.
 */
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: `${project.subtitle} — ${project.description.en}`,
    openGraph: {
      title: `${project.title} — Hasan Bin Ali`,
      description: `${project.subtitle} — ${project.description.en}`,
      url: `https://hasanbinali.com/projects/${project.slug}`,
      type: "video.other",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getNeighborProjects(slug);

  /* VideoObject structured data for YouTube projects (real facts only). */
  const videoJsonLd =
    project.media === "youtube" && project.id
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: `${project.title} — Hasan Bin Ali`,
          description: project.description.en,
          thumbnailUrl: `https://i.ytimg.com/vi/${project.id}/maxresdefault.jpg`,
          contentUrl: `https://www.youtube.com/watch?v=${project.id}`,
          embedUrl: `https://www.youtube.com/embed/${project.id}`,
          uploader: {
            "@type": "Person",
            name: "Hasan Bin Ali",
            url: "https://hasanbinali.com",
          },
        }
      : null;

  return (
    <main id="main">
      {videoJsonLd ? <JsonLd data={videoJsonLd} /> : null}
      <ProjectView project={project} prev={prev} next={next} />
    </main>
  );
}
