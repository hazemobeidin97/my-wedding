import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleInviteGate } from "./lib/invite-gate";
import { handleAdminAuth } from "./lib/admin-guard";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/invite/")) {
    return handleInviteGate(request);
  }

  if (pathname.startsWith("/admin")) {
    return handleAdminAuth(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/invite/:path*", "/admin/:path*"],
};
