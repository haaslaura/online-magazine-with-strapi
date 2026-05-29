# Frontend – Next.js app

This folder contains the **Next.js 16** frontend for the "Online Magazine with CMS" project. It consumes content from the Strapi backend and renders the online magazine.

Online magazine: https://lappel-detre-magazine.laura-haas.dev/

For a high-level view of the whole stack, see the root README.

## Tech Stack (frontend)

- Next.js 16 with the App Router
- React
- Tailwind CSS 4 imported from the global stylesheet
- Fetching content from the Strapi backend via the public REST API

## Source of truth

The frontend design system is intentionally centralized.

- The main source of truth for visual tokens is `src/app/globals.css`.
- Colors, spacing, radii, shadows, content widths, transitions, and shared utility classes live there as CSS custom properties and global primitives.
- Global typography is wired from `src/app/layout.tsx`, which registers the display and body fonts used across the app.
- Component-level CSS modules should consume those tokens instead of reintroducing new hard-coded values unless a local exception is justified.

In practice:

- Update `src/app/globals.css` first when changing the visual language of the product.
- Update `src/app/layout.tsx` when changing global font choices or app-wide shell structure.
- Keep page and component modules aligned with those decisions rather than diverging from them locally.

## Getting started

From the project root:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Environment variables

The frontend expects a single environment variable pointing to your Strapi instance:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Examples:

```bash
# .env.local (development)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# .env.production (deployment)
NEXT_PUBLIC_STRAPI_URL=https://strapi.your-domain.com
```

This variable is used in `src/lib/strapi.ts` for API requests and in `next.config.ts` for remote image configuration.

## NPM scripts

- `npm run dev` – start the Next.js development server with hot reload.
- `npm run build` – create an optimized production build.
- `npm run start` – start the production server (after a build).

## Pages

The main routes mirror those described in the root README:

- `/` – home page, latest articles grid.
- `/articles/[slug]` – full article page.
- `/categories/[slug]` – list of articles filtered by category.

## Design system status

- A shared editorial design system is already in place for the main frontend routes.
- The current foundation is meant to evolve from `src/app/globals.css`, not from scattered per-page overrides.
- Future UI primitives should reuse the existing tokens and utility classes before introducing new patterns.