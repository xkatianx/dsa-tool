import { describe, expect, it } from "bun:test";
import { bfprt, median } from "./bfprt";

describe("BFPRT (Median of Medians) Algorithm", () => {
  it("Finds the k-th smallest element in an unsorted array", () => {
    const arr = [3, 1, 2, 2, 4, 3, 2];
    expect(bfprt(arr, 3)).toBe(2); // The 4th smallest element is 2
  });

  it("Works correctly with all unique elements", () => {
    const arr = [10, 4, 5, 8, 6, 11, 26];
    expect(bfprt(arr, 2)).toBe(6); // The 3rd smallest element is 6
  });

  it("Handles arrays with duplicate elements", () => {
    const arr = [7, 7, 3, 3, 3, 1, 9, 9];
    expect(bfprt(arr, 5)).toBe(7); // The 6th smallest element is 7
  });

  it("Handles arrays with all elements the same", () => {
    const arr = [5, 5, 5, 5, 5, 5, 5];
    expect(bfprt(arr, 3)).toBe(5); // Any k-th smallest element should be 5
  });

  it("Works with small arrays", () => {
    const arr = [42];
    expect(bfprt(arr, 0)).toBe(42); // The only element is the 1st smallest
  });

  it("Works with large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1).reverse();
    expect(bfprt(arr, 999)).toBe(1000); // The 1000th smallest element is 1000
  });

  it("Works with negative numbers", () => {
    const arr = [-10, -1, -5, -3, 0, 2, -7];
    expect(bfprt(arr, 4)).toBe(-1); // The 5th smallest element is -1
  });

  it("Finds the k-th smallest element when k is 0 (smallest element)", () => {
    const arr = [50, 20, 10, 40, 30];
    expect(bfprt(arr, 0)).toBe(10); // The smallest element is 10
  });

  it("Finds the k-th smallest element when k is n-1 (largest element)", () => {
    const arr = [50, 20, 10, 40, 30];
    expect(bfprt(arr, 4)).toBe(50); // The largest element is 50
  });
});

describe("median (BFPRT)", () => {
  it("returns the median for odd-length array", () => {
    expect(median([3, 1, 2, 4, 5])).toBe(3);
  });

  it("returns the larger middle element for even-length array", () => {
    expect(median([5, 3, 1, 4])).toBe(4); // sorted: [1,3,4,5] → index 2 is 4
  });

  it("returns the only element for a single-element array", () => {
    expect(median([42])).toBe(42);
  });

  it("returns the correct value for all repeated elements", () => {
    expect(median([7, 7, 7, 7, 7, 7])).toBe(7);
  });

  it("correctly handles negative numbers", () => {
    expect(median([-5, -2, -9, -4, -1])).toBe(-4);
  });

  it("correctly handles arrays with duplicates", () => {
    expect(median([2, 3, 3, 1, 2, 5, 4])).toBe(3);
  });
});
