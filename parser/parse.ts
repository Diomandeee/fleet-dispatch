import type { RouteRequest } from "../contract/types.js";

/** Parse one inbound text into a RouteRequest. Pure, no I/O. */
export function parse(raw: string): RouteRequest {
  throw new Error("not implemented");
}
