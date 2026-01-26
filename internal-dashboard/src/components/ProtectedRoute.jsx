import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div style={{padding: 20}}>Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}
