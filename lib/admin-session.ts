import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { getRedis } from "./kv";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const sessionKey = (rawToken: string) => `admin_session:${hash(rawToken)}`;

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  // Hash both sides first so the buffers compared are always equal-length
  // (timingSafeEqual throws on mismatched lengths, which a raw string
  // comparison would otherwise leak via a wrong-length guess).
  const inputDigest = createHash("sha256").update(input).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(inputDigest, expectedDigest);
}

export async function createAdminSession(): Promise<string> {
  const rawToken = randomBytes(32).toString("hex");
  await getRedis().set(
    sessionKey(rawToken),
    { createdAt: new Date().toISOString() },
    { ex: SESSION_TTL_SECONDS }
  );
  return rawToken;
}

export async function isValidAdminSession(
  rawToken: string | undefined | null
): Promise<boolean> {
  if (!rawToken) return false;
  const exists = await getRedis().get(sessionKey(rawToken));
  return exists !== null;
}

export async function destroyAdminSession(
  rawToken: string | undefined | null
): Promise<void> {
  if (!rawToken) return;
  await getRedis().del(sessionKey(rawToken));
}

/** Re-checks the admin session independently inside API routes rather than
 * trusting proxy alone (proxy's matcher only guards page navigation). */
export async function requireAdminSession(
  request: NextRequest
): Promise<boolean> {
  const rawToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidAdminSession(rawToken);
}
