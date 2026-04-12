import { Link } from 'react-router-dom'
import type { Role, Assignment } from '../types'
import { PEOPLE_MAP } from '../data/seed'

interface Props {
  role: Role
  assignments: Assignment[]
}

export function RoleBox({ role, assignments }: Props) {
  const allConfirmed = assignments.length > 0 && assignments.every((a) => a.confirmed)
  const hasUnconfirmed = assignments.some((a) => !a.confirmed)

  const glowClass =
    assignments.length === 0
      ? 'border-navy-200'
      : allConfirmed
      ? 'box-confirmed border-green-300'
      : hasUnconfirmed
      ? 'box-unconfirmed border-gold-400'
      : 'border-navy-200'

  return (
    <div
      className={`bg-white rounded-xl border p-4 flex flex-col items-center gap-2 transition-all ${glowClass}`}
    >
      <span className="text-sm font-semibold text-navy-800 uppercase tracking-wide text-center">
        {role.name}
      </span>

      {assignments.length === 0 ? (
        <span className="text-xs text-navy-300 italic">Unassigned</span>
      ) : (
        <p className="text-sm text-navy-500 text-center font-light leading-snug">
          {assignments.map((a, i) => {
            const person = PEOPLE_MAP[a.personId]
            const label = person?.id ?? a.personId
            return (
              <span key={a.personId}>
                {i > 0 && ', '}
                <Link
                  to={`/people/${a.personId}`}
                  className={`hover:underline ${a.confirmed ? 'text-navy-600' : 'text-gold-600'}`}
                >
                  {label}
                </Link>
              </span>
            )
          })}
        </p>
      )}
    </div>
  )
}
