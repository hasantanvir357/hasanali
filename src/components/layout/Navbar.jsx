"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import LangToggle from "@/components/ui/LangToggle";
import { NAV_ITEMS } from "@/components/layout/navItems";

/**
 * Floating glassmorphism desktop navigation.
 * - Background opacity/blur deepens after scrolling (IntersectionObserver
 *   sentinel — no continuous scroll handler).
 * - Active item is tracked per route / per homepage section.
 */
export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const sentinelRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [sectionActive, setSectionActive] = useState("home");

  /* Scroll state via a 1px sentinel at the very top of the document. */
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

  /* Section tracking — homepage only; state updates happen in the
     IntersectionObserver callback (never synchronously in the effect). */
  useEffect(() => {
    if (pathname !== "/") return undefined;

    const sectionIds = ["top", "about", "work", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setSectionActive(entry.target.id === "top" ? "home" : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  /* Route-based active item derived during render (no effect needed). */
  const active = (() => {
    if (pathname?.startsWith("/resources")) return "resources";
    if (pathname?.startsWith("/projects")) return "work";
    if (pathname !== "/") return "home";
    return sectionActive;
  })();

  return (
    <>
      {/* Sentinel lives in document flow so it scrolls away with the page. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
      />

      <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 md:flex">
        <nav
          aria-label={t.a11y.primaryNav}
          className={`flex w-full max-w-4xl items-center justify-between gap-5 rounded-full py-2 pr-2 pl-5 transition-all duration-300 ${
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
            <span className="hidden text-[12px] font-medium tracking-[0.2em] text-text uppercase lg:inline">
              Hasan Bin Ali
            </span>
          </Link>

          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[13px] transition duration-200 ${
                      isActive
                        ? "text-text"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {t.nav[item.id]}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent shadow-[0_0_8px_rgba(0,133,255,0.9)]"
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
