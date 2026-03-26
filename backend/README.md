# Backend – Strapi CMS

This folder contains the **Strapi** backend for the "Online Magazine with CMS" project. It powers the content API consumed by the Next.js frontend.

Online magazine: https://lappel-detre-magazine.laura-haas.dev/

For an overview of the whole project, see the root README.

## Tech Stack (backend)

- Strapi (Node.js headless CMS)
- SQLite for local development (default)
- PostgreSQL in Docker (to be installed for production)
- Deployed on a VPS, with the Strapi admin panel accessible only via IP whitelist

## Requirements

- Node.js 20+
- npm 6+

## Local setup

From the project root:

```bash
cd backend
cp .env.example .env  # fill in secrets (or use existing .env.development)
npm install
npm run develop
```

The Strapi admin panel is available at **http://localhost:1337/admin**.

On first run:

1. Create an admin account from the `/admin` interface.
2. Go to **Settings → Users & Permissions → Roles → Public** and enable `find` and `findOne` for `Article`, `Category`, and `Author`.
3. Optionally create API tokens in **Settings → API Tokens** if you want authenticated access.

## NPM scripts

- `npm run develop` – start Strapi in development mode with autoReload.
- `npm run start` – start Strapi in production mode (requires a prior build and proper env vars).
- `npm run build` – build the Strapi admin panel for production.

## Configuration notes

- Database configuration is defined in `config/database.ts`.
- By default, the `sqlite` client is used with a `.tmp/data.db` file for local development.
- For production, the goal is to switch to **PostgreSQL in Docker** by setting the `DATABASE_*` env variables.
- Environment-specific server settings (host, port, app keys) live in `config/env/*/server.ts` and the corresponding `.env.*` files.

## Deployment

In production, this Strapi instance runs on a VPS. Deployment is handled outside this repository (process manager, reverse proxy, etc.).

Key points:

- Use `.env.production` to configure `HOST`, `PORT`, `APP_KEYS`, JWT secrets, and database credentials.
- Expose only the public API and protect `/admin` with an IP whitelist (already enforced at the VPS / proxy level).

Refer to the official documentation for more advanced topics:

- Strapi docs: https://docs.strapi.io
- Deployment: https://docs.strapi.io/dev-docs/deployment