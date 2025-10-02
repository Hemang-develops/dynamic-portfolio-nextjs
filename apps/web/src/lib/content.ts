import { readSiteContent } from "@portfolio-content/utils";
import type { SiteContent } from "@portfolio-content/schema";

export async function getSiteContent(): Promise<SiteContent> {
  return readSiteContent();
}
