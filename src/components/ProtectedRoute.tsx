import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, bypassed } = useAuth()
  if (loading) return null
  if (!user && !bypassed) return <Navigate to="/" replace />
  return <>{children}</>
}
