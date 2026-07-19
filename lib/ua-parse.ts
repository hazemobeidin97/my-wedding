// Minimal dependency-free User-Agent parsing for visitor tracking.
// Order matters: Edge/Opera/Chrome UAs also match "Safari", so the more
// specific checks must run first.

export function parseBrowser(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/OPR\/|Opera/.test(userAgent)) return "Opera";
  if (/CriOS\//.test(userAgent)) return "Chrome";
  if (/FxiOS\//.test(userAgent)) return "Firefox";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Version\/.*Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

export type DeviceType = "Desktop" | "Mobile" | "Tablet";

export function parseDeviceType(userAgent: string | null): DeviceType {
  if (!userAgent) return "Desktop";
  if (/iPad|Tablet|(Android(?!.*Mobile))/i.test(userAgent)) return "Tablet";
  if (/Mobi|iPhone|Android/i.test(userAgent)) return "Mobile";
  return "Desktop";
}
