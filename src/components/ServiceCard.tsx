import Link from 'next/link'

import type { Service } from '../payload-types'

type ServiceCardProps = {
  service: Pick<Service, 'slug' | 'summary' | 'title'>
}

// Shared between the /services listing and the homepage Services
// Overview section, so both present the same card consistently.
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      className="block rounded-md border border-text-secondary/20 bg-surface p-6 hover:border-accent"
      href={`/services/${service.slug}`}
    >
      <h3 className="text-xl font-bold text-text-primary">{service.title}</h3>
      <p className="mt-2 text-text-secondary">{service.summary}</p>
    </Link>
  )
}
