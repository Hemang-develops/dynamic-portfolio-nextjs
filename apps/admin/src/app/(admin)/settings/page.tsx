import SitePreferencesForm from "@/components/SitePreferencesForm";
import { fetchSiteContent } from "@/lib/content-api";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const content = await fetchSiteContent();

  const primaryEmail = content.contact.cards.find((card) => card.title.toLowerCase() === "email")?.value ?? "";

  return (
    <div className="space-y-8">
      <section className="max-w-4xl rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 text-sm text-slate-300">
        <h2 className="text-base font-semibold text-white">Global preferences</h2>
        <p className="mt-2 leading-relaxed">
          Configure metadata, analytics, and brand settings used across the portfolio. These controls
          impact both the marketing site and the admin workspace, keeping messaging aligned.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          <li>Site title feeds into the document head and open graph tags.</li>
          <li>Meta description should remain under 160 characters for search engines.</li>
          <li>Analytics IDs accept Google Analytics or Plausible values.</li>
        </ul>
      </section>
      <SitePreferencesForm
        defaults={{
          siteTitle: `${content.hero.name} · Portfolio`,
          metaDescription: content.about.bio,
          primaryColor: "#3b82f6",
          contactEmail: primaryEmail,
          analyticsId: "",
        }}
      />
    </div>
  );
}
