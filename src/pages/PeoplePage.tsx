import { useParams, Link } from 'react-router-dom'
import { PEOPLE } from '../data/seed'
import { ArrowLeft } from 'lucide-react'

export function PeoplePage() {
  const { id } = useParams<{ id: string }>()

  if (id) {
    const person = PEOPLE.find((p) => p.id === id)
    if (!person) return <p className="text-navy-400 text-sm">Person not found.</p>
    return (
      <div>
        <Link to="/people" className="inline-flex items-center gap-1 text-sm text-navy-400 hover:text-navy-700 mb-4">
          <ArrowLeft size={16} /> All People
        </Link>
        <div className="bg-white rounded-xl border border-navy-100 p-6 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-navy-800">{person.id}</h2>
          {(person.firstName !== person.id || person.lastName) && (
            <p className="text-navy-500">{person.firstName} {person.lastName ?? ''}</p>
          )}
          <div className="text-sm text-navy-500 flex flex-col gap-1">
            <a href={`mailto:${person.email}`} className="hover:text-navy-700 underline">{person.email}</a>
            <a href={`tel:${person.phone}`} className="hover:text-navy-700">{person.phone}</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-800 mb-3">People</h2>
      <div className="flex flex-col gap-2">
        {PEOPLE.map((p) => (
          <Link
            key={p.id}
            to={`/people/${p.id}`}
            className="bg-white rounded-xl border border-navy-100 px-4 py-3 flex justify-between items-center hover:border-gold-300 transition-colors"
          >
            <span className="font-medium text-navy-800">{p.id}</span>
            <span className="text-xs text-navy-400">{p.email}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
