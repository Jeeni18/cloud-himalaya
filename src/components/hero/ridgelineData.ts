export type RidgelineLayer = {
  id: 'far' | 'mid' | 'near'
  d: string
}

// Placeholder ridgeline silhouettes (CLAUDE.md section 7). When the real
// Himalayan skyline photo is traced, replace each `d` string below --
// nothing else in the hero needs to change. All three share the same
// viewBox, listed farthest-first so nearer layers paint on top and
// correctly occlude the peaks behind them.
export const ridgelineViewBox = '0 0 1440 400'

export const ridgelineLayers: RidgelineLayer[] = [
  {
    id: 'far',
    d: 'M0,400 L0,380 L200,340 L400,370 L600,330 L800,365 L1000,335 L1200,360 L1440,330 L1440,400 Z',
  },
  {
    id: 'mid',
    d: 'M0,400 L0,360 L150,300 L300,340 L420,260 L560,320 L700,280 L850,340 L980,270 L1120,330 L1260,290 L1440,350 L1440,400 Z',
  },
  {
    id: 'near',
    d: 'M0,400 L0,340 L120,220 L220,280 L320,180 L450,260 L560,200 L680,300 L800,220 L920,320 L1040,240 L1160,300 L1280,220 L1440,320 L1440,400 Z',
  },
]
