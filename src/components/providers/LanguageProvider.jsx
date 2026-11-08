"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import translations from "@/data/translations.json";
import { DEFAULT_LANG, LANGS, STORAGE_KEY } from "@/lib/i18n";

const LanguageContext = createContext(null);

/* --------------------------------------------------------------------------
 * localStorage-backed external store.
 * - getServerSnapshot always returns `bn`, so SSR output is deterministic
 *   and hydration never mismatches (React re-renders post-hydration if the
 *   saved choice differs).
 * - setLang writes the store and notifies subscribers synchronously.
 * ------------------------------------------------------------------------ */
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify() {
  listeners.forEach((callback) => callback());
}

function readStoredLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(saved) ? saved : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

function getSnapshot() {
  return readStoredLang();
}

function getServerSnapshot() {
  return DEFAULT_LANG;
}

/**
 * Global Bengali/English language state.
 * - Bengali (`bn`) is the default and is what the server renders.
 * - The saved choice is restored from localStorage without any
 *   setState-in-effect, so there is never a hydration mismatch.
 */
export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Keep the document language in sync (external system — DOM attribute). */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — still switch for this session */
    }
    notify();
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "bn" ? "en" : "bn"),
      t: translations[lang] ?? translations[DEFAULT_LANG],
    }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
