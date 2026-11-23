import Link from 'next/link'

import { cta } from '../../content/services'

// Pricing CTA band, section 6 of /services (docs/design/services/).
// bg-section-contact is the homepage's existing token (pixel-identical
// to this section's background).
export function ServicesCta() {
  return (
    <section className="bg-section-contact py-[var(--section-y)] text-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-[var(--section-x)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium text-[#BCD2E4]">
            {cta.eyebrow.toUpperCase()}
          </p>
          <h2 className="mt-3 max-w-[560px] text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.025em]">
            {cta.heading}
          </h2>
          <p className="mt-2.5 max-w-[560px] text-[#D8EAF8]">{cta.paragraph}</p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 text-[15px] font-semibold text-[#0954A6] hover:opacity-90"
            href="/contact-us?type=quote"
          >
            {cta.getQuoteLabel}
          </Link>
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-5 text-[15px] font-semibold text-white hover:bg-white/10"
            href={cta.callSalesHref}
          >
            {cta.callSalesLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
