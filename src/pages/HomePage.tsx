import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

declare const __BUILD__: string

export function HomePage() {
  const { signIn, bypass } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const err = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError(err)
    } else {
      navigate('/chooser')
    }
  }

  return (
    <div className="min-h-svh flex flex-col bg-navy-900">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <span className="text-gold-400 font-semibold tracking-wide">RedNaz</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gold-300 text-center mb-10 tracking-tight">
            Redlands Church of the Nazarene
          </h1>

          {!showForm ? (
            <div className="flex flex-col items-center gap-4">
              <button
                disabled
                className="w-full bg-navy-800 text-navy-500 font-semibold py-3 px-8 rounded-xl shadow cursor-not-allowed opacity-50"
              >
                Sign In (Suspended)
              </button>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => { bypass('Scott'); navigate('/chooser') }}
                  className="flex-1 text-xs text-navy-500 border border-dashed border-navy-600 hover:border-navy-400 hover:text-navy-300 px-4 py-1.5 rounded-lg transition-colors"
                >
                  Scott Login Bypass
                </button>
                <button
                  onClick={() => { bypass('Linda'); navigate('/chooser') }}
                  className="flex-1 text-xs text-navy-500 border border-dashed border-navy-600 hover:border-navy-400 hover:text-navy-300 px-4 py-1.5 rounded-lg transition-colors"
                >
                  Linda Login Bypass
                </button>
              </div>
            </div>

          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-navy-300 font-medium uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null) }}
                  placeholder="your@email.com"
                  className="bg-navy-800 border border-navy-600 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 rounded-lg px-3 py-2.5 text-gold-100 placeholder:text-navy-400 outline-none transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-navy-300 font-medium uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null) }}
                  placeholder="••••••••"
                  className="bg-navy-800 border border-navy-600 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 rounded-lg px-3 py-2.5 text-gold-100 placeholder:text-navy-400 outline-none transition"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-semibold py-3 rounded-xl shadow transition-colors"
              >
                {loading ? 'Signing in…' : 'Continue'}
              </button>

              <button
                type="button"
                onClick={() => { setShowForm(false); setError(null) }}
                className="text-sm text-navy-400 hover:text-navy-200 transition-colors"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-navy-500">
        Redlands Church of the Nazarene
      </footer>
    </div>
  )
}
