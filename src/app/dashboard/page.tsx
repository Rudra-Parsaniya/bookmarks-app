import { redirect } from 'next/navigation'
import { AddBookmarkForm } from '@/components/bookmarks/add-bookmark-form'
import { BookmarkList } from '@/components/bookmarks/bookmark-list'
import { PageContainer } from '@/components/layout/page-container'
import { StatCard } from '@/components/ui/stat-card'
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
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allBookmarks = bookmarks ?? []
  const publicCount = allBookmarks.filter((b) => b.is_public).length
  const privateCount = allBookmarks.length - publicCount

  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="space-y-10">
        <section>
          <p className="text-sm font-medium text-zinc-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Welcome back{profile?.handle ? `, @${profile.handle}` : ''}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage your bookmarks and control what appears on your public profile.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Bookmarks" value={allBookmarks.length} />
          <StatCard label="Public Bookmarks" value={publicCount} />
          <StatCard label="Private Bookmarks" value={privateCount} />
        </section>

        <section className="space-y-6">
          <AddBookmarkForm />

          <div>
            <h2 className="text-sm font-medium text-zinc-300">Your bookmarks</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Edit titles, URLs, and visibility. Changes save per bookmark.
            </p>
            <div className="mt-5">
              <BookmarkList bookmarks={allBookmarks} />
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  )
}
