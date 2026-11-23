// Simple in-memory per-IP rate limiting for public form submissions
// (currently just /contact-us). Good enough for a single Node process;
// it resets on every restart and won't coordinate across multiple
// instances behind a load balancer -- fine for now, but worth
// revisiting (e.g. a shared store) if this ever runs on more than one
// instance.
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

const requestLog = new Map<string, number[]>()

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(key, timestamps)
  return false
}
