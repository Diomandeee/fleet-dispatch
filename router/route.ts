import type {
  DispatchPlan,
  LaneContext,
  RouteRequest,
} from "../contract/types.js";

/**
 * Turn a RouteRequest into a DispatchPlan. No sends, only plans.
 * Bare `status` sets wantsOverview; unknown lanes and bare `help`
 * set helpText (prefix list) instead of routing.
 */
export function route(
  req: RouteRequest,
  contexts: LaneContext[],
): DispatchPlan {
  throw new Error("not implemented");
}
