"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { IconGlobe } from "@/components/ui/icons";

function isActive(pathname, item) {
  if (item.id === "home") return pathname === "/";
  if (item.id === "work") {
    return pathname === "/work" || pathname?.startsWith("/projects");
  }
  return pathname === item.href || pathname?.startsWith(`${item.href}/`);
}

/**
 * Fixed app-style bottom navigation for mobile.
 * Icon + short label, large touch targets, safe-area inset support,
 * and a compact BN/EN language switch as the sixth cell.
 */
export default function MobileNav() {
  const { t, lang, toggleLang } = useLanguage();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t.a11y.bottomNav}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div
        className="mx-2 mb-2 overflow-hidden rounded-2xl border border-line bg-bg/90 shadow-[0_-8px_44px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:mx-3 sm:mb-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item);
            return (
              <li key={item.id} className="min-w-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative flex min-h-[58px] w-full flex-col items-center justify-center gap-0.5 px-0.5 py-2 transition sm:gap-1 sm:px-1"
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 transition ${
                      active ? "text-accent" : "text-muted"
                    }`}
                  />
                  <span
                    className={`w-full px-0.5 text-center text-[9px] leading-[1.1] transition [overflow-wrap:anywhere] sm:text-[9.5px] sm:leading-tight ${
                      active ? "text-text" : "text-muted"
                    }`}
                  >
                    {t.nav[item.id]}
                  </span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)] sm:inset-x-4"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}

          <li className="min-w-0">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.a11y.langSwitch}
              className="flex min-h-[58px] w-full flex-col items-center justify-center gap-0.5 border-l border-line/70 px-0.5 py-2 transition hover:bg-accent/5 sm:gap-1 sm:px-1"
            >
              <IconGlobe className="h-[18px] w-[18px] shrink-0 text-accent" />
              <span className="text-[9px] font-semibold tracking-wider text-text sm:text-[9.5px]">
                {lang === "bn" ? "বাং" : "EN"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
