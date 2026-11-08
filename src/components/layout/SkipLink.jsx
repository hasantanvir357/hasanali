"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:border focus:border-accent focus:bg-surface focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-text"
    >
      {t.a11y.skip}
    </a>
  );
}
