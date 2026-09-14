// src/lib/lmsEvents.js
// BTI LMS — event emitters.
// Every function below INSERTs a row; the matching Postgres trigger
// then writes the quality_events row that drives the dashboards.
// Call these from the LMS UI / quiz end-of-module screen.

import { supabase } from './supabaseClient'

// Student finished a module (score >= 70 counts as passing).
// Fires: module.completed -> auto near_completion event at 80% of modules.
export async function emitModuleCompleted({ studentId, moduleId, cohortId, score, attempts = 1 }) {
  const { data, error } = await supabase
    .from('module_completions')
    .upsert(
      { student_id: studentId, module_id: moduleId, cohort_id: cohortId, score, attempts },
      { onConflict: 'student_id,module_id' }
    )
    .select()
  if (error) throw new Error(`module_completions insert failed: ${error.message}`)
  return data
}

// Student tapped thumbs up (5) / thumbs down (1) on a module.
// rating <= 2 auto-fires module.low_rating -> Director alert.
export async function emitModuleRated({ studentId, moduleId, rating, freeText = '' }) {
  const { data, error } = await supabase
    .from('module_ratings')
    .insert({ student_id: studentId, module_id: moduleId, rating, free_text: freeText })
    .select()
  if (error) throw new Error(`module_ratings insert failed: ${error.message}`)
  return data
}

// Quiz attempt logged; a passing score auto-records the module completion.
export async function emitQuizAttempt({ studentId, moduleId, score }) {
  const passed = score >= 70
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({ student_id: studentId, module_id: moduleId, score, passed })
    .select()
  if (error) throw new Error(`quiz_attempts insert failed: ${error.message}`)
  if (passed) await emitModuleCompleted({ studentId, moduleId, score })
  return data
}

// ---------- MANUAL ROWS (hands-on / in-person — no student action) ----------
// Clinical / skills-lab hours verified by the instructor after a shift.
export async function logClockHours({ studentId, cohortId, kind, minutes, verifiedBy, date }) {
  const { data, error } = await supabase
    .from('clock_hours')
    .insert({
      student_id: studentId,
      cohort_id: cohortId,
      kind,                       // 'theory' | 'skills_lab' | 'clinical'
      minutes,
      verified_by: verifiedBy,
      date,
    })
    .select()
  if (error) throw new Error(`clock_hours insert failed: ${error.message}`)
  return data
}

// Instructor records a skills check-off (e.g. vitals-BP, peri-care).
export async function logSkillCheckoff({ studentId, skillCode, attempt1Pass, verifiedBy }) {
  const { data, error } = await supabase
    .from('skills_checkoffs')
    .insert({
      student_id: studentId,
      skill_code: skillCode,
      attempt_1_pass: attempt1Pass,
      verified_by: verifiedBy,
    })
    .select()
  if (error) throw new Error(`skills_checkoffs insert failed: ${error.message}`)
  return data
}

// Instructor or admin marks attendance for an in-person session.
export async function logAttendance({ studentId, sessionDate, attended, source = 'manual' }) {
  const { data, error } = await supabase
    .from('attendance_log')
    .insert({ student_id: studentId, session_date: sessionDate, attended, source })
    .select()
  if (error) throw new Error(`attendance_log insert failed: ${error.message}`)
  return data
}
