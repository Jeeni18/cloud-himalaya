import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'
import { isAdminField } from '../access/isAdminField'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { forceFirstUserAdmin } from '../hooks/forceFirstUserAdmin'
import { preventLastAdminDeletion } from '../hooks/preventLastAdminDeletion'
import { preventLastAdminDowngrade } from '../hooks/preventLastAdminDowngrade'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Payload always allows create when the collection is empty, so the
    // company's first admin can still sign up through the setup screen.
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [forceFirstUserAdmin],
    beforeDelete: [preventLastAdminDeletion],
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only admins may change who has the admin role.
        update: isAdminField,
      },
      validate: preventLastAdminDowngrade,
    },
  ],
}
