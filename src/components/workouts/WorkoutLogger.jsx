// src/components/workouts/WorkoutLogger.jsx
import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { DISCIPLINES, EFFORTS } from '../../lib/constants'
import { format } from 'date-fns'

const FIELD = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label>{label}</label>
    {children}
  </div>
)

export function WorkoutLogger({ open, onClose, onSave, initial = {} }) {
  const [form, setForm] = useState({
    discipline: 'run', status: 'completed',
    scheduled_date: format(new Date(), 'yyyy-MM-dd'),
    title: '', notes: '', effort_level: 'moderate',
    duration_minutes: '', distance_meters: '', pace_seconds_per_km: '',
    avg_heart_rate: '', calories: '', perceived_exertion: '',
    ...initial
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.scheduled_date) return setError('Date is required')
    setSaving(true); setError('')
    try {
      const payload = { ...form }
      // Convert numeric strings to numbers
      ;['duration_minutes','distance_meters','pace_seconds_per_km','avg_heart_rate','calories','perceived_exertion']
        .forEach(k => { if (payload[k] !== '') payload[k] = Number(payload[k]); else payload[k] = null })
      await onSave(payload)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const disc = DISCIPLINES[form.discipline]

  return (
    <Modal open={open} onClose={onClose} title="Log Workout">
      {/* Discipline pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {Object.entries(DISCIPLINES).map(([key, d]) => (
          <button key={key} onClick={() => set('discipline', key)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '20px', cursor: 'pointer',
            background: form.discipline === key ? `${d.color}22` : 'transparent',
            border: `1px solid ${form.discipline === key ? d.color : 'var(--border)'}`,
            color: form.discipline === key ? d.color : 'var(--text-muted)',
            fontSize: '13px', fontWeight: 600, transition: 'all 0.15s'
          }}>
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <FIELD label="Date">
          <input type="date" value={form.scheduled_date} onChange={e => set('scheduled_date', e.target.value)} />
        </FIELD>
        <FIELD label="Status">
          <select value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="completed">Completed</option>
            <option value="planned">Planned</option>
            <option value="skipped">Skipped</option>
            <option value="moved">Moved</option>
          </select>
        </FIELD>
      </div>

      <FIELD label="Title (optional)">
        <input placeholder={`e.g. Long ${disc?.label} Session`} value={form.title} onChange={e => set('title', e.target.value)} />
      </FIELD>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 12px' }}>
        <FIELD label="Duration (min)">
          <input type="number" min="0" placeholder="45" value={form.duration_minutes} onChange={e => set('duration_minutes', e.target.value)} />
        </FIELD>
        <FIELD label="Distance (m)">
          <input type="number" min="0" placeholder="5000" value={form.distance_meters} onChange={e => set('distance_meters', e.target.value)} />
        </FIELD>
        <FIELD label="Pace (sec/km)">
          <input type="number" min="0" placeholder="300" value={form.pace_seconds_per_km} onChange={e => set('pace_seconds_per_km', e.target.value)} />
        </FIELD>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <FIELD label="Avg Heart Rate">
          <input type="number" placeholder="145" value={form.avg_heart_rate} onChange={e => set('avg_heart_rate', e.target.value)} />
        </FIELD>
        <FIELD label="Calories">
          <input type="number" placeholder="600" value={form.calories} onChange={e => set('calories', e.target.value)} />
        </FIELD>
      </div>

      <FIELD label="Effort Level">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {EFFORTS.map(e => (
            <button key={e.value} onClick={() => set('effort_level', e.value)} title={e.desc} style={{
              padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
              background: form.effort_level === e.value ? 'var(--accent)' : 'transparent',
              border: `1px solid ${form.effort_level === e.value ? 'var(--accent)' : 'var(--border)'}`,
              color: form.effort_level === e.value ? '#000' : 'var(--text-muted)',
              fontSize: '12px', fontWeight: 600, transition: 'all 0.15s'
            }}>
              {e.label}
            </button>
          ))}
        </div>
      </FIELD>

      <FIELD label="Notes">
        <textarea placeholder="How did it feel? Any observations..." value={form.notes} onChange={e => set('notes', e.target.value)} />
      </FIELD>

      {error && <div style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : '✓ Save Workout'}
        </Button>
      </div>
    </Modal>
  )
}
