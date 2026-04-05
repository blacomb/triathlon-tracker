// src/components/plan/TrainingPlan.jsx
import { useState } from 'react'
import { Card } from '../ui/Card'
import { DisciplineBadge } from '../ui/Badge'
import { DISCIPLINES } from '../../lib/constants'
import { formatDuration, formatDistance } from '../../lib/helpers'
import { differenceInWeeks, addWeeks, startOfWeek, format } from 'date-fns'

// Built-in 12-week sprint/olympic triathlon plan template
const PLAN_TEMPLATE = [
  // Week 1
  { week: 1, day: 1, discipline: 'swim', title: 'Base Swim', duration: 30, distance: 1200, effort: 'easy',     desc: '6x200m easy, focus on form' },
  { week: 1, day: 3, discipline: 'bike', title: 'Easy Spin',  duration: 45, distance: 18000, effort: 'easy',   desc: 'Zone 2, flat course' },
  { week: 1, day: 5, discipline: 'run',  title: 'Easy Run',   duration: 30, distance: 5000,  effort: 'easy',   desc: 'Conversational pace, no watch pressure' },
  // Week 2
  { week: 2, day: 1, discipline: 'swim', title: 'Technique Swim', duration: 40, distance: 1500, effort: 'easy', desc: '8x100m + drills' },
  { week: 2, day: 2, discipline: 'run',  title: 'Easy Run',   duration: 35, distance: 5500,  effort: 'easy',   desc: 'Build aerobic base' },
  { week: 2, day: 4, discipline: 'bike', title: 'Moderate Ride', duration: 60, distance: 25000, effort: 'moderate', desc: 'Hold steady Zone 3' },
  { week: 2, day: 6, discipline: 'run',  title: 'Long Run',   duration: 50, distance: 8000,  effort: 'easy',   desc: 'Slow and steady — build base' },
  // Week 3
  { week: 3, day: 1, discipline: 'swim', title: 'Threshold Swim', duration: 45, distance: 2000, effort: 'hard', desc: '4x400m on 30s rest' },
  { week: 3, day: 3, discipline: 'bike', title: 'Tempo Ride', duration: 75, distance: 30000, effort: 'hard',  desc: '2x20min tempo intervals' },
  { week: 3, day: 5, discipline: 'run',  title: 'Tempo Run',  duration: 40, distance: 7000,  effort: 'hard',  desc: '3x10min at threshold' },
  // Week 4 — Recovery
  { week: 4, day: 1, discipline: 'swim', title: 'Easy Swim',  duration: 30, distance: 1200,  effort: 'easy',  desc: 'Recovery week — easy effort' },
  { week: 4, day: 3, discipline: 'bike', title: 'Recovery Ride', duration: 45, distance: 15000, effort: 'easy', desc: 'Zone 1-2 only' },
  { week: 4, day: 5, discipline: 'run',  title: 'Short Run',  duration: 25, distance: 4000,  effort: 'easy',  desc: 'Legs should feel fresh' },
  // Week 5
  { week: 5, day: 1, discipline: 'swim', title: 'Long Swim',  duration: 50, distance: 2500,  effort: 'moderate', desc: 'Continuous effort, aerobic pace' },
  { week: 5, day: 2, discipline: 'strength', title: 'Core & Strength', duration: 45, distance: 0, effort: 'moderate', desc: 'Hip stability, core, glutes' },
  { week: 5, day: 4, discipline: 'bike', title: 'Interval Ride', duration: 90, distance: 40000, effort: 'hard', desc: '5x8min FTP intervals' },
  { week: 5, day: 6, discipline: 'run',  title: 'Long Run',   duration: 65, distance: 11000, effort: 'easy',  desc: 'Aerobic base, no pace pressure' },
  // Week 6
  { week: 6, day: 1, discipline: 'swim', title: 'Race Sim Swim', duration: 50, distance: 2500, effort: 'race_pace', desc: 'Race pace sets, open water sim' },
  { week: 6, day: 3, discipline: 'brick', title: 'Brick — Bike+Run', duration: 90, distance: 0, effort: 'hard', desc: '60min bike → 20min run, practice transitions' },
  { week: 6, day: 5, discipline: 'run',  title: 'Tempo Run',  duration: 45, distance: 8000,  effort: 'hard',  desc: '30min at race pace' },
  // Week 7
  { week: 7, day: 1, discipline: 'swim', title: 'Speed Work', duration: 45, distance: 2200, effort: 'hard', desc: '10x100m fast with 15s rest' },
  { week: 7, day: 3, discipline: 'bike', title: 'Power Ride', duration: 90, distance: 42000, effort: 'hard', desc: '3x15min above FTP efforts' },
  { week: 7, day: 5, discipline: 'run',  title: 'Race Pace Run', duration: 45, distance: 8500, effort: 'race_pace', desc: '4x10min at race pace' },
  // Week 8 — Recovery
  { week: 8, day: 1, discipline: 'swim', title: 'Easy Swim',  duration: 30, distance: 1200,  effort: 'easy',  desc: 'Recovery week — flush the legs' },
  { week: 8, day: 3, discipline: 'bike', title: 'Easy Spin',  duration: 45, distance: 16000, effort: 'easy',  desc: 'Zone 1 — feel refreshed' },
  { week: 8, day: 5, discipline: 'run',  title: 'Short Run',  duration: 25, distance: 4000,  effort: 'easy',  desc: 'Keep it easy' },
  // Week 9
  { week: 9, day: 2, discipline: 'swim', title: 'Long Swim',  duration: 55, distance: 3000,  effort: 'moderate', desc: 'Continuous — full race distance+' },
  { week: 9, day: 4, discipline: 'brick', title: 'Long Brick', duration: 120, distance: 0,   effort: 'moderate', desc: '80min bike → 30min run' },
  { week: 9, day: 6, discipline: 'run',  title: 'Long Run',   duration: 75, distance: 13000, effort: 'easy',  desc: 'Longest run of the block' },
  // Week 10
  { week: 10, day: 1, discipline: 'swim', title: 'Race Sim',  duration: 50, distance: 2500, effort: 'race_pace', desc: 'Full race distance at race pace' },
  { week: 10, day: 3, discipline: 'bike', title: 'Race Sim Ride', duration: 90, distance: 40000, effort: 'race_pace', desc: 'Hold race watts/speed' },
  { week: 10, day: 5, discipline: 'run',  title: 'Race Pace Run', duration: 40, distance: 8000, effort: 'race_pace', desc: '10K at race pace' },
  // Week 11 — Taper begins
  { week: 11, day: 1, discipline: 'swim', title: 'Taper Swim', duration: 35, distance: 1800, effort: 'moderate', desc: 'Cut volume, keep intensity' },
  { week: 11, day: 3, discipline: 'bike', title: 'Taper Ride', duration: 60, distance: 25000, effort: 'moderate', desc: 'Include race-pace bursts' },
  { week: 11, day: 5, discipline: 'run',  title: 'Taper Run',  duration: 30, distance: 5500,  effort: 'moderate', desc: 'Short, sharp, confident' },
  // Week 12 — Race week
  { week: 12, day: 1, discipline: 'swim', title: 'Shakeout Swim', duration: 20, distance: 800, effort: 'easy', desc: 'Loosen up, feel the water' },
  { week: 12, day: 3, discipline: 'bike', title: 'Pre-race Spin', duration: 25, distance: 8000, effort: 'easy', desc: 'Easy spin with 3-4 race-pace bursts' },
  { week: 12, day: 5, discipline: 'run',  title: 'Pre-race Jog', duration: 15, distance: 2000, effort: 'easy', desc: '10min easy + strides' },
  { week: 12, day: 6, discipline: 'rest', title: 'Rest & Prepare', duration: 0, distance: 0, effort: 'easy', desc: 'Lay out kit, check bike, sleep early 🏁' },
]

