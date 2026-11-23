import type { Metadata } from 'next'

import { PriceCoversBand } from '../../../components/services/PriceCoversBand'
import { PricingFaq } from '../../../components/services/PricingFaq'
import { ServicesCta } from '../../../components/services/ServicesCta'
import { ServicesIntro } from '../../../components/services/ServicesIntro'
import { ServicesPricingFlow } from '../../../components/services/ServicesPricingFlow'
import { seo } from '../../../content/services'

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
}

// /services (docs/design/services/). Replaces the previous placeholder
// implementation, which listed Payload's "services" collection directly
// -- that collection and the /services/[slug] template it backs are
// untouched; this page's content is static for now (src/content/
// services.ts, src/content/pricing.ts), same "move to Payload later"
// pattern as every other designed page. Header/TopBar/Footer render
// globally from layout.tsx, not from this file.
export default function ServicesPage() {
  return (
    <>
      <ServicesIntro />
      <ServicesPricingFlow />
      <PriceCoversBand />
      <PricingFaq />
      <ServicesCta />
    </>
  )
}
