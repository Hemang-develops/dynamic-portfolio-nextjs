import type { SiteContent } from "@portfolio-content/schema";

function normalizeBaseUrl(value: string | undefined) {
  if (!value || value.trim() === "") {
    return undefined;
  }
  return value.replace(/\/$/, "");
}

const CONTENT_API_BASE =
  normalizeBaseUrl(process.env.CONTENT_API_URL) ??
  normalizeBaseUrl(process.env.NEXT_PUBLIC_CONTENT_API_URL) ??
  "http://localhost:4000";

export async function getSiteContent(): Promise<SiteContent> {
  const res = await fetch(`${CONTENT_API_BASE}/content`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load site content (${res.status})`);
  }

  return (await res.json()) as SiteContent;
}
