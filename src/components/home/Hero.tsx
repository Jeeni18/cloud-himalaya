import { AisleBackground } from '../hero/AisleBackground'
import { hero } from '../../content/home'
import { Button } from '../ui/Button'

// docs/LANDING_PAGE_SPEC.md section 4.3. The background is the animated
// "walk the aisle" data hall (docs/design/hero-aisle/) drawn on a canvas
// behind the copy -- it replaced the layered mountain/cloud SVG scene,
// so HeroScene/HeroParallax and the ServerRack card are no longer used
// here.
//
// Height: min-h uses 100svh (not vh) so mobile browser chrome showing/
// hiding doesn't resize the hero underneath it, minus --sticky-offset
// (styles.css -- the combined top bar + header height, not --header-h
// alone, since the hero sits below both of them, not just the header).
// short-laptop: (styles.css's custom variant, 1024px+ wide but under
// 820px tall -- the scaled-up-Windows-laptop case) trims padding, gaps
// and type so nothing is cut off by the bottom of a short screen.
//
// The copy is server-rendered and visible immediately; the canvas paints
// behind it once the client component mounts, and `bg-hero-aisle`
// matches the canvas's own background colour so there is no flash of a
// different shade in between.
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--sticky-offset))] flex-col overflow-hidden bg-hero-aisle">
      <AisleBackground signs={hero.aisleSigns} />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center gap-10 px-6 py-12 short-laptop:gap-6 short-laptop:py-8 lg:py-14">
        <div className="max-w-[36rem] lg:max-w-[34rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] text-muted">
            <span className="rounded bg-soft px-2 py-0.5 font-mono text-[13px] whitespace-nowrap text-accent">
              {hero.chipLabel}
            </span>
            <span>{hero.pillText}</span>
          </div>

          <h1 className="mt-6 font-semibold text-hero-head [font-size:clamp(2.25rem,1.2rem+3.2vw,4.25rem)] [letter-spacing:-0.02em] [line-height:1.05] short-laptop:mt-4 short-laptop:[font-size:clamp(2rem,1.2rem+2.4vw,3.25rem)]">
            {hero.headingLine1}
            <br />
            <span className="text-hero-accent">{hero.headingLine2}</span>
          </h1>

          <p className="mt-6 max-w-[36rem] text-[clamp(1rem,0.9rem+0.35vw,1.2rem)] leading-[1.6] text-hero-body short-laptop:mt-3">
            {hero.paragraph}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 short-laptop:mt-5">
            <Button
              className="hero-primary-cta"
              href={hero.primaryCta.href}
              size="hero"
              variant="primary"
            >
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="hero" variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* Below lg the stat cards can't sit in the corner without
              covering the aisle, so they follow the buttons as a single
              row of compact chips -- and drop out entirely on the
              narrowest phones, where even chips would wrap badly. */}
          <ul className="mt-7 hidden flex-wrap gap-2 min-[360px]:flex lg:hidden">
            {hero.stats.map((stat) => (
              <li
                className="rounded-xl border border-hero-card-border bg-hero-card px-3 py-2 backdrop-blur-[10px]"
                key={stat.label}
              >
                <span className="font-mono text-[10px] text-hero-card-label">{stat.label}</span>
                <span className="ml-2 text-[14px] font-semibold text-hero-card-value">
                  {stat.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="relative mx-auto hidden w-full max-w-[1280px] justify-end gap-2.5 px-6 pb-8 lg:flex">
        {hero.stats.map((stat) => (
          <li
            className="rounded-2xl border border-hero-card-border bg-hero-card px-4 py-3 backdrop-blur-[10px]"
            key={stat.label}
          >
            <span className="block font-mono text-[11px] text-hero-card-label">{stat.label}</span>
            <span className="block text-[22px] font-semibold text-hero-card-value">
              {stat.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
