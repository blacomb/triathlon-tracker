// src/components/workouts/WorkoutCard.jsx
import { DisciplineBadge, StatusBadge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDuration, formatDistance, formatPace } from '../../lib/helpers'
import { format } from 'date-fns'
import { DISCIPLINES } from '../../lib/constants'

export function WorkoutCard({ workout, onEdit, onComplete, onSkip, onDelete }) {
  const d = DISCIPLINES[workout.discipline]

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${d?.color || '#444'}`,
      borderRadius: 'var(--radius-md)', padding: '16px 20px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      animation: 'fadeUp 0.3s ease both'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = d?.color || 'var(--border-light)'; e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.3)` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <DisciplineBadge discipline={workout.discipline} />
            <StatusBadge status={workout.status} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {format(new Date(workout.scheduled_date), 'MMM d, yyyy')}
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {workout.title || `${d?.label} Session`}
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {workout.duration_minutes && (
              <Stat icon="⏱" value={formatDuration(workout.duration_minutes)} label="Duration" />
            )}
            {workout.distance_meters && (
              <Stat icon="📍" value={formatDistance(workout.distance_meters)} label="Distance" />
            )}
            {workout.pace_seconds_per_km && (
              <Stat icon="⚡" value={formatPace(workout.pace_seconds_per_km)} label="Pace" />
            )}
            {workout.avg_heart_rate && (
              <Stat icon="❤️" value={`${workout.avg_heart_rate} bpm`} label="HR" />
            )}
            {workout.calories && (
              <Stat icon="🔥" value={`${workout.calories} kcal`} label="Calories" />
            )}
            {workout.effort_level && (
              <Stat icon="💪" value={workout.effort_level.replace('_', ' ')} label="Effort" color={d?.color} />
            )}
          </div>

          {workout.notes && (
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', borderLeft: '2px solid var(--border)', paddingLeft: '10px' }}>
              {workout.notes}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {workout.status === 'planned' && (
            <>
              <Button size="sm" variant="success" onClick={() => onComplete(workout.id)}>✓</Button>
              <Button size="sm" variant="danger" onClick={() => onSkip(workout.id)}>✕</Button>
            </>
          )}
          <Button size="sm" variant="ghost" onClick={() => onEdit(workout)}>✎</Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(workout.id)}>🗑</Button>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, value, label, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: color || 'var(--text-primary)' }}>
        {icon} {value}
      </span>
      <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
    </div>
  )
}
