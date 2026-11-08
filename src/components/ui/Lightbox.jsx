"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { formatTemplate, pick } from "@/lib/i18n";
import MediaSlot from "@/components/ui/MediaSlot";
import {
  IconChevronLeft,
  IconChevronRight,
  IconClose,
} from "@/components/ui/icons";

/**
 * Accessible media lightbox: Escape to close, arrow keys to navigate,
 * focus is moved in on open and restored on close, body scroll locked,
 * Tab is trapped inside the dialog, outside click closes.
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext, labels }) {
  const containerRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const handlersRef = useRef({ onClose, onPrev, onNext });

  /* Sync latest handlers after render — refs must never be written
     during render itself. */
  useEffect(() => {
    handlersRef.current = { onClose, onPrev, onNext };
  });

  const open = index >= 0 && index < items.length;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return undefined;

    restoreRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      const { onClose: close, onPrev: prev, onNext: next } = handlersRef.current;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
        return;
      }
      if (event.key === "Tab") {
        const focusables = containerRef.current?.querySelectorAll(
          "button:not([disabled]), a[href]"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handlersRef.current.onClose();
      }}
      role="presentation"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={pick(item.caption, labels.lang)}
        className="lightbox-panel relative w-full max-w-5xl"
      >
        <div
          className="relative mx-auto w-auto max-w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          style={{ aspectRatio: item.ratio, height: "min(70vh, 620px)" }}
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={pick(item.alt, labels.lang)}
              fill
              sizes="100vw"
              className="object-contain"
            />
          ) : (
            <MediaSlot />
          )}

          <button
            type="button"
            onClick={onPrev}
            aria-label={labels.prev}
            className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-text backdrop-blur transition hover:border-accent hover:text-accent"
          >
            <IconChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={labels.next}
            className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/80 text-text backdrop-blur transition hover:border-accent hover:text-accent"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>

        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-sm text-muted">{pick(item.caption, labels.lang)}</p>
          <p className="text-[11px] tracking-[0.2em] text-muted/70">
            {formatTemplate(labels.counter, {
              current: index + 1,
              total: items.length,
            })}
          </p>
        </figcaption>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute -top-14 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/80 text-text backdrop-blur transition hover:border-accent hover:text-accent"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
