// Typed static content for /services (docs/design/services/). Every
// field mirrors a future Payload field, same pattern as src/content/
// home.ts and about.ts. The 5 services themselves (number, name, slug,
// rack units) already live in home.ts's servicesBlueprint -- this file
// only adds the content specific to this page, keyed by the same slug.
//
// CONTENT NOTE: the reference mockup is a static screenshot with only
// one state ever rendered -- the "Colocation" tab in Step 1, and the
// first FAQ item open. Its understand[]  entry for "colocation" and the
// faq[0] answer are copied verbatim from that markup; everything else
// below (the other 4 services' analogies/checklists, and faq[1..4]'s
// answers) has no source text in the reference and was written here to
// match its voice. The 4 "[Confirm ...]" FAQ answers are placeholders
// for sales to replace, same convention as the reference's own
// "[Confirm]" tags -- not real company policy.

export const seo = {
  title: 'Services | Cloud Himalaya',
  description:
    'Colocation, VPS, managed services, web hosting and email hosting from a self-owned data center in Kathmandu -- see what each one includes and what it costs.',
}

export const intro = {
  heading: 'Infrastructure for every stage of your business',
  subtitle: 'Bring your own hardware, rent ours, or let us run it for you.',
}

export type ServiceSlug =
  'colocation' | 'vps' | 'managed-services' | 'web-hosting' | 'email-hosting'

export const step1 = {
  eyebrow: 'Step 1 · Understand it',
  heading: 'Each service, explained simply',
  lead: 'What it is, when you need it, and exactly what comes with it.',
  detailsLabel: (name: string) => `${name} details`,
  seePricesLabel: 'See prices',
  understand: [
    {
      slug: 'colocation',
      analogy: 'Like renting a secure parking space for a car you already own.',
      needThisIf: 'You own servers and want them somewhere safer than your office.',
      included: [
        'Private cages, multiple racks, half racks or a few units',
        'Power, cooling and redundant network',
        'Guarded building access',
        'Managed and professional services on demand',
      ],
    },
    {
      slug: 'vps',
      analogy: 'Like leasing a furnished flat instead of building a house.',
      needThisIf: 'You need a server of your own, without owning any hardware.',
      included: [
        'A dedicated slice of CPU, memory and storage',
        'Full root access to your own operating system',
        'Snapshots and backups available on request',
        '24x7 network and host monitoring',
      ],
    },
    {
      slug: 'managed-services',
      analogy: 'Like hiring a building caretaker instead of fixing things yourself.',
      needThisIf: 'You have servers but not the time or team to keep watching them.',
      included: [
        'Round-the-clock monitoring and alerting',
        'Patching and security updates',
        'Incident response by our own engineers',
        'Monthly health and capacity reports',
      ],
    },
    {
      slug: 'web-hosting',
      analogy: 'Like renting a shop in a mall that handles the power, security and footfall.',
      needThisIf: 'You need your website or app online without running a server yourself.',
      included: [
        'Web server, database and email on one plan',
        'Free SSL certificates',
        'Daily backups',
        'One-click staging and deployment tools',
      ],
    },
    {
      slug: 'email-hosting',
      analogy: 'Like a dedicated post office for your own company domain.',
      needThisIf: 'You want professional email at your own domain, not a free webmail address.',
      included: [
        'Mailboxes at your own domain name',
        'Webmail, IMAP and SMTP access',
        'Spam and malware filtering',
        'Shared calendars and contacts',
      ],
    },
  ],
}

export type NeedItem = {
  label: string
  resultSlug: ServiceSlug
  resultLabel: string
}

