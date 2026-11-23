import { AboutPreview } from '../../components/home/AboutPreview'
import { ClientLogos } from '../../components/home/ClientLogos'
import { ContactPreview } from '../../components/home/ContactPreview'
import { DataCenterPreview } from '../../components/home/DataCenterPreview'
import { Hero } from '../../components/home/Hero'
import { InsightsPreview } from '../../components/home/InsightsPreview'
import { ServicesListPreview } from '../../components/home/ServicesListPreview'

// Homepage, rebuilt to match docs/design/landing-preview.html: a short
// preview of each page (About, Services, Data center, Insights, Careers,
// Contact) rather than the longer, fully-detailed sections the original
// docs/LANDING_PAGE_SPEC.md homepage had. Most of those older section
// components (ServicesBento, Resilience, FacilityTabs, GettingStarted,
// SlaTable, TestimonialCarousel, Faq, FinalCta, ProofBar) are unchanged
// and still back the standalone /about, /services and /data-center pages
// -- only the homepage stopped using them. InsightsPreview is the one
// exception: the homepage was its only user, so it was restyled in place
// for the new section (e) band colors rather than left alone.
// Careers (section f) is removed for now -- CareersPreview.tsx and its
// content (careersPreview) stay in the codebase unused, so it's a single
// line to bring back later; the ridge/band colors in ContactPreview.tsx
// were updated to connect to Insights directly instead.
// Sections below match docs/design/landing-preview.html a -> e, g; Footer
// renders globally from layout.tsx, not from this file.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutPreview />
      <ServicesListPreview />
      <DataCenterPreview />
      <InsightsPreview />
      <ContactPreview />
    </>
  )
}
