import { SERVICE_DATES, CHILDREN_LESSONS } from '../data/seed'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
  })
}

function isToday(dateStr: string) {
  const today = new Date()
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return (
    dt.getFullYear() === today.getFullYear() &&
    dt.getMonth() === today.getMonth() &&
    dt.getDate() === today.getDate()
  )
}

function lessonParts(lesson: string) {
  // Split "R6 God is Able to Save Us" → ["R6", "God is Able to Save Us"]
  const match = lesson.match(/^(R\d+)\s+(.+)$/)
  return match ? { ref: match[1], title: match[2] } : { ref: '', title: lesson }
}

export function ChildrenPage() {
  // Merge SERVICE_DATES with CHILDREN_LESSONS for the full 14-week view
  const lessonMap = Object.fromEntries(CHILDREN_LESSONS.map((l) => [l.date, l]))

  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-800 mb-4">Children's Program</h2>

      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 bg-navy-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Helper
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Lesson
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICE_DATES.map((service, i) => {
              const cl = lessonMap[service.date]
              const today = isToday(service.date)
              const { ref, title } = cl?.lesson ? lessonParts(cl.lesson) : { ref: '', title: '' }

              return (
                <tr
                  key={service.date}
                  className={`border-b border-navy-50 last:border-0 transition-colors ${
                    today ? 'bg-gold-50' : i % 2 === 0 ? 'bg-white' : 'bg-navy-50/30'
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`font-medium ${today ? 'text-gold-700' : 'text-navy-700'}`}>
                      {formatDate(service.date)}
                    </span>
                    {today && (
                      <span className="ml-2 text-[10px] bg-gold-400 text-navy-900 font-semibold px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold italic text-navy-800">
                      {cl?.teacher ?? <span className="text-navy-300 font-normal not-italic">—</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold italic text-navy-800">
                      {cl?.helper ?? <span className="text-navy-300 font-normal not-italic">—</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {ref && (
                      <span className="font-bold text-navy-900 mr-1">{ref}</span>
                    )}
                    <span className="text-navy-600">{title}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
