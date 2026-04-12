import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import type { Role, Assignment } from '../types'
import { PEOPLE } from '../data/seed'

interface Props {
  role: Role
  assignments: Assignment[]
  onSave: (assignments: Assignment[]) => void
  onClose: () => void
}

export function EditRoleModal({ role, assignments, onSave, onClose }: Props) {
  const [current, setCurrent] = useState<Assignment[]>(assignments)

  const assignedIds = new Set(current.map((a) => a.personId))
  const available = PEOPLE.filter((p) => !assignedIds.has(p.id))

  function addPerson(personId: string) {
    setCurrent((prev) => [...prev, { personId, confirmed: false }])
  }

  function removePerson(personId: string) {
    setCurrent((prev) => prev.filter((a) => a.personId !== personId))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/50" onClick={onClose} />

      {/* Sheet */}
      <div className="relative bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl px-4 pt-4 pb-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-navy-800">{role.name}</h3>
          <button onClick={onClose} className="text-navy-400 hover:text-navy-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Assigned people */}
        <p className="text-xs text-navy-400 uppercase tracking-wider mb-2">Assigned</p>
        {current.length === 0 ? (
          <p className="text-sm text-navy-300 italic mb-3">Nobody assigned</p>
        ) : (
          <ul className="flex flex-col gap-2 mb-4">
            {current.map((a) => (
              <li key={a.personId} className="flex items-center justify-between bg-navy-50 rounded-lg px-3 py-2">
                <span className="text-sm text-navy-800">{a.personId}</span>
                <button
                  onClick={() => removePerson(a.personId)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label={`Remove ${a.personId}`}
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add from available */}
        {available.length > 0 && (
          <>
            <p className="text-xs text-navy-400 uppercase tracking-wider mb-2">Add person</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {available.map((p) => (
                <button
                  key={p.id}
                  onClick={() => addPerson(p.id)}
                  className="flex items-center gap-1 text-sm bg-navy-50 hover:bg-navy-100 text-navy-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus size={13} />
                  {p.id}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Save */}
        <button
          onClick={() => onSave(current)}
          className="w-full bg-navy-800 hover:bg-navy-700 text-gold-100 font-medium py-3 rounded-xl transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
