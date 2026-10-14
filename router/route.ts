import type {
  DispatchPlan,
  LaneContext,
  RouteRequest,
} from "../contract/types.js";

const HELP_TEXT = [
  "a: music / audio lane",
  "b: visual / finishing lane",
  "c: photo / capture lane",
  "f: craft / unity lane",
  "fleet: broadcast to all lanes",
  "me: note to operator log",
  "status: watch overview request",
  "help: prefix listing",
].join("\n");

const KNOWN_LANES = new Set(["a", "b", "c", "f", "fleet", "me"]);

function contextFor(
  lane: string,
  contexts: LaneContext[],
): string {
  const hit = contexts.find((c) => c.lane === lane);
  return hit ? hit.context : "";
}

/**
 * Turn a RouteRequest into a DispatchPlan. No sends, only plans.
 * Bare `status` sets wantsOverview; unknown lanes and bare `help`
 * set helpText (prefix list) instead of routing.
 */
export function route(
  req: RouteRequest,
  contexts: LaneContext[],
): DispatchPlan {
  const body = req.body.trim();

  if (!KNOWN_LANES.has(req.lane)) {
    return {
      targets: [],
      receipt: `unknown lane '${req.lane}' — showing help`,
      wantsOverview: false,
      helpText: HELP_TEXT,
    };
  }

  if (req.lane === "me" && body.toLowerCase() === "status") {
    return {
      targets: [],
      receipt: "overview requested",
      wantsOverview: true,
      helpText: null,
    };
  }

  if (req.lane === "me" && body.toLowerCase() === "help") {
    return {
      targets: [],
      receipt: "help requested",
      wantsOverview: false,
      helpText: HELP_TEXT,
    };
  }

  if (req.lane === "fleet") {
    return {
      targets: contexts.map((c) => ({
        lane: c.lane,
        body: req.body,
        context: c.context,
      })),
      receipt: `fleet broadcast → ${contexts.map((c) => c.lane).join(", ") || "(no lanes)"}`,
      wantsOverview: false,
      helpText: null,
    };
  }

  return {
    targets: [
      { lane: req.lane, body: req.body, context: contextFor(req.lane, contexts) },
    ],
    receipt: `routed → ${req.lane}`,
    wantsOverview: false,
    helpText: null,
  };
}
