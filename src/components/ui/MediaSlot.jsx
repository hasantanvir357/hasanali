import { IconImage } from "@/components/ui/icons";

/**
 * Cinematic placeholder frame for image slots that have no photo yet.
 * The site renders complete without assets; dropping a file into
 * `public/images/` and setting its `src` in the data file swaps it in.
 */
export default function MediaSlot({ label, icon, className = "" }) {
  const Icon = icon ?? IconImage;

  return (
    <div
      className={`media-slot flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg/60 backdrop-blur-sm">
        <Icon className="h-5 w-5 text-accent/80" />
      </span>
      {label ? (
        <p className="px-4 text-center text-[10px] font-medium tracking-[0.3em] text-muted uppercase">
          {label}
        </p>
      ) : null}
    </div>
  );
}
