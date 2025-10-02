"use client";

import { useState } from "react";
import type {
  ContactCard,
  ExperienceContent,
  ExperienceItem,
  HeroIcon,
  ProjectItem,
  SiteContent,
  SkillRow,
} from "@portfolio-content/schema";
import { HERO_ICON_OPTIONS } from "@portfolio-content/schema";

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const textareaClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const sectionCardClass =
  "rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-slate-950/30";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-400";

const heroIconOptions: HeroIcon[] = [...HERO_ICON_OPTIONS];

const SECTION_KEYS = ["hero", "about", "experience", "projects", "skills", "contact"] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

const SECTION_META: Record<SectionKey, { title: string; description: string }> = {
  hero: {
    title: "Hero",
    description: "Control the hero headline, call-to-actions, and quick contact links.",
  },
  about: {
    title: "About",
    description: "Update the biography and highlight statistics powering the about section.",
  },
  experience: {
    title: "Experience",
    description: "Maintain the experience timeline items, including bullet highlights.",
  },
  projects: {
    title: "Projects",
    description: "Manage the featured case studies, tech stacks, media, and CTAs.",
  },
  skills: {
    title: "Skills",
    description: "Curate the marquee of highlighted skill rows and animation timings.",
  },
  contact: {
    title: "Contact",
    description: "Tune the contact form copy, contact cards, and footer badges.",
  },
};

const createDirtyState = () =>
  SECTION_KEYS.reduce(
    (acc, key) => {
      acc[key] = false;
      return acc;
    },
    {} as Record<SectionKey, boolean>
  );

