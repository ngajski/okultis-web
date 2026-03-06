# Okultis — Company Website

Marketing website for **Okultis**, a software consultancy specializing in AI systems, software engineering, product design, and cloud platform engineering.

Live at [okultis.com](https://okultis.com)

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** (dev server & build)
- **Tailwind CSS 4** (styling)
- **Framer Motion** (animations)
- **React Router 7** (client-side routing)
- **React Helmet Async** (SEO / meta tags)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev        # Start dev server
npm run build      # Type-check + production build
npm run preview    # Preview production build
npm run lint       # ESLint
```

## Project Structure

```
src/
├── pages/              # Route-level pages (Home, Contact, Privacy, Terms, 404)
├── components/
│   ├── layout/         # Layout, Header, Footer
│   ├── sections/       # Homepage sections (Hero, About, Services, Clients, Contact)
│   └── ui/             # Reusable UI components & animations
├── data/               # Static data (services, clients)
├── hooks/              # Custom hooks (useScrollSpy, useScrollFadeIn, useCookieConsent)
├── lib/                # Utilities (analytics, cn helper)
└── assets/             # Images and static assets
```

## Routes

| Path              | Page             |
| ----------------- | ---------------- |
| `/`               | Homepage         |
| `/contact`        | Contact form     |
| `/privacy-policy` | Privacy policy   |
| `/terms`          | Terms of service |
| `*`               | 404              |
