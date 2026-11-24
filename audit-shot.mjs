import { chromium } from '@playwright/test'
import path from 'node:path'
const browser = await chromium.launch()
for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
  if (theme === 'dark') {
    await page.evaluate(() => localStorage.setItem('theme', 'dark'))
    await page.reload({ waitUntil: 'networkidle' })
  }
  await page.waitForTimeout(2500)
  await page.screenshot({ path: path.join(process.cwd(), '.screenshots', `signs-${theme}.png`) })
  await page.close()
}
await browser.close()
