import { hero } from '../../content/home'
import { Button } from '../ui/Button'
import { HeroScene } from './HeroScene'
import { ServerRack } from './ServerRack'

// docs/LANDING_PAGE_SPEC.md section 4.3, with the background swapped for
// the animated Figma scene (HeroScene) instead of a flat two-ridge SVG --
// see docs/design/landing-v2-*.png. `bg-hero-night` is theme-aware (light
// sky in light mode, night sky in dark mode; see styles.css), matching
// whichever light-/dark- SVG set HeroScene renders.
//
// Height: min-h uses 100svh (not vh) so mobile browser chrome showing/
// hiding doesn't resize the hero underneath it, minus --sticky-offset
// (styles.css -- the combined top bar + header height, not --header-h
// alone, since the hero sits below both of them, not just the header).
// Content is vertically centered within that space. short-laptop:
// (styles.css's custom variant, 1024px+ wide but under 820px tall --
// the scaled-up-Windows-laptop case) trims padding/gaps/type further so
// nothing is cut off by the bottom of a short screen.
//
// Below lg: stacks (text column, then the rack, both centered, rack
// capped at 28rem) instead of the side-by-side desktop layout.
export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-var(--sticky-offset))] overflow-hidden bg-hero-night">
      <HeroScene />

      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-center justify-center gap-10 px-6 py-12 short-laptop:gap-6 short-laptop:py-8 lg:flex-row lg:gap-10 lg:py-14">
        <div className="max-w-[36rem] text-center lg:max-w-none lg:flex-[1.1] lg:basis-[520px] lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] text-muted">
            <span className="rounded bg-soft px-2 py-0.5 font-mono text-[13px] text-accent">
              {hero.chipLabel}
            </span>
            <span>{hero.pillText}</span>
          </div>

          <h1 className="mt-6 font-semibold text-head [font-size:clamp(2.25rem,1.2rem+3.2vw,4.25rem)] [letter-spacing:-0.02em] [line-height:1.05] short-laptop:mt-4 short-laptop:[font-size:clamp(2rem,1.2rem+2.4vw,3.25rem)]">
            {hero.headingLine1}
            <br />
            <span className="text-accent">{hero.headingLine2}</span>
          </h1>

          <p className="mt-6 max-w-[36rem] text-[clamp(1rem,0.9rem+0.35vw,1.2rem)] leading-[1.6] text-muted short-laptop:mt-3">
            {hero.paragraph}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 short-laptop:mt-5 lg:justify-start">
            <Button href={hero.primaryCta.href} size="hero" variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="hero" variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[28rem] lg:max-w-none lg:flex-1 lg:basis-[440px]">
          <ServerRack />
        </div>
      </div>
    </section>
  )
}
