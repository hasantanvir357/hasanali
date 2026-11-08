export const LANGS = ["bn", "en"];
export const DEFAULT_LANG = "bn";
export const STORAGE_KEY = "hasan_portfolio_lang";

/**
 * Pick a bilingual value: { bn, en } → string.
 * Plain strings pass through unchanged (client names / original titles
 * are intentionally never translated).
 */
export function pick(value, lang = DEFAULT_LANG) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.bn ?? value.en ?? "";
}

/** Replace {placeholders} in a template string. */
export function formatTemplate(template, vars = {}) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.split(`{${key}}`).join(String(value)),
    template ?? ""
  );
}
