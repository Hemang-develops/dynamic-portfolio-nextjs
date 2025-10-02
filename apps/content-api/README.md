# Portfolio Content API

This Hono-based service provides a lightweight backend for the portfolio apps. It exposes REST endpoints for reading and updating the structured site content while handling validation through the shared schema utilities.

## Running locally

```bash
npm run dev
```

The server listens on `http://localhost:4000` by default. Configure the following environment variables as needed:

- `PORT` – Port for the HTTP server (defaults to `4000`).
- `CONTENT_CORS_ORIGINS` – Optional comma-separated list of allowed origins for CORS. When omitted, all origins are allowed (useful for local development).

## API

- `GET /content` – Returns the current site content payload.
- `PUT /content` – Validates and persists the provided site content payload.
- `GET /healthz` – Simple health probe endpoint.

The service reads and writes [`content/site-content.json`](../../content/site-content.json). Swap the persistence layer inside [`src/server.ts`](./src/server.ts) when moving to a database or external storage provider.
