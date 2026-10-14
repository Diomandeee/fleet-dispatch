import { describe, expect, it } from "vitest";
import { digest } from "./digest.js";

describe("digest", () => {
  it("renders one line per lane with state", () => {
    const out = digest([
      { lane: "a", state: "live", detail: "mixing" },
      { lane: "b", state: "idle" },
    ]);
    expect(out).toContain("a");
    expect(out).toContain("live");
    expect(out).toContain("mixing");
    expect(out).toContain("b");
    expect(out).toContain("idle");
  });
  it("empty fleet says so instead of blank output", () => {
    expect(digest([]).length).toBeGreaterThan(0);
  });
});
