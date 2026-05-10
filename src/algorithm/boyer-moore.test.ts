import { describe, expect, it } from "bun:test";
import { boyerMoore } from "./boyer-moore";

describe("Boyer-Moore (majority vote)", () => {
  it("returns the element that appears more than n/2 times", () => {
    expect(boyerMoore([1, 2, 1, 1, 3, 1, 1])).toBe(1);
  });

  it("returns null when no strict majority exists", () => {
    expect(boyerMoore([1, 2, 3])).toBeNull();
    expect(boyerMoore([1, 1, 2, 2])).toBeNull();
  });

  it("returns the only element in a length-1 array", () => {
    expect(boyerMoore([42])).toBe(42);
  });

  it("returns null for an empty array", () => {
    expect(boyerMoore([])).toBeNull();
  });

  it("returns the value when all elements are equal", () => {
    expect(boyerMoore([7, 7, 7, 7])).toBe(7);
  });

  it("works with non-numeric values", () => {
    expect(boyerMoore(["a", "b", "a", "a", "a"])).toBe("a");
  });
});
