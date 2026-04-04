// src/pages/Calendar.jsx
import { TrainingCalendar } from '../components/calendar/TrainingCalendar'
import { useWorkouts } from '../hooks/useWorkouts'

export function Calendar() {
  const { workouts, loading } = useWorkouts()
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '0.04em' }}>CALENDAR</div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Your training month at a glance</div>
      </div>
      {loading
        ? <div style={{ color: 'var(--text-muted)', padding: '60px', textAlign: 'center' }}>Loading calendar…</div>
        : <TrainingCalendar workouts={workouts} />
      }
    </div>
  )
}
