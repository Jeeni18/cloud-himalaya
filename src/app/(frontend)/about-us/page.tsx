import type { Metadata } from 'next'

import { AboutIntro } from '../../../components/about/AboutIntro'
import { FounderMessage } from '../../../components/about/FounderMessage'
import { LifeAtCloudHimalaya } from '../../../components/about/LifeAtCloudHimalaya'
import { PromiseBanner } from '../../../components/about/PromiseBanner'
import { TeamsCarousel } from '../../../components/about/TeamsCarousel'
import { VisitUs } from '../../../components/about/VisitUs'
import { seo } from '../../../content/about'

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
}

// /about-us (docs/design/about-us/). Header/TopBar/Footer render
// globally from layout.tsx, not from this file.
export default function AboutUsPage() {
  return (
    <>
      <AboutIntro />
      <PromiseBanner />
      <FounderMessage />
      <TeamsCarousel />
      <LifeAtCloudHimalaya />
      <VisitUs />
    </>
  )
}
