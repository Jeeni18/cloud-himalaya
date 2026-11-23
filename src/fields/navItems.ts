import type { Field } from 'payload'

// Reusable nav-items array, shared by the Header and Footer globals. A
// factory, not a static object: Payload mutates field configs in place
// during sanitization, so sharing one object instance across two globals
// would let the second usage skip proper sanitization.
export function navItems(): Field {
  return {
    name: 'navItems',
    type: 'array',
    label: 'Navigation items',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        required: true,
      },
    ],
  }
}
