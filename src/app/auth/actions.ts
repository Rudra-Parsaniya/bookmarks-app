'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { sendWelcomeEmail } from '@/lib/email'
import { ensureProfile } from '@/lib/profiles'
import { createClient } from '@/lib/supabase/server'

export type AuthActionState = {
  error?: string
  success?: string
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    await ensureProfile(supabase, data.user)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const handle = formData.get('handle') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { handle },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: 'Signup failed. Please try again.' }
  }

  void sendWelcomeEmail(email, handle)

  if (!data.session) {
    return {
      success: 'Check your email to confirm your account before logging in.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
