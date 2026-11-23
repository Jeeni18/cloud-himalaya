# CMS: collections, globals, and access control

## Roles

Every user has a `role`: `admin` or `editor`. The rule throughout this project is **editors manage content, admins manage users and settings** (CLAUDE.md section 9). Concretely:

| Area                                         | Editor                               | Admin |
| -------------------------------------------- | ------------------------------------ | ----- |
| Services, Legal pages (create/update/delete) | Yes                                  | Yes   |
| Home, About, Data Center, Contact content    | Yes                                  | Yes   |
| Media (upload/update/delete)                 | Yes                                  | Yes   |
| Header, Footer, Site Settings                | No                                   | Yes   |
| Users (create/update others/delete)          | No (can only edit their own profile) | Yes   |
| The `role` field itself                      | No                                   | Yes   |

Access control is deny-by-default everywhere: every collection and global has explicit `access` rules (`src/access/`), and public (unauthenticated) reads only ever return published content.

## Collections

- **Users** -- auth-enabled. Has the `role` field above. See "Admin-lockout safeguards" below.
- **Media** -- file uploads. Alt text is required on every file. Upload types are restricted to `image/jpeg`, `image/png`, `image/webp`, and `application/pdf` -- SVG is deliberately excluded (uploaded SVGs can carry embedded scripts). Reads are public; writes require any authenticated user.
- **Services** -- `title`, auto-generated `slug`, `summary`, `details` (rich text), SEO fields. Draft/publish enabled. Rendered at `/services` (listing) and `/services/[slug]` (detail).
- **Legal** -- `title`, auto-generated `slug`, `body` (rich text), SEO fields. Draft/publish enabled. Rendered at `/legal/[slug]`.

Services and Legal both auto-fill their slug from the title if left blank (`src/hooks/autoSlugFromTitle.ts`), and both revalidate their public routes on save/delete (`src/hooks/revalidate.ts` -- see the known issue in `docs/architecture.md`).

## Globals

- **Site Settings** -- company name, contact details, an open-ended list of social links, and the `clientPortalUrl`/`supportPortalUrl` that back the "Client login" and support links (these must stay CMS-editable per CLAUDE.md section 6, never hard-coded). Admin-only.
- **Header** / **Footer** -- navigation item lists (label + URL); Footer also has an optional copyright line. Admin-only.
- **Home** -- content for the homepage. Fields are organized into tabs by homepage section, starting with a "Hero" tab (heading, subheading, call-to-action label/URL), so future sections can be added as new tabs without restructuring. Editor-editable, draft/publish enabled.
- **About**, **Data Center**, **Contact** -- each has `heading`, `body` (rich text), an optional `image` (About and Data Center only), and SEO fields. Editor-editable, draft/publish enabled.

Site Settings, Header, and Footer revalidate the entire site on save (they're rendered on every page, via the root layout). The four page-content globals each revalidate only their own route.

## SEO fields

Every page-like document (Services, Legal, and the four page-content globals) has a reusable SEO field group (`src/fields/seo.ts`): `metaTitle`, `metaDescription`, `socialImage`. All optional -- the frontend falls back to the document's own title/summary when left blank.

## Admin-lockout safeguards

An early incident (2026-10-29, see `docs/decisions.md`) locked the only Admin account out by downgrading it to Editor, with no way to fix it through the UI (changing the `role` field itself requires Admin access). Three permanent safeguards now prevent this:

1. **First user is always Admin.** `src/hooks/forceFirstUserAdmin.ts` forces `role` to `admin` when the very first user is created in an empty database, regardless of what was selected on the signup form.
2. **The last Admin can't be downgraded.** `src/hooks/preventLastAdminDowngrade.ts` is a validation rule (not an access rule -- an Admin can still open the field) on the `role` field: if changing it would leave zero Admins, the save is rejected with a clear message.
3. **The last Admin can't be deleted.** `src/hooks/preventLastAdminDeletion.ts` blocks deleting a user if they're the only remaining Admin.

Both (2) and (3) run as Payload hooks, not access-control checks, so they hold even for scripts using the Local API with access control bypassed (the default) -- this was verified directly, not just assumed.

If a lockout ever happens anyway (e.g. direct database tampering, which these safeguards can't prevent), recovery is a short one-off script using the Payload Local API to set the affected account's `role` back to `admin` -- see the commit `1faaeb8` for the exact script used last time. Never fix this by hand-editing the database.
