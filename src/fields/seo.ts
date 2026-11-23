import type { Field } from 'payload'

// Reusable SEO field group, per the project's requirement that every
// page-like document (Services, Legal, and the per-page content globals)
// carries the same title/description/social-image fields.
//
// A factory, not a static object: Payload mutates field configs in place
// during sanitization, so sharing one object instance across collections
// would let the second usage skip proper sanitization.
export function seoFields(): Field {
  return {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        admin: {
          description:
            'Shown in search results and browser tabs. Falls back to the page title if left blank.',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        admin: {
          description: 'Shown in search results, ideally under 160 characters.',
        },
      },
      {
        name: 'socialImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Shown when the page is shared on social media.',
        },
      },
    ],
  }
}
