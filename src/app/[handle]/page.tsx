import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type PublicProfilePageProps = {
  params: Promise<{ handle: string }>
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { handle } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, handle')
    .eq('handle', handle)
    .maybeSingle()

  if (!profile) {
    notFound()
  }

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, title, url, created_at')
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            @{profile.handle}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Public bookmarks
          </p>
        </div>

        {bookmarks && bookmarks.length > 0 ? (
          <ul className="space-y-3">
            {bookmarks.map((bookmark) => (
              <li
                key={bookmark.id}
                className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-900 underline dark:text-zinc-50"
                >
                  {bookmark.title}
                </a>
                <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {bookmark.url}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No public bookmarks yet.
          </p>
        )}
      </div>
    </div>
  )
}
