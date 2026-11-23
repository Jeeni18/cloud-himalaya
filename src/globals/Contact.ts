import type { GlobalConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { revalidateGlobalPage } from '../hooks/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateGlobalPage('/contact')],
  },
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
      admin: {
        description:
          'Intro text shown above the enquiry form (the form itself is separate, later work).',
      },
    },
    seoFields(),
  ],
}
