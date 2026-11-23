import type { GlobalConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { revalidateGlobalPage } from '../hooks/revalidate'

export const DataCenter: GlobalConfig = {
  slug: 'data-center',
  label: 'Data Center Page',
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrAuthenticated,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateGlobalPage('/data-center')],
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
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    seoFields(),
  ],
}
