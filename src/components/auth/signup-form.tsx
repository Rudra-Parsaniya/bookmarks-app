'use client'

import { useActionState } from 'react'
import { signup, type AuthActionState } from '@/app/auth/actions'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: AuthActionState = {}

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState)

  return (
    <form action={formAction} className="space-y-5">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">{state.success}</Alert>}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <Label htmlFor="handle">Handle</Label>
        <Input
          id="handle"
          name="handle"
          type="text"
          required
          autoComplete="username"
          minLength={3}
          placeholder="yourname"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
