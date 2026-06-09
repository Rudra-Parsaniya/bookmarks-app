import type { SupabaseClient, User } from '@supabase/supabase-js'

export async function ensureProfile(supabase: SupabaseClient, user: User) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('email, handle')
    .eq('id', user.id)
    .maybeSingle()

  if (existing) return existing

  const handle = user.user_metadata?.handle as string | undefined
  if (!handle || !user.email) return null

  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: user.id, email: user.email, handle })
    .select('email, handle')
    .single()

  if (error) return null

  return data
}
