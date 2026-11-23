import type { Access } from 'payload'

// Admins can access any user document; everyone else only their own.
export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true

  return { id: { equals: req.user.id } }
}
