// src/pages/Plan.jsx
import { TrainingPlan } from '../components/plan/TrainingPlan'
import { useAuth } from '../context/AuthContext'

export function Plan() {
  const { profile } = useAuth()
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '0.04em' }}>TRAINING PLAN</div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
          12-week build to race day — structured and progressive
        </div>
      </div>
      <TrainingPlan raceDate={profile?.race_date || '2025-06-28'} />
    </div>
  )
}
