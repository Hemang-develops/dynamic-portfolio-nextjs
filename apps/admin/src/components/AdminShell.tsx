"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

import { ADMIN_NAV_ITEMS, type AdminNavItem } from "@/config/navigation";

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem = useMemo<AdminNavItem>(() => {
    const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    return (
      ADMIN_NAV_ITEMS.find((item) =>
        item.href === "/" ? normalized === "/" : normalized.startsWith(item.href)
      ) ?? ADMIN_NAV_ITEMS[0]
    );
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800/60 bg-slate-950/95 backdrop-blur transition-transform duration-200 ease-out md:static md:w-64 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800/60 px-6">
          <span className="text-base font-semibold tracking-wide text-white">Portfolio Admin</span>
          <button
            type="button"
            className="rounded-md border border-slate-700/80 px-2 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-500/80 hover:text-white md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-6 text-sm">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = activeItem.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setSidebarOpen(false)}
                className={`rounded-xl border border-transparent px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
                  isActive
                    ? "border-blue-500/30 bg-blue-500/10 text-white shadow-inner shadow-blue-500/10"
                    : "text-slate-300 hover:border-slate-700/70 hover:bg-slate-900/70 hover:text-white"
                }`}
              >
                <div className="font-medium">{item.label}</div>
                <p className="text-xs text-slate-400">{item.description}</p>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden px-6 pb-8 md:block">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-400">
            Need help? Visit the <span className="text-slate-200">documentation</span> or contact the engineering team.
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-slate-700/70 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500/70 hover:text-white md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                Menu
              </button>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Current Section</p>
                <h1 className="text-base font-semibold text-white">{activeItem.label}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3 text-right">
              <div>
                <p className="text-xs font-medium text-slate-300">Admin User</p>
                <p className="text-[11px] text-slate-500">content-team@example.com</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-200">
                CT
              </div>
            </div>
          </div>
        </header>
        <main className="px-5 py-10 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
