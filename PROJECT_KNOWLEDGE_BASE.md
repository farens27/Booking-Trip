# 📦 TripExplorer — Project Knowledge Base & Audit Export

> A complete, self-contained snapshot of the project as analyzed on **2026-06-15**.
> Companion to `REWORK_ACTION_PLAN.md`. This file captures **everything gathered** during the codebase review so you have a single reference.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Decisions Locked](#2-decisions-locked)
3. [Full File Inventory](#3-full-file-inventory)
4. [Current Tech Stack (as-is)](#4-current-tech-stack-as-is)
5. [Configuration Files](#5-configuration-files)
6. [Current Color System](#6-current-color-system)
7. [Mock Data Inventory](#7-mock-data-inventory)
8. [Type Definitions](#8-type-definitions)
9. [Component Map](#9-component-map)
10. [Detailed Audit Findings](#10-detailed-audit-findings)
11. [Target Design System — Midnight + Aqua](#11-target-design-system--midnight--aqua)
12. [Recommended Stack (quick reference)](#12-recommended-stack-quick-reference)
13. [Open Questions](#13-open-questions)
14. [Glossary / Links](#14-glossary--links)

---

## 1. Project Identity

| Field                 | Value                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **Display name**      | TripExplorer                                                                                        |
| **package.json name** | `trip-landing-page`                                                                                 |
| **Type**              | Travel booking landing page (single route)                                                          |
| **Repo**              | `github.com/farens27/Booking-Trip`                                                                  |
| **Framework**         | Next.js 14.2.3 (App Router)                                                                         |
| **Current branch**    | `main`                                                                                              |
| **⚠️ Stray file**     | `Mini_Project_Specification_Employee_Leave_System.md` — unrelated leftover spec, recommend deleting |

---

## 2. Decisions Locked

These were confirmed during planning and drive the rework:

| Decision           | Choice                                                               |
| ------------------ | -------------------------------------------------------------------- |
| **Scope**          | Full booking platform (enterprise / production grade)                |
| **Palette**        | "Midnight + Aqua" (sky `#0EA5E9` + navy `#0F172A` + amber `#F59E0B`) |
| **Stack strategy** | Best-fit per layer, with rationale & trade-offs                      |

---

## 3. Full File Inventory

```
Booking-Trip/
├── .gitignore
├── .next/                          ⚠️ build output (should be git-ignored, not tracked)
├── Mini_Project_Specification_Employee_Leave_System.md   ⚠️ unrelated, delete
├── README.md
├── REWORK_ACTION_PLAN.md           ← the action plan
├── PROJECT_KNOWLEDGE_BASE.md       ← this file
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/
    │   ├── globals.css             # theme tokens + gradient utilities
    │   ├── layout.tsx              # root layout: Navbar + children + Footer
    │   └── page.tsx                # landing page (5 sections)
    ├── components/
    │   ├── ui/                     # hand-rolled shadcn-style primitives
    │   │   ├── button.tsx          # CVA variants
    │   │   ├── card.tsx
    │   │   ├── input.tsx
    │   │   └── label.tsx
    │   ├── layout/
    │   │   ├── Navbar.tsx          # fixed nav + mobile hamburger
    │   │   └── Footer.tsx          # links + socials + contact
    │   ├── hero/
    │   │   └── HeroSection.tsx     # search form (→ console.log)
    │   ├── destinations/
    │   │   ├── DestinationsSection.tsx
    │   │   └── DestinationCard.tsx
    │   ├── promotions/
    │   │   ├── PromotionsSection.tsx
    │   │   └── DealCard.tsx        # countdown via useEffect
    │   ├── testimonials/
    │   │   ├── TestimonialsSection.tsx
    │   │   └── TestimonialCard.tsx
    │   └── newsletter/
    │       └── NewsletterSection.tsx  # email form (→ console.log)
    ├── lib/
    │   ├── data.ts                 # mock destinations, deals, testimonials
    │   └── utils.ts                # cn() helper (clsx + tailwind-merge)
    └── types/
        └── index.ts               # Destination, Deal, Testimonial, SearchParams
```

**Counts:** 1 route · 13 components (4 UI + 9 feature) · 2 lib files · 1 types file.

---

## 4. Current Tech Stack (as-is)

### Dependencies

| Package                  | Version  | Role                 |
| ------------------------ | -------- | -------------------- |
| next                     | 14.2.3   | Framework            |
| react / react-dom        | ^18.3.1  | UI runtime           |
| framer-motion            | ^11.0.0  | Animations           |
| lucide-react             | ^0.378.0 | Icons                |
| class-variance-authority | ^0.7.0   | Variant styling      |
| clsx                     | ^2.1.0   | Conditional classes  |
| tailwind-merge           | ^2.2.0   | Class de-duplication |
| autoprefixer             | ^10.5.0  | CSS prefixing        |

### Dev dependencies

| Package                                     | Version         |
| ------------------------------------------- | --------------- |
| typescript                                  | ^5              |
| tailwindcss                                 | ^3.4.1          |
| postcss                                     | ^8              |
| eslint + eslint-config-next                 | ^8 / 14.2.3     |
| @types/node, @types/react, @types/react-dom | ^20 / ^18 / ^18 |

### Scripts

```json
"dev":   "next dev"
"build": "next build"
"start": "next start"
"lint":  "next lint"
```

> ❌ Not present: Prettier, test runner, CI, env validation, commit hooks, real UI library, state/data libraries, auth, DB/ORM, payments.

---

## 5. Configuration Files

### `next.config.mjs`

```js
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
```

> Remote images allowed from Unsplash only — but components use `<img>`, so this isn't actually exercised yet.

### `tailwind.config.ts` (key points)

- `darkMode: ["class"]` (dark mode wired in config, but **no toggle in UI**)
- Content globs: `src/pages`, `src/components`, `src/app`
- Colors mapped to CSS vars (`hsl(var(--*))`) + a literal `teal` scale (50–900) that is **unused**
- `borderRadius` derived from `--radius`
- No plugins

### `tsconfig.json`

- Path alias `@/*` → `src/*` (used throughout imports)

---

## 6. Current Color System

Defined in `src/app/globals.css` as HSL CSS variables.

### Light mode (`:root`)

| Token           | HSL            | Approx hex | Meaning       |
| --------------- | -------------- | ---------- | ------------- |
| `--primary`     | `142 71% 45%`  | `#22c55e`  | Green         |
| `--accent`      | `160 84% 39%`  | `#10b981`  | Emerald       |
| `--background`  | `0 0% 100%`    | `#ffffff`  | White         |
| `--foreground`  | `222 84% 4.9%` | near-black | Text          |
| `--destructive` | `0 84% 60%`    | red        | Errors        |
| `--radius`      | `0.75rem`      | —          | Corner radius |

### Dark mode (`.dark`)

Defined (navy backgrounds, same green primary) — **but never activated** because there's no theme toggle.

### Custom utilities

```css
.gradient-sunset       { linear-gradient(135deg, #22c55e 0%, #10b981 100%); }
.gradient-sunset-hover { linear-gradient(135deg, #16a34a 0%, #059669 100%); }
```

> ⚠️ **Misnamed:** called "sunset" but it's a green→emerald gradient. Used on every primary button, logo, navbar CTA, and newsletter section.

---

## 7. Mock Data Inventory

All hard-coded in `src/lib/data.ts`. Images are Unsplash URLs.

### Destinations (6)

| ID  | Name      | Country   | Price  | Rating | Reviews |
| --- | --------- | --------- | ------ | ------ | ------- |
| 1   | Bali      | Indonesia | $899   | 4.9    | 2,847   |
| 2   | Santorini | Greece    | $1,299 | 4.8    | 3,156   |
| 3   | Tokyo     | Japan     | $1,499 | 4.9    | 4,521   |
| 4   | Maldives  | Maldives  | $2,499 | 4.9    | 1,893   |
| 5   | Paris     | France    | $1,099 | 4.7    | 5,678   |
| 6   | Dubai     | UAE       | $1,399 | 4.8    | 3,421   |

### Deals (4)

| ID  | Destination | Country   | Orig   | Now    | Discount | Ends       |
| --- | ----------- | --------- | ------ | ------ | -------- | ---------- |
| 1   | Phuket      | Thailand  | $1,299 | $899   | 30%      | 2026-06-30 |
| 2   | Barcelona   | Spain     | $1,499 | $999   | 33%      | 2026-07-15 |
| 3   | Cancun      | Mexico    | $1,799 | $1,199 | 35%      | 2026-06-25 |
| 4   | Sydney      | Australia | $2,299 | $1,699 | 25%      | 2026-07-20 |

### Testimonials (4)

| Name           | Location        | Rating | Trip              |
| -------------- | --------------- | ------ | ----------------- |
| Sarah Johnson  | New York, USA   | 5      | Bali, Indonesia   |
| Michael Chen   | Toronto, Canada | 5      | Tokyo, Japan      |
| Emma Williams  | London, UK      | 5      | Santorini, Greece |
| David Martinez | Miami, USA      | 4      | Maldives          |

> This is the seed data to migrate into the database in Phase 2.

---

## 8. Type Definitions

From `src/types/index.ts`:

```ts
interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description?: string;
}

interface Deal {
  id: string;
  destination: string;
  country: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  endDate: string;
  image: string;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tripDestination: string;
}

interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
```

---

## 9. Component Map

| Component             | Client? | Purpose                            | Notable behavior                         |
| --------------------- | ------- | ---------------------------------- | ---------------------------------------- |
| `layout.tsx`          | Server  | Root shell, Inter font, metadata   | Wraps Navbar + Footer                    |
| `page.tsx`            | Server  | Landing, composes 5 sections       | —                                        |
| `Navbar`              | Client  | Fixed top nav                      | Mobile hamburger (no focus trap)         |
| `Footer`              | Server  | Links, socials, contact            | `new Date().getFullYear()`               |
| `HeroSection`         | Client  | Hero + search form                 | `handleSubmit` → `console.log` ❌        |
| `DestinationsSection` | Client  | Grid of destinations               | Stagger animation                        |
| `DestinationCard`     | Client  | Single destination                 | `<img>` (not next/image), hover zoom     |
| `PromotionsSection`   | Client  | Grid of deals                      | —                                        |
| `DealCard`            | Client  | Single deal                        | Countdown via `useEffect` + `Date.now()` |
| `TestimonialsSection` | Client  | Grid of reviews                    | —                                        |
| `TestimonialCard`     | Client  | Single review                      | `<img>` avatar                           |
| `NewsletterSection`   | Client  | Email signup                       | `handleSubmit` → `console.log` ❌        |
| `ui/button`           | —       | CVA variants (6 variants, 4 sizes) | forwardRef                               |
| `ui/card,input,label` | —       | Primitives                         | Hand-rolled                              |

---

## 10. Detailed Audit Findings

| #   | Severity | Area          | Finding                                                                               | Fix (phase) |
| --- | -------- | ------------- | ------------------------------------------------------------------------------------- | ----------- |
| 1   | 🔴 High  | Functionality | Search & newsletter forms only `console.log`                                          | P3 / P6     |
| 2   | 🔴 High  | Architecture  | No backend/DB; 100% static mock data                                                  | P2          |
| 3   | 🔴 High  | Auth          | No accounts/authentication                                                            | P4          |
| 4   | 🟠 Med   | Performance   | `<img>` instead of `next/image`                                                       | P1          |
| 5   | 🟠 Med   | Performance   | Static sections needlessly `"use client"`                                             | P2          |
| 6   | 🟠 Med   | A11y          | No focus trap, missing aria, no skip-link, unaudited contrast                         | P1          |
| 7   | 🟠 Med   | UX            | No loading/empty/error states, no toasts, no validation feedback                      | P1          |
| 8   | 🟠 Med   | SEO           | Minimal metadata, no OG/sitemap/robots/structured data                                | P3          |
| 9   | 🟡 Low   | DX            | No Prettier/tests/CI/env-validation/hooks                                             | P0          |
| 10  | 🟡 Low   | Hygiene       | `.next/` tracked; stray Employee Leave spec                                           | P0          |
| 11  | 🟡 Low   | Design        | Single fixed theme; dark vars unused; `gradient-sunset` misnamed; unused `teal` scale | P1          |

---

## 11. Target Design System — Midnight + Aqua

### Core tokens

| Role                  | Light     | Dark      |
| --------------------- | --------- | --------- |
| Primary (aqua)        | `#0EA5E9` | `#38BDF8` |
| Ink / text            | `#0F172A` | `#E2E8F0` |
| Accent (amber, deals) | `#F59E0B` | `#FBBF24` |
| Success (emerald)     | `#10B981` | `#34D399` |
| Destructive           | `#EF4444` | `#F87171` |
| Background            | `#FFFFFF` | `#0B1220` |
| Surface / card        | `#F8FAFC` | `#0F172A` |
| Border                | `#E2E8F0` | `#1E293B` |
| Muted text            | `#64748B` | `#94A3B8` |

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
--gradient-hero: linear-gradient(
  180deg,
  rgba(15, 23, 42, 0.7),
  rgba(15, 23, 42, 0.25)
);
--gradient-deal: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
--glow-primary: 0 0 40px rgba(14, 165, 233, 0.35);
```

### Other tokens

- **Fonts:** Inter (body) + Sora/Clash Display (headings)
- **Radius:** `0.75rem` cards, pill badges
- **Motion:** 150 / 300 / 500ms; honor `prefers-reduced-motion`
- **Dark mode:** `next-themes` toggle (system/light/dark)
- **A11y target:** WCAG 2.1 AA

---

## 12. Recommended Stack (quick reference)

| Layer              | Recommended                                                           | Alternative            |
| ------------------ | --------------------------------------------------------------------- | ---------------------- |
| Framework          | Next.js 15 + React 19                                                 | Next 14 (stability)    |
| UI                 | shadcn/ui + Radix + Tailwind v4                                       | Tailwind v3.4          |
| Animation          | Framer Motion 11                                                      | —                      |
| API                | tRPC + Server Actions                                                 | REST + OpenAPI         |
| ORM                | Drizzle                                                               | Prisma                 |
| DB                 | PostgreSQL (Neon)                                                     | Supabase / PlanetScale |
| Cache / rate-limit | Upstash Redis                                                         | —                      |
| Validation         | Zod                                                                   | —                      |
| Server state       | TanStack Query                                                        | SWR                    |
| Client state       | Zustand                                                               | Jotai                  |
| Forms              | React Hook Form + Zod                                                 | —                      |
| Auth               | Clerk _or_ Auth.js v5                                                 | —                      |
| Payments           | Stripe                                                                | —                      |
| Email              | Resend + React Email                                                  | —                      |
| Hosting            | Vercel + Neon                                                         | —                      |
| Monitoring         | Sentry + PostHog                                                      | Vercel Analytics       |
| Testing            | Vitest + Testing Library + Playwright                                 | —                      |
| Tooling            | ESLint + Prettier + Husky + lint-staged + commitlint + GitHub Actions | —                      |
| Env safety         | @t3-oss/env-nextjs                                                    | —                      |

---

## 13. Open Questions

These need your input before/within early phases:

1. **Auth provider:** Clerk (fastest, prebuilt UI) vs Auth.js v5 (no vendor lock-in)?
2. **Database host:** Neon vs Supabase?
3. **Next.js upgrade:** Move to Next 15 / React 19 now, or modernize on 14 first?
4. **Currency/i18n:** English/USD only at launch, or multi-currency from the start?
5. **Inventory model:** Simple date-based availability, or real inventory/rooms logic?

---

## 14. Glossary / Links

| Tool                 | URL                                      |
| -------------------- | ---------------------------------------- |
| Next.js              | https://nextjs.org                       |
| shadcn/ui            | https://ui.shadcn.com                    |
| Radix UI             | https://www.radix-ui.com                 |
| Tailwind CSS         | https://tailwindcss.com                  |
| Drizzle ORM          | https://orm.drizzle.team                 |
| tRPC                 | https://trpc.io                          |
| TanStack Query       | https://tanstack.com/query               |
| Zustand              | https://zustand-demo.pmnd.rs             |
| Zod                  | https://zod.dev                          |
| Clerk                | https://clerk.com                        |
| Auth.js              | https://authjs.dev                       |
| Stripe               | https://stripe.com/docs                  |
| Resend / React Email | https://resend.com · https://react.email |
| Neon                 | https://neon.tech                        |
| Upstash              | https://upstash.com                      |
| Sentry               | https://sentry.io                        |
| Playwright           | https://playwright.dev                   |
| Vitest               | https://vitest.dev                       |

---

_Generated from a full read of the codebase on 2026-06-15. Pair this with `REWORK_ACTION_PLAN.md` for the phased execution roadmap._
