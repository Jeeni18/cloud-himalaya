import { ridgelineLayers, ridgelineViewBox } from './ridgelineData'

// Purely decorative -- the headline carries the actual content, so this
// is hidden from assistive tech. Static (no animation), unlike Clouds.
export function Ridgelines() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox={ridgelineViewBox}
    >
      {ridgelineLayers.map((layer) => (
        <path className={`ridgeline-${layer.id}`} d={layer.d} key={layer.id} />
      ))}
    </svg>
  )
}
