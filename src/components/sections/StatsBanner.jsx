"use client";

import { useEffect, useRef, useState } from "react";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";

const COUNT_DURATION = 1500;
const FINAL_VALUES = [site.stats.years.value, site.stats.projects.value];

/**
 * Highlights banner: years, impactful projects and notable clients.
 * A single count-up animation runs the first time the banner enters the
 * viewport; reduced-motion users get the final numbers as soon as the
 * banner is seen (the setState lives in the observer callback, never in
 * the effect body).
 */
export default function StatsBanner() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const startedRef = useRef(false);
  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    let frameId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        /* Reduced motion: final numbers immediately, no animation. */
        if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          setValues(FINAL_VALUES);
          return;
        }

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / COUNT_DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValues(FINAL_VALUES.map((value) => Math.round(value * eased)));
          if (progress < 1) frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={t.stats.title}
      className="relative z-10 pb-4"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
            <span className="text-muted/70">01</span>
            <span>{t.stats.label}</span>
            <span aria-hidden="true" className="h-px w-16 bg-line" />
          </p>

          <div className="glass rounded-3xl px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-9 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
              <div className="text-center md:pr-8 md:text-left">
                <p className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <span className="tabular-nums">{values[0]}</span>
                  <span className="text-accent">{site.stats.years.suffix}</span>
                </p>
                <p className="mt-2.5 text-sm text-muted">
                  {pick(site.stats.years.label, lang)}
                </p>
              </div>

              <div className="text-center md:px-8 md:text-left">
                <p className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <span className="tabular-nums">{values[1]}</span>
                  <span className="text-accent">
                    {site.stats.projects.suffix}
                  </span>
                </p>
                <p className="mt-2.5 text-sm text-muted">
                  {pick(site.stats.projects.label, lang)}
                </p>
              </div>

              <div className="text-center md:pl-8 md:text-left">
                <p className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
                  {pick(site.stats.clientsLabel, lang)}
                </p>
                <ul className="mt-3.5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {site.clients.map((client) => (
                    <li
                      key={client}
                      className="rounded-full border border-line bg-bg/60 px-3 py-1.5 text-xs whitespace-nowrap text-text/90"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
