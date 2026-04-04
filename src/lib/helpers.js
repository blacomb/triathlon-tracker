// src/lib/helpers.js
import { format, differenceInDays, startOfWeek, endOfWeek } from 'date-fns'

export const formatDuration = (mins) => {
  if (!mins) return '—'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export const formatDistance = (meters) => {
  if (!meters) return '—'
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`
  return `${Math.round(meters)} m`
}

export const formatPace = (secondsPerKm) => {
  if (!secondsPerKm) return '—'
  const m = Math.floor(secondsPerKm / 60)
  const s = secondsPerKm % 60
  return `${m}:${String(s).padStart(2, '0')}/km`
}

export const daysUntilRace = (raceDate) =>
  Math.max(0, differenceInDays(new Date(raceDate), new Date()))

export const groupByWeek = (workouts) => {
  const weeks = {}
  workouts.forEach(w => {
    const key = format(startOfWeek(new Date(w.scheduled_date)), 'yyyy-MM-dd')
    if (!weeks[key]) weeks[key] = []
    weeks[key].push(w)
  })
  return weeks
}

export const totalVolume = (workouts, discipline) => {
  return workouts
    .filter(w => w.status === 'completed' && (!discipline || w.discipline === discipline))
    .reduce((sum, w) => sum + (w.duration_minutes || 0), 0)
}

export const weeklyVolumes = (workouts, weeks = 8) => {
  const result = []
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = startOfWeek(new Date(Date.now() - i * 7 * 86400000))
    const weekEnd = endOfWeek(weekStart)
    const label = format(weekStart, 'MMM d')
    const week = workouts.filter(w => {
      const d = new Date(w.scheduled_date)
      return d >= weekStart && d <= weekEnd && w.status === 'completed'
    })
    result.push({
      label,
      swim: week.filter(w => w.discipline === 'swim').reduce((s, w) => s + (w.duration_minutes || 0), 0),
      bike: week.filter(w => w.discipline === 'bike').reduce((s, w) => s + (w.duration_minutes || 0), 0),
      run:  week.filter(w => w.discipline === 'run').reduce((s, w) => s + (w.duration_minutes || 0), 0),
    })
  }
  return result
}
