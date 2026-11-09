"use client";

import Projects from "@/components/sections/Projects";
import Showreel from "@/components/sections/Showreel";
import Gallery from "@/components/sections/Gallery";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WorkView() {
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
              <span>{t.work.label}</span>
              <span aria-hidden="true" className="h-px w-16 bg-line" />
            </p>
          </Reveal>
        </div>
      </div>

      <Projects
        as="h1"
        index={null}
        sectionId="projects"
        headingId="work-page-title"
        className="relative py-10 md:py-14"
      />
      <Showreel
        as="h2"
        index="02"
        headingId="work-showreel-title"
        className="relative border-t border-line/50 py-16 md:py-24"
      />
      <Gallery
        as="h2"
        index="03"
        headingId="work-gallery-title"
        className="relative border-t border-line/50 py-16 md:py-24"
      />
    </>
  );
}
