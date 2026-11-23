// Four clouds in two parallax layers (CLAUDE.md section 7: "nearer
// clouds larger and slightly faster"). All four reuse one <symbol> via
// <use>, so the puff shapes only exist once in the DOM. Each cloud gets
// a negative animation-delay so they don't all drift in lockstep --
// see hero.css for the actual @keyframes and the parallax durations.
const clouds = [
  { id: 'a', layer: 'far', x: 120, y: 40, width: 170, height: 85, delay: '-10s' },
  { id: 'b', layer: 'far', x: 950, y: 60, width: 150, height: 75, delay: '-70s' },
  { id: 'c', layer: 'near', x: 300, y: 150, width: 260, height: 130, delay: '-5s' },
  { id: 'd', layer: 'near', x: 980, y: 170, width: 230, height: 115, delay: '-45s' },
] as const

export function Clouds() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1440 400">
      <defs>
        <symbol id="chw-cloud" viewBox="0 0 200 100">
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="chw-cloud-gradient"
            x1="0"
            x2="0"
            y1="8"
            y2="88"
          >
            <stop offset="0%" stopColor="var(--chw-cloud-highlight)" />
            <stop offset="100%" stopColor="var(--chw-cloud-shadow)" />
          </linearGradient>
          {/* Flatter base ellipse plus overlapping round bumps -- same
              fill on every shape so they merge into one soft silhouette
              with no visible internal seams. */}
          <g fill="url(#chw-cloud-gradient)">
            <ellipse cx="100" cy="68" rx="85" ry="20" />
            <circle cx="50" cy="52" r="26" />
            <circle cx="85" cy="38" r="30" />
            <circle cx="125" cy="40" r="28" />
            <circle cx="155" cy="54" r="23" />
          </g>
        </symbol>
      </defs>

      {clouds.map((cloud) => (
        <use
          className={`cloud cloud-${cloud.layer}`}
          height={cloud.height}
          href="#chw-cloud"
          key={cloud.id}
          style={{ animationDelay: cloud.delay }}
          width={cloud.width}
          x={cloud.x}
          y={cloud.y}
        />
      ))}
    </svg>
  )
}
