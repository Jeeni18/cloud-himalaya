import { slaTable } from '../../content/home'

const toneClass = {
  p1: 'text-p1',
  p2: 'text-p2',
  accent: 'text-accent',
  subtle: 'text-subtle',
} as const

// docs/LANDING_PAGE_SPEC.md section 4.10 (left card).
export function SlaTable() {
  return (
    <div className="flex-[1.3] basis-[540px] rounded-2xl border border-line bg-surface p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[28px] font-bold text-head">{slaTable.heading}</h2>
        <a className="font-semibold text-accent" href={slaTable.cta.href}>
          {slaTable.cta.label}
        </a>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[440px] w-full">
          <thead>
            <tr>
              {slaTable.columns.map((column) => (
                <th
                  className="pb-3 text-left font-mono text-xs font-normal text-subtle"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slaTable.rows.map((row) => (
              <tr className="border-t border-line" key={row.priority}>
                <td className="py-3.5">
                  <span className={`font-bold ${toneClass[row.tone]}`}>{row.priority}</span>{' '}
                  <span className="text-muted">{row.note}</span>
                </td>
                <td className="py-3.5 font-semibold text-head">{row.response}</td>
                <td className="py-3.5 text-muted">{row.resolution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
