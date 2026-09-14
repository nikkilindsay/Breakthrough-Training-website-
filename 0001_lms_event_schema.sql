-- ============================================================
-- BTI LMS — Event Schema & Triggers  (2026-09-14)
-- Run this in the Supabase SQL editor, or: supabase db push
-- Creates: tables, RLS policies, views, triggers.
-- Flow: student action -> INSERT (row change) -> trigger ->
--       quality_events row -> Cohort / Quality dashboards.
-- ============================================================

-- ---------- 1. PROFILES (extends auth.users) ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text not null default 'student'
              check (role in ('student','instructor','backup_instructor','director','admin')),
  phone       text,
  created_at  timestamptz default now()
);

-- ---------- 2. COHORTS (primary + backup instructor per cohort) ----------
create table if not exists public.cohorts (
  id                     uuid primary key default gen_random_uuid(),
  name                   text not null,          -- e.g. 'HBR-2026-09'
  track                  text not null check (track in ('hybrid','self_paced','clinical')),
  start_date             date,
  end_date               date,
  primary_instructor_id  uuid references public.profiles(id),
  backup_instructor_id   uuid references public.profiles(id),
  status                 text default 'active',
  created_at             timestamptz default now()
);

-- ---------- 3. MODULES (14 CNA modules) ----------
create table if not exists public.modules (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,           -- 'M01-abuse', 'M07-vital-signs'
  title          text not null,
  hartman_chapter text,                          -- 5th ed. mapping
  order_index    int not null,
  total_minutes  int default 0
);

-- ---------- 4. ENROLLMENTS ----------
create table if not exists public.enrollments (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id),
  cohort_id    uuid not null references public.cohorts(id),
  status       text default 'active' check (status in ('active','complete','withdrawn','financial_hold')),
  payment_plan text,                             -- full | deposit_balance | installment_x2
  enrolled_at  timestamptz default now(),
  unique (student_id, cohort_id)
);

-- ---------- 5. MODULE COMPLETIONS (the row that fires triggers) ----------
create table if not exists public.module_completions (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id),
  module_id    uuid not null references public.modules(id),
  cohort_id    uuid references public.cohorts(id),
  score        numeric check (score between 0 and 100),
  attempts     int default 1,
  completed_at timestamptz default now(),
  unique (student_id, module_id)
);

-- ---------- 6. MODULE RATINGS (thumbs up/down widget) ----------
create table if not exists public.module_ratings (
  id         uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id),
  module_id  uuid not null references public.modules(id),
  rating     int not null check (rating between 1 and 5),  -- 5 = up, 1 = down
  free_text  text,
  rated_at   timestamptz default now()
);

