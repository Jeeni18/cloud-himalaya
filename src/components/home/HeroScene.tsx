import { HeroParallax } from './HeroParallax'

/*
 * These are small, locally-hosted decorative SVGs (public/hero/), each
 * duplicated for the seamless drift loop -- next/image's required
 * width/height and its optimization pipeline add nothing for vector
 * files this small and actively complicate the side-by-side duplication.
 */
/* eslint-disable @next/next/no-img-element */

// Fixed (not random) star positions -- generated once by hand, not with
// Math.random() at render time, which would differ between the server
// and client render and trigger a hydration mismatch. They only *look*
// randomly placed; the underlying data is deterministic.
const STARS = [
  { x: 4, y: 10, size: 2, duration: 3.2, delay: 0 },
  { x: 11, y: 22, size: 1.5, duration: 4.5, delay: 0.6 },
  { x: 18, y: 6, size: 1.5, duration: 5.1, delay: 1.3 },
  { x: 24, y: 30, size: 2, duration: 2.8, delay: 0.2 },
  { x: 31, y: 14, size: 1.5, duration: 3.9, delay: 2.1 },
  { x: 38, y: 24, size: 2, duration: 4.8, delay: 0.9 },
  { x: 44, y: 8, size: 1.5, duration: 3.4, delay: 1.7 },
  { x: 49, y: 18, size: 2, duration: 5.6, delay: 0.4 },
  { x: 55, y: 28, size: 1.5, duration: 2.6, delay: 2.4 },
  { x: 61, y: 12, size: 2, duration: 4.1, delay: 1.1 },
  { x: 67, y: 20, size: 1.5, duration: 3.7, delay: 0.7 },
  { x: 72, y: 7, size: 1.5, duration: 5.3, delay: 1.9 },
  { x: 78, y: 26, size: 2, duration: 2.9, delay: 0.3 },
  { x: 83, y: 16, size: 1.5, duration: 4.4, delay: 2.6 },
  { x: 89, y: 9, size: 2, duration: 3.1, delay: 1.4 },
  { x: 94, y: 23, size: 1.5, duration: 5.8, delay: 0.5 },
  { x: 8, y: 34, size: 1.5, duration: 4.2, delay: 1.6 },
  { x: 15, y: 40, size: 2, duration: 3.5, delay: 2.2 },
  { x: 28, y: 36, size: 1.5, duration: 4.9, delay: 0.1 },
  { x: 42, y: 32, size: 1.5, duration: 2.7, delay: 1.2 },
  { x: 58, y: 38, size: 2, duration: 5.4, delay: 0.8 },
  { x: 70, y: 33, size: 1.5, duration: 3.3, delay: 2.0 },
  { x: 86, y: 37, size: 1.5, duration: 4.6, delay: 1.5 },
  { x: 96, y: 4, size: 1.5, duration: 3.8, delay: 0.95 },
] as const

// Scene layers from the Figma hero design (docs/figma-hero-notes.md).
// Mountains Far/Mid/Near and Clouds Back/Front are real exported SVGs
// (public/hero/) -- Stars and Horizon Glow have no equivalent asset (the
// Figma export budget covered only the 5 layers above, per theme), so
// they're approximated in CSS: Stars as a fixed set of twinkling dots
// (dark mode only, matching the design's night sky), Horizon Glow as a
// gradient band. Data Network is left out entirely rather than guessed
// at -- there's no asset or position data for it.
export function HeroScene() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <HeroParallax>
        <div className="absolute inset-0 hidden dark:block" data-depth="0.1">
          {STARS.map((star, index) => (
            <span
              className="hero-star absolute rounded-full bg-white"
              key={index}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                ['--hero-twinkle-duration' as string]: `${star.duration}s`,
                ['--hero-delay' as string]: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-x-[-24px] bottom-0 hidden h-2/5 w-[calc(100%+48px)] bg-gradient-to-t from-hero-sky/25 via-hero-sky/5 to-transparent dark:block"
          data-depth="0.2"
        />

        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 w-[calc(100%+48px)] dark:hidden"
          data-depth="0.35"
          src="/hero/light-mountains-far.svg"
        />
        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 hidden w-[calc(100%+48px)] dark:block"
          data-depth="0.35"
          src="/hero/dark-mountains-far.svg"
        />

        {/*
          No overflow-hidden here -- the CSS blur below needs to bleed past
          this wrapper's edges. Only the hero section and HeroScene's own
          outer div (both overflow-hidden) clip the scene; that's also
          what clips this wrapper's 200%-wide drift track down to view.
        */}
        <div className="absolute inset-x-0 bottom-0" data-depth="0.5">
          <div
            className="hero-cloud-track flex w-[200%]"
            style={{ ['--hero-drift-duration' as string]: '130s', filter: 'blur(7px)' }}
          >
            <img alt="" className="w-1/2 dark:hidden" src="/hero/light-clouds-back.svg" />
            <img alt="" className="w-1/2 dark:hidden" src="/hero/light-clouds-back.svg" />
            <img alt="" className="hidden w-1/2 dark:block" src="/hero/dark-clouds-back.svg" />
            <img alt="" className="hidden w-1/2 dark:block" src="/hero/dark-clouds-back.svg" />
          </div>
        </div>

        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 w-[calc(100%+48px)] dark:hidden"
          data-depth="0.65"
          src="/hero/light-mountains-mid.svg"
        />
        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 hidden w-[calc(100%+48px)] dark:block"
          data-depth="0.65"
          src="/hero/dark-mountains-mid.svg"
        />

        <div className="absolute inset-x-0 bottom-0" data-depth="0.8">
          <div
            className="hero-cloud-track flex w-[200%]"
            style={{ ['--hero-drift-duration' as string]: '70s', filter: 'blur(8px)' }}
          >
            <img alt="" className="w-1/2 dark:hidden" src="/hero/light-clouds-front.svg" />
            <img alt="" className="w-1/2 dark:hidden" src="/hero/light-clouds-front.svg" />
            <img alt="" className="hidden w-1/2 dark:block" src="/hero/dark-clouds-front.svg" />
            <img alt="" className="hidden w-1/2 dark:block" src="/hero/dark-clouds-front.svg" />
          </div>
        </div>

        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 w-[calc(100%+48px)] dark:hidden"
          data-depth="1"
          src="/hero/light-mountains-near.svg"
        />
        <img
          alt=""
          className="absolute inset-x-[-24px] bottom-0 hidden w-[calc(100%+48px)] dark:block"
          data-depth="1"
          src="/hero/dark-mountains-near.svg"
        />
      </HeroParallax>
    </div>
  )
}
