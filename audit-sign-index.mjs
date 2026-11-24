// Reproduces the old and new rack-index maths over a long camera run and
// counts how often a rack is given the wrong identity. No browser needed:
// this is pure arithmetic, which is where the flicker came from.
const Z_NEAR = 40
const Z_FAR = 2400
const SPACING = 160
const GLIDE_PER_FRAME = 0.45
const FRAMES = 120_000 // ~33 minutes at 60fps

let camera = 0
let oldWrong = 0
let oldSignFlips = 0
let newWrong = 0
let samples = 0

// Track, per true rack identity, what text slot it was last given.
const lastSlotOld = new Map()
const lastSlotNew = new Map()

for (let f = 0; f < FRAMES; f++) {
  camera += GLIDE_PER_FRAME

  // ---- old: step z, derive index with floor ----
  for (let z = Z_FAR - (camera % SPACING); z > Z_NEAR; z -= SPACING) {
    const oldId = Math.floor((camera + z) / SPACING)
    const trueId = Math.round((camera + z) / SPACING) // true identity
    samples++
    if (oldId !== trueId) oldWrong++

    if (oldId % 3 === 0 || trueId % 3 === 0) {
      const slot = Math.abs(Math.floor(oldId / 3)) % 5
      const prev = lastSlotOld.get(trueId)
      if (prev !== undefined && prev !== slot) oldSignFlips++
      lastSlotOld.set(trueId, slot)
    }
  }

  // ---- new: walk integer indices, derive z ----
  const first = Math.ceil((camera + Z_NEAR) / SPACING)
  const last = Math.floor((camera + Z_FAR) / SPACING)
  for (let index = last; index >= first; index--) {
    const z = index * SPACING - camera
    const trueId = Math.round((camera + z) / SPACING)
    if (index !== trueId) newWrong++

    if (index % 3 === 0) {
      const slot = ((Math.floor(index / 3) % 5) + 5) % 5
      const prev = lastSlotNew.get(index)
      if (prev !== undefined && prev !== slot) newWrong++
      lastSlotNew.set(index, slot)
    }
  }
}

console.log(`frames simulated            : ${FRAMES.toLocaleString()}`)
console.log(`rack samples checked        : ${samples.toLocaleString()}`)
console.log(`OLD  wrong rack index       : ${oldWrong.toLocaleString()}`)
console.log(`OLD  sign changed its text  : ${oldSignFlips.toLocaleString()} times`)
console.log(`NEW  wrong index / text flip: ${newWrong.toLocaleString()}`)
