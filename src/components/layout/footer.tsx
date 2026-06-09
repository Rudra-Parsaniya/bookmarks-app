import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Bookmarks
        </p>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/login" className="transition-colors hover:text-zinc-300">
            Login
          </Link>
          <Link href="/signup" className="transition-colors hover:text-zinc-300">
            Sign up
          </Link>
        </nav>
      </div>
    </footer>
  )
}
