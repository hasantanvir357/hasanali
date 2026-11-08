"use client";

import Link from "next/link";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import {
  IconArrowRight,
  IconCalendar,
  IconDownload,
  IconMonitor,
} from "@/components/ui/icons";

const CARDS = [
  { id: "assets", icon: IconDownload },
  { id: "announcements", icon: IconCalendar },
  { id: "sessions", icon: IconMonitor },
];

/**
 * Dedicated /resources route: a launchpad for future digital assets,
 * registration announcements and online sessions. Each area ships as a
 * polished "coming soon" card so the page is complete today and simply
 * gains content later.
 */
export default function ResourcesView() {
  const { t } = useLanguage();

  const labelClass =
    "flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase";

  return (
    <>
      {/* --------------------------------- header -------------------------------- */}
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,133,255,0.16),transparent)] blur-2xl"
        />

        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className={labelClass}>
              <span className="text-muted/70">01</span>
              <span>{t.resources.label}</span>
              <span aria-hidden="true" className="h-px w-16 bg-line" />
            </p>

            <h1 className="mt-6 text-[clamp(2.4rem,6vw,4rem)] leading-[1.06] font-semibold tracking-tight text-balance">
              {t.resources.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-muted md:text-base">
              {t.resources.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------- cards -------------------------------- */}
      <section aria-label={t.resources.title} className="pb-6">
        <div className="mx-auto max-w-6xl px-5">
          <ul className="grid gap-5 md:grid-cols-3">
            {CARDS.map((card, index) => {
              const content = t.resources.cards[card.id];
              const Icon = card.icon;
              return (
                <Reveal
                  as="li"
                  key={card.id}
                  delay={index * 100}
                  className="h-full"
                >
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-surface">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/15 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                    />

                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg/60 text-accent transition duration-300 group-hover:border-accent/60">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="relative mt-6 inline-flex w-fit rounded-full border border-dashed border-accent/50 bg-accent/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
                      {t.resources.status}
                    </span>

                    <h2 className="relative mt-4 text-lg font-medium text-text">
                      {content.title}
                    </h2>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                      {content.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ----------------------------------- CTA -------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,133,255,0.14),transparent_70%)]"
            />

            <div className="relative">
              <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
                {t.resources.ctaTitle}
              </h2>
              <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-muted">
                {t.resources.ctaDesc}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_38px_rgba(0,133,255,0.5)]"
                >
                  {t.resources.cta}
                  <IconArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 text-sm font-medium text-text backdrop-blur transition duration-300 hover:border-accent/60 hover:bg-accent/10"
                >
                  {t.resources.home}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
