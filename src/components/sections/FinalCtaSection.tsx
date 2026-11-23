import type { Home } from '../../payload-types'
import { getPayloadClient } from '../../lib/getPayloadClient'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Section } from '../ui/Section'

type FinalCtaSectionProps = Home['finalCta']

// Full-width band, heading and action split left/right -- the last new
// composition on the page, distinct from every section above it.
// Phone/email come from Site Settings rather than being duplicated
// here, so editors only maintain one copy of the company's contact
// details (per the admin description on Home.finalCta).
export async function FinalCtaSection({ heading, ctaLabel, ctaUrl }: FinalCtaSectionProps) {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: false })

  if (!heading || !ctaLabel || !ctaUrl) return null

  return (
    <Section>
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Heading className="max-w-md" level={2}>
          {heading}
        </Heading>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <Button href={ctaUrl}>{ctaLabel}</Button>
          <div className="flex flex-col gap-1 text-sm text-text-secondary md:text-right">
            {siteSettings.contactPhone && (
              <a className="hover:text-accent" href={`tel:${siteSettings.contactPhone}`}>
                {siteSettings.contactPhone}
              </a>
            )}
            {siteSettings.contactEmail && (
              <a className="hover:text-accent" href={`mailto:${siteSettings.contactEmail}`}>
                {siteSettings.contactEmail}
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