export const step2 = {
  eyebrow: 'Step 2 · Find your service',
  heading: "Tell us what you need. We'll tell you what fits.",
  lead: "No technical words needed. Tick what you're trying to do and we'll point you to the right service and its starting price.",
  needListLabel: 'I need…',
  needs: [
    { label: 'A website for my business', resultSlug: 'web-hosting', resultLabel: 'WEB HOSTING' },
    {
      label: 'Email at name@mycompany.com',
      resultSlug: 'email-hosting',
      resultLabel: 'EMAIL HOSTING',
    },
    { label: 'A server for my app or software', resultSlug: 'vps', resultLabel: 'VPS' },
    {
      label: 'A safe home for servers I already own',
      resultSlug: 'colocation',
      resultLabel: 'COLOCATION',
    },
    {
      label: 'Someone to run and watch my systems',
      resultSlug: 'managed-services',
      resultLabel: 'MANAGED SERVICES',
    },
    {
      label: 'Backups and a copy outside Kathmandu',
      resultSlug: 'managed-services',
      resultLabel: 'MANAGED SERVICES + ITAHARI DR',
    },
  ] satisfies NeedItem[],
  resultHeaderLabel: 'You need',
  selectedCountLabel: (count: number) => `${count} OF ${6} SELECTED`,
  emptyState: "Tick what you need and we'll suggest a service.",
  combinedHint: "Pick more than one need and we'll suggest a combination.",
  getQuoteLabel: 'Get a quote',
  seePlansLabel: (name: string) => `See ${name} plans`,
}

export const step3 = {
  eyebrow: 'Step 3 · See the price',
  heading: 'Clear prices, no surprises',
  lead: 'Pick a service to see its plans, or build your own and get an instant estimate.',
  monthlyLabel: 'Monthly',
  yearlyLabel: 'Yearly',
  exclVat: '[excl. VAT · confirm]',
  mostChosenLabel: 'MOST CHOSEN [CONFIRM]',
  estimator: {
    heading: 'Build your own VPS',
    yearlyDiscountLabel: 'Yearly [confirm discount]',
    addonsLabel: {
      backups: '+ Backups',
      managed: '+ Managed',
      itahariDr: '+ Itahari DR',
    },
    estimatedPriceLabel: 'Estimated price',
    perMonthLabel: 'per month · estimate only',
    disclaimer: 'This is a guide. Your final price comes in a written quote from our sales team.',
    sendQuoteLabel: 'Send me this quote',
  },
  tableEyebrow: 'All services at a glance',
  tableHeading: 'Starting prices',
  seePlansLabel: 'See plans',
  priceFootnote:
    'Every price is a placeholder. Real prices and VAT handling must come from sales before launch.',
}

export const priceCovers = {
  eyebrow: 'Included with every service',
  heading: 'What every price already covers',
  items: [
    {
      title: '24x7 NOC',
      description: 'A dedicated team, on call day and night.',
      iconPath:
        'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    },
    {
      title: 'Itahari DR site',
      description: 'Disaster recovery in another region of Nepal.',
      iconPath: 'M4 16V6a2 2 0 0 1 2-2h10',
      iconRect: { x: 8, y: 8, width: 12, height: 12, rx: 2 },
    },
    {
      title: 'ISO 27001',
      description: 'Certified information security.',
      iconPath: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z',
    },
    {
      title: '99.995% uptime',
      description: 'Our uptime commitment. [Confirm per service]',
      iconPath: 'M13 2L4 14h7l-1 8 9-12h-7z',
    },
  ],
}

export type FaqItem = {
  question: string
  answer: string
}

export const faq = {
  eyebrow: 'Pricing questions',
  heading: 'Before you decide',
  contact: {
    salesPhone: '+977-9802300610',
    email: 'info@cloudhimalaya.com',
  },
  items: [
    {
      question: 'Why are some prices "from"?',
      answer:
        'Colocation and managed services depend on how much space, power and support you need, so we confirm them in a quote.',
    },
    {
      question: 'Do prices include VAT?',
      answer: '[Confirm: whether listed prices include or exclude VAT, and the current rate.]',
    },
    {
      question: 'Can I pay yearly?',
      answer: '[Confirm: whether yearly billing is offered and what discount, if any, applies.]',
    },
    {
      question: 'Can I change plans later?',
      answer: '[Confirm: whether upgrades/downgrades are allowed mid-term and if so, how.]',
    },
    {
      question: 'Is there a setup fee?',
      answer: '[Confirm: whether a one-time setup fee applies, and for which services.]',
    },
  ] satisfies FaqItem[],
}

export const cta = {
  eyebrow: 'Pricing',
  heading: "Every setup is different. Let's size yours.",
  paragraph: "Tell us what you run today and we'll come back with a plan and a price.",
  getQuoteLabel: 'Get a quote',
  callSalesLabel: 'Call sales',
  callSalesHref: 'tel:+9779802300610',
}
