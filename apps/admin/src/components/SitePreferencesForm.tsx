"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

interface Preferences {
  siteTitle: string;
  metaDescription: string;
  primaryColor: string;
  contactEmail: string;
  analyticsId?: string;
}

const colorOptions = [
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Emerald", value: "#10b981" },
  { label: "Orange", value: "#f97316" },
];

export default function SitePreferencesForm({ defaults }: { defaults: Preferences }) {
  const [values, setValues] = useState<Preferences>(defaults);
  const [status, setStatus] = useState<string | null>(null);

  const updateValue = (key: keyof Preferences) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = event.target.value;
      setValues((prev) => ({ ...prev, [key]: next }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      `Preferences saved. Deploy the marketing site to apply the ${
        colorOptions.find((option) => option.value === values.primaryColor)?.label ?? "custom"
      } theme.`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="site-title" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Site title
          </label>
          <input
            id="site-title"
            value={values.siteTitle}
            onChange={updateValue("siteTitle")}
            className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Contact email
          </label>
          <input
            id="contact-email"
            type="email"
            value={values.contactEmail}
            onChange={updateValue("contactEmail")}
            className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="meta-description" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Meta description
        </label>
        <textarea
          id="meta-description"
          value={values.metaDescription}
          onChange={updateValue("metaDescription")}
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="primary-color" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Accent color
          </label>
          <select
            id="primary-color"
            value={values.primaryColor}
            onChange={updateValue("primaryColor")}
            className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-950 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="analytics-id" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Analytics ID
          </label>
          <input
            id="analytics-id"
            value={values.analyticsId ?? ""}
            onChange={updateValue("analyticsId")}
            placeholder="G-XXXXXXXX"
            className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
        >
          Save settings
        </button>
      </div>
      {status && (
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">{status}</p>
      )}
    </form>
  );
}
