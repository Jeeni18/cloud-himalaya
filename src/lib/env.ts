// Validates required environment variables once, at module load time, so a
// missing or malformed value fails immediately with a clear message instead
// of surfacing later as a confusing runtime error deep in Payload or the DB
// driver.

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

export const env = {
  DATABASE_URL: requirePostgresUrl('DATABASE_URL'),
  PAYLOAD_SECRET: requireSecret('PAYLOAD_SECRET', 16),
} as const
