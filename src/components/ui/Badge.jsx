// src/components/ui/Badge.jsx
import { DISCIPLINES, STATUSES } from '../../lib/constants'

export function DisciplineBadge({ discipline }) {
  const d = DISCIPLINES[discipline] || DISCIPLINES.rest
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: `${d.color}18`, color: d.color,
      border: `1px solid ${d.color}33`,
      borderRadius: '20px', padding: '3px 10px',
      fontSize: '12px', fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase'
    }}>
      {d.icon} {d.label}
    </span>
  )
}

export function StatusBadge({ status }) {
  const s = STATUSES[status] || STATUSES.planned
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${s.color}18`, color: s.color,
      border: `1px solid ${s.color}33`,
      borderRadius: '20px', padding: '3px 10px',
      fontSize: '12px', fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase'
    }}>
      {s.label}
    </span>
  )
}
