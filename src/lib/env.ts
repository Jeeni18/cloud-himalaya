// Validates required environment variables once, at module load time, so a
// missing or malformed value fails immediately with a clear message instead
// of surfacing later as a confusing runtime error deep in Payload or the DB
// driver.

import { isCmsDisabled } from './cmsAvailability'

function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable "${name}". Copy .env.example to .env and fill in a real value.`,
    )
  }

  return value
}

function requirePostgresUrl(name: string): string {
  const value = requireEnv(name)

  if (!value.startsWith('postgres://') && !value.startsWith('postgresql://')) {
    throw new Error(
      `Environment variable "${name}" does not look like a PostgreSQL connection string (expected it to start with "postgres://" or "postgresql://").`,
    )
  }

  return value
}

function requireSecret(name: string, minLength: number): string {
  const value = requireEnv(name)

  if (value.length < minLength) {
    throw new Error(
      `Environment variable "${name}" is shorter than ${minLength} characters, which is too weak for a production secret.`,
    )
  }

  return value
}

// A preview deployment has no database (see cmsAvailability.ts), so there is
// no real connection string to require. Payload still needs a syntactically
// valid one to build its config, and this address is deliberately
// unroutable, so any query that is not guarded by fromCms() fails fast
// rather than reaching a real server.
const PREVIEW_DATABASE_URL = 'postgresql://preview:preview@127.0.0.1:1/preview-no-database'

export const env = {
  DATABASE_URL: isCmsDisabled ? PREVIEW_DATABASE_URL : requirePostgresUrl('DATABASE_URL'),
  // Still required in preview mode: Payload signs with it, and a committed
  // default would risk being reused somewhere it actually matters.
  PAYLOAD_SECRET: requireSecret('PAYLOAD_SECRET', 16),
} as const
