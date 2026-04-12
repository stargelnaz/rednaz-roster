import { useState } from 'react'
import { SERVICE_DATES, ROLES, ROLE_CATEGORIES } from '../data/seed'
import { RoleBox } from '../components/RoleBox'
import { ServiceCarousel } from '../components/ServiceCarousel'

const ROLE_MAP = Object.fromEntries(ROLES.map((r) => [r.id, r]))

function todayIndex() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < SERVICE_DATES.length; i++) {
    const [y, m, d] = SERVICE_DATES[i].date.split('-').map(Number)
    if (new Date(y, m - 1, d) >= today) return i
  }
  return SERVICE_DATES.length - 1
}

export function RosterPage() {
  const [serviceIndex, setServiceIndex] = useState(todayIndex)
  const service = SERVICE_DATES[serviceIndex]

  return (
    <div>
      <ServiceCarousel index={serviceIndex} onChange={setServiceIndex} />

      <div className="flex flex-col gap-6 mt-3">
        {ROLE_CATEGORIES.map((category) => {
          const roles = category.roleIds
            .map((id) => ROLE_MAP[id])
            .filter(Boolean)

          return (
            <div key={category.label}>
              {/* Category divider */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-navy-200" />
                <span className="text-xs font-semibold text-navy-400 uppercase tracking-widest">
                  {category.label}
                </span>
                <div className="flex-1 h-px bg-navy-200" />
              </div>

              {/* Role boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <RoleBox
                    key={role.id}
                    role={role}
                    assignments={service.assignments[role.id] ?? []}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
