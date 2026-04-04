// src/pages/Auth.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'

export function Auth() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState('')
  const [error, setError]       = useState('')

  const handleSubmit = async () => {
    setError(''); setMessage(''); setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password, name)
        if (error) throw error
        setMessage('Check your email to confirm your account!')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)',
      backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,200,255,0.1), transparent)',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeUp 0.4s ease' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--accent)' }}>
            ⟡ TRI TRACKER
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Your triathlon training companion
          </div>
          <div style={{ fontSize: '13px', marginTop: '6px' }}>🏊 🚴 🏃 → June 28, 2025</div>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-xl)', padding: '36px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), var(--shadow-glow)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.04em' }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>

          {mode === 'signup' && (
            <div style={{ marginBottom: '16px' }}>
              <label>Full Name</label>
              <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div style={{ marginBottom: '16px' }}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>

          {error && <div style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#f871711a', borderRadius: '8px' }}>{error}</div>}
          {message && <div style={{ color: '#34d399', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#34d3991a', borderRadius: '8px' }}>{message}</div>}

          <Button onClick={handleSubmit} disabled={loading} size="lg" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Loading…' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
          </Button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have one? '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage('') }}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
