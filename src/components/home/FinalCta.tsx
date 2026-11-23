import { finalCta } from '../../content/home'
import { Button } from '../ui/Button'

// docs/LANDING_PAGE_SPEC.md section 4.13. Colors here are the spec's
// "fixed in both modes" exception (section 2.2) -- literal hex, not
// tokens, same as the Button `white`/`ghost-outline` variants it uses.
export function FinalCta() {
  return (
    <div className="px-6 pb-24">
      <div
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl p-14"
        style={{ backgroundColor: '#0954A6' }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[140px] w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 200"
        >
          <path
            d="M0 200 L0 130 L150 80 L260 120 L420 30 L560 110 L700 60 L860 130 L1000 70 L1200 120 L1200 200 Z"
            fill="#0B60B8"
          />
        </svg>

        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-[44px] font-bold text-white">{finalCta.heading}</h2>
            <p className="mt-3 text-lg" style={{ color: '#DCEBFA' }}>
              {finalCta.subtext}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href={finalCta.primary.href} size="lg" variant="white">
              {finalCta.primary.label}
            </Button>
            <Button href={finalCta.secondary.href} size="lg" variant="ghost-outline">
              {finalCta.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
