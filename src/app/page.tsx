import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { PageContainer } from '@/components/layout/page-container'
import { buttonClassName } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

const features = [
  {
    title: 'Personal dashboard',
    description:
      'Collect and manage every link in a private workspace built for daily use.',
  },
  {
    title: 'Public profiles',
    description:
      'Share a clean public page under your handle for the links you want visible.',
  },
  {
    title: 'Private by default',
    description:
      'Keep sensitive bookmarks to yourself until you explicitly mark them public.',
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <PageContainer className="py-20 sm:py-28">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium text-zinc-500">
            Bookmark management for individuals and teams
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl sm:leading-tight">
            Your links, organized and ready to share
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Bookmarks helps you save what matters, manage it from a focused
            dashboard, and publish a curated public profile when you are ready.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className={buttonClassName('primary', 'px-6 py-2.5')}
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className={buttonClassName('primary', 'px-6 py-2.5')}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className={buttonClassName('secondary', 'px-6 py-2.5')}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="mt-28">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Everything you need to manage links
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Simple tools with a polished experience from signup to sharing.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title}>
                <Card className="h-full transition-colors hover:border-zinc-700">
                  <CardContent className="py-6">
                    <h3 className="font-medium text-zinc-100">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </PageContainer>

      <Footer />
    </>
  )
}
