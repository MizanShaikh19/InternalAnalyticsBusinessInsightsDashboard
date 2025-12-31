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
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
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
    if (!email || !email.includes('@')) return setError('Please enter a valid email to receive a magic link.')
    setLoading(true)
    const { error } = await signInWithMagicLink(email)
    setLoading(false)
    if (error) setError(error.message || 'Unable to send magic link')
    else setInfo('Magic link sent — check your email.')
  }

  const handlePasswordReset = async () => {
    setError(null)
    setInfo(null)
    if (!email || !email.includes('@')) return setError('Please enter the email address you want to reset.')
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) setError(error.message || 'Unable to send password reset email')
    else setInfo('Password reset email sent — check your inbox.')
  }

  const isInvalid = !!validate()

  return (
    <div className="auth-page premium-auth container active" style={{ background: '#000' }}>
      <div className="auth-mesh-bg" style={{ opacity: 0.1 }}></div>

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="glass-card" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 32, padding: 48 }}>
          <div className="animation" style={{ '--li': 1 }}>
            <div className="logo-main" style={{ justifyContent: 'center', marginBottom: 32 }}>
              <span style={{ fontSize: 32 }}>📊</span>
              <span style={{ fontSize: 24, fontWeight: 800 }}>Nexus</span>
            </div>
          </div>

          <div className="animation" style={{ '--li': 2 }}>
            <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 32 }}>{isSignUp ? 'Start your analytical journey.' : 'Please enter your details.'}</p>
          </div>

          <div className="animation" style={{ '--li': 3 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@nexus.ai"
                className="input"
                style={{ background: '#111', border: 'none', padding: 16, width: '100%' }}
              />
            </div>
          </div>

          <div className="animation" style={{ '--li': 4 }}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="input"
                style={{ background: '#111', border: 'none', padding: 16, width: '100%' }}
              />
            </div>
          </div>

          <div className="animation" style={{ '--li': 5 }}>
            {error && <div className="auth-alert error-alert">{error}</div>}
            {info && <div className="auth-alert success-alert">{info}</div>}

            <button disabled={loading || isInvalid} type="submit" className="btn primary" style={{ width: '100%', padding: 16, borderRadius: 999, fontWeight: 700, marginTop: 12 }}>
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </div>

          <div className="animation" style={{ '--li': 6 }}>
            <div className="auth-divider" style={{ margin: '32px 0' }}>
              <span>or</span>
            </div>

            <button type="button" onClick={handleMagicLink} className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', padding: 16, borderRadius: 999 }}>
              Magic Link Login
            </button>
          </div>

          <div className="animation" style={{ '--li': 7 }}>
            <div className="auth-switch" style={{ marginTop: 24 }}>
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-link">
                  {isSignUp ? 'Sign in' : 'Create one'}
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
