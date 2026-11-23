import type { CollectionBeforeValidateHook } from 'payload'

import { slugify } from '../lib/slugify'

// Shared by every collection with a title + slug (Services, Legal):
// derives the slug from the title when the editor leaves it blank.
export const autoSlugFromTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (data && !data.slug && data.title) {
    data.slug = slugify(data.title)
  }
  return data
}
