import type { LaneStatus } from "../contract/types.js";

/** Render the morning check-in digest. Newest-relevant first, one line per lane. */
export function digest(statuses: LaneStatus[]): string {
  throw new Error("not implemented");
}
