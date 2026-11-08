"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

/** Homepage about preview: bilingual bio + education/training timeline. */
export default function AboutPreview() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="07"
          label={t.about.label}
          title={t.about.title}
          id="about-title"
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="space-y-5">
            {site.about.bio.map((paragraph) => (
              <p
                key={paragraph.en.slice(0, 24)}
                className="text-[15px] leading-[1.9] text-muted md:text-base"
              >
                {pick(paragraph, lang)}
              </p>
            ))}

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent transition duration-200 hover:text-white"
            >
              {t.about.cta}
              <IconArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={140}>
            <p className="mb-6 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              {t.about.education}
            </p>

            <ol className="border-l border-line">
              {site.education.map((entry) => (
                <li key={entry.id} className="relative pb-7 pl-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full border border-accent bg-bg"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
                    <h3 className="text-[15px] font-medium text-text">
                      {entry.name}
                    </h3>
                    <span className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11px] tracking-wide whitespace-nowrap text-muted">
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
