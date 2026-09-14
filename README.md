# BTI CNA LMS — Event & Quality Scaffold (React + Supabase)

Started 2026-09-14. This turns your portal (`learn.btieducation.com`) into the
single platform: students finish modules → a row changes in Supabase → a
Postgres trigger writes a `quality_events` row → the Cohort & Quality
dashboards fill themselves in.

## What's in this repo

```
bti_lms/
├── supabase/migrations/0001_lms_event_schema.sql   ← run this FIRST in Supabase
├── src/
│   ├── lib/supabaseClient.js   ← client + role helpers (director/instructor/student)
│   ├── lib/lmsEvents.js        ← event emitters (call these from the UI)
│   └── components/
│       ├── ModuleRating.jsx        ← thumbs up/down widget
│       ├── CohortDashboard.jsx     ← instructor/director: live cohort progress
│       └── QualityDashboard.jsx    ← director: alerts + module NPS
├── .env.example
└── package.json
```

## File-by-file

| File | Purpose |
|---|---|
| `0001_lms_event_schema.sql` | Tables, row-level security, 3 triggers, 3 dashboard views. Run once in Supabase SQL editor (or `supabase db push`). |
| `supabaseClient.js` | Inits the client; `isDirector()` / `isInstructor()` role gates. |
| `lmsEvents.js` | `emitModuleCompleted`, `emitModuleRated`, `emitQuizAttempt`, `logClockHours`, `logSkillCheckoff`, `logAttendance`. Each INSERT is what fires a trigger. |
| `ModuleRating.jsx` | 👍/👎 widget; rating ≤ 2 auto-alerts the Director. |
| `CohortDashboard.jsx` | Realtime table of students × modules × hours × status (reads `v_student_progress`). |
| `QualityDashboard.jsx` | Last-30-days alert feed + module NPS (reads `v_recent_quality_alerts`, `v_module_nps`). |

## Setup (10 minutes)

1. **Supabase**: create a project → SQL editor → paste & run `0001_lms_event_schema.sql`.
2. **Env**: copy `.env.example` → `.env`, fill in your Supabase project URL + anon key.
3. **Install**: `npm install` then `npm run dev`.
4. **Auth**: enable email/magic-link auth in Supabase; first user gets role `director`
   via a manual row in `profiles` (or assign in dashboard).

## How the event flow works (your "triggers")

```
Student finishes module / quiz
        │  UI calls emitQuizAttempt() / emitModuleCompleted()
        ▼
INSERT into quiz_attempts / module_completions      ← the "row change"
        │
        ▼  Postgres trigger (AFTER INSERT)
┌───────────────────────────────────────────────┐
│ trg_quiz_passed → auto-completes the module    │
│ trg_module_completed → writes module.completed │
│   + student.near_completion at ≥80% of modules │
│ trg_low_rating → Director alert when rating≤2  │
└───────────────────────────────────────────────┘
        ▼
quality_events table (director/instructor can read; students cannot)
        ▼
CohortDashboard / QualityDashboard update in realtime
```

## Which quality measures automate vs stay manual

Auto-filled (student actions fire them):
- #8 Student satisfaction → `module_ratings` avg
- #9 NPS → `v_module_nps`
- #1/#2 Completion → `module_completions`
- #20 Knowledge checkpoints → `quiz_attempts`

Manual rows (require a human — instructor/director inserts):
- #7 Attendance / #18 Clinical shifts → `clock_hours` (kind `clinical`, `verified_by`)
- #19 Skills competency → `skills_checkoffs` (hands-on, `attempt_1_pass`)
- #17 Required filings → not in LMS (tracked in Quality Dashboard spreadsheet)

Not every row will be filled by the platform — by design. Hands-on items are
logged by the instructor after the shift, exactly as you planned.

## Notes

- RLS: students see only their own rows; instructors only their cohort (primary
  OR backup); director/admin sees everything.
- Idle-at-risk nightly scan is commented at the bottom of the migration —
  enable when you turn on `pg_cron`.
- One-time `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are the only secrets;
  keep the anon key public (RLS is what protects the data, not the key).
