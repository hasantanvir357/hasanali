"use client";

import { useState } from "react";

import site from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight, IconClock, IconMail } from "@/components/ui/icons";

const inputClass =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3.5 text-sm text-text outline-none transition duration-200 placeholder:text-muted/50 focus:border-accent/60 focus:bg-bg";

const labelClass =
  "mb-2 block text-[11px] font-medium tracking-[0.24em] text-accent uppercase";

/**
 * Contact form that composes a `mailto:` — no backend, no data storage.
 * Submitting opens the visitor's own email app with the message prefilled,
 * then a fallback line offers the direct address if nothing opened.
 */
export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return;

    const body = `${message}\n\n—\n${name}\n${email}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      subject || f.subjectDefault.replace("{name}", name)
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
    window.location.href = mailto;
  }

  return (
    <Reveal delay={80} className="mx-auto mt-10 max-w-2xl">
      <form
        onSubmit={handleSubmit}
        noValidate={false}
        className="glass rounded-2xl p-6 text-left md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-medium tracking-[0.24em] text-accent uppercase">
            {f.title}
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1.5 text-[11px] text-muted">
            <IconClock className="h-3.5 w-3.5 text-accent" />
            {f.responseLabel}: {f.responseValue}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="contact-name">
              {f.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={f.namePlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="contact-email">
              {f.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={f.emailPlaceholder}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="contact-subject">
              {f.subject}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder={f.subjectPlaceholder}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="contact-message">
              {f.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder={f.messagePlaceholder}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-bg transition duration-300 hover:shadow-[0_0_46px_rgba(0,133,255,0.55)]"
          >
            <IconMail className="h-4 w-4" />
            {f.submit}
            <IconArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
          </button>

          {status === "sent" ? (
            <p role="status" className="text-xs leading-relaxed text-muted">
              {f.sent}
            </p>
          ) : null}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted/80">{f.note}</p>

        <p className="mt-3 text-xs leading-relaxed text-muted/80">
          {f.fallback}{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-text underline decoration-line underline-offset-2 transition hover:text-accent"
          >
            {site.email}
          </a>
        </p>
      </form>
    </Reveal>
  );
}
