export const HERO_ICON_OPTIONS = [
  "mail",
  "phone",
  "location",
  "linkedin",
  "github",
  "link",
] as const;

export type HeroIcon = (typeof HERO_ICON_OPTIONS)[number];

export interface CTA {
  label: string;
  href: string;
}

export interface HeroQuickLink {
  label: string;
  href: string;
  icon: HeroIcon;
}

export interface HeroContent {
  name: string;
  tagline: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  quickLinks: HeroQuickLink[];
  profileImage: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  heading: string;
  bio: string;
  highlights: string[];
  stats: AboutStat[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface ExperienceContent {
  heading: string;
  items: ExperienceItem[];
}

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "video";
      src: string;
      alt?: string;
      poster?: string;
    };

export interface ProjectItem {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  cta?: CTA;
  media: ProjectMedia;
  featured?: boolean;
}

export interface ProjectsContent {
  heading: string;
  subheading: string;
  items: ProjectItem[];
}

export interface SkillRow {
  label: string;
  skills: string[];
  reverse?: boolean;
  speed?: number;
}

export interface SkillsContent {
  heading: string;
  rows: SkillRow[];
}

export interface ContactCard {
  title: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface ContactFootnote {
  label: string;
  value: string;
}

export interface ContactContent {
  heading: string;
  subheading: string;
  cards: ContactCard[];
  policyNote: string;
  submitLabel: string;
  sendingLabel: string;
  successLabel: string;
  errorLabel: string;
  successMessage: string;
  footnotes: ContactFootnote[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  contact: ContactContent;
}

const ICON_SET = new Set<HeroIcon>(HERO_ICON_OPTIONS);

function ensureString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid ${field}`);
  }
  return value.trim();
}

function ensureOptionalString(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  return ensureString(value, field);
}

function ensureBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid ${field}`);
  }
  return value;
}

function ensureNumber(value: unknown, field: string): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Invalid ${field}`);
  }
  return value;
}

function ensureArray<T>(value: unknown, field: string, mapper: (item: unknown, index: number) => T): T[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Invalid ${field}`);
  }
  return value.map((item, index) => mapper(item, index));
}

function validateCTA(raw: unknown, field: string): CTA {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Invalid ${field}`);
  }
  const obj = raw as Record<string, unknown>;
  return {
    label: ensureString(obj.label, `${field}.label`),
    href: ensureString(obj.href, `${field}.href`),
  };
}

function validateQuickLinks(raw: unknown): HeroQuickLink[] {
  return ensureArray(raw, "hero.quickLinks", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid hero.quickLinks[${index}]`);
    }
    const obj = item as Record<string, unknown>;
    const icon = ensureString(obj.icon, `hero.quickLinks[${index}].icon`) as HeroIcon;
    if (!ICON_SET.has(icon)) {
      throw new Error(`Unsupported icon in hero.quickLinks[${index}]`);
    }
    return {
      label: ensureString(obj.label, `hero.quickLinks[${index}].label`),
      href: ensureString(obj.href, `hero.quickLinks[${index}].href`),
      icon,
    };
  });
}

function validateHero(raw: unknown): HeroContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid hero content");
  }
  const obj = raw as Record<string, unknown>;
  return {
    name: ensureString(obj.name, "hero.name"),
    tagline: ensureString(obj.tagline, "hero.tagline"),
    primaryCta: validateCTA(obj.primaryCta, "hero.primaryCta"),
    secondaryCta: validateCTA(obj.secondaryCta, "hero.secondaryCta"),
    quickLinks: validateQuickLinks(obj.quickLinks),
    profileImage: ensureString(obj.profileImage, "hero.profileImage"),
  };
}

function validateAbout(raw: unknown): AboutContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid about content");
  }
  const obj = raw as Record<string, unknown>;
  const highlights = ensureArray(obj.highlights, "about.highlights", (item, index) =>
    ensureString(item, `about.highlights[${index}]`)
  );
  const stats = ensureArray(obj.stats, "about.stats", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid about.stats[${index}]`);
    }
    const stat = item as Record<string, unknown>;
    return {
      value: ensureString(stat.value, `about.stats[${index}].value`),
      label: ensureString(stat.label, `about.stats[${index}].label`),
    };
  });
  return {
    heading: ensureString(obj.heading, "about.heading"),
    bio: ensureString(obj.bio, "about.bio"),
    highlights,
    stats,
  };
}

function validateExperience(raw: unknown): ExperienceContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid experience content");
  }
  const obj = raw as Record<string, unknown>;
  const items = ensureArray(obj.items, "experience.items", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid experience.items[${index}]`);
    }
    const exp = item as Record<string, unknown>;
    return {
      role: ensureString(exp.role, `experience.items[${index}].role`),
      company: ensureString(exp.company, `experience.items[${index}].company`),
      period: ensureString(exp.period, `experience.items[${index}].period`),
      points: ensureArray(exp.points, `experience.items[${index}].points`, (point, pointIndex) =>
        ensureString(point, `experience.items[${index}].points[${pointIndex}]`)
      ),
    };
  });
  return {
    heading: ensureString(obj.heading, "experience.heading"),
    items,
  };
}

