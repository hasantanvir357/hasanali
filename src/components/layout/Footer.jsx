"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import { NAV_ITEMS } from "@/components/layout/navItems";
import SocialLinks from "@/components/ui/SocialLinks";
import { IconMail, IconPin } from "@/components/ui/icons";

/* --------------------------------------------------------------------------
 * Copyright year as an external store.
 * - getServerSnapshot is a stable constant, so prerendering never touches
 *   `new Date()` (Next.js forbids unstable values in client components
 *   during the prerender pass).
 * - getSnapshot runs only in the browser, after hydration, and caches its
 *   result so React always sees a stable snapshot.
 * ------------------------------------------------------------------------ */
const BUILD_YEAR = 2026;
let clientYear = null;

function subscribeToYear() {
  return () => {};
}

function getYearSnapshot() {
  if (clientYear === null) {
    clientYear = new Date().getFullYear();
  }
  return clientYear;
}

function getServerYearSnapshot() {
  return BUILD_YEAR;
}

export default function Footer() {
  const { t, lang } = useLanguage();
  /* Lazy, hydration-safe year (see store above). */
  const year = useSyncExternalStore(
    subscribeToYear,
    getYearSnapshot,
    getServerYearSnapshot
  );

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      {/* restrained accent glow along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,133,255,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-accent/10 text-[11px] font-semibold tracking-wider text-accent">
                HB
              </span>
              <span className="text-[13px] font-medium tracking-[0.2em] text-text uppercase">
                {site.name}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted">{pick(site.role, lang)}</p>
            <p className="mt-1 max-w-sm text-sm text-muted/80 italic">
              {t.footer.tagline}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-text transition hover:text-accent"
            >
              <IconMail className="h-4 w-4 text-accent" />
              {site.email}
            </a>
          </div>

          <nav aria-label={t.footer.nav}>
            <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              {t.footer.nav}
            </p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition hover:text-text"
                  >
                    {t.nav[item.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
              {t.footer.social}
            </p>
            <SocialLinks orientation="column" className="gap-2" />

            <p className="mt-5 flex items-start gap-2 text-sm text-muted">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {pick(site.locationShort, lang)}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}. · {site.domain}
          </p>
          <a
            href="#top"
            className="transition hover:text-text focus-visible:text-text"
          >
            ↑ {t.a11y.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
