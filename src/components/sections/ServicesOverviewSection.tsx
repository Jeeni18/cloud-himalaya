import { ServiceCard } from '../ServiceCard'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Section } from '../ui/Section'
import { getPayloadClient } from '../../lib/getPayloadClient'

type ServicesOverviewSectionProps = {
  heading: string
  intro?: string | null
}

// Grid of cards -- a deliberately different composition from the
// two-column Data Center section above it. Queries Services directly
// rather than receiving it as a prop, since it's a separate data source
// from the Home global the rest of the homepage is built from.
export async function ServicesOverviewSection({ heading, intro }: ServicesOverviewSectionProps) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'services',
    overrideAccess: false,
    sort: 'title',
    limit: 8,
  })

  // heading became required after the Home document already existed, so
  // the stored value can still be null even though the generated type
  // says string -- degrade gracefully rather than crash the homepage.
  if (result.docs.length === 0 || !heading) return null

  return (
    <Section id="services">
      <Container>
        <div className="max-w-2xl">
          <Heading level={2}>{heading}</Heading>
          {intro && <p className="mt-4 text-text-secondary">{intro}</p>}
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.docs.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
