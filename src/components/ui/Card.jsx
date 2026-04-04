// src/components/ui/Card.jsx
export function Card({ children, className = '', style = {}, glow = false }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: glow ? 'var(--shadow-card), var(--shadow-glow)' : 'var(--shadow-card)',
      transition: 'border-color 0.2s',
      ...style
    }} className={className}>
      {children}
    </div>
  )
}
