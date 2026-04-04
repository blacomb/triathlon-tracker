// src/pages/Workouts.jsx
import { useState } from 'react'
import { WorkoutCard } from '../components/workouts/WorkoutCard'
import { WorkoutLogger } from '../components/workouts/WorkoutLogger'
import { Button } from '../components/ui/Button'
import { useWorkouts } from '../hooks/useWorkouts'
import { DISCIPLINES } from '../lib/constants'

export function Workouts() {
  const { workouts, loading, addWorkout, updateWorkout, deleteWorkout, markComplete, markSkipped } = useWorkouts()
  const [logOpen, setLogOpen]     = useState(false)
  const [editing, setEditing]     = useState(null)
  const [filterDisc, setFilterDisc] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = workouts
    .filter(w => filterDisc === 'all' || w.discipline === filterDisc)
    .filter(w => filterStatus === 'all' || w.status === filterStatus)

  const handleEdit = (workout) => setEditing(workout)
  const handleSaveEdit = (data) => updateWorkout(editing.id, data)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '0.04em' }}>WORKOUTS</div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>{workouts.length} sessions logged</div>
        </div>
        <Button onClick={() => setLogOpen(true)} size="lg">+ Log Workout</Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <FilterPill label="All" active={filterDisc === 'all'} onClick={() => setFilterDisc('all')} />
        {Object.entries(DISCIPLINES).map(([key, d]) => (
          <FilterPill key={key} label={`${d.icon} ${d.label}`} active={filterDisc === key} color={d.color}
            onClick={() => setFilterDisc(filterDisc === key ? 'all' : key)} />
        ))}
        <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
        {['planned','completed','skipped','moved'].map(s => (
          <FilterPill key={s} label={s} active={filterStatus === s}
            onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)} />
        ))}
      </div>

      {/* List */}
      {loading && <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center' }}>Loading…</div>}
      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏊🚴🏃</div>
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>No workouts yet</div>
          <div style={{ fontSize: '13px' }}>Log your first session to get started</div>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(w => (
          <WorkoutCard key={w.id} workout={w}
            onEdit={handleEdit}
            onComplete={markComplete}
            onSkip={markSkipped}
            onDelete={(id) => { if (confirm('Delete this workout?')) deleteWorkout(id) }}
          />
        ))}
      </div>

      {/* Log modal */}
      <WorkoutLogger open={logOpen} onClose={() => setLogOpen(false)} onSave={addWorkout} />

      {/* Edit modal */}
      {editing && (
        <WorkoutLogger open={!!editing} onClose={() => setEditing(null)} onSave={handleSaveEdit} initial={editing} />
      )}
    </div>
  )
}

function FilterPill({ label, active, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
      background: active ? (color ? `${color}22` : 'var(--accent-glow)') : 'transparent',
      border: `1px solid ${active ? (color || 'var(--accent)') : 'var(--border)'}`,
      color: active ? (color || 'var(--accent)') : 'var(--text-muted)',
      fontSize: '12px', fontWeight: 600, textTransform: 'capitalize',
      transition: 'all 0.15s'
    }}>
      {label}
    </button>
  )
}
