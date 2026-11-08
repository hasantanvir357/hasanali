"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const OPTIONS = [
  { code: "bn", label: "বাং" },
  { code: "en", label: "EN" },
];

/** Compact segmented BN/EN glass switch — instant, no page reload. */
export default function LangToggle({ className = "" }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.langSwitch}
      className={`flex shrink-0 items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 backdrop-blur ${className}`}
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wider transition duration-200 ${
              isActive
                ? "bg-accent text-bg shadow-[0_0_16px_rgba(0,133,255,0.45)]"
                : "text-muted hover:text-text"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
