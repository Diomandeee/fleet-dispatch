import { describe, expect, it } from "vitest";
import { route } from "./route.js";
import type { LaneContext } from "../contract/types.js";

const CTX: LaneContext[] = [
  { lane: "a", context: "mixing live" },
  { lane: "b", context: "grading" },
];

describe("route", () => {
  it("routes a lane message with its context attached", () => {
    const p = route({ lane: "a", body: "drop it", raw: "a: drop it" }, CTX);
    expect(p.targets).toEqual([
      { lane: "a", body: "drop it", context: "mixing live" },
    ]);
    expect(p.wantsOverview).toBe(false);
    expect(p.helpText).toBeNull();
    expect(p.receipt).toContain("a");
  });
  it("fans fleet out to every known lane", () => {
    const p = route({ lane: "fleet", body: "go", raw: "fleet: go" }, CTX);
    expect(p.targets.map((t) => t.lane).sort()).toEqual(["a", "b"]);
    expect(p.targets[0].context.length).toBeGreaterThan(0);
  });
  it("bare status asks for the overview, not a lane", () => {
    const p = route({ lane: "me", body: "status", raw: "status" }, CTX);
    expect(p.wantsOverview).toBe(true);
    expect(p.targets).toEqual([]);
  });
  it("bare help returns the prefix list", () => {
    const p = route({ lane: "me", body: "help", raw: "help" }, CTX);
    expect(p.helpText).toContain("a:");
    expect(p.helpText).toContain("fleet:");
    expect(p.targets).toEqual([]);
  });
  it("a lane with no registered context still routes, context empty", () => {
    const p = route({ lane: "c", body: "snap", raw: "c: snap" }, CTX);
    expect(p.targets).toEqual([{ lane: "c", body: "snap", context: "" }]);
  });
});
