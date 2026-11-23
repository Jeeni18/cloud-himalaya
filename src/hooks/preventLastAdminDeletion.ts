import { APIError } from 'payload'
import type { CollectionBeforeDeleteHook } from 'payload'

// Blocks deleting the last remaining Admin. Runs regardless of
// overrideAccess, since it's a hook, not an access check -- so even a
// Local API script can't accidentally create a lockout this way.
export const preventLastAdminDeletion: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const target = await req.payload.findByID({ collection: 'users', id })

  if (target?.role !== 'admin') return

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    where: {
      role: { equals: 'admin' },
      id: { not_equals: id },
    },
  })

  if (totalDocs === 0) {
    throw new APIError('Cannot delete the last remaining Admin.', 400, null, true)
  }
}
