import { beforeEach, describe, expect, it } from "bun:test";
import { MinStack } from "./minStack";

describe("MinStack", () => {
  let minStack: MinStack<number>;

  beforeEach(() => {
    minStack = new MinStack<number>((a, b) => a - b);
  });

  it("should push elements and track the minimum", () => {
    minStack.push(5);
    minStack.push(3);
    minStack.push(7);
    minStack.push(2);

    expect(minStack.top).toBe(2);
    expect(minStack.min).toBe(2);
    expect(minStack.length).toBe(4);
  });

  it("should pop elements and update the minimum", () => {
    minStack.push(5);
    minStack.push(3);
    minStack.push(7);
    minStack.push(2);

    expect(minStack.pop()).toBe(2);
    expect(minStack.min).toBe(3);
    expect(minStack.length).toBe(3);

    expect(minStack.pop()).toBe(7);
    expect(minStack.min).toBe(3);
    expect(minStack.length).toBe(2);

    expect(minStack.pop()).toBe(3);
    expect(minStack.min).toBe(5);
    expect(minStack.length).toBe(1);
  });

  it("should handle duplicate elements correctly", () => {
    minStack.push(2);
    minStack.push(2);
    minStack.push(3);
    minStack.push(1);

    expect(minStack.min).toBe(1);

    minStack.pop();
    expect(minStack.min).toBe(2);

    minStack.pop();
    expect(minStack.min).toBe(2);
  });

  it("should handle edge case with a single element", () => {
    minStack.push(42);

    expect(minStack.top).toBe(42);
    expect(minStack.min).toBe(42);
    expect(minStack.length).toBe(1);

    minStack.pop();
    expect(minStack.top).toBeUndefined();
    expect(minStack.min).toBeUndefined();
    expect(minStack.length).toBe(0);
  });

  it("should handle empty stack correctly", () => {
    expect(minStack.top).toBeUndefined();
    expect(minStack.min).toBeUndefined();
    expect(minStack.length).toBe(0);
    expect(minStack.pop()).toBeUndefined();
  });

  it("should access elements at specific index", () => {
    minStack.push(10);
    minStack.push(20);
    minStack.push(30);

    expect(minStack.at(0)).toBe(10);
    expect(minStack.at(1)).toBe(20);
    expect(minStack.at(2)).toBe(30);
    expect(minStack.at(3)).toBeUndefined(); // Out of bounds
  });

  it("should work with custom compare function", () => {
    const stringStack = new MinStack<string>((a, b) => a.localeCompare(b));
    stringStack.push("apple");
    stringStack.push("banana");
    stringStack.push("apricot");

    expect(stringStack.min).toBe("apple"); // 'apple' is lexicographically smallest
    stringStack.pop();
    expect(stringStack.min).toBe("apple"); // Still 'apple'
    stringStack.pop();
    expect(stringStack.min).toBe("apple"); // Still 'apple'
  });
});
