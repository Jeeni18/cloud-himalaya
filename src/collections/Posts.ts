import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { publishedOrAuthenticated } from '../access/publishedOrAuthenticated'
import { seoFields } from '../fields/seo'
import { autoSlugFromTitle } from '../hooks/autoSlugFromTitle'
import { computeReadingTime } from '../hooks/computeReadingTime'
import { revalidateCollectionPaths } from '../hooks/revalidate'

type PostDoc = { id: number; slug: string }

const { afterChange, afterDelete } = revalidateCollectionPaths<PostDoc>((doc) => [
  '/insights',
  `/insights/${doc.slug}`,
])

// Categories match /insights' 5 approved filters exactly (docs/design/
// insights/). The reference's own sample feed shows 2 more -- "Backups"
// and "Networking" -- but its filter sidebar's counts only add up across
// these 5, so those 2 samples are seeded under "guide" instead of adding
// categories that weren't approved.
export const POST_CATEGORIES = [
  { label: 'Announcement', value: 'announcement' },
  { label: 'Guide', value: 'guide' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Security', value: 'security' },
  { label: 'Company news', value: 'company-news' },
] as const

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
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
    beforeChange: [computeReadingTime],
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
        description: 'Used in the post URL. Auto-filled from the title if left blank.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Shown on post cards. About two lines.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [...POST_CATEGORIES],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional. If left blank, the card shows a drawn category cover instead.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        description: 'Controls display order and the date shown on the post.',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      min: 1,
      admin: {
        description: 'Minutes to read. Leave blank to calculate from the content automatically.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    seoFields(),
  ],
}
