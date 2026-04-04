// src/components/dashboard/WeeklyVolumeChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card } from '../ui/Card'
import { weeklyVolumes } from '../../lib/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: '10px', padding: '12px 16px', fontSize: '13px'
    }}>
      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: p.color, marginBottom: '2px' }}>
          <span style={{ textTransform: 'capitalize' }}>{p.name}</span>
          <span style={{ fontWeight: 700 }}>{p.value}m</span>
        </div>
      ))}
    </div>
  )
}

export function WeeklyVolumeChart({ workouts }) {
  const data = weeklyVolumes(workouts, 8)
  return (
    <Card>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Training Volume</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Weekly Minutes</div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last 8 weeks</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="28%">
          <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="swim" stackId="a" fill="#00c8ff" radius={[0,0,0,0]} />
          <Bar dataKey="bike" stackId="a" fill="#f5a623" radius={[0,0,0,0]} />
          <Bar dataKey="run"  stackId="a" fill="#ff4d6d" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
        {[['Swim','#00c8ff'],['Bike','#f5a623'],['Run','#ff4d6d']].map(([label, color]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: color }} />
            {label}
          </div>
        ))}
      </div>
    </Card>
  )
}
