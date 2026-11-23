import type { Access } from 'payload'

// Deny by default: only an authenticated user with the admin role passes.
export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}
