"use client";

import Image from "next/image";
import { useState } from "react";

import gallery from "@/data/gallery.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { pick } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import MediaSlot from "@/components/ui/MediaSlot";

/**
 * Behind-the-scenes masonry gallery (CSS columns — no JS layout work)
 * with an accessible lightbox: Escape / arrow keys, focus management,
 * scroll lock and safe outside-click close.
 */
export default function Gallery({
  as = "h2",
  index = "06",
  headingId = "gallery-title",
  className = "relative py-16 md:py-24",
}) {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = gallery.length;

  const labels = {
    lang,
    close: t.a11y.close,
    prev: t.a11y.prev,
    next: t.a11y.next,
    counter: t.gallery.counter,
  };

  return (
    <section aria-labelledby={headingId} className={className}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index={index}
          label={t.gallery.label}
          title={t.gallery.title}
          desc={t.gallery.desc}
          id={headingId}
          as={as}
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((item, itemIndex) => (
            <Reveal
              key={item.id}
              delay={(itemIndex % 3) * 80}
              className="mb-5 break-inside-avoid"
            >
              <figure className="group relative m-0 overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-accent/45">
                <button
                  type="button"
                  onClick={() => setActiveIndex(itemIndex)}
                  data-cursor="ZOOM"
                  aria-label={`${t.gallery.open}: ${pick(item.caption, lang)}`}
                  className="block w-full"
                >
                  <span
                    className="relative block w-full"
                    style={{ aspectRatio: item.ratio }}
                  >
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={pick(item.alt, lang)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <MediaSlot />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                    />
                  </span>
                </button>

                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] translate-y-1 px-4 py-3.5 text-[13px] text-text opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  {pick(item.caption, lang)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={gallery}
        index={activeIndex}
        onClose={() => setActiveIndex(-1)}
        onPrev={() =>
          setActiveIndex((current) => (current - 1 + total) % total)
        }
        onNext={() => setActiveIndex((current) => (current + 1) % total)}
        labels={labels}
      />
    </section>
  );
}
