-- Run this in the Supabase SQL Editor (or via supabase db push)

drop policy if exists "Anyone can read profiles" on public.profiles;
create policy "Anyone can read profiles"
  on public.profiles
  for select
  using (true);

drop policy if exists "Anyone can read public bookmarks" on public.bookmarks;
create policy "Anyone can read public bookmarks"
  on public.bookmarks
  for select
  using (is_public = true);
