import { Stack } from "./stack.js";

export class Deque<T> {
  protected left = new Stack<T>();
  protected right = new Stack<T>();

  get length() {
    return this.left.length + this.right.length;
  }

  get first() {
    if (this.left.length > 0) return this.left.at(-1);
    return this.right.at(0);
  }

  get last() {
    if (this.right.length > 0) return this.right.at(-1);
    return this.left.at(0);
  }

  at(index: number) {
    if (index < 0) index = this.length + index;
    if (index < 0) return undefined;
    if (index >= this.length) return undefined;
    if (index < this.left.length) return this.left.at(-index - 1);
    return this.right.at(index - this.left.length);
  }

  protected moveLeft() {
    const newLeft = new Stack<T>();
    const newRight = new Stack<T>();
    const mid = Math.ceil(this.right.length / 2);
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

  protected moveRight() {
    [this.left, this.right] = [this.right, this.left];
    this.moveLeft();
    [this.left, this.right] = [this.right, this.left];
  }

  push(item: T) {
    this.right.push(item);
  }

  pop() {
    if (this.right.length === 0) this.moveRight();
    return this.right.pop();
  }

  unshift(item: T) {
    this.left.push(item);
  }

  shift() {
    if (this.left.length === 0) this.moveLeft();
    return this.left.pop();
  }

  *iter() {
    for (let i = 0; i < this.length; i++) {
      yield [this.at(i) as T, i, this] as const;
    }
  }

  *iterRight() {
    for (let i = 0; i < this.length; i++) {
      yield [this.at(-i - 1) as T, i, this] as const;
    }
  }
}
