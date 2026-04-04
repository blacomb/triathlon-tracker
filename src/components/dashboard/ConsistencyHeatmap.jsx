// src/components/dashboard/ConsistencyHeatmap.jsx
import { Card } from '../ui/Card'
import { format, eachDayOfInterval, subDays, startOfDay } from 'date-fns'
import { DISCIPLINES } from '../../lib/constants'

export function ConsistencyHeatmap({ workouts }) {
  const days = eachDayOfInterval({ start: subDays(new Date(), 69), end: new Date() })
  const byDate = {}
  workouts.filter(w => w.status === 'completed').forEach(w => {
    const key = w.scheduled_date?.slice(0, 10)
    if (!byDate[key]) byDate[key] = []
    byDate[key].push(w)
  })

  const weeks = []
  let week = []
  days.forEach((day, i) => {
    week.push(day)
    if (week.length === 7 || i === days.length - 1) {
      weeks.push(week)
      week = []
    }
  })

  return (
    <Card>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Consistency</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Last 10 Weeks</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto' }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map(day => {
              const key = format(day, 'yyyy-MM-dd')
              const dayWorkouts = byDate[key] || []
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              const disc = dayWorkouts[0]?.discipline
              const color = disc ? DISCIPLINES[disc]?.color : null

              return (
                <div key={key} title={`${format(day, 'MMM d')}${dayWorkouts.length ? ` — ${dayWorkouts.length} workout(s)` : ''}`}
                  style={{
                    width: '14px', height: '14px', borderRadius: '3px',
                    background: color ? `${color}cc` : 'var(--bg-hover)',
                    border: isToday ? '1px solid var(--accent)' : '1px solid transparent',
                    cursor: dayWorkouts.length ? 'pointer' : 'default',
                    transition: 'transform 0.1s',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.3)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
        {Object.entries(DISCIPLINES).slice(0,5).map(([key, d]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: d.color }} />
            {d.label}
          </div>
        ))}
      </div>
    </Card>
  )
}
