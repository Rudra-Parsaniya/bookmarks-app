import { redirect } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { AddBookmarkForm } from '@/components/bookmarks/add-bookmark-form'
import { BookmarkList } from '@/components/bookmarks/bookmark-list'
import { ensureProfile } from '@/lib/profiles'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await ensureProfile(supabase, user)

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, user_id, title, url, is_public, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {profile?.handle ?? user.email}
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Log out
            </button>
          </form>
        </div>

        <AddBookmarkForm />

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Your bookmarks
          </h2>
          <BookmarkList bookmarks={bookmarks ?? []} />
        </section>
      </div>
    </div>
  )
}
