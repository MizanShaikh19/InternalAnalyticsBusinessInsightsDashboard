import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

const AUTH_KEY = 'business_dashboard_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, [])

  const signIn = async ({ email, password }) => {
    // Simple mock auth - allow any email with password 'password123'
    if (password === 'password123' || password === 'admin') {
      const newUser = { email, id: crypto.randomUUID(), role: 'admin' };
      setUser(newUser);
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      return { data: { user: newUser } };
    }
    return { error: { message: 'Invalid credentials. Hint: use password123' } };
  }

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }

  const signUp = async ({ email, password }) => {
    const newUser = { email, id: crypto.randomUUID(), role: 'admin' };
    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    return { data: { user: newUser } };
  }

  const signInWithMagicLink = async (email) => {
    const newUser = { email, id: crypto.randomUUID(), role: 'admin' };
    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    return { data: { user: newUser } };
  }

  const resetPassword = async (email) => {
    return { data: { message: 'Reset link sent (Mock)' } };
  }

  return (
    <AuthContext.Provider value={{ user, session: !!user, loading, signIn, signUp, signOut, signInWithMagicLink, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
