// Phase 1 typed static content for the homepage (docs/LANDING_PAGE_SPEC.md).
// Every field here mirrors a future Payload field one-for-one, so Phase 2
// only changes where the data comes from -- not the shape components read.
// Text in [BRACKETS] is an intentional placeholder the client hasn't
// supplied yet (see docs/OPEN_QUESTIONS.md); render it as written.

export type NavItem = {
  label: string
  href: string
}

export type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export const siteInfo = {
  companyName: 'Cloud Himalaya Pvt. Ltd.',
  email: 'info@cloudhimalaya.com',
  phoneMain: '+977-01-5351669',
  phoneSales: '+977-9802300610',
  phoneNoc: '+977-9801249898',
  asn: '135337',
  isoLine: 'ISO 27001',
  addressKathmandu: '4th Floor, Central Business Park, Thapathali',
  addressDr: 'DR: Labipur, Ward No. 17 (Thapa Tole), Itahari, Sunsari, Koshi Pradesh',
  addressUs: 'US: 11 Broadway 454, New York, NY 10004',
  // The client portal URL lives in src/config/site.ts (read from
  // CLIENT_PORTAL_URL), not here -- it is deployment configuration
  // rather than page content.
}

// Careers removed for now (kept in careersPreview below, just unrendered)
// -- see CareersPreview.tsx and page.tsx for the full note.
export const primaryNav: NavItem[] = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact Us', href: '/contact-us' },
]

// Contact bar above the header (TopBar.tsx), reusing the same phone/email
// values as the footer and hero rather than duplicating them.
export const topBar = {
  mainPhone: siteInfo.phoneMain,
  salesLabel: 'Sales:',
  salesPhone: siteInfo.phoneSales,
  nocLabel: 'NOC:',
  nocPhone: siteInfo.phoneNoc,
  // Display-only: the real tel: link still dials the single number above.
  nocPhoneDisplay: `${siteInfo.phoneNoc}/99`,
  email: siteInfo.email,
}

// TODO: real social URLs -- these are placeholders until the company
// supplies them (see the end-of-task summary list).
export const socialLinks: { name: 'Facebook' | 'Instagram' | 'LinkedIn'; href: string }[] = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
]

// Hero copy from the Figma hero design (docs/figma-hero-notes.md), which
// replaces the `hero` object below for the homepage. `hero` is left in
// place unused rather than deleted -- nothing else reads it.
export const figmaHero = {
  navCta: { label: 'Get a quote', href: '/contact-us?type=quote' },
  wordmarkLine1: 'CLOUD',
  wordmarkLine2: ' HIMALAYA',
  tagline: 'Data Management Above & Beyond',
  body: 'Secure, scalable data management, built at the roof of the world.',
  primaryCta: { label: 'Explore Solutions', href: '/services' },
  secondaryCta: { label: 'Talk to an Expert', href: '/contact' },
}

export const announcementBar = {
  label: 'NEW',
  text: '[Latest announcement pulled from Insights]',
  cta: 'Read more →',
  href: '/insights',
}

export const hero = {
  chipLabel: 'ISO 27001',
  pillText: "Kathmandu's data center since 2013",
  headingLine1: 'We Take Care of your Data.',
  headingLine2: 'You Take Care of your Business.',
  paragraph:
    "Colocation, VPS and managed services from Kathmandu's self-owned data center, replicated to Itahari.",
  primaryCta: { label: 'Find the right service →', href: '/services' },
  secondaryCta: { label: 'Book a data center tour', href: '/contact-us?type=tour' },
}

export type RackUnit = {
  id: string
  led2On: boolean
  // A few of the "on" units blink slowly rather than all of them, so the
  // rack reads as alive rather than uniform. Deterministic values (not
  // random), so the server and client render identically.
  blink: boolean
  blinkDelay: number
  blinkDuration: number
  trafficDelay: number
  // Made-up example role for the hover tooltip -- not a real inventory.
  role: string
}

const RACK_ROLES = ['Switch', 'Web server', 'Database', 'Storage', 'Backup', 'Power'] as const

