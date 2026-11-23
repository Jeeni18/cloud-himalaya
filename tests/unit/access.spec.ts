import { describe, expect, it } from 'vitest'
import type { AccessArgs } from 'payload'

import { isAdmin } from '../../src/access/isAdmin'
import { isAdminOrSelf } from '../../src/access/isAdminOrSelf'
import { isAuthenticated } from '../../src/access/isAuthenticated'

// Access functions only read req.user, so a minimal mock stands in for the
// full PayloadRequest the real type expects.
function mockArgs(user: { id: string; role?: 'admin' | 'editor' } | null): AccessArgs {
  return { req: { user } } as unknown as AccessArgs
}

describe('isAdmin', () => {
  it('allows an admin user', () => {
    expect(isAdmin(mockArgs({ id: '1', role: 'admin' }))).toBe(true)
  })

  it('denies an editor user', () => {
    expect(isAdmin(mockArgs({ id: '1', role: 'editor' }))).toBe(false)
  })

  it('denies an unauthenticated request', () => {
    expect(isAdmin(mockArgs(null))).toBe(false)
  })
})

describe('isAuthenticated', () => {
  it('allows any logged-in user', () => {
    expect(isAuthenticated(mockArgs({ id: '1', role: 'editor' }))).toBe(true)
  })

  it('denies an unauthenticated request', () => {
    expect(isAuthenticated(mockArgs(null))).toBe(false)
  })
})

describe('isAdminOrSelf', () => {
  it('allows an admin unconditionally', () => {
    expect(isAdminOrSelf(mockArgs({ id: '1', role: 'admin' }))).toBe(true)
  })

  it('scopes a non-admin to their own document', () => {
    expect(isAdminOrSelf(mockArgs({ id: '42', role: 'editor' }))).toEqual({
      id: { equals: '42' },
    })
  })

  it('denies an unauthenticated request', () => {
    expect(isAdminOrSelf(mockArgs(null))).toBe(false)
  })
})
