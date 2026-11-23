import type { Validate } from 'payload'

// Blocks changing the last remaining Admin's role to anything else.
// This is a validation rule, not an access-control rule: an Admin is
// always *allowed* to edit the role field (see isAdminField); this just
// refuses the specific edit that would leave the site with zero Admins.
// Runs regardless of overrideAccess, since it's a hook, not an access
// check -- so even a Local API script can't accidentally create a
// lockout this way.
export const preventLastAdminDowngrade: Validate<string> = async (
  value,
  { operation, previousValue, req, id },
) => {
  if (operation === 'update' && previousValue === 'admin' && value !== 'admin') {
    const { totalDocs } = await req.payload.count({
      collection: 'users',
      where: {
        role: { equals: 'admin' },
        id: { not_equals: id },
      },
    })

    if (totalDocs === 0) {
      return 'Cannot change this role: at least one Admin must remain.'
    }
  }

  return true
}
