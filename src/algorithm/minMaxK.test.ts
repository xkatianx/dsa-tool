import { describe, expect, it } from "bun:test";
import { minMaxK } from "./minMaxK.js";

describe("minMaxK", () => {
  it("should return the first k min/max unique values in order with their amounts", () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const k = 3;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([
      { value: 1, amount: 2 },
      { value: 2, amount: 1 },
      { value: 3, amount: 2 },
    ]);

    expect(result.max).toEqual([
      { value: 9, amount: 1 },
      { value: 6, amount: 1 },
      { value: 5, amount: 3 },
    ]);
  });

  it("should handle arrays with less than k unique values", () => {
    const arr = [2, 2, 2, 2];
    const k = 3;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([
      { value: 2, amount: 4 },
      { value: Infinity, amount: 0 },
      { value: Infinity, amount: 0 },
    ]);

    expect(result.max).toEqual([
      { value: 2, amount: 4 },
      { value: -Infinity, amount: 0 },
      { value: -Infinity, amount: 0 },
    ]);
  });

  it("should handle empty array", () => {
    const arr: number[] = [];
    const k = 3;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([
      { value: Infinity, amount: 0 },
      { value: Infinity, amount: 0 },
      { value: Infinity, amount: 0 },
    ]);

    expect(result.max).toEqual([
      { value: -Infinity, amount: 0 },
      { value: -Infinity, amount: 0 },
      { value: -Infinity, amount: 0 },
    ]);
  });

  it("should handle arrays with negative numbers", () => {
    const arr = [-5, -1, -3, -2, -4];
    const k = 2;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([
      { value: -5, amount: 1 },
      { value: -4, amount: 1 },
    ]);

    expect(result.max).toEqual([
      { value: -1, amount: 1 },
      { value: -2, amount: 1 },
    ]);
  });

  it("should handle arrays with k = 1", () => {
    const arr = [7, 3, 8, 3, 9, 1];
    const k = 1;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([{ value: 1, amount: 1 }]);

    expect(result.max).toEqual([{ value: 9, amount: 1 }]);
  });

  it("should return the first k min/max unique values in order with duplicates handled", () => {
    const arr = [10, 10, 9, 9, 8, 8, 7, 7];
    const k = 3;
    const result = minMaxK(arr, k);

    expect(result.min).toEqual([
      { value: 7, amount: 2 },
      { value: 8, amount: 2 },
      { value: 9, amount: 2 },
    ]);

    expect(result.max).toEqual([
      { value: 10, amount: 2 },
      { value: 9, amount: 2 },
      { value: 8, amount: 2 },
    ]);
  });
});
