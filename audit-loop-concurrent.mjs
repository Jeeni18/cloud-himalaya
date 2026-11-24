import { chromium } from '@playwright/test'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.addInitScript(() => {
  window.__perTs = new Map()
  const orig = window.requestAnimationFrame.bind(window)
  window.requestAnimationFrame = (cb) =>
    orig((t) => {
      window.__perTs.set(t, (window.__perTs.get(t) || 0) + 1)
      return cb(t)
    })
})
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(4000)
const stats = await page.evaluate(() => {
  const counts = [...window.__perTs.values()]
  const hist = {}
  for (const c of counts) hist[c] = (hist[c] || 0) + 1
  return { frames: counts.length, hist }
})
console.log('animation frames observed:', stats.frames)
console.log('callbacks per frame ->', JSON.stringify(stats.hist), '  (all "1" = a single running loop)')
await browser.close()
