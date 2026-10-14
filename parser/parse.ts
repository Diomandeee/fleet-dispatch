import type { Lane, RouteRequest } from "../contract/types.js";

const KNOWN_PREFIXES: ReadonlySet<string> = new Set(["a", "b", "c", "f", "fleet", "me"]);

/** Parse one inbound text into a RouteRequest. Pure, no I/O. */
export function parse(raw: string): RouteRequest {
  const idx = raw.indexOf(":");
  if (idx !== -1) {
    const head = raw.slice(0, idx).trim();
    if (KNOWN_PREFIXES.has(head)) {
      return { lane: head as Lane, body: raw.slice(idx + 1).trim(), raw };
    }
  }
  return { lane: "me", body: raw.trim(), raw };
}
