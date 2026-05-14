import { beforeEach, describe, expect, it } from "bun:test";
import { FenwickTree } from "./FenwickTree.js";

describe("Fenwick Tree", () => {
  let bit: FenwickTree;

  beforeEach(() => {
    bit = new FenwickTree(10);
  });

  it("should initialize with zero sum", () => {
    expect(bit.query(10)).toBe(0); // The sum should be 0 initially
  });

  it("should update and query single elements correctly", () => {
    bit.update(1, 5);
    bit.update(2, 3);
    bit.update(3, 7);

    expect(bit.query(1)).toBe(5); // sum from index 1 to 1
    expect(bit.query(2)).toBe(8); // sum from index 1 to 2
    expect(bit.query(3)).toBe(15); // sum from index 1 to 3
  });

  it("should perform range queries correctly", () => {
    bit.update(1, 5);
    bit.update(2, 3);
    bit.update(3, 7);
    bit.update(4, 6);

    expect(bit.queryRange(1, 3)).toBe(15); // sum from index 1 to 3
    expect(bit.queryRange(2, 4)).toBe(16); // sum from index 2 to 4
  });

  it("should handle multiple updates and queries", () => {
    bit.update(5, 10);
    bit.update(3, 2);
    bit.update(7, 4);
    bit.update(5, -3); // Decrement the value at index 5

    expect(bit.query(5)).toBe(9); // sum from index 1 to 5 (10 - 3 + 2)
    expect(bit.query(7)).toBe(13); // sum from index 1 to 7 (10 - 3 + 2 + 4)
    expect(bit.queryRange(3, 7)).toBe(13); // sum from index 3 to 7 (2 + 0 + 0 + 4)
  });

  it("should handle edge cases for empty and full ranges", () => {
    expect(bit.queryRange(1, 1)).toBe(0); // Empty range before any updates
    bit.update(10, 1);
    expect(bit.queryRange(1, 10)).toBe(1); // Entire range after a single update at the end
  });

  it("should work with large indices", () => {
    bit = new FenwickTree(10000);
    bit.update(1000, 5);
    bit.update(5000, 10);
    bit.update(10000, 20);

    expect(bit.query(1000)).toBe(5); // sum from index 1 to 1000
    expect(bit.query(5000)).toBe(15); // sum from index 1 to 5000
    expect(bit.query(10000)).toBe(35); // sum from index 1 to 10000
    expect(bit.queryRange(5001, 10000)).toBe(20); // sum from index 5001 to 10000
  });
});
