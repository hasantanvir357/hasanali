"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { IconGlobe } from "@/components/ui/icons";

/**
 * Fixed app-style bottom navigation for mobile.
 * Icon + short label, large touch targets, safe-area inset support,
 * and a compact BN/EN language switch as the sixth cell.
 */
export default function MobileNav() {
  const { t, lang, toggleLang } = useLanguage();
  const pathname = usePathname();

  const isActive = (item) => {
    if (item.id === "resources") return pathname?.startsWith("/resources");
    if (item.id === "work") return pathname?.startsWith("/projects");
    if (pathname !== "/") return false;
    return item.id === "home";
  };

  return (
    <nav
      aria-label={t.a11y.bottomNav}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div
        className="mx-3 mb-3 overflow-hidden rounded-2xl border border-line bg-bg/88 shadow-[0_-8px_44px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActiveItem = isActive(item);
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActiveItem ? "page" : undefined}
                  className="relative flex min-h-[56px] w-full flex-col items-center justify-center gap-1 px-1 py-2"
                >
                  <Icon
                    className={`h-[18px] w-[18px] transition ${
                      isActiveItem ? "text-accent" : "text-muted"
                    }`}
                  />
                  <span
                    className={`max-w-full truncate px-0.5 text-[9.5px] leading-tight transition ${
                      isActiveItem ? "text-text" : "text-muted"
                    }`}
                  >
                    {t.nav[item.id]}
                  </span>
                  {isActiveItem ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)]"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}

          <li>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.a11y.langSwitch}
              aria-pressed={lang === "bn"}
              className="flex min-h-[56px] w-full flex-col items-center justify-center gap-1 border-l border-line/70 px-1 py-2"
            >
              <IconGlobe className="h-[18px] w-[18px] text-accent" />
              <span className="text-[9.5px] leading-tight font-semibold tracking-wider text-text">
                {lang === "bn" ? "বাং" : "EN"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
