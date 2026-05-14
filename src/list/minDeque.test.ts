import { beforeEach, describe, expect, it } from "bun:test";
import { MinDeque } from "./minDeque.js";

describe("MinDeque", () => {
  let minDeque: MinDeque<number>;

  beforeEach(() => {
    minDeque = new MinDeque<number>((a, b) => a - b);
  });

  it("should push and pop elements correctly", () => {
    minDeque.push(5);
    minDeque.push(3);
    minDeque.push(7);

    expect(minDeque.length).toBe(3);
    expect(minDeque.last).toBe(7);
    expect(minDeque.min).toBe(3);

    expect(minDeque.pop()).toBe(7);
    expect(minDeque.length).toBe(2);
    expect(minDeque.min).toBe(3);
  });

  it("should unshift and shift elements correctly", () => {
    minDeque.unshift(4);
    minDeque.unshift(2);
    minDeque.unshift(6);

    expect(minDeque.length).toBe(3);
    expect(minDeque.first).toBe(6);
    expect(minDeque.min).toBe(2);

    expect(minDeque.shift()).toBe(6);
    expect(minDeque.length).toBe(2);
    expect(minDeque.min).toBe(2);
  });

  it("should correctly handle mixed push and unshift", () => {
    minDeque.push(5);
    minDeque.unshift(3);
    minDeque.push(8);
    minDeque.unshift(1);

    expect(minDeque.length).toBe(4);
    expect(minDeque.first).toBe(1);
    expect(minDeque.last).toBe(8);
    expect(minDeque.min).toBe(1);

    expect(minDeque.pop()).toBe(8);
    expect(minDeque.shift()).toBe(1);
    expect(minDeque.min).toBe(3);
  });

  it("should handle empty deque correctly", () => {
    expect(minDeque.length).toBe(0);
    expect(minDeque.first).toBeUndefined();
    expect(minDeque.last).toBeUndefined();
    expect(minDeque.min).toBeUndefined();

    expect(minDeque.pop()).toBeUndefined();
    expect(minDeque.shift()).toBeUndefined();
  });

  it("should correctly find the minimum element", () => {
    minDeque.push(10);
    minDeque.push(5);
    minDeque.push(20);
    minDeque.push(15);

    expect(minDeque.min).toBe(5);

    minDeque.shift();
    expect(minDeque.min).toBe(5);

    minDeque.shift();
    expect(minDeque.min).toBe(15);

    minDeque.pop();
    expect(minDeque.min).toBe(20);
  });

  it("should iterate elements correctly using iter", () => {
    minDeque.push(1);
    minDeque.push(2);
    minDeque.push(3);

    const iterResult = Array.from(minDeque.iter());
    expect(iterResult).toEqual([
      [1, 0, minDeque],
      [2, 1, minDeque],
      [3, 2, minDeque],
    ]);
  });

  it("should iterate elements correctly using iterRight", () => {
    minDeque.push(1);
    minDeque.push(2);
    minDeque.push(3);

    const iterRightResult = Array.from(minDeque.iterRight());
    expect(iterRightResult).toEqual([
      [3, 0, minDeque],
      [2, 1, minDeque],
      [1, 2, minDeque],
    ]);
  });

  it("should handle custom comparison functions", () => {
    const stringDeque = new MinDeque<string>((a, b) => a.length - b.length);
    stringDeque.push("apple");
    stringDeque.push("banana");
    stringDeque.unshift("kiwi");

    expect(stringDeque.min).toBe("kiwi"); // 'kiwi' is the shortest string

    stringDeque.pop();
    expect(stringDeque.min).toBe("kiwi"); // Still 'kiwi'

    stringDeque.shift();
    expect(stringDeque.min).toBe("apple"); // 'apple' is now the shortest
  });
});
