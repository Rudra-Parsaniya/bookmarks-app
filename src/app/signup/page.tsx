import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Sign up
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create an account to get started.
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
