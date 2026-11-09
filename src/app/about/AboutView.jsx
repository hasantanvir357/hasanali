"use client";

import AboutPreview from "@/components/sections/AboutPreview";
import Services from "@/components/sections/Services";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutView() {
  const { t } = useLanguage();

  return (
    <>
      <div className="relative overflow-hidden pt-28 md:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,133,255,0.14),transparent)] blur-2xl"
        />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              <span className="text-muted/70">01</span>
              <span>{t.about.label}</span>
              <span aria-hidden="true" className="h-px w-16 bg-line" />
            </p>
          </Reveal>
        </div>
      </div>

      <AboutPreview
        as="h1"
        index={null}
        headingId="about-page-title"
        className="relative py-10 md:py-14"
        ctaHref="/contact"
      />
      <Services
        as="h2"
        index="02"
        headingId="about-services-title"
        className="relative border-t border-line/50 py-16 md:py-24"
      />
    </>
  );
}
