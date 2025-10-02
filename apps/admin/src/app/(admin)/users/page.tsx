import InviteCollaboratorForm from "@/components/InviteCollaboratorForm";

const teamMembers = [
  {
    name: "Alex Johnson",
    email: "alex@company.com",
    role: "Administrator",
    lastActive: "2 hours ago",
  },
  {
    name: "Priya Desai",
    email: "priya@company.com",
    role: "Content editor",
    lastActive: "5 hours ago",
  },
  {
    name: "Marco Silva",
    email: "marco@company.com",
    role: "Reviewer",
    lastActive: "Yesterday",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <section className="max-w-4xl rounded-2xl border border-slate-800/70 bg-slate-900/50 p-6 text-sm text-slate-300">
        <h2 className="text-base font-semibold text-white">Team management</h2>
        <p className="mt-2 leading-relaxed">
          Control who can edit the site and track their recent activity. Roles determine the level of
          access collaborators receive when authenticating with the admin dashboard.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          <li><span className="font-medium text-white">Administrators</span> can invite teammates and deploy changes.</li>
          <li><span className="font-medium text-white">Content editors</span> can edit copy and media but cannot publish.</li>
          <li><span className="font-medium text-white">Reviewers</span> leave comments and approve drafts.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60">
        <header className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Current collaborators</h3>
          <span className="text-xs text-slate-500">{teamMembers.length} members</span>
        </header>
        <ul className="divide-y divide-slate-800/60">
          {teamMembers.map((member) => (
            <li key={member.email} className="flex flex-col gap-2 px-6 py-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{member.name}</p>
                <p className="text-xs text-slate-400">{member.email}</p>
              </div>
              <div className="flex items-center gap-6 text-xs text-slate-400">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] uppercase tracking-wide text-blue-100">
                  {member.role}
                </span>
                <span>Last active {member.lastActive}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <InviteCollaboratorForm />
    </div>
  );
}
