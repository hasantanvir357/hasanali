"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import projects from "@/data/projects.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectThumb from "@/components/ui/ProjectThumb";
import { IconArrowUpRight } from "@/components/ui/icons";

const FILTERS = ["all", "editing", "cinema", "drone"];

/**
 * Selected projects: segmented filter tabs + media-led cards.
 * Hover → thumbnail zoom, dark/blue overlay glow, VIEW PROJECT badge and
 * a matching custom-cursor label. Cards navigate to `/projects/[slug]`.
 */
export default function Projects({
  as = "h2",
  sectionId = "work",
  headingId = "work-title",
  index = "04",
  className = "relative scroll-mt-24 py-16 md:py-24",
  showHeading = true,
}) {
  const { t } = useLanguage();
  const [active, setActive] = useState("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active]
  );

  return (
    <section id={sectionId} aria-labelledby={headingId} className={className}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(0,133,255,0.09),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        {showHeading ? (
          <SectionHeading
            index={index}
            label={t.work.label}
            title={t.work.title}
            desc={t.work.desc}
            id={headingId}
            as={as}
            action={
              <div
                role="group"
                aria-label={t.work.filtersLabel}
                className="flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-line bg-surface/70 p-1.5 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {FILTERS.map((filter) => {
                  const isActive = active === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActive(filter)}
                      aria-pressed={isActive}
                      className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium transition duration-200 sm:px-4 ${
                        isActive
                          ? "bg-accent text-bg shadow-[0_0_16px_rgba(0,133,255,0.4)]"
                          : "text-muted hover:text-text"
                      }`}
                    >
                      {t.work.filters[filter]}
                    </button>
                  );
                })}
              </div>
            }
          />
        ) : null}

        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-14 text-center text-sm text-muted">
            {t.work.empty}
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <Reveal
                as="li"
                key={project.slug}
                delay={(index % 3) * 90}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor={t.work.viewProject}
                  className="group block h-full overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-accent/45 hover:shadow-[0_26px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <ProjectThumb project={project} />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 z-[1] bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-60 transition duration-500 group-hover:opacity-95"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 z-[1] bg-accent/15 opacity-0 transition duration-500 group-hover:opacity-100"
                    />

                    <span className="absolute top-3.5 right-3.5 z-[2] rounded-full border border-white/20 bg-bg/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-text backdrop-blur transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      {t.work.viewProject}
                    </span>

                    <span className="absolute bottom-3.5 left-3.5 z-[2] rounded-full border border-line bg-bg/75 px-3 py-1 text-[10px] tracking-[0.14em] text-text/90 uppercase backdrop-blur">
                      {t.work.filters[project.category]}
                    </span>

                    <span className="absolute right-3.5 bottom-3.5 z-[2] text-[10px] tracking-[0.14em] text-muted uppercase">
                      {project.media === "youtube" ? "YouTube" : "Drive"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3 px-5 py-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] leading-snug font-medium text-text transition duration-300 group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-1 truncate text-[13px] text-muted">
                        {project.subtitle}
                      </p>
                    </div>
                    <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
