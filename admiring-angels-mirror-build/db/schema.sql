-- Mirror Build Baseline Schema (Supabase/Postgres)

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin','member','staff')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id bigint generated always as identity primary key,
  email text not null,
  name text,
  source text,
  interest text,
  created_at timestamptz not null default now()
);

create table if not exists form_submissions (
  id bigint generated always as identity primary key,
  form_id text not null,
  email text,
  payload jsonb not null default '{}'::jsonb,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists offers (
  id bigint generated always as identity primary key,
  name text not null,
  price_cents int,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id bigint generated always as identity primary key,
  email text,
  stripe_checkout_id text,
  stripe_payment_intent text,
  offer_id bigint references offers(id),
  amount_cents int,
  currency text default 'usd',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists content_cache (
  id bigint generated always as identity primary key,
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
