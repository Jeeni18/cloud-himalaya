import type { GlobalConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { revalidateLayout } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    // Read is public: the frontend needs this to render on every request.
    read: () => true,
    // "Settings" are admin-only per CLAUDE.md section 9, unlike page
    // content (Home/About/Data Center/Contact, Services, Legal) which
    // editors can also manage.
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidateLayout()],
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'clientPortalUrl',
      type: 'text',
      label: 'Client login URL',
      admin: {
        description: 'External WHMCS/client-portal URL. Leave blank to hide the link.',
      },
    },
    {
      name: 'supportPortalUrl',
      type: 'text',
      label: 'Support portal URL',
      admin: {
        description: 'External support/ticketing URL. Leave blank to hide the link.',
      },
    },
  ],
}
