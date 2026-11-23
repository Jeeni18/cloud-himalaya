import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

// Enquiries from the /contact-us form (docs/design/contact-us/). This
// holds customer contact details, so it's narrower than the Editor-
// level access most content collections get: only Admins can read,
// update or delete, via the same isAdmin helper Users.ts already uses.
// The public can only create -- and only through submitEnquiry.ts's
// server action, which validates and rate-limits before this ever runs.
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'topic', 'email', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'topic',
      type: 'select',
      required: true,
      options: [
        { label: 'Get a quote', value: 'quote' },
        { label: 'Book a tour', value: 'tour' },
        { label: 'Support', value: 'support' },
        { label: 'Billing', value: 'billing' },
        { label: 'Something else', value: 'other' },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Colocation', value: 'colocation' },
        { label: 'VPS', value: 'vps' },
        { label: 'Managed Services', value: 'managed-services' },
        { label: 'Web Hosting', value: 'web-hosting' },
        { label: 'Email Hosting', value: 'email-hosting' },
        { label: 'Not sure', value: 'not-sure' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'sourcePage',
      type: 'text',
      admin: {
        description: 'The page (and query string) the form was submitted from.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
