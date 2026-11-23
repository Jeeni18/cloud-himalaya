import { faq } from '../../content/contact'
import { SectionHeading } from '../ui/SectionHeading'

// FAQ, section 4 of /contact-us (docs/design/contact-us/). Native
// <details>/<summary> -- accessible, keyboard-operable accordion with no
// JavaScript, same pattern as the Services and Insights pages' own FAQs.
// The first item is open by default. bg-section-about is the homepage's
// existing token (pixel-identical to this section's background).
export function ContactFaq() {
  return (
    <section className="bg-section-about py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-[var(--section-x)] lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="font-mono text-xs font-medium text-content-accent">
            {faq.eyebrow.toUpperCase()}
          </p>
          <SectionHeading className="mt-3">{faq.heading}</SectionHeading>
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
