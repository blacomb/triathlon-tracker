// src/components/calendar/TrainingCalendar.jsx
import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay } from 'date-fns'
import { Card } from '../ui/Card'
import { DISCIPLINES } from '../../lib/constants'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function TrainingCalendar({ workouts, onDayClick }) {
  const [current, setCurrent] = useState(new Date())
  const [selected, setSelected] = useState(null)

  const monthStart = startOfMonth(current)
  const monthEnd = endOfMonth(current)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: calStart, end: calEnd })

  const workoutsByDate = {}
  workouts.forEach(w => {
    const key = w.scheduled_date?.slice(0, 10)
    if (!workoutsByDate[key]) workoutsByDate[key] = []
    workoutsByDate[key].push(w)
  })

  const prev = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const next = () => setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const selectedKey = selected ? format(selected, 'yyyy-MM-dd') : null
  const selectedWorkouts = selectedKey ? (workoutsByDate[selectedKey] || []) : []

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
      <Card>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button onClick={prev} style={navBtn}>‹</button>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            {format(current, 'MMMM yyyy').toUpperCase()}
          </div>
          <button onClick={next} style={navBtn}>›</button>
        </div>

        {/* Day labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
          {DAY_LABELS.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '4px' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {days.map(day => {
            const key = format(day, 'yyyy-MM-dd')
            const dayWorkouts = workoutsByDate[key] || []
            const inMonth = isSameMonth(day, current)
            const today = isToday(day)
            const sel = selected && isSameDay(day, selected)

            return (
              <div key={key} onClick={() => { setSelected(day); onDayClick && onDayClick(day, dayWorkouts) }}
                style={{
                  minHeight: '72px', padding: '6px', borderRadius: '8px', cursor: 'pointer',
                  background: sel ? 'rgba(0,200,255,0.1)' : today ? 'rgba(0,200,255,0.05)' : 'transparent',
                  border: sel ? '1px solid var(--accent)' : today ? '1px solid rgba(0,200,255,0.3)' : '1px solid var(--border)',
                  opacity: inMonth ? 1 : 0.3,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = 'var(--bg-hover)' }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = today ? 'rgba(0,200,255,0.05)' : 'transparent' }}
              >
                <div style={{
                  fontSize: '12px', fontWeight: today ? 700 : 400,
                  color: today ? 'var(--accent)' : 'var(--text-secondary)',
                  marginBottom: '4px'
                }}>
                  {format(day, 'd')}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                  {dayWorkouts.slice(0, 3).map((w, i) => {
                    const d = DISCIPLINES[w.discipline]
                    const isCompleted = w.status === 'completed'
                    return (
                      <div key={i} style={{
                        width: '18px', height: '18px', borderRadius: '4px',
                        background: isCompleted ? `${d?.color}cc` : `${d?.color}33`,
                        border: `1px solid ${d?.color}66`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', title: d?.label
                      }}>
                        {d?.icon}
                      </div>
                    )
                  })}
                  {dayWorkouts.length > 3 && (
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', paddingTop: '2px' }}>+{dayWorkouts.length - 3}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Side panel */}
      <Card style={{ position: 'sticky', top: '20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
          {selected ? format(selected, 'EEEE, MMM d') : 'Select a day'}
        </div>
        {!selected && (
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Click any day to see its workouts.</div>
        )}
        {selected && selectedWorkouts.length === 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No workouts this day.</div>
        )}
        {selectedWorkouts.map(w => {
          const d = DISCIPLINES[w.discipline]
          return (
            <div key={w.id} style={{
              borderLeft: `3px solid ${d?.color}`, paddingLeft: '12px', marginBottom: '12px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: d?.color }}>{d?.icon} {d?.label}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{w.title || `${d?.label} Session`}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {w.duration_minutes}min {w.distance_meters ? `· ${(w.distance_meters/1000).toFixed(1)}km` : ''} · {w.status}
              </div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

const navBtn = {
  background: 'var(--bg-hover)', border: '1px solid var(--border)',
  color: 'var(--text-primary)', borderRadius: '8px',
  width: '32px', height: '32px', cursor: 'pointer',
  fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
}
