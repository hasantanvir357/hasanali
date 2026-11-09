"use client";

import Image from "next/image";
import { useState } from "react";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import MediaSlot from "@/components/ui/MediaSlot";
import SocialLinks from "@/components/ui/SocialLinks";
import { IconArrowRight, IconPin } from "@/components/ui/icons";

/**
 * Editorial hero: eyebrow (.REC), oversized name, role, bilingual bio,
 * CTAs and socials on the left; cinematic viewfinder frame on the right.
 * The frame renders fully even before a real photo is dropped in.
 */
export default function Hero() {
  const { t, lang } = useLanguage();
  /* Falls back to the placeholder frame if the photo file is missing. */
  const [heroFailed, setHeroFailed] = useState(false);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-24"
    >
      {/* ambient accent glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-52 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,133,255,0.17),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[380px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(0,133,255,0.1),transparent)] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* ------------------------------- left ------------------------------- */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-2 text-[11px] tracking-[0.16em] text-muted backdrop-blur">
            <span className="rec-dot" aria-hidden="true" />
            {pick(site.hero.eyebrow, lang)}
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(2.6rem,8vw,4.75rem)] leading-[1.03] font-semibold tracking-tight text-balance"
          >
            <span className="hero-line">
              <span style={{ "--line-delay": "60ms" }}>Hasan Bin Ali</span>
            </span>
          </h1>

          <p
            className="mt-4 text-lg font-medium tracking-wide text-accent md:text-2xl"
            style={{ animation: "rise-in 0.9s cubic-bezier(0.22,1,0.36,1) 260ms both" }}
          >
            {pick(site.role, lang)}
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-muted md:text-base">
            {pick(site.hero.bio, lang)}
          </p>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)]"
              />
              {t.hero.status}
            </span>
            <span aria-hidden="true" className="text-line">
              ·
            </span>
            <span>{t.hero.basedIn}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_38px_rgba(0,133,255,0.5)]"
            >
              {t.hero.ctaWork}
              <IconArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 text-sm font-medium text-text backdrop-blur transition duration-300 hover:border-accent/60 hover:bg-accent/10"
            >
              {t.hero.ctaContact}
            </a>
          </div>

          <SocialLinks className="mt-9" />
        </div>

        {/* ------------------------------- right ------------------------------ */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_100px_rgba(0,0,0,0.55)] md:shadow-[0_40px_110px_rgba(0,0,0,0.6)]">
            {site.hero.image && !heroFailed ? (
              <Image
                src={site.hero.image}
                alt={pick(site.hero.imageAlt, lang)}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 44vw"
                className="object-cover"
                onError={() => setHeroFailed(true)}
              />
            ) : (
              <MediaSlot label="HERO FRAME" />
            )}

            {/* viewfinder treatment */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-bg/75 via-transparent to-bg/35"
            />

            <span
              aria-hidden="true"
              className="absolute top-5 left-5 z-[3] h-7 w-7 border-t border-l border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute top-5 right-5 z-[3] h-7 w-7 border-t border-r border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-5 left-5 z-[3] h-7 w-7 border-b border-l border-accent/70"
            />
            <span
              aria-hidden="true"
              className="absolute right-5 bottom-5 z-[3] h-7 w-7 border-r border-b border-accent/70"
            />

            {/* center crosshair */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-[3] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
            >
              <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-white/30" />
              <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/30" />
            </span>

            <div className="absolute inset-x-0 top-0 z-[3] flex items-center justify-between px-6 py-5 text-[10px] tracking-[0.3em] text-text/85 uppercase">
              <span className="flex items-center gap-2">
                <span className="rec-dot" aria-hidden="true" />
                REC
              </span>
              <span className="text-muted/80">{t.hero.frameLabel} 4:5</span>
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 z-[3] flex items-center justify-between px-6 py-5 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <IconPin className="h-3.5 w-3.5 text-accent" />
                {pick(site.locationShort, lang)}
              </span>
              <span className="tracking-[0.2em] uppercase">
                {site.domain}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
