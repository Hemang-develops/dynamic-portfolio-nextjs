export interface AdminNavItem {
  label: string;
  description: string;
  href: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    description: "Monitor activity and quick stats",
    href: "/",
  },
  {
    label: "Content",
    description: "Edit copy, projects, and structured data",
    href: "/content",
  },
  {
    label: "Media Library",
    description: "Manage supporting imagery and assets",
    href: "/media",
  },
  {
    label: "Team",
    description: "Control collaborator permissions",
    href: "/users",
  },
  {
    label: "Settings",
    description: "Configure site metadata and preferences",
    href: "/settings",
  },
];
