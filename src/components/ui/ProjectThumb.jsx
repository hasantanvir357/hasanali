"use client";

import Image from "next/image";
import { useState } from "react";

import { getThumbUrl } from "@/lib/projects";
import MediaSlot from "@/components/ui/MediaSlot";
import { IconPlay, IconVideo } from "@/components/ui/icons";

/**
 * Project thumbnail with progressive fallback:
 * YouTube maxres → YouTube hq → cinematic placeholder slot.
 * Google Drive media has no thumbnail, so it shows the slot directly.
 */
export default function ProjectThumb({ project, sizes, className = "" }) {
  const [stage, setStage] = useState(0);

  const sources = [
    getThumbUrl(project, "maxresdefault"),
    getThumbUrl(project, "hqdefault"),
  ];
  const src = sources[stage];

  if (!src) {
    return (
      <MediaSlot
        icon={project.media === "gdrive" ? IconPlay : IconVideo}
        label={project.media === "gdrive" ? "GOOGLE DRIVE" : "VIDEO"}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={`${project.title} — ${project.subtitle}`}
      fill
      sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] ${className}`}
      onError={() => setStage((current) => current + 1)}
    />
  );
}
