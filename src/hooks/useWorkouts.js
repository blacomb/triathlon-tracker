// src/hooks/useWorkouts.js
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useWorkouts() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_date', { ascending: false })
    if (error) setError(error.message)
    else setWorkouts(data || [])
    setLoading(false)
  }, [user])

  useEffect(() => { fetch() }, [fetch])

  const addWorkout = async (workout) => {
    const { data, error } = await supabase
      .from('workouts')
      .insert({ ...workout, user_id: user.id })
      .select()
      .single()
    if (error) throw error
    setWorkouts(prev => [data, ...prev])
    return data
  }

  const updateWorkout = async (id, updates) => {
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setWorkouts(prev => prev.map(w => w.id === id ? data : w))
    return data
  }

  const deleteWorkout = async (id) => {
    const { error } = await supabase.from('workouts').delete().eq('id', id)
    if (error) throw error
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  const markComplete = (id) =>
    updateWorkout(id, { status: 'completed', completed_at: new Date().toISOString() })

  const markSkipped = (id) => updateWorkout(id, { status: 'skipped' })

  return { workouts, loading, error, addWorkout, updateWorkout, deleteWorkout, markComplete, markSkipped, refetch: fetch }
}