export const serverRack = {
  header: { left: 'KTM-DC1 · RACK A07', right: '● ONLINE' },
  units: Array.from({ length: 9 }, (_, i): RackUnit => {
    const n = i + 1
    // LED 2 is blue on every unit except U03, U06 and U09.
    const led2On = n !== 3 && n !== 6 && n !== 9
    // Of the "on" units, only U01, U04 and U07 blink -- "a few, not all".
    const blink = led2On && (n === 1 || n === 4 || n === 7)
    return {
      id: `U0${n}`,
      led2On,
      blink,
      blinkDelay: (i % 3) * 0.8,
      blinkDuration: 2 + (i % 3) * 0.4,
      trafficDelay: i * 0.2,
      role: RACK_ROLES[i % RACK_ROLES.length],
    }
  }),
  chips: {
    uptime: { label: 'UPTIME COMMITMENT', value: '99.995%' },
    replication: { label: 'REPLICATED TO', value: 'Itahari DR site' },
    bandwidth: { value: '40 Gbps redundant fiber' },
  },
}

export const proofBar: { value: string; label: string }[] = [
  { value: '2013', label: 'in operation since' },
  { value: '500+', label: 'clients served' },
  { value: '1.5 MW', label: 'backup power, 25–30 days fuel' },
  { value: '24×7', label: 'dedicated NOC team' },
]

export const clientLogos = {
  heading: 'Trusted by 500+ businesses',
  sub: 'banks · fintech · media · schools · software',
  logos: [
    'Client 1',
    'Client 2',
    'Client 3',
    'Client 4',
    'Client 5',
    'Client 6',
    'Client 7',
    'Client 8',
    'Client 9',
    'Client 10',
    'Client 11',
    'Client 12',
  ],
}

export const aboutPreview = {
  eyebrow: 'ABOUT US',
  heading: 'A team of system and network engineers, based in Nepal',
  moreHref: '/about-us',
  moreLabel: 'More about us',
  photos: ['Image 1', 'Image 2', 'Image 3', 'Image 4'],
  paragraph:
    "Since 2013 we've run our own data center in Thapathali, in a self-owned, seismic-safe building that stood through the 2015 earthquake. Banks, fintech, media, schools and software teams trust us with their infrastructure.",
  stats: [
    { value: '2013', label: 'founded in Kathmandu' },
    { value: '500+', label: 'businesses served' },
    { value: '2 sites', label: 'Kathmandu and Itahari' },
    { value: siteInfo.isoLine, label: 'certified security' },
  ],
}

export type ServiceCardData = {
  slug: string
  eyebrow: string
  title: string
  description: string
  priceLabel?: string
  priceSuffix?: string
  chips?: string[]
}

export const servicesBento = {
  eyebrow: '01 / SERVICES',
  heading: 'Pick your layer of the stack',
  intro:
    'Bring your own hardware, rent ours, or hand us the whole thing. Every service runs on the same redundant facility.',
  colocation: {
    slug: 'colocation',
    tag1: 'MOST REQUESTED',
    tag2: 'quote-based',
    title: 'Colocation',
    description:
      'House your servers in our Kathmandu facility with redundant power, cooling and connectivity. Lower CAPEX, and OPEX that scales with your projects.',
    pills: ['A few units', 'Half rack', 'Full / multiple racks', 'Private cage'],
    cta: 'Request a colocation quote →',
  },
  cards: [
    {
      slug: 'vps',
      eyebrow: 'VPS',
      title: 'Virtual Private Servers',
      description:
        'Dedicated resources that scale up or down, with on-demand backups to our DR site.',
      priceLabel: '[PRICE]',
      priceSuffix: '/mo',
    },
    {
      slug: 'managed-services',
      eyebrow: 'MANAGED',
      title: 'Managed Services',
      description:
        'Value Host hardware, data protection with 1, 3 or 7-year retention, and expert database management.',
      chips: ['MySQL', 'MSSQL', 'Oracle', 'PostgreSQL', 'DB2', 'Sybase'],
    },
    {
      slug: 'web-hosting',
      eyebrow: 'WEB',
      title: 'Web Hosting',
      description:
        'Reliable hosting for sites and apps, from basic plans to larger deployments, hosted in Nepal.',
      priceLabel: '[PRICE]',
      priceSuffix: '/mo',
    },
    {
      slug: 'email-hosting',
      eyebrow: 'EMAIL',
      title: 'Email Hosting',
      description: 'Professional, secure email on your own domain.',
      priceLabel: '[PRICE]',
      priceSuffix: '/user/mo',
    },
  ] satisfies ServiceCardData[],
  helpCard: {
    title: 'Not sure what you need?',
    // The "one business day" promise is unconfirmed -- see docs/OPEN_QUESTIONS.md #2.
    description:
      'Describe your workload and an engineer will recommend a setup within one business day.',
    cta: 'Talk to an engineer →',
    href: '/contact',
  },
}

