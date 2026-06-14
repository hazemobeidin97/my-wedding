import { en } from "./en";
import { ar } from "./ar";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

export type { Dictionary, Locale };
export { en, ar };
