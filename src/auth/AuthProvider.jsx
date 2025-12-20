import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../config/supabaseClient'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

      ; (async () => {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      })()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      mounted = false
      sub.subscription?.unsubscribe?.()
    }
  }, [])

  const signIn = async ({ email, password }) => {
    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.error) return { error: result.error }
    setSession(result.data.session)
    setUser(result.data.session?.user ?? null)
    return { data: result.data }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  const signUp = async ({ email, password }) => {
    const result = await supabase.auth.signUp({ email, password })
    if (result.error) return { error: result.error }
    return { data: result.data }
  }

  const signInWithMagicLink = async (email) => {
    // send magic-link OTP
    const { data, error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/dashboard' } })
    return { data, error }
  }

  const resetPassword = async (email) => {
    // Some client versions expose resetPasswordForEmail under auth or auth.api
    if (typeof supabase.auth.resetPasswordForEmail === 'function') {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/update-password' })
      return { data, error }
    }
    if (supabase.auth.api && typeof supabase.auth.api.resetPasswordForEmail === 'function') {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/update-password' })
      return { data, error }
    }
    return { error: new Error('Password reset not supported by client library') }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, signInWithMagicLink, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
