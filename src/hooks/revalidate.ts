import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

// Calls revalidatePath so the route cache picks up fresh content as soon
// as this bug is fixed upstream (see the route-level `dynamic =
// "force-dynamic"` exports, which are the actual guarantee right now --
// this is forward-compatible, not dead code).
//
// revalidatePath also throws when there's no Next.js request context at
// all (e.g. a standalone script calling the Payload Local API directly).
// Saving a document must never fail just because revalidation couldn't
// run, so every call goes through this wrapper rather than calling
// revalidatePath directly.
function safeRevalidatePath(path: string, type: 'layout' | 'page') {
  try {
    revalidatePath(path, type)
  } catch (err) {
    console.warn(`revalidatePath("${path}") failed:`, err)
  }
}

// For a global that backs exactly one route (Home, About, Data Center,
// Contact): revalidate just that page.
export function revalidateGlobalPage(path: string): GlobalAfterChangeHook {
  return ({ doc }) => {
    safeRevalidatePath(path, 'page')
    return doc
  }
}

// For a global that affects every page (Header, Footer, Site Settings,
// all rendered from the root layout): revalidate everything under it.
export function revalidateLayout(): GlobalAfterChangeHook {
  return ({ doc }) => {
    safeRevalidatePath('/', 'layout')
    return doc
  }
}

// For a collection with its own listing + detail routes (Services) or
// just a detail route (Legal): revalidate every path the changed
// document affects, both on save and on delete.
export function revalidateCollectionPaths<TDoc extends { id: number | string; slug: string }>(
  getPaths: (doc: TDoc) => string[],
): {
  afterChange: CollectionAfterChangeHook<TDoc>
  afterDelete: CollectionAfterDeleteHook<TDoc>
} {
  return {
    afterChange: ({ doc }) => {
      for (const path of getPaths(doc)) safeRevalidatePath(path, 'page')
      return doc
    },
    afterDelete: ({ doc }) => {
      for (const path of getPaths(doc)) safeRevalidatePath(path, 'page')
      return doc
    },
  }
}