export default function ContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(() => structuredClone(initialContent));
  const [baseline, setBaseline] = useState<SiteContent>(() => structuredClone(initialContent));
  const [dirtySections, setDirtySections] = useState<Record<SectionKey, boolean>>(createDirtyState);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [savingSection, setSavingSection] = useState<SectionKey | null>(null);
  const [status, setStatus] = useState<
    null | { section: SectionKey; type: "success" | "error"; message: string }
  >(null);

  const updateSection = (
    section: SectionKey,
    updater: (prev: SiteContent) => SiteContent
  ) => {
    setContent((prev) => updater(prev));
    setDirtySections((prev) => ({ ...prev, [section]: true }));
    setStatus((current) => (current?.section === section ? null : current));
  };

  const resetSection = (section: SectionKey) => {
    setContent((prev) =>
      ({
        ...prev,
        [section]: structuredClone(baseline[section]),
      } as SiteContent)
    );
    setDirtySections((prev) => ({ ...prev, [section]: false }));
    setStatus((current) => (current?.section === section ? null : current));
  };

  const createPayloadForSection = (
    section: SectionKey,
    baselineContent: SiteContent,
    currentContent: SiteContent
  ) => {
    const next = structuredClone(baselineContent);

    switch (section) {
      case "hero":
        next.hero = structuredClone(currentContent.hero);
        break;
      case "about":
        next.about = structuredClone(currentContent.about);
        break;
      case "experience":
        next.experience = structuredClone(currentContent.experience);
        break;
      case "projects":
        next.projects = structuredClone(currentContent.projects);
        break;
      case "skills":
        next.skills = structuredClone(currentContent.skills);
        break;
      case "contact":
        next.contact = structuredClone(currentContent.contact);
        break;
      default:
        section satisfies never;
        break;
    }

    return next;
  };

  const saveSection = async (section: SectionKey) => {
    if (!dirtySections[section]) {
      return;
    }

    setSavingSection(section);
    setStatus((current) => (current?.section === section ? null : current));

    try {
      const payload = createPayloadForSection(section, baseline, content);

      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save content");
      }

      setBaseline((prev) =>
        ({
          ...prev,
          [section]: structuredClone(content[section]),
        } as SiteContent)
      );
      setDirtySections((prev) => ({ ...prev, [section]: false }));
      setStatus({
        section,
        type: "success",
        message: `${SECTION_META[section].title} saved successfully.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ section, type: "error", message });
    } finally {
      setSavingSection(null);
    }
  };

  const hero = content.hero;
  const about = content.about;
  const experience = content.experience;
  const projects = content.projects;
  const skills = content.skills;
  const contact = content.contact;
  const activeMeta = SECTION_META[activeSection];
  const sectionDirty = dirtySections[activeSection];
  const sectionSaving = savingSection === activeSection;
  const activeStatus = status && status.section === activeSection ? status : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-[240px,1fr]">
        <aside className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-white">Content sections</h2>
            <p className="text-xs text-slate-400">
              Navigate between sections to edit and save updates independently.
            </p>
          </div>
          <nav className="flex flex-col gap-1">
            {SECTION_KEYS.map((key) => {
              const meta = SECTION_META[key];
              const isActive = key === activeSection;
              const isDirty = dirtySections[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className={`rounded-xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
                    isActive
                      ? "border-blue-500/40 bg-blue-500/10 text-white shadow-inner shadow-blue-500/10"
                      : "border-transparent text-slate-300 hover:border-slate-700/60 hover:bg-slate-900/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{meta.title}</span>
                    {isDirty && <span className="text-xs font-semibold text-amber-300">●</span>}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{meta.description}</p>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          <header className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-white">Portfolio Content Admin</h1>
                <p className="text-sm text-slate-400">
                  Update copy, projects, and contact details. Changes persist to the shared JSON
                  content file that powers the public site.
                </p>
              </div>
              <div className="space-y-1 rounded-xl border border-slate-800/70 bg-slate-950/70 p-4 text-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Active section</p>
                <p className="text-base font-semibold text-white">{activeMeta.title}</p>
                <p className="text-xs text-slate-400">{activeMeta.description}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-sm ${
                  sectionDirty ? "text-amber-200" : "text-slate-400"
                }`}
              >
                {sectionDirty
                  ? "You have unsaved edits in this section."
                  : "All changes for this section are saved."}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => resetSection(activeSection)}
                  disabled={!sectionDirty || sectionSaving}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset section
                </button>
                <button
                  type="button"
                  onClick={() => saveSection(activeSection)}
                  disabled={!sectionDirty || sectionSaving}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sectionSaving ? "Saving…" : sectionDirty ? "Save section" : "Saved"}
                </button>
              </div>
            </div>
          </header>

          <nav className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-3">
            <div className="flex flex-wrap items-center gap-2">
              {SECTION_KEYS.map((key) => {
                const meta = SECTION_META[key];
                const isActive = key === activeSection;
                const isDirty = dirtySections[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
                      isActive
                        ? "border-blue-500/40 bg-blue-500/15 text-white shadow-inner shadow-blue-500/10"
                        : "border-transparent bg-slate-950/30 text-slate-300 hover:border-slate-700/60 hover:text-white"
                    }`}
                  >
                    <span>{meta.title}</span>
                    {isDirty && <span className="text-xs font-semibold text-amber-300">●</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {activeStatus && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                activeStatus.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-200"
              }`}
            >
              {activeStatus.message}
            </div>
          )}

          {/* Hero */}
          {activeSection === "hero" && (
            <section className={sectionCardClass}>
              <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">Hero</h2>
                <p className="text-xs text-slate-400">
                  Control the hero headline, call-to-actions, and quick contact links.
                </p>
              </div>
              <div className="space-y-6 px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <input
                className={inputClass}
                value={hero.name}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: { ...prev.hero, name: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Tagline">
              <input
                className={inputClass}
                value={hero.tagline}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: { ...prev.hero, tagline: e.target.value },
                  }))
                }
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Primary CTA label">
              <input
                className={inputClass}
                value={hero.primaryCta.label}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      primaryCta: { ...prev.hero.primaryCta, label: e.target.value },
                    },
                  }))
                }
              />
            </Field>
            <Field label="Primary CTA href">
              <input
                className={inputClass}
                value={hero.primaryCta.href}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      primaryCta: { ...prev.hero.primaryCta, href: e.target.value },
                    },
                  }))
                }
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Secondary CTA label">
              <input
                className={inputClass}
                value={hero.secondaryCta.label}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      secondaryCta: { ...prev.hero.secondaryCta, label: e.target.value },
                    },
                  }))
                }
              />
            </Field>
            <Field label="Secondary CTA href">
              <input
                className={inputClass}
                value={hero.secondaryCta.href}
                onChange={(e) =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      secondaryCta: { ...prev.hero.secondaryCta, href: e.target.value },
                    },
                  }))
                }
              />
            </Field>
          </div>

          <Field label="Profile image path">
            <input
              className={inputClass}
              value={hero.profileImage}
              onChange={(e) =>
                updateSection("hero", (prev) => ({
                  ...prev,
                  hero: { ...prev.hero, profileImage: e.target.value },
                }))
              }
            />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Quick links</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("hero", (prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      quickLinks: [
                        ...prev.hero.quickLinks,
                        {
                          label: "New link",
                          href: "#",
                          icon: heroIconOptions[heroIconOptions.length - 1],
                        },
                      ],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add link
              </button>
            </div>

            <div className="space-y-3">
              {hero.quickLinks.map((link, index) => (
                <div
                  key={`${link.label}-${index}`}
                  className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end"
                >
                  <Field label="Label">
                    <input
                      className={inputClass}
                      value={link.label}
                      onChange={(e) =>
                        updateSection("hero", (prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            quickLinks: prev.hero.quickLinks.map((item, idx) =>
                              idx === index ? { ...item, label: e.target.value } : item
                            ),
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Href">
                    <input
                      className={inputClass}
                      value={link.href}
                      onChange={(e) =>
                        updateSection("hero", (prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            quickLinks: prev.hero.quickLinks.map((item, idx) =>
                              idx === index ? { ...item, href: e.target.value } : item
                            ),
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Icon">
                    <select
                      className={`${inputClass} pr-8`}
                      value={link.icon}
                      onChange={(e) =>
                        updateSection("hero", (prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            quickLinks: prev.hero.quickLinks.map((item, idx) =>
                              idx === index ? { ...item, icon: e.target.value as HeroIcon } : item
                            ),
                          },
                        }))
                      }
                    >
                      {heroIconOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("hero", (prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          quickLinks: prev.hero.quickLinks.filter((_, idx) => idx !== index),
                        },
                      }))
                    }
                    className="self-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
              </div>
            </section>
          )}

          {/* About */}
          {activeSection === "about" && (
            <section className={sectionCardClass}>
              <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">About</h2>
                <p className="text-xs text-slate-400">
                  Update the biography and highlight statistics powering the about section.
                </p>
              </div>
              <div className="space-y-6 px-6 py-6">
          <Field label="Section heading">
            <input
              className={inputClass}
              value={about.heading}
              onChange={(e) =>
                updateSection("about", (prev) => ({
                  ...prev,
                  about: { ...prev.about, heading: e.target.value },
                }))
              }
            />
          </Field>

          <Field label="Bio">
            <textarea
              className={textareaClass}
              value={about.bio}
              rows={4}
              onChange={(e) =>
                updateSection("about", (prev) => ({
                  ...prev,
                  about: { ...prev.about, bio: e.target.value },
                }))
              }
            />
          </Field>

          <Field label="Highlights (one per line)">
            <textarea
              className={textareaClass}
              rows={4}
              value={about.highlights.join("\n")}
              onChange={(e) => {
                const items = e.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean);
                updateSection("about", (prev) => ({
                  ...prev,
                  about: { ...prev.about, highlights: items },
                }));
              }}
            />
          </Field>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Stats</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("about", (prev) => ({
                    ...prev,
                    about: {
                      ...prev.about,
                      stats: [...prev.about.stats, { value: "0", label: "New stat" }],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add stat
              </button>
            </div>

            <div className="space-y-3">
              {about.stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_2fr_auto] md:items-end"
                >
                  <Field label="Value">
                    <input
                      className={inputClass}
                      value={stat.value}
                      onChange={(e) =>
                        updateSection("about", (prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            stats: prev.about.stats.map((item, idx) =>
                              idx === index ? { ...item, value: e.target.value } : item
                            ),
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Label">
                    <input
                      className={inputClass}
                      value={stat.label}
                      onChange={(e) =>
                        updateSection("about", (prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            stats: prev.about.stats.map((item, idx) =>
                              idx === index ? { ...item, label: e.target.value } : item
                            ),
                          },
                        }))
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("about", (prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          stats: prev.about.stats.filter((_, idx) => idx !== index),
                        },
                      }))
                    }
                    className="self-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
              </div>
            </section>
          )}

          {/* Experience */}
          {activeSection === "experience" && (
            <EditableExperience
              experience={experience}
              update={(items) =>
                updateSection("experience", (prev) => ({
                  ...prev,
                  experience: { ...prev.experience, items },
                }))
              }
              updateHeading={(heading) =>
                updateSection("experience", (prev) => ({
                  ...prev,
                  experience: { ...prev.experience, heading },
                }))
              }
            />
          )}

          {/* Projects */}
          {activeSection === "projects" && (
            <section className={sectionCardClass}>
              <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">Projects</h2>
                <p className="text-xs text-slate-400">
                  Manage the featured case studies, tech stacks, media, and CTAs.
                </p>
              </div>
              <div className="space-y-6 px-6 py-6">
          <Field label="Section heading">
            <input
              className={inputClass}
              value={projects.heading}
              onChange={(e) =>
                updateSection("projects", (prev) => ({
                  ...prev,
                  projects: { ...prev.projects, heading: e.target.value },
                }))
              }
            />
          </Field>
          <Field label="Section subheading">
            <textarea
              className={textareaClass}
              rows={3}
              value={projects.subheading}
              onChange={(e) =>
                updateSection("projects", (prev) => ({
                  ...prev,
                  projects: { ...prev.projects, subheading: e.target.value },
                }))
              }
            />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Project entries</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("projects", (prev) => ({
                    ...prev,
                    projects: {
                      ...prev.projects,
                      items: [
                        ...prev.projects.items,
                        {
                          title: "New project",
                          tagline: "",
                          description: "",
                          tech: ["React"],
                          media: { type: "image", src: "/placeholder.png" },
                        } as ProjectItem,
                      ],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add project
              </button>
            </div>

            {projects.items.map((project, index) => (
              <ProjectEditor
                key={`${project.title}-${index}`}
                project={project}
                onChange={(next) =>
                  updateSection("projects", (prev) => ({
                    ...prev,
                    projects: {
                      ...prev.projects,
                      items: prev.projects.items.map((item, idx) =>
                        idx === index ? next : item
                      ),
                    },
                  }))
                }
                onRemove={() =>
                  updateSection("projects", (prev) => ({
                    ...prev,
                    projects: {
                      ...prev.projects,
                      items: prev.projects.items.filter((_, idx) => idx !== index),
                    },
                  }))
                }
              />
            ))}
          </div>
              </div>
            </section>
          )}

          {/* Skills */}
          {activeSection === "skills" && (
            <section className={sectionCardClass}>
              <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">Skills</h2>
                <p className="text-xs text-slate-400">
                  Configure the marquee rows displayed in the skills section.
                </p>
              </div>
              <div className="space-y-6 px-6 py-6">
          <Field label="Section heading">
            <input
              className={inputClass}
              value={skills.heading}
              onChange={(e) =>
                updateSection("skills", (prev) => ({
                  ...prev,
                  skills: { ...prev.skills, heading: e.target.value },
                }))
              }
            />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Marquee rows</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("skills", (prev) => ({
                    ...prev,
                    skills: {
                      ...prev.skills,
                      rows: [
                        ...prev.skills.rows,
                        { label: "New row", skills: ["Skill"] } as SkillRow,
                      ],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add row
              </button>
            </div>

            {skills.rows.map((row, index) => (
              <div
                key={`${row.label}-${index}`}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_2fr_auto_auto] md:items-end"
              >
                <Field label="Label">
                  <input
                    className={inputClass}
                    value={row.label}
                    onChange={(e) =>
                      updateSection("skills", (prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          rows: prev.skills.rows.map((item, idx) =>
                            idx === index ? { ...item, label: e.target.value } : item
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Skills (comma separated)">
                  <input
                    className={inputClass}
                    value={row.skills.join(", ")}
                    onChange={(e) => {
                      const list = e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean);
                      updateSection("skills", (prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          rows: prev.skills.rows.map((item, idx) =>
                            idx === index ? { ...item, skills: list } : item
                          ),
                        },
                      }));
                    }}
                  />
                </Field>
                <Field label="Reverse">
                  <select
                    className={inputClass}
                    value={row.reverse ? "true" : "false"}
                    onChange={(e) =>
                      updateSection("skills", (prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          rows: prev.skills.rows.map((item, idx) =>
                            idx === index
                              ? { ...item, reverse: e.target.value === "true" }
                              : item
                          ),
                        },
                      }))
                    }
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </Field>
                <Field label="Speed (seconds)">
                  <input
                    type="number"
                    min={10}
                    className={inputClass}
                    value={row.speed ?? 60}
                    onChange={(e) =>
                      updateSection("skills", (prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          rows: prev.skills.rows.map((item, idx) =>
                            idx === index
                              ? { ...item, speed: Number(e.target.value) || undefined }
                              : item
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <button
                  type="button"
                  onClick={() =>
                    updateSection("skills", (prev) => ({
                      ...prev,
                      skills: {
                        ...prev.skills,
                        rows: prev.skills.rows.filter((_, idx) => idx !== index),
                      },
                    }))
                  }
                  className="self-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
              </div>
            </section>
          )}

          {/* Contact */}
          {activeSection === "contact" && (
            <section className={sectionCardClass}>
              <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">Contact</h2>
                <p className="text-xs text-slate-400">
                  Tune the contact form copy, contact cards, and footer badges.
                </p>
              </div>
              <div className="space-y-6 px-6 py-6">
          <Field label="Heading">
            <input
              className={inputClass}
              value={contact.heading}
              onChange={(e) =>
                updateSection("contact", (prev) => ({
                  ...prev,
                  contact: { ...prev.contact, heading: e.target.value },
                }))
              }
            />
          </Field>
          <Field label="Subheading">
            <textarea
              className={textareaClass}
              rows={3}
              value={contact.subheading}
              onChange={(e) =>
                updateSection("contact", (prev) => ({
                  ...prev,
                  contact: { ...prev.contact, subheading: e.target.value },
                }))
              }
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Submit label">
              <input
                className={inputClass}
                value={contact.submitLabel}
                onChange={(e) =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: { ...prev.contact, submitLabel: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Sending label">
              <input
                className={inputClass}
                value={contact.sendingLabel}
                onChange={(e) =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: { ...prev.contact, sendingLabel: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Success label">
              <input
                className={inputClass}
                value={contact.successLabel}
                onChange={(e) =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: { ...prev.contact, successLabel: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Error label">
              <input
                className={inputClass}
                value={contact.errorLabel}
                onChange={(e) =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: { ...prev.contact, errorLabel: e.target.value },
                  }))
                }
              />
            </Field>
          </div>

          <Field label="Success message">
            <input
              className={inputClass}
              value={contact.successMessage}
              onChange={(e) =>
                updateSection("contact", (prev) => ({
                  ...prev,
                  contact: { ...prev.contact, successMessage: e.target.value },
                }))
              }
            />
          </Field>

          <Field label="Policy note">
            <input
              className={inputClass}
              value={contact.policyNote}
              onChange={(e) =>
                updateSection("contact", (prev) => ({
                  ...prev,
                  contact: { ...prev.contact, policyNote: e.target.value },
                }))
              }
            />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Cards</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      cards: [
                        ...prev.contact.cards,
                        { title: "New", value: "", href: "#" } as ContactCard,
                      ],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add card
              </button>
            </div>

            {contact.cards.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[repeat(3,minmax(0,1fr))_auto] md:items-end"
              >
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={card.title}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          cards: prev.contact.cards.map((item, idx) =>
                            idx === index ? { ...item, title: e.target.value } : item
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Value">
                  <input
                    className={inputClass}
                    value={card.value}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          cards: prev.contact.cards.map((item, idx) =>
                            idx === index ? { ...item, value: e.target.value } : item
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Href">
                  <input
                    className={inputClass}
                    value={card.href}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          cards: prev.contact.cards.map((item, idx) =>
                            idx === index ? { ...item, href: e.target.value } : item
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="External">
                  <select
                    className={inputClass}
                    value={card.external ? "true" : "false"}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          cards: prev.contact.cards.map((item, idx) =>
                            idx === index
                              ? { ...item, external: e.target.value === "true" }
                              : item
                          ),
                        },
                      }))
                    }
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </Field>
                <button
                  type="button"
                  onClick={() =>
                    updateSection("contact", (prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        cards: prev.contact.cards.filter((_, idx) => idx !== index),
                      },
                    }))
                  }
                  className="self-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Footer badges</span>
              <button
                type="button"
                onClick={() =>
                  updateSection("contact", (prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      footnotes: [
                        ...prev.contact.footnotes,
                        { label: "Label", value: "Value" },
                      ],
                    },
                  }))
                }
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                + Add badge
              </button>
            </div>

            {contact.footnotes.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
              >
                <Field label="Label">
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          footnotes: prev.contact.footnotes.map((note, idx) =>
                            idx === index ? { ...note, label: e.target.value } : note
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Value">
                  <input
                    className={inputClass}
                    value={item.value}
                    onChange={(e) =>
                      updateSection("contact", (prev) => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          footnotes: prev.contact.footnotes.map((note, idx) =>
                            idx === index ? { ...note, value: e.target.value } : note
                          ),
                        },
                      }))
                    }
                  />
                </Field>
                <button
                  type="button"
                  onClick={() =>
                    updateSection("contact", (prev) => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        footnotes: prev.contact.footnotes.filter((_, idx) => idx !== index),
                      },
                    }))
                  }
                  className="self-center rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-100">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function EditableExperience({
  experience,
  update,
  updateHeading,
}: {
  experience: ExperienceContent;
  update: (items: ExperienceItem[]) => void;
  updateHeading: (heading: string) => void;
}) {
  return (
    <section className={sectionCardClass}>
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-lg font-semibold text-white">Experience</h2>
        <p className="text-xs text-slate-400">
          Maintain the experience timeline items, including bullet highlights.
        </p>
      </div>
      <div className="space-y-6 px-6 py-6">
        <Field label="Section heading">
          <input
            className={inputClass}
            value={experience.heading}
            onChange={(e) => updateHeading(e.target.value)}
          />
        </Field>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={labelClass}>Timeline entries</span>
            <button
              type="button"
              onClick={() =>
                update([
                  ...experience.items,
                  {
                    role: "New role",
                    company: "Company",
                    period: "Year - Year",
                    points: ["What you delivered"],
                  },
                ])
              }
              className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
            >
              + Add experience
            </button>
          </div>

          {experience.items.map((item, index) => (
            <div
              key={`${item.role}-${index}`}
              className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Role">
                  <input
                    className={inputClass}
                    value={item.role}
                    onChange={(e) =>
                      update(
                        experience.items.map((exp, idx) =>
                          idx === index ? { ...exp, role: e.target.value } : exp
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Company">
                  <input
                    className={inputClass}
                    value={item.company}
                    onChange={(e) =>
                      update(
                        experience.items.map((exp, idx) =>
                          idx === index ? { ...exp, company: e.target.value } : exp
                        )
                      )
                    }
                  />
                </Field>
              </div>
              <Field label="Period">
                <input
                  className={inputClass}
                  value={item.period}
                  onChange={(e) =>
                    update(
                      experience.items.map((exp, idx) =>
                        idx === index ? { ...exp, period: e.target.value } : exp
                      )
                    )
                  }
                />
              </Field>
              <Field label="Highlights (one per line)">
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={item.points.join("\n")}
                  onChange={(e) => {
                    const points = e.target.value
                      .split("\n")
                      .map((entry) => entry.trim())
                      .filter(Boolean);
                    update(
                      experience.items.map((exp, idx) =>
                        idx === index ? { ...exp, points } : exp
                      )
                    );
                  }}
                />
              </Field>
              <button
                type="button"
                onClick={() =>
                  update(experience.items.filter((_, idx) => idx !== index))
                }
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
              >
                Remove experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectEditor({
  project,
  onChange,
  onRemove,
}: {
  project: ProjectItem;
  onChange: (project: ProjectItem) => void;
  onRemove: () => void;
}) {
  const update = (partial: Partial<ProjectItem>) => {
    onChange({ ...project, ...partial });
  };

  const updateMedia = (partial: Partial<ProjectItem["media"]>) => {
    onChange({ ...project, media: { ...project.media, ...partial } });
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Title">
          <input
            className={inputClass}
            value={project.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </Field>
        <Field label="Tagline">
          <input
            className={inputClass}
            value={project.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          className={textareaClass}
          rows={3}
          value={project.description}
          onChange={(e) => update({ description: e.target.value })}
        />
      </Field>
      <Field label="Tech stack (comma separated)">
        <input
          className={inputClass}
          value={project.tech.join(", ")}
          onChange={(e) =>
            update({
              tech: e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="CTA label">
          <input
            className={inputClass}
            value={project.cta?.label ?? ""}
            onChange={(e) =>
              update({
                cta: {
                  ...(project.cta ?? { href: "" }),
                  label: e.target.value,
                },
              })
            }
          />
        </Field>
        <Field label="CTA href">
          <input
            className={inputClass}
            value={project.cta?.href ?? ""}
            onChange={(e) =>
              update({
                cta: {
                  ...(project.cta ?? { label: project.title }),
                  href: e.target.value,
                },
              })
            }
          />
        </Field>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Media type">
          <select
            className={inputClass}
            value={project.media.type}
            onChange={(e) => updateMedia({ type: e.target.value as ProjectItem["media"]["type"] })}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </Field>
        <Field label={project.media.type === "video" ? "Poster" : "Alt text"}>
          <input
            className={inputClass}
            value={
              project.media.type === "video"
                ? project.media.poster ?? ""
                : project.media.alt ?? ""
            }
            onChange={(e) =>
              project.media.type === "video"
                ? updateMedia({ poster: e.target.value || undefined })
                : updateMedia({ alt: e.target.value || undefined })
            }
          />
        </Field>
      </div>
      <Field label="Media source (URL or path)">
        <input
          className={inputClass}
          value={project.media.src}
          onChange={(e) => updateMedia({ src: e.target.value })}
        />
      </Field>
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={Boolean(project.featured)}
            onChange={(e) => update({ featured: e.target.checked })}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
          />
          Featured layout
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400 hover:text-rose-200"
        >
          Remove project
        </button>
      </div>
    </div>
  );
}
