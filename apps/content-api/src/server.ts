import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { readSiteContent, writeSiteContent } from "@portfolio-content/utils";
import { validateSiteContent } from "@portfolio-content/schema";

const app = new Hono();

const allowedOrigins = process.env.CONTENT_CORS_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  "*",
  cors({
    origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : "*",
    allowMethods: ["GET", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/healthz", (c) => c.json({ ok: true }));

app.get("/content", async (c) => {
  const content = await readSiteContent();
  return c.json(content);
});

app.put("/content", async (c) => {
  try {
    const payload = await c.req.json();
    const validated = validateSiteContent(payload);
    await writeSiteContent(validated);
    return c.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update site content.";
    return c.json({ error: message }, 400);
  }
});

app.onError((err, c) => {
  console.error("Unhandled content API error", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = Number.parseInt(process.env.PORT ?? "4000", 10);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Content API listening on http://localhost:${port}`);
