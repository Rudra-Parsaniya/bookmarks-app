import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Log in
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Welcome back. Enter your credentials to continue.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
