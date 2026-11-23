# Cloud Himalaya Website

The public website and content management system for Cloud Himalaya Pvt. Ltd., a cloud hosting and data center company in Kathmandu, Nepal. Built with Next.js and Payload CMS in a single codebase: the public site and the `/admin` panel are the same application.

This is a real project in active development. See `CLAUDE.md` in the repository root for the full project brief, decisions, and working rules. See `docs/` for deeper documentation on specific areas.

## Prerequisites

- **Node.js**: `^22.23.4 || >=24.22.1`
- **pnpm**: `11.28.9` (pinned in `package.json`'s `packageManager` field; install via `npm install -g pnpm@11.28.9` if you don't have it)
- **PostgreSQL**: a local instance you can create a database and a role on. This project was built against PostgreSQL 18, but any reasonably recent PostgreSQL should work.

## Setup

1. Clone the repository.
2. Create a dedicated, least-privilege PostgreSQL role and database for this project (do not use the `postgres` superuser). Example, run in `psql`:
   ```sql
   CREATE ROLE cloud_himalaya_app WITH LOGIN PASSWORD 'choose-a-real-password';
   CREATE DATABASE cloud_himalaya OWNER cloud_himalaya_app;
   ```
3. Copy `.env.example` to `.env` and fill in real values:
   - `DATABASE_URL`: the connection string for the role/database above
   - `PAYLOAD_SECRET`: a long random string (used to sign sessions; never reuse this across environments)
4. Install dependencies:
   ```powershell
   pnpm install
   ```
5. Start the dev server:
   ```powershell
   pnpm dev
   ```
6. Open `http://localhost:3000/admin` and create the first user. It automatically becomes an Admin regardless of what role is selected on the form (see `docs/cms.md`).

The dev server applies schema changes to the database automatically as the Payload config changes. There is no separate migration step for local development (see `docs/architecture.md` for how this differs in non-local environments).

## Commands

| Command                             | What it does                                                              |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                          | Start the dev server at `http://localhost:3000`                           |
| `pnpm build`                        | Production build                                                          |
| `pnpm start`                        | Run a production build (`pnpm build` first)                               |
| `pnpm typecheck`                    | TypeScript, no emit                                                       |
| `pnpm lint`                         | ESLint                                                                    |
| `pnpm format` / `pnpm format:check` | Prettier, write or check only                                             |
| `pnpm run test:int`                 | Vitest (unit tests + integration tests against the real database)         |
| `pnpm run test:e2e`                 | Playwright end-to-end tests                                               |
| `pnpm run generate:types`           | Regenerate `src/payload-types.ts` after changing any collection or global |
| `pnpm run generate:importmap`       | Regenerate the admin panel's import map (usually automatic in dev)        |

Before considering any change finished, run `pnpm typecheck`, `pnpm lint`, and `pnpm run test:int` and confirm they pass.

## Project structure

```
src/
  access/        Reusable access-control functions (isAdmin, isAuthenticated, ...)
  app/
    (frontend)/  The public website
    (payload)/   Payload's own routes: /admin, /api, GraphQL
  collections/   Payload collections (Users, Media, Services, Legal)
  components/    Shared React components (Header, Footer)
  fields/        Reusable field groups (seo, navItems)
  globals/       Payload globals (Site Settings, Header, Footer, Home, About, Data Center, Contact)
  hooks/         Reusable Payload hooks (slug generation, revalidation, admin safeguards)
  lib/           Small utilities (env validation, slug formatting, Payload client helper)
  payload.config.ts
docs/            Project documentation (see below)
tests/
  unit/          Vitest unit tests (pure logic, access control, hooks)
  int/           Vitest integration tests (against the real database)
  e2e/           Playwright tests
```

## Documentation

- `docs/architecture.md`: tech stack, how the pieces fit together, known issues
- `docs/cms.md`: collections, globals, roles and access rules, the last-admin safeguard
- `docs/decisions.md`: a dated log of confirmed decisions

## Security

- Never commit `.env` files or real secrets. `.env.example` holds variable names and placeholders only.
- Required environment variables are validated at startup (`src/lib/env.ts`); the app fails with a clear error if they're missing or malformed, rather than failing confusingly later.
- See `docs/cms.md` for the access-control model.
