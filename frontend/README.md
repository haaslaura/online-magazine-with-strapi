# Frontend – Next.js app

This folder contains the **Next.js 16** frontend for the "Online Magazine with CMS" project. It consumes content from the Strapi backend and renders the online magazine.

Online magazine: https://lappel-detre-magazine.laura-haas.dev/

For a high-level view of the whole stack, see the root README.

## Tech Stack (frontend)

- Next.js 16 with the App Router
- React
- Tailwind CSS (to be installed)
- Fetching content from the Strapi backend via the public REST API

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

## 🔮 Incoming (frontend)

- Installing and configuring Tailwind CSS.
- Applying a custom design system to the magazine pages.
- Iterating on layout and typography once more content is available from Strapi.