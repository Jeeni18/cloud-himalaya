import type { GlobalConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { navItems } from '../fields/navItems'
import { revalidateLayout } from '../hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidateLayout()],
  },
  fields: [
    navItems(),
    {
      name: 'copyrightText',
      type: 'text',
      admin: {
        description:
          'Optional text shown alongside the copyright year, e.g. a trademark or registration line. The year itself is generated automatically by the frontend.',
      },
    },
  ],
}
