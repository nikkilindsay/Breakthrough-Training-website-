// src/components/QualityDashboard.jsx
// Director view — roll-up of quality_events + module NPS.
// Feeds rows 8 (satisfaction), 9 (NPS), 2 (on-time completion) of the
// BTI CNA Quality Dashboard. Non-auto measures stay manual intake.
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function QualityDashboard({ rangeDays = 30 }) {
  const [alerts, setAlerts] = useState([])
  const [nps, setNps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const since = new Date(Date.now() - rangeDays * 864e5).toISOString()

    supabase
      .from('v_recent_quality_alerts')
      .select('*')
      .gte('created_at', since)
      .then(({ data }) => setAlerts(data || []))

    supabase
      .from('v_module_nps')
      .select('module_code, title, promoters, detractors, responses, nps')
      .then(({ data }) => setNps(data || []))

    const channel = supabase
      .channel('quality-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'quality_events' }, () => {
        supabase
          .from('v_recent_quality_alerts')
          .select('*')
          .gte('created_at', since)
          .then(({ data }) => setAlerts(data || []))
      })
      .subscribe()

    setLoading(false)
    return () => supabase.removeChannel(channel)
  }, [rangeDays])

  if (loading) return <p>Loading…</p>

  const lowRatings = alerts.filter((a) => a.event_type === 'module.low_rating')
  const nearCompletions = alerts.filter((a) => a.event_type === 'student.near_completion')

  return (
    <div className="quality-dashboard">
      <h2>Quality Dashboard — last {rangeDays} days</h2>

      <div className="kpi-row">
        <div className="kpi card">
          <strong>{lowRatings.length}</strong>
          <span>low ratings (👎)</span>
        </div>
        <div className="kpi card">
          <strong>{nearCompletions.length}</strong>
          <span>students near completion</span>
        </div>
        <div className="kpi card">
          <strong>{alerts.length}</strong>
          <span>total events</span>
        </div>
      </div>

      <h3>Action needed</h3>
      {lowRatings.length === 0 ? (
        <p>No low ratings — all clear.</p>
      ) : (
        <table>
          <thead>
            <tr><th>When</th><th>Student</th><th>Module</th><th>Note</th></tr>
          </thead>
          <tbody>
            {lowRatings.map((a) => (
              <tr key={a.id}>
                <td>{new Date(a.created_at).toLocaleString()}</td>
                <td>{a.student_name}</td>
                <td>{a.module_code}</td>
                <td>{a.payload?.free_text || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Students near completion</h3>
      {nearCompletions.map((a) => (
        <p key={a.id}>
          🔔 <strong>{a.student_name}</strong> — {a.payload?.modules_passed}/{a.payload?.modules_total} modules,
          {Math.round((a.payload?.cumulative_minutes || 0) / 60)}h logged
        </p>
      ))}
      {nearCompletions.length === 0 && <p>None right now.</p>}

      <h3>Module NPS</h3>
      <table>
        <thead>
          <tr><th>Module</th><th>👍</th><th>👎</th><th>Responses</th><th>NPS</th></tr>
        </thead>
        <tbody>
          {nps.map((m) => (
            <tr key={m.module_code}>
              <td>{m.module_code} — {m.title}</td>
              <td>{m.promoters}</td>
              <td>{m.detractors}</td>
              <td>{m.responses}</td>
              <td>{m.nps ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
