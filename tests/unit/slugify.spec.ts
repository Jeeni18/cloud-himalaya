import { describe, expect, it } from 'vitest'

import { slugify } from '../../src/lib/slugify'

describe('slugify', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugify('About Us')).toBe('about-us')
  })

  it('collapses punctuation and whitespace into single hyphens', () => {
    expect(slugify('Cloud Hosting & Data Center!')).toBe('cloud-hosting-data-center')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  -Contact-  ')).toBe('contact')
  })
})
