import { gettingStarted } from '../../content/home'
import { SectionHeading } from '../ui/SectionHeading'

// docs/LANDING_PAGE_SPEC.md section 4.9.
export function GettingStarted() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHeading>{gettingStarted.heading}</SectionHeading>

      <div className="mt-9 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {gettingStarted.steps.map((step) => (
          <div className="border-t-[3px] border-primary pt-[22px]" key={step.label}>
            <p className="font-mono text-sm font-semibold text-accent">{step.label}</p>
            <h3 className="mt-2 text-2xl font-bold text-head">{step.title}</h3>
            <p className="mt-2 text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
