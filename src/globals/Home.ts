import type { GlobalConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { revalidateGlobalPage } from '../hooks/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  versions: {
    drafts: true,
  },
  access: {
    // Page content, not a structural setting: any authenticated editor
    // or admin can update it, unlike Header/Footer/Site Settings.
    read: publishedOrAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateGlobalPage('/')],
  },
  fields: [
    {
      type: 'tabs',
      // One tab per homepage section, so new sections are added as
      // tabs here, never a restructure of what already exists.
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: 'Primary button label',
            },
            {
              name: 'ctaUrl',
              type: 'text',
              label: 'Primary button URL',
            },
            {
              name: 'secondaryLabel',
              type: 'text',
              label: 'Secondary link label',
            },
            {
              name: 'secondaryUrl',
              type: 'text',
              label: 'Secondary link URL',
            },
          ],
        },
        {
          name: 'dataCenter',
          label: 'Data Center',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'servicesOverview',
          label: 'Services Overview',
          admin: {
            description:
              'The service cards themselves come from the Services collection, not from here.',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'intro',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'whyUs',
          label: 'Why Us',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'points',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'proof',
          label: 'Proof',
          fields: [
            {
              name: 'showSection',
              type: 'checkbox',
              defaultValue: false,
              label: 'Show this section',
              admin: {
                description:
                  'Off by default -- the company may not approve using client logos or a testimonial.',
              },
            },
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'clientLogos',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'testimonialQuote',
              type: 'textarea',
            },
            {
              name: 'testimonialAttribution',
              type: 'text',
            },
          ],
        },
        {
          name: 'gettingStarted',
          label: 'Getting Started',
          fields: [
            {
              name: 'showSection',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show this section',
            },
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'steps',
              type: 'array',
              minRows: 1,
              maxRows: 5,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          name: 'finalCta',
          label: 'Final CTA',
          admin: {
            description: 'Phone and email render from Site Settings, not duplicated here.',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaUrl',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    seoFields(),
  ],
}
