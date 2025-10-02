import ContentEditor from "@/components/ContentEditor";
import { readSiteContent } from "@portfolio-content/utils";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const content = await readSiteContent();

  return (
    <div className="space-y-8">
      <section className="max-w-5xl rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 text-sm text-slate-300">
        <h2 className="text-base font-semibold text-white">Content workflow</h2>
        <p className="mt-2 leading-relaxed">
          Use the editor below to update copy, links, and structured data that powers the
          marketing site. Every change writes to the shared JSON file checked into the
          repository, so publish thoughtfully and keep tone and capitalization consistent.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          <li>Draft changes, review in preview builds, then publish once approved.</li>
          <li>Links should include protocol prefixes (https://) to avoid broken navigation.</li>
          <li>
            Save frequently—updates are not persisted until you click <span className="font-medium text-white">Save changes</span>.
          </li>
        </ul>
      </section>
      <ContentEditor initialContent={content} />
    </div>
  );
}
