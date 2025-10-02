import MediaLibrary from "@/components/MediaLibrary";
import { readSiteContent } from "@portfolio-content/utils";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const content = await readSiteContent();

  const referencedAssets = new Set<string>();
  for (const project of content.projects.items) {
    referencedAssets.add(project.media.src);
    if (project.media.type === "video" && project.media.poster) {
      referencedAssets.add(project.media.poster);
    }
  }

  return (
    <div className="space-y-8">
      <section className="max-w-4xl rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 text-sm text-slate-300">
        <h2 className="text-base font-semibold text-white">Media management</h2>
        <p className="mt-2 leading-relaxed">
          Upload hero imagery, demo videos, and supporting assets directly through the library. Once
          merged into the repository the marketing site will automatically pick up new references.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          <li>Optimize images for web (under 500KB preferred) before staging an upload.</li>
          <li>Provide poster frames for videos so previews render cleanly on slower networks.</li>
          <li>Keep filenames semantic and kebab-cased for predictable CDN URLs.</li>
        </ul>
      </section>
      <MediaLibrary existing={[...referencedAssets].sort()} />
    </div>
  );
}
