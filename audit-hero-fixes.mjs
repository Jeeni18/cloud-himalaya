import { chromium } from '@playwright/test'

const browser = await chromium.launch()

const hashCanvas = () => {
  const canvas = document.querySelector('main > section canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  let h = 0
  for (let i = 0; i < d.length; i += 613) h = (h * 31 + d[i]) >>> 0
  return h
}

// 1. Mouse look is gone. Reduced motion gives a still frame and no loop,
//    so any pixel change after moving the pointer would be mouse look.
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1200)
  const before = await page.evaluate(hashCanvas)
  for (const [x, y] of [[200, 200], [700, 300], [1200, 600], [400, 750], [900, 180]]) {
    await page.mouse.move(x, y)
    await page.waitForTimeout(120)
  }
  const after = await page.evaluate(hashCanvas)
  console.log('1. pointer moves do not shift the aisle :', before === after ? 'CONFIRMED' : 'FAILED - canvas changed')
  await page.close()
}

// 2. Exactly one animation loop (two would double the rAF rate).
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript(() => {
    window.__rafCount = 0
    const orig = window.requestAnimationFrame.bind(window)
    window.requestAnimationFrame = (cb) => {
      window.__rafCount++
      return orig(cb)
    }
  })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1500)
  const a = await page.evaluate(() => window.__rafCount)
  await page.waitForTimeout(2000)
  const b = await page.evaluate(() => window.__rafCount)
  const perSec = (b - a) / 2
  console.log(`2. rAF callbacks per second            : ${perSec.toFixed(0)} (one loop ~60, two ~120)`)
  await page.close()
}

// 3. Still animates, still pauses off screen, theme still switches.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1000)
  const a = await page.evaluate(hashCanvas)
  await page.waitForTimeout(700)
  const b = await page.evaluate(hashCanvas)
  console.log('3. still glides forward                :', a !== b ? 'CONFIRMED' : 'FAILED - frozen')

  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3))
  await page.waitForTimeout(900)
  const c = await page.evaluate(hashCanvas)
  await page.waitForTimeout(900)
  const d = await page.evaluate(hashCanvas)
  console.log('4. still pauses when scrolled away     :', c === d ? 'CONFIRMED' : 'FAILED - still drawing')

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const corner = await page.evaluate(() => {
    const canvas = document.querySelector('main > section canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const p = ctx.getImageData(2, 2, 1, 1).data
    return `rgb(${p[0]},${p[1]},${p[2]})`
  })
  console.log('5. dark theme still applies            :', corner, corner === 'rgb(10,28,49)' ? 'CONFIRMED' : 'CHECK')
  await page.close()
}

await browser.close()
