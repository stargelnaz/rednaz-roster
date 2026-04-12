import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SERVICE_DATES } from '../data/seed'

interface Props {
  index: number
  onChange: (index: number) => void
}

function formatServiceDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ServiceCarousel({ index, onChange }: Props) {
  const hasPrev = index > 0
  const hasNext = index < SERVICE_DATES.length - 1

  return (
    <div className="flex items-center justify-between gap-2 py-3 px-1">
      <button
        onClick={() => hasPrev && onChange(index - 1)}
        disabled={!hasPrev}
        className="flex items-center gap-1 text-xs text-navy-400 disabled:opacity-30 hover:text-navy-700 transition-colors"
        aria-label="Previous service"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="text-center flex-1">
        <p className="text-sm font-semibold text-navy-800">
          {formatServiceDate(SERVICE_DATES[index].date)}
        </p>
        <p className="text-xs text-navy-400">
          Service {index + 1} of {SERVICE_DATES.length}
        </p>
      </div>

      <button
        onClick={() => hasNext && onChange(index + 1)}
        disabled={!hasNext}
        className="flex items-center gap-1 text-xs text-navy-400 disabled:opacity-30 hover:text-navy-700 transition-colors"
        aria-label="Next service"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
