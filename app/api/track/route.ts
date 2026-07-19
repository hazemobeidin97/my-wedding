import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBotRequest } from "@/lib/invites";
import { parseBrowser, parseDeviceType } from "@/lib/ua-parse";
import { recordVisit } from "@/lib/visitors";

export const VISITOR_ID_COOKIE = "vid";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Any restricted-invite cookie is named `wi_{token}`; the token itself is
// the invitation id, so we can read it off the cookie name without a
// separate Redis lookup. See lib/invite-gate.ts for where it's set.
function readInvitationId(request: NextRequest): string | null {
  for (const cookie of request.cookies.getAll()) {
    if (cookie.name.startsWith("wi_")) {
      return cookie.name.slice("wi_".length);
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");

  // Link-preview bots and other crawlers aren't real visits.
  if (isBotRequest(userAgent)) {
    return NextResponse.json({ ok: true });
  }

  const existingVisitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
  const visitorId = existingVisitorId ?? randomUUID();

  const country = request.headers.get("x-vercel-ip-country");
  const rawCity = request.headers.get("x-vercel-ip-city");
  const city = rawCity ? decodeURIComponent(rawCity) : null;

  await recordVisit({
    visitorId,
    invitationId: readInvitationId(request),
    country,
    city,
    browser: parseBrowser(userAgent),
    deviceType: parseDeviceType(userAgent),
  });

  const response = NextResponse.json({ ok: true });
  if (!existingVisitorId) {
    response.cookies.set(VISITOR_ID_COOKIE, visitorId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
    });
  }
  return response;
}
