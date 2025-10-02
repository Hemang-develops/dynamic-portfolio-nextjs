import { readSiteContent } from "@portfolio-content/utils";
import ContentEditor from "@/components/ContentEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await readSiteContent();

  return (
    <main className="min-h-screen bg-slate-950">
      <ContentEditor initialContent={content} />
    </main>
  );
}
