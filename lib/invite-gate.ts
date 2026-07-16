import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBotRequest, registerOrVerify } from "./invites";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function handleInviteGate(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Avoid the matcher looping on its own denied-page destination.
  if (pathname === "/invite/denied") {
    return NextResponse.next();
  }

  const token = pathname.split("/")[2];
  if (!token) {
    return NextResponse.redirect(
      new URL("/invite/denied?reason=invalid", request.url)
    );
  }

  const userAgent = request.headers.get("user-agent");

  // Link-preview bots (WhatsApp, iMessage, Slack, ...) fetch the URL
  // server-side with no cookie before a human ever taps it. Let them
  // through without touching Redis so they don't consume the "first visit
  // registers this device" slot.
  if (isBotRequest(userAgent)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const cookieName = `wi_${token}`;
  const cookieValue = request.cookies.get(cookieName)?.value;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null;

  const result = await registerOrVerify(token, cookieValue, userAgent, ip);

  switch (result.status) {
    case "invalid":
      return NextResponse.redirect(
        new URL("/invite/denied?reason=invalid", request.url)
      );
    case "denied": {
      const url = new URL("/invite/denied", request.url);
      url.searchParams.set("reason", "denied");
      url.searchParams.set("label", result.label);
      return NextResponse.redirect(url);
    }
    case "registered": {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.set(cookieName, result.rawBrowserToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: ONE_YEAR_SECONDS,
      });
      return response;
    }
    case "allowed":
      return NextResponse.redirect(new URL("/", request.url));
    default:
      return NextResponse.next();
  }
}
