import type { ServiceSlug } from './services'

// Typed pricing data for /services, Step 3. Every number here is a
// placeholder -- TODO: replace with real figures from sales before
// launch. `null` means "not set yet" and the UI shows "Price on
// request" (or "NPR --" for the estimator) instead of a number, so the
// page can launch before prices are finalised.
//
// Plan-tier shape per service is taken from the reference's own
// starting-prices table hints, not invented: VPS is the only service
// with a fully-specified 3-tier card layout in the reference (Starter /
// Business / Performance); Colocation's table row ("a few units, half
// rack, full racks, or a private cage") implies 4 tiers; Managed
// Services' row ("Basic, File, or Advanced") implies 3 named tiers; Web
// Hosting's row is literally "[Plans to confirm]" -- so it gets a single
// placeholder tier rather than 3 invented names; Email Hosting's row
// ("Per mailbox") implies one per-unit rate, not multiple tiers.

export type Price = number | null

export type PlanTier = {
  name: string
  description: string
  price: Price
  billingUnit: '/month' | '/year' | '/mailbox/month'
  mostChosen?: boolean
  features: string[]
}

export type ServicePricing = {
  slug: ServiceSlug
  name: string
  // "Options" column text on the starting-prices table.
  optionsLabel: string
  startingPrice: Price
  startingUnit: '/month' | '/year' | '/mailbox/month'
  plans: PlanTier[]
}

const STANDARD_FEATURES = ['24x7 NOC support', '99.995% uptime commitment']

export const servicePricing: ServicePricing[] = [
  {
    slug: 'colocation',
    name: 'Colocation',
    optionsLabel: 'A few units, half rack, full racks or a private cage',
    startingPrice: null,
    startingUnit: '/month',
    plans: [
      {
        name: 'A few units',
        description: 'For a handful of servers',
        price: null,
        billingUnit: '/month',
        features: ['[X] U of rack space', 'Shared power & cooling', ...STANDARD_FEATURES],
      },
      {
        name: 'Half rack',
        description: 'For a growing footprint',
        price: null,
        billingUnit: '/month',
        mostChosen: true,
        features: ['[X] U of rack space', 'Dedicated power circuit', ...STANDARD_FEATURES],
      },
      {
        name: 'Full rack',
        description: 'For a dedicated deployment',
        price: null,
        billingUnit: '/month',
        features: ['42U of rack space', 'Dedicated power circuit', ...STANDARD_FEATURES],
      },
      {
        name: 'Private cage',
        description: 'For large or regulated workloads',
        price: null,
        billingUnit: '/month',
        features: ['Locked, dedicated cage', 'Dedicated power circuit', ...STANDARD_FEATURES],
      },
    ],
  },
  {
    slug: 'vps',
    name: 'VPS',
    optionsLabel: 'Starter, Business, Performance or custom',
    startingPrice: null,
    startingUnit: '/month',
    plans: [
      {
        name: 'Starter',
        description: 'For a small app or test server',
        price: null,
        billingUnit: '/month',
        features: [
          '[X] vCPU',
          '[X] GB RAM',
          '[X] GB SSD storage',
          '[X] TB bandwidth',
          ...STANDARD_FEATURES,
        ],
      },
      {
        name: 'Business',
        description: 'For production apps and busy sites',
        price: null,
        billingUnit: '/month',
        mostChosen: true,
        features: [
          '[X] vCPU',
          '[X] GB RAM',
          '[X] GB SSD storage',
          '[X] TB bandwidth',
          ...STANDARD_FEATURES,
        ],
      },
      {
        name: 'Performance',
        description: 'For databases and heavy workloads',
        price: null,
        billingUnit: '/month',
        features: [
          '[X] vCPU',
          '[X] GB RAM',
          '[X] GB SSD storage',
          '[X] TB bandwidth',
          ...STANDARD_FEATURES,
        ],
      },
    ],
  },
  {
    slug: 'managed-services',
    name: 'Managed Services',
    optionsLabel: 'Basic, File or Advanced service level',
    startingPrice: null,
    startingUnit: '/month',
    plans: [
      {
        name: 'Basic',
        description: 'Monitoring and alerting only',
        price: null,
        billingUnit: '/month',
        features: ['24x7 monitoring', 'Incident alerting', ...STANDARD_FEATURES],
      },
      {
        name: 'File',
        description: 'Monitoring plus patching',
        price: null,
        billingUnit: '/month',
        mostChosen: true,
        features: ['24x7 monitoring', 'Patching & security updates', ...STANDARD_FEATURES],
      },
      {
        name: 'Advanced',
        description: 'Full hands-on management',
        price: null,
        billingUnit: '/month',
        features: [
          '24x7 monitoring',
          'Patching & security updates',
          'Engineer incident response',
          ...STANDARD_FEATURES,
        ],
      },
    ],
  },
  {
    slug: 'web-hosting',
    name: 'Web Hosting',
    optionsLabel: '[Plans to confirm]',
    startingPrice: null,
    startingUnit: '/year',
    plans: [
      {
        name: '[Plans to confirm]',
        description: '[Confirm: tier names and specs for web hosting]',
        price: null,
        billingUnit: '/year',
        features: ['Web server, database & email', 'Free SSL certificate', 'Daily backups'],
      },
    ],
  },
  {
    slug: 'email-hosting',
    name: 'Email Hosting',
    optionsLabel: 'Per mailbox',
    startingPrice: null,
    startingUnit: '/mailbox/month',
    plans: [
      {
        name: 'Per mailbox',
        description: 'One rate per mailbox, any quantity',
        price: null,
        billingUnit: '/mailbox/month',
        features: [
          'Webmail, IMAP & SMTP',
          'Spam & malware filtering',
          'Shared calendars & contacts',
        ],
      },
    ],
  },
]

