import { visitUs } from '../../content/about'

// Barcode bar [x, width] pairs, copied from docs/design/about-us's own
// SVG rather than redrawn by eye.
const BARCODE_BARS: [number, number][] = [
  [1, 1],
  [6, 3],
  [10, 1],
  [15, 2],
  [20, 3],
  [25, 1],
  [30, 2],
  [36, 1],
  [40, 1],
  [46, 1],
  [50, 1],
  [55, 3],
  [61, 1],
  [65, 1],
  [70, 2],
  [76, 1],
  [80, 3],
  [86, 3],
  [90, 1],
  [95, 2],
  [100, 3],
  [105, 3],
  [110, 3],
  [115, 2],
  [121, 2],
  [126, 3],
  [131, 2],
  [136, 1],
  [140, 3],
]

// Visitor pass card, part of section 6 (Visit Us) on /about-us. Fixed
// colors in both themes -- "it looks the SAME in both themes" -- same
// "fixed in both modes" exception ServerRack.tsx/ServicesBlueprint.tsx
// already document for their own illustrations. Purely decorative, so
// aria-hidden; on phones it renders smaller with less rotation via the
// className the caller (VisitUs.tsx) passes in.
export function VisitorPass({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-[260px] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:w-[320px] md:w-[360px] ${className}`}
    >
      <div className="flex h-[14px] justify-center bg-white">
        <div className="h-[10px] w-[70px] rounded-b-lg bg-[#0954A6] opacity-25" />
      </div>

      <div className="bg-[#092B50] px-[22px] py-[18px] text-white">
        <p className="font-mono text-[11px] text-[#55A4E0]">{visitUs.pass.issuer}</p>
        <p className="mt-1 text-[26px] font-semibold tracking-[-0.01em]">{visitUs.pass.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-[18px] gap-y-3.5 px-[22px] py-5 text-[#103D70]">
        {visitUs.pass.fields.map((field) => (
          <div key={field.label}>
            <p className="font-mono text-[10px] text-[#4C7098]">{field.label}</p>
            <p className="mt-0.5 font-semibold">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between px-[22px] pb-5">
        <svg height="34" width="150">
          {BARCODE_BARS.map(([x, width]) => (
            <rect fill="#103D70" height="34" key={x} width={width} x={x} y="0" />
          ))}
        </svg>
        <p className="font-mono text-[11px] whitespace-nowrap text-[#0954A6]">
          {visitUs.pass.validity}
        </p>
      </div>
    </div>
  )
}
