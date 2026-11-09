"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { code: "bn", label: "বাং" },
  { code: "en", label: "EN" },
];

/** Compact segmented BN/EN glass switch — instant, no page reload. */
export default function LangToggle({ className = "" }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t.a11y.langSwitch}
      className={cn(
        "flex shrink-0 items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 backdrop-blur",
        className
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setLang(option.code)}
            className={cn(
              "min-w-[2.5rem] rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wider transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
              isActive
                ? "bg-accent text-bg shadow-[0_0_16px_rgba(0,133,255,0.45)]"
                : "text-muted hover:text-text"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
