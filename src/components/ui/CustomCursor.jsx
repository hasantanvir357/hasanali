"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smooth glowing custom cursor — desktop only.
 * Disabled automatically on touch/coarse pointers and whenever the user
 * prefers reduced motion; the native cursor is restored in those cases.
 *
 * Elements opt into a label state with `data-cursor="VIEW PROJECT"`.
 */
export default function CustomCursor() {
  const rootRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  /* Capability gate: fine pointer + no reduced motion. */
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    sync();

    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  /* Movement loop + interactive-element detection. */
  useEffect(() => {
    if (!enabled) return undefined;

    const node = rootRef.current;
    const body = document.body;
    let frame = 0;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let started = false;

    body.classList.add("cursor-enabled");

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!started) {
        started = true;
        currentX = targetX;
        currentY = targetY;
        node?.classList.add("is-visible");
      }
    };

    const onLeave = () => {
      started = false;
      node?.classList.remove("is-visible");
    };

    const onOver = (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-cursor]")
          : null;
      setLabel(target ? target.getAttribute("data-cursor") || "" : "");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (node) {
        node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      body.classList.remove("cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`cursor-root ${label ? "is-label" : ""}`}
    >
      <span className="cursor-ring" />
      <span className="cursor-label">{label}</span>
    </div>
  );
}
