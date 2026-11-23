type PlaceholderBoxProps = {
  label: string
  className?: string
}

// Striped placeholder box for a not-yet-supplied photo (docs/design/
// about-us/), used for team/founder/collage photos on /about-us. The
// homepage's About section has its own, different (solid-fill) 4-image
// slider placeholder -- AboutImageSlider.tsx -- which this doesn't touch
// or replace.
export function PlaceholderBox({ label, className = '' }: PlaceholderBoxProps) {
  return (
    <div className={`about-placeholder flex items-center justify-center rounded-2xl ${className}`}>
      <span className="rounded-full border border-about-card-border bg-about-card-bg px-3 py-1.5 font-mono text-[13px] text-about-secondary">
        {label}
      </span>
    </div>
  )
}
