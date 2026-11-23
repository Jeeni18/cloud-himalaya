import type { GlobalConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { navItems } from '../fields/navItems'
import { revalidateLayout } from '../hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'ctaLabel',
      type: 'text',
      label: 'Button label',
      defaultValue: 'Talk to sales',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button URL',
      defaultValue: '/contact',
    },
  ],
}
