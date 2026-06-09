import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const PROTECTED_ROUTES = ['/dashboard']
const AUTH_ROUTES = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  if (
    user &&
    AUTH_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (
    !user &&
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
