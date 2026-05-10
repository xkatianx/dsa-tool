import { beforeEach, describe, expect, it } from "bun:test";
import { Deque } from "./deque";

describe("Deque", () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  it("should initialize with length 0", () => {
    expect(deque.length).toBe(0);
    expect(deque.first).toBeUndefined();
    expect(deque.last).toBeUndefined();
  });

  it("should handle push and pop operations correctly", () => {
    deque.push(1);
    deque.push(2);
    deque.push(3);

    expect(deque.length).toBe(3);
    expect(deque.last).toBe(3);
    expect(deque.first).toBe(1);

    expect(deque.pop()).toBe(3);
    expect(deque.pop()).toBe(2);
    expect(deque.pop()).toBe(1);
    expect(deque.pop()).toBeUndefined(); // Popping from empty deque

    expect(deque.length).toBe(0);
    expect(deque.first).toBeUndefined();
    expect(deque.last).toBeUndefined();
  });

  it("should handle unshift and shift operations correctly", () => {
    deque.unshift(1);
    deque.unshift(2);
    deque.unshift(3);

    expect(deque.length).toBe(3);
    expect(deque.first).toBe(3);
    expect(deque.last).toBe(1);

    expect(deque.shift()).toBe(3);
    expect(deque.shift()).toBe(2);
    expect(deque.shift()).toBe(1);
    expect(deque.shift()).toBeUndefined(); // Shifting from empty deque

    expect(deque.length).toBe(0);
    expect(deque.first).toBeUndefined();
    expect(deque.last).toBeUndefined();
  });

  it("should handle mixed push, unshift, pop, and shift operations", () => {
    deque.push(1);
    deque.unshift(2);
    deque.push(3);
    deque.unshift(4);

    expect(deque.length).toBe(4);
    expect(deque.first).toBe(4);
    expect(deque.last).toBe(3);

    expect(deque.shift()).toBe(4);
    expect(deque.pop()).toBe(3);

    expect(deque.length).toBe(2);
    expect(deque.first).toBe(2);
    expect(deque.last).toBe(1);
  });

  it("should access elements using at method correctly", () => {
    deque.push(1);
    deque.push(2);
    deque.push(3);

    expect(deque.at(0)).toBe(1);
    expect(deque.at(1)).toBe(2);
    expect(deque.at(2)).toBe(3);
    expect(deque.at(3)).toBeUndefined(); // Out of bounds

    expect(deque.at(-1)).toBe(3);
    expect(deque.at(-2)).toBe(2);
    expect(deque.at(-3)).toBe(1);
    expect(deque.at(-4)).toBeUndefined(); // Out of bounds
  });

  it("should iterate correctly using iter method", () => {
    deque.push(1);
    deque.push(2);
    deque.push(3);

    const iterResult = Array.from(deque.iter());
    expect(iterResult).toEqual([
      [1, 0, deque],
      [2, 1, deque],
      [3, 2, deque],
    ]);
  });

  it("should iterate correctly using iterRight method", () => {
    deque.push(1);
    deque.push(2);
    deque.push(3);

    const iterRightResult = Array.from(deque.iterRight());
    expect(iterRightResult).toEqual([
      [3, 0, deque],
      [2, 1, deque],
      [1, 2, deque],
    ]);
  });

  it("should maintain consistency after multiple operations", () => {
    deque.push(1);
    deque.unshift(2);
    deque.push(3);
    deque.unshift(4);
    deque.push(5);

    expect(deque.length).toBe(5);
    expect(deque.first).toBe(4);
    expect(deque.last).toBe(5);

    expect(deque.pop()).toBe(5);
    expect(deque.shift()).toBe(4);
    expect(deque.pop()).toBe(3);
    expect(deque.shift()).toBe(2);
    expect(deque.pop()).toBe(1);

    expect(deque.length).toBe(0);
    expect(deque.first).toBeUndefined();
    expect(deque.last).toBeUndefined();
  });

  it("should match behavior of a real array with random operations", () => {
    const arr: number[] = [];
    const operations = 5000;
    const values = () =>
      Array.from({ length: deque.length }, (_, i) => deque.at(i));
    for (let i = 0; i < operations; ++i) {
      const op = Math.random();
      const val = Math.floor(Math.random() * 1000);
      if (op < 0.3) {
        // Push to end
        deque.push(val);
        arr.push(val);
      } else if (op < 0.6) {
        // Unshift to front
        deque.unshift(val);
        arr.unshift(val);
      } else if (op < 0.8) {
        // Pop from end
        expect(deque.pop()).toBe(arr.pop());
      } else {
        // Shift from front
        expect(deque.shift()).toBe(arr.shift());
      }
      // After each operation, check length, first, last, and contents
      expect(deque.length).toBe(arr.length);
      expect(deque.first).toBe(arr[0]);
      expect(deque.last).toBe(arr[arr.length - 1]);
      expect(values()).toEqual(arr);
    }
  });
});
