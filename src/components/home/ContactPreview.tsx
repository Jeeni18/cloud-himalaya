import Link from 'next/link'

import { contactPreview } from '../../content/home'
import { Button } from '../ui/Button'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionRidge } from '../ui/SectionRidge'

// Contact Us preview, section (g) of the new homepage
// (docs/design/landing-preview.html). Full form lives at /contact-us. This
// band is a solid blue in both themes, so the heading uses the existing
// "inverted" (always-white) SectionHeading tone, the secondary button
// reuses Button's existing ghost-outline variant (also fixed white-on-
// blue, and already readable against both this band's light- and
// dark-mode colors), and only the muted text and primary CTA need their
// own section-contact-* tokens, since those two do change between modes.
// The "More" pill is the same MoreLink used by every other section, kept
// consistent rather than one-off restyled for this band. id="contact" is
// the scroll-spy target for the header's "Contact Us" link. The ridge
// transitions from Insights' color, not Careers' -- Careers no longer
// renders between them (see page.tsx).
export function ContactPreview() {
  return (
    <>
      <SectionRidge fromVar="--color-section-insights" toVar="--color-section-contact" />
      <section className="bg-section-contact py-[var(--section-y)]" id="contact">
        <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[13px] font-medium text-white">
                {contactPreview.eyebrow}
              </p>
              <SectionHeading className="mt-3 max-w-[560px]" tone="inverted">
                {contactPreview.heading}
              </SectionHeading>
              <p className="mt-3 max-w-[560px] text-section-contact-muted">
                {contactPreview.paragraph}
              </p>
            </div>
            <MoreLink href={contactPreview.moreHref} label={contactPreview.moreLabel} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-7 gap-y-6 lg:grid-cols-4">
            {contactPreview.items.map((item) => (
              <div className="border-t border-white/25 pt-4" key={item.label}>
                <p className="font-mono text-xs text-white/80">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-md bg-section-contact-cta-bg px-7 py-3 text-base font-bold text-section-contact-cta-text hover:opacity-90"
              href={contactPreview.primaryCta.href}
            >
              {contactPreview.primaryCta.label}
            </Link>
            <Button href={contactPreview.secondaryCta.href} size="lg" variant="ghost-outline">
              {contactPreview.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
