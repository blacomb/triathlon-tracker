// src/components/ui/Button.jsx
export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, style = {}, type = 'button' }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'var(--font-body)', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', borderRadius: 'var(--radius-sm)', transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1,
    ...(size === 'sm'  ? { padding: '6px 14px',  fontSize: '13px' } : {}),
    ...(size === 'md'  ? { padding: '10px 20px', fontSize: '14px' } : {}),
    ...(size === 'lg'  ? { padding: '14px 28px', fontSize: '16px' } : {}),
  }

  const variants = {
    primary:  { background: 'var(--accent)', color: '#000' },
    ghost:    { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
    danger:   { background: '#f871711a', color: '#f87171', border: '1px solid #f8717133' },
    success:  { background: '#34d3991a', color: '#34d399', border: '1px solid #34d39933' },
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.85' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      {children}
    </button>
  )
}
