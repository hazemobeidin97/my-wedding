"use client";

import { Fragment, useState } from "react";
import type { VisitEntry, VisitorRecord } from "@/lib/visitors";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const BORDER = "rgba(201,169,110,0.25)";
const ROW_BORDER = "rgba(201,169,110,0.12)";

export default function VisitorList({ visitors }: { visitors: VisitorRecord[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [history, setHistory] = useState<VisitEntry[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleToggle(visitorId: string) {
    if (openId === visitorId) {
      setOpenId(null);
      setHistory(null);
      return;
    }

    setOpenId(visitorId);
    setHistory(null);
    setLoading(true);
    const res = await fetch(`/api/admin/visitors/${visitorId}`);
    if (res.ok) {
      const data = await res.json();
      setHistory(data.history);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 text-pearl">
      <h1 className="font-heading text-2xl text-gold">Visitors</h1>
      <p className="mt-2 text-sm text-muted">
        {visitors.length} visitor{visitors.length === 1 ? "" : "s"} tracked
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-muted" style={{ borderColor: BORDER }}>
              <th className="py-2 pr-4">Visitor</th>
              <th className="py-2 pr-4">Invitation</th>
              <th className="py-2 pr-4">Location</th>
              <th className="py-2 pr-4">Browser</th>
              <th className="py-2 pr-4">Device</th>
              <th className="py-2 pr-4">Visits</th>
              <th className="py-2 pr-4">First visit</th>
              <th className="py-2 pr-4">Last visit</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-muted">
                  No visits yet.
                </td>
              </tr>
            )}
            {visitors.map((visitor) => (
              <Fragment key={visitor.visitorId}>
                <tr
                  onClick={() => handleToggle(visitor.visitorId)}
                  className="cursor-pointer border-b hover:bg-white/5"
                  style={{ borderColor: ROW_BORDER }}
                >
                  <td className="py-3 pr-4 font-mono text-xs" title={visitor.visitorId}>
                    {visitor.visitorId.slice(0, 8)}…
                  </td>
                  <td className="py-3 pr-4">{visitor.invitationId ?? "—"}</td>
                  <td className="py-3 pr-4">
                    {[visitor.city, visitor.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="py-3 pr-4">{visitor.browser ?? "—"}</td>
                  <td className="py-3 pr-4">{visitor.deviceType ?? "—"}</td>
                  <td className="py-3 pr-4">{visitor.visitCount}</td>
                  <td className="py-3 pr-4">{formatDate(visitor.firstVisit)}</td>
                  <td className="py-3 pr-4">{formatDate(visitor.lastVisit)}</td>
                </tr>
                {openId === visitor.visitorId && (
                  <tr key={`${visitor.visitorId}-detail`} className="border-b" style={{ borderColor: ROW_BORDER }}>
                    <td colSpan={8} className="bg-white/5 px-4 py-4">
                      {loading && <p className="text-muted">Loading history...</p>}
                      {!loading && history && history.length === 0 && (
                        <p className="text-muted">No visit history recorded.</p>
                      )}
                      {!loading && history && history.length > 0 && (
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="text-left text-muted">
                              <th className="py-1 pr-4">Timestamp</th>
                              <th className="py-1 pr-4">Invitation</th>
                              <th className="py-1 pr-4">Location</th>
                              <th className="py-1 pr-4">Browser</th>
                              <th className="py-1 pr-4">Device</th>
                            </tr>
                          </thead>
                          <tbody>
                            {history.map((entry, index) => (
                              <tr key={index}>
                                <td className="py-1 pr-4">{formatDate(entry.timestamp)}</td>
                                <td className="py-1 pr-4">{entry.invitationId ?? "—"}</td>
                                <td className="py-1 pr-4">
                                  {[entry.city, entry.country].filter(Boolean).join(", ") || "—"}
                                </td>
                                <td className="py-1 pr-4">{entry.browser ?? "—"}</td>
                                <td className="py-1 pr-4">{entry.deviceType ?? "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
