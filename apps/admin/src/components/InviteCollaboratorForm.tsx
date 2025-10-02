"use client";

import { FormEvent, useState } from "react";

const roles = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Content editor" },
  { value: "reviewer", label: "Reviewer" },
];

export default function InviteCollaboratorForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(roles[1]?.value ?? "editor");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setStatus("Add an email address before sending an invite.");
      return;
    }
    setStatus(`Invitation drafted for ${email} with the ${roles.find((item) => item.value === role)?.label ?? role} role.`);
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6"
    >
      <div>
        <label htmlFor="invite-email" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Collaborator email
        </label>
        <input
          id="invite-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="alex@company.com"
          className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          required
        />
      </div>
      <div>
        <label htmlFor="invite-role" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Access level
        </label>
        <select
          id="invite-role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          {roles.map((item) => (
            <option key={item.value} value={item.value} className="bg-slate-950 text-slate-100">
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
        >
          Send invite
        </button>
      </div>
      {status && (
        <p className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-xs text-blue-100">{status}</p>
      )}
    </form>
  );
}
