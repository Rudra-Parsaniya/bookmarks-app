'use client'

import { useActionState } from 'react'
import { createBookmark } from '@/app/dashboard/actions'

const initialState = { error: undefined as string | undefined }

export function AddBookmarkForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await createBookmark(formData)
      return { error: result?.error }
    },
    initialState
  )

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Add bookmark
      </h2>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <input
        name="title"
        type="text"
        required
        placeholder="Title"
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />

      <input
        name="url"
        type="url"
        required
        placeholder="https://example.com"
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />

      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input name="is_public" type="checkbox" />
        Public
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {pending ? 'Adding…' : 'Add bookmark'}
      </button>
    </form>
  )
}