-- ---------- 7. QUIZ ATTEMPTS (knowledge checkpoints, measure #20) ----------
create table if not exists public.quiz_attempts (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.profiles(id),
  module_id   uuid not null references public.modules(id),
  score       numeric check (score between 0 and 100),
  passed      boolean,
  attempted_at timestamptz default now()
);

-- ---------- 8. CLOCK HOURS (theory / skills lab / clinical — measure #7) ----------
create table if not exists public.clock_hours (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.profiles(id),
  cohort_id   uuid not null references public.cohorts(id),
  kind        text check (kind in ('theory','skills_lab','clinical')),
  minutes     int not null,
  date        date default current_date,
  verified_by uuid references public.profiles(id),   -- instructor after hands-on
  created_at  timestamptz default now()
);

-- ---------- 9. SKILLS CHECK-OFFS (hands-on, measure #19 — manual rows) ----------
create table if not exists public.skills_checkoffs (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references public.profiles(id),
  skill_code     text not null,                   -- e.g. 'vitals-BP','peri-care'
  attempt_1_pass boolean,
  verified_by    uuid references public.profiles(id),
  checked_off_at timestamptz default now()
);

-- ---------- 10. ATTENDANCE LOG (measure #7) ----------
create table if not exists public.attendance_log (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid not null references public.profiles(id),
  session_date date not null,
  attended     boolean,
  source       text,                              -- lms_activity | manual | skills_lab
  created_at   timestamptz default now()
);

-- ---------- 11. QUALITY EVENTS (the director's event stream) ----------
-- Only triggers (security definer) write here; students cannot fake events.
create table if not exists public.quality_events (
  id         uuid primary key default gen_random_uuid(),
  event_type text not null,   -- module.completed | module.low_rating |
                              -- student.near_completion | student.idle_at_risk
  student_id uuid references public.profiles(id),
  cohort_id  uuid references public.cohorts(id),
  module_id  uuid references public.modules(id),
  payload    jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_quality_events_type on public.quality_events (event_type, created_at desc);
create index if not exists idx_quality_events_cohort on public.quality_events (cohort_id);

-- ============================================================
-- RLS — enable on every table
-- ============================================================
alter table public.profiles            enable row level security;
alter table public.cohorts             enable row level security;
alter table public.modules             enable row level security;
alter table public.enrollments         enable row level security;
alter table public.module_completions  enable row level security;
alter table public.module_ratings      enable row level security;
alter table public.quiz_attempts       enable row level security;
alter table public.clock_hours         enable row level security;
alter table public.skills_checkoffs    enable row level security;
alter table public.attendance_log      enable row level security;
alter table public.quality_events      enable row level security;

-- ---------- RLS helpers ----------
create or replace function public.is_director() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('director','admin')) $$;

create or replace function public.is_instructor_of(c uuid) returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.cohorts
   where id = c and (primary_instructor_id = auth.uid() or backup_instructor_id = auth.uid() or public.is_director())) $$;

-- ---------- Profiles ----------
drop policy if exists "students read own profile" on public.profiles;
create policy "students read own profile" on public.profiles
  for select using (id = auth.uid() or public.is_director());

drop policy if exists "director writes profiles" on public.profiles;
create policy "director writes profiles" on public.profiles
  for insert with check (public.is_director());

-- ---------- Modules (anyone logged in can read the module list) ----------
drop policy if exists "read modules" on public.modules;
create policy "read modules" on public.modules for select using (true);

-- ---------- Cohorts ----------
drop policy if exists "read cohorts" on public.cohorts;
create policy "read cohorts" on public.cohorts
  for select using (
    public.is_director()
    or primary_instructor_id = auth.uid()
    or backup_instructor_id = auth.uid()
    or exists (select 1 from public.enrollments e
               where e.cohort_id = public.cohorts.id and e.student_id = auth.uid())
  );

-- ---------- Enrollments ----------
drop policy if exists "read enrollments" on public.enrollments;
create policy "read enrollments" on public.enrollments
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

-- ---------- Module completions ----------
drop policy if exists "read own completions" on public.module_completions;
create policy "read own completions" on public.module_completions
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

drop policy if exists "insert own completions" on public.module_completions;
create policy "insert own completions" on public.module_completions
  for insert with check (student_id = auth.uid());

-- ---------- Module ratings ----------
drop policy if exists "read own ratings" on public.module_ratings;
create policy "read own ratings" on public.module_ratings
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

drop policy if exists "insert own ratings" on public.module_ratings;
create policy "insert own ratings" on public.module_ratings
  for insert with check (student_id = auth.uid());

-- ---------- Quiz attempts ----------
drop policy if exists "read own quiz attempts" on public.quiz_attempts;
create policy "read own quiz attempts" on public.quiz_attempts
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

drop policy if exists "insert own quiz attempts" on public.quiz_attempts;
create policy "insert own quiz attempts" on public.quiz_attempts
  for insert with check (student_id = auth.uid());

-- ---------- Clock hours (theory auto-logs for the student; skills/clinical verified by instructor) ----------
drop policy if exists "read clock hours" on public.clock_hours;
create policy "read clock hours" on public.clock_hours
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

drop policy if exists "insert clock hours" on public.clock_hours;
create policy "insert clock hours" on public.clock_hours
  for insert with check (
    public.is_director()
    or public.is_instructor_of(cohort_id)
    or (student_id = auth.uid() and kind = 'theory')
  );

-- ---------- Skills check-offs (hands-on: instructor/director only) ----------
drop policy if exists "read skills checkoffs" on public.skills_checkoffs;
create policy "read skills checkoffs" on public.skills_checkoffs
  for select using (public.is_director() or public.is_instructor_of(cohort_id));

drop policy if exists "insert skills checkoffs" on public.skills_checkoffs;
create policy "insert skills checkoffs" on public.skills_checkoffs
  for insert with check (public.is_director() or public.is_instructor_of(cohort_id));

-- ---------- Attendance ----------
drop policy if exists "read attendance" on public.attendance_log;
create policy "read attendance" on public.attendance_log
  for select using (student_id = auth.uid() or public.is_instructor_of(cohort_id) or public.is_director());

drop policy if exists "insert attendance" on public.attendance_log;
create policy "insert attendance" on public.attendance_log
  for insert with check (public.is_director() or public.is_instructor_of(cohort_id));

-- ---------- Quality events (READ by director/instructor only; INSERT only via triggers) ----------
drop policy if exists "read quality events" on public.quality_events;
create policy "read quality events" on public.quality_events
  for select using (public.is_director() or public.is_instructor_of(cohort_id));

-- ============================================================
-- TRIGGERS
-- ============================================================

-- ---------- A) module.completed + near_completion ----------
create or replace function public.on_module_completed()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_modules_total  int;
  v_modules_passed int;
  v_cum_minutes    numeric;
  v_enrollment     record;
begin
  -- 1) log the event (row change -> event stream)
  insert into public.quality_events (event_type, student_id, cohort_id, module_id, payload)
  values ('module.completed', new.student_id, new.cohort_id, new.module_id,
          jsonb_build_object('score', new.score, 'attempts', new.attempts));

  -- 2) recompute progress for this student
  select count(*) into v_modules_total from public.modules;
  select count(*) into v_modules_passed
    from public.module_completions
    where student_id = new.student_id and score >= 70;
  select coalesce(sum(minutes),0) into v_cum_minutes
    from public.clock_hours where student_id = new.student_id;

  -- 3) near-completion alert at >= 80% of modules (e.g. 11 of 14)
  if v_modules_passed >= ceil(v_modules_total * 0.8) and v_modules_passed < v_modules_total then
    insert into public.quality_events (event_type, student_id, cohort_id, module_id, payload)
    values ('student.near_completion', new.student_id, new.cohort_id, new.module_id,
            jsonb_build_object('modules_passed', v_modules_passed,
                               'modules_total',   v_modules_total,
                               'cumulative_minutes', v_cum_minutes));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_module_completed on public.module_completions;
