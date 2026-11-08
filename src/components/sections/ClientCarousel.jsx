"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Reveal from "@/components/ui/Reveal";

/* Enough repeats that the half-track stays wider than an ultra-wide screen,
   so the -50% loop never shows a gap. Text-only chips: negligible cost. */
const REPEATS = 8;

/**
 * Infinite auto-scrolling client logo carousel.
 * Pure CSS animation (transform only) — zero JavaScript per frame, so it
 * has no impact on page load. Pauses on hover/focus for readability.
 */
export default function ClientCarousel() {
  const { t } = useLanguage();
  const items = site.clients;
  const track = Array.from({ length: REPEATS }, (_, repeat) =>
    items.map((client, index) => ({
      key: `${repeat}-${index}`,
      client,
      isOriginal: repeat === 0,
    }))
  ).flat();

  return (
    <section
      aria-labelledby="clients-title"
      className="relative py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              <span className="text-muted/70">02</span>
              <span>{t.clients.label}</span>
              <span aria-hidden="true" className="h-px w-16 bg-line" />
            </p>
            <h2
              id="clients-title"
              className="text-balance text-3xl leading-[1.1] font-medium tracking-tight md:text-4xl"
            >
              {t.clients.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            {t.clients.desc}
          </p>
        </Reveal>
      </div>

      <div
        className="marquee"
        aria-label={t.clients.marqueeLabel}
        role="group"
      >
        <ul className="marquee__track">
          {track.map((entry) => (
            <li
              key={entry.key}
              aria-hidden={entry.isOriginal ? undefined : "true"}
              className="mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface/50 px-7 py-4 backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent/70"
              />
              <span className="text-sm font-medium tracking-[0.16em] whitespace-nowrap text-text/85 uppercase">
                {entry.client}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
