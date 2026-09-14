// src/components/CohortDashboard.jsx
// Instructor / Director view: one cohort, live progress + quality flags.
// Reads v_student_progress (created by the migration). Subscribes to realtime
// so a module completion or clock-hour entry updates the table instantly.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CohortDashboard({ cohortId }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () =>
    supabase
      .from('v_student_progress')
      .select('*')
      .eq('cohort_id', cohortId)
      .then(({ data, error }) => {
        if (!error) setRows(data)
        setLoading(false)
      })

  useEffect(() => {
    if (!cohortId) return
    load()
    // live updates: row changes in these tables refresh the table
    const channel = supabase
      .channel(`cohort-${cohortId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'module_completions', filter: `cohort_id=eq.${cohortId}` },
        load
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clock_hours', filter: `cohort_id=eq.${cohortId}` },
        load
      )
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [cohortId])

  if (loading) return <p>Loading cohort…</p>

  return (
    <div className="cohort-dashboard card">
      <h2>Cohort progress</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Modules</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Near completion</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const near = r.modules_passed >= Math.ceil((r.modules_total || 14) * 0.8)
            return (
              <tr key={r.student_id}>
                <td>{r.full_name}</td>
                <td>{r.modules_passed}/{r.modules_total}</td>
                <td>{Math.round(r.cumulative_hours / 60)}h</td>
                <td>{r.status}</td>
                <td>{near ? '🔔 notify Director' : '—'}</td>
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr><td colSpan="5">No enrollments yet in this cohort.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
