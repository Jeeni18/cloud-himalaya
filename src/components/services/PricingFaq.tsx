import { faq } from '../../content/services'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'

// Pricing FAQ, section 5 of /services (docs/design/services/). Native
// <details>/<summary> -- an accordion that's keyboard- and screen-
// reader-accessible with no JavaScript at all, open/close state and
// toggle semantics built in. The first item is open by default (`open`
// attribute on that one <details>). bg-section-trust is the homepage's
// existing token (pixel-identical to this section's background, same
// one Step 1 uses).
export function PricingFaq() {
  return (
    <section className="bg-section-trust py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-[var(--section-x)] lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3">{faq.heading}</SectionHeading>
          <p className="mt-3.5 text-muted">
            Sales: {faq.contact.salesPhone}
            <br />
            {faq.contact.email}
          </p>
        </div>

        <div>
          {faq.items.map((item, index) => (
            <details
              className="group border-t border-content-card-border py-[22px] first:pt-0 last:border-b"
              key={item.question}
              open={index === 0}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-content-head marker:content-none">
                {item.question}
                <span aria-hidden="true" className="text-content-accent group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden text-content-accent group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-2.5 text-content-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
