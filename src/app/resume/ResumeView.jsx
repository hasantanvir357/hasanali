"use client";

import Link from "next/link";

import site from "@/data/site.json";
import { projects } from "@/lib/projects";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import {
  IconArrowRight,
  IconChevronLeft,
  IconMail,
  IconPin,
  IconPrinter,
} from "@/components/ui/icons";

/** Section heading shared by every résumé block. */
function SectionTitle({ children }) {
  return (
    <h2 className="mb-4 border-b border-line pb-2 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
      {children}
    </h2>
  );
}

/**
 * Printable résumé — one page route rendered from site.json, so it can
 * never drift from the rest of the site. The print button triggers the
 * browser's own print dialog ("Save as PDF"); print styles live in
 * globals.css under `@media print`.
 */
export default function ResumeView() {
  const { t, lang } = useLanguage();

  return (
    <div className="resume-doc mx-auto max-w-5xl px-5 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* -------------------------------- header ------------------------------- */}
      <Reveal className="no-print">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm text-muted transition duration-200 hover:text-text"
        >
          <IconChevronLeft className="h-4 w-4 transition duration-200 group-hover:-translate-x-1" />
          {t.resume.back}
        </Link>
      </Reveal>

      <Reveal delay={60} className="mt-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-10 bg-line" />
            {t.resume.label}
            <span aria-hidden="true" className="h-px w-10 bg-line" />
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.08] font-semibold tracking-tight text-balance">
            {site.name}
          </h1>
          <p className="mt-2.5 text-lg font-medium tracking-wide text-accent">
            {pick(site.role, lang)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="no-print group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_42px_rgba(0,133,255,0.5)]"
        >
          <IconPrinter className="h-4 w-4" />
          {t.resume.print}
        </button>
      </Reveal>

      {/* contact strip */}
      <Reveal delay={100}>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 border-y border-line py-4 text-sm text-muted">
          <li className="flex items-center gap-2">
            <IconMail className="h-4 w-4 shrink-0 text-accent" />
            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-text"
            >
              {site.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <IconPin className="h-4 w-4 shrink-0 text-accent" />
            {pick(site.locationShort, lang)}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.experienceNote}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.domain}
          </li>
        </ul>
      </Reveal>

      {/* -------------------------------- columns ------------------------------ */}
      <div className="resume-grid mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-14">
        {/* ------------------------------- main -------------------------------- */}
        <div className="space-y-10">
          <Reveal>
            <SectionTitle>{t.resume.profile}</SectionTitle>
            <div className="space-y-4">
              {site.about.bio.map((paragraph) => (
                <p
                  key={paragraph.en.slice(0, 24)}
                  className="text-[15px] leading-[1.9] text-muted"
                >
                  {pick(paragraph, lang)}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <SectionTitle>{t.resume.services}</SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.services.map((service) => (
                <li
                  key={service.id}
                  className="rounded-xl border border-line bg-surface/60 p-4"
                >
                  <h3 className="text-sm font-medium text-text">
                    {pick(service.title, lang)}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {pick(service.desc, lang)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <SectionTitle>{t.resume.selectedWork}</SectionTitle>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border border-line bg-surface/40 px-4 py-3 transition duration-200 hover:border-accent/45"
                  >
                    <span className="text-sm font-medium text-text transition group-hover:text-accent">
                      {project.title}
                    </span>
                    <span className="text-[13px] text-muted">
                      {project.subtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ------------------------------ sidebar ------------------------------ */}
        <div className="space-y-10">
          <Reveal delay={60}>
            <SectionTitle>{t.resume.experience}</SectionTitle>
            <ul className="grid grid-cols-2 gap-3">
              <li className="rounded-xl border border-line bg-surface/60 p-4">
                <p className="text-2xl font-semibold text-text">
                  {site.stats.years.value}
                  {site.stats.years.suffix}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-muted">
                  {pick(site.stats.years.label, lang)}
                </p>
              </li>
              <li className="rounded-xl border border-line bg-surface/60 p-4">
                <p className="text-2xl font-semibold text-text">
                  {site.stats.projects.value}
                  {site.stats.projects.suffix}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-muted">
                  {pick(site.stats.projects.label, lang)}
                </p>
              </li>
            </ul>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)]" />
              {t.hero.status}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <SectionTitle>{t.resume.clients}</SectionTitle>
            <ul className="flex flex-wrap gap-2">
              {site.clients.map((client) => (
                <li
                  key={client}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[13px] text-text"
                >
                  {client}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <SectionTitle>{t.resume.education}</SectionTitle>
            <ol className="space-y-4">
              {site.education.map((entry) => (
                <li key={entry.id} className="border-l border-line pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="text-sm font-medium text-text">
                      {entry.name}
                    </h3>
                    <span className="text-[12px] whitespace-nowrap text-muted">
                      {entry.period}
                    </span>
                  </div>
                  {entry.subject ? (
                    <p className="mt-1 text-[13px] text-muted">
                      {pick(entry.subject, lang)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={180}>
            <SectionTitle>{t.resume.contactSection}</SectionTitle>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition hover:text-text"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {pick(site.location, lang)}
              </li>
            </ul>

            <Link
              href="/contact"
              className="no-print group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition duration-200 hover:text-text"
            >
              {t.about.cta}
              <IconArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
