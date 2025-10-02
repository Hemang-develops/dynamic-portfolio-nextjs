import { NextRequest, NextResponse } from "next/server";

import { readSiteContent, writeSiteContent } from "@portfolio-content/utils";
import { validateSiteContent } from "@portfolio-content/schema";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = validateSiteContent(body);
    await writeSiteContent(validated);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update site content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
