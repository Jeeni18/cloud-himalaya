import { siteInfo, topBar } from './home'

// Typed static content for /contact-us (docs/design/contact-us/). Phone
// numbers and email reuse siteInfo (already used by the top bar and
// footer) rather than being duplicated here.
//
// CONTENT NOTE: the reference mockup is a static screenshot with only
// one state ever rendered -- the first FAQ item open. That answer is
// copied verbatim; the other 3 have no answer text in the reference at
// all (same situation as the Services and Insights pages' FAQs), so
// they're placeholders marked [Confirm ...] for the team to fill in.

export const seo = {
  title: 'Contact Us | Cloud Himalaya',
  description:
    "Get a quote, book a data center tour, or reach our team -- we'll point you to the right people.",
}

export const howCanWeHelp = {
  heading: 'How can we help?',
  subtitle: "Pick one, and we'll take you to the right people.",
  cards: [
    {
      key: 'quote',
      title: 'Get a quote',
      description: 'Plans and prices for any service.',
      actionLabel: 'Start',
      iconPath: 'M3 10h18',
      iconRect: { x: 3, y: 6, width: 18, height: 12, rx: 2 },
    },
    {
      key: 'down',
      title: 'Something is down',
      description: 'Existing customers: call the NOC.',
      // Display-only; the real tel: link dials the single number below
      // (same display-vs-dial split the top bar's own nocPhoneDisplay
      // already uses).
      actionLabel: topBar.nocPhoneDisplay,
      phoneHref: `tel:${siteInfo.phoneNoc}`,
      iconPath:
        'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    },
    {
      key: 'tour',
      title: 'Book a tour',
      description: 'See the data center in Thapathali.',
      actionLabel: 'Pick a date',
      iconPath: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z',
      iconCircle: { cx: 12, cy: 9.5, r: 2.5 },
    },
    {
      key: 'other',
      title: 'Something else',
      description: 'Billing, media, partnerships.',
      actionLabel: 'Write to us',
      iconPath: 'M4 5h16v11H8l-4 4z',
    },
  ],
}

export type TopicValue = 'quote' | 'tour' | 'support' | 'billing' | 'other'

export const topics: { value: TopicValue; label: string }[] = [
  { value: 'quote', label: 'Get a quote' },
  { value: 'tour', label: 'Book a tour' },
  { value: 'support', label: 'Support' },
  { value: 'billing', label: 'Billing' },
  { value: 'other', label: 'Something else' },
]

export type ServiceValue =
  'colocation' | 'vps' | 'managed-services' | 'web-hosting' | 'email-hosting' | 'not-sure'

export const serviceOptions: { value: ServiceValue; label: string }[] = [
  { value: 'colocation', label: 'Colocation' },
  { value: 'vps', label: 'VPS' },
  { value: 'managed-services', label: 'Managed Services' },
  { value: 'web-hosting', label: 'Web Hosting' },
  { value: 'email-hosting', label: 'Email Hosting' },
  { value: 'not-sure', label: 'Not sure' },
]

export const form = {
  eyebrow: 'Send us a message',
  heading: "We'll get back to you",
  topicLabel: "What's this about?",
  fullNameLabel: 'Full name',
  companyLabel: 'Company',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  phonePlaceholder: '+977 98XXXXXXXX',
  servicesLabel: "Services you're interested in",
  messageLabel: 'Tell us about your setup',
  messagePlaceholder: 'What do you run today? How many servers, users or mailboxes?',
  privacyText: 'By sending this you agree to our',
  privacyLinkLabel: 'privacy policy',
  // TODO: the task's reference text names /privacy-policy, which doesn't
  // exist -- the real route is /legal/privacy (same one the footer
  // already links to, backed by the Legal collection).
  privacyHref: '/legal/privacy',
  submitLabel: 'Send message',
  successMessage: (hours: number) =>
    `Thanks, we've got it. We'll reply within ${hours} working hours.`,
  errorMessage: `Something went wrong on our end. Call sales on ${siteInfo.phoneSales} and we'll help directly.`,
  rateLimitedMessage: "You've sent a few messages already -- give it a few minutes and try again.",
  // Shown only on a preview deployment with no CMS connected
  // (see src/lib/cmsAvailability.ts).
  previewMessage:
    'This is a design preview, so enquiries are not being stored or delivered yet. Your message was not sent.',
}

export const whatHappensNext = {
  eyebrow: 'What happens next',
  steps: [
    {
      number: '01',
      title: 'We get your message',
      description: 'You get an email confirming we have it.',
    },
    {
      number: '02',
      title: 'The right team picks it up',
      description: 'Sales, support, billing or the tour desk.',
    },
    {
      number: '03',
      title: 'An engineer gets back to you',
      description: 'By phone or email, with next steps or a quote.',
    },
  ],
  responseTime: {
    label: 'Response time',
    // TODO: [X] working hours -- confirm with the team before launch.
    workingHours: 4,
    // TODO: confirm office hours.
    officeHours: '[Sun–Fri, 9:00–17:00 NPT · confirm]',
  },
}

export const findDataCenter = {
  eyebrow: 'Visit us',
  heading: 'Find the data center',
  // TODO: none of this is confirmed yet -- street address, exact map
  // coordinates and the Google Maps link all need the real address.
  address: '[Street / building], Thapathali, Kathmandu',
  officeHours: whatHappensNext.responseTime.officeHours,
  noc: 'Open 24×7',
  parking: '[Confirm]',
  directionsHref: 'https://www.google.com/maps?q=TODO-confirm-address',
  directionsLabel: 'Get directions',
  tourLabel: 'Book a tour',
  map: {
    pinLabel: 'KTM-DC1',
    pinSublabel: 'Thapathali, Kathmandu',
  },
}

export type FaqItem = { question: string; answer: string }

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Before you get in touch',
  items: [
    {
      question: 'I already use Cloud Himalaya and something is down. Who do I call?',
      answer: `Call the NOC on ${topBar.nocPhoneDisplay}, day or night. Don't use the form for urgent issues.`,
    },
    {
      question: 'How fast do you reply to the form?',
      answer: `[Confirm: typical response time -- the reference gives no real answer here, same as the response-time card's own "[X] working hours".]`,
    },
    {
      question: 'Can I visit before signing up?',
      answer:
        '[Confirm: whether prospective customers can tour the data center before becoming a customer.]',
    },
    {
      question: 'Do you work with businesses outside Kathmandu?',
      answer: '[Confirm: service availability outside the Kathmandu valley.]',
    },
  ] satisfies FaqItem[],
}
