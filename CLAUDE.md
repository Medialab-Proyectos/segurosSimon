# Simon - Vehicle Insurance Module

Mobile-first web app for managing vehicle insurance and services in Colombia. Built with Next.js App Router and shadcn/ui, targeting Spanish-speaking Colombian users.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

> Also supports `pnpm` and `yarn`.

## Architecture

- **Framework:** Next.js 16 with App Router — all feature components use `"use client"`
- **Routing:** State-based tab navigation (no URL changes); screens managed via `useState` in containers
- **State:** Local React `useState` only — no global state manager
- **Styling:** Tailwind CSS 4 utility-first + `cn()` helper (`clsx` + `tailwind-merge`)
- **Forms:** React Hook Form + Zod validation
- **UI Primitives:** shadcn/ui (New York style) on top of Radix UI

## Key Files

| Path | Role |
|------|------|
| `app/page.tsx` | Entry point — renders `<AppShell>` |
| `app/layout.tsx` | Root layout: Inter font, `lang="es"`, Vercel Analytics |
| `app/globals.css` | Design tokens, custom utilities (`hero-gradient`, `teal-gradient`, `scrollbar-hide`, `glass-card`) |
| `components/simon/app-shell.tsx` | 3-tab bottom nav (Home, Services, Profile) |
| `components/simon/screens/` | Page-level screens: `home-screen`, `services-screen`, `profile-screen` |
| `components/simon/insurance/` | All insurance flows: acquire, my-insurances, soat-purchase, quote-flow, plans, faq |
| `components/ui/` | 57 shadcn/ui primitive components |
| `lib/utils.ts` | `cn()` utility |
| `hooks/use-mobile.ts` | Mobile detection hook |
| `hooks/use-toast.ts` | Toast notification hook |

## Design System

**Brand Colors:**
- Primary green: `#00B894` — main CTAs, active states
- Secondary teal: `#006D6F` — hero gradients
- Accent blue: `#2D6CDF` — alternative actions

**Policy status colors:** Green (active) · Amber (expiring soon) · Red (expired)

**Mobile-first conventions:**
- `height: 100dvh` (dynamic viewport height)
- Safe area insets for notched devices
- `viewport: { maximumScale: 1, userScalable: false }`
- Scrollbars hidden via `.scrollbar-hide`
- Path alias: `@/*` → project root

## Data

All data is currently **hard-coded** (mock policies, plans, FAQs). No backend/API integration yet.

## Build Notes

- `ignoreBuildErrors: true` in `next.config.mjs` — TypeScript/build errors do not fail the build
- Images are unoptimized (`unoptimized: true`)
- UI language: Spanish (Colombian market)


