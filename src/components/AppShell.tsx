import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

declare const __BUILD__: string

const NAV_ITEMS = [
  { to: '/people',   label: 'People' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/roles',    label: 'Roles' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
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
      {/* Header */}
      <header className="bg-navy-900 text-gold-100 px-4 py-2.5 flex items-center gap-4 sticky top-0 z-40">
        {/* Logo */}
        <img
          src="/rednaz-logo.png"
          alt="RedNaz"
          onClick={() => navigate('/roster')}
          className="h-10 w-auto cursor-pointer flex-shrink-0"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Wide nav links (hidden on mobile) */}
        {user && (
          <nav className="hidden sm:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-navy-700 text-gold-300'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-gold-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Spacer on mobile */}
        <div className="flex-1 sm:hidden" />

        {/* Right side: build info (wide) + profile/hamburger */}
        {user && (
          <div className="flex items-center gap-3">
            {/* Build info — wide screens only */}
            <span className="hidden sm:block text-xs text-navy-400 font-mono">
              {__BUILD__}
            </span>

            {/* Profile / hamburger */}
            <div className="relative" ref={menuRef}>
              {/* Wide: profile icon; narrow: hamburger */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1 rounded hover:bg-navy-700 transition-colors"
                aria-label="Menu"
              >
                {menuOpen
                  ? <X size={22} />
                  : <span className="sm:hidden"><Menu size={22} /></span>
                }
                <span className="hidden sm:inline">
                  <UserCircle size={22} className="text-navy-300 hover:text-gold-200 transition-colors" />
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-navy-100 py-1 text-navy-900">
                  {/* Mobile-only nav links */}
                  <div className="sm:hidden border-b border-navy-100 pb-1 mb-1">
                    {NAV_ITEMS.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors ${
                            isActive ? 'text-navy-800 font-semibold' : 'text-navy-600 hover:bg-navy-50'
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${
                          isActive ? 'text-navy-800 font-semibold' : 'text-navy-600 hover:bg-navy-50'
                        }`
                      }
                    >
                      Profile
                    </NavLink>
                  </div>

                  {/* Sign out */}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-navy-50 transition-colors"
                  >
                    Sign out
                  </button>

                  {/* Build info */}
                  <div className="px-4 py-2 text-xs text-navy-300 border-t border-navy-100 font-mono">
                    {__BUILD__}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-xs text-navy-300">
        Redlands Church of the Nazarene
      </footer>
    </div>
  )
}
