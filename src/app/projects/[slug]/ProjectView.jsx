"use client";

import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import VideoEmbed from "@/components/ui/VideoEmbed";
import {
  IconChevronLeft,
  IconChevronRight,
} from "@/components/ui/icons";

/**
 * Project detail: restrained reveal on title/media, click-to-load embed,
 * bilingual description, meta panel and prev/next navigation.
 * Never blocks navigation — content is readable immediately.
 */
export default function ProjectView({ project, prev, next }) {
  const { t, lang } = useLanguage();

  const isYoutube = project.media === "youtube";
  const poster = isYoutube
    ? `https://i.ytimg.com/vi/${project.id}/maxresdefault.jpg`
    : null;

  const labels = {
    play: t.project.watch,
    comingTitle: t.project.comingTitle,
    comingDesc: t.project.comingDesc,
    title: `${project.title} — ${project.subtitle}`,
  };

  const mediaLabel = isYoutube ? t.work.mediaYoutube : t.work.mediaGdrive;

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 pb-16 md:pt-36 md:pb-24">
      <Reveal>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-muted transition duration-200 hover:text-text"
        >
          <IconChevronLeft className="h-4 w-4 transition duration-200 group-hover:-translate-x-1" />
          {t.project.back}
        </Link>
      </Reveal>

      <Reveal delay={80} className="mt-9">
        <p className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[11px] tracking-[0.16em] text-text/90 uppercase">
            {t.work.filters[project.category]}
          </span>
          <span className="text-[11px] tracking-[0.24em] text-muted uppercase">
            {mediaLabel}
          </span>
        </p>

        <h1 className="mt-5 text-[clamp(1.9rem,5vw,3.25rem)] leading-[1.12] font-semibold tracking-tight text-balance">
          {project.title}
        </h1>
        <p className="mt-3 text-base text-muted md:text-lg">
          {project.subtitle}
        </p>
      </Reveal>

      <Reveal delay={140} className="relative mt-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-5 rounded-[1.75rem] bg-[radial-gradient(closest-side,rgba(0,133,255,0.13),transparent)] blur-2xl"
        />
        <div className="relative">
          <VideoEmbed
            project={project}
            poster={poster}
            posterAlt={`${project.title} — ${project.subtitle}`}
            labels={labels}
          />
        </div>
      </Reveal>

      <div className="mt-11 grid gap-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-12">
        <Reveal>
          <dl className="glass rounded-2xl p-6">
            <div>
              <dt className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
                {t.project.category}
              </dt>
              <dd className="mt-2 text-sm text-text">
                {t.work.filters[project.category]}
              </dd>
            </div>
            <div className="mt-5 border-t border-line pt-5">
              <dt className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
                {t.project.format}
              </dt>
              <dd className="mt-2 text-sm text-text">{mediaLabel}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
            {t.project.description}
          </p>
          <p className="mt-3.5 text-[15px] leading-[1.9] text-muted md:text-base">
            {pick(project.description, lang)}
          </p>
        </Reveal>
      </div>

      <nav
        aria-label={t.project.prev}
        className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-line bg-surface/60 p-5 transition duration-300 hover:border-accent/45"
          >
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-muted uppercase">
              <IconChevronLeft className="h-3.5 w-3.5" />
              {t.project.prev}
            </span>
            <p className="mt-2.5 text-[15px] font-medium text-text transition duration-300 group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-line bg-surface/60 p-5 text-right transition duration-300 hover:border-accent/45 sm:text-right"
          >
            <span className="flex items-center justify-end gap-1.5 text-[11px] tracking-[0.2em] text-muted uppercase">
              {t.project.next}
              <IconChevronRight className="h-3.5 w-3.5" />
            </span>
            <p className="mt-2.5 text-[15px] font-medium text-text transition duration-300 group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
