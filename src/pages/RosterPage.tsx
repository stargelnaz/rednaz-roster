import { useState } from 'react'
import { SERVICE_DATES, ROLES, ROLE_CATEGORIES, CHILDREN_LESSONS } from '../data/seed'
import type { Assignment, ServiceDate } from '../types'
import { RoleBox } from '../components/RoleBox'
import { ServiceCarousel } from '../components/ServiceCarousel'
import { EditRoleModal } from '../components/EditRoleModal'

const ROLE_MAP = Object.fromEntries(ROLES.map((r) => [r.id, r]))

/** Seed SERVICE_DATES with teacher/helper from CHILDREN_LESSONS */
function buildInitialServices(): ServiceDate[] {
  const lessonMap = Object.fromEntries(CHILDREN_LESSONS.map((l) => [l.date, l]))
  return SERVICE_DATES.map((service) => {
    const cl = lessonMap[service.date]
    if (!cl) return service
    const assignments = { ...service.assignments }
    if (cl.teacher && !assignments['sunday-school-teacher']?.length) {
      assignments['sunday-school-teacher'] = [{ personId: cl.teacher, confirmed: false }]
    }
    if (cl.helper && !assignments['sunday-school-helper']?.length) {
      assignments['sunday-school-helper'] = [{ personId: cl.helper, confirmed: false }]
    }
    return { ...service, assignments }
  })
}

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
  const [services, setServices] = useState<ServiceDate[]>(buildInitialServices)
  const [editingRole, setEditingRole] = useState<string | null>(null)

  const service = services[serviceIndex]

  function handleConfirmToggle(roleId: string, personId: string) {
    setServices((prev) =>
      prev.map((s, i) => {
        if (i !== serviceIndex) return s
        return {
          ...s,
          assignments: {
            ...s.assignments,
            [roleId]: (s.assignments[roleId] ?? []).map((a) =>
              a.personId === personId ? { ...a, confirmed: !a.confirmed } : a
            ),
          },
        }
      })
    )
  }

  function handleSaveAssignments(roleId: string, newAssignments: Assignment[]) {
    setServices((prev) =>
      prev.map((s, i) => {
        if (i !== serviceIndex) return s
        return {
          ...s,
          assignments: { ...s.assignments, [roleId]: newAssignments },
        }
      })
    )
    setEditingRole(null)
  }

  return (
    <div>
      <ServiceCarousel index={serviceIndex} onChange={setServiceIndex} />

      <div className="flex flex-col gap-6 mt-3">
        {ROLE_CATEGORIES.map((category) => {
          const roles = category.roleIds.map((id) => ROLE_MAP[id]).filter(Boolean)
          return (
            <div key={category.label}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-navy-200" />
                <span className="text-xs font-semibold text-navy-400 uppercase tracking-widest">
                  {category.label}
                </span>
                <div className="flex-1 h-px bg-navy-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map((role) => (
                  <RoleBox
                    key={role.id}
                    role={role}
                    assignments={service.assignments[role.id] ?? []}
                    onConfirmToggle={(personId) => handleConfirmToggle(role.id, personId)}
                    onEdit={() => setEditingRole(role.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {editingRole && (
        <EditRoleModal
          role={ROLE_MAP[editingRole]}
          assignments={service.assignments[editingRole] ?? []}
          onSave={(newAssignments) => handleSaveAssignments(editingRole, newAssignments)}
          onClose={() => setEditingRole(null)}
        />
      )}
    </div>
  )
}