function validateProject(raw: unknown, index: number): ProjectItem {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Invalid projects.items[${index}]`);
  }
  const obj = raw as Record<string, unknown>;
  const mediaRaw = obj.media;
  if (typeof mediaRaw !== "object" || mediaRaw === null) {
    throw new Error(`Invalid projects.items[${index}].media`);
  }
  const mediaObj = mediaRaw as Record<string, unknown>;
  const type = ensureString(mediaObj.type, `projects.items[${index}].media.type`);
  let media: ProjectMedia;
  if (type === "image") {
    media = {
      type: "image",
      src: ensureString(mediaObj.src, `projects.items[${index}].media.src`),
      alt: ensureOptionalString(mediaObj.alt, `projects.items[${index}].media.alt`),
    };
  } else if (type === "video") {
    media = {
      type: "video",
      src: ensureString(mediaObj.src, `projects.items[${index}].media.src`),
      poster: ensureOptionalString(mediaObj.poster, `projects.items[${index}].media.poster`),
    };
  } else {
    throw new Error(`Unsupported media type in projects.items[${index}]`);
  }

  const tech = ensureArray(obj.tech, `projects.items[${index}].tech`, (item, techIndex) =>
    ensureString(item, `projects.items[${index}].tech[${techIndex}]`)
  );

  const ctaRaw = obj.cta;
  const cta = ctaRaw ? validateCTA(ctaRaw, `projects.items[${index}].cta`) : undefined;
  const featured = obj.featured === undefined ? undefined : ensureBoolean(obj.featured, `projects.items[${index}].featured`);

  return {
    title: ensureString(obj.title, `projects.items[${index}].title`),
    tagline: ensureString(obj.tagline, `projects.items[${index}].tagline`),
    description: ensureString(obj.description, `projects.items[${index}].description`),
    tech,
    cta,
    media,
    featured,
  };
}

function validateProjects(raw: unknown): ProjectsContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid projects content");
  }
  const obj = raw as Record<string, unknown>;
  const items = ensureArray(obj.items, "projects.items", (item, index) => validateProject(item, index));
  return {
    heading: ensureString(obj.heading, "projects.heading"),
    subheading: ensureString(obj.subheading, "projects.subheading"),
    items,
  };
}

function validateSkills(raw: unknown): SkillsContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid skills content");
  }
  const obj = raw as Record<string, unknown>;
  const rows = ensureArray(obj.rows, "skills.rows", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid skills.rows[${index}]`);
    }
    const row = item as Record<string, unknown>;
    return {
      label: ensureString(row.label, `skills.rows[${index}].label`),
      skills: ensureArray(row.skills, `skills.rows[${index}].skills`, (skill, skillIndex) =>
        ensureString(skill, `skills.rows[${index}].skills[${skillIndex}]`)
      ),
      reverse: row.reverse === undefined ? undefined : ensureBoolean(row.reverse, `skills.rows[${index}].reverse`),
      speed: ensureNumber(row.speed, `skills.rows[${index}].speed`),
    };
  });
  return {
    heading: ensureString(obj.heading, "skills.heading"),
    rows,
  };
}

function validateContact(raw: unknown): ContactContent {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid contact content");
  }
  const obj = raw as Record<string, unknown>;
  const cards = ensureArray(obj.cards, "contact.cards", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid contact.cards[${index}]`);
    }
    const card = item as Record<string, unknown>;
    return {
      title: ensureString(card.title, `contact.cards[${index}].title`),
      value: ensureString(card.value, `contact.cards[${index}].value`),
      href: ensureString(card.href, `contact.cards[${index}].href`),
      external:
        card.external === undefined ? undefined : ensureBoolean(card.external, `contact.cards[${index}].external`),
    };
  });
  const footnotes = ensureArray(obj.footnotes, "contact.footnotes", (item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`Invalid contact.footnotes[${index}]`);
    }
    const note = item as Record<string, unknown>;
    return {
      label: ensureString(note.label, `contact.footnotes[${index}].label`),
      value: ensureString(note.value, `contact.footnotes[${index}].value`),
    };
  });
  return {
    heading: ensureString(obj.heading, "contact.heading"),
    subheading: ensureString(obj.subheading, "contact.subheading"),
    cards,
    policyNote: ensureString(obj.policyNote, "contact.policyNote"),
    submitLabel: ensureString(obj.submitLabel, "contact.submitLabel"),
    sendingLabel: ensureString(obj.sendingLabel, "contact.sendingLabel"),
    successLabel: ensureString(obj.successLabel, "contact.successLabel"),
    errorLabel: ensureString(obj.errorLabel, "contact.errorLabel"),
    successMessage: ensureString(obj.successMessage, "contact.successMessage"),
    footnotes,
  };
}

export function validateSiteContent(data: unknown): SiteContent {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid site content");
  }
  const obj = data as Record<string, unknown>;
  return {
    hero: validateHero(obj.hero),
    about: validateAbout(obj.about),
    experience: validateExperience(obj.experience),
    projects: validateProjects(obj.projects),
    skills: validateSkills(obj.skills),
    contact: validateContact(obj.contact),
  };
}
