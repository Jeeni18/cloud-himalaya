import type { CollectionBeforeValidateHook } from 'payload'

// Guarantees nobody is ever locked out of a fresh setup: the very first
// user created in an empty database always becomes an Admin, regardless
// of what role was selected on the signup screen (or defaulted to).
export const forceFirstUserAdmin: CollectionBeforeValidateHook = async ({
  operation,
  data,
  req,
}) => {
  if (operation === 'create' && data) {
    const { totalDocs } = await req.payload.count({ collection: 'users' })
    if (totalDocs === 0) {
      data.role = 'admin'
    }
  }

  return data
}
