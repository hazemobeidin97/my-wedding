import { randomBytes, createHash } from "node:crypto";
import { getRedis } from "./kv";

export type Invite = {
  token: string;
  label: string;
  createdAt: string;
  browserTokenHash: string | null;
  registeredAt: string | null;
  firstVisitAt: string | null;
  lastVisitAt: string | null;
  visitCount: number;
  deniedAttempts: number;
  lastUserAgent: string | null;
  lastIp: string | null;
};

export type GateResult =
  | { status: "invalid" }
  | { status: "registered"; rawBrowserToken: string }
  | { status: "allowed" }
  | { status: "denied" };

const INDEX_KEY = "invites:all";
const inviteKey = (token: string) => `invite:${token}`;
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

// Link-preview crawlers (WhatsApp, iMessage, Slack, Telegram, ...) fetch the
// URL server-side before a human ever taps it. Treated as a real visit,
// that bot request would consume the "first visit registers this device"
// slot and lock the real guest out. This list can never be exhaustive; the
// admin Reset action is the safety net for anything that slips through.
const BOT_UA_PATTERN =
  /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegrambot|slackbot|linkedinbot|discordbot|twitterbot|skypeuripreview|embedly|quora link preview|vkshare|w3c_validator/i;

export function isBotRequest(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_UA_PATTERN.test(userAgent);
}

export async function createInvite(label: string): Promise<Invite> {
  const redis = getRedis();
  const token = randomBytes(9).toString("base64url");
  const invite: Invite = {
    token,
    label,
    createdAt: new Date().toISOString(),
    browserTokenHash: null,
    registeredAt: null,
    firstVisitAt: null,
    lastVisitAt: null,
    visitCount: 0,
    deniedAttempts: 0,
    lastUserAgent: null,
    lastIp: null,
  };

  await redis.set(inviteKey(token), invite);
  await redis.sadd(INDEX_KEY, token);
  return invite;
}

export async function getInvite(token: string): Promise<Invite | null> {
  const redis = getRedis();
  return (await redis.get<Invite>(inviteKey(token))) ?? null;
}

export async function listInvites(): Promise<Invite[]> {
  const redis = getRedis();
  const tokens = await redis.smembers(INDEX_KEY);
  if (tokens.length === 0) return [];

  const invites = await Promise.all(tokens.map((token) => getInvite(token)));
  return invites
    .filter((invite): invite is Invite => invite !== null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function resetInvite(token: string): Promise<void> {
  const invite = await getInvite(token);
  if (!invite) return;

  invite.browserTokenHash = null;
  invite.registeredAt = null;
  await getRedis().set(inviteKey(token), invite);
}

export async function deleteInvite(token: string): Promise<void> {
  const redis = getRedis();
  await redis.del(inviteKey(token));
  await redis.srem(INDEX_KEY, token);
}

/**
 * Core gate logic: registers the first real visit's browser, or verifies a
 * later visit against the previously registered device.
 */
export async function registerOrVerify(
  token: string,
  cookieBrowserToken: string | undefined,
  userAgent: string | null,
  ip: string | null
): Promise<GateResult> {
  const invite = await getInvite(token);
  if (!invite) return { status: "invalid" };

  const now = new Date().toISOString();
  const logIps = process.env.INVITE_LOG_IPS === "true";

  if (!invite.browserTokenHash) {
    const rawBrowserToken = randomBytes(32).toString("hex");
    invite.browserTokenHash = hash(rawBrowserToken);
    invite.registeredAt = now;
    invite.firstVisitAt = now;
    invite.lastVisitAt = now;
    invite.visitCount += 1;
    invite.lastUserAgent = userAgent;
    invite.lastIp = logIps ? ip : null;
    await getRedis().set(inviteKey(token), invite);
    return { status: "registered", rawBrowserToken };
  }

  const incomingHash = cookieBrowserToken ? hash(cookieBrowserToken) : null;
  if (incomingHash && incomingHash === invite.browserTokenHash) {
    invite.lastVisitAt = now;
    invite.visitCount += 1;
    invite.lastUserAgent = userAgent;
    invite.lastIp = logIps ? ip : null;
    await getRedis().set(inviteKey(token), invite);
    return { status: "allowed" };
  }

  invite.deniedAttempts += 1;
  await getRedis().set(inviteKey(token), invite);
  return { status: "denied" };
}
