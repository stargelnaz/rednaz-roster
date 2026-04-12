import { ROLES } from '../data/seed'

export function RolesPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-800 mb-3">Roles</h2>
      <div className="flex flex-col gap-2">
        {ROLES.sort((a, b) => a.order - b.order).map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl border border-navy-100 px-4 py-3 flex justify-between items-center"
          >
            <span className="font-medium text-navy-800">{role.name}</span>
            <span className="text-xs text-navy-300">#{role.order}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
