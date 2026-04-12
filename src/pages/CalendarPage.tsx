import { SERVICE_DATES, ROLES } from '../data/seed'
import { Link } from 'react-router-dom'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function CalendarPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-800 mb-3">Calendar</h2>
      <div className="flex flex-col gap-3">
        {SERVICE_DATES.map((service, i) => {
          const totalAssigned = Object.values(service.assignments).reduce(
            (acc, arr) => acc + arr.length, 0
          )
          const totalUnconfirmed = Object.values(service.assignments).reduce(
            (acc, arr) => acc + arr.filter((a) => !a.confirmed).length, 0
          )
          return (
            <Link
              key={service.date}
              to={`/roster`}
              state={{ serviceIndex: i }}
              className="bg-white rounded-xl border border-navy-100 px-4 py-3 hover:border-gold-300 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-navy-800 text-sm">{formatDate(service.date)}</span>
                <span className="text-xs text-navy-400">
                  {ROLES.length} roles
                </span>
              </div>
              <div className="flex gap-3 mt-1 text-xs">
                <span className="text-green-600">{totalAssigned - totalUnconfirmed} confirmed</span>
                {totalUnconfirmed > 0 && (
                  <span className="text-gold-600">{totalUnconfirmed} unconfirmed</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
