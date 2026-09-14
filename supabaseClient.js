// src/lib/supabaseClient.js
// BTI LMS — Supabase client (React + Vite)
// Env vars needed in .env:
//   VITE_SUPABASE_URL  (project URL from Supabase dashboard)
//   VITE_SUPABASE_ANON_KEY
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Role helpers
export const currentUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data?.user ?? null
}

export const currentRole = async () => {
  const user = await currentUser()
  if (!user) return null
  const { data } = await supabase
    .from('profiles')
    .select('role, cohort_id, full_name')
    .eq('id', user.id)
    .single()
  return data ?? null
}

export const isDirector = async () => {
  const profile = await currentRole()
  return profile?.role === 'director' || profile?.role === 'admin'
}

export const isInstructor = async () => {
  const profile = await currentRole()
  return (
    profile?.role === 'instructor' ||
    profile?.role === 'backup_instructor' ||
    profile?.role === 'director' ||
    profile?.role === 'admin'
  )
}
