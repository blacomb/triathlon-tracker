// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/',         icon: '◼', label: 'Dashboard'  },
  { to: '/workouts', icon: '⚡', label: 'Workouts'   },
  { to: '/calendar', icon: '📅', label: 'Calendar'   },
  { to: '/plan',     icon: '🗺', label: 'Plan'       },
]

export function Sidebar() {
  const { profile, signOut } = useAuth()
  return (
    <aside style={{
      width: 'var(--sidebar-w)', flexShrink: 0,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 20px 20px' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '22px',
          fontWeight: 800, letterSpacing: '0.08em', color: 'var(--accent)',
          textTransform: 'uppercase'
        }}>
          ⟡ TRI TRACKER
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Jun 28 — Race Day
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
            textDecoration: 'none', fontSize: '14px', fontWeight: 500,
            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
            background: isActive ? 'var(--accent-glow)' : 'transparent',
            border: isActive ? '1px solid rgba(0,200,255,0.15)' : '1px solid transparent',
            transition: 'all 0.15s',
          })}>
            <span style={{ fontSize: '16px' }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '16px 20px', borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {profile?.full_name || 'Athlete'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Training</div>
        </div>
        <button onClick={signOut} style={{
          background: 'none', border: '1px solid var(--border)',
          color: 'var(--text-muted)', borderRadius: '6px',
          padding: '5px 10px', fontSize: '11px', cursor: 'pointer'
        }}>
          Out
        </button>
      </div>
    </aside>
  )
}
