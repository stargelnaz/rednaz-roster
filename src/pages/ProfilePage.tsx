import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProfilePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-navy-800 mb-4">Profile</h2>
      <div className="bg-white rounded-xl border border-navy-100 p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-navy-400 uppercase tracking-wider">Email</span>
          <span className="text-navy-800">{user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-navy-800 hover:bg-navy-700 text-gold-100 font-medium py-2.5 rounded-xl transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
