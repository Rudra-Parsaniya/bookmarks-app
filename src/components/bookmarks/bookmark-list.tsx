import { deleteBookmark, updateBookmark } from '@/app/dashboard/actions'

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
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        No bookmarks yet.
      </p>
    )
  }

  return (
    <ul className="space-y-4">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <form action={updateBookmark} className="space-y-3">
            <input type="hidden" name="id" value={bookmark.id} />

            <input
              name="title"
              type="text"
              required
              defaultValue={bookmark.title}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />

            <input
              name="url"
              type="url"
              required
              defaultValue={bookmark.url}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />

            <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <input
                name="is_public"
                type="checkbox"
                defaultChecked={bookmark.is_public}
              />
              Public
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium dark:border-zinc-700"
              >
                Save
              </button>
            </div>
          </form>

          <form action={deleteBookmark} className="mt-2">
            <input type="hidden" name="id" value={bookmark.id} />
            <button
              type="submit"
              className="text-sm text-red-600 hover:underline dark:text-red-400"
            >
              Delete
            </button>
          </form>
        </li>
      ))}
    </ul>
  )
}
