"use client";

import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main
      id="main"
      className="flex min-h-[72vh] flex-col items-center justify-center px-5 py-32 text-center"
    >
      <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-10 bg-line" />
        404
        <span aria-hidden="true" className="h-px w-10 bg-line" />
      </p>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        {t.notFound.desc}
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_38px_rgba(0,133,255,0.5)]"
      >
        {t.notFound.cta}
      </Link>
    </main>
  );
}
