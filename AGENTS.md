# AGENTS.md

## Project Overview

Okultis company marketing website — a single-page-style React SPA with multiple routes.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript type-check + Vite production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

## Tech Stack

- React 19 + TypeScript (~5.9)
- Vite 7 with `@vitejs/plugin-react`
- Tailwind CSS 4 via `@tailwindcss/vite` plugin
- Framer Motion for animations
- React Router 7 (BrowserRouter, client-side routing)
- React Helmet Async for SEO meta tags
- Lucide React for icons
- `clsx` + `tailwind-merge` via `cn()` utility in `src/lib/utils.ts`

## Architecture

- **Path alias**: `@` maps to `src/` (configured in `vite.config.ts`)
- **Layout**: Single `<Layout />` wrapper in `src/components/layout/Layout.tsx` with `<Outlet />`
- **Pages**: `src/pages/` — HomePage, ContactPage, PrivacyPolicyPage, TermsPage, NotFoundPage
- **Sections**: `src/components/sections/` — homepage is composed of Hero, About, Services, Clients, ContactForm sections
- **Data files**: `src/data/services.tsx` (service offerings), `src/data/clients.ts` (client logos)
- **Custom hooks**: `useScrollSpy`, `useScrollFadeIn`, `useCookieConsent` in `src/hooks/`
- **Analytics**: `src/lib/analytics.ts`
- **Static assets**: `src/assets/` for bundled assets, `assets/` at root for public assets (logos, client images in webp/png/svg)

## Code Style

- Functional components with default exports
- No semicolons (Vite template default)
- Single quotes for strings
- Tailwind utility classes for styling (no CSS modules)
- Framer Motion for scroll/transition animations
- TypeScript interfaces (not types) for data shapes
