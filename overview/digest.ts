import type { LaneStatus } from "../contract/types.js";

/** Render the morning check-in digest. Newest-relevant first, one line per lane. */
export function digest(statuses: LaneStatus[]): string {
  if (statuses.length === 0) return "nothing to report — fleet is quiet";
  return statuses
    .map((s) => (s.detail ? `${s.lane}: ${s.state} — ${s.detail}` : `${s.lane}: ${s.state}`))
    .join("\n");
}
