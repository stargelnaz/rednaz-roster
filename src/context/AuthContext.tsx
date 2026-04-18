import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  bypassed: boolean
  bypassUsername: string | null
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
  bypass: (username: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [bypassed, setBypassed] = useState(false)
  const [bypassUsername, setBypassUsername] = useState<string | null>(null)

  useEffect(() => {
    // Restore bypass from session storage if it exists
    const storedBypass = sessionStorage.getItem('rednaz_bypass_user')
    if (storedBypass) {
      setBypassed(true)
      setBypassUsername(storedBypass)
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string): Promise<string | null> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? error.message : null
  }

  async function signOut() {
    await supabase.auth.signOut()
    setBypassed(false)
    setBypassUsername(null)
    sessionStorage.removeItem('rednaz_bypass_user')
  }

  function bypass(username: string) {
    setBypassed(true)
    setBypassUsername(username)
    sessionStorage.setItem('rednaz_bypass_user', username)
  }

  return (
    <AuthContext.Provider value={{ user, loading, bypassed, bypassUsername, signIn, signOut, bypass }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
