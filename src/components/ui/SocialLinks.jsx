"use client";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIAL_ICONS } from "@/components/ui/icons";

/**
 * Social links from site.json.
 * While a URL is `null` (blueprint rule: never invent links — mark TODO),
 * the chip renders in a disabled "coming soon" state so the layout stays
 * complete. Adding a real `url` turns it into a normal external link.
 */
export default function SocialLinks({
  className = "",
  orientation = "row",
  showLabel = true,
}) {
  const { t } = useLanguage();

  return (
    <ul
      className={`flex flex-wrap items-center gap-2.5 ${
        orientation === "column" ? "flex-col items-start" : ""
      } ${className}`}
    >
      {site.socials.map((social) => {
        const Icon = SOCIAL_ICONS[social.id];
        if (!Icon) return null;

        const content = (
          <>
            <Icon className="h-4 w-4 shrink-0" />
            {showLabel ? (
              <span className="text-[12px] tracking-wide">{social.label}</span>
            ) : null}
          </>
        );

        const baseClass =
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition duration-200";

        return (
          <li key={social.id}>
            {social.url ? (
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} border-line bg-surface/60 text-text hover:border-accent/60 hover:bg-accent/10 hover:text-white`}
              >
                {content}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={t.footer.soon}
                className={`${baseClass} border-dashed border-line/80 bg-surface/30 text-muted/60`}
              >
                {content}
                <span
                  aria-hidden="true"
                  className="ml-0.5 h-1.5 w-1.5 rounded-full bg-muted/40"
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
