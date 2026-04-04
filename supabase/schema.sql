-- ============================================================
-- TRIATHLON TRACKER - SUPABASE SCHEMA
-- Run this in Supabase SQL Editor: supabase.com → SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ────────────────────────────────────────────────
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  race_date date default '2025-06-28',
  race_name text default 'My Triathlon',
  ftp_watts int,            -- cycling functional threshold power
  css_per_100m int,         -- swim critical swim speed (seconds per 100m)
  run_threshold_pace int,   -- seconds per km at threshold
  weight_kg numeric(5,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can manage own profile"
  on profiles for all using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── WORKOUTS ────────────────────────────────────────────────
create type discipline_type as enum ('swim', 'bike', 'run', 'strength', 'brick', 'rest');
create type workout_status as enum ('planned', 'completed', 'skipped', 'moved');
create type effort_level as enum ('easy', 'moderate', 'hard', 'race_pace', 'max');

create table workouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  discipline discipline_type not null,
  status workout_status default 'planned',
  scheduled_date date not null,
  completed_at timestamptz,

  -- Performance fields
  duration_minutes int,          -- total duration
  distance_meters numeric(10,2), -- distance in meters (convert to km/miles in UI)
  pace_seconds_per_km int,       -- run/swim pace (seconds per km)
  speed_kmh numeric(5,2),        -- cycling speed
  avg_heart_rate int,
  max_heart_rate int,
  avg_power_watts int,           -- cycling power
  calories int,
  elevation_gain_m int,          -- for cycling/running

  -- Subjective fields
  effort_level effort_level,
  perceived_exertion int check (perceived_exertion between 1 and 10),
  title text,
  notes text,
  workout_type text,             -- e.g. "Tempo Run", "Long Ride", "Threshold Swim"

  -- Future extensibility
  external_id text,              -- for wearable sync (Garmin, Strava, etc.)
  source text,                   -- 'manual', 'garmin', 'strava', etc.
  metadata jsonb default '{}',   -- flexible storage for extra fields

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index workouts_user_date_idx on workouts(user_id, scheduled_date);
create index workouts_discipline_idx on workouts(user_id, discipline);
create index workouts_status_idx on workouts(user_id, status);

alter table workouts enable row level security;
create policy "Users can manage own workouts"
  on workouts for all using (auth.uid() = user_id);

-- ── TRAINING PLANS ──────────────────────────────────────────
create table training_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  description text,
  race_date date,
  weeks_duration int,
  is_active boolean default false,
  created_at timestamptz default now()
);

alter table training_plans enable row level security;
create policy "Users can manage own plans"
  on training_plans for all using (auth.uid() = user_id);

-- ── TRAINING PLAN SESSIONS ──────────────────────────────────
create table plan_sessions (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references training_plans(id) on delete cascade not null,
  week_number int not null,
  day_of_week int not null check (day_of_week between 0 and 6), -- 0=Sun, 6=Sat
  discipline discipline_type not null,
  title text not null,
  description text,
  duration_target_minutes int,
  distance_target_meters numeric(10,2),
  effort_target effort_level,
  notes text
);

alter table plan_sessions enable row level security;
create policy "Users can view plan sessions for own plans"
  on plan_sessions for all using (
    exists (
      select 1 from training_plans
      where training_plans.id = plan_sessions.plan_id
      and training_plans.user_id = auth.uid()
    )
  );

-- ── PERSONAL RECORDS ────────────────────────────────────────
create table personal_records (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  discipline discipline_type not null,
  record_type text not null,     -- e.g. "1km", "5km", "400m swim", "40km bike"
  value numeric(10,3) not null,  -- seconds for time, meters for distance
  unit text not null,            -- 'seconds', 'meters', 'watts'
  workout_id uuid references workouts(id) on delete set null,
  achieved_at date not null,
  created_at timestamptz default now()
);

alter table personal_records enable row level security;
create policy "Users can manage own PRs"
  on personal_records for all using (auth.uid() = user_id);

-- ── UPDATED_AT TRIGGER ───────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger workouts_updated_at before update on workouts
  for each row execute procedure update_updated_at();
create trigger profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at();

-- ── SEED DATA (OPTIONAL - for testing) ──────────────────────
-- Uncomment below after creating your user account to populate sample data.
-- Replace 'YOUR-USER-UUID' with your actual user ID from auth.users table.

/*
insert into workouts (user_id, discipline, status, scheduled_date, duration_minutes, distance_meters, pace_seconds_per_km, effort_level, title, notes)
values
  ('YOUR-USER-UUID', 'swim', 'completed', current_date - 13, 45, 2000, 120, 'moderate', 'Aerobic Base Swim', 'Felt smooth, good catch'),
  ('YOUR-USER-UUID', 'bike', 'completed', current_date - 12, 90, 35000, null, 'easy',     'Long Easy Ride', 'Zone 2 the whole way'),
  ('YOUR-USER-UUID', 'run',  'completed', current_date - 11, 40, 8000,  300,  'moderate', 'Tempo Run', 'Held pace well'),
  ('YOUR-USER-UUID', 'swim', 'completed', current_date - 9,  50, 2500, 118,  'hard',     'Threshold Set', '5x400m on 30s rest'),
  ('YOUR-USER-UUID', 'bike', 'completed', current_date - 8,  60, 25000, null, 'hard',    'Interval Ride', '4x8min FTP intervals'),
  ('YOUR-USER-UUID', 'run',  'completed', current_date - 7,  55, 10000, 295,  'hard',    '10K Race Effort', 'Strong negative split'),
  ('YOUR-USER-UUID', 'swim', 'planned',   current_date + 1,  45, 2000,  null, 'easy',    'Recovery Swim', null),
  ('YOUR-USER-UUID', 'bike', 'planned',   current_date + 2,  120, 50000, null, 'moderate', 'Long Ride', 'Build to 3hrs next week'),
  ('YOUR-USER-UUID', 'run',  'planned',   current_date + 3,  35, 7000,  310,  'easy',    'Easy Run', 'Keep HR low');
*/
