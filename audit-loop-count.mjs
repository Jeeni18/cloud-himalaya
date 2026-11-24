import { chromium } from '@playwright/test'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.addInitScript(() => {
  window.__fns = new Set()
  const orig = window.requestAnimationFrame.bind(window)
  window.requestAnimationFrame = (cb) => {
    window.__fns.add(cb)
    return orig(cb)
  }
})
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(3000)
const n = await page.evaluate(() => window.__fns.size)
console.log('distinct rAF callback functions registered:', n, '(one self-rescheduling loop = 1)')
await browser.close()
