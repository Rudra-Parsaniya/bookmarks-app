'use client'

import { useActionState } from 'react'
import { createBookmark } from '@/app/dashboard/actions'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <Card>
      <CardHeader>
        <h2 className="text-sm font-medium text-zinc-100">Add bookmark</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Save a new link to your collection.
        </p>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state.error && <Alert variant="error">{state.error}</Alert>}

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Documentation, article, tool…"
            />
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              required
              placeholder="https://example.com"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400">
            <input
              name="is_public"
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-zinc-50"
            />
            Visible on public profile
          </label>

          <Button type="submit" disabled={pending}>
            {pending ? 'Adding…' : 'Add bookmark'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
