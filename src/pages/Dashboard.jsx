// src/pages/Dashboard.jsx
import { CountdownWidget } from '../components/dashboard/CountdownWidget'
import { StatCard } from '../components/dashboard/StatCard'
import { WeeklyVolumeChart } from '../components/dashboard/WeeklyVolumeChart'
import { DisciplineBreakdown } from '../components/dashboard/DisciplineBreakdown'
import { ConsistencyHeatmap } from '../components/dashboard/ConsistencyHeatmap'
import { useWorkouts } from '../hooks/useWorkouts'
import { useAuth } from '../context/AuthContext'
import { totalVolume, formatDuration } from '../lib/helpers'
import { startOfWeek } from 'date-fns'

export function Dashboard() {
  const { profile } = useAuth()
  const { workouts, loading } = useWorkouts()

  const completed = workouts.filter(w => w.status === 'completed')
  const thisWeek = workouts.filter(w => new Date(w.scheduled_date) >= startOfWeek(new Date()))
  const planned  = workouts.filter(w => w.status === 'planned')

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>
          DASHBOARD
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}. Keep pushing. 💪
        </div>
      </div>

      {/* Top row: Countdown + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <CountdownWidget
          raceDate={profile?.race_date || '2025-06-28'}
          raceName={profile?.race_name || 'My Triathlon'}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignContent: 'start' }}>
          <StatCard label="Total Workouts" value={completed.length} sub="All time" icon="⚡" accent="#00c8ff" delay={1} />
          <StatCard label="This Week" value={thisWeek.length} sub="Sessions logged" icon="📅" accent="#f5a623" delay={2} />
          <StatCard label="Total Hours" value={`${Math.floor(totalVolume(workouts) / 60)}h`} sub={`${totalVolume(workouts) % 60}m total`} icon="⏱" accent="#ff4d6d" delay={3} />
          <StatCard label="Upcoming" value={planned.length} sub="Planned sessions" icon="🗺" accent="#a78bfa" delay={4} />
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <WeeklyVolumeChart workouts={workouts} />
        <DisciplineBreakdown workouts={workouts} />
      </div>

      {/* Heatmap */}
      <ConsistencyHeatmap workouts={workouts} />

      {loading && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px', fontSize: '14px' }}>
          Loading your training data…
        </div>
      )}
    </div>
  )
}
