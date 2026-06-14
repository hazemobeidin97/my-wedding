import type { en } from "./en";

// Widen every literal string in the `en` dictionary to `string`, so `ar.ts`
// (and any other locale) can provide its own translated values.
type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Dictionary = DeepString<typeof en>;
export type Locale = "en" | "ar";
