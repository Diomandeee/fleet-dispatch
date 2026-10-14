export type Lane = "a" | "b" | "c" | "f" | "fleet" | "me";

export interface RouteRequest {
  lane: Lane;
  body: string;
  raw: string;
}

export interface LaneContext {
  lane: Exclude<Lane, "fleet" | "me">;
  /** What this lane is currently doing; appended behind every route. */
  context: string;
}

export interface DispatchPlan {
  targets: { lane: string; body: string; context: string }[];
  /** Operator-visible one-liner describing where the message went. */
  receipt: string;
  /** True when the message is a bare `status` command: answer with overview. */
  wantsOverview: boolean;
  /** Set (never a guess-route) for unknown prefixes and bare `help`. */
  helpText: string | null;
}

export interface LaneStatus {
  lane: string;
  state: string;
  detail?: string;
}
