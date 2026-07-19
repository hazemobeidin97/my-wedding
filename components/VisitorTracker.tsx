"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Invisible: fires a background beacon so every real visit gets logged for
// the admin-only dashboard. Skips /admin and /invite so the couple's own
// dashboard visits and the invite-gate redirects don't pollute the data.
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/invite")) return;
    fetch("/api/track", { method: "POST", keepalive: true }).catch(() => {});
  }, [pathname]);

  return null;
}
