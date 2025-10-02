import Link from "next/link";
import { ADMIN_NAV_ITEMS } from "@/config/navigation";
import { fetchSiteContent } from "@/lib/content-api";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const content = await fetchSiteContent();

  const totalProjects = content.projects.items.length;
  const totalExperiences = content.experience.items.length;
  const totalSkills = content.skills.rows.reduce((count, row) => count + row.skills.length, 0);
  const primaryCta = content.hero.primaryCta;
  const secondaryCta = content.hero.secondaryCta;

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardMetric title="Projects" value={totalProjects} helper="Live on portfolio" />
        <DashboardMetric title="Experience roles" value={totalExperiences} helper="Shown on resume" />
        <DashboardMetric title="Skills tracked" value={totalSkills} helper="Across all categories" />
        <DashboardMetric
          title="Contact cards"
          value={content.contact.cards.length}
          helper="Displayed to visitors"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 lg:col-span-2">
          <header>
            <h2 className="text-lg font-semibold text-white">Content status</h2>
            <p className="text-sm text-slate-400">Key highlights from the current published copy.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
              <h3 className="text-sm font-semibold text-white">Hero headline</h3>
              <p className="mt-1 text-sm text-slate-300">{content.hero.tagline}</p>
              <div className="mt-4 space-y-2 text-xs text-slate-400">
                <div>
                  Primary CTA: <span className="font-medium text-slate-200">{primaryCta.label}</span> → {primaryCta.href}
                </div>
                <div>
                  Secondary CTA: <span className="font-medium text-slate-200">{secondaryCta.label}</span> → {secondaryCta.href}
                </div>
              </div>
            </article>
            <article className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
              <h3 className="text-sm font-semibold text-white">Featured project</h3>
              <p className="mt-1 text-sm text-slate-300">{content.projects.items[0]?.title ?? "No project"}</p>
              <p className="mt-2 text-xs text-slate-400">
                Update the ordering in the Content section to control which project is highlighted on the
                marketing site.
              </p>
            </article>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4 text-xs text-slate-400">
            Remember to keep job descriptions concise—aim for two sentences that capture impact and key metrics.
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <ul className="space-y-3 text-sm">
            {ADMIN_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col rounded-xl border border-slate-800/60 bg-slate-950/70 px-4 py-3 transition hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  <span className="font-medium text-white">{item.label}</span>
                  <span className="text-xs text-slate-400">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Experience timeline</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-300">
            {content.experience.items.map((item) => (
              <li key={`${item.company}-${item.role}`} className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{item.company}</span>
                  <span>{item.period}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-white">{item.role}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-400">
                  {item.points.slice(0, 2).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">Contact channels</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {content.contact.cards.map((card) => (
              <li key={card.title} className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{card.title}</div>
                <div className="mt-1 font-medium text-white">{card.value}</div>
                <div className="mt-2 text-xs text-slate-500">{card.href}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function DashboardMetric({
  title,
  value,
  helper,
}: {
  title: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{helper}</p>
    </div>
  );
}
