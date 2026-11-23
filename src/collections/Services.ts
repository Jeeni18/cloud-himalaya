import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { autoSlugFromTitle } from '../hooks/autoSlugFromTitle'
import { revalidateCollectionPaths } from '../hooks/revalidate'

type ServiceDoc = { id: number; slug: string }

const { afterChange, afterDelete } = revalidateCollectionPaths<ServiceDoc>((doc) => [
  '/services',
  `/services/${doc.slug}`,
])

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isAuthenticated,
    read: publishedOrAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeValidate: [autoSlugFromTitle],
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in the service URL. Auto-filled from the title if left blank.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown in service listings and cards.',
      },
    },
    {
      name: 'details',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full service description shown on the service detail page.',
      },
    },
    seoFields(),
  ],
}
