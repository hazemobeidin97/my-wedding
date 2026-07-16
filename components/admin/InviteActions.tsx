"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Invite } from "@/lib/invites";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const BORDER = "rgba(201,169,110,0.25)";
const ROW_BORDER = "rgba(201,169,110,0.12)";

export default function InviteActions({ invites }: { invites: Invite[] }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [busyToken, setBusyToken] = useState<string | null>(null);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    if (!label.trim()) return;
    setCreating(true);
    await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: label.trim() }),
    });
    setLabel("");
    setCreating(false);
    router.refresh();
  }

  async function handleReset(token: string) {
    setBusyToken(token);
    await fetch(`/api/admin/invites/${token}`, { method: "POST" });
    setBusyToken(null);
    router.refresh();
  }

  async function handleDelete(token: string) {
    if (!confirm("Delete this invitation? This cannot be undone.")) return;
    setBusyToken(token);
    await fetch(`/api/admin/invites/${token}`, { method: "DELETE" });
    setBusyToken(null);
    router.refresh();
  }

  async function handleCopy(token: string) {
    const url = `${window.location.origin}/invite/${token}`;
    await navigator.clipboard.writeText(url);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-pearl">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-gold">Invitations</h1>
        <button onClick={handleLogout} className="text-sm text-muted underline">
          Log out
        </button>
      </div>

      <form onSubmit={handleCreate} className="mt-8 flex gap-3">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Guest label, e.g. Layla's parents"
          className="flex-1 rounded border bg-transparent px-3 py-2 text-sm outline-none"
          style={{ borderColor: BORDER }}
        />
        <button
          type="submit"
          disabled={creating || !label.trim()}
          className="rounded bg-gold-dk px-4 py-2 text-sm font-medium text-deep disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create invite"}
        </button>
      </form>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-muted" style={{ borderColor: BORDER }}>
              <th className="py-2 pr-4">Label</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">First visit</th>
              <th className="py-2 pr-4">Last visit</th>
              <th className="py-2 pr-4">Visits</th>
              <th className="py-2 pr-4">Denied</th>
              <th className="py-2 pr-4">Last device</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-muted">
                  No invitations yet.
                </td>
              </tr>
            )}
            {invites.map((invite) => (
              <tr key={invite.token} className="border-b" style={{ borderColor: ROW_BORDER }}>
                <td className="py-3 pr-4">{invite.label}</td>
                <td className="py-3 pr-4">
                  {invite.registeredAt ? "Registered" : "Not opened yet"}
                </td>
                <td className="py-3 pr-4">{formatDate(invite.firstVisitAt)}</td>
                <td className="py-3 pr-4">{formatDate(invite.lastVisitAt)}</td>
                <td className="py-3 pr-4">{invite.visitCount}</td>
                <td className="py-3 pr-4">{invite.deniedAttempts}</td>
                <td
                  className="py-3 pr-4 max-w-[200px] truncate"
                  title={invite.lastUserAgent ?? undefined}
                >
                  {invite.lastUserAgent ?? "—"}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleCopy(invite.token)} className="text-gold underline">
                      Copy link
                    </button>
                    <button
                      onClick={() => handleReset(invite.token)}
                      disabled={busyToken === invite.token}
                      className="text-muted underline disabled:opacity-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => handleDelete(invite.token)}
                      disabled={busyToken === invite.token}
                      className="text-rose-deep underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