export type ServiceListItem = {
  slug: string
  title: string
  description: string
}

export const servicesListPreview = {
  eyebrow: 'SERVICES',
  heading: 'Infrastructure for every stage of your business',
  intro: 'Bring your own hardware, rent ours, or let us run it for you.',
  moreHref: '/services',
  moreLabel: 'More about our services',
  detailsLabel: (title: string) => `Details about ${title}`,
  items: [
    {
      slug: 'colocation',
      title: 'Colocation',
      description:
        'House your servers in our racks: a few units, half or full racks, or a private cage.',
    },
    {
      slug: 'vps',
      title: 'VPS',
      description: 'Virtual servers with dedicated resources that scale up or down.',
    },
    {
      slug: 'managed-services',
      title: 'Managed Services',
      description: 'Hardware, backups with 1/3/7-year retention, and managed databases.',
    },
    {
      slug: 'web-hosting',
      title: 'Web Hosting',
      description: 'Hosting for company websites and web apps, in Nepal.',
    },
    {
      slug: 'email-hosting',
      title: 'Email Hosting',
      description: 'Secure business email on your own domain.',
    },
  ] satisfies ServiceListItem[],
}

// Interactive rack drawing that replaces the 5-row list above
// (ServicesBlueprint.tsx), copied verbatim from
// docs/design/services-blueprint/services-blueprint-{light,dark}.html.
// "net" and "none" rack units (patch panel, switch, backup array) have
// no associated service, so ServicesBlueprintService excludes them.
export type ServicesBlueprintRackKey = 'net' | 'vps' | 'managed' | 'web' | 'email' | 'none' | 'colo'

export type ServicesBlueprintRackUnit = {
  start: number
  height: number
  label: string
  key: ServicesBlueprintRackKey
}

export type ServicesBlueprintService = {
  key: Exclude<ServicesBlueprintRackKey, 'net' | 'none'>
  number: string
  name: string
  units: string
  figureLabel: string
  description: string
  slug: string
}

export const servicesBlueprint = {
  ariaLabel:
    "Blueprint of a server cabinet. The selected service's units are highlighted and a magnified detail circle shows how that service works.",
  detailsLabel: (name: string) => `Details about ${name}`,
  rackUnits: [
    { start: 1, height: 1, label: 'PATCH', key: 'net' },
    { start: 2, height: 1, label: 'SWITCH', key: 'net' },
    { start: 4, height: 2, label: 'VPS HOST 1', key: 'vps' },
    { start: 6, height: 2, label: 'VPS HOST 2', key: 'vps' },
    { start: 8, height: 2, label: 'VPS HOST 3', key: 'vps' },
    { start: 10, height: 2, label: 'VPS HOST 4', key: 'vps' },
    { start: 13, height: 2, label: 'MONITOR · KVM', key: 'managed' },
    { start: 16, height: 2, label: 'WEB HOST 1', key: 'web' },
    { start: 18, height: 2, label: 'WEB HOST 2', key: 'web' },
    { start: 21, height: 3, label: 'BACKUP ARRAY', key: 'none' },
    { start: 25, height: 1, label: 'MAIL GW 1', key: 'email' },
    { start: 26, height: 1, label: 'MAIL GW 2', key: 'email' },
    { start: 29, height: 14, label: 'CUSTOMER HARDWARE', key: 'colo' },
  ] satisfies ServicesBlueprintRackUnit[],
  services: [
    {
      key: 'colo',
      number: '01',
      name: 'Colocation',
      units: 'U29–U42',
      figureLabel: 'CUSTOMER CAGE',
      description:
        'Colocation: your own servers live in a locked section of our cabinets, with our power, cooling and network.',
      slug: 'colocation',
    },
    {
      key: 'vps',
      number: '02',
      name: 'VPS',
      units: 'U4–U11',
      figureLabel: 'VIRTUAL MACHINES IN A HOST',
      description:
        'VPS: each physical host is divided into several virtual servers. Yours gets its own dedicated slice of CPU, memory and storage.',
      slug: 'vps',
    },
    {
      key: 'managed',
      number: '03',
      name: 'Managed Services',
      units: 'U13–U14',
      figureLabel: 'MONITORING CONSOLE',
      description:
        'Managed Services: our team monitors every component, keeps it patched, and fixes problems before they reach you.',
      slug: 'managed-services',
    },
    {
      key: 'web',
      number: '04',
      name: 'Web Hosting',
      units: 'U16–U19',
      figureLabel: 'WEBSITE ON A WEB SERVER',
      description:
        'Web Hosting: your website files and databases live on our web servers, connected to the internet through our network.',
      slug: 'web-hosting',
    },
    {
      key: 'email',
      number: '05',
      name: 'Email Hosting',
      units: 'U25–U26',
      figureLabel: 'MAIL ROUTING',
      description:
        'Email Hosting: mail gateways route your messages to every inbox on your domain.',
      slug: 'email-hosting',
    },
  ] satisfies ServicesBlueprintService[],
}

