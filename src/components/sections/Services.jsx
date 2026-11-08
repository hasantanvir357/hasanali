"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  IconCamera,
  IconFilm,
  IconSliders,
  IconSparkles,
} from "@/components/ui/icons";

const ICONS = {
  film: IconFilm,
  camera: IconCamera,
  sparkles: IconSparkles,
  sliders: IconSliders,
};

/** Four service cards with a staggered reveal. */
export default function Services() {
  const { t, lang } = useLanguage();

  return (
    <section
      aria-labelledby="services-title"
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          label={t.services.label}
          title={t.services.title}
          desc={t.services.desc}
          id="services-title"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? IconSparkles;
            return (
              <Reveal
                as="li"
                key={service.id}
                delay={index * 90}
                className="h-full"
              >
                <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-surface">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/15 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                  />

                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg/60 text-accent transition duration-300 group-hover:border-accent/60">
                    <Icon className="h-5 w-5" />
                  </span>

                  <p className="relative mt-6 text-[11px] tracking-[0.25em] text-muted/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="relative mt-2 text-lg font-medium text-text">
                    {pick(service.title, lang)}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                    {pick(service.desc, lang)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
