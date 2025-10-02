import type { SiteContent } from "@portfolio-content/schema";

function normalizeBaseUrl(value: string | undefined) {
  if (!value || value.trim() === "") {
    return undefined;
  }
  return value.replace(/\/$/, "");
}

function resolveContentApiBaseUrl() {
  const baseUrl =
    normalizeBaseUrl(process.env.CONTENT_API_URL) ??
    normalizeBaseUrl(process.env.NEXT_PUBLIC_CONTENT_API_URL) ??
    "http://localhost:4000";
  return baseUrl;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const baseUrl = resolveContentApiBaseUrl();
  const res = await fetch(`${baseUrl}/content`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load site content (${res.status})`);
  }

  return (await res.json()) as SiteContent;
}

export async function updateSiteContent(payload: SiteContent) {
  const baseUrl = resolveContentApiBaseUrl();
  const res = await fetch(`${baseUrl}/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Failed to update site content (${res.status})`);
  }

  return (await res.json().catch(() => ({}))) as { ok?: boolean };
}
