import type { CompareFn } from "../type";
import { Deque } from "./deque";
import { MinStack } from "./minStack";

export class MinDeque<T> extends Deque<T> {
  protected override left: MinStack<T>;
  protected override right: MinStack<T>;

  constructor(private compare: CompareFn<T>) {
    super();
    this.left = new MinStack<T>(compare);
    this.right = new MinStack<T>(compare);
  }

  /** Get the current minimum. Time: O(1) + O(`compare`) */
  get min() {
    if (this.left.min == null) return this.right.min;
    if (this.right.min == null) return this.left.min;
    return this.compare(this.left.min, this.right.min) <= 0
      ? this.left.min
      : this.right.min;
  }

  protected override moveLeft() {
    const newLeft = new MinStack<T>(this.compare);
    const newRight = new MinStack<T>(this.compare);
    const mid = Math.ceil(this.length / 2);
    for (let i = mid - 1; i >= 0; i--) {
      // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be in bounds
      newLeft.push(this.right.at(i)!);
    }
    for (let i = mid; i < this.right.length; i++) {
      // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be in bounds
      newRight.push(this.right.at(i)!);
    }
    this.left = newLeft;
    this.right = newRight;
  }
}
