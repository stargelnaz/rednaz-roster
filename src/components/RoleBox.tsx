import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import type { Role, Assignment } from '../types'
import { PEOPLE_MAP } from '../data/seed'

interface Props {
  role: Role
  assignments: Assignment[]
  onConfirmToggle: (personId: string) => void
  onEdit: () => void
}

export function RoleBox({ role, assignments, onConfirmToggle, onEdit }: Props) {
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
    <div className={`bg-white rounded-xl border p-3 flex flex-col transition-all ${glowClass}`}>
      {/* Role name + edit icon */}
      <div className="flex items-start justify-between gap-1">
        <span className="text-xs font-semibold text-navy-800 uppercase tracking-wide flex-1 text-center">
          {role.name}
        </span>
        <button
          onClick={onEdit}
          className="text-navy-300 hover:text-navy-600 transition-colors flex-shrink-0 -mt-0.5"
          aria-label={`Edit ${role.name}`}
        >
          <Pencil size={13} />
        </button>
      </div>

      {/* People list */}
      <div className="flex flex-col items-center gap-1.5 mt-2">
        {assignments.length === 0 ? (
          <span className="text-xs text-navy-300 italic">Unassigned</span>
        ) : (
          assignments.map((a) => {
            const person = PEOPLE_MAP[a.personId]
            const label = person?.id ?? a.personId
            return (
              <div key={a.personId} className="flex items-center gap-1.5 w-full justify-center">
                <Link
                  to={`/people/${a.personId}`}
                  className={`text-sm font-light hover:underline ${
                    a.confirmed ? 'text-navy-600' : 'text-gold-600'
                  }`}
                >
                  {label}
                </Link>
                <button
                  onClick={() => onConfirmToggle(a.personId)}
                  aria-label={a.confirmed ? 'Unconfirm' : 'Confirm'}
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-colors flex-shrink-0 ${
                    a.confirmed
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {a.confirmed ? 'Confirmed' : 'Unconfirmed'}
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
