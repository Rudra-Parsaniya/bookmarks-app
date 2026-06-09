-- Run this in the Supabase SQL Editor (or via supabase db push)

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  url text not null,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists bookmarks_user_id_idx on public.bookmarks (user_id);

alter table public.bookmarks enable row level security;

create policy "Users can select own bookmarks"
  on public.bookmarks
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own bookmarks"
  on public.bookmarks
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks
  for delete
  using (auth.uid() = user_id);
