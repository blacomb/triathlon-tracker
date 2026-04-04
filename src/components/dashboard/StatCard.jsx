// src/components/dashboard/StatCard.jsx
import { Card } from '../ui/Card'

export function StatCard({ label, value, sub, accent, icon, delay = 0 }) {
  return (
    <Card className={`fade-up fade-up-${delay}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      {accent && (
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          width: '80px', height: '80px', borderRadius: '50%',
          background: `${accent}18`, filter: 'blur(20px)'
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
            {label}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: accent || 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {value}
          </div>
          {sub && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{sub}</div>}
        </div>
        {icon && (
          <div style={{
            fontSize: '28px', width: '48px', height: '48px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: accent ? `${accent}18` : 'var(--bg-hover)',
            borderRadius: '12px', border: `1px solid ${accent ? `${accent}30` : 'var(--border)'}`
          }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
