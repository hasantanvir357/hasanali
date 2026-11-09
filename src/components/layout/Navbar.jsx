"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import LangToggle from "@/components/ui/LangToggle";
import { NAV_ITEMS } from "@/components/layout/navItems";

function isItemActive(pathname, item) {
  if (item.id === "home") return pathname === "/";
  if (item.id === "work") {
    return pathname === "/work" || pathname?.startsWith("/projects");
  }
  return pathname === item.href || pathname?.startsWith(`${item.href}/`);
}

/**
 * Floating glassmorphism desktop navigation.
 * Background opacity/blur deepens after scrolling (IntersectionObserver
 * sentinel — no continuous scroll handler).
 */
export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const sentinelRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />

      <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 md:flex">
        <nav
          aria-label={t.a11y.primaryNav}
          className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 transition-all duration-300 lg:gap-5 lg:pl-5 ${
            scrolled
              ? "glass-deep shadow-[0_12px_44px_rgba(0,0,0,0.5)]"
              : "glass"
          }`}
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={t.nav.home}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-accent/10 text-[11px] font-semibold tracking-wider text-accent transition duration-300 group-hover:bg-accent group-hover:text-bg">
              HB
            </span>
            <span className="hidden text-[12px] font-medium tracking-[0.2em] text-text uppercase xl:inline">
              Hasan Bin Ali
            </span>
          </Link>

          <ul className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(pathname, item);
              return (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-3 py-2 text-[13px] transition duration-200 lg:px-3.5 ${
                      active ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {t.nav[item.id]}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)] lg:inset-x-3.5"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <LangToggle />
        </nav>
      </header>
    </>
  );
}
