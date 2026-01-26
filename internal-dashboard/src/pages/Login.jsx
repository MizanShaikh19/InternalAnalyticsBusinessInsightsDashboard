import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, signUp, signInWithMagicLink, resetPassword, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const validate = () => {
    if (!email || !email.includes('@')) return 'Please enter a valid email.'
    if (!password || password.length < 6) return 'Password must be at least 6 characters.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    const v = validate()
    if (v) return setError(v)
    setLoading(true)

    if (isSignUp) {
      const { error, data } = await signUp({ email, password })
      setLoading(false)
      if (error) {
        setError(error.message)
      } else if (data?.session) {
        navigate('/dashboard', { replace: true })
      } else {
        setInfo('Sign up successful! Please check your email for confirmation.')
      }
    } else {
      const { error } = await signIn({ email, password })
      setLoading(false)
      if (error) {
        setError(error.message || 'Invalid email or password')
      } else {
        navigate('/dashboard', { replace: true })
      }
    }
  }

  const handleMagicLink = async () => {
    setError(null)
    setInfo(null)
    if (!email || !email.includes('@')) return setError('Please enter a valid email.')
    setLoading(true)
    const { error } = await signInWithMagicLink(email)
    setLoading(false)
    if (error) setError(error.message || 'Unable to send magic link')
    else setInfo('Magic link sent — check your email.')
  }

  const isInvalid = !!validate()

  return (
    <div className={`auth-page ${mounted ? 'is-mounted' : ''}`} style={{ background: 'var(--bg-deep)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="auth-container reveal" style={{ '--d': '0.1s', width: '100%', maxWidth: '440px' }}>
        <form onSubmit={handleSubmit} className="card" style={{ padding: '60px 48px', position: 'relative', textAlign: 'center' }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ width: 64, height: 64, background: 'var(--bg-card)', borderRadius: 20, boxShadow: 'var(--clay-shadow-outer), var(--clay-shadow-inner)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32, border: '1px solid var(--border)' }}>
              ✨
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--primary)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
              Pure<span style={{ color: '#fff' }}>Flow</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, letterSpacing: '0.5px' }}>
              {isSignUp ? 'Initialize Quantum Access' : 'Authentication Required'}
            </p>
          </div>

          {/* Form Fields */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--primary)', marginBottom: 10, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Access Identity
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter authorized email"
                className="input"
                style={{ width: '100%', padding: '16px 20px', fontSize: 15 }}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--primary)', marginBottom: 10, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Security Key
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••••••"
                className="input"
                style={{ width: '100%', padding: '16px 20px', fontSize: 15 }}
                required
              />
            </div>
          </div>

          {/* Alerts */}
          {error && <div style={{ background: 'rgba(255,0,0,0.1)', color: 'var(--primary)', padding: '14px', borderRadius: '15px', fontSize: '13px', fontWeight: 600, marginBottom: 32, border: '1px solid rgba(255,0,0,0.2)' }}>{error}</div>}
          {info && <div style={{ background: 'rgba(0,255,148,0.1)', color: '#00FF94', padding: '14px', borderRadius: '15px', fontSize: '13px', fontWeight: 600, marginBottom: 32, border: '1px solid rgba(0,255,148,0.2)' }}>{info}</div>}

          {/* Submit Button */}
          <button disabled={loading || isInvalid} type="submit" className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '14px' }}>
            {loading ? 'SYNCHRONIZING...' : (isSignUp ? 'CREATE CREDENTIALS' : 'DECRYPT & ENTER')}
          </button>

          {/* Magic Link */}
          <div style={{ marginTop: 40, borderTop: '1px solid #1a1a1a', paddingTop: 32 }}>
            <button type="button" onClick={handleMagicLink} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}>
              Request Magic Link Access
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <div style={{ marginTop: 20 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500 }}>
              {isSignUp ? 'Already cleared for access?' : "Don't have an access key?"}
              <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'transparent', border: 'none', color: '#fff', fontWeight: 800, marginLeft: 8, cursor: 'pointer', borderBottom: '2px solid var(--primary)' }}>
                {isSignUp ? 'Back to Login' : 'Request Credentials'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )

}
