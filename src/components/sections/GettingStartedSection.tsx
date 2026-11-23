import type { Home } from '../../payload-types'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Section } from '../ui/Section'

type GettingStartedSectionProps = Home['gettingStarted']

// Horizontal sequence connected by a hairline -- distinct from WhyUs's
// vertical numbered list even though both use step numbers, per
// CLAUDE.md section 7's "no repeated layout" rule. Behind its own
// showSection toggle like Proof, since this is also optional content.
export function GettingStartedSection({
  showSection,
  heading,
  steps,
}: GettingStartedSectionProps = {}) {
  if (!showSection || !heading || !steps?.length) return null

  return (
    <Section tone="surface">
      <Container>
        <Heading level={2}>{heading}</Heading>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {steps.map((step, index) => (
            <li
              className="relative pt-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-text-secondary/20 md:px-8 md:first:pl-0 md:last:pr-0"
              key={step.id ?? index}
            >
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl font-bold text-text-primary">{step.title}</h3>
              {step.description && <p className="mt-2 text-text-secondary">{step.description}</p>}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
