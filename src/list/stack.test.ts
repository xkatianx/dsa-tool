import { beforeEach, describe, expect, it } from "bun:test";
import { Stack } from "./stack.js";

describe("Stack", () => {
  let stack: Stack<number>;
  let referenceArray: number[];

  beforeEach(() => {
    stack = new Stack<number>();
    referenceArray = [];
  });

  it("should initialize with length 0", () => {
    expect(stack.length).toBe(0);
    expect(stack.top).toBeUndefined();
  });

  it("should handle push and pop operations correctly", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.length).toBe(3);
    expect(stack.top).toBe(3);
    expect(stack.pop()).toBe(3);

    expect(stack.length).toBe(2);
    expect(stack.top).toBe(2);
    expect(stack.pop()).toBe(2);

    expect(stack.length).toBe(1);
    expect(stack.top).toBe(1);
    expect(stack.pop()).toBe(1);

    expect(stack.length).toBe(0);
    expect(stack.top).toBeUndefined();
    expect(stack.pop()).toBeUndefined(); // Popping from empty stack
  });

  it("should access elements using at method correctly", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.at(0)).toBe(1);
    expect(stack.at(1)).toBe(2);
    expect(stack.at(2)).toBe(3);
    expect(stack.at(3)).toBeUndefined(); // Out of bounds

    expect(stack.at(-1)).toBe(3);
    expect(stack.at(-2)).toBe(2);
    expect(stack.at(-3)).toBe(1);
    expect(stack.at(-4)).toBeUndefined(); // Out of bounds
  });

  it("should maintain consistency after multiple operations", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.length).toBe(3);
    expect(stack.top).toBe(3);

    stack.pop();
    stack.push(4);
    expect(stack.length).toBe(3);
    expect(stack.top).toBe(4);

    stack.pop();
    stack.pop();
    expect(stack.length).toBe(1);
    expect(stack.top).toBe(1);
  });

  it("should match behavior of a real array with random operations", () => {
    const operations = 1000;
    const maxValue = 1000;

    for (let i = 0; i < operations; i++) {
      const randomOperation = Math.random();
      if (randomOperation < 0.4) {
        // Push operation
        const value = Math.floor(Math.random() * maxValue);
        stack.push(value);
        referenceArray.push(value);
      } else if (randomOperation < 0.8) {
        // Pop operation
        const stackPop = stack.pop();
        const arrayPop = referenceArray.pop();
        expect(stackPop).toBe(arrayPop);
      } else {
        // Check length and top
        expect(stack.length).toBe(referenceArray.length);
        expect(stack.top).toBe(referenceArray.at(-1));
      }
    }

    // Final consistency check
    expect(stack.length).toBe(referenceArray.length);
    expect(stack.top).toBe(referenceArray.at(-1));
    for (let i = 0; i < stack.length; i++) {
      expect(stack.at(i)).toBe(referenceArray[i]);
    }
  });
});