create trigger trg_module_completed
  after insert on public.module_completions
  for each row execute function public.on_module_completed();

-- ---------- B) module.low_rating (thumbs down <= 2 -> Director alert) ----------
create or replace function public.on_low_rating()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.rating <= 2 then
    insert into public.quality_events (event_type, student_id, module_id, payload)
    values ('module.low_rating', new.student_id, new.module_id,
            jsonb_build_object('rating', new.rating, 'free_text', new.free_text));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_low_rating on public.module_ratings;
create trigger trg_low_rating
  after insert on public.module_ratings
  for each row execute function public.on_low_rating();

-- ---------- C) quiz pass auto-records completion ----------
create or replace function public.on_quiz_passed()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.passed then
    insert into public.module_completions (student_id, module_id, score, attempts)
    values (new.student_id, new.module_id, new.score, 1)
    on conflict (student_id, module_id) do update set score = greatest(module_completions.score, excluded.score);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_quiz_passed on public.quiz_attempts;
create trigger trg_quiz_passed
  after insert on public.quiz_attempts
  for each row execute function public.on_quiz_passed();

-- ============================================================
-- VIEWS (dashboards read these)
-- ============================================================

-- Module NPS (measure #9 / #8)
create or replace view public.v_module_nps as
select
  m.code as module_code,
  m.title,
  count(*) filter (where r.rating >= 4)                       as promoters,
  count(*) filter (where r.rating <= 2)                       as detractors,
  count(*)                                                    as responses,
  round(((count(*) filter (where r.rating >= 4)
        - count(*) filter (where r.rating <= 2))::numeric / nullif(count(*), 0)) * 100, 1) as nps
from public.modules m
left join public.module_ratings r on r.module_id = m.id
group by m.id;

-- Student progress (Cohort Dashboard)
create or replace view public.v_student_progress as
select
  e.student_id,
  p.full_name,
  e.cohort_id,
  e.status,
  coalesce(agg.modules_passed, 0)    as modules_passed,
  (select count(*) from public.modules) as modules_total,
  coalesce(agg.cumulative_minutes, 0) as cumulative_hours
from public.enrollments e
join public.profiles p on p.id = e.student_id
left join lateral (
  select
    count(*) filter (where mc.score >= 70) as modules_passed,
    (select sum(minutes) from public.clock_hours ch where ch.student_id = e.student_id) as cumulative_minutes
  from public.module_completions mc
  where mc.student_id = e.student_id
) agg on true;

-- Director alert feed (Quality Dashboard)
create or replace view public.v_recent_quality_alerts as
select
  qe.id, qe.event_type, qe.payload, qe.created_at,
  p.full_name as student_name,
  c.name as cohort_name,
  m.code as module_code
from public.quality_events qe
left join public.profiles p on p.id = qe.student_id
left join public.cohorts  c on c.id = qe.cohort_id
left join public.modules   m on m.id = qe.module_id
order by qe.created_at desc;

-- --------------------------------------------
-- Optional later (uncomment when ready):
-- nightly idle-at-risk scan (requires pg_cron ext):
-- select cron.schedule('bti-idle-check', '0 2 * * *',
--   $$ insert into public.quality_events (event_type, student_id, cohort_id, payload)
--      select 'student.idle_at_risk', e.student_id, e.cohort_id,
--             jsonb_build_object('days_since_activity', extract(day from now() - last.active_at))
--      from public.enrollments e
--      left join lateral (select max(completed_at) active_at from public.module_completions mc
--                         where mc.student_id = e.student_id) last on true
--      where e.status = 'active' and (last.active_at is null or last.active_at < now() - interval '10 days') $$);
-- --------------------------------------------
