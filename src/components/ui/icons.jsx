/**
 * Inline SVG icon set — no icon library, zero extra runtime cost.
 * All icons inherit `currentColor` and accept a className.
 */

function Svg({ children, className = "", strokeWidth = 1.6 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* --------------------------------- navigation ------------------------------- */
export const IconHome = (p) => (
  <Svg {...p}>
    <path d="M3.5 10.8 12 3.6l8.5 7.2" />
    <path d="M5.8 9.7V20h12.4V9.7" />
  </Svg>
);

export const IconUser = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </Svg>
);

export const IconBriefcase = (p) => (
  <Svg {...p}>
    <rect x="3" y="7.5" width="18" height="12" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
    <path d="M3 12.5h18" />
  </Svg>
);

export const IconPackage = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 4 7.5v9l8 4 8-4v-9l-8-4Z" />
    <path d="M4 7.5 12 11.5l8-4" />
    <path d="M12 11.5v9" />
  </Svg>
);

export const IconMail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 7 8.2 6 8.2-6" />
  </Svg>
);

/* ---------------------------------- services -------------------------------- */
export const IconFilm = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7.5 5v14M16.5 5v14M3 12h18" />
  </Svg>
);

export const IconCamera = (p) => (
  <Svg {...p}>
    <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z" />
    <circle cx="12" cy="12.5" r="3.4" />
  </Svg>
);

export const IconSparkles = (p) => (
  <Svg {...p}>
    <path d="M11 3.5 12.6 9 18 10.6 12.6 12.2 11 17.6 9.4 12.2 4 10.6 9.4 9 11 3.5Z" />
    <path d="m18.2 15.4.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" />
  </Svg>
);

export const IconSliders = (p) => (
  <Svg {...p}>
    <path d="M6 4v16M12 4v16M18 4v16" />
    <path d="M3.5 8.5h5M9.5 15.5h5M15.5 10.5h5" />
  </Svg>
);

/* --------------------------------- actions ---------------------------------- */
export const IconPlay = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M8.5 5.4v13.2L19 12 8.5 5.4Z" />
  </svg>
);

export const IconArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </Svg>
);

export const IconChevronLeft = (p) => (
  <Svg {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Svg>
);

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Svg>
);

export const IconClose = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IconGlobe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z" />
  </Svg>
);

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const IconImage = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.7" cy="10" r="1.7" />
    <path d="m4 17 4.8-4.3 3.4 3 3-2.6L20 17" />
  </Svg>
);

export const IconVideo = (p) => (
  <Svg {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10.5 5-3v9l-5-3Z" />
  </Svg>
);

export const IconCalendar = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </Svg>
);

export const IconDownload = (p) => (
  <Svg {...p}>
    <path d="M12 4v10.5" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </Svg>
);

export const IconMonitor = (p) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
    <path d="M9 20.5h6M12 17v3.5" />
  </Svg>
);

/* ---------------------------------- social ---------------------------------- */
export const IconFacebook = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M13.8 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H8v3.1h2.6v8h3.2Z" />
  </svg>
);

export const IconYouTube = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8c1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  </svg>
);

export const IconInstagram = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M8.2 3.5h7.6A4.7 4.7 0 0 1 20.5 8.2v7.6a4.7 4.7 0 0 1-4.7 4.7H8.2a4.7 4.7 0 0 1-4.7-4.7V8.2a4.7 4.7 0 0 1 4.7-4.7Zm0 2A2.7 2.7 0 0 0 5.5 8.2v7.6a2.7 2.7 0 0 0 2.7 2.7h7.6a2.7 2.7 0 0 0 2.7-2.7V8.2a2.7 2.7 0 0 0-2.7-2.7H8.2Zm3.8 2.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm5.1-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
  </svg>
);

export const IconLinkedIn = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M4.5 3.5h15A1.5 1.5 0 0 1 21 5v14a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19V5a1.5 1.5 0 0 1 1.5-1.5ZM7.7 9.3h2.1v7.4H7.7V9.3Zm1.1-3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm3.1 3h2v1h.1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.5v4.1h-2.1v-3.6c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v3.7h-2.1V9.3Z" />
  </svg>
);

export const SOCIAL_ICONS = {
  facebook: IconFacebook,
  youtube: IconYouTube,
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
};
