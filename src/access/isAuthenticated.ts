import type { Access } from 'payload'

// Deny by default: any logged-in user (admin or editor) passes; the public does not.
export const isAuthenticated: Access = ({ req }) => {
  return Boolean(req.user)
}
