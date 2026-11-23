// Typed static content for /about-us (docs/design/about-us/). Every
// field mirrors a future Payload field one-for-one, same pattern as
// src/content/home.ts -- Phase 2 only changes where the data comes from.
// The intro section's heading/paragraph/stats/photos are intentionally
// NOT duplicated here -- they're imported from aboutPreview in home.ts,
// since the reference's intro text is identical to the homepage's About
// Us preview.

export const seo = {
  title: 'About Us | Cloud Himalaya',
  description:
    "Cloud Himalaya is a team of system and network engineers running Nepal's self-owned data center since 2013.",
}

export const promiseBanner = {
  statement: "Infrastructure is a promise. We've been keeping ours",
  statementAccent: 'since 2013.',
  pillars: [
    {
      number: '01',
      label: 'MISSION',
      text: 'Give Nepali businesses reliable, secure infrastructure at home, run by people they can reach.',
    },
    {
      number: '02',
      label: 'VISION',
      text: "Be the data center Nepal's most important systems depend on.",
    },
    {
      number: '03',
      label: 'APPROACH',
      text: 'Own the building, run it ourselves, and keep a copy in a second city.',
    },
  ],
}

export const founderMessage = {
  photoCaption: 'Founder photo',
  name: 'Name Surname',
  title: 'Founder & Managing Director',
  eyebrow: 'A message from our founder',
  // Placeholder text, exactly as marked in the reference -- not invented.
  quote: "Placeholder: why the company started in 2013, in the founder's own words.",
  paragraph:
    'Placeholder paragraph: two or three sentences about what Cloud Himalaya set out to do, what the team has learned, and what customers can expect. Written by the founder.',
  signature: 'Signature',
}

export type Team = {
  slug: string
  name: string
  photoCaption: string
  description: string
  peopleCount: number
}

export const teamsSection = {
  eyebrow: 'Meet the people behind it',
  heading: 'Every team that keeps you online',
  regionLabel: 'Teams',
  prevLabel: 'Previous teams',
  nextLabel: 'Next teams',
  teams: [
    {
      slug: 'leadership',
      name: 'Leadership',
      photoCaption: 'Group photo: Leadership',
      description: 'Sets direction and looks after the company.',
      peopleCount: 3,
    },
    {
      slug: 'engineering',
      name: 'Engineering',
      photoCaption: 'Group photo: Engineering',
      description: 'Builds and runs the servers, network and storage.',
      peopleCount: 8,
    },
    {
      slug: 'noc',
      name: 'NOC',
      photoCaption: 'Group photo: NOC',
      description: 'Watches everything and answers the phone when it rings.',
      peopleCount: 5,
    },
    {
      slug: 'sales',
      name: 'Sales',
      photoCaption: 'Group photo: Sales',
      description: 'Helps you choose the right service and size.',
      peopleCount: 4,
    },
    {
      slug: 'marketing',
      name: 'Marketing',
      photoCaption: 'Group photo: Marketing',
      description: 'Tells the Cloud Himalaya story.',
      peopleCount: 2,
    },
    {
      slug: 'support',
      name: 'Support',
      photoCaption: 'Group photo: Support',
      description: 'Helps with day-to-day questions.',
      peopleCount: 2,
    },
  ] satisfies Team[],
}

export const lifeSection = {
  eyebrow: 'Life at Cloud Himalaya',
  heading: "What it's like to work here",
  intro: 'The work is serious. The people are not always.',
  collage: [
    { caption: 'Photo: team at work' },
    { caption: 'Photo: celebration' },
    { caption: 'Photo: training day' },
    { caption: 'Photo: outing' },
  ],
  figureLabel: 'FIG. 1–4',
  figureCaption: 'Captions go here: where and when each photo was taken.',
  cards: [
    {
      title: 'Learn on real systems',
      description: '[Placeholder: training, certifications, mentoring]',
    },
    {
      title: 'Small teams, real say',
      description: '[Placeholder: how decisions get made]',
    },
    {
      title: 'Grow with us',
      description: '[Placeholder: career paths]',
    },
    {
      title: 'Kathmandu office',
      description: '[Placeholder: office life, festivals, outings]',
    },
  ],
}

export const visitUs = {
  eyebrow: 'Visit us',
  heading: 'Your visitor pass is waiting.',
  paragraph:
    "We'd rather show you than tell you. Book a tour, meet the engineers and see where your data would live.",
  // /contact-us is the real enquiry-form page (built later in the
  // project); Hero.tsx's own "Book a data center tour" button uses the
  // same link.
  primaryCta: { label: 'Book a data center tour', href: '/contact-us?type=tour' },
  secondaryCta: { label: 'Get a quote', href: '/contact-us?type=quote' },
  pass: {
    issuer: 'CLOUD HIMALAYA · KTM-DC1',
    title: 'VISITOR',
    fields: [
      { label: 'NAME', value: 'You' },
      { label: 'COMPANY', value: 'Your business' },
      { label: 'ESCORTED BY', value: 'An engineer' },
      { label: 'AREA', value: 'Server hall' },
    ],
    validity: 'VALID: THE DAY YOU BOOK',
  },
}
