import { getRedis } from "./kv";

export type VisitorRecord = {
  visitorId: string;
  invitationId: string | null;
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
  country: string | null;
  city: string | null;
  browser: string | null;
  deviceType: string | null;
};

export type VisitEntry = {
  timestamp: string;
  invitationId: string | null;
  country: string | null;
  city: string | null;
  browser: string | null;
  deviceType: string | null;
};

const INDEX_KEY = "visitors:all";
const visitorKey = (id: string) => `visitor:${id}`;
const historyKey = (id: string) => `visitor:${id}:history`;

// Caps how many entries we keep per visitor so a returning guest can't grow
// the list unboundedly over the site's ~4 week lifetime.
const HISTORY_LIMIT = 200;

export async function recordVisit(params: {
  visitorId: string;
  invitationId: string | null;
  country: string | null;
  city: string | null;
  browser: string | null;
  deviceType: string | null;
}): Promise<VisitorRecord> {
  const redis = getRedis();
  const now = new Date().toISOString();
  const existing = await redis.get<VisitorRecord>(visitorKey(params.visitorId));

  const record: VisitorRecord = {
    visitorId: params.visitorId,
    invitationId: params.invitationId ?? existing?.invitationId ?? null,
    firstVisit: existing?.firstVisit ?? now,
    lastVisit: now,
    visitCount: (existing?.visitCount ?? 0) + 1,
    country: params.country ?? existing?.country ?? null,
    city: params.city ?? existing?.city ?? null,
    browser: params.browser,
    deviceType: params.deviceType,
  };

  await redis.set(visitorKey(params.visitorId), record);
  await redis.sadd(INDEX_KEY, params.visitorId);

  const entry: VisitEntry = {
    timestamp: now,
    invitationId: record.invitationId,
    country: record.country,
    city: record.city,
    browser: record.browser,
    deviceType: record.deviceType,
  };
  await redis.lpush(historyKey(params.visitorId), entry);
  await redis.ltrim(historyKey(params.visitorId), 0, HISTORY_LIMIT - 1);

  return record;
}

export async function listVisitors(): Promise<VisitorRecord[]> {
  const redis = getRedis();
  const ids = await redis.smembers(INDEX_KEY);
  if (ids.length === 0) return [];

  const records = await Promise.all(
    ids.map((id) => redis.get<VisitorRecord>(visitorKey(id)))
  );
  return records
    .filter((record): record is VisitorRecord => record !== null)
    .sort((a, b) => b.lastVisit.localeCompare(a.lastVisit));
}

export async function getVisitor(visitorId: string): Promise<VisitorRecord | null> {
  return (await getRedis().get<VisitorRecord>(visitorKey(visitorId))) ?? null;
}

export async function getVisitorHistory(visitorId: string): Promise<VisitEntry[]> {
  const redis = getRedis();
  return await redis.lrange<VisitEntry>(historyKey(visitorId), 0, HISTORY_LIMIT - 1);
}
