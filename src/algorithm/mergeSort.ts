import type { CompareFn } from "../type";

/** Merge Sort
 *
 * Merge two non-decreasing iterators into a single non-decreasing iterator.
 *
 * 🚀 linear time
 *
 * 🤏 constant space
 */
export function* mergeSort<T>(
  arr1: IterableIterator<T>,
  arr2: IterableIterator<T>,
  compare: CompareFn<T>,
) {
  let v1 = arr1.next();
  let v2 = arr2.next();
  while (!v1.done && !v2.done) {
    const res = compare(v1.value, v2.value);
    if (res <= 0) {
      yield v1.value;
      v1 = arr1.next();
    } else {
      yield v2.value;
      v2 = arr2.next();
    }
  }
  while (!v1.done) {
    yield v1.value;
    v1 = arr1.next();
  }
  while (!v2.done) {
    yield v2.value;
    v2 = arr2.next();
  }
}
