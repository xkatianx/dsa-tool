export class Stack<T> {
  protected values: T[] = [];

  get length() {
    return this.values.length;
  }

  get top() {
    return this.values.at(-1);
  }

  at(index: number) {
    return this.values.at(index);
  }

  push(val: T) {
    this.values.push(val);
  }

  pop() {
    return this.values.pop();
  }
}
