import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'
import { AuthCard } from '@/components/layout/auth-card'

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Get started with your personal bookmark workspace."
      footer={
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-zinc-300 transition-colors hover:text-zinc-50"
          >
            Log in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthCard>
  )
}
