import type { FieldAccess } from 'payload'

// Field-level equivalent of isAdmin: Payload's field access functions use a
// different signature (no Where-query support) than collection access.
export const isAdminField: FieldAccess = ({ req }) => {
  return req.user?.role === 'admin'
}
