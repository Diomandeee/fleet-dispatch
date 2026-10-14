import { describe, expect, it } from "vitest";
import { parse } from "./parse.js";

describe("parse", () => {
  it("routes known prefixes", () => {
    expect(parse("a: hello")).toMatchObject({ lane: "a", body: "hello" });
    expect(parse("b: grade it")).toMatchObject({ lane: "b", body: "grade it" });
    expect(parse("c: snap").body).toBe("snap");
    expect(parse("f: build").lane).toBe("f");
    expect(parse("fleet: all hands").lane).toBe("fleet");
    expect(parse("me: note to self").lane).toBe("me");
  });
  it("trims the body but keeps the raw text", () => {
    const r = parse("a:   spaced out   ");
    expect(r.body).toBe("spaced out");
    expect(r.raw).toBe("a:   spaced out   ");
  });
  it("bare text with no prefix is an operator note", () => {
    expect(parse("just thinking")).toMatchObject({ lane: "me", body: "just thinking" });
  });
  it("bare status/help pass through as operator notes", () => {
    expect(parse("status")).toMatchObject({ lane: "me", body: "status" });
    expect(parse("help")).toMatchObject({ lane: "me", body: "help" });
  });
  it("unknown prefix never guesses a lane", () => {
    const r = parse("z: huh?");
    expect(r.lane).toBe("me");
    expect(r.body).toBe("z: huh?");
  });
  it("empty input is an empty operator note", () => {
    expect(parse("   ")).toMatchObject({ lane: "me", body: "" });
  });
});
