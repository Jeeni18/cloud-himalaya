// All post/notice times are stored in UTC and shown on the site in
// Nepal time. Asia/Kathmandu has a fixed +05:45 offset with no daylight
// saving, and Node's built-in ICU data already knows it, so this needs
// no extra date/timezone library -- just the standard Intl APIs.
const TIME_ZONE = 'Asia/Kathmandu'

// "12 Nov 2026"
export function formatNptDate(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
}

// "01:00 NPT"
export function formatNptTime(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(value)
  return `${time} NPT`
}

// "NOVEMBER 2026" -- the feed's month-group label.
export function formatNptMonthYear(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    month: 'long',
    year: 'numeric',
  })
    .format(value)
    .toUpperCase()
}

// A stable key (e.g. "2026-11") for grouping posts by Nepal-time month,
// independent of display formatting.
export function nptMonthKey(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(value)
  const year = parts.find((p) => p.type === 'year')?.value
  const month = parts.find((p) => p.type === 'month')?.value
  return `${year}-${month}`
}
