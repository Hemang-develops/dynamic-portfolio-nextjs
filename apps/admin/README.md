# Portfolio Admin Workspace

This Next.js app provides a lightweight control panel for editing the portfolio content without touching the public-site code. It communicates with the shared content API (see [`apps/content-api`](../content-api)) which persists updates to [`content/site-content.json`](../../content/site-content.json) for both the admin and marketing site to consume.

## Running locally

```bash
npm run dev
```

The admin UI runs on [http://localhost:3001](http://localhost:3001) when started from the repository root (`npm run dev` starts the API, web, and admin workspaces).

## Features

- Update hero copy, CTAs, and quick contact links.
- Edit the about section bio, highlight bullets, and stats.
- Maintain the experience timeline entries and their bullet lists.
- Curate project case studies including media, tech stacks, and CTAs.
- Configure the animated skills marquee rows.
- Manage contact cards, form copy, and footer badges.
- Persist changes to `content/site-content.json` with schema validation.

## API

`PUT /api/content` proxies to the backend service and writes new content after validation, while `GET /api/content` exposes the current JSON snapshot for tooling through the same service.

> **Note:** The backend persists to the JSON file in the repo. When deploying to serverless hosting, replace the implementation in `apps/content-api` with a persistent datastore (e.g., PostgreSQL, Supabase, or a KV store) instead of the file system.
