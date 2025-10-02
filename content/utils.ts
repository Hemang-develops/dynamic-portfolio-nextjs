import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { SiteContent, validateSiteContent } from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "site-content.json");

export async function readSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return validateSiteContent(JSON.parse(raw));
}

export async function writeSiteContent(data: SiteContent): Promise<void> {
  const validated = validateSiteContent(data);
  await fs.writeFile(DATA_PATH, JSON.stringify(validated, null, 2) + "\n", "utf-8");
}

export { DATA_PATH as siteContentPath };
