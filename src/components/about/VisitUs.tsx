import Link from 'next/link'

import { visitUs } from '../../content/about'
import { SectionHeading } from '../ui/SectionHeading'
import { VisitorPass } from './VisitorPass'

// Visit Us / visitor pass, section 6 of /about-us (docs/design/about-us/).
// A new --about-visit-* token pair backs this band -- its dark value
// (#1B3652) differs from the homepage's existing Contact band (#294C6C),
// so it isn't reused. "Book a data center tour" uses dedicated CTA
// tokens for the same reason the homepage's ContactPreview needed its
// own (theme-varying, not one of Button.tsx's fixed-both-modes
// variants); "Get a quote" is white-on-blue in both themes (the band
// itself is dark-ish in both), so it's written directly rather than
// forcing a near-miss existing Button variant.
export function VisitUs() {
  return (
    <section className="bg-about-visit-bg py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-[var(--section-x)] lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-[13px] font-medium text-[#BCD2E4]">{visitUs.eyebrow}</p>
          <SectionHeading className="mt-3 text-white" tone="inverted">
            {visitUs.heading}
          </SectionHeading>
          <p className="mt-4 max-w-[32rem] text-lg text-[#E4F0FA]">{visitUs.paragraph}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-[10px] bg-about-visit-cta-bg px-[18px] py-[11px] text-[15px] font-semibold text-about-visit-cta-text hover:opacity-90"
              href={visitUs.primaryCta.href}
            >
              {visitUs.primaryCta.label}
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-[10px] border border-white/50 px-[18px] py-[11px] text-[15px] font-semibold text-white hover:bg-white/10"
              href={visitUs.secondaryCta.href}
            >
              {visitUs.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <VisitorPass className="rotate-[-2deg] sm:rotate-[-4deg]" />
        </div>
      </div>
    </section>
  )
}
