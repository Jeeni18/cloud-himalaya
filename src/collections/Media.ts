import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Media is served publicly on the website, so reads stay open.
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // SVG is deliberately excluded: an uploaded SVG can carry embedded
    // scripts and is a known stored-XSS vector when served to the browser.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
}
