# Dynamic Portfolio Web App

This is the public-facing Next.js site for the dynamic portfolio. All section content is served through the shared content API (see [`apps/content-api`](../content-api)) which persists to [`content/site-content.json`](../../content/site-content.json). The admin workspace can update copy and case studies without touching code, and the web app immediately reflects those updates.

## Running locally

```bash
npm run dev
```

The site runs on [http://localhost:3000](http://localhost:3000). Use `npm run dev` from the repository root to launch the API, public site, and admin editor simultaneously.

## Contact form configuration

The `/api/contact` route sends submissions through [Resend](https://resend.com/). Configure the following environment variables for production deployments:

- `RESEND_API_KEY` – API key with access to send emails.
- `RESEND_FROM_EMAIL` – Verified sender (e.g., `Portfolio <hello@yourdomain.com>`).
- `CONTACT_TO_EMAIL` – Destination inbox for submissions (falls back to `RESEND_TO_EMAIL`).

Without these variables the API responds with an error and the UI will prompt you to configure the backend.

## Content model

The site expects the JSON content to match the schema defined in [`content/schema.ts`](../../content/schema.ts). Validation runs inside the admin API before persisting changes.
