import { describe, expect, it, vi } from 'vitest'
import type {
  CollectionBeforeDeleteHook,
  CollectionBeforeValidateHook,
  PayloadRequest,
  Validate,
  ValidateOptions,
} from 'payload'

import { forceFirstUserAdmin } from '../../src/hooks/forceFirstUserAdmin'
import { preventLastAdminDeletion } from '../../src/hooks/preventLastAdminDeletion'
import { preventLastAdminDowngrade } from '../../src/hooks/preventLastAdminDowngrade'

// These hooks only touch req.payload.count/findByID, so a minimal mock
// stands in for the full PayloadRequest the real types expect.
function mockReq(overrides: { count?: number; findByIDResult?: { role?: string } | null }) {
  return {
    payload: {
      count: vi.fn().mockResolvedValue({ totalDocs: overrides.count ?? 0 }),
      findByID: vi.fn().mockResolvedValue(overrides.findByIDResult ?? null),
    },
  } as unknown as PayloadRequest
}

describe('forceFirstUserAdmin', () => {
  it('forces role to admin when creating the first user', async () => {
    const req = mockReq({ count: 0 })
    const data = { role: 'editor' }

    const result = await forceFirstUserAdmin({
      operation: 'create',
      data,
      req,
    } as unknown as Parameters<CollectionBeforeValidateHook>[0])

    expect(result.role).toBe('admin')
  })

  it('leaves role untouched when other users already exist', async () => {
    const req = mockReq({ count: 1 })
    const data = { role: 'editor' }

    const result = await forceFirstUserAdmin({
      operation: 'create',
      data,
      req,
    } as unknown as Parameters<CollectionBeforeValidateHook>[0])

    expect(result.role).toBe('editor')
  })

  it('does nothing on update', async () => {
    const req = mockReq({ count: 0 })
    const data = { role: 'editor' }

    const result = await forceFirstUserAdmin({
      operation: 'update',
      data,
      req,
    } as unknown as Parameters<CollectionBeforeValidateHook>[0])

    expect(result.role).toBe('editor')
  })
})

describe('preventLastAdminDowngrade', () => {
  it('blocks downgrading the last admin', async () => {
    const req = mockReq({ count: 0 })

    const result = await (preventLastAdminDowngrade as Validate<string>)('editor', {
      operation: 'update',
      previousValue: 'admin',
      req,
      id: 1,
    } as unknown as ValidateOptions<unknown, unknown, object, string>)

    expect(result).not.toBe(true)
    expect(typeof result).toBe('string')
  })

  it('allows downgrading an admin when another admin remains', async () => {
    const req = mockReq({ count: 1 })

    const result = await (preventLastAdminDowngrade as Validate<string>)('editor', {
      operation: 'update',
      previousValue: 'admin',
      req,
      id: 1,
    } as unknown as ValidateOptions<unknown, unknown, object, string>)

    expect(result).toBe(true)
  })

  it('does not run the check for a non-downgrade change', async () => {
    const req = mockReq({ count: 0 })

    const result = await (preventLastAdminDowngrade as Validate<string>)('editor', {
      operation: 'update',
      previousValue: 'editor',
      req,
      id: 1,
    } as unknown as ValidateOptions<unknown, unknown, object, string>)

    expect(result).toBe(true)
    expect(req.payload.count).not.toHaveBeenCalled()
  })
})

describe('preventLastAdminDeletion', () => {
  it('blocks deleting the last admin', async () => {
    const req = mockReq({ count: 0, findByIDResult: { role: 'admin' } })

    await expect(
      preventLastAdminDeletion({
        id: 1,
        req,
      } as unknown as Parameters<CollectionBeforeDeleteHook>[0]),
    ).rejects.toThrow('Cannot delete the last remaining Admin.')
  })

  it('allows deleting an admin when another admin remains', async () => {
    const req = mockReq({ count: 1, findByIDResult: { role: 'admin' } })

    await expect(
      preventLastAdminDeletion({
        id: 1,
        req,
      } as unknown as Parameters<CollectionBeforeDeleteHook>[0]),
    ).resolves.not.toThrow()
  })

  it('allows deleting a non-admin without checking admin count', async () => {
    const req = mockReq({ count: 0, findByIDResult: { role: 'editor' } })

    await preventLastAdminDeletion({
      id: 1,
      req,
    } as unknown as Parameters<CollectionBeforeDeleteHook>[0])

    expect(req.payload.count).not.toHaveBeenCalled()
  })
})