const EFFORT_COLORS = { easy: '#34d399', moderate: '#60a5fa', hard: '#f5a623', race_pace: '#ff4d6d', max: '#a78bfa' }

export function TrainingPlan({ raceDate = '2025-06-28' }) {
  const totalWeeks = 12
  const planStart = addWeeks(new Date(raceDate), -totalWeeks)
  const currentWeek = Math.max(1, Math.min(totalWeeks, differenceInWeeks(new Date(), planStart) + 1))
  const [activeWeek, setActiveWeek] = useState(currentWeek)

  const weekSessions = PLAN_TEMPLATE.filter(s => s.week === activeWeek)
  const weekStart = addWeeks(planStart, activeWeek - 1)

  return (
    <div>
      {/* Week selector */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(w => {
          const isCurrent = w === currentWeek
          const isPast = w < currentWeek
          return (
            <button key={w} onClick={() => setActiveWeek(w)} style={{
              padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: w === activeWeek ? 700 : 400, fontSize: '13px',
              background: w === activeWeek ? 'var(--accent)' : isPast ? 'rgba(52,211,153,0.1)' : 'var(--bg-card)',
              border: `1px solid ${w === activeWeek ? 'var(--accent)' : isCurrent ? 'rgba(0,200,255,0.4)' : 'var(--border)'}`,
              color: w === activeWeek ? '#000' : isPast ? '#34d399' : 'var(--text-secondary)',
              transition: 'all 0.15s'
            }}>
              {w === 12 ? '🏁 Race' : w === 4 || w === 8 ? `W${w} 💤` : `W${w}`}
            </button>
          )
        })}
      </div>

      {/* Week header */}
      <Card style={{ marginBottom: '16px', background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Week {activeWeek} {activeWeek === 4 || activeWeek === 8 ? '— Recovery 💤' : activeWeek === 11 ? '— Taper 🎯' : activeWeek === 12 ? '— Race Week 🏁' : ''}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {format(weekStart, 'MMM d')} – {format(addWeeks(weekStart, 1), 'MMM d, yyyy')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontFamily: 'var(--font-display)', fontWeight: 800, color: activeWeek === currentWeek ? 'var(--accent)' : 'var(--text-muted)' }}>
              {weekSessions.reduce((s, w) => s + (w.duration || 0), 0)}m
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total volume</div>
          </div>
        </div>
      </Card>

      {/* Sessions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {weekSessions.length === 0 && (
          <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center' }}>No sessions this week.</div>
        )}
        {weekSessions.map((s, i) => {
          const d = DISCIPLINES[s.discipline]
          const effortColor = EFFORT_COLORS[s.effort] || '#60a5fa'
          const dayLabel = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][s.day]
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
              animation: 'fadeUp 0.3s ease both', animationDelay: `${i * 0.05}s`
            }}>
              <div style={{
                background: `${d?.color}18`, borderRight: `2px solid ${d?.color}66`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '12px 8px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '22px' }}>{d?.icon}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.06em' }}>{dayLabel}</div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {s.title}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: effortColor, background: `${effortColor}18`, border: `1px solid ${effortColor}33`, borderRadius: '20px', padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {s.effort?.replace('_', ' ')}
                    </span>
                    <DisciplineBadge discipline={s.discipline} />
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{s.desc}</div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {s.duration > 0 && <Pill icon="⏱" val={formatDuration(s.duration)} />}
                  {s.distance > 0 && <Pill icon="📍" val={formatDistance(s.distance)} />}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Pill = ({ icon, val }) => (
  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
    {icon} {val}
  </span>
)