export const dataCenterPreview = {
  eyebrow: 'OUR DATA CENTER',
  heading: 'Built in Kathmandu. Built to stay online.',
  paragraph:
    'Every critical system has a backup, and a second site in Itahari keeps copies of your data in another city.',
  moreHref: '/services/data-center',
  moreLabel: 'More about our data center',
  path: [
    { title: 'Your team', sub: 'office and apps' },
    { title: 'KTM-DC1', sub: 'Thapathali' },
    { title: 'Itahari DR', sub: 'second site' },
    { title: 'Backups', sub: '1, 3 or 7 years' },
  ],
  specs: [
    { label: 'POWER', value: '1.5 MW · 25–30 days fuel' },
    { label: 'NETWORK', value: '40 Gbps redundant fiber' },
    { label: 'COOLING', value: 'Redundant precision AC' },
    { label: 'SECURITY', value: 'Guards, CCTV, FM-200' },
  ],
}

export const careersPreview = {
  eyebrow: 'CAREERS',
  heading: "Build Nepal's cloud with us",
  paragraph: "We're hiring system and network engineers in Kathmandu.",
  moreHref: '/careers',
  moreLabel: 'More about careers',
  photoCaption: '[ photo: the team at work — client to supply ]',
  roles: [
    { title: '[Open role]', location: 'Kathmandu · Full-time' },
    { title: '[Open role]', location: 'Kathmandu · Full-time' },
    { title: '[Open role]', location: 'Kathmandu · Full-time' },
  ],
}

export const contactPreview = {
  eyebrow: 'CONTACT US',
  heading: 'Tell us what you run',
  paragraph: 'Call, email or visit. An engineer will recommend a setup and send a quote.',
  moreHref: '/contact-us',
  moreLabel: 'More ways to contact us',
  primaryCta: { label: 'Get a quote', href: '/contact-us?type=quote' },
  secondaryCta: { label: 'Book a data center tour', href: '/contact-us?type=tour' },
  items: [
    { label: 'SALES', value: siteInfo.phoneSales },
    { label: 'NOC · 24×7', value: siteInfo.phoneNoc },
    { label: 'EMAIL', value: siteInfo.email },
    { label: 'VISIT', value: 'Thapathali, Kathmandu' },
  ],
}

export const resilience = {
  eyebrow: '02 / RESILIENCE',
  heading: 'Two sites. One promise: your data survives the worst day.',
  paragraph:
    "Our primary site is self-owned, so there's no lease to expire and no forced move. The building came through the 7.8 Mw earthquake of 2015. A second site in Itahari covers point, rolling, site and geo-level disasters.",
  miniCards: [
    { title: 'Self-owned site', sub: 'No lease or relocation risk' },
    { title: 'Seismic-safe', sub: 'Proven in 2015' },
    { title: 'Geo-separated DR', sub: 'Itahari, Sunsari' },
    { title: 'ISO 27001', sub: 'Certified security' },
  ],
  diagram: {
    headerLeft: 'NETWORK · SCHEMATIC',
    headerRight: 'not to scale',
    ariaLabel:
      'Diagram: Kathmandu primary data center replicating to Itahari disaster recovery site, with a corporate office in New York',
    kathmandu: { title: 'Kathmandu', sub: 'PRIMARY · THAPATHALI' },
    itahari: { title: 'Itahari', sub: 'DISASTER RECOVERY' },
    replicationLabel: 'replication + backups',
    newYorkLabel: 'NEW YORK OFFICE',
  },
}

