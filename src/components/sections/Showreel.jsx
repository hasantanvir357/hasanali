"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoEmbed from "@/components/ui/VideoEmbed";

/**
 * Showreel — click-to-load player. The iframe only exists after an
 * explicit click (zero third-party video cost on page load). While no
 * video ID exists in site.json the button reveals a coming-soon panel;
 * adding an ID activates the live embed with no code changes.
 */
export default function Showreel({
  as = "h2",
  index = "05",
  headingId = "showreel-title",
  className = "relative py-16 md:py-24",
}) {
  const { t, lang } = useLanguage();
  const showreel = site.showreel;

  const labels = {
    play: t.showreel.play,
    comingTitle: t.showreel.comingTitle,
    comingDesc: t.showreel.comingDesc,
    title: "Showreel — Hasan Bin Ali",
  };

  return (
    <section aria-labelledby={headingId} className={className}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index={index}
          label={t.showreel.label}
          title={t.showreel.title}
          desc={t.showreel.desc}
          id={headingId}
          as={as}
        />

        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(0,133,255,0.14),transparent)] blur-2xl"
          />
          <div className="relative">
            <VideoEmbed
              project={{ media: showreel.type, id: showreel.id }}
              poster={showreel.poster}
              posterAlt={pick(showreel.posterAlt, lang)}
              labels={labels}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
