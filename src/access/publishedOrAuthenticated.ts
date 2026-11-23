import type { Access } from 'payload'

// For collections with drafts enabled: authenticated users (reviewing in the
// admin panel) see every document; the public only ever sees published ones.
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true

  return {
    _status: { equals: 'published' },
  }
}
