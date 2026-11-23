# Architecture

## Tech stack

- **Next.js 16.3.3** (App Router), TypeScript in strict mode
- **Payload CMS 3.92.1**, installed inside the Next.js app -- one codebase, one deployment, serving both the public site and `/admin`
- **PostgreSQL** via `@payloadcms/db-postgres`
- **Tailwind CSS v4** for styling, configured through CSS (`src/app/(frontend)/styles.css`), not a `tailwind.config.js`
- **pnpm**, pinned to an exact version in `package.json`

Exact versions are pinned deliberately (see `docs/decisions.md`): this stack sits on very recently released major versions (Next 16, Tailwind v4), and more than one real compatibility issue has already been found and worked around during development. Don't bump a major version without re-testing.

## How the two route groups fit together

```
src/app/
  (frontend)/   the public website
  (payload)/    Payload's own admin UI, REST API, and GraphQL API
```

Both live under the same Next.js app and share the same Payload config (`src/payload.config.ts`). The `(payload)` group is managed by Payload itself (via `@payloadcms/next`) and shouldn't be hand-edited beyond what Payload's own tooling generates.

## Content model shape

Fixed pages (Home, About, Data Center, Contact) are each a hand-designed Next.js route with a dedicated Payload Global holding only that page's editable content -- headlines, body text, images, button labels and links, SEO fields. Layout and design are not CMS-editable; an editor changes words and images, not structure. Services and Legal pages are collections, each rendered through one shared template (`/services/[slug]`, `/legal/[slug]`), so editors can add new ones without a code change. Full field-by-field detail is in `docs/cms.md`.

## Payload Local API: access control is bypassed by default

This caught a real bug once (see `docs/decisions.md`, 2026-10-28) and is worth stating plainly: when server-side code calls the Payload Local API (`payload.find()`, `payload.findGlobal()`, etc.) directly -- which every public-facing route in `src/app/(frontend)/` does -- **access control is bypassed by default** (`overrideAccess: true` is the default). Every public-facing fetch in this codebase explicitly passes `overrideAccess: false` so that draft content actually stays hidden from anonymous visitors. If you add a new route that reads CMS content, you must do the same, or you will leak unpublished content.

## Design tokens

Color and typography tokens live as CSS custom properties in `src/app/(frontend)/styles.css`, mapped into Tailwind's `@theme` block so utilities like `bg-background` and `text-accent` work everywhere. Light values live in `:root`; dark values are applied via `prefers-color-scheme: dark` and via a `[data-theme="dark"]` override for a future manual toggle. Fonts are loaded via `next/font/google` in `src/app/(frontend)/fonts.ts`. All values are provisional pending brand approval -- change the tokens, never hard-code a color or font in a component.

The accent color (`#2F6BFF`) fails WCAG AA as small regular-weight text directly on the Background/Surface tokens (see the comment in `styles.css` for the measured contrast ratios). It's usable as large/bold text or as a button background with a bold label; nothing else.

## Known issue: on-demand revalidation does not work in this exact stack

**What happens:** every collection and global that backs a public page (Services, Legal, Home, About, Data Center, Contact, Header, Footer, Site Settings) has an `afterChange`/`afterDelete` hook (`src/hooks/revalidate.ts`) that calls Next.js's `revalidatePath()` so a saved change appears on the live site immediately. In `next dev` this is invisible either way, because dev mode has no route cache to bust. In a real production build (`next build && next start`), it was tested directly and confirmed **not to work**: `revalidatePath()` fires on every save, never throws, and matches Payload's own official reference implementation for this exact pattern -- but the statically-cached page keeps serving its old content indefinitely, with no error anywhere to explain why.

**The workaround:** `export const dynamic = 'force-dynamic'` on the five affected routes (`/`, `/about`, `/data-center`, `/contact`, `/services`). This forces them to render on every request instead of being cached as static pages, which makes CMS edits appear immediately -- at the cost of giving up Next's static-page performance optimization for those routes.

**Performance cost:** each of those five routes now does a full server render (including a database read) on every request, instead of serving a pre-built static file. For a low-traffic site this is unlikely to matter. It will matter once there's real traffic, since it removes CDN-level caching for the site's main pages and adds a database round-trip to every page view.

**Before launch:**

- Re-test whether `revalidatePath()` works once Payload and/or Next.js have had further patch releases -- this may simply be a bug in the very new Next.js 16 line that gets fixed upstream, in which case `export const dynamic = 'force-dynamic'` can just be deleted from the five routes and the existing `revalidatePath()` hooks will start working with no further code changes.
- If it's still broken, evaluate `revalidateTag()` with `fetch()`-based data loading as an alternative (would require moving data fetching from the Payload Local API to Payload's REST API via `fetch()`, a larger change), or accept `force-dynamic` as the permanent approach and add server-side caching (e.g. a short in-memory or Redis cache in front of the Payload reads) if database load becomes a problem.

## Database schema and migrations

Local development uses Payload's automatic schema push (the dev server applies schema changes to the database as the config changes). This project does not yet have a formal migration workflow for non-local environments -- CLAUDE.md section 4 requires one before deploying anywhere beyond local development, and it does not exist yet. This is tracked as outstanding work, not a completed decision.
