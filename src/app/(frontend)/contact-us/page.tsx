import type { Metadata } from 'next'

import { ContactFaq } from '../../../components/contact/ContactFaq'
import { ContactForm } from '../../../components/contact/ContactForm'
import { FindDataCenter } from '../../../components/contact/FindDataCenter'
import { HowCanWeHelp } from '../../../components/contact/HowCanWeHelp'
import { WhatHappensNext } from '../../../components/contact/WhatHappensNext'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../components/ui/SectionHeading'
import { form, seo, serviceOptions, topics } from '../../../content/contact'
import type { ServiceValue, TopicValue } from '../../../content/contact'

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
}

// Forces fresh rendering on every request -- this page's content
// depends on ?topic/?service/?config search params, and without this,
// Next.js's router cache can reuse a previous render across different
// search-param combinations (confirmed: the "How can we help?" cards'
// client-side navigation wasn't updating the preselected topic without
// it). Same workaround already used on /services and /insights for a
// confirmed Next.js 16.3.3 + Payload 3.92.1 caching issue.
export const dynamic = 'force-dynamic'

const VALID_TOPICS = new Set(topics.map((t) => t.value))
const VALID_SERVICES = new Set(serviceOptions.map((s) => s.value))

function parseTopic(topic: string | undefined, type: string | undefined): TopicValue {
  // `topic` is this page's own param name; `type` is the alias every
  // link built before this page existed already uses (Hero, About,
  // Services) -- both work rather than rewriting those pages.
  const value = topic ?? type
  return value && VALID_TOPICS.has(value as TopicValue) ? (value as TopicValue) : 'quote'
}

function parseServices(service: string | undefined, services: string | undefined): ServiceValue[] {
  const raw = [service, services].filter((v): v is string => Boolean(v)).join(',')
  if (!raw) return []
  return raw
    .split(',')
    .map((v) => v.trim())
    .filter((v): v is ServiceValue => VALID_SERVICES.has(v as ServiceValue))
}

// Strips control characters and caps length -- defence against a
// pathological query string, not an XSS concern (React already escapes
// text content/defaultValue, so this never touches HTML).
function sanitizeConfig(config: string | undefined): string {
  if (!config) return ''
  return config.replace(/[\x00-\x1F\x7F]/g, '').slice(0, 300)
}

type ContactUsPageProps = {
  searchParams: Promise<{
    topic?: string
    type?: string
    service?: string
    services?: string
    config?: string
  }>
}

// /contact-us (docs/design/contact-us/). Header/TopBar/Footer render
// globally from layout.tsx, not from this file.
export default async function ContactUsPage({ searchParams }: ContactUsPageProps) {
  const params = await searchParams
  const initialTopic = parseTopic(params.topic, params.type)
  const initialServices = parseServices(params.service, params.services)
  const initialMessage = sanitizeConfig(params.config)
  const hasParams = Object.values(params).some(Boolean)
  const sourcePage = hasParams ? `/contact-us?topic=${initialTopic}` : '/contact-us'

  return (
    <>
      <HowCanWeHelp />

      <section className="bg-section-about py-[var(--section-y)]" id="contact-form">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-[var(--section-x)] lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow>{form.eyebrow.toUpperCase()}</Eyebrow>
            <SectionHeading className="mt-3 mb-6">{form.heading}</SectionHeading>
            <ContactForm
              // Forces a fresh mount (and fresh useActionState initial
              // value) whenever the URL prefill changes -- otherwise
              // clicking between "How can we help?" cards wouldn't
              // re-select the topic on an already-mounted form.
              key={`${initialTopic}-${initialServices.join(',')}-${initialMessage}`}
              initialMessage={initialMessage}
              initialServices={initialServices}
              initialTopic={initialTopic}
              sourcePage={sourcePage}
            />
          </div>

          <WhatHappensNext />
        </div>
      </section>

      <FindDataCenter />
      <ContactFaq />
    </>
  )
}
