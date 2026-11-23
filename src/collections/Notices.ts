import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { revalidateCollectionPaths } from '../hooks/revalidate'

type NoticeDoc = { id: number; slug: string }

const { afterChange, afterDelete } = revalidateCollectionPaths<NoticeDoc>(() => ['/insights'])

// Notices back the pinned amber bar on /insights (docs/design/insights/)
// -- an operational status (scheduled/in-progress/completed), not an
// editorial draft/publish workflow, so there's no versions.drafts here.
// Read access is open: nothing here is sensitive, and the page itself
// decides what to actually show (pinned + not yet ended), not the
// collection's access rules.
export const Notices: CollectionConfig = {
  slug: 'notices',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'pinned', 'startsAt'],
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'affects',
      type: 'text',
      required: true,
      admin: {
        description: 'What this notice affects, e.g. "Core network switches".',
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endsAt',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'The bar stops showing once this time has passed.',
      },
    },
    {
      name: 'whatYouDo',
      type: 'text',
      required: true,
      admin: {
        description: 'The short "what you need to do" line, e.g. "No action needed."',
      },
    },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only a pinned notice (and not yet ended) shows in the amber bar.',
      },
    },
    {
      name: 'relatedPost',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        description: 'Optional. "Details" links here if set.',
      },
    },
  ],
}
