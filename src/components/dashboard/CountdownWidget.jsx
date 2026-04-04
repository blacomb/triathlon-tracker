// src/components/dashboard/CountdownWidget.jsx
import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'

export function CountdownWidget({ raceDate = '2025-06-28', raceName = 'My Triathlon' }) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calc = () => {
      const diff = new Date(raceDate) - new Date()
      if (diff <= 0) return setTimeLeft({ done: true })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [raceDate])

  if (timeLeft.done) return (
    <Card glow style={{ textAlign: 'center', animation: 'pulse-glow 2s infinite' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--accent)' }}>🏁 RACE DAY!</div>
    </Card>
  )

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ]

  return (
    <Card glow style={{ background: 'linear-gradient(135deg, #0d1829 0%, #0a1520 100%)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
            ⟡ Countdown
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {raceName}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {new Date(raceDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <div style={{ fontSize: '32px' }}>🏊🚴🏃</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {units.map(({ label, value }) => (
          <div key={label} style={{
            background: 'rgba(0,200,255,0.06)', border: '1px solid rgba(0,200,255,0.15)',
            borderRadius: '12px', padding: '16px 8px', textAlign: 'center'
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 800,
              color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em'
            }}>
              {String(value ?? 0).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '4px' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
