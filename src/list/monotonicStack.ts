import { Stack } from "./stack";

export class MonotonicStack<T> extends Stack<T> {
  /** The callback to call just after the top element was popped by pushing.
   * (`pushing` is not on the stack yet)
   */
  onPop?: (pushing: T, popped: T) => void;

  /** Create a new monotonic stack.
   * @param popCondition - The condition to pop the top element.
   * It is expected to return true if the top element should be popped, false otherwise.
   * @example
   * const stack = new MonotonicStack<number>((newVal, topVal) => newVal > topVal);
   * stack.push(1);
   * stack.push(4);
   * stack.push(2);
   * stack.push(3);
   * // stack is [4, 3]
   */
  constructor(private popCondition: (newVal: T, topVal: T) => boolean) {
    super();
  }

  /** Push a new element onto the stack. Time: amortized O(1 + `popCondition` + `onPop`) */
  override push(val: T) {
    while (this.top != null && this.popCondition(val, this.top)) {
      const popped = this.top;
      this.pop();
      this.onPop?.(val, popped);
    }
    super.push(val);
  }
}
