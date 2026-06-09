import type { ReactNode } from 'react'
import Link from 'next/link'
import { logout } from '@/app/auth/actions'
import { buttonClassName } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

function NavLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
    >
      {children}
    </Link>
  )
}

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let handle: string | null = null

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('handle')
      .eq('id', user.id)
      .maybeSingle()

    handle =
      profile?.handle ??
      (user.user_metadata?.handle as string | undefined) ??
      null
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-50"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-xs font-bold">
            B
          </span>
          Bookmarks
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1">
          <NavLink href="/">Home</NavLink>

          {user ? (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              {handle && (
                <NavLink href={`/${handle}`}>Public Profile</NavLink>
              )}
              <form action={logout} className="inline">
                <button
                  type="submit"
                  className={buttonClassName('ghost', 'px-3 py-2')}
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <Link
                href="/signup"
                className={buttonClassName('primary', 'ml-1 px-3.5 py-2')}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
