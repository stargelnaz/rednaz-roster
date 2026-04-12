import { useState } from 'react'
import { SERVICE_DATES, ROLES } from '../data/seed'
import { RoleBox } from '../components/RoleBox'
import { ServiceCarousel } from '../components/ServiceCarousel'

function formatCurrentDate() {
  return new Date().toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function todayIndex() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  // Find the service on or after today
  for (let i = 0; i < SERVICE_DATES.length; i++) {
    const [y, m, d] = SERVICE_DATES[i].date.split('-').map(Number)
    const serviceDate = new Date(y, m - 1, d)
    if (serviceDate >= today) return i
  }
  return SERVICE_DATES.length - 1
}

export function RosterPage() {
  const [serviceIndex, setServiceIndex] = useState(todayIndex)
  const service = SERVICE_DATES[serviceIndex]
  const sortedRoles = [...ROLES].sort((a, b) => a.order - b.order)

  return (
    <div>
      {/* Today's date */}
      <p className="text-center text-sm text-navy-400 mt-1 mb-2">
        {formatCurrentDate()}
      </p>

      {/* Service carousel */}
      <ServiceCarousel index={serviceIndex} onChange={setServiceIndex} />

      {/* Role boxes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
        {sortedRoles.map((role) => (
          <RoleBox
            key={role.id}
            role={role}
            assignments={service.assignments[role.id] ?? []}
          />
        ))}
      </div>
    </div>
  )
}
