import type { CompareFn } from "../type";
import { Stack } from "./stack";

export class MinStack<T> extends Stack<T> {
  protected mins: T[] = [];

  constructor(private compare: CompareFn<T>) {
    super();
  }

  /** Get the current minimum. Time: O(1) */
  get min() {
    return this.mins.at(-1);
  }

  /** Push a new element onto the stack. Time: amortized O(1) + O(`compare`) */
  override push(val: T) {
    super.push(val);
    if (this.min == null) return void this.mins.push(val);
    this.compare(this.min, val) <= 0
      ? this.mins.push(this.min)
      : this.mins.push(val);
  }

  /** Pop the latest element. Time: amortized O(1) */
  override pop() {
    this.mins.pop();
    return super.pop();
  }
}
