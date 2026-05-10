import { beforeEach, describe, expect, it } from "bun:test";
import { MonotonicStack } from "./monotonicStack";

describe("MonotonicStack", () => {
  /** Pop smaller tops while pushing larger values → strictly decreasing from bottom to top. */
  let stack: MonotonicStack<number>;

  beforeEach(() => {
    stack = new MonotonicStack<number>((newVal, topVal) => newVal > topVal);
  });

  it("maintains decreasing order per doc example", () => {
    stack.push(1);
    stack.push(4);
    stack.push(2);
    stack.push(3);

    expect(stack.length).toBe(2);
    expect(stack.at(0)).toBe(4);
    expect(stack.at(1)).toBe(3);
    expect(stack.top).toBe(3);
  });

  it("invokes onPop with pushing value and each popped top", () => {
    const pops: Array<{ pushing: number; popped: number }> = [];
    stack.onPop = (pushing, popped) => pops.push({ pushing, popped });

    stack.push(1);
    stack.push(4);
    expect(pops).toEqual([{ pushing: 4, popped: 1 }]);

    stack.push(2);
    expect(pops).toEqual([{ pushing: 4, popped: 1 }]);

    stack.push(3);
    expect(pops).toEqual([
      { pushing: 4, popped: 1 },
      { pushing: 3, popped: 2 },
    ]);
  });

  it("does not pop when condition is false", () => {
    stack.push(5);
    stack.push(3);

    expect(stack.length).toBe(2);
    expect(stack.top).toBe(3);
  });

  it("supports increasing monotonic stack via inverted condition", () => {
    const inc = new MonotonicStack<number>((newVal, topVal) => topVal > newVal);
    inc.push(3);
    inc.push(1);
    inc.push(4);

    expect(inc.length).toBe(2);
    expect(inc.at(0)).toBe(1);
    expect(inc.at(1)).toBe(4);
  });

  it("allows manual pop after monotonic pushes", () => {
    stack.push(1);
    stack.push(4);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(4);
    expect(stack.length).toBe(0);
  });

  it("handles empty stack", () => {
    expect(stack.length).toBe(0);
    expect(stack.top).toBeUndefined();
  });
});
