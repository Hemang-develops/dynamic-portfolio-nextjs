import { NextRequest, NextResponse } from "next/server";

import { fetchSiteContent, updateSiteContent } from "@/lib/content-api";

export async function GET() {
  try {
    const content = await fetchSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load site content.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Parameters<typeof updateSiteContent>[0];
    const result = await updateSiteContent(body);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update site content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
