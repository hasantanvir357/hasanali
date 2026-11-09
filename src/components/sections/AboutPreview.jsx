"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

import Link from "next/link";

/** About section: bilingual bio + education/training timeline. */
export default function AboutPreview({
  as = "h2",
  index = "07",
  sectionId = "about",
  headingId = "about-title",
  className = "relative scroll-mt-24 py-16 md:py-24",
  ctaHref = "/contact",
}) {
  const { t, lang } = useLanguage();

  return (
    <section id={sectionId} aria-labelledby={headingId} className={className}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index={index}
          label={t.about.label}
          title={t.about.title}
          id={headingId}
          as={as}
        />

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-5">
            {site.about.bio.map((paragraph) => (
              <p
                key={paragraph.en.slice(0, 24)}
                className="text-[15px] leading-[1.9] text-muted md:text-base"
              >
                {pick(paragraph, lang)}
              </p>
            ))}

            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent transition duration-200 hover:text-text"
            >
              {t.about.cta}
              <IconArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <p className="mb-6 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              {t.about.education}
            </p>

            <ol className="border-l border-line">
              {site.education.map((entry) => (
                <li key={entry.id} className="relative pb-7 pl-5 last:pb-0 sm:pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full border border-accent bg-bg"
                  />
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-3">
                    <h3 className="text-[15px] font-medium text-text">
                      {entry.name}
                    </h3>
                    <span className="w-fit rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11px] tracking-wide whitespace-nowrap text-muted">
                      {entry.period}
                    </span>
                  </div>
                  {entry.subject ? (
                    <p className="mt-1.5 text-sm text-muted">
                      {pick(entry.subject, lang)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
