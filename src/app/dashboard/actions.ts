'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function getAuthenticatedClient() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return { supabase, user }
}

export async function createBookmark(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient()

  const { error } = await supabase.from('bookmarks').insert({
    user_id: user.id,
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    is_public: formData.get('is_public') === 'on',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}

export async function updateBookmark(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient()

  const id = formData.get('id') as string

  const { error } = await supabase
    .from('bookmarks')
    .update({
      title: formData.get('title') as string,
      url: formData.get('url') as string,
      is_public: formData.get('is_public') === 'on',
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (!error) {
    revalidatePath('/dashboard')
  }
}

export async function deleteBookmark(formData: FormData) {
  const { supabase, user } = await getAuthenticatedClient()

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', formData.get('id') as string)
    .eq('user_id', user.id)

  if (!error) {
    revalidatePath('/dashboard')
  }
}
