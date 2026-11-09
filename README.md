# Hasan Bin Ali — Portfolio

Bilingual (বাংলা / English) portfolio site for **Hasan Bin Ali** — video editor & cinematographer based in Dhaka, Bangladesh. Built with Next.js (App Router), React 19 and Tailwind CSS 4.

**Live domain:** [hasanbinali.com](https://hasanbinali.com)

## Features

- **Bilingual UI** — Bengali by default with a client-side EN/BN toggle; server renders deterministically (no hydration mismatches)
- **Editorial dark design** — custom cursor, scroll reveals, viewfinder hero frame, marquee client strip, lightbox gallery
- **Click-to-load video** — YouTube/Google Drive iframes only exist after an explicit play click (zero third-party cost on initial load)
- **Printable résumé** — `/resume` renders from the same data as the site and prints/exports to PDF via the browser dialog
- **Contact form** — composes a `mailto:` in the visitor's own email app; no backend, no data collection
- **SEO** — `sitemap.js`, `robots.js`, generated Open Graph card (`opengraph-image.jsx`), JSON-LD (`Person`, `WebSite`, `VideoObject`), per-page metadata
- **Accessible** — skip link, visible focus rings, focus-managed lightbox, `prefers-reduced-motion` support

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
├── app/                  # Routes (layout, pages, sitemap, robots, opengraph-image)
│   ├── about/ contact/ work/ resources/ resume/ projects/[slug]/
│   └── page.js           # Homepage (composes the sections below)
├── components/
│   ├── layout/           # Navbar, MobileNav, Footer, SkipLink, navItems
│   ├── sections/         # Hero, Stats, Clients, Services, Projects, Showreel,
│   │                     # Gallery, AboutPreview, ContactCTA, ContactForm
│   ├── providers/        # LanguageProvider (bilingual state)
│   ├── seo/              # JsonLd + site-wide Person/WebSite schema
│   └── ui/               # Icons, Reveal, Lightbox, VideoEmbed, MediaSlot…
├── data/                 # ← all site content lives here (no rebuild of logic needed)
│   ├── site.json         # Name, role, bio, stats, clients, services, education,
│   │                     # socials, showreel, hero image
│   ├── projects.json     # Project list (title, role, client, media id, description)
│   ├── gallery.json      # Behind-the-scenes gallery
│   └── translations.json # All UI copy (bn / en)
└── lib/                  # i18n helpers, project helpers, utils
```

## Editing content (no code changes needed)

| What | Where |
| --- | --- |
| Name, role, bio, stats, clients, services, education | `src/data/site.json` |
| Projects (title, role, client, YouTube/Drive id) | `src/data/projects.json` |
| Gallery images & captions | `src/data/gallery.json` |
| Any UI copy (bn/en) | `src/data/translations.json` |
| Navigation items | `src/components/layout/navItems.js` |

### Adding real photos

Drop files into `public/images/` using these names — they are already wired in the data files and fall back to the cinematic placeholder frame if missing:

```
public/images/hero.jpg              # hero portrait (4:5)
public/images/gallery-01.jpg … gallery-06.jpg
public/images/showreel-poster.jpg   # 16:9
```

### Activating the showreel & social links

- **Showreel:** set `showreel.id` (YouTube video id) in `src/data/site.json` and set `"todo": false`
- **Social links:** set each `url` in `site.json → socials` — chips switch from “coming soon” to live links automatically

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · Tailwind CSS 4
- No UI framework, no animation library — inline SVG icons and IntersectionObserver-based reveals
