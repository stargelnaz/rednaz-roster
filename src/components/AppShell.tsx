import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

declare const __BUILD__: string

const NAV_ITEMS = [
  { to: '/calendar', label: 'Calendar' },
  { to: '/people',   label: 'People'   },
  { to: '/settings', label: 'Settings' },
  { to: '/profile',  label: 'Profile'  },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, bypassed, signOut } = useAuth()
  const isAuthenticated = !!user || bypassed
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-svh flex flex-col bg-navy-50">

      {/* ── Header bar ── */}
      <header
        className="w-full sticky top-0 z-40 flex items-center"
        style={{ backgroundColor: '#fbbf24', height: '64px' }}
      >
        {/* Logo — flush left, full bar height, blend black away */}
        <img
          src="/rednaz-logo.png"
          alt="Redlands Church of the Nazarene"
          onClick={() => navigate('/roster')}
          className="h-full w-auto cursor-pointer flex-shrink-0"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Push nav to the right */}
        <div className="flex-1" />

        {isAuthenticated && (
          <>
            {/* ── Wide nav (md+) ── */}
            <nav className="hidden md:flex items-center gap-1 pr-3">
              {NAV_ITEMS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-navy-900/20 text-navy-900'
                        : 'text-navy-800 hover:bg-navy-900/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Build info */}
              <span className="ml-3 text-xs text-navy-700/70 font-mono whitespace-nowrap">
                {__BUILD__}
              </span>
            </nav>

            {/* ── Hamburger (narrow) ── */}
            <div className="md:hidden pr-3 relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1.5 rounded-lg text-navy-900 hover:bg-navy-900/10 transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-navy-100 py-1 text-navy-900">
                  {NAV_ITEMS.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'font-semibold text-navy-900 bg-navy-50'
                            : 'text-navy-600 hover:bg-navy-50'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}

                  <div className="border-t border-navy-100 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-navy-600 hover:bg-navy-50 transition-colors"
                    >
                      Sign out
                    </button>
                    <p className="px-4 py-2 text-xs text-navy-300 font-mono">
                      {__BUILD__}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="py-3 text-center text-xs text-navy-300">
        Redlands Church of the Nazarene
      </footer>
    </div>
  )
}
