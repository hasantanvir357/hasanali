import Reveal from "@/components/ui/Reveal";

/**
 * Editorial section heading: index number + label rule + display title,
 * with an optional right-aligned action slot (filters, links…).
 */
export default function SectionHeading({
  index,
  label,
  title,
  desc,
  action,
  id,
  as: Tag = "h2",
}) {
  return (
    <Reveal
      className={`mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between ${
        action ? "" : "md:max-w-3xl"
      }`}
    >
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-accent uppercase">
          {index ? <span className="text-muted/70">{index}</span> : null}
          <span>{label}</span>
          <span aria-hidden="true" className="h-px w-10 bg-line md:w-16" />
        </p>
        <Tag
          id={id}
          className="text-balance text-3xl leading-[1.08] font-medium tracking-tight text-text md:text-5xl"
        >
          {title}
        </Tag>
        {desc ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            {desc}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
