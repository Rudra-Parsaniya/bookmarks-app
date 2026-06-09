-- Run this in the Supabase SQL Editor (or via supabase db push)

create policy "Anyone can read profiles"
  on public.profiles
  for select
  using (true);

create policy "Anyone can read public bookmarks"
  on public.bookmarks
  for select
  using (is_public = true);