export type FacilityTab = {
  id: string
  label: string
  photoCaption: string
  specs: { value: string; label: string }[]
}

export const facilityTabs = {
  eyebrow: '03 / INSIDE THE DATA CENTER',
  heading: 'Every critical system has a twin',
  cta: { label: 'Full facility specifications →', href: '/services/data-center' },
  tabs: [
    {
      id: 'power',
      label: 'Power',
      photoCaption: '[ photo: generator room — client to supply ]',
      specs: [
        { value: '1.5 MW', label: 'diesel generators running in sync mode' },
        { value: '30 min', label: 'redundant UPS battery backup' },
        { value: '25–30 days', label: 'fuel stored for a complete outage' },
      ],
    },
    {
      id: 'network',
      label: 'Network',
      photoCaption: '[ photo: meet-me room / fiber — client to supply ]',
      specs: [
        { value: '40 Gbps', label: 'redundant fiber, internet and intranet' },
        { value: 'Ring', label: 'fiber ring across Kathmandu' },
        { value: 'Tagged', label: 'color-coded cabling, patch panels in a database' },
      ],
    },
    {
      id: 'cooling',
      label: 'Cooling',
      photoCaption: '[ photo: hot / cold aisle — client to supply ]',
      specs: [
        { value: 'Hot / cold', label: 'aisle containment design' },
        { value: 'PAC', label: 'redundant precision air conditioning' },
        { value: '5 kW', label: 'power per rack, customizable' },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      photoCaption: '[ photo: entrance and CCTV — client to supply ]',
      specs: [
        { value: '24×7', label: 'guards, perimeter wall and surveillance' },
        { value: '360°', label: 'CCTV, recordings kept 3 months' },
        { value: 'FM-200', label: 'fire suppression on smoke threshold' },
      ],
    },
    {
      id: 'building',
      label: 'Building',
      photoCaption: '[ photo: building exterior — client to supply ]',
      specs: [
        { value: 'Owned', label: 'self-owned site, no lease risk' },
        { value: '2015', label: 'came through the 7.8 Mw earthquake' },
        { value: 'DR', label: 'second site in Itahari, Sunsari' },
      ],
    },
  ] satisfies FacilityTab[],
}

export const gettingStarted = {
  heading: 'Live in three steps',
  steps: [
    {
      label: 'STEP 1',
      title: 'Tell us your workload',
      text: 'Share what you run, how much it needs and your compliance needs, by form, phone or a visit.',
    },
    {
      label: 'STEP 2',
      title: 'Get a design and quote',
      text: 'Our engineers size the setup, from rack space to backups, and send a clear quote.',
    },
    {
      label: 'STEP 3',
      title: 'Go live, monitored 24×7',
      text: 'We provision, migrate with you, and our NOC watches it from day one.',
    },
  ],
}

export const slaTable = {
  heading: 'Response times we commit to',
  cta: { label: 'Read the SLA →', href: '/legal/sla' },
  columns: ['PRIORITY', 'RESPONSE', 'RESOLUTION'],
  rows: [
    {
      priority: 'P1',
      tone: 'p1' as const,
      note: 'Service down',
      response: '1 hr',
      resolution: '1 hr',
    },
    { priority: 'P2', tone: 'p2' as const, note: 'Degraded', response: '2 hr', resolution: '4 hr' },
    {
      priority: 'P3',
      tone: 'accent' as const,
      note: 'Maintenance',
      response: '4 hr',
      resolution: '12–48 hr',
    },
    {
      priority: 'P4',
      tone: 'subtle' as const,
      note: 'Service change',
      response: '12–24 hr',
      resolution: '7 days',
    },
  ],
}

export type Testimonial = {
  quote: string
  name: string
  company: string
}

// Permission to publish is pending confirmation -- see docs/OPEN_QUESTIONS.md #7.
export const testimonials: Testimonial[] = [
  {
    quote: 'Everything is good and the team is amazing.',
    name: 'Shree Niraula',
    company: 'Sizyo Solutions',
  },
]

export const faq = {
  eyebrow: '05 / FAQ',
  heading: 'Questions, answered',
  contactLine: {
    prefix: "Can't find yours? Email",
    email: siteInfo.email,
    mid: 'or call',
    phone: siteInfo.phoneMain,
  },
  items: [
    {
      question: 'What sets your colocation apart?',
      answer:
        'Your servers sit in a self-owned, seismic-safe facility with end-to-end redundancy in power, cooling and connectivity, backed by SLAs and a 24×7 NOC.',
    },
    {
      question: 'How do you keep services available 24×7?',
      answer:
        'Redundant generators, UPS, precision cooling and a 40 Gbps fiber ring, plus a dedicated NOC team and an incident process with root-cause analysis.',
    },
    {
      question: 'How is bandwidth priced?',
      answer:
        'We offer flexible pricing for both internet and intranet bandwidth. Tell us your needs and we will quote.',
    },
    {
      question: 'Can I scale my VPS up or down?',
      answer: 'Yes. VPS resources can be scaled as your needs change.',
    },
    {
      question: 'How do you handle backup and disaster recovery?',
      answer:
        'On-demand backups, copies kept at multiple sites, and a disaster recovery site in Itahari. Retention options of 1, 3 or 7 years are available.',
    },
  ],
}

export type InsightsPreviewCard = {
  category: 'ANNOUNCEMENT' | 'GUIDE' | 'MAINTENANCE'
  date: string
  title: string
  excerpt: string
}

export const insightsPreview = {
  eyebrow: 'INSIGHTS',
  heading: 'News, guides and notices',
  moreHref: '/insights',
  moreLabel: 'More insights',
  cards: [
    {
      category: 'ANNOUNCEMENT' as const,
      date: '[DATE]',
      title: '[Post title from the CMS]',
      excerpt: '[Excerpt, about two lines, from the post’s summary field]',
    },
    {
      category: 'GUIDE' as const,
      date: '[DATE]',
      title: '[Post title from the CMS]',
      excerpt: '[Excerpt, about two lines, from the post’s summary field]',
    },
    {
      category: 'MAINTENANCE' as const,
      date: '[DATE]',
      title: '[Post title from the CMS]',
      excerpt: '[Excerpt, about two lines, from the post’s summary field]',
    },
  ] satisfies InsightsPreviewCard[],
}

export const finalCta = {
  heading: 'Talk to an engineer, not a call center.',
  subtext: `Sales ${siteInfo.phoneSales} · NOC ${siteInfo.phoneNoc}`,
  primary: { label: 'Request a quote', href: '/contact-us?type=quote' },
  secondary: { label: "We're hiring →", href: '/careers' },
}

export const footer = {
  tagline: 'Data Management Above & Beyond',
  certLine: `${siteInfo.isoLine} · ASN ${siteInfo.asn}`,
  servicesLinks: [
    { label: 'Colocation', href: '/services/colocation' },
    { label: 'VPS', href: '/services/vps' },
    { label: 'Managed Services', href: '/services/managed-services' },
    { label: 'Web Hosting', href: '/services/web-hosting' },
    { label: 'Email Hosting', href: '/services/email-hosting' },
  ] satisfies FooterLink[],
  companyLinks: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Insights', href: '/insights' },
    { label: 'Careers', href: '/careers' },
    // "Client Login" is deliberately not in this list: the footer
    // renders it through the shared ClientLoginLink component instead,
    // so its URL (src/config/site.ts) and accessible name stay
    // identical to the header's and the mobile menu's.
    { label: 'Contact Us', href: '/contact-us' },
  ] satisfies FooterLink[],
  kathmandu: {
    heading: 'Kathmandu',
    address: siteInfo.addressKathmandu,
    phone: siteInfo.phoneMain,
    email: siteInfo.email,
  },
  otherOffices: {
    heading: 'Other offices',
    dr: siteInfo.addressDr,
    us: siteInfo.addressUs,
  },
  legalLinks: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'SLA', href: '/legal/sla' },
    { label: 'Acceptable Use', href: '/legal/aup' },
  ] satisfies FooterLink[],
}
