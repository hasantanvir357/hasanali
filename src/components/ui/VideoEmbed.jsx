"use client";

import Image from "next/image";
import { useState } from "react";

import { getEmbedUrl } from "@/lib/projects";
import MediaSlot from "@/components/ui/MediaSlot";
import { IconPlay, IconVideo } from "@/components/ui/icons";

/**
 * Click-to-load video embed.
 * No iframe exists in the DOM until the viewer presses play, which keeps
 * third-party video scripts completely out of the initial page load
 * (Core Web Vitals friendly). YouTube plays muted-autoplay after the
 * explicit click; Google Drive previews use their own player.
 */
export default function VideoEmbed({
  project,
  poster,
  posterAlt = "",
  labels,
}) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const embedUrl = getEmbedUrl(project);
  const title = labels.title;

  if (playing && embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
      {poster && !posterFailed ? (
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setPosterFailed(true)}
        />
      ) : (
        <MediaSlot icon={IconVideo} label="VIDEO" />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/25 to-bg/40"
      />

      {unavailable ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-bg/85 px-6 text-center backdrop-blur-sm">
          <p className="text-lg font-medium text-text">
            {labels.comingTitle}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {labels.comingDesc}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => (embedUrl ? setPlaying(true) : setUnavailable(true))}
          aria-label={labels.play}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-bg/70 text-text backdrop-blur transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg group-hover:shadow-[0_0_44px_rgba(0,133,255,0.55)] md:h-20 md:w-20">
            <IconPlay className="h-6 w-6 translate-x-0.5 md:h-7 md:w-7" />
          </span>
          <span className="text-[11px] font-medium tracking-[0.3em] text-text/90 uppercase">
            {labels.play}
          </span>
        </button>
      )}
    </div>
  );
}
