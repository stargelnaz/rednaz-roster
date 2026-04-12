import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Users, Briefcase, CalendarDays, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

declare const __BUILD__: string

const NAV_ITEMS = [
  { to: '/people',   label: 'People',   icon: Users },
  { to: '/roles',    label: 'Roles',    icon: Briefcase },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/profile',  label: 'Profile',  icon: UserCircle },
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
      <header className="bg-navy-900 text-gold-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <span
          className="font-semibold tracking-wide text-lg cursor-pointer"
          onClick={() => navigate('/roster')}
        >
          RedNaz Roster
        </span>

        {/* Hamburger */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1 rounded hover:bg-navy-700 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-navy-100 py-1 text-navy-900">
                <div className="px-4 py-2 text-xs text-navy-400 border-b border-navy-100">
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-navy-50 transition-colors"
                >
                  Sign out
                </button>
                <div className="px-4 py-2 text-xs text-navy-300 border-t border-navy-100 font-mono">
                  {__BUILD__}
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Nav tabs */}
      {user && (
        <nav className="bg-white border-b border-navy-100 flex">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-navy-700 border-b-2 border-gold-500'
                    : 'text-navy-400 hover:text-navy-700'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}

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
