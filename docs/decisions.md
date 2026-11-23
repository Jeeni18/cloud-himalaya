# Decision log

Confirmed decisions, in the order made. Requirements given up front in `CLAUDE.md` aren't repeated here -- this covers choices made or confirmed during the work.

### 2026-10-28

- **PostgreSQL 18, port 5433** chosen as the local database over the also-installed PostgreSQL 17, since it had just been installed and was the newer version.
- **pnpm** chosen as the package manager, pinned to an exact version (currently `11.28.9`) within the range the Payload scaffold declares support for -- matches Payload's own preference and its strict dependency resolution catches "phantom dependency" bugs that `npm`/`yarn` would hide.
- **Next.js 16.3.3** chosen over the originally-recommended 15.4.x line. 16.3.3 is what Payload's own `create-payload-app` scaffolds by default today; downgrading to 15.4.x during testing caused a real module-resolution failure in Payload's admin panel (`payload/shared` / `formatAdminURL` import errors), so 16.3.3 is the better-supported pairing despite being newer.
- **Deny-by-default access control** established as a hard rule for every collection and global, with reusable functions in `src/access/` (`isAdmin`, `isAdminOrSelf`, `isAuthenticated`, `publishedOrAuthenticated`) rather than one-off access logic per collection.
- **Design tokens**: the color table and typography requirements from CLAUDE.md section 7 implemented as CSS custom properties, mapped into Tailwind v4's `@theme`. Fonts (Bricolage Grotesque / Inter / JetBrains Mono) chosen as placeholders pending brand approval. The accent color's WCAG contrast problem (fails AA as small text) was flagged rather than silently changed; documented as a usage rule instead.
- **Site Settings, Header, Footer globals** and the **Services** collection built matching CLAUDE.md section 9, admin-only for the first three, editor-editable for Services.
- Found and fixed a real bug: the Payload Local API bypasses access control by default (`overrideAccess: true`), which would have let anonymous visitors see draft content. Every public-facing fetch now explicitly passes `overrideAccess: false`.
- A seed script approach (auto-creating structural pages) was built, then superseded the next day by the fixed-pages architecture change below, which made it unnecessary.

### 2026-10-29

- **Architecture change: removed the generic Pages / page-builder collection.** Replaced with: fixed pages (Home, About, Data Center, Contact) each as a hand-designed Next.js route backed by a dedicated Global holding only that page's content; a Legal collection with one shared template, matching the existing Services pattern. Page-content globals are editor-editable; Header/Footer/Site Settings stay admin-only. Reasoning: the site's structure is mostly fixed, not editor-defined, so a generic page builder was unused flexibility, not a real requirement.
- Dropped the orphaned `pages`/`_pages_v` database tables and a stale `payload_locked_documents_rels.pages_id` column left behind by that removal -- they were actively blocking Payload's schema sync. Local development data only; this is the kind of action CLAUDE.md section 16 now requires asking about first, even locally.
- **Revalidation**: discovered `revalidatePath()` does not actually bust the route cache in this Next.js 16.3.3 + Payload 3.92.1 combination, despite matching Payload's own official reference pattern and never throwing. Adopted `export const dynamic = 'force-dynamic'` on the five affected routes as the verified-working interim fix. Full detail in `docs/architecture.md`.
- **Admin-lockout incident and fix.** The only Admin account was downgraded to Editor, which the `role` field's own access rule made unrecoverable through the UI. Fixed with a one-off Local API script; added three permanent safeguards (first-user-always-admin, last-admin-can't-be-downgraded, last-admin-can't-be-deleted). Full detail in `docs/cms.md`.
- **New rules added to CLAUDE.md section 16**: never run a destructive database command (dropping tables, deleting data) without asking first, even in local development; never commit directly to `main`. The first codifies a step that was previously just good judgement applied inconsistently; the second restates section 13's existing rule for visibility in the "never do" checklist.
