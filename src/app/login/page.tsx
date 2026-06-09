import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { AuthCard } from '@/components/layout/auth-card'

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to access your dashboard and bookmarks."
      footer={
        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-zinc-300 transition-colors hover:text-zinc-50"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
