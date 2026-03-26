# Online Magazine with CMS

An online magazine powered by **Strapi** (headless CMS backend) and **Next.js 16** with the App Router (frontend). The project is based on an existing magazine, as part of a learning programme for Next and Strapi. Online version : https://lappel-detre-magazine.laura-haas.dev/

## Tech Stack

- Strapi (headless CMS)
- Next.js 16 (App Router)
- Tailwind CSS (to be installed)
- PostgreSQL in Docker (to be installed)
- Currently hosted on a VPS lovingly configured by hand & Strapi admin panel accessible only via IP whitelist

## Project Structure

```
online-magazine-with-cms/
├── backend/   # Strapi headless CMS (Node.js)
└── frontend/  # Next.js 16 with App Router (React)
```

## Content Types

The Strapi backend defines three content types:

| Type       | Fields                                                        |
|------------|---------------------------------------------------------------|
| **Article**  | title, slug, excerpt, content (rich text), cover (image), author, category, publishedAt |
| **Category** | name, slug, description                                       |
| **Author**   | name, bio, avatar (image)                                     |

## Prerequisites

- Node.js 20+
- npm 6+

## Setup

### 1. Backend (Strapi)

```bash
cd backend
cp .env.example .env  # fill in secrets
npm install
npm run develop
```

The Strapi admin panel will be available at **http://localhost:1337/admin**.

On first run, create an admin account and then:

1. Go to **Settings → API Tokens** and create a read-only token (optional, for authenticated requests).
2. Go to **Settings → Users & Permissions → Roles → Public** and enable `find` and `findOne` for `Article`, `Category`, and `Author` so the frontend can read content.
3. Create some categories, authors, and articles from the **Content Manager**.

### 2. Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
# Set NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 (default)
npm install
npm run dev
```

The magazine frontend will be available at **http://localhost:3000**.

## Pages

| Route                          | Description                     |
|--------------------------------|---------------------------------|
| `/`                            | Home – latest articles grid     |
| `/articles/[slug]`             | Full article detail page        |
| `/categories/[slug]`           | Articles filtered by category   |

## Development

Run both services simultaneously (in separate terminals):

```bash
# Terminal 1 – Strapi
cd backend && npm run develop

# Terminal 2 – Next.js
cd frontend && npm run dev
```

## 🔮 Incoming :

- Installing and configuring Tailwind CSS
- Configuring PostgreSQL (Docker) for Strapi
- Adding styling to the frontend
- Adding editorial content via Strapi

## 📬 Contact

This projet is for training and it's a work in progress 🚀
Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/laurahaas-developpement/) if you have any questions or feedback!