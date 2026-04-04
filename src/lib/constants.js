// src/lib/constants.js

export const RACE_DATE = new Date('2025-06-28')

export const DISCIPLINES = {
  swim:     { label: 'Swim',     color: '#00c8ff', icon: '🏊' },
  bike:     { label: 'Bike',     color: '#f5a623', icon: '🚴' },
  run:      { label: 'Run',      color: '#ff4d6d', icon: '🏃' },
  strength: { label: 'Strength', color: '#a78bfa', icon: '💪' },
  brick:    { label: 'Brick',    color: '#34d399', icon: '⚡' },
  rest:     { label: 'Rest',     color: '#6b7a99', icon: '😴' },
}

export const STATUSES = {
  planned:   { label: 'Planned',   color: '#60a5fa' },
  completed: { label: 'Done',      color: '#34d399' },
  skipped:   { label: 'Skipped',   color: '#f87171' },
  moved:     { label: 'Moved',     color: '#fbbf24' },
}

export const EFFORTS = [
  { value: 'easy',       label: 'Easy',       desc: 'Zone 1-2 — conversational' },
  { value: 'moderate',   label: 'Moderate',   desc: 'Zone 3 — comfortably hard' },
  { value: 'hard',       label: 'Hard',       desc: 'Zone 4 — threshold' },
  { value: 'race_pace',  label: 'Race Pace',  desc: 'Zone 4-5 — race intensity' },
  { value: 'max',        label: 'Max',        desc: 'Zone 5 — all out' },
]
