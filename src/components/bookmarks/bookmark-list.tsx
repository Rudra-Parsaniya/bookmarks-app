import { deleteBookmark, updateBookmark } from '@/app/dashboard/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type Bookmark = {
  id: string
  user_id: string
  title: string
  url: string
  is_public: boolean
  created_at: string
}

export function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        description="Add your first link above to start building your collection."
      />
    )
  }

  return (
    <ul className="space-y-3">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <Card className="transition-colors hover:border-zinc-700">
            <CardContent className="py-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Badge variant={bookmark.is_public ? 'public' : 'private'}>
                  {bookmark.is_public ? 'Public' : 'Private'}
                </Badge>
                <time className="text-xs text-zinc-600">
                  {new Date(bookmark.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>

              <form action={updateBookmark} className="space-y-4">
                <input type="hidden" name="id" value={bookmark.id} />

                <div>
                  <Label htmlFor={`title-${bookmark.id}`}>Title</Label>
                  <Input
                    id={`title-${bookmark.id}`}
                    name="title"
                    type="text"
                    required
                    defaultValue={bookmark.title}
                  />
                </div>

                <div>
                  <Label htmlFor={`url-${bookmark.id}`}>URL</Label>
                  <Input
                    id={`url-${bookmark.id}`}
                    name="url"
                    type="url"
                    required
                    defaultValue={bookmark.url}
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
                  <input
                    name="is_public"
                    type="checkbox"
                    defaultChecked={bookmark.is_public}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-zinc-50"
                  />
                  Visible on public profile
                </label>

                <div className="flex items-center gap-2 pt-1">
                  <Button type="submit" variant="secondary">
                    Save changes
                  </Button>
                </div>
              </form>

              <form action={deleteBookmark} className="mt-3 border-t border-zinc-800 pt-3">
                <input type="hidden" name="id" value={bookmark.id} />
                <Button type="submit" variant="danger" className="px-0">
                  Delete bookmark
                </Button>
              </form>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}
