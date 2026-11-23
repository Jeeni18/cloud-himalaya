'use client'

import { useState } from 'react'

import { faq } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'

// docs/LANDING_PAGE_SPEC.md section 4.11. One item open at a time; the
// first is open by default. FAQPage JSON-LD is emitted alongside it.
export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="border-y border-line bg-alt">
      {/* Static, developer-authored FAQ data only -- no user input reaches this JSON. */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />

      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-12 px-6 py-24">
        <div className="basis-[320px]">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3">{faq.heading}</SectionHeading>
          <p className="mt-4 text-muted">
            {faq.contactLine.prefix}{' '}
            <a className="font-bold text-head" href={`mailto:${faq.contactLine.email}`}>
              {faq.contactLine.email}
            </a>{' '}
            {faq.contactLine.mid}{' '}
            <a className="font-bold text-head" href={`tel:${faq.contactLine.phone}`}>
              {faq.contactLine.phone}
            </a>
            .
          </p>
        </div>

        <div className="flex flex-[1.6] basis-[560px] flex-col gap-2.5">
          {faq.items.map((item, index) => {
            const isOpen = index === openIndex
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div className="rounded-xl border border-line bg-surface" key={item.question}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 px-[22px] py-4 text-left font-semibold text-head"
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  {item.question}
                  <span aria-hidden="true" className="font-mono text-xl text-accent">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p aria-labelledby={buttonId} className="px-[22px] pb-5 text-muted" id={panelId}>
                    {item.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
