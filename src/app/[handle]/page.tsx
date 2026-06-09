import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageContainer } from '@/components/layout/page-container'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { createClient } from '@/lib/supabase/server'

type PublicProfilePageProps = {
  params: Promise<{ handle: string }>
}

async function getProfile(handle: string) {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, handle')
    .eq('handle', handle)
    .maybeSingle()

  if (!profile) return null

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, title, url, created_at')
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return { profile, bookmarks: bookmarks ?? [] }
}

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { handle } = await params
  const data = await getProfile(handle)

  if (!data) {
    return { title: 'Profile not found' }
  }

  return {
    title: `@${data.profile.handle} · Bookmarks`,
    description: `Public bookmarks shared by @${data.profile.handle}`,
  }
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { handle } = await params
  const data = await getProfile(handle)

  if (!data) {
    notFound()
  }

  const { profile, bookmarks } = data

  return (
    <PageContainer size="md" className="py-10 sm:py-14">
      <div className="space-y-10">
        <header className="border-b border-zinc-800 pb-8">
          <p className="text-sm font-medium text-zinc-500">Public profile</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
            @{profile.handle}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {bookmarks.length === 0
              ? 'No public bookmarks shared yet.'
              : `${bookmarks.length} public bookmark${bookmarks.length === 1 ? '' : 's'} shared`}
          </p>
        </header>

        {bookmarks.length > 0 ? (
          <ul className="space-y-3">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <Card className="transition-colors hover:border-zinc-700">
                  <CardContent className="py-5">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-medium text-zinc-100 transition-colors group-hover:text-zinc-50">
                          {bookmark.title}
                        </h2>
                        <Badge variant="public">Public</Badge>
                      </div>
                      <p className="mt-2 truncate text-sm text-zinc-500">
                        {bookmark.url}
                      </p>
                    </a>
                    <time className="mt-4 block text-xs text-zinc-600">
                      {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No public bookmarks"
            description={`@${profile.handle} hasn't shared any bookmarks publicly yet.`}
          />
        )}
      </div>
    </PageContainer>
  )
}
