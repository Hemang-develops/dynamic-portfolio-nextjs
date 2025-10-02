# Portfolio Admin Workspace

This Next.js app provides a lightweight control panel for editing the portfolio content without touching the public-site code. It reads and writes the shared [`content/site-content.json`](../../content/site-content.json) file that both the admin and marketing site consume.

## Running locally

```bash
npm run dev
```

The admin UI runs on [http://localhost:3001](http://localhost:3001) when started from the repository root (`npm run dev` starts both the web and admin workspaces).

## Features

- Update hero copy, CTAs, and quick contact links.
- Edit the about section bio, highlight bullets, and stats.
- Maintain the experience timeline entries and their bullet lists.
- Curate project case studies including media, tech stacks, and CTAs.
- Configure the animated skills marquee rows.
- Manage contact cards, form copy, and footer badges.
- Persist changes to `content/site-content.json` with schema validation.

## API

`PUT /api/content` validates and writes new content to disk, while `GET /api/content` exposes the current JSON snapshot for tooling.

> **Note:** The admin writes directly to the JSON file in the repo. When deploying to serverless hosting, point `writeSiteContent` to a persistent datastore (e.g., PostgreSQL, Supabase, or a KV store) instead of the file system.
