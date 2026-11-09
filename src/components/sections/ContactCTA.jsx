"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { IconMail, IconPin } from "@/components/ui/icons";

/** Editorial high-impact closing CTA with contact cards and socials. */
export default function ContactCTA({
  as: Heading = "h2",
  index = "08",
  sectionId = "contact",
  headingId = "contact-title",
  className = "relative scroll-mt-24 overflow-hidden py-24 md:py-32",
  children = null,
}) {
  const { t, lang } = useLanguage();

  const labelClass =
    "text-[11px] font-medium tracking-[0.24em] text-accent uppercase";

  return (
    <section id={sectionId} aria-labelledby={headingId} className={className}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(55%_100%_at_50%_0%,rgba(0,133,255,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="mb-6 flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
            {index ? <span className="text-muted/70">{index}</span> : null}
            <span>{t.contact.label}</span>
          </p>

          <Heading
            id={headingId}
            className="mx-auto max-w-4xl text-[clamp(2.1rem,6vw,4.25rem)] leading-[1.1] font-semibold tracking-tight text-balance"
          >
            <span className="block">{t.contact.titleLine1}</span>
            <span className="block text-accent">{t.contact.titleLine2}</span>
          </Heading>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
            {t.contact.desc}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_46px_rgba(0,133,255,0.55)]"
            >
              <IconMail className="h-4 w-4" />
              {t.contact.cta}
            </a>
          </div>
        </Reveal>

        {children}

        <Reveal
          delay={140}
          className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <div className="glass rounded-2xl p-5 text-left">
            <p className={labelClass}>{t.contact.emailLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2.5 block text-[15px] break-words text-text transition hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <div className="glass rounded-2xl p-5 text-left">
            <p className={labelClass}>{t.contact.locationLabel}</p>
            <p className="mt-2.5 flex items-start gap-2 text-[15px] text-text">
              <IconPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
              {pick(site.location, lang)}
            </p>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-11 flex flex-col items-center gap-4">
          <p className={labelClass}>{t.contact.socialLabel}</p>
          <SocialLinks className="justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
