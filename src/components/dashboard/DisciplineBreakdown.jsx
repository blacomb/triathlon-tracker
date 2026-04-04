// src/components/dashboard/DisciplineBreakdown.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '../ui/Card'
import { DISCIPLINES } from '../../lib/constants'
import { formatDuration } from '../../lib/helpers'

export function DisciplineBreakdown({ workouts }) {
  const completed = workouts.filter(w => w.status === 'completed')
  const data = ['swim', 'bike', 'run', 'strength', 'brick'].map(d => ({
    name: DISCIPLINES[d].label,
    value: completed.filter(w => w.discipline === d).reduce((s, w) => s + (w.duration_minutes || 0), 0),
    color: DISCIPLINES[d].color,
    icon: DISCIPLINES[d].icon,
  })).filter(d => d.value > 0)

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Discipline Split</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Training Breakdown</div>
      </div>

      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '14px' }}>
          No completed workouts yet
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                dataKey="value" stroke="none">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                formatter={(val) => [formatDuration(val), '']}
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {data.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: d.color }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{d.icon} {d.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formatDuration(d.value)}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: d.color, minWidth: '36px', textAlign: 'right' }}>
                    {Math.round((d.value / total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
