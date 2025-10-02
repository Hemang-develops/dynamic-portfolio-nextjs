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

export default function ContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(
    null
  );
  const [dirty, setDirty] = useState(false);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => updater(prev));
    setDirty(true);
  };

  const resetChanges = () => {
    setContent(initialContent);
    setDirty(false);
    setStatus(null);
  };

  const saveChanges = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save content");
      }

      setStatus({ type: "success", message: "Content saved successfully." });
      setDirty(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ type: "error", message });
    } finally {
      setSaving(false);
    }
  };

  const hero = content.hero;
  const about = content.about;
  const experience = content.experience;
  const projects = content.projects;
  const skills = content.skills;
  const contact = content.contact;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <header className="flex flex-col gap-4 border-b border-slate-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Portfolio Content Admin</h1>
          <p className="text-sm text-slate-400">
            Update copy, projects, and contact details. Changes persist to the shared JSON
            content file that powers the public site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetChanges}
            disabled={!dirty || saving}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={saveChanges}
            disabled={saving || !dirty}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
        </div>
      </header>

      {status && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Hero */}
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                        updateContent((prev) => ({
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
                        updateContent((prev) => ({
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
                        updateContent((prev) => ({
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
                      updateContent((prev) => ({
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

      {/* About */}
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
                updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                        updateContent((prev) => ({
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
                        updateContent((prev) => ({
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
                      updateContent((prev) => ({
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

      {/* Experience */}
      <EditableExperience
        experience={experience}
        update={(items) =>
          updateContent((prev) => ({
            ...prev,
            experience: { ...prev.experience, items },
          }))
        }
        updateHeading={(heading) =>
          updateContent((prev) => ({
            ...prev,
            experience: { ...prev.experience, heading },
          }))
        }
      />

      {/* Projects */}
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
                updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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

      {/* Skills */}
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                    updateContent((prev) => ({
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

      {/* Contact */}
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
                updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                    updateContent((prev) => ({
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
                  updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                      updateContent((prev) => ({
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
                    updateContent((prev) => ({
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
