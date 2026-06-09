# Vercel Deployment Checklist

## Pre-deploy

- [ ] All SQL migrations applied in Supabase (profiles, bookmarks, public RLS)
- [ ] Supabase Auth URL configuration updated for production domain
- [ ] Resend domain verified (production sender) or use `onboarding@resend.dev` for testing
- [ ] Code pushed to GitHub (or connected Git provider)

## Environment variables on Vercel

Set these in **Project Settings → Environment Variables** for **Production** (and Preview if needed):

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase → Settings → API → anon public key |
| `RESEND_API_KEY` | Optional | Welcome emails; signup works without it |
| `RESEND_FROM_EMAIL` | Optional | Required with `RESEND_API_KEY` (e.g. `Bookmarks App <onboarding@resend.dev>`) |

`NEXT_PUBLIC_*` variables are embedded at **build time**. Redeploy after changing them.

## Supabase Auth (production)

In **Supabase Dashboard → Authentication → URL Configuration**:

1. **Site URL** — `https://your-app.vercel.app`
2. **Redirect URLs** — add:
   - `https://your-app.vercel.app/**`
   - `http://localhost:3000/**` (local dev)

Without these, login sessions and email confirmation links may fail in production.

## Middleware

Middleware runs on Vercel Edge and:

- Refreshes Supabase auth tokens via `getUser()`
- Protects `/dashboard` (redirects to `/login`)
- Redirects authenticated users away from `/login` and `/signup`

Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at runtime. The build fails on Vercel if these are missing.

## Deploy steps

1. Push code to your Git repository
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (table above)
5. Click **Deploy**
6. After deploy, update Supabase Auth URLs with your Vercel domain
7. Smoke test:
   - [ ] `/login` and `/signup` work
   - [ ] `/dashboard` redirects when logged out
   - [ ] Signup → login → dashboard shows bookmarks
   - [ ] `/{handle}` shows public bookmarks
   - [ ] Welcome email sends (if Resend configured)

## Post-deploy verification

```bash
npm run build   # should pass locally with .env.local
npm run lint    # should pass
```

Production build output should list `ƒ /dashboard`, `ƒ /[handle]`, and **Proxy (Middleware)**.
