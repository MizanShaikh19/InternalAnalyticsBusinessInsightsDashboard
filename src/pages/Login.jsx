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
    <div className="auth-page premium-auth">
      {/* Back to Home Navigation */}
      <Link to="/" className="back-home-link">
        <span className="arrow">←</span> Back to Home
      </Link>

      <div className="auth-mesh-bg"></div>

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-card glass-card" aria-labelledby="login-heading">
          <div className="auth-logo" style={{ marginBottom: 40 }}>
            <div className="logo-main">
              <span className="logo-icon">📊</span>
              <span className="logo-text">Nexus</span>
            </div>
            <div className="logo-tagline">{isSignUp ? 'Join the future of insight' : 'Sign in to your workspace'}</div>
          </div>

          <h2 id="login-heading" className="sr-only">{isSignUp ? 'Create Account' : 'Sign in'}</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              autoFocus
              aria-label="Email"
              aria-invalid={!!(error && error.toLowerCase().includes('email'))}
              aria-describedby={error ? 'form-error' : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@nexus.ai"
              className="input premium-input"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="form-label" htmlFor="password" style={{ margin: 0 }}>Password</label>
              {!isSignUp && (
                <button type="button" onClick={handlePasswordReset} className="text-link-sm">Forgot?</button>
              )}
            </div>
            <div className="password-input-wrapper">
              <input
                id="password"
                aria-label="Password"
                aria-invalid={!!(error && error.toLowerCase().includes('password'))}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input premium-input"
              />
              <button
                type="button"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((s) => !s)}
                className="password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="form-checkbox-row">
              <label className="checkbox-container">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="checkmark"></span>
                Keep me signed in
              </label>
            </div>
          )}

          {error && <div id="form-error" role="alert" aria-live="assertive" className="auth-alert error-alert">{error}</div>}
          {info && <div role="status" aria-live="polite" className="auth-alert success-alert">{info}</div>}

          <button disabled={loading || isInvalid} type="submit" className="btn primary block premium-btn" style={{ width: '100%', marginBottom: 20 }}>
            {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Nexus Account' : 'Sign In')}
          </button>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-auth-placeholder">
            <button type="button" onClick={handleMagicLink} className="btn block secondary-btn" style={{ width: '100%' }}>
              Sign in with Magic Link
            </button>
          </div>

          <div className="auth-switch">
            <p>
              {isSignUp ? 'Already using Nexus?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-link"
              >
                {isSignUp ? 'Sign in' : 'Create one for free'}
              </button>
            </p>
          </div>
        </form>

        <p className="auth-security-notice">
          🔒 SSL Secured • Powered by Nexus Core
        </p>
      </div>
    </div>
  )
}
