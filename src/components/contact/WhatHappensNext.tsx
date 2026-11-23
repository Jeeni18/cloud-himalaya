import { whatHappensNext } from '../../content/contact'

// "What happens next", part of section 2 of /contact-us (docs/design/
// contact-us/). Step 01's circle reuses content-selected-bg/text (an
// exact match to this card's own "accent-filled circle" color in both
// themes); steps 02-03 use a dedicated --contact-step-border token --
// close to, but not quite, the shared content-card-border shade.
// The navy response-time card is fixed #092B50 in both themes, same
// "fixed in both modes" exception as the homepage blueprint/rack.
export function WhatHappensNext() {
  return (
    <div className="flex flex-col gap-3.5 lg:pt-[110px]">
      <p className="font-mono text-xs font-medium text-content-accent">
        {whatHappensNext.eyebrow.toUpperCase()}
      </p>

      <div className="rounded-2xl border border-content-card-border bg-content-card-bg px-6">
        {whatHappensNext.steps.map((step, index) => (
          <div
            className={`grid grid-cols-[44px_1fr] gap-3.5 py-[18px] ${
              index > 0 ? 'border-t border-contact-step-border' : ''
            }`}
            key={step.number}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs ${
                index === 0
                  ? 'bg-content-selected-bg text-content-selected-text'
                  : 'border-[1.5px] border-contact-step-border text-content-accent'
              }`}
            >
              {step.number}
            </span>
            <div>
              <p className="font-semibold text-content-head">{step.title}</p>
              <p className="mt-0.5 text-sm text-content-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-[#092B50] p-5">
        <p className="font-mono text-xs text-[#55A4E0]">
          {whatHappensNext.responseTime.label.toUpperCase()}
        </p>
        <p className="mt-1.5 text-white">
          We reply within <b>{whatHappensNext.responseTime.workingHours} working hours</b>. Office
          hours: {whatHappensNext.responseTime.officeHours}.
        </p>
      </div>
    </div>
  )
}
