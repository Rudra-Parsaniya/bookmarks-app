# Bookmarks

A full-stack bookmark management application with authentication, private dashboards, and shareable public profiles.

## Project Overview

Bookmarks lets users save and organize links in a personal dashboard, control visibility per bookmark, and publish a public profile at `/{handle}`. The app is built for production-style workflows: server-side auth, Row Level Security in Supabase, transactional welcome emails, and deployment on Vercel.

## Features

- **Authentication** — Email/password signup and login with protected routes
- **User profiles** — Unique handle per user, created after authenticated session
- **Bookmark management** — Create, edit, and delete bookmarks from the dashboard
- **Visibility control** — Mark bookmarks as public or private
- **Public profiles** — Anyone can view `/{handle}` and see public bookmarks only
- **Welcome emails** — Resend integration (non-blocking; signup succeeds if email fails)
- **Auth-aware navigation** — Global navbar with session-based links and logout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database & Auth | Supabase (PostgreSQL + Auth) |
| Email | Resend |
| Deployment | Vercel |

## Local Setup

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- (Optional) A [Resend](https://resend.com) API key for welcome emails

### 1. Clone and install

```bash
git clone <repository-url>
cd bookmarks-app
npm install
```

### 2. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

### 3. Run database migrations

Apply the SQL files in `supabase/migrations/` via the Supabase SQL Editor, in order:

1. `001_create_profiles.sql`
2. `002_create_bookmarks.sql`
3. `003_public_profiles_rls.sql`

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon (public) key |
| `RESEND_API_KEY` | No | Resend API key for welcome emails |
| `RESEND_FROM_EMAIL` | No | Verified sender address (required if using Resend) |

See `.env.local.example` for reference.

## Deployment

The app is designed for [Vercel](https://vercel.com).

1. Push the repository to GitHub.
2. Import the project in Vercel (Next.js is auto-detected).
3. Add environment variables in Vercel project settings.
4. Deploy.
5. In **Supabase → Authentication → URL Configuration**, set:
   - **Site URL** to your Vercel domain
   - **Redirect URLs** to `https://your-app.vercel.app/**` and `http://localhost:3000/**`

`NEXT_PUBLIC_*` variables are embedded at build time — redeploy after changing them.

For a full checklist, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## AI Mistakes Encountered and How They Were Fixed

### 1. Profile Creation & RLS Issue

The AI initially attempted to create a profile immediately after signup. Because email confirmation was enabled and no authenticated session existed yet, Supabase Row Level Security (RLS) blocked the insert.

**Diagnosis:** Tested the signup flow, reviewed RLS policies (`auth.uid() = id` on insert), and traced the auth lifecycle — `signUp()` can return a user without establishing a session when email confirmation is required.

**Fix:** Removed the profile insert from signup. Profile creation now runs in an authenticated context (login and dashboard load) via `ensureProfile()`, with the handle stored in signup metadata. RLS policies were left unchanged.

### 2. Authentication & Routing Flow Issue

The AI initially implemented overly aggressive authentication redirects, causing users to be redirected directly to the dashboard instead of following the intended onboarding flow.

**Diagnosis:** Reviewed middleware route protection and page-level navigation. Protected routes and auth pages were conflated with the public landing experience.

**Fix:** Updated routing so `/` remains a public landing page for all users. Middleware only protects `/dashboard` and redirects authenticated users away from `/login` and `/signup`. New users follow **Home → Sign Up → Login → Dashboard**; returning users follow **Home → Login → Dashboard**.

## Future Improvements

- Bookmark categories and tags
- Search and filtering across bookmarks
- OAuth providers (Google, GitHub)
- Bookmark import/export

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