export function getServicePricing(slug: ServiceSlug): ServicePricing {
  const pricing = servicePricing.find((service) => service.slug === slug)
  if (!pricing) throw new Error(`No pricing data for service "${slug}"`)
  return pricing
}

export type SliderConfig = {
  min: number
  max: number
  step: number
  default: number
  ratePerUnit: Price
}

// estimate = basePrice + (vCPU x vcpu.ratePerUnit) + (memoryGb x
// memoryGb.ratePerUnit) + (storageGb x storageGb.ratePerUnit) + addons.
export const vpsEstimator = {
  basePrice: null as Price,
  vcpu: { min: 1, max: 16, step: 1, default: 4, ratePerUnit: null } satisfies SliderConfig,
  memoryGb: { min: 1, max: 64, step: 1, default: 8, ratePerUnit: null } satisfies SliderConfig,
  storageGb: {
    min: 20,
    max: 2000,
    step: 10,
    default: 200,
    ratePerUnit: null,
  } satisfies SliderConfig,
  // TODO: confirm yearly billing discount; null means yearly shows the
  // same estimate as monthly, labelled "[confirm discount]".
  yearlyDiscountMultiplier: null as number | null,
  addons: {
    backups: { label: 'Backups', price: null as Price },
    managed: { label: 'Managed', price: null as Price },
    itahariDr: { label: 'Itahari DR', price: null as Price },
  },
}

export type AddonKey = keyof typeof vpsEstimator.addons

// For the VPS estimator, which always shows a running total.
export function formatNpr(amount: number | null): string {
  if (amount === null) return 'NPR —'
  return `NPR ${new Intl.NumberFormat('en-IN').format(amount)}`
}

// For plan cards and the starting-prices table, where "no price yet"
// should read as "Price on request" rather than a blank or placeholder
// number.
export function formatPlanPrice(price: Price): string {
  if (price === null) return 'Price on request'
  return `NPR ${new Intl.NumberFormat('en-IN').format(price)}`
}
