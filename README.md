# TripExplorer

TripExplorer is a Next.js travel booking preview app. It includes a full local-first travel flow, admin preview tools, testing, SEO hardening, and code-prep for a future Turso database + Zeabur deployment.

## Features

- Charcoal + Lime responsive UI with dark mode
- Search page with destination filters and sorting
- Destination detail pages with gallery, reviews, favorites, and booking CTA
- Booking quote builder with add-ons and checkout preview
- Local dashboard for bookings, favorites, reviews, and booking status
- Local booking cancellation/restoration preview
- Verified local reviews tied to mock booking confirmations
- Public admin preview routes for destinations, deals, bookings, newsletter, and data backup
- Local auth simulation with User/Admin roles and guard notices
- Local data export/import/reset manager
- SEO foundation with metadata, Open Graph, Twitter cards, sitemap, robots, and JSON-LD
- App-level loading, error, and not-found states
- Security headers in Next config
- Vitest coverage for core helpers and repository contracts
- DB-ready repository interfaces with localStorage and Turso skeleton implementations
- Turso/Drizzle schema and Zeabur deployment config prepared, but not connected yet

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Sonner
- Vitest
- Drizzle ORM
- Turso/libSQL client
- Zeabur config

## Local Development

```bash
npm install
npm run dev
```

Open the URL shown by Next.js, usually:

```txt
http://localhost:3000
```

If port 3000 is busy, Next.js may start on another port such as 3001.

## Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Next.js lint
npm run typecheck     # TypeScript check
npm test              # Run Vitest tests
npm run test:watch    # Run Vitest in watch mode
npm run format        # Format files with Prettier
npm run format:check  # Check formatting
npm run db:generate   # Generate Drizzle migrations when DB setup is ready
npm run db:push       # Push Drizzle schema when DB setup is ready
```

## Main Routes

- `/` — landing page
- `/search` — destination search
- `/destinations/[slug]` — destination detail
- `/book/[slug]` — quote builder
- `/checkout` — checkout preview
- `/dashboard` — local traveler dashboard
- `/dashboard/bookings/[confirmationNumber]` — booking detail
- `/admin` — admin overview
- `/admin/destinations` — local destination CRUD
- `/admin/deals` — local deals CRUD
- `/admin/bookings` — mock bookings view
- `/admin/newsletter` — newsletter subscriber view
- `/admin/data` — local data export/import/reset

## Local Preview Data

Most app state is currently browser-local via localStorage. This is intentional until the real database phase.

Local preview data includes:

- auth simulation session
- booking quote
- confirmed/cancelled mock bookings
- favorite destinations
- reviews
- newsletter subscribers
- admin destination/deal overrides

Use `/admin/data` to export, import, or reset local preview data.

## Auth Status

The app currently uses local auth simulation only:

- Demo User
- Demo Admin
- role switcher
- sign out

This is not real security. Real auth provider setup is planned for a later phase.

## Database Preparation

The project is prepared for Turso/libSQL with Drizzle, but the live database is not connected yet.

Prepared files:

- `src/db/schema.ts` — Drizzle schema draft
- `src/db/client.ts` — Turso client factory
- `drizzle.config.ts` — Drizzle Kit config
- `src/lib/repositories/types.ts` — repository interfaces
- `src/lib/repositories/local.ts` — active localStorage implementation
- `src/lib/repositories/turso.ts` — Turso repository skeleton

Required environment variables for the real Turso phase:

```env
DATABASE_URL="libsql://your-database-name.turso.io"
TURSO_AUTH_TOKEN="your-turso-auth-token"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

See `.env.example` for placeholders.

## Deployment Preparation

The project includes `zeabur.json` for a future Zeabur deployment.

Current deployment prep is code-only:

- no cloud project was created
- no credentials were added
- no database migrations were pushed
- no deployment was triggered

When ready, configure environment variables in Zeabur and deploy from Git.

## Validation

Before pushing or deploying, run:

```bash
npm test
npm run lint
npm run typecheck
npm run format:check
npm run build
```

## Current Status

The app is production-buildable and local-first. The next major phase is real Turso setup, Drizzle migration execution, and gradual repository switching from localStorage to database-backed reads/writes.
