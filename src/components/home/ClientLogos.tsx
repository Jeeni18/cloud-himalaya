import { clientLogos } from '../../content/home'

const LOGO_CLASS =
  'flex h-16 w-[160px] shrink-0 items-center justify-center rounded-lg border border-dashed border-line-strong font-mono text-xs text-subtle'

// Trust bar, section (a) of the new homepage (docs/design/landing-preview.html).
// Phase 2: real logos from Payload. Phase 1 renders placeholders, scrolling
// left-to-right on a CSS-only loop -- see styles.css's ".logos-track"
// comment for how the track/duplicate/keyframe combination makes that
// loop seamless, and its reduced-motion override for the static fallback
// (no JS needed either way: this stays a server component). Below lg
// (1024px) the heading stacks above the logo strip instead of squeezing
// beside it -- explicit flex-col/lg:flex-row rather than relying on
// flex-wrap, so it stacks at a predictable breakpoint instead of only
// once the (very shrinkable) logo strip runs out of room entirely.
export function ClientLogos() {
  return (
    <section className="border-b border-line bg-section-trust">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-[var(--section-x)] py-[var(--section-y)] lg:flex-row lg:items-center lg:gap-8">
        <div className="shrink-0 lg:basis-[220px]">
          <p className="text-lg font-semibold text-head">{clientLogos.heading}</p>
          <p className="mt-1 text-sm text-subtle">{clientLogos.sub}</p>
        </div>

        <div className="logos-marquee logos-mask relative min-w-0 w-full flex-1 overflow-hidden">
          <div className="logos-track items-center gap-3.5">
            {clientLogos.logos.map((name) => (
              <div className={LOGO_CLASS} key={name}>
                {name}
              </div>
            ))}

            <div aria-hidden="true" className="logos-dup flex items-center gap-3.5">
              {clientLogos.logos.map((name) => (
                <div className={LOGO_CLASS} key={`dup-${name}`}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
