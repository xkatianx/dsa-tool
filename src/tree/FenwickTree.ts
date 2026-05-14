/*
 * 0                         || 0 1s
 * |\  \    \            ... ||
 * 1 2  4    8               || 1 1s
 *   |  |\   |\   \          ||
 *   3  5 6  9 10  12        || 2 1s
 *        |    |   | \       ||
 *        7    11  13 14     || 3 1s
 *                    |      ||
 *                    15     || 4 1s
 *
 * To get parent, remove last 1.
 * To get left/right sibling, move last 1 right/left
 *
 *
 * x stores x, x's left siblings, x's left siblings' descendants
 * y stored by y, y's right siblings, y's ascendant's right siblings
 * ┌────────────────────────────┐ ┌──────────────────────────┐
 * │                           x│ │                          │
 * │                          ┌─┘ │                          │
 * │                          │   │                          │
 * │                          │   │                          │
 * │                          │ ┌─┘                          │
 * │                          │ │y -> move 1 left = +(y&-y)  │
 * └──────────────────────────┘ └────────────────────────────┘
 * To sum 1~x,                  rightmost will go to parent's right
 * sum x and ascendants         e.g. 01011100 -> 01100000
 *                                  └01011000 parent but rightmost
 *                                  └01010000 parent
 *                                  └01100000 right
 */
export class FenwickTree {
  protected tree: Float64Array;

  constructor(size = 1) {
    this.tree = new Float64Array(size + 1).fill(0);
  }

  /** Update the value at the given index (1-indexed). Time: O(log(n))
   *
   * Throws if index is out of bounds.
   */
  update(index: number, value: number): void {
    if (index < 1 || index >= this.tree.length)
      throw new Error("Index out of bounds.");
    for (; index < this.tree.length; index += index & -index) {
      this.tree[index] += value;
    }
  }

  /** Query the sum of the values in the range [1, index] (1-indexed). Time: O(log(n)) */
  query(index: number): number {
    if (index >= this.tree.length) index = this.tree.length - 1;
    let sum = 0;
    for (; index > 0; index -= index & -index) {
      // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be in bounds
      sum += this.tree[index]!;
    }
    return sum;
  }

  /** Query the sum of the values in the range [left, right] (1-indexed). Time: O(log(n)) */
  queryRange(left: number, right: number): number {
    return this.query(right) - this.query(left - 1);
  }
}
