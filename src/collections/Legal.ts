import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { autoSlugFromTitle } from '../hooks/autoSlugFromTitle'
import { revalidateCollectionPaths } from '../hooks/revalidate'

type LegalDoc = { id: number; slug: string }

const { afterChange, afterDelete } = revalidateCollectionPaths<LegalDoc>((doc) => [
  `/legal/${doc.slug}`,
])

export const Legal: CollectionConfig = {
  slug: 'legal',
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
        description: 'Used in the page URL. Auto-filled from the title if left blank.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    seoFields(),
  ],
}
