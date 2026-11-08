"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Viewport scroll reveal built on IntersectionObserver (no animation library).
 * Content stays visible when JS is off (the `.js-reveal` gate lives in an
 * inline head script) and when prefers-reduced-motion is active.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    /* Reduced-motion users never get here as "hidden": the global
       prefers-reduced-motion CSS rule forces `.reveal` to opacity 1,
       so the observer only serves normal-motion visitors. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
